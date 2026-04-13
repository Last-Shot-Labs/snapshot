---
title: Agent Flow
description: The repo-native discovery and update path for implementation agents changing Snapshot itself.
draft: false
---

Implementation agents should not scan Snapshot blindly.

Use this discovery order:

1. Read `docs/engineering-rules.md`.
2. Read `docs/documentation-policy.md`.
3. Read root `CLAUDE.md`.
4. Read the nearest surface `CLAUDE.md`.
5. Read the public entrypoint for the surface you are changing.
6. Read the schema, runtime, registry, generator, and example files named by that surface guide.

Then execute the change in one pass:

1. update the code
2. update JSDoc on affected public exports
3. update generated docs inputs
4. update impacted guides under `apps/docs`
5. update impacted examples or playground showcase coverage
6. update the documentation impact map if the surface is new
7. run `bun run docs:ci`

Canonical contributor instructions live in:

- root `CLAUDE.md`
- `src/ui/CLAUDE.md`
- `src/ssr/CLAUDE.md`
- `src/cli/CLAUDE.md`
- `playground/CLAUDE.md`
- `apps/docs/CLAUDE.md`

If public behavior changed and one of those layers did not move with it, the change is incomplete.
