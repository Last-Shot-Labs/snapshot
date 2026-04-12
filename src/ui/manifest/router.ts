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

function listPathPrefixes(path: string): string[] {
  const normalizedPath = normalizePathname(path);
  if (normalizedPath === "/") {
    return ["/"];
  }

  const segments = normalizedPath.split("/").filter(Boolean);
  return segments.map(
    (_segment, index) => `/${segments.slice(0, index + 1).join("/")}`,
  );
}

function findRouteByPathPrefix(
  manifest: CompiledManifest,
  prefix: string,
): CompiledRoute | undefined {
  const exactRoute = manifest.routeMap[prefix];
  if (exactRoute) {
    return exactRoute;
  }

  return manifest.routes.find((route) => matchRoutePath(route.path, prefix) !== null);
}

function resolveActiveRoutes(
  manifest: CompiledManifest,
  route: CompiledRoute,
  currentPath: string,
): CompiledRoute[] {
  const derivedRoutes = listPathPrefixes(currentPath)
    .map((prefix) => findRouteByPathPrefix(manifest, prefix))
    .filter((candidate): candidate is CompiledRoute => Boolean(candidate));
  const explicitRoutes: CompiledRoute[] = [];
  let currentRoute: CompiledRoute | undefined = route;
  while (currentRoute) {
    explicitRoutes.unshift(currentRoute);
    currentRoute = currentRoute.parentId
      ? findRouteById(manifest, currentRoute.parentId)
      : undefined;
  }

  const activeRoutes: CompiledRoute[] = [];
  const seenRouteIds = new Set<string>();
  for (const candidate of [...derivedRoutes, ...explicitRoutes]) {
    if (seenRouteIds.has(candidate.id)) {
      continue;
    }

    seenRouteIds.add(candidate.id);
    activeRoutes.push(candidate);
  }

  if (activeRoutes.length === 0) {
    return [route];
  }

  return activeRoutes;
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

    const activeRoutes = resolveActiveRoutes(manifest, route, currentPath);

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
