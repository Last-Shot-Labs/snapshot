'use client';

import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { SectionConfig } from "./types";

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

export function Section({ config }: { config: SectionConfig }) {
  const style: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight:
      config.height === "screen"
        ? "100vh"
        : config.height === "auto"
          ? undefined
          : config.height,
    alignItems: config.align ? ALIGN_MAP[config.align] : undefined,
    justifyContent: config.justify ? JUSTIFY_MAP[config.justify] : undefined,
    ...(config.bleed
      ? {
          marginInline: "calc(-1 * var(--sn-spacing-lg, 1.5rem))",
          paddingInline: "var(--sn-spacing-lg, 1.5rem)",
        }
      : null),
  };

  return (
    <div style={style}>
      {(config.children ?? []).map((child, index) => (
        <div
          key={child.id ?? `section-child-${index}`}
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
