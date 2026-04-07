# Engineering Rules

## Project Status

**Pre-production. No external consumers.** This means:

- Change anything freely — no deprecation cycles, no migration guides, no backwards compat
- Rename, restructure, delete, and redesign without ceremony
- If a pattern is wrong, fix it now. Don't add tech debt "for later"
- No conservative decision-making based on hypothetical consumers
- The only consumers are internal. If something breaks, fix it.

## What Snapshot Is

Snapshot is the frontend SDK + CLI for bunshot-powered backends. It has two current surfaces and a growing third:

- **SDK** — TypeScript library consumed by React apps (`createSnapshot` factory, hooks, types)
- **CLI** — oclif-based tool (`snapshot init`, `snapshot sync`) that scaffolds and syncs frontend code from a bunshot server
- **Config-driven UI layer** *(in development)* — design token system, config-addressable component library, page composition from manifest + OpenAPI, inter-component data binding, and an action vocabulary — the frontend half of the full-stack manifest vision

The SDK targets browser environments. The CLI targets Node/Bun. These are different execution contexts — never mix browser-only APIs into CLI code or Node-only APIs into SDK code.

## The Larger Vision

Snapshot is the frontend layer of a config-driven full-stack platform. The backend manifest (bunshot) and the frontend manifest (snapshot) together describe a complete application. The user never writes boilerplate — they describe what they want; the platform generates a running full-stack app.

**Frontend manifest structure (in development):**
```json
{
  "frontend": {
    "theme": { "colors": { "primary": "#2563eb" }, "radius": "md", "font": "inter" },
    "pages": {
      "/": {
        "layout": "sidebar",
        "content": [
          { "type": "row", "gap": "md", "children": [
            { "type": "stat-card", "data": "GET /api/stats/users", "span": 4 }
          ]},
          { "type": "table", "id": "users-table", "data": "GET /api/users", "columns": "auto" }
        ]
      }
    },
    "auth": { "screens": ["login", "register", "forgot-password", "mfa"] },
    "nav": [{ "label": "Users", "path": "/users", "icon": "users", "roles": ["admin"] }]
  }
}
```

Everything above is Snapshot's domain. The `bunshot sync` command bridges them: reads the backend OpenAPI spec → generates typed API client + hooks → generates page components and data bindings from the frontend manifest.

## Code Patterns

1. **Factory pattern for SDK instances** — `createSnapshot(config)` is the single entry point.
   Returns a `SnapshotInstance` with all hooks closed over the factory scope. No module-level
   singletons, no shared mutable state between instances.

2. **No backwards compatibility shims** — No re-export barrels or compat shims. Delete old
   locations entirely.

3. **Hooks are closures, not globals** — Every hook is created inside `createSnapshot` and
   captures `api`, `queryClient`, `tokenStorage`, etc. from the closure. No hooks that reach
   out to a global store or singleton.

4. **Coding style** — Write complete production-grade fixes, not minimal outlines. Every phase
   lands as real, supportable code with tests and cleanup.

5. **TypeScript casts** — `as unknown as T` only at opaque optional-dep boundaries. No `any`.
   No unnecessary hard casts. If a discriminated union narrows correctly, don't cast.

6. **No import/re-export funnels** — No barrel files. Package entry points define the public
   API surface.

7. **Minimal public API** — No internals leaking. The less surface area, the fewer breaking
   changes.

8. **Separation of concerns** — SDK modules by domain (`auth/`, `community/`, `webhooks/`,
   `ws/`, `sse/`). CLI templates are pure string-returning functions. Scaffold logic is
   separate from template content. Config-driven UI components own their own data fetching
   and internal state — don't let orchestration modules inline domain logic.

9. **Types** — Shared types in `types.ts`. Never redefine the same shape in two places. 100%
   uniform naming conventions.

10. **Peer dependencies are boundaries** — React, TanStack Query, TanStack Router, Jotai, Zod,
    and Vite are peer dependencies. The SDK must tree-shake cleanly.

## Architecture Patterns

11. **Contract-driven API layer** — `AuthContract`, `communityContract` etc. define endpoint
    shapes separately from the API client. New domain modules follow the same pattern.

12. **No shell interpolation in CLI** — Structured arg passing only. User-controlled values
    never pass through shell interpretation.

13. **Templates are pure functions** — Every CLI template returns a string. No filesystem
    access inside templates. The scaffold layer handles writing.

14. **Section markers for generated files** — Use `// --- section:name ---` /
    `// --- end:name ---` markers where consumers may need to override sections.

15. **Test what you ship** — Every feature includes tests. Hook behavior tested with vitest.
    CLI scaffold output tested as string assertions. No tests that depend on a live network.

## SDK Patterns

