---
title: Manifest Apps
description: Build apps from Snapshot's manifest runtime with minimal custom React.
draft: false
---

Use the manifest path when the application should be assembled primarily from `snapshot.manifest.json`.

This path is best when you want:

- routes, navigation, auth wiring, and runtime behavior declared in config
- built-in components, presets, actions, overlays, and workflows
- token-driven theming and manifest-based app assembly
- rich UI composition without writing feature React for every screen

Start with these source-backed references:

- [Manifest Reference](/reference/manifest/)
- [Styling and Slots](/build/styling-and-slots/)
- [UI Reference](/reference/ui/)
- [Component Catalog](/reference/components/)
- [Capabilities](/start-here/capabilities/)

Canonical source for the manifest contract lives in:

- `src/ui/manifest/schema.ts`
- `src/ui/manifest/index.ts`
- `src/ui/manifest/types.ts`
- `src/ui/components/**/schema.ts`
- `src/ui/components/_base/schema.ts`
- `src/ui/components/_base/style-surfaces.ts`

If you are validating whether a guide is still accurate, trust those files before prose.

If your app is mostly manifest-driven, read [Styling and Slots](/build/styling-and-slots/) early. It documents the canonical `slots` and `states` model that now underpins Snapshot's slot-enabled UI surfaces.

## Typical Build Shape

Most manifest-first apps follow the same composition order:

1. define `app`, `theme`, `resources`, `workflows`, and `overlays`
2. define routes and navigation
3. compose pages from built-in component schemas and presets
4. refine presentation through tokens, `slots`, and `states`
5. validate against generated manifest and UI reference
6. verify behavior in the playground or app-specific examples

## Where To Look For Real Coverage

Current high-signal manifest compositions live in:

- `playground/src/showcase.tsx`
- `src/ui/presets/**`
- `src/ui/components/**/schema.ts`

The playground is especially useful when you need to see how data, forms, overlays, navigation, content, communication, and workflow components are composed together on `main`.

If you want the shortest path to a concrete composition, use these showcase sections:

- `dashboard` for KPI shells, stat cards, and summary layouts
- `data` for operational tables, filters, detail cards, and row actions
- `forms` for input contracts, quick-entry flows, and manifest-driven field states
- `navigation` and `overlay` for app shell interactions
- `workflow` and `presets` for larger composed screens
