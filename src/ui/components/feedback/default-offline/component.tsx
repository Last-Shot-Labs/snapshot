"use client";

import type { CSSProperties } from "react";
import type { OfflineBannerConfig } from "./types";

/**
 * Default offline feedback shown when the browser loses connectivity.
 */
export function DefaultOffline({ config }: { config: OfflineBannerConfig }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={config.className}
      data-snapshot-feedback="offline"
      style={{
        padding: "var(--sn-spacing-md, 1rem)",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        border: "1px solid var(--sn-color-border, #cbd5e1)",
        background: "var(--sn-color-card, #ffffff)",
        color: "var(--sn-color-foreground, #0f172a)",
        display: "grid",
        gap: "var(--sn-spacing-xs, 0.25rem)",
        ...(config.style as CSSProperties),
      }}
    >
      <strong
        style={{
          fontSize: "var(--sn-font-size-md, 1rem)",
          fontWeight: "var(--sn-font-weight-semibold, 600)",
        }}
      >
        {config.title ?? "You're offline"}
      </strong>
      <span
        style={{
          color: "var(--sn-color-muted-foreground, #64748b)",
          fontSize: "var(--sn-font-size-sm, 0.875rem)",
        }}
      >
        {config.description ?? "Reconnect to continue working."}
      </span>
    </div>
  );
}
