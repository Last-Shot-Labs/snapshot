import { usePushNotifications } from "../push/hook";
import type { SnapshotPlugin } from "./types";

// ── Push plugin config ───────────────────────────────────────────────────────

export interface PushPluginConfig {
  vapidPublicKeyUrl?: string;
  subscribeUrl?: string;
  swPath?: string;
}

// ── Push plugin hooks type ───────────────────────────────────────────────────

export interface PushPluginHooks {
  usePushNotifications: typeof usePushNotifications;
}

// ── Factory ──────────────────────────────────────────────────────────────────

export function createPushPlugin(
  pluginConfig: PushPluginConfig = {},
): SnapshotPlugin<PushPluginHooks> {
  return {
    name: "push",

    createHooks(): PushPluginHooks {
      // Push is fully standalone — doesn't use ApiClient, auth, or any shared state.
      // The config defaults are passed through to the hook.
      return {
        usePushNotifications: (opts?) =>
          usePushNotifications({
            vapidPublicKeyUrl: pluginConfig.vapidPublicKeyUrl,
            subscribeUrl: pluginConfig.subscribeUrl,
            swPath: pluginConfig.swPath,
            ...opts,
          }),
      };
    },
  };
}
