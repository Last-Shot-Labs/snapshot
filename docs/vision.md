# Snapshot Vision & Architecture

> The canonical reference for what Snapshot is, what it is becoming, and the
> architectural principles that decide every design call.

## What Snapshot Is

Snapshot is a **frontend platform driven by a JSON manifest**. Users describe their
application in `snapshot.manifest.json` — pages, navigation, theme, auth, workflows,
overlays, state, resources, policies, i18n, multi-app composition — and Snapshot runs it.
No React code is required to ship a complete application. Code is reserved for the four
escape hatches listed below; everything else is configuration.

Snapshot ships three surfaces:

| Surface | Entry | Audience |
|---|---|---|
| **Manifest runtime** | `@lastshotlabs/snapshot/ui` | Anyone shipping an app from JSON. The default path. |
| **SDK** | `@lastshotlabs/snapshot` | Consumers who write their own React but want typed hooks for the bunshot backend. |
| **CLI** | `snapshot init`, `snapshot sync` | Scaffolding and bridging the backend OpenAPI to typed clients. |

## Two Manifests, One Platform

Snapshot is one half of a two-manifest platform:

- **Bunshot** declares the **backend contract** — entities, operations, channels,
  permissions, auth backend, plugins. Lives in `bunshot.manifest.json`.
- **Snapshot** declares the **frontend contract** — pages, navigation, theme, auth
  screens, workflows, overlays, state, resources, policies, i18n, multi-app composition.
  Lives in `snapshot.manifest.json`.
- **`bunshot sync`** is the **bridge**, not the authority. It reads the backend's
  OpenAPI spec and emits typed clients/hooks that the frontend manifest's `resources`
  layer references by name. It does not author the frontend manifest. It does not
  decide what the frontend looks like.

The two manifests are **peers**, not parent/child. Both are required. Both are the
deployment surface. A Snapshot app is fully described by its manifest plus the typed
clients generated from the backend's OpenAPI. There is no third source of truth.

```
┌─────────────────────────┐         ┌──────────────────────────┐
│   bunshot.manifest.json │         │ snapshot.manifest.json   │
│   (backend contract)    │         │ (frontend contract)      │
│                         │         │                          │
│  entities               │         │  pages                   │
│  operations             │         │  navigation              │
│  channels               │         │  theme                   │
│  permissions            │         │  auth                    │
│  auth backend           │         │  workflows               │
│  plugins                │         │  overlays                │
└────────────┬────────────┘         │  state                   │
             │                      │  resources               │
             │ OpenAPI              │  policies                │
             ▼                      │  i18n                    │
   ┌──────────────────┐             │  subApps                 │
   │  bunshot sync    │────────────▶│  clients                 │
   │  (bridge)        │   typed     └────────────┬─────────────┘
   └──────────────────┘   hooks                  │
                                                 ▼
                                       ┌──────────────────┐
                                       │  ManifestApp     │
                                       │  (runtime)       │
                                       └──────────────────┘
```

## The Manifest Is the App. Code Is the Escape Hatch.

There is one default level of usage: **the manifest**. Everything that can be a feature
is expressible in `snapshot.manifest.json`. Code is not a parallel option. Code is for
the cases the manifest physically cannot express, and there are exactly four of them:

1. **Bring-your-own React component.** A custom component the user wrote — registered by
   name in code, declared in the manifest's `components.custom` registry with its config
   schema, referenced from page content as `{ "type": "custom", "component": "MyThing" }`.
2. **Bring-your-own workflow action.** A custom action handler — registered by name in
   code, declared in the manifest's `workflows.actions.custom` registry with its config
   schema, referenced from any workflow as `{ "action": "my-action", ... }`.
3. **Bring-your-own resource client.** A custom data source the typed OpenAPI client
   cannot model (third-party SDK, GraphQL, raw fetch) — registered in code, declared in
   the manifest's `clients` block, referenced from any resource as `{ "client": "my-client" }`.
4. **Per-environment values.** API URLs, OAuth client ids, feature flag values — read
   from environment via `{ "env": "VAR_NAME" }` inside the manifest. The values live
   outside the manifest; the manifest's references to them do not.

That is the entire list. No code paths for "this auth thing." No code paths for "this
route thing." No code paths for "this layout thing." If a feature is not in this list of
four hatches, it is in the manifest.

