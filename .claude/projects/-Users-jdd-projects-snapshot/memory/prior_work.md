---
name: Prior Work
description: What's been built so far across bunshot and snapshot repos
type: project
---

## Bunshot (backend framework) — /Users/jdd/projects/bunshot

- Mature production-grade Bun + Hono framework
- Monorepo with 12 packages (core, auth, admin, community, webhooks, push, mail, permissions, postgres, bullmq, entity, docs)
- Full auth system: sessions, JWT, OAuth (9 providers), MFA (TOTP, email OTP, WebAuthn), passkeys, SAML, SCIM, M2M
- Multi-backend: memory, SQLite, MongoDB, PostgreSQL, Redis
- WebSocket + SSE, BullMQ jobs, rate limiting, metrics, OpenAPI docs
- Config generation layer built in src/framework/config/generation/ (on branch claude/add-config-generation-gwRSC):
  - manifestSchema.ts, handlerRegistry.ts, constraints.ts, generator.ts, builtinHandlers.ts
  - Audit suite: runner.ts, securityAudit.ts, dataLayerAudit.ts, scalabilityAudit.ts, cleanupAudit.ts
  - 85+ test cases

## Snapshot (frontend framework) — /Users/jdd/projects/snapshot

- React frontend framework for bunshot backends
- 13 modules: api, auth, cli, community, providers, push, routing, sse, theme, vite, webhooks, ws
- CLI: `snapshot init` (scaffolds full project), `snapshot sync` (generates typed API client + hooks from OpenAPI)
- Auth flow components, OAuth hooks, MFA hooks, WebAuthn hooks
- Jotai atoms for global state, TanStack Query + Router integration
- 40+ scaffolding templates for layouts, auth pages, settings, admin
- Published as @lastshotlabs/snapshot on npm

## What's Next to Build

1. MCP server (on bunshot) — tools for LLMs to create/edit/audit apps
2. Frontend config-driven generation (on snapshot) — token system, component schemas, page generation
3. Platform app (new proprietary repo) — API, deploy pipeline, domain manager, dashboard
