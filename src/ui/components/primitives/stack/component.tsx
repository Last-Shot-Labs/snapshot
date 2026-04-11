'use client';

import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";

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
  stretch: "stretch",
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

const JUSTIFY_MAP: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

const MAX_WIDTH_MAP: Record<string, string> = {
  xs: "var(--sn-container-xs, 20rem)",
  sm: "var(--sn-container-sm, 28rem)",
  md: "var(--sn-container-md, 32rem)",
  lg: "var(--sn-container-lg, 40rem)",
  xl: "var(--sn-container-xl, 48rem)",
  "2xl": "var(--sn-container-2xl, 56rem)",
  full: "100%",
};

const PADDING_MAP: Record<string, string> = {
  none: "0",
  sm: "var(--sn-spacing-sm, 0.5rem)",
  md: "var(--sn-spacing-md, 1rem)",
  lg: "var(--sn-spacing-lg, 1.5rem)",
  xl: "var(--sn-spacing-xl, 2rem)",
};

export interface StackConfig {
  type: "stack";
  children: ComponentConfig[];
  gap?: keyof typeof GAP_MAP;
  align?: keyof typeof ALIGN_MAP;
  justify?: keyof typeof JUSTIFY_MAP;
  maxWidth?: keyof typeof MAX_WIDTH_MAP;
  padding?: keyof typeof PADDING_MAP;
  className?: string;
  style?: Record<string, string | number>;
}

export function Stack({ config }: { config: StackConfig }) {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: GAP_MAP[config.gap ?? "md"],
    alignItems: ALIGN_MAP[config.align ?? "stretch"],
    justifyContent: JUSTIFY_MAP[config.justify ?? "start"],
    padding: config.padding ? PADDING_MAP[config.padding] : undefined,
    maxWidth: config.maxWidth ? MAX_WIDTH_MAP[config.maxWidth] : undefined,
    marginInline: config.maxWidth ? "auto" : undefined,
    width: "100%",
    ...(config.style as CSSProperties | undefined),
  };

  return (
    <div className={config.className} style={style}>
      {config.children.map((child, index) => (
        <ComponentRenderer
          key={child.id ?? `stack-child-${index}`}
          config={child}
        />
      ))}
    </div>
  );
}
