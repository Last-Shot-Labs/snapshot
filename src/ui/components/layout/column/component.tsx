'use client';

import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import { useResponsiveValue } from "../../../hooks/use-breakpoint";
import type { ColumnConfig } from "./types";

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

const ALIGN_MAP: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

const JUSTIFY_MAP: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

/**
 * Column layout primitive for vertical composition with the same mental model
 * as `row`.
 */
export function Column({ config }: { config: ColumnConfig }) {
  const gap = useResponsiveValue(config.gap);
  const resolvedGap = gap ? GAP_MAP[gap] ?? gap : undefined;

  return (
    <div
      className={config.className}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: resolvedGap,
        alignItems: config.align ? ALIGN_MAP[config.align] : undefined,
        justifyContent: config.justify
          ? JUSTIFY_MAP[config.justify]
          : undefined,
        overflow: config.overflow,
        maxHeight: config.maxHeight,
        ...(config.style as CSSProperties | undefined),
      }}
    >
      {config.children.map((child, index) => (
        <div
          key={child.id ?? `column-child-${index}`}
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
