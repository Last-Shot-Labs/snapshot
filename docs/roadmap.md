# Roadmap

> **Last updated:** 2026-04-10 — manifest-only spec drafted, vision rewritten
>
> Modeled on [`bunshot/docs/roadmap.md`](../../bunshot/docs/roadmap.md). Specs progress
> from `docs/specs/<name>.md` (active) → `docs/specs/completed/<name>.md` (done) and
> their entries move from **Now** → **Completed** here.

## Completed

Specs moved to [`docs/specs/completed/`](./specs/completed/).

**Config-driven UI foundation (`config-driven-ui-foundation.md`) — Done 2026-02:**

- Phase 1 — Design token system (`src/ui/tokens/`): Zod schema, `resolveTokens()`,
  `useTokenEditor()`, built-in flavors, dark/light, breakpoint-aware values
- Phase 2 — Page context + `from` ref system: per-route Jotai atom registry, app-level
  registry, `resolveFromRef()`, `useResolveFrom`, `useSubscribe`, `usePublish`
- Phase 3 — Action executor: dispatch for the fixed action vocabulary (navigate, api,
  open-modal, close-modal, refresh, set-value, download, confirm, toast)
- Phase 4 — Manifest schema, page renderer, structural components (row, heading, button,
  select)
- Phase 5 — Layout + Nav components
- Phase 6-9 — StatCard, DataTable, AutoForm, DetailCard
- Phase 10-11 — Modal, Drawer, Tabs (with shared overlay manager)
- Phase 12 — CLI integration: `snapshot init` scaffolds manifest mode, `snapshot sync`
  generates typed clients

**Config-driven platform completion (`config-driven-platform.md`) — Done 2026-03:**

- 30 additional components — communication suite (chat-window, message-thread,
  notification-feed, comment-section, reaction-bar), embeds, missing data primitives,
  workflow primitives (kanban, calendar, approval-flow, audit-log, status-tracker),
  account primitives, content primitives
- Token system polish — global token schemas, shadow tokens, color/component mapping
- Playground — dev-time visual verification environment with all components, fixture
  data, all states (loading/error/empty/populated), token responsiveness

**Phase 13 — next sprint (`phase-13-next.md`) — Done 2026-03:**

- Feed, Chart, Wizard components
- Page presets — `crudPage`, `dashboardPage`, `settingsPage`
- Drag-and-drop system with `@dnd-kit` (kanban, sortable lists)

**Entity page renderer (`entity-page-renderer.md`) — Done 2026-04-09:**

- Entity page mappers — dashboard, detail, form, list, field mappings
- `bunshot sync` generates page configs from backend entity schemas
- Auto-derives table columns / form fields / detail views from OpenAPI response shapes

**SSR/RSC UI compatibility (`ssr-rsc-ui-compatibility.md`) — Done 2026-04-09:**

- Every UI component declares execution context (`'use client'` or server-component
  comment)
- Browser APIs moved out of render bodies into `useEffect`
- `ComponentWrapper` and context providers marked client
- `renderToStaticMarkup` SSR safety tests across the component library
- RSC manifest integration in the manifest renderer

**Manifest auth runtime — Done 2026-04 (no separate spec, multiple commits):**

- `ManifestAuthScreen` component renders all auth screens (login, register, forgot,
  reset, verify-email, mfa) from manifest config
- `manifest.auth` schema with screens, providers, passkey, branding, redirects, fields,
  links, screen options
- Passkey authentication
- User state bridge — `global.user` and `global.auth` exposed via app context
- Workflow-driven `enter`/`leave` lifecycle for routes

**Resource layer + workflow execution — Done 2026-04 (multiple commits):**

- Manifest `resources` block — declarative data sources with cache, polling,
  invalidation, dependsOn
- Workflow nodes: `try/catch`, `capture`, `assign`, `retry` with backoff, conditional
- Resource preload, refreshOnEnter, invalidateOnLeave on routes
- Modal `result` target wiring — modal results flow back into workflows

**Routing primitives + SSR Track E — Done 2026-04 (commit 430f071 + others):**

