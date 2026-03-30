---
name: Platform Vision
description: Full-stack config-driven app platform — describe your app, get a running full-stack application with a URL
type: project
---

## The Product

"Describe your app. Get a running backend. Here's your API URL."

User never sees manifests, config, or framework internals. They interact through chat UI or forms and get a live full-stack app.

## Architecture Layers

**Layer 0: Config Generation (built)** — AppManifest → validate → check constraints → resolve handlers → CreateServerConfig. Built on bunshot framework in `src/framework/config/generation/`.

**Layer 1: Audit Suite (built)** — 31 rules across 4 categories (security, data-layer, scalability, cleanup). Each finding has severity, paths, suggestions, auto-fix patches.

**Layer 2: MCP Server (next to build)** — Tools for LLMs to create/edit/audit/deploy apps. Guardrails enforce audits on every mutation.

**Layer 3: Standalone Platform App (proprietary)** — Config Management API (CRUD manifests, versioning, diffing), Deploy API, Domain Manager, Secrets Manager, Observability, Billing, UI Dashboard.

**Layer 4: Frontend Generation** — Config-driven UI using snapshot framework. Design tokens, component library with config schemas, page composition + data binding via OpenAPI, action vocabulary (navigate, api, open-modal, refresh, etc.), responsive breakpoint maps, interaction presets.

## Frontend Config-Driven Approach

- Components don't expose props/state/atoms to users
- Users think in data sources and actions, not React concepts
- Inter-component communication via `{ "from": "component-id" }` references
- Fixed action vocabulary: navigate, api, open-modal, close-modal, refresh, set-value, download, confirm, toast
- Layout via grid/row/column with breakpoint-aware tokens
- Interaction presets (hover: lift, press: scale-down, enter: fade-in)
- Monaco editor escape hatch for custom components (tier 3, not launch priority)

## Target Audience

- Solo devs who can build frontends but dread backend setup
- Non-devs (need both frontend + backend generation)
- Small teams prototyping
- Agencies needing client backends fast

## Key Insight

The manifest is the single source of truth. Everything above it (UI, MCP, API, chat) produces manifests. Everything below it (framework internals) consumes them. Users never see the manifest directly.
