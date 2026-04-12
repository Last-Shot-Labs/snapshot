import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import type { ConfigEnv, Plugin, ResolvedConfig, UserConfig, ViteDevServer } from "vite";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { tailwindPluginFactory, accessMock } = vi.hoisted(() => ({
  tailwindPluginFactory: vi.fn(() => ({ name: "tailwindcss-vite" })),
  accessMock: vi.fn(),
}));

vi.mock("../../cli/sync", () => ({
  runSync: vi.fn().mockResolvedValue(undefined),
  consoleLogger: {},
}));

vi.mock("node:fs/promises", () => ({
  access: accessMock,
}));

vi.mock("@tailwindcss/vite", () => ({
  default: tailwindPluginFactory,
}));

import { snapshotApp, snapshotSync } from "../index";
import { runSync } from "../../cli/sync";

const tempRoots: string[] = [];

function createManifestRoot(mode: "light" | "dark" | "system" = "dark"): string {
  const root = mkdtempSync(path.join(tmpdir(), "snapshot-app-plugin-"));
  tempRoots.push(root);
  writeFileSync(
    path.join(root, "snapshot.manifest.json"),
    JSON.stringify({ theme: { mode } }),
    "utf8",
  );
  return root;
}

function unwrapHook<T extends (...args: never[]) => unknown>(
  hook: T | { handler: T } | undefined,
): T {
  expect(hook).toBeDefined();
  return typeof hook === "function" ? hook : hook!.handler;
}

beforeEach(() => {
  vi.clearAllMocks();
  tailwindPluginFactory.mockClear();
  accessMock.mockReset();
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

describe("snapshotApp plugin", () => {
  it("injects Tailwind and configures a virtual build entry", async () => {
    const plugin = snapshotApp();
    const configHook = unwrapHook(plugin.config);
    const userConfig: UserConfig = { root: createManifestRoot(), plugins: [] };

    const result = await configHook.call(
      {} as ThisParameterType<typeof configHook>,
      userConfig,
      {
        command: "build",
        mode: "production",
      } as ConfigEnv,
    );

    expect(tailwindPluginFactory).toHaveBeenCalledOnce();
    expect(userConfig.plugins).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "tailwindcss-vite" })]),
    );
    expect(result).toEqual(
      expect.objectContaining({
        build: {
          rollupOptions: {
            input: "virtual:snapshot-entry",
          },
        },
        resolve: expect.objectContaining({
          dedupe: expect.arrayContaining([
            "react",
            "react-dom",
            "@tanstack/react-query",
          ]),
        }),
      }),
    );
  });

  it("serves an HTML shell with the theme boot script in dev", async () => {
    const plugin = snapshotApp();
    const configHook = unwrapHook(plugin.config);
    await configHook.call(
      {} as ThisParameterType<typeof configHook>,
      { root: createManifestRoot("system"), plugins: [] },
      {
        command: "serve",
        mode: "development",
      } as ConfigEnv,
    );

    const middlewareUse = vi.fn();
    const server = {
      middlewares: { use: middlewareUse },
      transformIndexHtml: vi.fn(async (_path: string, html: string) => html),
    } as unknown as ViteDevServer;

    const configureServerHook = unwrapHook(plugin.configureServer);
    configureServerHook.call(
      {} as ThisParameterType<typeof configureServerHook>,
      server,
    );

    const handler = middlewareUse.mock.calls[0]?.[0] as (
      req: { url?: string; method?: string },
      res: {
        statusCode?: number;
        setHeader: (name: string, value: string) => void;
        end: (body: string) => void;
      },
      next: () => void,
    ) => Promise<void>;

    let body = "";
    const headers = new Map<string, string>();
    await handler(
      { url: "/", method: "GET" },
      {
        setHeader(name, value) {
          headers.set(name, value);
        },
        end(value) {
          body = value;
        },
      },
      () => {
        throw new Error("next() should not be called for the app shell");
      },
    );

    expect(headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(body).toContain('src="/@vite/client"');
    expect(body).toContain('src="/@id/virtual:snapshot-entry"');
    expect(body).toContain("snapshot-theme-mode");
    expect(body).toContain('fallbackMode="system"');
  });

  it("emits a production HTML shell with stylesheets and theme boot script", async () => {
    const plugin = snapshotApp();
    const configHook = unwrapHook(plugin.config);
    await configHook.call(
      {} as ThisParameterType<typeof configHook>,
      { root: createManifestRoot("dark"), plugins: [] },
      {
        command: "build",
        mode: "production",
      } as ConfigEnv,
    );

    const configResolvedHook = unwrapHook(plugin.configResolved);
    configResolvedHook.call(
      {} as ThisParameterType<typeof configResolvedHook>,
      { base: "/app/" } as ResolvedConfig,
    );

    const emitFile = vi.fn();
    const generateBundleHook = unwrapHook(plugin.generateBundle);
    generateBundleHook.call(
      { emitFile } as unknown as ThisParameterType<typeof generateBundleHook>,
      {} as Parameters<typeof generateBundleHook>[0],
      {
        "assets/app.js": {
          type: "chunk",
          fileName: "assets/app.js",
          isEntry: true,
          facadeModuleId: "\0virtual:snapshot-entry",
          name: "snapshot-entry",
          code: "",
          dynamicImports: [],
          exports: [],
          imports: [],
          map: null,
          modules: {},
          referencedFiles: [],
          viteMetadata: undefined,
        },
        "assets/app.css": {
          type: "asset",
          fileName: "assets/app.css",
          names: [],
          originalFileNames: [],
          source: "",
        },
      } as unknown as Parameters<typeof generateBundleHook>[1],
      false,
    );

    expect(emitFile).toHaveBeenCalledOnce();
    const emitted = emitFile.mock.calls[0]?.[0] as { fileName: string; source: string };
    expect(emitted.fileName).toBe("index.html");
    expect(emitted.source).toContain('href="/app/assets/app.css"');
    expect(emitted.source).toContain('src="/app/assets/app.js"');
    expect(emitted.source).toContain("snapshot-theme-mode");
    expect(emitted.source).toContain('fallbackMode="dark"');
  });
});

