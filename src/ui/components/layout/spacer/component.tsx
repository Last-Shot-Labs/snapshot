'use client';

import type { CSSProperties } from "react";
import type { SpacerConfig } from "./types";

const SIZE_MAP: Record<string, string> = {
  xs: "var(--sn-spacing-xs, 0.25rem)",
  sm: "var(--sn-spacing-sm, 0.5rem)",
  md: "var(--sn-spacing-md, 1rem)",
  lg: "var(--sn-spacing-lg, 1.5rem)",
  xl: "var(--sn-spacing-xl, 2rem)",
  "2xl": "var(--sn-spacing-2xl, 2.5rem)",
  "3xl": "var(--sn-spacing-3xl, 3rem)",
};

export function Spacer({ config }: { config: SpacerConfig }) {
  const size =
    (config.size ? SIZE_MAP[config.size] : undefined) ??
    config.size ??
    "var(--sn-spacing-md, 1rem)";
  const style: CSSProperties =
    config.axis === "horizontal"
      ? {
          width: size,
          minWidth: size,
          flexGrow: config.flex ? 1 : 0,
          flexShrink: 0,
        }
      : {
          height: size,
          minHeight: size,
          flexGrow: config.flex ? 1 : 0,
          flexShrink: 0,
        };

  return <div aria-hidden="true" style={style} />;
}
