---
name: Business Model
description: Open source framework + proprietary hosted platform, no free cloud tier, BYODB option
type: project
---

## Licensing

- **bunshot framework + plugins**: Open source (MIT)
- **snapshot framework**: Open source (MIT)
- **Platform app** (API, MCP, deploy, UI dashboard): Proprietary, closed source

**Why:** Framework being open source is the distribution channel. Platform being proprietary is the business. Nobody can clone the operational layer from source code.

## Pricing (no free cloud tier)

- Free: Framework, config gen, audits, MCP (local), CLI, templates — all local dev
- Launch/Starter: ~$19-29/mo — 1-2 apps, shared infra, custom domain, auto-TLS
- Standard: ~$49-79/mo — more apps, BYODB or managed DB
- Scale: ~$99-199/mo — dedicated resources, multi-instance, priority support

## Infrastructure Strategy

- **BYODB (Bring Your Own Database)**: Default option. User provides connection strings for Atlas/Neon/Upstash/etc. Platform just runs Bun processes and routes traffic.
- **Managed databases**: Optional add-on (+$20-50/mo). Platform provisions via provider APIs (Neon, Atlas, Upstash) or shared instances on own infrastructure.
- **Deploy substrate**: Start with Fly.io or similar, migrate to own Hetzner boxes when margins matter.
- **Keep infra simple**: 3-4 hardened presets (Starter/Standard/Full/Scale), not infinitely customizable.

## Revenue Path

1. Ship framework publicly (adoption/distribution)
2. Build platform MVP (deploy + manage)
3. Charge from day one, no free cloud tier
4. 14-day trial on first deploy

## Alternative/Parallel Path

Build vertical apps ON bunshot and sell them as SaaS. Framework is the assembly line, apps are the products.
