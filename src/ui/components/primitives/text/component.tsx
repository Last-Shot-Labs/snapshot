'use client';

import type { CSSProperties } from "react";
import { useResolveFrom, useSubscribe } from "../../../context";
import { resolveRuntimeLocale } from "../../../i18n/resolve";
import { useManifestRuntime } from "../../../manifest/runtime";
import { useRouteRuntime } from "../../../manifest/runtime";
import { SurfaceStyles } from "../../_base/surface-styles";
import { extractSurfaceConfig, resolveSurfacePresentation } from "../../_base/style-surfaces";
import { resolvePrimitiveValue } from "../resolve-value";
import type { TextConfig } from "./types";

const COLOR_MAP: Record<NonNullable<TextConfig["variant"]>, string> = {
  default: "var(--sn-color-foreground)",
  muted: "var(--sn-color-muted-foreground)",
  subtle:
    "color-mix(in oklch, var(--sn-color-muted-foreground) 75%, transparent)",
};

const SIZE_MAP: Record<NonNullable<TextConfig["size"]>, string> = {
  xs: "var(--sn-font-size-xs, 0.75rem)",
  sm: "var(--sn-font-size-sm, 0.875rem)",
  md: "var(--sn-font-size-md, 1rem)",
  lg: "var(--sn-font-size-lg, 1.125rem)",
};

const WEIGHT_MAP: Record<NonNullable<TextConfig["weight"]>, CSSProperties["fontWeight"]> = {
  light: "var(--sn-font-weight-light, 300)",
  normal: "var(--sn-font-weight-normal, 400)",
  medium: "var(--sn-font-weight-medium, 500)",
  semibold: "var(--sn-font-weight-semibold, 600)",
  bold: "var(--sn-font-weight-bold, 700)",
};

export function Text({ config }: { config: TextConfig }) {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const localeState = useSubscribe({ from: "global.locale" });
  const activeLocale = resolveRuntimeLocale(manifest?.raw.i18n, localeState);
  const resolvedConfig = useResolveFrom({
    value: config.value,
  });
  const templateContext = {
    app: manifest?.app ?? {},
    auth: manifest?.auth ?? {},
    route: {
      ...(routeRuntime?.currentRoute ?? {}),
      path: routeRuntime?.currentPath,
      params: routeRuntime?.params,
      query: routeRuntime?.query,
    },
  };
  const value = resolvePrimitiveValue(resolvedConfig.value, {
    context: templateContext,
    locale: activeLocale,
    i18n: manifest?.raw.i18n,
  });
  const rootId = config.id ?? "text";
  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    implementationBase: {
      color: COLOR_MAP[config.variant ?? "default"],
      fontSize: SIZE_MAP[config.size ?? "md"],
      fontWeight: WEIGHT_MAP[config.weight ?? "normal"],
      textAlign: config.align ?? "left",
      style: { margin: 0 },
    },
    componentSurface: extractSurfaceConfig(config),
    itemSurface: config.slots?.root,
  });

  return (
    <>
      <p
        data-snapshot-component="text"
        data-snapshot-id={`${rootId}-root`}
        className={rootSurface.className}
        style={rootSurface.style}
      >
        {value}
      </p>
      <SurfaceStyles css={rootSurface.scopedCss} />
    </>
  );
}
