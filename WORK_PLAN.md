# Snapshot Work Plan

Config-driven full-stack frontend framework. Extensible, maintainable, no shortcuts.

---

## Track 1: Foundation Work

Improvements to what exists. Selective hooks, multi-client, workspaces, offline docs.

### 1.1 — Selective Hook Syncing

Currently `snapshot sync` generates ALL hooks and types from an OpenAPI spec as one monolithic output. Needs to support selection — users pick which endpoint groups they want hooks for.

**Work:**

- Add a sync manifest file (`snapshot.sync.json` or section in config) that declares which endpoint groups to include/exclude
- Refactor `src/cli/sync.ts` to read the sync manifest and filter OpenAPI paths before generating
- Support glob-style endpoint selection: `{ "include": ["/auth/**", "/users/**"], "exclude": ["/admin/**"] }`
- Generated output should tree-shake cleanly — unused hooks don't exist in the output, not just unexported
- Add `--interactive` flag to `sync` command that presents discovered endpoints and lets user pick
- Tests: sync with full spec, sync with filtered spec, verify excluded hooks don't appear in output

### 1.2 — Multi-Client Generation

Currently generates one API client and one set of hooks pointing at one bunshot instance. Needs to support multiple backends (e.g., main API + analytics API + admin API).

**Work:**

- Extend sync manifest to support named clients:
  ```json
  {
    "clients": {
      "main": { "url": "...", "include": ["/auth/**", "/users/**"] },
      "analytics": { "url": "...", "include": ["/events/**", "/metrics/**"] }
    }
  }
  ```
- Each client generates its own directory: `generated/main/`, `generated/analytics/`
- Each has its own typed API client, hooks, and types — fully independent
- Shared types across clients can be extracted to `generated/shared/` if identical shapes detected
- Update Vite plugin to watch multiple schemas
- Update `createSnapshot` to accept multiple API client configs
- Tests: multi-client generation, type isolation, shared type extraction

### 1.3 — Apps-in-Apps / Workspace Structure

Mirror bunshot's multi-tenancy — a snapshot "workspace" maps to a bunshot tenant. Support nested app contexts.

**Work:**

- Design a `SnapshotWorkspace` concept — a scoped instance within a parent snapshot instance
- Each workspace has its own: API base URL (tenant-prefixed), query cache namespace, WS/SSE subscriptions
- Factory function: `snapshot.createWorkspace({ tenantId, apiBase })` returns scoped hooks
- Workspace hooks use the parent's QueryClient but namespace cache keys: `[tenantId, ...key]`
- WS rooms scoped per workspace, SSE endpoints scoped per workspace
- Auth stays at the parent level (you log in once, workspaces are authorization-scoped)
- Tests: workspace creation, cache isolation, auth inheritance, WS/SSE scoping

### 1.4 — Offline Docs Support

Bundle the OpenAPI spec and/or custom docs as a static asset for offline use.

**Work:**

- Add `snapshot sync --bundle` that writes the raw OpenAPI JSON to a static asset path
- Vite plugin serves it at a configurable route (e.g., `/api-docs.json`)
- Optional: generate a lightweight interactive API browser component (similar to Scalar but embedded)
- Tests: bundled spec matches source, vite plugin serves correctly

---

## Track 2: Design Token System

The foundation for config-driven UI. Every visual property flows through tokens, not raw CSS values.

### 2.1 — Token Schema Definition

**Work:**

