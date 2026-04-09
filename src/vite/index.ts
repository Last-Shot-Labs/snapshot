import path from "node:path";
import type { Plugin, UserConfig } from "vite";
import { runSync, consoleLogger, type SyncOptions } from "../cli/sync";
import { buildPrefetchManifest, type ViteManifestEntry } from "./prefetch";
import { serverActionsTransform } from "./server-actions";

export interface SnapshotSyncOptions {
  /** URL of the bunshot backend. Falls back to VITE_API_URL env var. */
  apiUrl?: string;
  /**
   * Path to a local OpenAPI JSON file. Takes precedence over apiUrl.
   * When provided, the dev server watches this file for changes and re-runs sync automatically.
   * Note: API URL polling is not supported in the Vite plugin — for live schema updates
   * from a running API, use `snapshot sync --watch` from the CLI instead.
   */
  file?: string;
  /** Generate Zod validators alongside mutation hooks. */
  zod?: boolean;
}

export function snapshotSync(opts: SnapshotSyncOptions = {}): Plugin {
  const syncOpts: SyncOptions = {
    apiUrl: opts.apiUrl,
    filePath: opts.file,
    zod: opts.zod,
    cwd: process.cwd(),
    logger: consoleLogger,
  };

  return {
    name: "snapshot-sync",

    async buildStart() {
      if (opts.file) {
        const exists = await import("node:fs/promises")
          .then((fs) => fs.access(path.resolve(syncOpts.cwd, opts.file!)))
          .then(() => true)
          .catch(() => false);
        if (!exists) {
          console.warn(
            `[snapshot] ${opts.file} not found — skipping auto-sync. Run \`bun run sync\` or drop a schema file to enable.`,
          );
          return;
        }
      }
      await runSync(syncOpts);
    },

    configureServer(server) {
      if (opts.file) {
        server.watcher.add(opts.file);
        server.watcher.on("change", async (changedFile) => {
          if (changedFile === opts.file || changedFile.endsWith(opts.file!)) {
            // Spread syncOpts so any future fields are included automatically
            await runSync({ ...syncOpts, watch: false }).catch(console.error);
          }
        });
        server.watcher.on("add", async (addedFile) => {
          if (addedFile === opts.file || addedFile.endsWith(opts.file!)) {
            await runSync({ ...syncOpts, watch: false }).catch(console.error);
          }
        });
      }
      // API URL mode: the Vite plugin does not poll the API during dev.
      // For live schema updates from a running API, use `snapshot sync --watch` from the CLI.
      // This is intentional — Vite's watcher is file-based; network polling belongs in the CLI.
    },
  };
}

/**
 * Options for the `snapshotSsr()` Vite plugin.
 */
export interface SnapshotSsrOptions {
  /**
   * Entry module for the client-side hydration bundle.
   * @default 'src/ssr/entry-client.tsx'
   */
  clientEntry?: string;
  /**
   * Entry module for the server-side renderer bundle.
   * @default 'src/ssr/entry-server.ts'
   */
  serverEntry?: string;
  /**
   * Output directory for the server bundle.
   * @default 'dist/server'
   */
  serverOutDir?: string;
  /**
   * Run `bunshot ssg` after the client build completes.
   *
   * When `true`, the `closeBundle` hook spawns `bunshot ssg` using the Vite
   * client manifest produced by this build and the server entry bundle in
   * `serverOutDir`. Pre-rendered HTML files are written to `ssgOutDir`.
   *
   * Requires the server bundle to have been built first
   * (`vite build --ssr`). If the renderer module cannot be found,
   * SSG is skipped with a warning.
   *
   * @default false
   */
  ssg?: boolean;
  /**
   * Output directory for SSG `.html` files.
   * Passed to `bunshot ssg --out`.
   * @default 'dist/static'
   */
  ssgOutDir?: string;
  /**
   * Generate `prefetch-manifest.json` in the client output directory after the
   * client build completes. The manifest maps URL patterns to their JS chunk and
   * CSS file URLs for use with `<PrefetchLink>`.
   * @default true
   */
  prefetchManifest?: boolean;
  /**
   * Absolute path to the server routes directory.
   * Used to enumerate route files when building the prefetch manifest.
   * @default process.cwd() + '/server/routes'
   */
  serverRoutesDir?: string;
  /**
   * Client routes directory prefix relative to the project root.
   * Used to match server route files to their corresponding Vite manifest entries.
   * @default 'src/routes'
   */
  clientRoutesDir?: string;
  /**
   * Enable the `'use server'` directive transform.
   *
   * When `true` (the default), files with a top-level `'use server'` directive
   * are automatically transformed: server builds keep the original code, client
   * builds replace each exported function with a `__callServerAction__` stub.
   *
   * Set to `false` only if you are handling the `'use server'` transform yourself
   * via a separate plugin.
   *
   * @default true
   */
  serverActions?: boolean;
}

