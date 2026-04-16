'use client';

import { ComponentRenderer } from "../../../manifest/renderer";
import { SurfaceStyles } from "../../_base/surface-styles";
import { extractSurfaceConfig, resolveSurfacePresentation } from "../../_base/style-surfaces";
import type { StackConfig } from "./types";

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

function baseResponsiveValue<T>(value: T | { default: T } | undefined): T | undefined {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "default" in value
  ) {
    return value.default;
  }

  return value;
}

export function Stack({ config }: { config: StackConfig }) {
  const rootId = config.id ?? "stack";
  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    implementationBase: {
      display: "flex",
      flexDirection: "column",
      gap: GAP_MAP[config.gap ?? "md"],
      alignItems: ALIGN_MAP[config.align ?? "stretch"],
      justifyContent: JUSTIFY_MAP[config.justify ?? "start"],
      width: "100%",
      maxWidth: config.maxWidth ? MAX_WIDTH_MAP[config.maxWidth] : undefined,
      overflow: config.overflow,
      maxHeight: baseResponsiveValue(config.maxHeight),
      style: {
        padding: config.padding ? PADDING_MAP[config.padding] : undefined,
        marginInline: config.maxWidth ? "auto" : undefined,
      },
    },
    componentSurface: extractSurfaceConfig(config, { omit: ["maxWidth", "padding"] }),
    itemSurface: config.slots?.root,
  });
  const itemSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-item`,
    componentSurface: config.slots?.item,
  });

  return (
    <>
      <div
        data-snapshot-component="stack"
        data-snapshot-id={`${rootId}-root`}
        className={rootSurface.className}
        style={rootSurface.style}
      >
        {config.children.map((child, index) => (
          <div
            key={child.id ?? `stack-child-${index}`}
            data-snapshot-id={`${rootId}-item-${index}`}
            className={itemSurface.className}
            style={{
              ...(typeof config.animation?.stagger === "number"
                ? {
                    ["--sn-stagger-index" as "--sn-stagger-index"]: index,
                  }
                : undefined),
              ...(itemSurface.style ?? {}),
            }}
          >
            <ComponentRenderer config={child} />
          </div>
        ))}
      </div>
      <SurfaceStyles css={rootSurface.scopedCss} />
      <SurfaceStyles css={itemSurface.scopedCss} />
    </>
  );
}
