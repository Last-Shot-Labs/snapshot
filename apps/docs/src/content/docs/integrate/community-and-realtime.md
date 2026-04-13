---
title: Community and Realtime
description: Use Snapshot's community contracts, notifications, websocket hooks, SSE, and push primitives without guessing where the boundaries live.
draft: false
---

Use this path when your app needs social features, live updates, or notification delivery.

Snapshot already ships the main building blocks for this surface:

- community contracts and hooks for threads, replies, reactions, reports, bans, and notifications
- websocket and SSE managers for live transport
- push notification hooks for browser registration flows
- UI components for chat, comments, message threads, reactions, presence, typing, emoji, and GIFs
- webhook contracts and hooks for delivery-oriented backend integrations

Start with these source-backed references:

- [SDK Reference](/reference/sdk/)
- [UI Reference](/reference/ui/)
- [Component Catalog](/reference/components/)
- [Capabilities](/start-here/capabilities/)

Canonical source for this surface lives in:

- `src/community/index.ts`
- `src/community/contract.ts`
- `src/community/hooks.ts`
- `src/webhooks/index.ts`
- `src/webhooks/contract.ts`
- `src/webhooks/hooks.ts`
- `src/ws/manager.ts`
- `src/ws/hook.ts`
- `src/sse/manager.ts`
- `src/sse/hook.ts`
- `src/push/hook.ts`
- `src/ui/components/communication/**`

High-signal showcase coverage currently lives in the `communication` page group inside `playground/src/showcase.tsx`.

That section is the fastest way to inspect current examples for:

- chat window and message thread composition
- comment and reaction behavior
- emoji, GIF, presence, and typing surfaces

Use this guide when you need to keep the boundaries clear:

- SDK hooks and contracts own network primitives and browser subscriptions
- communication components own user-facing messaging and interaction surfaces
- SSE, websocket, and push are complementary transports, not interchangeable APIs

Use the [Examples and Showcase](/examples/) page to jump into the current playground-backed communication examples while the dedicated runnable example registry is still being built out.
