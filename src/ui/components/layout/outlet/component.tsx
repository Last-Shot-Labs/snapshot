'use client';

import { createContext, useContext } from "react";
import { ComponentRenderer, PageRenderer } from "../../../manifest/renderer";
import { useManifestRuntime, useRouteRuntime } from "../../../manifest/runtime";
import type { OutletConfig } from "./types";

const OutletDepthContext = createContext(0);

/**
 * Layout outlet primitive used to render nested child routes from the compiled
 * manifest route tree.
 */
export function Outlet({ config }: { config: OutletConfig }) {
  const routeRuntime = useRouteRuntime();
  const manifest = useManifestRuntime();
  const outletDepth = useContext(OutletDepthContext);
  const activeRoutes = routeRuntime?.match.activeRoutes ?? [];
  const childRoute = activeRoutes[outletDepth + 1] ?? null;

  if (!childRoute) {
    return (
      <>
        {config.fallback?.map((child, index) => (
          <ComponentRenderer
            key={child.id ?? `outlet-fallback-${index}`}
            config={child}
          />
        )) ?? null}
      </>
    );
  }

  return (
    <OutletDepthContext.Provider value={outletDepth + 1}>
      <PageRenderer
        page={childRoute.page}
        routeId={childRoute.id}
        state={manifest?.state}
        resources={manifest?.resources}
      />
    </OutletDepthContext.Provider>
  );
}
