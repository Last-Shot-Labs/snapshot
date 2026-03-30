---
name: Bunshot Plugin Roadmap
description: Planned bunshot plugins and hardening items from brainstorm sessions
type: project
---

## Plugins to Build

- **bunshot-chat** — Depends on community for content model. Adds participant addressing, delivery tracking, E2E encryption, presence/typing, retention policies.
- **bunshot-notifications** — Orchestration over push + mail. User preferences, delivery routing, deduplication, batching, read/unread state.
- **bunshot-oauth-server** — Turn app into OpenID Connect provider. Separate from auth (auth=consumer, this=provider).
- **bunshot-transcode** — Media processing pipeline. Listens to upload events, runs encoding workers via BullMQ.
- **bunshot-game** — Config-driven state machine for turn-based games. Generalizes to workflows/approvals.
- **bunshot-mcp** — MCP server plugin.
- **bunshot-llm** — LLM integration plugin.

## Things to Harden in Bunshot

- **WebSocket DMs**: No userId → socketIds reverse index. Need userSockets map or per-user rooms.
- **Durable event subscriptions**: InProcessAdapter doesn't implement durable:true. Need Redis/persistent adapter.
- **Plugin state sharing**: Community doesn't register adapter in pluginState. Chat needs access pattern decided.
- **Community real-time**: Should auto-push updates through WS/SSE via events.
- **HTTP/Events split**: Break into bunshot-http + bunshot-events for independent scaling. Add bunshot-bus transport abstraction.

## Sequencing

1. Build chat plugin by hand (learn patterns)
2. Build notifications plugin
3. Extract entity generation layer from community + chat patterns
4. HTTP/Events split
5. Remaining plugins
6. Config-to-platform layer on top of stable plugins
