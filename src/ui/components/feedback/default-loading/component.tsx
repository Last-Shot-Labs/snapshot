"use client";

import type { CSSProperties } from "react";
import type { SpinnerConfig } from "./types";

/**
 * Default loading feedback rendered while the manifest app is preloading.
 */
export function DefaultLoading({ config }: { config: SpinnerConfig }) {
  const size = config.size ?? "md";
  const diameter = size === "sm" ? "1rem" : size === "lg" ? "2rem" : "1.5rem";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={config.className}
      data-snapshot-feedback="loading"
      style={{
        display: "grid",
        placeItems: "center",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        padding: "var(--sn-spacing-lg, 1.5rem)",
        color: "var(--sn-color-muted-foreground, #64748b)",
        ...(config.style as CSSProperties),
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: diameter,
          height: diameter,
          borderRadius: "9999px",
          border: "2px solid var(--sn-color-border, #cbd5e1)",
          borderTopColor: "var(--sn-color-primary, #0f172a)",
          animation: "sn-spin 0.8s linear infinite",
        }}
      />
      <span style={{ fontSize: "var(--sn-font-size-sm, 0.875rem)" }}>
        {config.label ?? "Loading"}
      </span>
      <style>{`
        @keyframes sn-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
