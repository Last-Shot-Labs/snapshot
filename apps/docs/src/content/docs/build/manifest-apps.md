---
title: Manifest Apps
description: Build apps from Snapshot's manifest runtime with minimal custom React.
draft: false
---

Use the manifest path when the application should be assembled primarily from `snapshot.manifest.json`.

This path is best when you want:

- routes, navigation, auth wiring, and runtime behavior declared in config
- built-in components, presets, actions, and workflows
- token-driven theming and manifest-based app assembly

Start with these source-backed references:

- [Manifest Reference](/reference/manifest/)
- [UI Reference](/reference/ui/)
- [Component Catalog](/reference/components/)
- [Capabilities](/start-here/capabilities/)

Canonical source for the manifest contract lives in:

- `src/ui/manifest/schema.ts`
- `src/ui/manifest/index.ts`
- `src/ui/components/**/schema.ts`

If you are validating whether a guide is still accurate, trust those files before prose.
