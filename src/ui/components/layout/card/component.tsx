'use client';

import type { CSSProperties } from "react";
import { useSubscribe } from "../../../context";
import { resolveComponentBackgroundStyle } from "../../_base/background-style";
import { ComponentRenderer } from "../../../manifest/renderer";
import { useResponsiveValue } from "../../../hooks/use-breakpoint";
import type { CardConfig } from "./types";

const GAP_MAP: Record<string, string> = {
  none: "0",
  "2xs": "var(--sn-spacing-2xs, 0.125rem)",
  xs: "var(--sn-spacing-xs, 0.25rem)",
  sm: "var(--sn-spacing-sm, 0.5rem)",
  md: "var(--sn-spacing-md, 1rem)",
  lg: "var(--sn-spacing-lg, 1.5rem)",
  xl: "var(--sn-spacing-xl, 2rem)",
  "2xl": "var(--sn-spacing-2xl, 2.5rem)",
};

/**
 * Card layout primitive for grouped content with an optional title block.
 */
export function Card({ config }: { config: CardConfig }) {
  const gap = useResponsiveValue(config.gap);
  const resolvedGap = gap ? GAP_MAP[gap] ?? gap : GAP_MAP.md;
  const title = useSubscribe(config.title ?? "");
  const subtitle = useSubscribe(config.subtitle ?? "");
  const backgroundStyle = resolveComponentBackgroundStyle(config.background);

  return (
    <div
      data-snapshot-card=""
      className={config.className}
      style={{
        backgroundColor: "var(--sn-color-card, #ffffff)",
        border:
          "var(--sn-card-border, 1px solid var(--sn-color-border, #e5e7eb))",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        boxShadow:
          "var(--sn-card-shadow, var(--sn-shadow-sm, 0 1px 3px rgba(0,0,0,0.1)))",
        padding: "var(--sn-card-padding, var(--sn-spacing-lg, 1.5rem))",
        display: "flex",
        flexDirection: "column",
        gap: resolvedGap,
        ...(backgroundStyle ?? {}),
        ...(config.style as CSSProperties | undefined),
      }}
    >
      {title || subtitle ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sn-spacing-2xs, 0.125rem)",
          }}
        >
          {title ? (
            <h3
              style={{
                fontSize: "var(--sn-font-size-lg, 1.125rem)",
                fontWeight:
                  "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
                color: "var(--sn-color-foreground, #111827)",
                lineHeight: "var(--sn-leading-tight, 1.25)",
                margin: 0,
              }}
            >
              {String(title)}
            </h3>
          ) : null}
          {subtitle ? (
            <p
              style={{
                fontSize: "var(--sn-font-size-sm, 0.875rem)",
                color: "var(--sn-color-muted-foreground, #6b7280)",
                margin: 0,
              }}
            >
              {String(subtitle)}
            </p>
          ) : null}
        </div>
      ) : null}

      {config.children.map((child, index) => (
        <div
          key={child.id ?? `card-child-${index}`}
          style={
            typeof config.animation?.stagger === "number"
              ? ({
                  ["--sn-stagger-index" as "--sn-stagger-index"]: index,
                } as CSSProperties)
              : undefined
          }
        >
          <ComponentRenderer config={child} />
        </div>
      ))}
    </div>
  );
}
