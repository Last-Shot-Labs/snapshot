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

Snapshot is the frontend layer of a config-driven full-stack platform. A backend manifest (bunshot) and a frontend manifest (snapshot) together describe a complete application. The user describes what they want; the platform generates a running full-stack app.

`bunshot sync` bridges them: reads the backend OpenAPI spec → generates typed API client + hooks → generates page components and data bindings from the frontend manifest + OpenAPI response shapes.

## Repository Structure

```
src/
  index.ts                     ← SDK entry point (createSnapshot, hooks, types)
  ui.ts                        ← UI entry point (ManifestApp, PageRenderer, components, tokens)
  create-snapshot.tsx           ← factory function (closure-based hooks)
  types.ts                     ← shared SDK types

  api/                         ← API client, error types
  auth/                        ← auth hooks, contract, token storage, MFA, OAuth, WebAuthn
  community/                   ← community hooks, contract, types
  webhooks/                    ← webhook hooks, contract, types
  ws/                          ← WebSocket manager + hooks
  sse/                         ← SSE manager + hooks
  push/                        ← push notification hooks + service worker
  routing/                     ← route guards (protectedBeforeLoad, guestBeforeLoad)
  theme/                       ← useTheme hook (Jotai atomWithStorage, dark mode toggle)
  providers/                   ← React context providers

  ui/                          ← ALL config-driven UI code lives here
    tokens/                    ← token system
      resolve.ts               ← resolveTokens() — build-time CSS variable generation
      editor.ts                ← useTokenEditor() — runtime token overrides
      flavors.ts               ← built-in flavor definitions + defineFlavor()
      types.ts                 ← ThemeConfig, FlavorConfig, token type definitions
      __tests__/
    context/                   ← reactive state management
      page-context.ts          ← PageContext — per-route Jotai atom registry
      app-context.ts           ← AppContext — global atom registry (persists across routes)
      from-ref.ts              ← resolveFromRef() — { "from": "id" } resolution
      types.ts
      __tests__/
    actions/                   ← action executor
      executor.ts              ← executeAction() — dispatch for all action types
      handlers/                ← one file per action type
        navigate.ts
        api.ts
        open-modal.ts
        close-modal.ts
        refresh.ts
        set-value.ts
        download.ts
        confirm.ts
        toast.ts
      types.ts                 ← ActionConfig union type, per-action schemas
      __tests__/
    manifest/                  ← manifest parsing + rendering
      schema.ts                ← Zod schema for snapshot.manifest.json
      page-renderer.tsx        ← <PageRenderer config={page} /> — renders a page from config
      manifest-app.tsx         ← <ManifestApp manifest={m} /> — full app from manifest
      component-registry.ts    ← maps type strings → component implementations
      types.ts
      __tests__/
    components/                ← all config-addressable components
      _base/                   ← shared component utilities (NOT a barrel — internal only)
        use-component-data.ts  ← shared data-fetching hook (endpoint binding)
        use-from-ref.ts        ← shared from-ref subscription hook
        component-wrapper.tsx  ← shared wrapper (data-snapshot-component attr, error boundary)
        types.ts               ← BaseComponentConfig, shared prop types
      layout/                  ← layout + navigation
        layout/                  ← <Layout> (sidebar, top-nav, stacked)
        nav/                     ← <Nav> (sidebar nav, top nav bar)
        row/                     ← <Row> (flex/grid container)
        heading/                 ← <Heading> (h1-h6 with token styling)
      data/                    ← data display
        stat-card/
        data-table/
        detail-card/
        list/
        chart/
        badge/
        empty-state/
        avatar/
      forms/                   ← form + input
        auto-form/
        select/
        toolbar/
      overlay/                 ← modals, drawers, toasts
        modal/
        drawer/
        toast/
      navigation/              ← in-page navigation
        tabs/
        accordion/
        stepper/
        tree-view/
      content/                 ← rich content
        rich-text-editor/
        markdown/
        code-block/
        media-gallery/
        file-uploader/
        timeline/
      communication/           ← messaging + social
        chat-window/
        message-thread/
        notification-feed/
        comment-section/
        reaction-bar/
      commerce/                ← e-commerce
        product-card/
        cart/
        pricing-table/
      workflow/                ← process + audit
        kanban/
        calendar/
        approval-flow/
        audit-log/
        status-tracker/
      admin/                   ← admin tools
        role-manager/
        feature-flag-panel/
      account/                 ← user account
        profile-editor/
        security-settings/
        session-manager/
        notification-prefs/
      documentation/           ← docs + reference
        doc-viewer/
        search-index/
        version-switcher/
        table-of-contents/
        api-reference/
        changelog/
      education/               ← learning
        quiz-builder/
        progress-tracker/
        lesson-viewer/
        certificate-badge/
    presets/                   ← page presets (composed from components)
      crud-page.ts
      dashboard-page.ts
      settings-page.ts
      inbox-page.ts
      storefront-page.ts
      docs-page.ts
      ...
    hooks/                     ← headless hooks for Level 2/3 consumers
      use-data-table.ts        ← table logic without rendering
      use-auto-form.ts         ← form logic without rendering
      use-page-context.ts      ← subscribe to page-level atoms
      use-app-context.ts       ← subscribe to global atoms
      ...

  cli/                         ← CLI (oclif commands, scaffold, templates)
    commands/                  ← oclif command files
    templates/                 ← pure string-returning template functions
    ...

  vite/                        ← Vite plugin (auto-sync)
```

