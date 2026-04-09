import path from "node:path";
import type { Plugin, UserConfig } from "vite";
import { runSync, consoleLogger, type SyncOptions } from "../cli/sync";
import { buildPrefetchManifest, type ViteManifestEntry } from "./prefetch";
import { rscTransform } from "./rsc-transform";
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

  /**
   * Target runtime for the server bundle.
   *
   * Controls how Vite configures the server build. Affects the build target,
   * SSR format, and which Node.js built-ins are externalized.
   *
   * - `'node'` (default) — Standard Node.js/Bun server. Node built-ins are
   *   externalized; `react` and `react-dom` are externalized.
   * - `'edge-cloudflare'` — Cloudflare Workers. Build target is `es2022`,
   *   SSR target is `webworker` (Service Worker format). Node built-ins are
   *   **not** externalized — they must be polyfilled or avoided entirely.
   *   Asset manifest should be inlined at build time via a Vite plugin.
   * - `'edge-deno'` — Deno Deploy. Build target is `es2022`. Deno supports
   *   most Node.js built-ins via its compatibility layer, so they are still
   *   externalized.
   *
   * @default 'node'
   */
  target?: "node" | "edge-cloudflare" | "edge-deno";

  /**
   * Enable React Server Components (RSC) support.
   *
   * When `true`:
   * - The `rscTransform()` Vite plugin is added to the build pipeline. Files
   *   with a `'use client'` directive are replaced with client reference stubs
   *   in the server bundle and left unchanged in the client bundle.
   * - The server build config gains `resolve.conditions: ['react-server']` so
   *   RSC-aware packages (like `react-server-dom-webpack`) resolve their
   *   server-side entry points.
   * - After the server bundle is assembled, `rsc-manifest.json` is written to
   *   the server output directory. Load this manifest and pass it to
   *   `renderPage()` via `rscOptions` to enable RSC rendering at runtime.
   *
   * Requires `react-server-dom-webpack >=18.3.0` as an optional peer dependency.
   *
   * @default false
   */
  rsc?: boolean;

  /**
   * Open an interactive bundle size visualizer after the client build completes.
   *
   * When `true`, the `rollup-plugin-visualizer` is added to the Vite plugin array
   * and will write `dist/stats.html` after the build, then open it in the browser.
   * If `rollup-plugin-visualizer` is not installed, a warning is logged with the
   * install command.
   *
   * Install the optional dependency:
   * ```sh
   * bun add -d rollup-plugin-visualizer
   * ```
   *
   * @default false
   */
  analyze?: boolean;
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

        const target = opts.target ?? "node";

        // When RSC is enabled, the server build must use the 'react-server' export
        // condition so that RSC-aware packages (react-server-dom-webpack, react) resolve
        // their server entry points (which export renderToPipeableStream for RSC flight).
        const rscConditions: string[] = opts.rsc ? ["react-server"] : [];

        if (target === "edge-cloudflare") {
          // Cloudflare Workers — Service Worker format, ES2022 target.
          // Node built-ins are NOT available and must not be externalized.
          // react/react-dom are still externalized (bundled via import map or
          // inlined depending on the consumer's wrangler.toml config).
          return {
            build: {
              target: "es2022",
              outDir: opts.serverOutDir ?? "dist/server",
              rollupOptions: {
                external: ["react", "react-dom", "react-dom/server"],
              },
            },
            ssr: {
              target: "webworker",
              // Do not externalize Node built-ins — they are not available on
              // Cloudflare Workers. The consumer must avoid or polyfill them.
              noExternal: /^node:/,
            },
            ...(rscConditions.length > 0
              ? { resolve: { conditions: rscConditions } }
              : {}),
          };
        }

        if (target === "edge-deno") {
          // Deno Deploy — ES2022 target. Deno supports most Node built-ins via
          // its compatibility layer, so they can remain external.
          return {
            build: {
              target: "es2022",
              outDir: opts.serverOutDir ?? "dist/server",
              rollupOptions: {
                external: ["react", "react-dom", "react-dom/server"],
              },
            },
            ...(rscConditions.length > 0
              ? { resolve: { conditions: rscConditions } }
              : {}),
          };
        }

        // Default: Node.js / Bun server
        return {
          build: {
            outDir: opts.serverOutDir ?? "dist/server",
            rollupOptions: {
              external: ["react", "react-dom", "react-dom/server"],
            },
          },
          ...(rscConditions.length > 0
            ? { resolve: { conditions: rscConditions } }
            : {}),
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

  // Prepend the RSC transform when RSC is opted in.
  // rscTransform() must run before serverActionsTransform() so that 'use client'
  // files are stubbed out before 'use server' detection runs on the same file.
  if (opts.rsc) {
    plugins.unshift(rscTransform());
  }

  // Phase 30: bundle analyzer via rollup-plugin-visualizer.
  // The visualizer is an optional peer dep — if not installed, log a helpful message.
  if (opts.analyze) {
    const analyzePlugin: Plugin = {
      name: "snapshot-analyze",
      async closeBundle() {
        // Only run after the client build.
        if (!isClientBuild) return;
        try {
          // Dynamic import — optional peer dep. Cast at the opaque boundary (Rule 5).
          type VisualizerModule = {
            visualizer: (opts?: {
              open?: boolean;
              filename?: string;
              template?: string;
              gzipSize?: boolean;
              brotliSize?: boolean;
            }) => Plugin;
          };
          const { visualizer } = (await import(
            // @ts-ignore — optional peer dep not in devDependencies
            "rollup-plugin-visualizer"
          )) as unknown as VisualizerModule;

          // Build the visualizer plugin and call its generateBundle/closeBundle hooks
          // manually. We can't add it to the plugin array at config time because the
          // analyze option is not known until after the plugin array is constructed.
          const vizPlugin = visualizer({
            open: true,
            filename: path.join(clientOutDir, "stats.html"),
            gzipSize: true,
            brotliSize: true,
          });

          if (typeof vizPlugin.closeBundle === "function") {
            // Call closeBundle to trigger file write + browser open.
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await (vizPlugin.closeBundle as () => void | Promise<void>)();
          }
        } catch {
          console.warn(
            "[snapshot-ssr] Bundle analyzer not available. Install the optional dependency:\n" +
              "  bun add -d rollup-plugin-visualizer\n" +
              "Then re-run the build.",
          );
        }
      },
    };
    plugins.push(analyzePlugin);
  }

  return plugins;
}
