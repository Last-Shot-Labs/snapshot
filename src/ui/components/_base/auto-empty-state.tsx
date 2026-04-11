'use client';

import type { ReactNode } from "react";
import { useActionExecutor } from "../../actions/executor";
import type { ActionConfig } from "../../actions/types";
import { renderIcon } from "../../icons/render";
import { getButtonStyle } from "./button-styles";

export interface AutoEmptyStateConfig {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    action: ActionConfig | ActionConfig[];
    icon?: string;
    variant?: "default" | "primary" | "outline";
  };
}

export function AutoEmptyState({
  config,
}: {
  config: AutoEmptyStateConfig;
}): ReactNode {
  const execute = useActionExecutor();

  return (
    <div
      data-snapshot-empty-state=""
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
      {config.icon ? (
        <div
          aria-hidden="true"
          style={{
            color: "var(--sn-color-muted-foreground, #6b7280)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderIcon(config.icon, 28)}
        </div>
      ) : null}
      <div
        style={{
          fontSize: "var(--sn-font-size-lg, 1.125rem)",
          fontWeight: "var(--sn-font-weight-semibold, 600)",
          color: "var(--sn-color-foreground, #111827)",
        }}
      >
        {config.title}
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
      {config.action ? (
        <button
          type="button"
          onClick={() => void execute(config.action!.action)}
          style={getButtonStyle(
            config.action.variant === "primary"
              ? "default"
              : config.action.variant ?? "outline",
            "sm",
          )}
        >
          {config.action.icon ? (
            <span style={{ display: "inline-flex", marginRight: "0.5rem" }}>
              {renderIcon(config.action.icon, 14)}
            </span>
          ) : null}
          {config.action.label}
        </button>
      ) : null}
    </div>
  );
}
