---
title: Examples and Showcase
description: Snapshot's examples are split between runnable stories and the component showcase.
draft: false
---

Snapshot currently treats the playground showcase as the canonical live example surface while the dedicated runnable examples workspace is still being built out.

If a user-facing component, preset, or composition changes, the relevant showcase entry should move in the same commit.

## Canonical Example Sources

- `playground/src/showcase.tsx`
- `playground/src/app.tsx`
- `playground/src/token-editor.tsx`

## What The Showcase Covers

- `dashboard`: stat cards and high-level KPI layouts
- `data`: tables, detail cards, filters, and dense operational views
- `forms`: auto-form, toggle group, inline edit, quick add, and related input flows
- `overlay`: modal, drawer, popover, context menu, command palette, and tabbed overlays
- `navigation`: breadcrumb, accordion, stepper, tabs, tree view, and dropdown navigation patterns
- `content`: markdown, code, timelines, uploads, editors, and compare views
- `workflow`: kanban, calendar, pricing, audit log, and notification feed compositions
- `communication`: rich input, emoji, reactions, presence, threads, comments, chat, and GIF flows
- `presets`: CRUD, dashboard, and settings page composition helpers
- `feed-chart-wizard`: recent additions for feed, chart, and wizard coverage

## How To Use It

- Manifest app builders should use the showcase to validate current component shape and slot/state patterns before writing large manifest compositions.
- SDK app builders should use it to see the intended behavior of UI surfaces they may embed in custom React.
- Snapshot contributors should update the relevant showcase section whenever a visible component contract or interaction pattern changes.
