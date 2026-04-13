---
title: Capabilities
description: Generated overview of major Snapshot capabilities backed by current source.
draft: false
---

This page is generated from current source presence checks. It exists to keep the top-level docs honest about what Snapshot can do on `main`.

| Capability | Status | Evidence |
|---|---|---|
| SDK bootstrap and auth | present | `src/index.ts`, `src/create-snapshot.tsx`, `src/auth/hooks.ts` |
| Manifest-driven UI | present | `src/ui.ts`, `src/ui/manifest/schema.ts`, `src/ui/manifest/app.tsx` |
| SSR and manifest rendering | present | `src/ssr/index.ts`, `src/ssr/manifest-renderer.ts`, `src/ssr/render.ts` |
| React Server Components support | present | `src/ssr/rsc.ts`, `src/vite/rsc-transform.ts` |
| Vite app and sync plugins | present | `src/vite/index.ts` |
| CLI scaffold and sync | present | `src/cli/commands/init.ts`, `src/cli/commands/sync.ts`, `src/cli/commands/manifest/init.ts` |
| Community and notification APIs | present | `src/community/index.ts`, `src/webhooks/index.ts` |
| Realtime: websocket and SSE | present | `src/ws/manager.ts`, `src/sse/manager.ts`, `src/push/hook.ts` |
| Content and media components | present | `src/ui/components/content/markdown/index.ts`, `src/ui/components/content/rich-input/index.ts`, `src/ui/components/content/rich-text-editor/index.ts`, `src/ui/components/content/file-uploader/index.ts` |
| Communication components | present | `src/ui/components/communication/chat-window/index.ts`, `src/ui/components/communication/emoji-picker/index.ts`, `src/ui/components/communication/gif-picker/index.ts` |
| Workflow and dashboard presets | present | `src/ui/presets/index.ts`, `src/ui/components/workflow/notification-feed/index.ts`, `src/ui/components/commerce/pricing-table/index.ts` |
| Visual component showcase | present | `playground/src/showcase.tsx` |