16. **SSE registry** — `SseManager` instances stored in a per-`createSnapshot` Map keyed by
    endpoint path. One connection per endpoint, multiple subscribers via `manager.on/off`.

17. **WebSocket manager** — One `WebSocketManager` per `createSnapshot` instance, stored in a
    Jotai atom. Initialized lazily on first use.

18. **TanStack Query as cache** — All server state goes through `queryClient`. The `queryClient`
    is created once per `createSnapshot` call. Invalidation after mutations is the hook's
    responsibility.

19. **Auth token storage is pluggable** — `createTokenStorage` accepts a strategy. Never
    hardcode where tokens live.

20. **CLI scaffold is additive** — `snapshot init` creates files, never overwrites without
    confirmation. `snapshot sync` is the only operation that safely overwrites generated files.

## Config-Driven UI Patterns

These govern the design token system and config-addressable component library being developed.

21. **Design tokens are the styling boundary** — Components consume tokens, not raw CSS values.
    Token categories: color (semantic: primary, danger, muted), spacing scale, radius scale,
    font scale, component-level tokens. Dark/light mode is a token switch, not a separate theme.
    Breakpoint-aware tokens accept either a flat value or a breakpoint map:
    `{ "default": 1, "md": 2, "lg": 3 }`.

22. **Components are higher-level abstractions** — A config-driven component (table, form,
    stat-card, chart, feed, modal) is not just a React component with props. It:
    - Has a Zod config schema describing what the manifest can set
    - Fetches its own data from its bound endpoint using the generated API client
    - Manages its own loading, error, and empty states internally
    - Publishes its current value by `id` to a page-level context
    - Subscribes to values from other components via `{ "from": "component-id" }`
    - Never exposes React props, useState, or atoms to the user — only its config schema

23. **Inter-component data binding via `from` refs** — Components that drive other components
    declare an `id`. Components that consume that value use `{ "from": "id" }` in their config.
    The framework manages reactive state (atoms/signals) underneath. The user describes
    relationships, not wiring.

24. **Fixed action vocabulary** — User interactions are expressed as named actions, not
    arbitrary JavaScript. The vocabulary is: `navigate`, `api`, `open-modal`, `close-modal`,
    `refresh`, `set-value`, `download`, `confirm`, `toast`. Each action has a defined config
    schema. New actions must be added to the vocabulary, not inlined.

25. **Interaction presets** — Hover/press/focus/enter states are named tokens (e.g., `lift`,
    `glow`, `fade-in`, `scale-down`, `ring`). Duration tokens: `instant`, `fast`, `normal`,
    `slow`. Components reference presets, not raw CSS transitions. Custom animations that
    cannot be expressed as presets go in the code escape hatch.

26. **Code escape hatch is a last resort** — Custom components that config cannot express are
    registered by name and referenced from the manifest (`{ "type": "custom", "component":
    "MyComponent" }`). Generated code lives in `generated/` and is never hand-edited.
    Custom code lives alongside it and is never overwritten by `snapshot sync`. The escape
    hatch exists; it should not be the default path.

27. **bunshot sync generates from manifest + OpenAPI** — The sync command bridges backend and
    frontend. It reads the backend's OpenAPI spec to know response shapes, then:
    - Generates typed API client + hooks (current behavior)
    - Generates page components from the frontend manifest + OpenAPI schema
    - Auto-derives form fields, table columns, and detail views from response types
    - Generates nav and auth flow screens from manifest config
    - Generates theme CSS/variables from design tokens

28. **JSDoc on public API** — Every exported function, hook, type, and class must have
    up-to-date JSDoc. Stale or missing docs on public surface area is a bug.

29. **Documentation parity** — Any change to a public API, config option, or behavior
    documented in `docs/` must be reflected there in the same commit.

    **Before closing any task**, independently verify:
    - Every exported symbol you touched: is the JSDoc accurate?
    - Every `docs/` page referencing the affected feature: does it still describe reality?

## Definition of Done

Work is not finished until all of the following pass:

```sh
bun run typecheck        # tsc --noEmit
bun run format:check     # Prettier formatting check (run `bun run format` to fix)
bun run build            # tsup + oclif manifest
bun test                 # full test suite (vitest run)
```

Additionally, for every change that touches a public API, config option, or user-visible
behavior, verify:

- [ ] JSDoc updated on every affected exported symbol (same commit)
- [ ] `docs/` updated or created for every affected user-visible feature

If any of these fail or are missing, the work is not done. Fix the issue before moving on.

## Writing Specs

When writing or updating implementation specs, follow the process in `docs/spec-process.md`.
Key points: audit the codebase before writing, surface architectural decisions to the developer,
resolve all ambiguity before handoff, separate tracks on separate branches.
