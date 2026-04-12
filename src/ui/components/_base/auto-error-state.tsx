'use client';

import type { ReactNode } from "react";
import { renderIcon } from "../../icons/render";

export interface AutoErrorStateConfig {
  title?: string;
  description?: string;
  retry?: boolean | { label: string };
  icon?: string;
}

export function AutoErrorState({
  config,
  onRetry,
}: {
  config: AutoErrorStateConfig;
  onRetry?: () => void;
}): ReactNode {
  const retryLabel =
    typeof config.retry === "object" ? config.retry.label : "Retry";
  const showRetry = Boolean(config.retry) && Boolean(onRetry);

  return (
    <div
      role="alert"
      data-snapshot-error-state=""
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--sn-spacing-2xl, 3rem) var(--sn-spacing-xl, 2rem)",
        textAlign: "center",
        gap: "var(--sn-spacing-md, 1rem)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          color: "var(--sn-color-destructive, #dc2626)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderIcon(config.icon ?? "alert-circle", 28)}
      </div>
      <div
        style={{
          fontSize: "var(--sn-font-size-lg, 1.125rem)",
          fontWeight: "var(--sn-font-weight-semibold, 600)",
          color: "var(--sn-color-foreground, #111827)",
        }}
      >
        {config.title ?? "Something went wrong"}
      </div>
      {config.description ? (
        <div
          style={{
            maxWidth: "32rem",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            lineHeight: "var(--sn-leading-normal, 1.5)",
            color: "var(--sn-color-muted-foreground, #6b7280)",
          }}
        >
          {config.description}
        </div>
      ) : null}
      {showRetry ? (
        <button
          type="button"
          onClick={onRetry}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--sn-spacing-xs, 0.25rem)",
            padding:
              "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
            borderRadius: "var(--sn-radius-md, 0.375rem)",
            border:
              "1px solid var(--sn-color-border, #e2e8f0)",
            background: "var(--sn-color-card, #ffffff)",
            color: "var(--sn-color-foreground, #111827)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            fontWeight: "var(--sn-font-weight-medium, 500)",
            cursor: "pointer",
          }}
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
