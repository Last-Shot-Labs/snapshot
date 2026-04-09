import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import path from "node:path";
import {
  routePathToPattern,
  buildPrefetchManifest,
  type ViteManifestEntry,
} from "../prefetch";
import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";

// ── routePathToPattern ────────────────────────────────────────────────────────

describe("routePathToPattern", () => {
  it("converts a static route to a pattern", () => {
    expect(routePathToPattern("about.ts")).toBe("/about");
  });

  it("converts a nested static route", () => {
    expect(routePathToPattern("posts/index.ts")).toBe("/posts");
  });

  it("converts a dynamic segment [slug]", () => {
    expect(routePathToPattern("posts/[slug].ts")).toBe("/posts/:slug");
  });

  it("converts a catch-all segment [...rest]", () => {
    expect(routePathToPattern("posts/[...rest].ts")).toBe("/posts/:rest*");
  });

  it("strips route group wrappers (group)", () => {
    expect(routePathToPattern("(marketing)/about.ts")).toBe("/about");
  });

  it("strips nested route group wrappers", () => {
    expect(routePathToPattern("(auth)/login.ts")).toBe("/login");
  });

  it("converts index.ts at root", () => {
    expect(routePathToPattern("index.ts")).toBe("/");
  });

  it("handles multiple dynamic segments", () => {
    expect(routePathToPattern("teams/[teamId]/members/[memberId].ts")).toBe(
      "/teams/:teamId/members/:memberId",
    );
  });

  it("handles .tsx extension", () => {
    expect(routePathToPattern("posts/[slug].tsx")).toBe("/posts/:slug");
  });
});

// ── buildPrefetchManifest ─────────────────────────────────────────────────────

// We mock the fs/promises `readdir` to avoid touching the filesystem.
vi.mock("node:fs/promises", async () => {
  const actual = await vi.importActual<typeof fsPromises>("node:fs/promises");
  return { ...actual, readdir: vi.fn() };
});

vi.mock("node:fs", async () => {
  const actual = await vi.importActual<typeof fs>("node:fs");
  return { ...actual, existsSync: vi.fn() };
});

const mockedReaddir = vi.mocked(fsPromises.readdir);
const mockedExistsSync = vi.mocked(fs.existsSync);

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});

function makeEntry(
  file: string,
  extra: Partial<ViteManifestEntry> = {},
): ViteManifestEntry {
  return { file, isEntry: true, ...extra };
}