### The Acceptance Test

Every feature, every PR, every spec answers the same question:

> **Can a user enable this feature by editing `snapshot.manifest.json` with no
> TypeScript?**

If the answer is no, the feature is incomplete. This is not aspirational — it is the
test that decides whether work is done. A "code-driven for now" feature is a known gap,
not a valid end state.

### What Bootstrap Looks Like

The only code a manifest user writes is the four-line entry point:

```tsx
import { createSnapshot } from "@lastshotlabs/snapshot";
import manifest from "./snapshot.manifest.json";

const snapshot = createSnapshot({ apiUrl: "https://api.example.com", manifest });
export default snapshot.ManifestApp;
```

`createSnapshot()` accepts exactly four bootstrap fields:

- `apiUrl` — environment, not contract
- `wsUrl` — optional override; derives from `apiUrl` if omitted
- `bearerToken` — `@internal`, test/CLI use only
- `manifest` — the manifest itself

Everything else — auth mode, redirects, token storage, cache policy, SSE endpoints, WS
options, error formatting — lives in the manifest. There is no second source of truth.

## Design Token System

The token system is the styling boundary. Components consume semantic tokens
(`var(--sn-color-primary)`, `var(--sn-spacing-md)`), never raw values. Token values
come from the manifest's `theme` block.

### Token Categories

- **Color** — semantic names (primary, secondary, muted, accent, destructive, success,
  warning, info, background, card, popover, sidebar, border, input, ring, chart-1..5).
  Each color generates a `-foreground` companion automatically for guaranteed contrast.
- **Spacing scale** — `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`.
- **Radius scale** — `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`.
- **Font scale** — sans/mono/display families, size scale (`xs`..`4xl`), weight scale.
- **Shadow scale** — `none`, `xs`, `sm`, `md`, `lg`, `xl`.
- **Z-index scale** — base, dropdown, sticky, overlay, modal, popover, toast.
- **Animation tokens** — duration (`instant`, `fast`, `normal`, `slow`), easing
  (`default`, `in`, `out`, `in-out`, `spring`).
- **Component-level tokens** — `--sn-card-*`, `--sn-table-*`, `--sn-button-*`, etc., for
  per-component override.
- **Dark/light mode** — a token switch, not a separate theme. One config, two generated
  CSS blocks (`:root` and `.dark`).
- **Breakpoint-aware values** — every layout/spacing/sizing token accepts a flat value or
  a breakpoint map: `{ "default": 1, "md": 2, "lg": 3 }`.

### Flavors

A **flavor** is a complete named token preset. Snapshot ships built-in flavors (neutral,
slate, violet, etc.), and the manifest can declare entirely new ones inline:

```json
{
  "theme": {
    "flavor": "neutral",
    "flavors": {
      "my-brand": {
        "extends": "neutral",
        "colors": { "primary": "#e11d48", "accent": "#8b5cf6" }
      }
    }
  }
}
```

Flavors registered in code (via `defineFlavor()`) are equivalent to flavors declared in
the manifest — both populate the same registry. Code registration is one of several
sources, not the only one.

### Build-time + Runtime

- **Build-time:** `snapshot sync` reads `manifest.theme`, calls `resolveTokens()`, and
  emits `snapshot-tokens.css` with all CSS custom properties. Zero runtime cost.
- **Runtime:** `useTokenEditor()` overrides individual tokens at runtime via
  `document.documentElement.style.setProperty()`. Powers theme editor UIs. The
  persistence target (localStorage / cookie / cloud user-prefs) is declared in
  `manifest.theme.editor.persist`, not hardcoded.

## Components

Snapshot ships a complete component library. Every component is **config-addressable**:
the user references it by `type` string in the manifest, and the framework instantiates,
fetches data, manages state, and renders it.

### Component Model

Every config-driven component:

1. Has a Zod config schema describing what the manifest can set.
2. Fetches its own data from its bound endpoint via the typed client.
3. Manages its own loading, error, and empty states internally.
4. Publishes its current value by `id` to the page-level context.
5. Subscribes to values from other components via `{ "from": "component-id" }`.
6. Executes interactions from the fixed action vocabulary.
7. Receives a single `config` prop. No React props leak to the user.

### The Library

Components are organized by domain under `src/ui/components/`:

