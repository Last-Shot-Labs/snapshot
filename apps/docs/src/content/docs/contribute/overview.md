---
title: Contributor Flow
description: How Snapshot contributors and implementation agents should discover context and keep docs aligned with code.
draft: false
---

Snapshot contributor flow is intentionally narrow so humans and agents do not need to rediscover repo structure on every change.

If you are implementing Snapshot through an agentic workflow, continue with [Agent Flow](/contribute/agent-flow/) after this page.

## Read in this order

1. `docs/engineering-rules.md`
2. `docs/documentation-policy.md`
3. root `CLAUDE.md`
4. the nearest surface `CLAUDE.md`
5. the relevant public entrypoint
6. the relevant schema, runtime, registry, and example files

## Then do the work

1. implement the code change
2. update JSDoc for public exports
3. update generated docs inputs
4. update impacted guides
5. update impacted examples or playground coverage
6. run `bun run docs:ci`

If any public behavior changed and docs did not move with it, the work is incomplete.
