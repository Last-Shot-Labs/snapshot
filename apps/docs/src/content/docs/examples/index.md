---
title: Examples and Showcase
description: Snapshot's canonical examples currently live in the playground showcase and its backing fixtures.
draft: false
---

Snapshot currently treats the playground as the canonical example surface while the dedicated runnable examples workspace is still being built out.

If a user-facing component, preset, or composition changes, the relevant showcase entry should move in the same commit.

## Canonical Example Sources

- `playground/src/showcase.tsx`
- `playground/src/app.tsx`
- `playground/src/token-editor.tsx`

## How To Read The Playground

- `playground/src/showcase.tsx` is the catalog of sections, fixtures, and canonical compositions.
- `playground/src/app.tsx` is the runtime shell that boots providers, tokens, mock API data, and global UI surfaces like toasts and confirm dialogs.
- `playground/src/token-editor.tsx` is the canonical token-editing example for theme and visual-system work.

## Showcase Coverage By Section

| Showcase section    | What it demonstrates                                                                   | Source evidence                                                                       |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `dashboard`         | KPI cards, stats, trends, and summary layout composition                               | `playground/src/showcase.tsx`, `src/ui/components/data/stat-card/index.ts`            |
| `data`              | operational tables, detail cards, filters, selection, and row actions                  | `playground/src/showcase.tsx`, `src/ui/components/data/data-table/index.ts`           |
| `forms`             | form assembly, quick entry, inline editing, tagging, location search, and input states | `playground/src/showcase.tsx`, `src/ui/components/forms/auto-form/index.ts`           |
| `overlay`           | modal, drawer, popover, context menu, command palette, and transient interactions      | `playground/src/showcase.tsx`, `src/ui/components/overlay/command-palette/index.ts`   |
| `navigation`        | breadcrumbs, accordions, steppers, tabs, tree view, and dropdown navigation            | `playground/src/showcase.tsx`, `src/ui/components/navigation/tree-view/index.ts`      |
| `content`           | markdown, code, editors, uploads, embeds, timelines, and compare views                 | `playground/src/showcase.tsx`, `src/ui/components/content/rich-text-editor/index.ts`  |
| `workflow`          | kanban, calendar, pricing, audit log, and notification-feed style operational surfaces | `playground/src/showcase.tsx`, `src/ui/components/workflow/kanban/index.ts`           |
| `communication`     | chat, threads, comments, emoji, GIF, reactions, presence, and typing indicators        | `playground/src/showcase.tsx`, `src/ui/components/communication/chat-window/index.ts` |
| `presets`           | CRUD, dashboard, and settings page assembly helpers                                    | `playground/src/showcase.tsx`, `src/ui/presets/index.ts`                              |
| `feed-chart-wizard` | feed streams, chart variants and empty states, and multistep onboarding flows          | `playground/src/showcase.tsx`, `src/ui/components/data/chart/index.ts`                |

## What The Showcase Proves

- The current component catalog is not just theoretical API surface; most major visible surfaces have a composed example on `main`.
- Tokens, slots, and interaction states can be inspected live against real config.
- Contributors have a single canonical place to update when visible behavior changes.

## How To Use It

- Manifest app builders should use the showcase to validate current component shape and slot/state patterns before writing large manifest compositions.
- SDK app builders should use it to see the intended behavior of UI surfaces they may embed in custom React.
- Snapshot contributors should update the relevant showcase section whenever a visible component contract or interaction pattern changes.
