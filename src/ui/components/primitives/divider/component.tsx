'use client';

import type { CSSProperties } from "react";

export interface DividerConfig {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: Record<string, string | number>;
}

export function Divider({ config }: { config: DividerConfig }) {
  if (config.orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={config.className}
        style={{
          width: "1px",
          alignSelf: "stretch",
          background: "var(--sn-color-border)",
          ...(config.style as CSSProperties | undefined),
        }}
      />
    );
  }

  if (!config.label) {
    return (
      <div
        role="separator"
        className={config.className}
        style={{
          borderTop:
            "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
          ...(config.style as CSSProperties | undefined),
        }}
      />
    );
  }

  return (
    <div
      role="separator"
      className={config.className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sn-spacing-md, 1rem)",
        ...(config.style as CSSProperties | undefined),
      }}
    >
      <div
        style={{
          flex: 1,
          height: 0,
          borderTop:
            "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
        }}
      />
      <span
        style={{
          color: "var(--sn-color-muted-foreground)",
          fontSize: "var(--sn-font-size-xs, 0.75rem)",
        }}
      >
        {config.label}
      </span>
      <div
        style={{
          flex: 1,
          height: 0,
          borderTop:
            "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
        }}
      />
    </div>
  );
}
