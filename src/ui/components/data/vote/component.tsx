'use client';

import { useState, type CSSProperties } from "react";
import { useActionExecutor } from "../../../actions/executor";
import type { ActionConfig } from "../../../actions/types";
import type { FromRef } from "../../../context/types";

export interface VoteConfig {
  type: "vote";
  id?: string;
  value?: number | FromRef;
  upAction?: ActionConfig;
  downAction?: ActionConfig;
  className?: string;
  style?: Record<string, string | number>;
}

export function Vote({ config }: { config: VoteConfig }) {
  const execute = useActionExecutor();
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const configStyle = config.style as CSSProperties | undefined;

  const value = typeof config.value === "number" ? config.value : 0;
  const displayValue = value + (voted === "up" ? 1 : voted === "down" ? -1 : 0);

  return (
    <div
      data-snapshot-component="vote"
      className={config.className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--sn-spacing-2xs, 0.125rem)",
        ...configStyle,
      }}
    >
      <button
        type="button"
        onClick={() => {
          setVoted(voted === "up" ? null : "up");
          if (config.upAction) void execute(config.upAction);
        }}
        aria-label="Upvote"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "var(--sn-spacing-2xs, 2px)",
          color: voted === "up" ? "var(--sn-color-primary, #2563eb)" : "var(--sn-color-muted-foreground, #6b7280)",
          fontSize: "1.25rem",
          lineHeight: 1,
        }}
      >
        &#x25B2;
      </button>
      <span style={{
        fontSize: "var(--sn-font-size-sm, 0.875rem)",
        fontWeight: "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
        color: "var(--sn-color-foreground, #111827)",
        minWidth: "2ch",
        textAlign: "center",
      }}>
        {displayValue}
      </span>
      <button
        type="button"
        onClick={() => {
          setVoted(voted === "down" ? null : "down");
          if (config.downAction) void execute(config.downAction);
        }}
        aria-label="Downvote"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "var(--sn-spacing-2xs, 2px)",
          color: voted === "down" ? "var(--sn-color-destructive, #dc2626)" : "var(--sn-color-muted-foreground, #6b7280)",
          fontSize: "1.25rem",
          lineHeight: 1,
        }}
      >
        &#x25BC;
      </button>
    </div>
  );
}