describe("snapshotSync plugin", () => {
  it("buildStart skips sync and warns when schema file does not exist", async () => {
    accessMock.mockRejectedValue(new Error("ENOENT"));
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const plugin = snapshotSync({ file: "schema.json" });
    const buildStartHook = unwrapHook(plugin.buildStart);
    await buildStartHook.call(
      {} as ThisParameterType<typeof buildStartHook>,
      {} as Parameters<typeof buildStartHook>[0],
    );

    expect(runSync).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("schema.json"),
    );
    warnSpy.mockRestore();
  });

  it("buildStart runs sync when schema file exists", async () => {
    accessMock.mockResolvedValue(undefined);

    const plugin = snapshotSync({ file: "schema.json" });
    const buildStartHook = unwrapHook(plugin.buildStart);
    await buildStartHook.call(
      {} as ThisParameterType<typeof buildStartHook>,
      {} as Parameters<typeof buildStartHook>[0],
    );

    expect(runSync).toHaveBeenCalledOnce();
  });

  it("configureServer registers both change and add event handlers", () => {
    const registeredEvents: string[] = [];
    const mockServer = {
      watcher: {
        add: vi.fn(),
        on: vi.fn((event: string) => {
          registeredEvents.push(event);
        }),
      },
    };

    const plugin = snapshotSync({ file: "schema.json" });
    const configureServerHook = unwrapHook(plugin.configureServer);
    configureServerHook.call(
      {} as ThisParameterType<typeof configureServerHook>,
      mockServer as unknown as ViteDevServer,
    );

    expect(registeredEvents).toContain("change");
    expect(registeredEvents).toContain("add");
  });

  it("'add' event triggers runSync for matching file", async () => {
    const handlers: Record<string, Function> = {};
    const mockServer = {
      watcher: {
        add: vi.fn(),
        on: vi.fn((event: string, handler: Function) => {
          handlers[event] = handler;
        }),
      },
    };

    const plugin = snapshotSync({ file: "schema.json" });
    const configureServerHook = unwrapHook(plugin.configureServer);
    configureServerHook.call(
      {} as ThisParameterType<typeof configureServerHook>,
      mockServer as unknown as ViteDevServer,
    );

    await handlers["add"]!("/project/schema.json");

    expect(runSync).toHaveBeenCalledOnce();
  });

  it("'change' event triggers runSync for matching file", async () => {
    const handlers: Record<string, Function> = {};
    const mockServer = {
      watcher: {
        add: vi.fn(),
        on: vi.fn((event: string, handler: Function) => {
          handlers[event] = handler;
        }),
      },
    };

    const plugin = snapshotSync({ file: "schema.json" });
    const configureServerHook = unwrapHook(plugin.configureServer);
    configureServerHook.call(
      {} as ThisParameterType<typeof configureServerHook>,
      mockServer as unknown as ViteDevServer,
    );

    await handlers["change"]!("/project/schema.json");

    expect(runSync).toHaveBeenCalledOnce();
  });
});
