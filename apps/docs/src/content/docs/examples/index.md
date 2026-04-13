---
title: Examples and Showcase
description: Snapshot's examples are split between runnable stories and the component showcase.
draft: false
---

Snapshot currently uses the playground showcase as the canonical live example surface while the dedicated runnable examples workspace is still being built out.

- **Playground showcase** in `playground/src/showcase.tsx`
  - visual component coverage and state exploration

The docs system treats showcase coverage as a first-class asset today. If user-facing behavior changes, the relevant showcase entry should change in the same commit. When `examples/**` lands, this page will link those runnable compositions directly.

Current canonical showcase sources:

- `playground/src/showcase.tsx`
- `playground/src/app.tsx`
- `playground/src/token-editor.tsx`
