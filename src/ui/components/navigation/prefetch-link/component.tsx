"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { usePrefetchRoute } from "../../../../ssr/prefetch";
import { SurfaceStyles } from "../../_base/surface-styles";
import {
  extractSurfaceConfig,
  resolveSurfacePresentation,
} from "../../_base/style-surfaces";
import type { PrefetchLinkProps } from "./schema";

/**
 * `<PrefetchLink>` — a prefetch primitive that renders a plain `<a>` anchor and
 * automatically injects `<link rel="prefetch">` tags for the matching route's JS
 * chunks and CSS files.
 *
 * Prefetch is triggered by the `prefetch` config field:
 * - `'hover'`    — prefetch when the user mouses over the link (default)
 * - `'viewport'` — prefetch as soon as the link scrolls into view
 * - `'none'`     — no automatic prefetching
 *
 * This component renders a plain `<a>` tag and does **not** import TanStack
 * Router's `<Link>`. It is a prefetch primitive — consumers wire their own router.
 * This design avoids a peer dependency on TanStack Router in the component library.
 *
 * @param config - Config object validated by `prefetchLinkSchema`.
 */
export function PrefetchLink(config: PrefetchLinkProps) {
  const prefetchRoute = usePrefetchRoute();
  const ref = useRef<HTMLAnchorElement>(null);
  const rootId = config.id ?? "prefetch-link";
  const prefetch = config.prefetch ?? "hover";

  // Viewport prefetch via IntersectionObserver.
  // Only active when prefetch === 'viewport'.
  useEffect(() => {
    if (
      (prefetch !== "viewport" && prefetch !== "visible") ||
      !ref.current
    ) {
      return;
    }

    // IntersectionObserver is not available in SSR — guard it.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          prefetchRoute(config.to);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prefetch, config.to, prefetchRoute]);

  useEffect(() => {
    if (prefetch !== "eager") {
      return;
    }

    prefetchRoute(config.to);
  }, [prefetch, config.to, prefetchRoute]);

  const handlePrefetch =
    prefetch === "hover" ? () => prefetchRoute(config.to) : undefined;
  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    implementationBase: {
      color: "var(--sn-color-primary, #2563eb)",
      cursor: "pointer",
      focus: {
        ring: true,
      },
      hover: {
        opacity: 0.84,
      },
      style: {
        textDecoration: "none",
      },
    },
    componentSurface: extractSurfaceConfig(config),
    itemSurface: config.slots?.root,
  });

  return (
    <>
      <a
        ref={ref}
        href={config.to}
        onPointerEnter={handlePrefetch}
        onFocus={handlePrefetch}
        data-snapshot-id={`${rootId}-root`}
        className={rootSurface.className}
        style={rootSurface.style as CSSProperties | undefined}
        target={config.target}
        rel={config.rel}
      >
        {config.children}
      </a>
      <SurfaceStyles css={rootSurface.scopedCss} />
    </>
  );
}