- Nested layouts (`layout.ts`)
- Parallel routes (`@slot` directories)
- Intercepting routes
- Conventions: `loading.ts` → Suspense, `error.ts` → ErrorBoundary, `not-found.ts` → 404
- SSR middleware (`server/middleware.ts`) for redirects, rewrites, headers
- DX polish — dev error overlay, `defineRoute()`, bundle analyzer

**Prefetch + image — Done 2026-04 (multiple commits):**

- `usePrefetchRoute` hook
- `<PrefetchLink>` component (hover/viewport prefetch)
- `<SnapshotImage>` — sharp, responsive srcset, blur placeholder

## Now — Active Specs

**Manifest-only completion (`manifest-only.md`) — In progress:**

The drive to 100% manifest capability. Eight tracks, file-disjoint, parallel branches:

| Track | Goal |
|---|---|
| **A** | Remove hardcoded behavior — auth path inference, layout fallback, magic `"custom"` type, side-effect component/workflow registration, hardcoded loading divs |
| **B** | Collapse `SnapshotConfig` into the manifest. Bootstrap shrinks to four fields. Adds `{ "env": "..." }` resolver. |
| **C** | Declarative registries — components, workflow actions, flavors, custom-component schemas, all declarable from the manifest with code as one source. |
| **D** | Activate `policies` and `i18n` — both currently exist as schema placeholders with no runtime. |
| **E** | Multi-app — `clients` block (per-resource backend selection) and `subApps` block (sub-manifest mounting). |
| **F** | Manifest-driven SSR + routing — close the gaps so nested layouts, parallel routes, error/loading/404/500/offline, and middleware are all manifest-declarable. |
| **G** | Realtime + cache + optimistic — WS/SSE event → workflow mapping, per-resource invalidation/optimistic, form submission lifecycle. |
| **H** | App-level services — toast, analytics, push notifications, token editor persistence, OAuth/MFA/WebAuthn full config. |

Spec at [`docs/specs/manifest-only.md`](./specs/manifest-only.md).

## Later — Needs Its Own Spec

These are real future work, not ideas. Each gets a spec when it reaches the top of the
queue.

**Multi-tenant / multi-backend deepening:**

- Sub-manifest hot-reload (load sub-manifests on demand without full app reload)
- Per-tenant token overrides served from a backend resource

**Sync evolution:**

- **Selective hook syncing** — manifest of available hooks, consumer picks which to
  generate. Tree-shaking for API clients. Don't generate hooks for endpoints the manifest
  doesn't reference.
- **Multiple hook/client sets** — first-class `bunshot sync` support for emitting more
  than one client from a single project (multi-backend, multi-tenant). Track E of the
  manifest-only spec covers the runtime side; this is the codegen side.
- **Offline docs** — bundle the OpenAPI spec + custom docs as a static asset. Snapshot
  reads from `/openapi.json` or a local file. Partially supported via Vite plugin's
  `file` option today.

**Visual + DX:**

- **Visual page builder** — runtime manifest editor, persists to backend or filesystem,
  built on `<PageRenderer>` and `useTokenEditor()`.
- **Code escape hatch v2 (Monaco)** — embedded Monaco editor for Bunshot Cloud users to
  write custom components and custom workflow actions in the browser dashboard with full
  IntelliSense from generated types. Generated/custom code persists into the user's
  project.
- **Manifest LSP** — language server for `snapshot.manifest.json` providing completion,
  hover, go-to-definition, and validation in any editor.

**Speculative:**

- **State-as-config / FSM** — declarative state machines in the manifest. The brainstorm
  tied this to the "base + flavors" idea: apply config-driven variants to state
  transitions. Worth a spec when the use case becomes concrete.

## Eventually — Wishlist

- Bunshot Cloud-hosted manifest editor with live preview
- AI manifest generation from natural language (paired with bunshot's MCP server)
- Cross-manifest type inference — frontend manifest validates against backend manifest
  at sync time, not just at runtime
- Native mobile shell that consumes the same manifest (React Native or Capacitor)
- Plugin marketplace — third-party flavors, components, workflow actions distributed via
  npm with auto-registration
