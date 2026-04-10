"use client";

import type { CSSProperties } from "react";
import type { ErrorPageConfig } from "./schema";

/**
 * Default error feedback shown when manifest work fails.
 */
export function DefaultError({ config }: { config: ErrorPageConfig }) {
  return (
    <div
      role="alert"
      className={config.className}
      data-snapshot-feedback="error"
      style={{
        display: "grid",
        gap: "var(--sn-spacing-md, 1rem)",
        padding: "var(--sn-spacing-xl, 2rem)",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        border: "1px solid var(--sn-color-border, #e2e8f0)",
        background: "var(--sn-color-card, #ffffff)",
        color: "var(--sn-color-foreground, #0f172a)",
        ...(config.style as CSSProperties),
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "var(--sn-font-size-xl, 1.25rem)",
            fontWeight: "var(--sn-font-weight-semibold, 600)",
          }}
        >
          {config.title ?? "Something went wrong"}
        </h2>
        <p
          style={{
            margin: "var(--sn-spacing-xs, 0.25rem) 0 0",
            color: "var(--sn-color-muted-foreground, #64748b)",
          }}
        >
          {config.description ?? "Please try again."}
        </p>
      </div>
      {config.showRetry ? (
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            alignSelf: "start",
            border: 0,
            borderRadius: "var(--sn-radius-md, 0.5rem)",
            padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
            background: "var(--sn-color-primary, #0f172a)",
            color: "var(--sn-color-primary-foreground, #ffffff)",
          }}
        >
          {config.retryLabel ?? "Try again"}
        </button>
      ) : null}
    </div>
  );
}
