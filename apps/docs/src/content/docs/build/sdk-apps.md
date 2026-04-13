---
title: SDK Apps
description: Build custom React applications on top of Snapshot's SDK and generated outputs.
draft: false
---

Use the SDK path when you want custom React and want Snapshot to provide the platform primitives:

- auth hooks
- API client
- token storage
- query setup
- community, webhook, websocket, and SSE hooks
- push notifications
- scaffold and sync flows

Start with these source-backed references:

- [SDK Reference](/reference/sdk/)
- [CLI Reference](/reference/cli/)
- [Vite Reference](/reference/vite/)

Canonical source for this surface lives in:

- `src/index.ts`
- `src/create-snapshot.tsx`
- `src/api/client.ts`
- `src/auth/**`
- `src/community/**`
- `src/webhooks/**`
- `src/sse/**`
- `src/ws/**`
- `src/cli/commands/**`
- `src/vite/index.ts`

## Typical SDK Flow

The normal SDK path is:

1. run sync against Bunshot so client types and hooks are current
2. create a Snapshot instance with `createSnapshot`
3. use the returned auth, community, webhook, SSE, websocket, and account hooks in custom React
4. layer in Vite or SSR helpers only if the app needs them

## Where SDK Builders Usually Need More Context

- [Community and Realtime](/integrate/community-and-realtime/) for threads, notifications, push, websocket, and SSE boundaries
- [Content and Media](/integrate/content-and-media/) when custom React still needs Snapshot’s media and rich-input surfaces
- [Examples and Showcase](/examples/) for the current component compositions and interaction patterns in `playground/src/showcase.tsx`
