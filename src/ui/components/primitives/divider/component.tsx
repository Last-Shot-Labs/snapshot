'use client';

import { useResolveFrom, useSubscribe } from "../../../context";
import { resolveRuntimeLocale } from "../../../i18n/resolve";
import { useManifestRuntime, useRouteRuntime } from "../../../manifest/runtime";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import { resolveOptionalPrimitiveValue } from "../resolve-value";
import type { DividerConfig } from "./types";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

export function Divider({ config }: { config: DividerConfig }) {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const localeState = useSubscribe({ from: "global.locale" });
  const activeLocale = resolveRuntimeLocale(manifest?.raw.i18n, localeState);
  const resolvedConfig = useResolveFrom({
    label: config.label,
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
  const resolvedLabel = resolveOptionalPrimitiveValue(resolvedConfig.label, {
    context: templateContext,
    locale: activeLocale,
    i18n: manifest?.raw.i18n,
  });
  const rootId = config.id ?? "divider";

  if (config.orientation === "vertical") {
    const rootSurface = resolveSurfacePresentation({
      surfaceId: `${rootId}-root`,
      implementationBase: {
        style: {
          width: "1px",
          alignSelf: "stretch",
          background: "var(--sn-color-border)",
        },
      },
      componentSurface: config,
      itemSurface: config.slots?.root,
    });

    return (
      <>
        <div
          role="separator"
          aria-orientation="vertical"
          data-snapshot-component="divider"
          data-snapshot-id={`${rootId}-root`}
          className={rootSurface.className}
          style={rootSurface.style}
        />
        <SurfaceStyles css={rootSurface.scopedCss} />
      </>
    );
  }

  if (!resolvedLabel) {
    const rootSurface = resolveSurfacePresentation({
      surfaceId: `${rootId}-root`,
      implementationBase: {
        border: "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
        style: { borderLeft: "none", borderRight: "none", borderBottom: "none" },
      },
      componentSurface: config,
      itemSurface: config.slots?.root,
    });

    return (
      <>
        <div
          role="separator"
          data-snapshot-component="divider"
          data-snapshot-id={`${rootId}-root`}
          className={rootSurface.className}
          style={rootSurface.style}
        />
        <SurfaceStyles css={rootSurface.scopedCss} />
      </>
    );
  }

  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    implementationBase: {
      display: "flex",
      alignItems: "center",
      gap: "md",
    },
    componentSurface: config,
    itemSurface: config.slots?.root,
  });
  const startLineSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-line-start`,
    implementationBase: {
      style: {
        flex: 1,
        height: 0,
        borderTop: "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
      },
    },
    componentSurface: config.slots?.lineStart,
  });
  const labelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-label`,
    implementationBase: {
      color: "var(--sn-color-muted-foreground)",
      fontSize: "var(--sn-font-size-xs, 0.75rem)",
    },
    componentSurface: config.slots?.label,
  });
  const endLineSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-line-end`,
    implementationBase: {
      style: {
        flex: 1,
        height: 0,
        borderTop: "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
      },
    },
    componentSurface: config.slots?.lineEnd,
  });

  return (
    <>
      <div
        role="separator"
        data-snapshot-component="divider"
        data-snapshot-id={`${rootId}-root`}
        className={rootSurface.className}
        style={rootSurface.style}
      >
        <div
          data-snapshot-id={`${rootId}-line-start`}
          className={startLineSurface.className}
          style={startLineSurface.style}
        />
        <span
          data-snapshot-id={`${rootId}-label`}
          className={labelSurface.className}
          style={labelSurface.style}
        >
          {resolvedLabel}
        </span>
        <div
          data-snapshot-id={`${rootId}-line-end`}
          className={endLineSurface.className}
          style={endLineSurface.style}
        />
      </div>
      <SurfaceStyles css={rootSurface.scopedCss} />
      <SurfaceStyles css={startLineSurface.scopedCss} />
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={endLineSurface.scopedCss} />
    </>
  );
}
