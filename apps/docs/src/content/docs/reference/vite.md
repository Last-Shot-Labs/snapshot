---
title: Vite Reference
description: Generated from src/vite/index.ts and the declarations it re-exports.
draft: false
---

Generated from `src/vite/index.ts`.

| Export | Kind | Source | Description |
|---|---|---|---|
| `snapshotApp` | function | `src/vite/index.ts` | Vite plugin that boots a manifest-driven Snapshot app from `snapshot.manifest.json`. The plugin injects a virtual app entry, wires `ManifestApp`, handles manifest hot reload during development, and emits a static `index.html` during build. |
| `SnapshotAppOptions` | interface | `src/vite/index.ts` | Options for `snapshotApp()`, the manifest-driven Snapshot app Vite plugin. |
| `snapshotSsr` | function | `src/vite/index.ts` | Vite plugin for SSR builds with Snapshot. When added to the Vite config, it: 1. Enables Vite's manifest output (`build.manifest: true`) for client builds    so that bunshot-ssr can inject hashed asset URLs into the SSR HTML. 2. Configures the server bundle output directory when `vite build --ssr` is run. 3. Generates `dist/client/prefetch-manifest.json` after the client build, mapping    URL patterns to JS chunk and CSS file URLs for `<PrefetchLink>` prefetching. **Two build commands are required:** - `vite build` → client bundle in `dist/client/` + `.vite/manifest.json` - `vite build --ssr` → server bundle in `dist/server/` Add both to your `package.json`: ```json {   "scripts": {     "build:client": "vite build",     "build:server": "vite build --ssr src/ssr/entry-server.ts",     "build": "bun run build:client && bun run build:server"   } } ``` |
| `SnapshotSsrOptions` | interface | `src/vite/index.ts` | Options for the `snapshotSsr()` Vite plugin. |
| `snapshotSync` | function | `src/vite/index.ts` | Vite plugin that runs Snapshot's OpenAPI sync step during the Vite lifecycle. Use this when a frontend project should regenerate API types and hooks from a Bunshot schema file or backend endpoint at startup. |
| `SnapshotSyncOptions` | interface | `src/vite/index.ts` | Options for `snapshotSync()`, Snapshot's Vite-driven Bunshot sync plugin. |
| `staticParamsPlugin` | function | `src/vite/index.ts` | Vite plugin that scans the server routes directory for `generateStaticParams` exports at build time and writes `static-params.json` to the client output directory. `static-params.json` is a build-time artifact consumed by the ISR pre-renderer and by deployment tooling. It maps route patterns to their enumerated param sets. This plugin runs during the `buildEnd` hook and only fires for client builds (not the SSR bundle build). It is automatically included in the plugin array returned by `snapshotSsr()` — you do not need to add it manually. |
