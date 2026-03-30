# Coding Standards

1. **No hacky fixes** — Follow framework patterns. Never modify the public API surface to work around issues in consumer apps. Investigate how existing modules solve the problem and follow that pattern.

2. **No backwards compatibility shims** — Don't add re-export barrels or backwards-compat shims. Delete old locations entirely. John is the only consumer and can fix his apps.

3. **Repository/factory pattern** — No mutable module state, no singletons, closure-owned state. No module-level `let` + lazy init patterns. Use factory functions that return instances with closure-owned state.

4. **Coding style** — Write complete production-grade code, not minimal outlines.

5. **TypeScript casts** — `as unknown as T` only at opaque optional-dep boundaries, never to hide missing values. No `any`. No hard casts when not necessary.

6. **No import/re-export funnels** — No barrel files funneling internals through a single index.

7. **Minimal public API** — No internals leaking. Public API should be minimal. Testing utilities, tooling, etc. go on their own subpath (e.g. `@lastshotlabs/snapshot/testing`), not the main export.

8. **Separation of concerns** — Files, directories, and code follow standard splitting structure. Keep uniform across the app.

9. **Types** — Shared types should be lifted and organized, never redefined. Extend types when it makes sense instead of redefining. Naming conventions must be 100% uniform.

# Project Context

Snapshot is the React frontend framework for bunshot-powered backends. It is part of a larger platform vision: a config-driven full-stack app platform where users describe what they want and get a running application.

The bunshot backend framework has a config generation layer (manifest schema, handler registry, constraint engine, audit suite) in `src/framework/config/generation/`. Snapshot's frontend config generation mirrors those same patterns adapted for frontend concerns.

# Architecture

- **Factory pattern throughout** — `createSnapshot()` creates all hooks/managers/clients via closure. All sub-modules use factory functions.
- **Peer dependencies** — React, TanStack Query, TanStack Router, jotai, @unhead/react. Optional: vite, zod.
- **Build** — tsup with 4 entry points: library (ESM+CJS), CLI, CLI commands, Vite plugin.
- **Tests** — vitest, node environment.

# Subpath Exports

- `@lastshotlabs/snapshot` — createSnapshot, hooks, types (existing)
- `@lastshotlabs/snapshot/tokens` — design token system
- `@lastshotlabs/snapshot/components` — component library + registry
- `@lastshotlabs/snapshot/manifest` — manifest schema, constraints, audits, registry
- `@lastshotlabs/snapshot/generation` — generator pipeline
