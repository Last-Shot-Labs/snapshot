import { createWebhookHooks } from "../webhooks/hooks";
import type { WebhookHooks } from "../webhooks/hooks";
import type { SnapshotPlugin, SnapshotPluginContext } from "./types";

// ── Factory ──────────────────────────────────────────────────────────────────

export function createWebhookPlugin(): SnapshotPlugin<WebhookHooks> {
  return {
    name: "webhooks",

    createHooks(ctx: SnapshotPluginContext): WebhookHooks {
      return createWebhookHooks({ api: ctx.api, queryClient: ctx.queryClient });
    },
  };
}