**Rules:**

- **`src/ui/` is the boundary.** All config-driven UI code goes under `src/ui/`. No UI code
  in `src/auth/`, `src/api/`, etc. No SDK domain code in `src/ui/`.
- **UI code accesses the backend through `api`** — the `ApiClient` instance from the factory.
  Never import from `src/auth/`, `src/community/`, etc. directly. The API client is the
  interface between UI components and the backend.
- **Component directories are never flat.** Components are grouped by domain (`data/`,
  `forms/`, `overlay/`, etc.), not dumped into `components/`. If a new component doesn't
  fit an existing group, create a new group with a clear name.
- **Every component is a directory, not a file.** Even simple components get their own
  directory with the standard file structure (see Component File Conventions below).

## Package Entry Points

Three entry points, three audiences:

| Entry | File | Audience | Contains |
|-------|------|----------|----------|
| `@lastshotlabs/snapshot` | `src/index.ts` | SDK consumers | `createSnapshot`, hooks, types, contracts |
| `@lastshotlabs/snapshot/ui` | `src/ui.ts` | Config-driven UI consumers | `ManifestApp`, `PageRenderer`, components, tokens, flavors, actions |
| `@lastshotlabs/snapshot/vite` | `src/vite/index.ts` | Build tooling | Vite plugin for auto-sync |

- SDK consumers who write their own React don't pay for the UI layer.
- UI consumers import from `/ui` for everything config-driven.
- The `/ui` entry imports from the SDK internally (api, auth) but never the reverse.

## Code Patterns

1. **Factory pattern for SDK instances** — `createSnapshot(config)` is the single entry point.
   It returns a `SnapshotInstance` with all hooks and utilities closed over the factory's
   scope. No module-level singletons, no shared mutable state between instances. Each call
   to `createSnapshot` is fully isolated.

2. **No backwards compatibility shims** — No re-export barrels or compat shims. Delete old
   locations entirely.

3. **Hooks are closures, not globals** — Every hook (`useLogin`, `useSocket`, etc.) is created
   inside `createSnapshot` and captures `api`, `queryClient`, `tokenStorage`, etc. from the
   closure. No hooks that reach out to a global store or singleton.

4. **Coding style** — Write complete production-grade fixes, not minimal outlines. Every phase
   lands as real, supportable code with tests and cleanup.

5. **TypeScript casts** — `as unknown as T` only at opaque optional-dep boundaries. No `any`.
   No unnecessary hard casts. If a discriminated union narrows correctly, don't cast.

6. **No import/re-export funnels** — No barrel files funneling internals through a single
   index. The package entry points (`index.ts`, `vite.ts`) define the public API surface.

7. **Minimal public API** — No internals leaking. The less surface area, the fewer breaking
   changes. Anything not explicitly exported from an entry point is internal.

8. **Separation of concerns** — SDK modules by domain (`auth/`, `community/`, `webhooks/`,
   `ws/`, `sse/`). CLI templates are pure string-returning functions. Scaffold logic is
   separate from template content. Don't inline domain logic into `create-snapshot.tsx`.

9. **Types** — Shared types in `types.ts`. Never redefine the same shape in two places. 100%
   uniform naming conventions. If two files define the same shape independently, one is wrong.

