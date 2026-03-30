---
name: Architecture Decisions
description: Key technical decisions for the platform — config gen, audits, deploy pipeline, handler registry
type: project
---

## Config Generation (implemented on bunshot)

- Manifest is 100% JSON-serializable, no functions, no imports
- Functions become named handler references resolved at generation time via handler registry
- Handler registry supports parent/child composition
- 14 constraint rules validate dependencies before generation
- Pipeline: raw JSON → validate schema → check constraints → resolve handlers → CreateServerConfig

## Audit Suite (implemented on bunshot)

- 31 rules: security (9), data-layer (6), scalability (7), cleanup (9)
- Each finding has: severity, paths, suggestion, optional auto-fix patch
- Auto-fix patches are partial manifests that resolve the finding when merged
- MCP can auto-apply patches or surface to user

## Deploy Pipeline (not yet built)

- Simple: 3-4 hardened presets, not customizable infra
- Caddy for reverse proxy + auto-TLS + domain routing
- Bun processes as systemd services or Docker containers
- Blue/green deploys: start new on different port, health check, swap Caddy upstream, stop old
- Start on Fly.io APIs, migrate to own boxes later

## Frontend Generation (not yet built)

- Design token system (intent-based, not CSS variables)
- Component config schemas (Zod) per component
- Page generation from manifest + OpenAPI spec
- Data binding: manifest endpoint refs → generated hooks via bunshot sync
- Three tiers: pure config → component customization → custom code (Monaco)

## Key Principle

Config versioning from day one (manifestVersion: 1). Migration runner needed before v2.
