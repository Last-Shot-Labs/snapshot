'use client';

import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ContainerConfig } from "./types";

const MAX_WIDTH_MAP: Record<string, string> = {
  xs: "var(--sn-container-xs, 20rem)",
  sm: "var(--sn-container-sm, 24rem)",
  md: "var(--sn-container-md, 28rem)",
  lg: "var(--sn-container-lg, 32rem)",
  xl: "var(--sn-container-xl, 80rem)",
  "2xl": "var(--sn-container-2xl, 96rem)",
  full: "100%",
  prose: "var(--sn-container-prose, 65ch)",
};

const PADDING_MAP: Record<string, string> = {
  none: "0",
  xs: "var(--sn-spacing-xs, 0.25rem)",
  sm: "var(--sn-spacing-sm, 0.5rem)",
  md: "var(--sn-spacing-md, 1rem)",
  lg: "var(--sn-spacing-lg, 1.5rem)",
  xl: "var(--sn-spacing-xl, 2rem)",
};

export function Container({ config }: { config: ContainerConfig }) {
  const style: CSSProperties = {
    width: "100%",
    maxWidth:
      typeof config.maxWidth === "number"
        ? `${config.maxWidth}px`
        : MAX_WIDTH_MAP[config.maxWidth ?? "xl"],
    paddingInline: PADDING_MAP[config.padding ?? "md"],
    marginInline: config.center === false ? undefined : "auto",
  };

  return (
    <div style={style}>
      {config.children.map((child, index) => (
        <div
          key={child.id ?? `container-child-${index}`}
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
