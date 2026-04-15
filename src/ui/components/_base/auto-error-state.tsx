'use client';

import type { ReactNode } from "react";
import { renderIcon } from "../../icons/render";
import { ButtonControl } from "../forms/button";

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
        <ButtonControl
          type="button"
          onClick={onRetry}
          variant="outline"
          size="sm"
        >
          {retryLabel}
        </ButtonControl>
      ) : null}
    </div>
  );
}
