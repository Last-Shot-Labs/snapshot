'use client';

import { useMemo } from "react";
import {
  generateBreadcrumbs,
  type BreadcrumbAutoConfig,
  type BreadcrumbItem,
} from "../manifest/breadcrumbs";
import { resolveRouteMatch } from "../manifest/router";
import { useManifestRuntime, useRouteRuntime } from "../manifest/runtime";

/**
 * Resolve auto-generated breadcrumb items for the current route match.
 */
export function useAutoBreadcrumbs(
  config?: BreadcrumbAutoConfig,
): BreadcrumbItem[] {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();

  return useMemo(() => {
    if (!config?.auto || !manifest || !routeRuntime?.currentPath) {
      return [];
    }

    const match =
      routeRuntime.match ?? resolveRouteMatch(manifest, routeRuntime.currentPath);
    if (!match.route) {
      return [];
    }

    return generateBreadcrumbs(match, config);
  }, [config, manifest, routeRuntime?.currentPath, routeRuntime?.match]);
}
