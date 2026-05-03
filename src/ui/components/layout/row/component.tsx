'use client';

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { ComponentRenderer } from "../../../manifest/renderer";
import { useResponsiveValue } from "../../../hooks/use-breakpoint";
import { ComponentWrapper } from "../../_base/component-wrapper";
import { SurfaceStyles } from "../../_base/surface-styles";
import { extractSurfaceConfig, resolveSurfacePresentation } from "../../_base/style-surfaces";
import { GAP_MAP } from "../../_base/style-props";
import { RowBase } from "./standalone";
import type { RowConfig } from "./types";

const ALIGN_MAP: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

export function Row({ config }: { config: RowConfig }) {
  const gap = useResponsiveValue(config.gap);
  const resolvedGap = gap ? GAP_MAP[gap] ?? gap : undefined;
  const hasSpans = config.children.some(
    (child) =>
      child &&
      typeof child === "object" &&
      "span" in child &&
      (child as Record<string, unknown>).span !== undefined,
  );
  const rootId = config.id ?? "row";
  const itemSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-item`,
    implementationBase: {},
    componentSurface: config.slots?.item,
  });

  /*
   * When children have spans, the original renders a 12-column grid instead
   * of a flex row and renders children without item wrappers. We preserve
   * that special case here rather than using RowBase.
   */
  if (hasSpans) {
    const rootSurface = resolveSurfacePresentation({
      surfaceId: rootId,
      implementationBase: {
        display: "grid",
        width: "100%",
        gap: resolvedGap,
        alignItems: config.align ? ALIGN_MAP[config.align] : undefined,
        style: {
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        },
      },
      componentSurface: extractSurfaceConfig(config),
      itemSurface: config.slots?.root,
    });

    return (
      <ComponentWrapper type="row" id={config.id} config={config}>
        <div
          data-snapshot-id={rootId}
          className={rootSurface.className}
          style={rootSurface.style}
        >
          {config.children.map((child, index) => (
            <ComponentRenderer
              key={child.id ?? `row-child-${index}`}
              config={child}
            />
          ))}
        </div>
        <SurfaceStyles css={rootSurface.scopedCss} />
        <SurfaceStyles css={itemSurface.scopedCss} />
      </ComponentWrapper>
    );
  }

  return (
    <ComponentWrapper type="row" id={config.id} config={config}>
      <RowBase
        id={config.id}
        gap={gap}
        align={config.align}
        justify={config.justify}
        wrap={config.wrap}
        overflow={config.overflow}
        maxHeight={config.maxHeight}
        className={config.className}
        style={config.style as CSSProperties}
        slots={config.slots as SlotOverrides}
      >
        {config.children.map((child, index) => {
          const itemStyle =
            typeof config.animation?.stagger === "number"
              ? ({
                  ...(itemSurface.style ?? {}),
                  ["--sn-stagger-index" as "--sn-stagger-index"]: index,
                } as CSSProperties)
              : itemSurface.style;

          return (
            <div
              key={child.id ?? `row-child-${index}`}
              data-snapshot-id={`${rootId}-item`}
              className={itemSurface.className}
              style={itemStyle}
            >
              <ComponentRenderer config={child} />
            </div>
          );
        })}
      </RowBase>
      <SurfaceStyles css={itemSurface.scopedCss} />
    </ComponentWrapper>
  );
}