10. **Peer dependencies are boundaries** — React, TanStack Query, TanStack Router, Jotai, Zod,
    and Vite are peer dependencies — they are the consumer's choice. Never import them directly
    in SDK code except through the factory (where they're passed in or imported as peer deps).
    The SDK must tree-shake cleanly; unused peer deps must not appear in the bundle.

## Architecture Patterns

11. **Contract-driven API layer** — The `AuthContract` and `communityContract` patterns define
    endpoint shapes separately from the API client. Adding a new auth provider or community
    variant is a contract override, not a client rewrite. Follow this pattern for any new
    domain module.

12. **No shell interpolation in CLI** — CLI commands use structured arg passing. User-controlled
    values never pass through shell interpretation.

13. **Templates are pure functions** — Every CLI template (`templates/*.ts`) is a pure function
    that returns a string. No filesystem access inside templates. The scaffold layer handles
    writing; templates handle content.

14. **Section markers for generated files** — Generated files use
    `// --- section:name ---` / `// --- end:name ---` markers where appropriate so consumers
    can override specific sections without replacing the whole file.

15. **Test what you ship** — Every feature includes tests. Hook behavior tested with vitest.
    CLI scaffold output tested as string assertions. No tests that depend on a live network.

## SDK Patterns

These govern how the SDK works internally.

16. **SSE registry** — `SseManager` instances are stored in a per-`createSnapshot` Map keyed
    by endpoint path. Never create a new `EventSource` per hook call. The registry pattern
    means one connection per endpoint, multiple subscribers via `manager.on/off`.

17. **WebSocket manager** — One `WebSocketManager` per `createSnapshot` instance, stored in a
    Jotai atom. Hooks read from the atom, never creating new connections. The atom is
    initialized lazily on first `useWebSocketManager` call.

18. **TanStack Query as cache** — All server state goes through `queryClient`. The `queryClient`
    is created once per `createSnapshot` call with config-driven stale/gc times. Invalidation
    after mutations is the hook's responsibility — never let stale data persist after a write.

19. **Auth token storage is pluggable** — `createTokenStorage` accepts a strategy (localStorage,
    cookie, custom). The `ApiClient` receives the storage instance, not a raw token. Never
    hardcode where tokens live.

20. **CLI scaffold is additive** — `snapshot init` creates files, never overwrites without
    confirmation. `snapshot sync` is the only operation that safely overwrites generated files.

## Config-Driven UI Patterns

These govern the design token system and config-addressable component library being developed.

21. **Design tokens are the styling boundary** — Components consume tokens, not raw CSS values.
    Token categories: color (semantic: primary, danger, muted), spacing scale, radius scale,
    font scale, component-level tokens. Dark/light mode is a token switch, not a separate theme.
    Breakpoint-aware tokens accept a flat value or a breakpoint map:
    `{ "default": 1, "md": 2, "lg": 3 }`.

22. **Components are higher-level abstractions** — A config-driven component (table, form,
    stat-card, chart, feed, modal) is not just a React component with props. It:
    - Has a Zod config schema describing what the manifest can set
    - Fetches its own data from its bound endpoint using the generated API client
    - Manages its own loading, error, and empty states internally
    - Publishes its current value by `id` to a page-level context
    - Subscribes to values from other components via `{ "from": "component-id" }`
    - Never exposes React props, useState, or atoms to the user — only its config schema

23. **Inter-component data binding via `from` refs** — Components that drive others declare an
    `id`. Components that consume that value use `{ "from": "id" }` in their config. The
    framework manages reactive state (atoms/signals) underneath. The user describes
    relationships, not wiring.

24. **Fixed action vocabulary** — Interactions are expressed as named actions, not arbitrary
    JavaScript: `navigate`, `api`, `open-modal`, `close-modal`, `refresh`, `set-value`,
    `download`, `confirm`, `toast`. Each action has a defined config schema. New actions are
    added to the vocabulary, not inlined.

25. **Interaction presets** — Hover/press/focus/enter states are named tokens (`lift`, `glow`,
    `fade-in`, `scale-down`, `ring`). Duration tokens: `instant`, `fast`, `normal`, `slow`.
    Components reference presets, not raw CSS. Custom animations that can't be expressed as
    presets go in the code escape hatch.

26. **Code escape hatch is a last resort** — Custom components registered by name and
    referenced via `{ "type": "custom", "component": "MyComponent" }`. Generated code lives
    in `generated/` and is never hand-edited. Custom code is never overwritten by sync.

27. **bunshot sync generates from manifest + OpenAPI** — Reads the backend OpenAPI spec to
    know response shapes, then generates: typed API client + hooks (current), page components
    from frontend manifest + OpenAPI, auto-derived form fields / table columns / detail views,
    nav and auth flows from manifest config, theme CSS from design tokens.

28. **JSDoc on public API** — Every exported function, hook, type, and class must have
    up-to-date JSDoc. When you change a signature, param, return value, or behavior, update
    the JSDoc in the same commit. Stale or missing docs on public surface area is a bug.
    Internal helpers do not require JSDoc unless the logic is non-obvious.

29. **Documentation parity** — Any change to a public API, config option, behavior, or concept
    documented in `docs/` must be reflected there in the same commit. Docs that describe the
    old behavior are a bug.

    **Before closing any task**, independently verify:
    - Every exported symbol you touched: is the JSDoc accurate for the new behavior?
    - Every `docs/` page that references the affected feature or API: does it still describe
      reality?

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
