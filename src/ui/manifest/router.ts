import { resolveTemplate } from "../expressions/template";
import type { CompiledManifest, CompiledRoute, RouteMatch } from "./types";

export function normalizePathname(path: string): string {
  if (!path) {
    return "/";
  }

  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

function findRouteById(
  manifest: CompiledManifest,
  target: string,
): CompiledRoute | undefined {
  return manifest.routes.find((route) => route.id === target);
}

export function matchRoutePath(
  routePath: string,
  currentPath: string,
): Record<string, string> | null {
  const patternParts = normalizePathname(routePath).split("/").filter(Boolean);
  const currentParts = normalizePathname(currentPath)
    .split("/")
    .filter(Boolean);

  if (patternParts.length !== currentParts.length) {
    return null;
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const patternPart = patternParts[i]!;
    const currentPart = currentParts[i]!;
    const paramMatch = patternPart.match(/^\{(.+)\}$/);
    if (paramMatch) {
      params[paramMatch[1]!] = decodeURIComponent(currentPart);
      continue;
    }

    if (patternPart !== currentPart) {
      return null;
    }
  }

  return params;
}

export function resolveRouteMatch(
  manifest: CompiledManifest,
  currentPath: string,
): RouteMatch {
  const buildMatch = (
    route: CompiledRoute | null,
    params: Record<string, string>,
  ): RouteMatch => {
    if (!route) {
      return {
        route: null,
        params,
        parents: [],
        activeRoutes: [],
      };
    }

    const activeRoutes: CompiledRoute[] = [];
    let currentRoute: CompiledRoute | undefined = route;
    while (currentRoute) {
      activeRoutes.unshift(currentRoute);
      currentRoute = currentRoute.parentId
        ? findRouteById(manifest, currentRoute.parentId)
        : undefined;
    }

    return {
      route,
      params,
      parents: activeRoutes.slice(0, -1),
      activeRoutes,
    };
  };

  const normalizedCurrentPath = normalizePathname(currentPath);
  const exactRoute = manifest.routeMap[normalizedCurrentPath];
  if (exactRoute) {
    return buildMatch(exactRoute, {});
  }

  for (const route of manifest.routes) {
    const params = matchRoutePath(route.path, normalizedCurrentPath);
    if (params) {
      return buildMatch(route, params);
    }
  }

  if (manifest.app.notFound) {
    const notFoundRoute = findRouteById(manifest, manifest.app.notFound);
    if (notFoundRoute) {
      return buildMatch(notFoundRoute, {});
    }
  }

  if (manifest.app.home) {
    const homeRoute = manifest.routeMap[normalizePathname(manifest.app.home)];
    if (homeRoute) {
      return buildMatch(homeRoute, {});
    }
  }

  if (manifest.firstRoute) {
    return buildMatch(manifest.firstRoute, {});
  }

  return buildMatch(null, {});
}

export function resolveDocumentTitle(
  manifest: CompiledManifest,
  route: CompiledRoute | null,
  currentPath: string,
  params: Record<string, string>,
  locale?: string,
): string {
  const appTitle = manifest.app.title?.trim();
  const routeTitle = route?.page.title
    ? resolveTemplate(
        route.page.title,
        {
          params,
          route: {
            id: route.id,
            path: currentPath,
            pattern: route.path,
            params,
          },
        },
        {
          locale: locale ?? manifest.raw.i18n?.default,
          i18n: manifest.raw.i18n,
        },
      ).trim()
    : "";

  if (routeTitle && appTitle) {
    return `${routeTitle} | ${appTitle}`;
  }

  return routeTitle || appTitle || "";
}