/**
 * Vite plugin for SSR builds with Snapshot.
 *
 * When added to the Vite config, it:
 * 1. Enables Vite's manifest output (`build.manifest: true`) for client builds
 *    so that bunshot-ssr can inject hashed asset URLs into the SSR HTML.
 * 2. Configures the server bundle output directory when `vite build --ssr` is run.
 * 3. Generates `dist/client/prefetch-manifest.json` after the client build, mapping
 *    URL patterns to JS chunk and CSS file URLs for `<PrefetchLink>` prefetching.
 *
 * **Two build commands are required:**
 * - `vite build` → client bundle in `dist/client/` + `.vite/manifest.json`
 * - `vite build --ssr` → server bundle in `dist/server/`
 *
 * Add both to your `package.json`:
 * ```json
 * {
 *   "scripts": {
 *     "build:client": "vite build",
 *     "build:server": "vite build --ssr src/ssr/entry-server.ts",
 *     "build": "bun run build:client && bun run build:server"
 *   }
 * }
 * ```
 *
 * @param opts - Optional configuration. All fields have defaults.
 * @returns A Vite `Plugin` object.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite'
 * import react from '@vitejs/plugin-react'
 * import { snapshotSync, snapshotSsr } from '@lastshotlabs/snapshot/vite'
 *
 * export default defineConfig({
 *   plugins: [
 *     react(),
 *     snapshotSync({ file: './openapi.json' }),
 *     snapshotSsr(),
 *   ],
 * })
 * ```
 */
