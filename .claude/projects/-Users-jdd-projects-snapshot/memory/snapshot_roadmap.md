---
name: Snapshot Roadmap
description: Planned frontend features for snapshot — config-driven UI, offline docs, multi-client, SSR
type: project
---

## From Brainstorm (bunshot GENERATION_CHAT.md)

- **Offline docs support** — Bundle OpenAPI spec + custom docs as static asset
- **Selective hook syncing** — Manifest of available hooks, snapshot sync generates only selected ones (tree-shaking for API clients)
- **Multiple client/hook sets** — Support multi-app or multi-tenant: each "app" gets its own generated client pointing at a specific bunshot instance
- **Apps-within-apps structure** — Mirror bunshot multi-tenancy: a snapshot "workspace" maps to a bunshot tenant
- **Config-driven component library** — Base component + config = variant. Design tokens for flavors.
- **SSR framework** — Completes the frontend story

## From Platform Vision (business_modl_gaps.md)

- **Frontend manifest schema** — Zod schema for: theme tokens, pages, components, data bindings, nav, auth screens
- **Design token system** — Intent-based tokens (not CSS vars). Spacing, radius, font, colors, interaction presets.
- **Component config schemas** — Zod schema per component defining what manifest can configure
- **Page composition from manifest + OpenAPI** — Components bind to API endpoints, auto-generate from response shapes
- **Action vocabulary** — navigate, api, open-modal, close-modal, refresh, set-value, download, confirm, toast
- **Inter-component communication** — `{ "from": "component-id" }` references, page-level context
- **Responsive breakpoint maps** — Every layout/spacing property accepts flat value or breakpoint map
- **Interaction presets** — Named tokens: hover:lift, press:scale-down, enter:fade-in
- **Monaco editor escape hatch** — In-browser code editor for custom components (tier 3, later feature)

## Three Tiers of Config Coverage

1. **Pure config** — Pre-built components (tables, forms, charts, nav, auth), bind to endpoints, zero code
2. **Component customization** — Config options per component (sortable columns, conditional fields, layout variants)
3. **Custom code** — Monaco editor for the 10-20% config can't express (custom visualizations, 3rd-party widgets)

## Priority

User wants snapshot work to be the current focus. Build with the full platform vision in mind.