- Create `src/tokens/schema.ts` — Zod schema for the full token set
- Token categories:
  - **Color**: `primary`, `secondary`, `destructive`, `muted`, `accent`, `background`, `foreground`, `border`, `ring` — each with light/dark variants
  - **Spacing**: scale (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`) mapping to rem values
  - **Radius**: scale (`none`, `sm`, `md`, `lg`, `xl`, `full`)
  - **Typography**: font families (sans, mono, serif), size scale, weight scale, line-height scale
  - **Shadows**: scale (`sm`, `md`, `lg`, `xl`)
  - **Breakpoints**: `sm`, `md`, `lg`, `xl`, `2xl` mapping to pixel values
  - **Z-Index**: named layers (`dropdown`, `modal`, `tooltip`, `toast`)
  - **Transitions**: duration scale (`fast`, `normal`, `slow`), easing presets (`ease-in`, `ease-out`, `spring`)
  - **Interaction**: named presets (`hover:lift`, `hover:glow`, `press:scale-down`, `focus:ring`)
- All tokens are plain values (strings/numbers), not CSS variables — the generation layer produces CSS variables from them
- Token Zod schema is the source of truth — validated at generation time
- Tests: schema validates valid token sets, rejects invalid

### 2.2 — Token Presets

**Work:**

- Create `src/tokens/presets/` directory
- Ship presets: `default`, `neutral`, `bold`, `minimal` — each a complete token set
- Presets are plain objects conforming to the token schema, deeply merged with user overrides
- Factory: `createTokens(preset, overrides?)` → validated token set
- Tests: all presets pass schema validation, overrides merge correctly, deep merge doesn't lose nested values

### 2.3 — Token Resolution & CSS Generation

**Work:**

- Create `src/tokens/resolve.ts` — pure function: token set → CSS custom properties string
- Handles light/dark mode: generates `:root { --color-primary: ... }` and `.dark { --color-primary: ... }`
- Handles responsive tokens: generates media query blocks for breakpoint-aware values
- Create `src/tokens/provider.tsx` — React context provider that injects token CSS into the document
- Provider accepts token set, injects `<style>` element with generated CSS
- No runtime token lookups — all resolved to CSS variables at render time
- Tests: CSS output matches expected for each preset, dark mode variables correct, responsive media queries correct

### 2.4 — Token Utilities

**Work:**

- Create `src/tokens/utils.ts` — helpers for consuming tokens in components
- `token(path)` → returns CSS variable reference: `token('color.primary')` → `var(--color-primary)`
- `tokenValue(path, tokens)` → returns raw value: `tokenValue('spacing.md', tokens)` → `'1rem'`
- Breakpoint-aware prop helper: accepts `{ default: 'sm', md: 'lg' }` → generates responsive classes/styles
- Tests: variable references correct, breakpoint expansion correct

---

## Track 3: Component Library with Config Schemas

Components that can be configured from manifests. Each component has a Zod config schema and a React implementation.

### 3.1 — Component Architecture

**Work:**

- Create `src/components/` directory structure:
  ```
  src/components/
    registry.ts           — component registry (name → component + schema)
    types.ts              — shared component types
    data/
      table.tsx           — data table with sorting, filtering, pagination
      table.schema.ts     — Zod schema for table config
      detail.tsx          — detail view (key-value display)
      detail.schema.ts
      stat-card.tsx       — stat display with trend
      stat-card.schema.ts
      feed.tsx            — activity feed / list
      feed.schema.ts
    forms/
      form.tsx            — auto-generated form from schema
      form.schema.ts
      field.tsx           — individual form field (resolves type → input)
      field.schema.ts
    layout/
      row.tsx             — horizontal layout with gap and span
      row.schema.ts
      stack.tsx           — vertical layout
      stack.schema.ts
      card.tsx            — container with padding, border, shadow
      card.schema.ts
      sidebar.tsx         — sidebar layout
      sidebar.schema.ts
    nav/
      nav.tsx             — navigation bar
      nav.schema.ts
      breadcrumb.tsx
      breadcrumb.schema.ts
    auth/
      login.tsx           — login form (config-driven)
      login.schema.ts
      register.tsx
      register.schema.ts
      forgot-password.tsx
      forgot-password.schema.ts
    feedback/
      modal.tsx           — modal / dialog
      modal.schema.ts
      toast.tsx           — toast notification
      toast.schema.ts
      empty-state.tsx
      empty-state.schema.ts
    chart/
      chart.tsx           — chart wrapper (line, bar, pie, area)
      chart.schema.ts
  ```
- Every component: `.tsx` for implementation, `.schema.ts` for Zod config schema
- Components are headless by default — consume tokens via CSS variables, not hardcoded styles
- Components accept both direct props AND config object — config is the manifest-driven path, props are the code-driven path
- Tests: each component renders from config, handles missing optional props

### 3.2 — Component Registry

**Work:**

- Create `src/components/registry.ts` — maps component names to implementations + schemas
- Factory: `createComponentRegistry()` → registry instance
- Methods: `register(name, component, schema)`, `resolve(name)`, `list()`, `getSchema(name)`
- Hierarchical composition: `registry.extend()` creates child that inherits parent's components
- Built-in components registered by default, user components override or extend
- Mirrors bunshot's `HandlerRegistry` pattern exactly
- Tests: registration, resolution, override, listing, schema retrieval

### 3.3 — Data-Bound Components

**Work:**

- Components that bind to API endpoints need a data binding layer
- Create `src/components/data-binding.ts`:
  - `useDataSource(config)` hook — takes `{ endpoint: "GET /api/users", params?, filters? }` and returns `{ data, isLoading, error, refetch }`
  - Resolves endpoint to the generated API client method
  - Handles cursor pagination, sorting, filtering as config
  - Supports polling interval for live data
- Table: config says `"data": "GET /api/users"` → auto-fetches, auto-paginates
- Form: config says `"data": "POST /api/users"` → auto-submits to endpoint
- OpenAPI schema integration: if available, auto-infer column types, form field types from response/request schemas
- Tests: data binding fetches correctly, pagination works, form submission works

### 3.4 — Inter-Component Communication

**Work:**

- Create `src/components/page-context.ts`:
  - Page-level reactive context for component value sharing
  - Components with `id` publish their current value
  - Components reference others via `{ from: "component-id" }` in config
  - Implementation: jotai atom family keyed by component ID
  - `usePageValue(id)` — subscribe to another component's value
  - `usePublishValue(id, value)` — publish own value to context
- Enables: select drives table filter, search input drives multiple lists, tab selection drives content
- Tests: value publishing, subscription, multiple subscribers, value update propagation

### 3.5 — Action System

**Work:**

- Create `src/components/actions.ts`:
  - Fixed vocabulary of actions components can trigger:
    - `navigate` — router.navigate(to)
    - `api` — call API endpoint with params
    - `open-modal` — open modal by ID with content config
    - `close-modal` — close modal by ID
    - `refresh` — refetch data source by component ID
    - `set-value` — set another component's value
    - `download` — trigger file download from endpoint
    - `confirm` — show confirmation dialog, proceed on confirm
    - `toast` — show notification message
  - `executeAction(action, context)` — pure dispatcher
  - Actions compose: `{ action: "confirm", message: "Delete?", onConfirm: { action: "api", method: "DELETE", endpoint: "/api/users/{id}" } }`
  - Actions reference page context values: `{ endpoint: "/api/users/{from:selected-user}" }`
- Tests: each action type executes correctly, composition works, context value interpolation works

---

## Track 4: Frontend Manifest Schema

The Zod schema that describes a full frontend app declaratively. Frontend equivalent of bunshot's `AppManifest`.

### 4.1 — Manifest Schema

**Work:**

- Create `src/manifest/schema.ts` — full frontend manifest Zod schema
- Top-level sections:
  ```typescript
  {
    manifestVersion: 1,
    meta: { name, version },
    theme: { preset?, tokens? },
    auth: { screens: [...], redirect },
    nav: [{ label, path, icon, roles? }],
    pages: {
      "/": { layout, components: [...] },
      "/users": { ... },
      "/users/:id": { ... }
    },
    features: [
      { feature: "community", config: {} },
      { feature: "webhooks", config: {} }
    ],
    api: {
      baseUrl: "...",
      auth: "cookie" | "token"
    },
    ws: { ... },
    sse: { ... },
    environments: {
      production: { api: { baseUrl: "..." } },
      development: { api: { baseUrl: "..." } }
    }
  }
  ```
- Page definition schema:
  ```typescript
  {
    layout: "sidebar" | "topnav" | "full" | "split",
    title?: string,
    roles?: string[],
    components: ComponentConfig[]
  }
  ```
- Component config schema — discriminated union by `type`:
  ```typescript
  { type: "table", id?, data, columns?, actions?, pagination?, ... }
  { type: "form", id?, data, fields?, onSuccess?, ... }
  { type: "row", gap?, children: ComponentConfig[] }
  { type: "custom", component: "MyComponent" }
  ```
- Every `data` field is an endpoint reference: `"GET /api/users"` or `{ endpoint: "GET /api/users", params: { status: { from: "status-filter" } } }`
- Every action field uses the action vocabulary from Track 3.5
- Tests: schema validates example manifests, rejects invalid configs, round-trips through JSON

### 4.2 — Manifest Constraints

**Work:**

- Create `src/manifest/constraints.ts` — constraint engine mirroring bunshot's pattern
- Rules:
  - `data-source-required` — table/chart/feed/detail must have a `data` field
  - `form-endpoint-required` — form must have a `data` field pointing to a mutating endpoint
  - `nav-path-exists` — nav items should reference defined pages
  - `component-id-unique` — component IDs must be unique within a page
  - `from-ref-exists` — `{ from: "id" }` must reference an existing component ID on same page
  - `auth-screens-valid` — auth screen names must be from known set
  - `layout-children-required` — row/stack/card must have children array
  - `modal-id-required` — modal components need an ID (for open-modal action to target)
  - `custom-component-registered` — `{ type: "custom", component: "X" }` requires X in registry
- Constraint engine is pluggable: `engine.addRule(rule)`, `engine.removeRule(id)`
- Tests: each rule individually, custom rule registration, error vs warning severity

### 4.3 — Manifest Handler Registry

**Work:**

- Create `src/manifest/registry.ts` — handler registry for frontend concerns
- Categories:
  - `component` — custom React components referenced by name
  - `layout` — custom layout components
  - `action` — custom actions beyond the built-in vocabulary
  - `validator` — custom form field validators
  - `formatter` — custom data display formatters (date, currency, etc.)
  - `guard` — custom route guards / access checks
- Same hierarchical composition as bunshot: `createHandlerRegistry()`, `registry.extend()`
- Built-in formatters registered by default: `date`, `datetime`, `currency`, `number`, `percent`, `relative-time`, `truncate`
- Tests: registration, resolution, override, listing per category

### 4.4 — Manifest Audits

**Work:**

- Create `src/manifest/audits/` directory mirroring bunshot's audit suite
- Audit rules:
  - `accessibility/form-labels` — forms need labels on fields
  - `accessibility/nav-aria` — nav needs accessible labels
  - `ux/empty-state` — tables/lists should have empty state config
  - `ux/loading-state` — data-bound components should handle loading
  - `ux/error-state` — data-bound components should handle errors
  - `ux/confirm-destructive` — delete actions should have confirm
  - `performance/pagination` — large list endpoints should have pagination config
  - `security/no-sensitive-display` — flag fields named password/secret/token in detail views
  - `consistency/theme-coverage` — all required token categories present
- Each audit returns `AuditResult[]` with severity, path, message, suggestion, optional auto-fix patch
- Runner: `runAudits(manifest, rules?)` → `AuditResult[]`
- Tests: each rule individually, auto-fix patches apply correctly

---

## Track 5: Page Generation from Manifest + OpenAPI

The generation layer that produces real React pages from config. Frontend equivalent of bunshot's `generateConfig()`.

### 5.1 — Generator Pipeline

**Work:**

- Create `src/generation/generator.ts` — the main pipeline
- Pipeline: `generateApp(manifest, options) → GenerationResult`
  - Phase 1: Validate manifest schema
  - Phase 2: Check constraints
  - Phase 3: Run audits (warnings don't block)
  - Phase 4: Resolve handlers (custom components, formatters, validators)
  - Phase 5: Generate output (React components, routes, config files)
- Options: `{ registry, openApiSpec?, outputDir, framework: 'tanstack-router' }`
- Output: `Record<string, string>` — filename → source code (same pattern as bunshot entity generation)
- Generation is a pure function: same manifest + same registry + same OpenAPI spec = identical output
- Tests: minimal manifest generation, full manifest generation, determinism test

### 5.2 — Page Generator

**Work:**

- Create `src/generation/pages.ts` — generates page components from manifest page definitions
- For each page in the manifest:
  - Generate a React component file
  - Resolve layout → wrap in layout component
  - Walk component tree → generate JSX for each config component
  - Data-bound components → generate `useDataSource` calls with endpoint + params
  - Inter-component refs (`{ from: "id" }`) → generate `usePageValue` calls
  - Actions → generate `executeAction` calls wired to handlers
  - Custom components → generate import + render for registered component name
- Output: one `.tsx` file per page, one `routes.ts` file for TanStack Router setup
- Tests: generated page renders, data binding works, actions fire, custom components render

### 5.3 — Route Generator

**Work:**

- Create `src/generation/routes.ts` — generates TanStack Router route tree from manifest pages
- Maps page paths to route definitions with:
  - `beforeLoad` guards based on `roles` config (uses `protectedBeforeLoad` or custom guard)
  - Nested routes from path hierarchy
  - Layout routes from layout config
- Generates: `routeTree.gen.ts` (TanStack Router convention)
- Tests: route tree matches manifest pages, guards applied correctly, nested routes resolve

### 5.4 — Theme Generator

**Work:**

- Create `src/generation/theme.ts` — generates theme CSS from manifest token config
- Reads `manifest.theme` → resolves preset + overrides → generates CSS file with custom properties
- Outputs: `theme.css` (light + dark mode variables), optional `tailwind.config.ts` extension if Tailwind detected
- Tests: CSS output matches token values, dark mode variables correct

### 5.5 — Scaffold Generator (evolved `snapshot init`)

**Work:**

- Refactor `snapshot init` to optionally accept a manifest file instead of interactive prompts
- `snapshot init --manifest app.manifest.json` → generates full project from manifest
- `snapshot init` (interactive) → generates manifest first, then scaffolds from it
- The interactive flow produces a manifest as intermediate output — the manifest becomes the source of truth even for CLI scaffolding
- The existing template system still works for custom/hand-written code alongside generated code
- Tests: manifest-driven scaffold matches interactive scaffold for equivalent configs

---

## Cross-Cutting Concerns

### Testing Strategy

- Every module has co-located tests (`.test.ts` / `.test.tsx`)
- Schema validation tests: valid input passes, invalid input fails with correct error
- Constraint tests: each rule individually
- Registry tests: registration, resolution, hierarchy
- Generator tests: pure function assertions on output strings
- Component tests: renders correctly from config, data binding works, actions fire
- Integration tests: full manifest → generated app → renders correctly

### Export Strategy

- `@lastshotlabs/snapshot` — createSnapshot, hooks, types (existing)
- `@lastshotlabs/snapshot/tokens` — token system
- `@lastshotlabs/snapshot/components` — component library + registry
- `@lastshotlabs/snapshot/manifest` — manifest schema, constraints, audits, registry
- `@lastshotlabs/snapshot/generation` — generator pipeline
- CLI stays as `snapshot` binary
- No internal modules leak through any subpath

### Dependency on Bunshot Patterns

The following snapshot modules mirror bunshot's config generation architecture:

| Snapshot Module               | Bunshot Equivalent   | Pattern                                                     |
| ----------------------------- | -------------------- | ----------------------------------------------------------- |
| `src/manifest/schema.ts`      | `manifestSchema.ts`  | Zod schema, JSON-serializable, handler refs                 |
| `src/manifest/constraints.ts` | `constraints.ts`     | Pluggable rule engine, error/warning severity               |
| `src/manifest/registry.ts`    | `handlerRegistry.ts` | Hierarchical name→impl resolution, categories               |
| `src/manifest/audits/`        | `audits/`            | Pure functions, severity + path + suggestion + patch        |
| `src/generation/generator.ts` | `generator.ts`       | Pipeline: validate → constrain → audit → resolve → generate |
| `src/components/registry.ts`  | `builtinHandlers.ts` | Default registrations, extend for custom                    |

Same patterns, different domain. Backend resolves rate-limit handlers. Frontend resolves React components.