| Group | Components |
|---|---|
| **layout** | layout shells, nav, row, heading |
| **data** | stat-card, data-table, detail-card, list, chart, badge, empty-state, avatar |
| **forms** | auto-form, select, toolbar, file-uploader, location-input |
| **overlay** | modal, drawer, toast |
| **navigation** | tabs, accordion, stepper, tree-view |
| **content** | rich-text-editor, markdown, code-block, media-gallery, timeline |
| **communication** | chat-window, message-thread, notification-feed, comment-section, reaction-bar |
| **commerce** | product-card, cart, pricing-table |
| **workflow** | kanban, calendar, approval-flow, audit-log, status-tracker |

The library is the **vocabulary**. New components are added when there is a genuinely
new interaction pattern that compositions cannot express. The value is in the wiring,
not the count.

### Custom Components

The escape hatch (#1 above). A user component is registered in code:

```ts
registerComponent("order-timeline", OrderTimeline);
```

…and declared in the manifest with its schema, so the validator knows about it:

```json
{
  "components": {
    "custom": {
      "order-timeline": {
        "schema": { "props": { "orderId": "string" } }
      }
    }
  }
}
```

…and referenced like any other component:

```json
{ "type": "custom", "component": "order-timeline", "orderId": { "from": "order.id" } }
```

The custom component receives the same `config` prop. It can publish via `id`, subscribe
via `from`, dispatch actions, and read from the typed client — same as a built-in.

## Inter-Component Data Binding

A component that drives others declares an `id`. Components that consume its value use
`{ "from": "id" }`:

```json
{
  "content": [
    { "type": "select", "id": "status-filter", "options": ["all", "active"] },
    {
      "type": "data-table",
      "data": "GET /api/users",
      "filters": { "status": { "from": "status-filter" } }
    }
  ]
}
```

Two scopes:

- **Page context** — atoms registered/destroyed with the route. Component-to-component
  refs within a page resolve here by default.
- **App context** — atoms that persist across routes. Refs prefixed with `global.`
  resolve here. Default globals: `global.user`, `global.auth`, `global.theme`,
  `global.notifications`, `global.permissions`. Custom globals declared in
  `manifest.state`.

The implementation uses Jotai atoms in a per-context registry. Subscriptions are
selective; no re-render storms. Atoms are cleaned up automatically on unmount.

## Action Vocabulary

User interactions are **named actions** with declared schemas, not arbitrary JavaScript.

| Action | Description |
|---|---|
| `navigate` | Go to a route. `{ "action": "navigate", "to": "/users/{id}" }` |
| `api` | Call an endpoint. `{ "action": "api", "method": "DELETE", "endpoint": "/api/users/{id}" }` |
| `open-modal` | Open a manifest-declared overlay by id. |
| `close-modal` | Close the topmost or named overlay. |
| `refresh` | Re-fetch a target resource or component. |
| `set-value` | Set another component's value via its id. |
| `download` | Trigger a file download from an endpoint. |
| `confirm` | Show a confirmation dialog before proceeding. |
| `toast` | Show a notification. |
| `run-workflow` | Run a named workflow. |
| `track` | Emit an analytics event. |

Actions compose into **workflows**. A delete button is a workflow:
`confirm` → `api(DELETE)` → `refresh(table)` → `toast(success)`. Workflows live in
`manifest.workflows`, are referenced by name, and are first-class citizens of the
manifest. They support try/catch, retry/backoff, capture, assign, and conditionals.

Custom action handlers are escape hatch #2 — registered in code, declared in the
manifest, referenced by name from any workflow.

## Interaction Presets

Hover, press, focus, and enter states are named tokens, not raw CSS:

```json
{
  "interactions": {
    "hover": "lift",
    "focus": "ring",
    "press": "scale-down",
    "enter": "fade-in"
  }
}
```

| Category | Presets |
|---|---|
| Hover | `lift`, `glow`, `darken`, `lighten`, `outline`, `scale-up` |
| Press | `scale-down`, `darken` |
| Focus | `ring`, `outline`, `glow` |
| Enter/Exit | `fade-in`, `slide-up`, `slide-in`, `scale-in`, `none` |
| Loading | `skeleton`, `pulse`, `spinner` |

Duration tokens: `instant` (0ms), `fast` (150ms), `normal` (250ms), `slow` (400ms).

## Resources, Policies, i18n, Multi-App

The frontend manifest includes first-class sections for:

- **`resources`** — named data sources backed by typed OpenAPI clients (or by custom
  client escape hatches). Components and pages reference resources, not raw URLs.
  Per-resource cache policy, polling, optimistic updates, and invalidation rules are
  declarative.
- **`policies`** — named authorization expressions. Routes guard with `{ "policy": "name" }`,
  components hide with `"visible": { "policy": "name" }`. One vocabulary, used everywhere
  authorization matters. Replaces ad-hoc condition objects.
- **`i18n`** — locale registry, string source paths, and detection strategy. Components
  reference strings via `{ "t": "key.path" }` — parallel shape to `{ "from": "..." }`
  and `{ "env": "..." }`.
- **`clients`** — named backend clients. The default client is the typed OpenAPI client
  generated by `bunshot sync`. Additional clients can point to other backends, other
  tenants, or custom (escape hatch #3) implementations. Resources name a client.
- **`subApps`** — sub-manifests mounted under a path. Sub-manifests inherit theme, i18n,
  and policies from the parent unless overridden. Enables admin sections, embedded
  workspaces, and tenant-scoped UIs without code changes.

## Server-Side Rendering

SSR is fully manifest-driven. The manifest declares routes, preloads, head/meta, guards,
and middleware. The renderer (`@lastshotlabs/snapshot/ssr`) reads the manifest and the
RSC manifest and produces a streaming HTML response. Nested layouts, parallel routes,
intercepting routes, and route conventions (`loading`, `error`, `not-found`) are all
declarable in the manifest. Server-side workflow execution and server actions are
reachable via the same workflow vocabulary used on the client.

## Engineering Constraints

Non-negotiable rules that any feature must respect. Full text in
[`engineering-rules.md`](./engineering-rules.md).

- **Manifest-first.** The acceptance test (above) is the rule.
- **Factory-closure SDK.** No singletons. Every hook is created inside `createSnapshot()`
  and closes over `api`, `queryClient`, `tokenStorage`, etc.
- **No backwards-compat shims.** Pre-production. Change anything. No deprecation cycles.
- **Three entry points, three audiences.** `@lastshotlabs/snapshot` (SDK),
  `@lastshotlabs/snapshot/ui` (manifest runtime + components), `@lastshotlabs/snapshot/vite`
  (build tooling). Internals do not leak.
- **Components consume tokens, never raw values.** The canonical token list is in
  `engineering-rules.md`. Inventing variable names is the #1 source of visual bugs.
- **Every component is a directory** with `schema.ts`, `component.tsx`, `index.ts`, and
  `__tests__/`. No snowflakes.
- **SSR-safe by default.** Every component declares its execution context, all browser
  APIs live in `useEffect`, props across the server/client boundary are JSON-serializable.
- **Tests cover the config, not the implementation.** Schema tests for valid/invalid
  configs. Render tests with config fixtures. SSR safety tests via
  `renderToStaticMarkup`.
- **Docs ship with the feature.** JSDoc on every exported symbol; `docs/` updates in the
  same commit as user-visible behavior changes.

## Relationship to Bunshot Cloud

Snapshot (the framework, MIT) and Bunshot (the backend framework, MIT) are open-source.
Bunshot Cloud (the platform, proprietary) is the hosted runtime that deploys both. The
user describes their app, the platform generates the two manifests, and both are
deployed behind the same domain.

```
User describes app  →  manifests generated  →  bunshot deploys API
                                            →  snapshot deploys UI
                                                       │
                                                       ▼
                                          api.myapp.com  +  myapp.com
```

The framework generates the code. The platform deploys and manages it. The user owns
their manifest. The platform provides operational leverage.

## Where to Go Next

- **What's done, what's next, what's wishlist:** [`roadmap.md`](./roadmap.md)
- **How specs get written:** [`spec-process.md`](./spec-process.md)
- **Engineering rules in full:** [`engineering-rules.md`](./engineering-rules.md)
- **Token reference:** [`tokens.md`](./tokens.md)
- **Action and workflow reference:** [`actions.md`](./actions.md)
- **Component reference:** [`components.md`](./components.md)
- **Data binding patterns:** [`data-binding.md`](./data-binding.md)
- **Customization (escape hatches):** [`customization.md`](./customization.md)
- **SSR:** [`ssr/`](./ssr/)