export function snapshotSsr(opts: SnapshotSsrOptions = {}): Plugin[] {
  // Track whether this invocation is a client (non-SSR) build so we only
  // run post-build steps after the client build (not after the server bundle build).
  let isClientBuild = false;
  // The resolved client output directory — needed to locate the manifest.
  let clientOutDir = "dist/client";
  // The Vite manifest captured during the build.
  let capturedViteManifest: Record<string, ViteManifestEntry> | null = null;

  const ssrPlugin: Plugin = {
    name: "snapshot-ssr",

    config(
      config: UserConfig,
      { command, isSsrBuild }: { command: string; isSsrBuild?: boolean },
    ): Partial<UserConfig> | null {
      if (command === "build") {
        if (!isSsrBuild) {
          isClientBuild = true;
          clientOutDir = config.build?.outDir ?? "dist/client";
          // Client build: enable manifest + set output directory
          return {
            build: {
              manifest: true,
              outDir: clientOutDir,
            },
          };
        }
        isClientBuild = false;
        // SSR build: set server output directory and externalize React
        return {
          build: {
            outDir: opts.serverOutDir ?? "dist/server",
            rollupOptions: {
              external: ["react", "react-dom", "react-dom/server"],
            },
          },
        };
      }
      return null;
    },

    generateBundle(_options, bundle) {
      // Capture Vite manifest entries from the bundle for prefetch manifest generation.
      // Only process client builds.
      if (!isClientBuild) return;

      // Vite writes manifest.json to disk, but we can also reconstruct it from the bundle.
      // We collect entry-like chunks to pass to buildPrefetchManifest.
      const manifest: Record<string, ViteManifestEntry> = {};
      for (const [, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk" && chunk.facadeModuleId) {
          const key = chunk.facadeModuleId.replace(/\\/g, "/");
          // Strip leading project root prefix if present
          const relKey = key.includes("/src/")
            ? key.slice(key.indexOf("/src/") + 1)
            : key;

          manifest[relKey] = {
            file: chunk.fileName,
            isEntry: chunk.isEntry,
            imports: chunk.imports.map((imp) => {
              // Map import file names back to their keys where possible
              for (const [k, c] of Object.entries(bundle)) {
                if (
                  c.type === "chunk" &&
                  c.fileName === imp &&
                  c.facadeModuleId
                ) {
                  const ik = c.facadeModuleId.replace(/\\/g, "/");
                  return ik.includes("/src/")
                    ? ik.slice(ik.indexOf("/src/") + 1)
                    : ik;
                }
              }
              return imp;
            }),
            css: [],
          };
        }
      }
      if (Object.keys(manifest).length > 0) {
        capturedViteManifest = manifest;
      }
    },

    async closeBundle() {
      // Only run post-build steps after the client build.
      if (!isClientBuild) return;

      // ── Prefetch manifest generation ──────────────────────────────────────
      if (opts.prefetchManifest !== false) {
        const serverRoutesDir =
          opts.serverRoutesDir ?? path.join(process.cwd(), "server/routes");
        const clientRoutesDir = opts.clientRoutesDir ?? "src/routes";

        // Prefer the on-disk Vite manifest (most accurate) over the in-memory capture.
        let viteManifest: Record<string, ViteManifestEntry>;
        const manifestPath = path.join(clientOutDir, ".vite", "manifest.json");

        try {
          const { readFileSync, existsSync } = await import("node:fs");
          if (existsSync(manifestPath)) {
            viteManifest = JSON.parse(
              readFileSync(manifestPath, "utf-8"),
            ) as Record<string, ViteManifestEntry>;
          } else if (capturedViteManifest) {
            viteManifest = capturedViteManifest;
          } else {
            console.warn(
              "[snapshot-ssr] Vite manifest not found — skipping prefetch manifest generation.",
            );
            viteManifest = {};
          }
        } catch {
          viteManifest = capturedViteManifest ?? {};
        }

        try {
          const prefetchManifest = await buildPrefetchManifest(
            viteManifest,
            serverRoutesDir,
            clientRoutesDir,
          );

          const { writeFileSync, mkdirSync } = await import("node:fs");
          mkdirSync(clientOutDir, { recursive: true });
          writeFileSync(
            path.join(clientOutDir, "prefetch-manifest.json"),
            JSON.stringify(prefetchManifest, null, 2),
            "utf-8",
          );
        } catch (err) {
          console.warn(
            "[snapshot-ssr] Failed to generate prefetch manifest:",
            err,
          );
        }
      }

      // ── SSG ───────────────────────────────────────────────────────────────
      if (!opts.ssg) return;

      const serverOutDir = opts.serverOutDir ?? "dist/server";
      const ssgOutDir = opts.ssgOutDir ?? "dist/static";
      const assetsManifest = path.join(clientOutDir, ".vite", "manifest.json");
      const rendererEntry = path.join(serverOutDir, "entry-server.js");

      // Spawn `bunshot-ssg` CLI. Rule 11: use spawnSync with array args — no shell
      // interpolation.
      const { spawnSync } = await import("node:child_process");
      const result = spawnSync(
        "bun",
        [
          "run",
          // Resolve the bunshot-ssg CLI relative to the project's node_modules
          path.resolve(process.cwd(), "node_modules/.bin/bunshot-ssg"),
          "--assets-manifest",
          assetsManifest,
          "--out",
          ssgOutDir,
          "--renderer",
          rendererEntry,
        ],
        {
          cwd: process.cwd(),
          stdio: "inherit",
          encoding: "utf8",
        },
      );

      if (result.error) {
        // CLI binary not found — fall back to direct module invocation
        console.warn(
          "[snapshot-ssr] bunshot-ssg CLI not found — ensure @lastshotlabs/bunshot-ssg is installed.",
          result.error.message,
        );
        return;
      }

      if (result.status !== 0) {
        // SSG failures are warnings, not hard build errors, so the client
        // build artifacts are not invalidated.
        console.warn(
          `[snapshot-ssr] bunshot ssg exited with code ${result.status ?? "null"}. ` +
            `Check the output above for details.`,
        );
      }
    },
  };

  const plugins: Plugin[] = [ssrPlugin];

  // Prepend the server actions transform unless explicitly disabled.
  if (opts.serverActions !== false) {
    plugins.unshift(serverActionsTransform());
  }

  return plugins;
}
