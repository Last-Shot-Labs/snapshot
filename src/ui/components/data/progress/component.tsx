'use client';

import React, { useEffect, useId } from "react";
import { useResolveFrom, useSubscribe, usePublish } from "../../../context/hooks";
import { SurfaceStyles } from "../../_base/surface-styles";
import {
  extractSurfaceConfig,
  mergeClassNames,
  mergeStyles,
  resolveSurfacePresentation,
} from "../../_base/style-surfaces";
import {
  resolveOptionalPrimitiveValue,
  usePrimitiveValueOptions,
} from "../../primitives/resolve-value";
import type { ProgressConfig } from "./types";

const SIZE_MAP = { sm: 4, md: 8, lg: 12 } as const;
const CIRCULAR_SIZE_MAP = { sm: 32, md: 48, lg: 64 } as const;

export function Progress({ config }: { config: ProgressConfig }) {
  const uniqueId = useId().replace(/:/g, "");
  const publish = usePublish(config.id);
  const visible = useSubscribe(config.visible ?? true);
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({ label: config.label });
  const resolvedLabel = resolveOptionalPrimitiveValue(
    resolvedConfig.label,
    primitiveOptions,
  );
  const resolvedValue = useSubscribe(config.value) as number | undefined;

  const max = config.max ?? 100;
  const size = config.size ?? "md";
  const variant = config.variant ?? "bar";
  const showValue = config.showValue ?? false;
  const segments = config.segments;
  const percentage =
    resolvedValue !== undefined
      ? Math.min(100, Math.max(0, (resolvedValue / max) * 100))
      : undefined;
  const isIndeterminate = percentage === undefined;
  const circularSpinCss = `
    @keyframes sn-progress-spin-${uniqueId} {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  const indeterminateBarCss = `
    @keyframes sn-progress-indeterminate-${uniqueId} {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }
  `;

  useEffect(() => {
    if (publish && percentage !== undefined) {
      publish({ value: resolvedValue, percentage });
    }
  }, [publish, resolvedValue, percentage]);

  if (visible === false) {
    return null;
  }

  const rootId = config.id ?? "progress";
  const states = isIndeterminate ? (["active"] as const) : [];
  const rootSurface = resolveSurfacePresentation({
    surfaceId: rootId,
    implementationBase: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sn-spacing-xs, 0.25rem)",
    },
    componentSurface: extractSurfaceConfig(config, { omit: ["color"] }),
    itemSurface: config.slots?.root,
    activeStates: [...states],
  });
  const labelRowSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-label-row`,
    implementationBase: {
      display: "flex",
      justifyContent: "between",
      alignItems: "center",
      fontSize: "sm",
      color: "var(--sn-color-muted-foreground, #6b7280)",
    },
    componentSurface: config.slots?.labelRow,
    activeStates: [...states],
  });
  const labelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-label`,
    implementationBase: {},
    componentSurface: config.slots?.label,
    activeStates: [...states],
  });
  const valueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-value`,
    implementationBase: {},
    componentSurface: config.slots?.value,
    activeStates: [...states],
  });

  const fillColor = `var(--sn-color-${config.color ?? "primary"}, currentColor)`;
  const trackColor = "var(--sn-color-secondary, #e5e7eb)";

  if (variant === "circular") {
    const svgSize = CIRCULAR_SIZE_MAP[size];
    const strokeWidth = size === "sm" ? 3 : size === "lg" ? 5 : 4;
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = isIndeterminate
      ? circumference * 0.75
      : circumference - (circumference * (percentage ?? 0)) / 100;
    const circularTrackSurface = resolveSurfacePresentation({
      surfaceId: `${rootId}-circular-track`,
      implementationBase: {},
      componentSurface: config.slots?.circularTrack,
      activeStates: [...states],
    });
    const circularContainerSurface = resolveSurfacePresentation({
      surfaceId: rootId,
      implementationBase: {
        alignItems: "center",
        display: "inline-flex",
      },
      componentSurface: config.slots?.circularContainer,
      activeStates: [...states],
    });
    const circularSvgSurface = resolveSurfacePresentation({
      surfaceId: `${rootId}-circular-svg`,
      implementationBase: {
        transform: "rotate(-90deg)",
        active: {
          transform: `rotate(-90deg)`,
        },
      },
      componentSurface: config.slots?.circularSvg,
      activeStates: [...states],
    });
    const circularFillSurface = resolveSurfacePresentation({
      surfaceId: `${rootId}-circular-fill`,
      implementationBase: {},
      componentSurface: config.slots?.circularFill ?? config.slots?.fill,
      activeStates: [...states],
    });
    const circularFillRuntimeSurface = resolveSurfacePresentation({
      surfaceId: `${rootId}-circular-fill-runtime`,
      implementationBase: circularFillSurface.resolvedConfigForWrapper,
      itemSurface: !isIndeterminate
        ? {
            transition:
              "stroke-dashoffset var(--sn-duration-normal, 250ms) var(--sn-ease-out, ease-out)",
          }
        : undefined,
      activeStates: [...states],
    });
    const circularSvgRuntimeStyle = mergeStyles(
      circularSvgSurface.style,
      isIndeterminate
        ? {
            animation: `sn-progress-spin-${uniqueId} var(--sn-duration-slow, 1.5s) linear infinite`,
          }
        : undefined,
    );

    return (
      <div
        data-snapshot-component="progress"
        data-testid="progress"
        data-snapshot-id={rootId}
        className={mergeClassNames(
          rootSurface.className,
          circularContainerSurface.className,
        )}
        style={mergeStyles(rootSurface.style, circularContainerSurface.style)}
      >
        {isIndeterminate ? <SurfaceStyles css={circularSpinCss} /> : null}
        <svg
          data-snapshot-id={`${rootId}-circular-svg`}
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={circularSvgSurface.className}
          style={circularSvgRuntimeStyle}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            className={circularTrackSurface.className}
            style={circularTrackSurface.style}
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={circularFillRuntimeSurface.className}
            style={circularFillRuntimeSurface.style}
          />
        </svg>
        {resolvedLabel || showValue ? (
          <div
            data-snapshot-id={`${rootId}-label-row`}
            className={labelRowSurface.className}
            style={labelRowSurface.style}
          >
            {resolvedLabel ? (
              <span
                data-snapshot-id={`${rootId}-label`}
                className={labelSurface.className}
                style={labelSurface.style}
              >
                {resolvedLabel}
              </span>
            ) : null}
            {showValue && percentage !== undefined ? (
              <span
                data-snapshot-id={`${rootId}-value`}
                className={valueSurface.className}
                style={valueSurface.style}
              >
                {Math.round(percentage)}%
              </span>
            ) : null}
          </div>
        ) : null}
        <SurfaceStyles css={rootSurface.scopedCss} />
        <SurfaceStyles css={labelRowSurface.scopedCss} />
        <SurfaceStyles css={labelSurface.scopedCss} />
        <SurfaceStyles css={valueSurface.scopedCss} />
        <SurfaceStyles css={circularContainerSurface.scopedCss} />
        <SurfaceStyles css={circularSvgSurface.scopedCss} />
        <SurfaceStyles css={circularTrackSurface.scopedCss} />
        <SurfaceStyles css={circularFillSurface.scopedCss} />
        <SurfaceStyles css={circularFillRuntimeSurface.scopedCss} />
      </div>
    );
  }

  const barHeight = SIZE_MAP[size];
  const trackSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-track`,
    implementationBase: {
      width: "100%",
      overflow: "hidden",
      height: `${barHeight}px`,
      bg: trackColor,
      borderRadius: "var(--sn-radius-full, 9999px)",
      position: "relative",
    },
    componentSurface: config.slots?.track,
    activeStates: [...states],
  });
  const fillSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-fill`,
    implementationBase: {},
    componentSurface: config.slots?.fill,
    activeStates: [...states],
  });
  const segmentSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-segment`,
    implementationBase: {},
    componentSurface: config.slots?.segment,
    activeStates: [...states],
  });
  const segmentsRowSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-segments-row`,
    implementationBase: {
      display: "flex",
      height: "100%",
      gap: "var(--sn-spacing-2xs, 2px)",
    },
    componentSurface: config.slots?.segmentsRow,
    activeStates: [...states],
  });
  const indeterminateFillSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-fill-indeterminate`,
    implementationBase: fillSurface.resolvedConfigForWrapper,
    itemSurface: {
      position: "absolute",
      inset: "0 auto 0 0",
      width: "33%",
      height: "100%",
      bg: fillColor,
      borderRadius: "var(--sn-radius-full, 9999px)",
      transition:
        "transform var(--sn-duration-slow, 1.5s) var(--sn-ease-in-out, ease-in-out)",
      style: {
        animation: `sn-progress-indeterminate-${uniqueId} var(--sn-duration-slow, 1.5s) var(--sn-ease-in-out, ease-in-out) infinite`,
      },
    },
    activeStates: [...states],
  });
  const determinateFillSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-fill-determinate`,
    implementationBase: fillSurface.resolvedConfigForWrapper,
    itemSurface: {
      width: `${percentage ?? 0}%`,
      height: "100%",
      bg: fillColor,
      borderRadius: "var(--sn-radius-full, 9999px)",
      transition:
        "width var(--sn-duration-normal, 250ms) var(--sn-ease-out, ease-out)",
    },
    activeStates: [...states],
  });

  return (
    <div
      data-snapshot-component="progress"
      data-testid="progress"
      data-snapshot-id={rootId}
      className={rootSurface.className}
      style={rootSurface.style}
    >
      {isIndeterminate ? <SurfaceStyles css={indeterminateBarCss} /> : null}

      {(resolvedLabel || (showValue && percentage !== undefined)) ? (
        <div
          data-snapshot-id={`${rootId}-label-row`}
          className={labelRowSurface.className}
          style={labelRowSurface.style}
        >
          {resolvedLabel ? (
            <span
              data-snapshot-id={`${rootId}-label`}
              className={labelSurface.className}
              style={labelSurface.style}
            >
              {resolvedLabel}
            </span>
          ) : null}
          {showValue && percentage !== undefined ? (
            <span
              data-snapshot-id={`${rootId}-value`}
              className={valueSurface.className}
              style={valueSurface.style}
            >
              {Math.round(percentage)}%
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={resolvedLabel ?? "Progress"}
        data-progress-bar=""
        data-snapshot-id={`${rootId}-track`}
        className={trackSurface.className}
        style={trackSurface.style}
      >
        {isIndeterminate ? (
          <div
            data-snapshot-id={`${rootId}-fill`}
            className={indeterminateFillSurface.className}
            style={indeterminateFillSurface.style}
          />
        ) : segments && segments > 1 ? (
          <div
            data-snapshot-id={`${rootId}-segments-row`}
            className={segmentsRowSurface.className}
            style={segmentsRowSurface.style}
          >
            {Array.from({ length: segments }).map((_, index) => {
              const segmentThreshold = ((index + 1) / segments) * 100;
              const isFilled = (percentage ?? 0) >= segmentThreshold;
              const isPartial =
                !isFilled && (percentage ?? 0) > (index / segments) * 100;
              const segmentItemSurface = resolveSurfacePresentation({
                surfaceId: `${rootId}-segment-${index}`,
                implementationBase: segmentSurface.resolvedConfigForWrapper,
                itemSurface: {
                  flex: "1",
                  height: "100%",
                  bg: isFilled || isPartial ? fillColor : "transparent",
                  opacity: isPartial ? 0.5 : 1,
                  borderRadius: "var(--sn-radius-full, 9999px)",
                  transition:
                    "background-color var(--sn-duration-normal, 250ms) var(--sn-ease-out, ease-out)",
                },
                activeStates: [...states],
              });
              return (
                <React.Fragment key={index}>
                  <div
                  key={index}
                    data-snapshot-id={`${rootId}-segment-${index}`}
                    className={segmentItemSurface.className}
                    style={segmentItemSurface.style}
                  />
                  <SurfaceStyles css={segmentItemSurface.scopedCss} />
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div
            data-snapshot-id={`${rootId}-fill`}
            className={determinateFillSurface.className}
            style={determinateFillSurface.style}
          />
        )}
      </div>

      <SurfaceStyles css={rootSurface.scopedCss} />
      <SurfaceStyles css={labelRowSurface.scopedCss} />
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={valueSurface.scopedCss} />
      <SurfaceStyles css={trackSurface.scopedCss} />
      <SurfaceStyles css={fillSurface.scopedCss} />
      <SurfaceStyles css={indeterminateFillSurface.scopedCss} />
      <SurfaceStyles css={determinateFillSurface.scopedCss} />
      <SurfaceStyles css={segmentsRowSurface.scopedCss} />
      <SurfaceStyles css={segmentSurface.scopedCss} />
    </div>
  );
}