describe("buildPrefetchManifest", () => {
  const serverRoutesDir = "/app/server/routes";
  const clientRoutesDir = "src/routes";

  it("returns empty routes when server routes dir does not exist", async () => {
    mockedExistsSync.mockReturnValue(false);

    const manifest = await buildPrefetchManifest(
      {},
      serverRoutesDir,
      clientRoutesDir,
    );
    expect(manifest.routes).toEqual([]);
  });

  it("produces a route with empty chunks when no manifest entry matches", async () => {
    mockedExistsSync.mockReturnValue(true);

    // Simulate a single route file
    mockedReaddir.mockResolvedValueOnce([
      { name: "about.ts", isDirectory: () => false } as unknown as Awaited<
        ReturnType<typeof fsPromises.readdir>
      >[number],
    ]);

    const viteManifest: Record<string, ViteManifestEntry> = {};

    const manifest = await buildPrefetchManifest(
      viteManifest,
      serverRoutesDir,
      clientRoutesDir,
    );

    expect(manifest.routes).toHaveLength(1);
    expect(manifest.routes[0]).toMatchObject({
      pattern: "/about",
      chunks: [],
      css: [],
    });
  });

  it("maps a matched manifest entry to a route's chunks", async () => {
    mockedExistsSync.mockReturnValue(true);

    mockedReaddir.mockResolvedValueOnce([
      { name: "posts.ts", isDirectory: () => false } as unknown as Awaited<
        ReturnType<typeof fsPromises.readdir>
      >[number],
    ]);

    const viteManifest: Record<string, ViteManifestEntry> = {
      "src/routes/posts.tsx": makeEntry("assets/Posts-Abc123.js"),
    };

    const manifest = await buildPrefetchManifest(
      viteManifest,
      serverRoutesDir,
      clientRoutesDir,
    );

    expect(manifest.routes).toHaveLength(1);
    const route = manifest.routes[0]!;
    expect(route.pattern).toBe("/posts");
    expect(route.chunks).toContain("assets/Posts-Abc123.js");
  });

  it("collects CSS from a matched manifest entry", async () => {
    mockedExistsSync.mockReturnValue(true);

    mockedReaddir.mockResolvedValueOnce([
      { name: "posts.ts", isDirectory: () => false } as unknown as Awaited<
        ReturnType<typeof fsPromises.readdir>
      >[number],
    ]);

    const viteManifest: Record<string, ViteManifestEntry> = {
      "src/routes/posts.tsx": makeEntry("assets/Posts-Abc123.js", {
        css: ["assets/posts-Xyz456.css"],
      }),
    };

    const manifest = await buildPrefetchManifest(
      viteManifest,
      serverRoutesDir,
      clientRoutesDir,
    );

    const route = manifest.routes[0]!;
    expect(route.css).toContain("assets/posts-Xyz456.css");
  });

  it("collects CSS recursively from imported chunks", async () => {
    mockedExistsSync.mockReturnValue(true);

    mockedReaddir.mockResolvedValueOnce([
      { name: "posts.ts", isDirectory: () => false } as unknown as Awaited<
        ReturnType<typeof fsPromises.readdir>
      >[number],
    ]);

    const viteManifest: Record<string, ViteManifestEntry> = {
      "src/routes/posts.tsx": makeEntry("assets/Posts-Abc123.js", {
        imports: ["src/components/PostCard.tsx"],
      }),
      "src/components/PostCard.tsx": makeEntry("assets/PostCard-Def789.js", {
        css: ["assets/post-card-Ghi012.css"],
      }),
    };

    const manifest = await buildPrefetchManifest(
      viteManifest,
      serverRoutesDir,
      clientRoutesDir,
    );

    const route = manifest.routes[0]!;
    expect(route.css).toContain("assets/post-card-Ghi012.css");
  });

  it("handles nested route directories", async () => {
    mockedExistsSync.mockReturnValue(true);

    const postsDir = path.join(serverRoutesDir, "posts");

    // First call for root dir, second for nested posts/ dir
    mockedReaddir
      .mockResolvedValueOnce([
        { name: "posts", isDirectory: () => true } as unknown as Awaited<
          ReturnType<typeof fsPromises.readdir>
        >[number],
      ])
      .mockResolvedValueOnce([
        { name: "[slug].ts", isDirectory: () => false } as unknown as Awaited<
          ReturnType<typeof fsPromises.readdir>
        >[number],
      ]);

    mockedExistsSync.mockImplementation((p) => {
      return p === serverRoutesDir || p === postsDir;
    });

    const viteManifest: Record<string, ViteManifestEntry> = {
      "src/routes/posts/$slug.tsx": makeEntry("assets/PostDetail-Jkl345.js"),
    };

    const manifest = await buildPrefetchManifest(
      viteManifest,
      serverRoutesDir,
      clientRoutesDir,
    );

    expect(manifest.routes).toHaveLength(1);
    expect(manifest.routes[0]!.pattern).toBe("/posts/:slug");
  });

  it("produces valid PrefetchManifest JSON structure", async () => {
    mockedExistsSync.mockReturnValue(true);

    mockedReaddir.mockResolvedValueOnce([
      { name: "index.ts", isDirectory: () => false } as unknown as Awaited<
        ReturnType<typeof fsPromises.readdir>
      >[number],
    ]);

    const manifest = await buildPrefetchManifest(
      {},
      serverRoutesDir,
      clientRoutesDir,
    );

    // Validate the JSON-serializable structure
    const json = JSON.stringify(manifest);
    const parsed = JSON.parse(json) as typeof manifest;
    expect(parsed).toHaveProperty("routes");
    expect(Array.isArray(parsed.routes)).toBe(true);
  });
});
