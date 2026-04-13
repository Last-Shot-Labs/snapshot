"use client";

import { useEffect, useRef } from "react";
import type { EndpointTarget } from "./resources";
import { useManifestResourceCache } from "./runtime";

/** Prefetch route-scoped resources when a compiled route advertises eager endpoints. */
export function useRoutePrefetch(
  endpoints: EndpointTarget[] | undefined,
): void {
  const cache = useManifestResourceCache();
  const cacheRef = useRef(cache);
  cacheRef.current = cache;

  useEffect(() => {
    const currentCache = cacheRef.current;
    if (!currentCache || !endpoints || endpoints.length === 0) {
      return;
    }

    const controller = new AbortController();

    for (const endpoint of endpoints) {
      void currentCache
        .loadTarget(endpoint, undefined, { signal: controller.signal })
        .catch(() => undefined);
    }

    return () => {
      controller.abort();
    };
    // Only re-fire when the endpoint list changes (i.e. route changes).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoints]);
}
