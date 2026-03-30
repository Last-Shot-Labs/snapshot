---
name: Data Generation Layer
description: 12-operation declarative entity/adapter code generation spec for bunshot (bunshot-data package)
type: project
---

## Overview

Dev-time code generation: defineEntity() + defineOperations() → pure functions → .ts files committed to repo.
Package: @lastshotlabs/bunshot-data (devDependency only). Zero runtime dependency.

## 12 Operation Types (covers all 108 non-CRUD operations across 5 plugins)

1. **op.lookup** — Find by non-primary key(s)
2. **op.exists** — Boolean existence/predicate check
3. **op.transition** — State machine field update (draft→published)
4. **op.fieldUpdate** — Targeted field write on parent entity
5. **op.aggregate** — Group + compute (count, sum, avg)
6. **op.computedAggregate** — Aggregate + write to parent in transaction
7. **op.batch** — Multi-record update/delete by filter
8. **op.upsert** — Insert or update by unique key
9. **op.search** — Full-text search (FTS5, $text, tsvector)
10. **op.collection** — Sub-entity CRUD scoped to parent (webauthn creds, recovery codes)
11. **op.consume** — Atomic find+remove (one-time tokens)
12. **op.derive** — Multi-source read+merge (effective roles, grants hierarchy)

## Generator Architecture

- Dispatch table: ops × backends (12 rows × 4 columns)
- Each cell is an independent pure function
- New op = add one row. New backend = add one column.
- Shared utilities: filter compiler, pagination, field mapping, transaction wrapping
- Filter expression language: $ne, $gt, $in, $or, null, 'now', 'param:x'
- All definitions Zod-validated at generation time

## Spec Location

Full spec in /Users/jdd/projects/bunshot/docs/data-generation-layer-spec.md (v1, v2 may be in progress)
