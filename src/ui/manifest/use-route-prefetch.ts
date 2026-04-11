'use client';

import { useEffect } from "react";
import type { EndpointTarget } from "./resources";
import { useManifestResourceCache } from "./runtime";

export function useRoutePrefetch(endpoints: EndpointTarget[] | undefined): void {
  const cache = useManifestResourceCache();

  useEffect(() => {
    if (!cache || !endpoints || endpoints.length === 0) {
      return;
    }

    for (const endpoint of endpoints) {
      void cache.loadTarget(endpoint).catch(() => undefined);
    }
  }, [cache, endpoints]);
}
