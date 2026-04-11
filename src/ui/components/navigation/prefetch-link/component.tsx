'use client';

import React, { useRef, useEffect } from "react";
import { usePrefetchRoute } from "../../../../ssr/prefetch";
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
export function PrefetchLink({
  to,
  prefetch = "hover",
  children,
  className,
  target,
  rel,
}: PrefetchLinkProps) {
  const prefetchRoute = usePrefetchRoute();
  const ref = useRef<HTMLAnchorElement>(null);

  // Viewport prefetch via IntersectionObserver.
  // Only active when prefetch === 'viewport'.
  useEffect(() => {
    if ((prefetch !== "viewport" && prefetch !== "visible") || !ref.current) {
      return;
    }

    // IntersectionObserver is not available in SSR — guard it.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          prefetchRoute(to);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, prefetch, prefetchRoute]);

  useEffect(() => {
    if (prefetch !== "eager") {
      return;
    }

    prefetchRoute(to);
  }, [prefetch, prefetchRoute, to]);

  const handleMouseEnter =
    prefetch === "hover" ? () => prefetchRoute(to) : undefined;

  return (
    <a
      ref={ref}
      href={to}
      onMouseEnter={handleMouseEnter}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
