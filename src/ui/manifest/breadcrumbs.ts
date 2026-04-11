import { interpolate } from "../actions/interpolate";
import type { CompiledRoute, RouteMatch } from "./types";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
  isCurrent: boolean;
}

export interface BreadcrumbAutoConfig {
  auto: boolean;
  home?: {
    label: string;
    icon?: string;
    href: string;
  };
  separator: string;
  labels?: Record<string, string>;
}

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

function resolveRoutePath(
  route: Pick<CompiledRoute, "path">,
  params: Record<string, string>,
): string {
  return normalizePath(
    route.path.replace(/\{([^}]+)\}/g, (_match, name: string) =>
      encodeURIComponent(params[name] ?? name),
    ),
  );
}

function resolveRouteLabel(
  route: Pick<CompiledRoute, "id" | "path" | "page">,
  params: Record<string, string>,
  currentPath: string,
): string {
  const template = route.page.breadcrumb ?? route.page.title ?? route.id;
  return interpolate(template, {
    params,
    route: {
      id: route.id,
      path: currentPath,
      pattern: route.path,
    },
  });
}

/**
 * Generate breadcrumb items from the current matched route hierarchy.
 */
export function generateBreadcrumbs(
  match: RouteMatch,
  config: BreadcrumbAutoConfig,
): BreadcrumbItem[] {
  if (!match.route) {
    return [];
  }

  const items: BreadcrumbItem[] = [];
  const activeRoutes =
    match.activeRoutes.length > 0 ? match.activeRoutes : [match.route];
  const pushUnique = (item: BreadcrumbItem) => {
    const previous = items[items.length - 1];
    if (previous?.path === item.path && previous?.label === item.label) {
      return;
    }
    items.push(item);
  };

  if (config.home) {
    const homePath = normalizePath(config.home.href);
    pushUnique({
      label: config.home.label,
      icon: config.home.icon,
      path: homePath === normalizePath(match.route.path) ? undefined : homePath,
      isCurrent: normalizePath(match.route.path) === homePath,
    });
  }

  activeRoutes.forEach((route, index) => {
    const resolvedPath = resolveRoutePath(route, match.params);
    const isCurrent = index === activeRoutes.length - 1;
    pushUnique({
      label:
        config.labels?.[resolvedPath] ??
        resolveRouteLabel(route, match.params, resolvedPath),
      path: isCurrent ? undefined : resolvedPath,
      isCurrent,
    });
  });

  return items;
}
