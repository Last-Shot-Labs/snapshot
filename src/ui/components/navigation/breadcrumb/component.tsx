'use client';

import React, { useMemo } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { interpolate } from "../../../actions/interpolate";
import type { CompiledRoute } from "../../../manifest/types";
import { useManifestRuntime, useRouteRuntime } from "../../../manifest/runtime";
import { renderIcon } from "../../../icons/render";
import type { BreadcrumbConfig, BreadcrumbItemConfig } from "./types";

/** Separator character lookup. */
const SEPARATORS: Record<string, string> = {
  slash: "/",
  chevron: "\u203A", // ›
  dot: "\u00B7", // ·
  arrow: "\u2192", // →
};

/**
 * Computes the visible items when maxItems is set.
 * Shows the first item, an ellipsis placeholder, and the last (maxItems - 1) items.
 */
function collapseItems(
  items: BreadcrumbItemConfig[],
  maxItems: number,
): Array<BreadcrumbItemConfig | { label: "..."; collapsed: true }> {
  if (items.length <= maxItems) return items;

  const tail = items.slice(-(maxItems - 1));
  return [items[0]!, { label: "...", collapsed: true } as never, ...tail];
}

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function routeLabel(
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

function deriveRouteItems(
  config: BreadcrumbConfig,
  manifest: ReturnType<typeof useManifestRuntime>,
  routeRuntime: ReturnType<typeof useRouteRuntime>,
): BreadcrumbItemConfig[] {
  if (!manifest || !routeRuntime?.currentRoute) {
    return [];
  }

  const currentRoute = routeRuntime.currentRoute;
  const currentPath = normalizePath(routeRuntime.currentPath);
  const params = routeRuntime.params;
  const appBreadcrumbs = manifest.app.breadcrumbs;
  const items: BreadcrumbItemConfig[] = [];
  const pushUnique = (item: BreadcrumbItemConfig) => {
    const previous = items[items.length - 1];
    if (previous?.path === item.path && previous?.label === item.label) {
      return;
    }
    items.push(item);
  };

  if (config.includeHome !== false && manifest.app.home) {
    const homePath = normalizePath(appBreadcrumbs?.home?.href ?? manifest.app.home);
    pushUnique({
      label:
        appBreadcrumbs?.home?.label ??
        routeLabel(
          manifest.routes.find((route) => normalizePath(route.path) === homePath) ??
            currentRoute,
          params,
          homePath,
        ),
      path: currentPath === homePath ? undefined : homePath,
      icon: appBreadcrumbs?.home?.icon,
    });
  }

  const patternParts = normalizePath(currentRoute.path)
    .split("/")
    .filter(Boolean);
  const currentParts = currentPath.split("/").filter(Boolean);

  for (let i = 0; i < patternParts.length; i += 1) {
    const patternPath = `/${patternParts.slice(0, i + 1).join("/")}`;
    const actualPath = `/${currentParts.slice(0, i + 1).join("/")}`;
    const route = manifest.routes.find(
      (candidate) => normalizePath(candidate.path) === patternPath,
    );
    if (!route) {
      continue;
    }

    pushUnique({
      label:
        appBreadcrumbs?.labels?.[actualPath] ??
        routeLabel(route, params, actualPath),
      path: i === patternParts.length - 1 ? undefined : actualPath,
    });
  }

  if (items.length === 0) {
    pushUnique({
      label: routeLabel(currentRoute, params, currentPath),
    });
  }

  return items;
}

/**
 * Breadcrumb component — renders a navigation breadcrumb trail.
 *
 * Shows the user's current location within the application hierarchy.
 * The last item is rendered as non-interactive (current page).
 * Supports collapsing middle items when maxItems is exceeded.
 *
 * @param props.config - The breadcrumb config from the manifest
 */
export function BreadcrumbComponent({ config }: { config: BreadcrumbConfig }) {
  const execute = useActionExecutor();
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const separator = SEPARATORS[config.separator ?? "chevron"] ?? "\u203A";
  const context = useMemo(
    () => ({
      params: routeRuntime?.params ?? {},
      route: {
        id: routeRuntime?.currentRoute?.id,
        path: routeRuntime?.currentPath,
        pattern: routeRuntime?.currentRoute?.path,
      },
    }),
    [routeRuntime],
  );

  const resolvedItems = useMemo(() => {
    const baseItems =
      (config.source ?? "manual") === "route" || !config.items
        ? deriveRouteItems(config, manifest, routeRuntime)
        : config.items;

    return baseItems.map((item) => ({
      ...item,
      label: interpolate(item.label, context),
      path: item.path ? interpolate(item.path, context) : undefined,
    }));
  }, [config, context, manifest, routeRuntime]);

  const visibleItems =
    config.maxItems != null
      ? collapseItems(resolvedItems, config.maxItems)
      : resolvedItems;

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: BreadcrumbItemConfig,
  ) => {
    if (config.action) {
      event.preventDefault();
      void execute(config.action);
      return;
    }

    if (item.path && routeRuntime?.navigate) {
      event.preventDefault();
      routeRuntime.navigate(item.path);
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      data-snapshot-component="breadcrumb"
      data-testid="breadcrumb"
      className={config.className}
      style={{
        ...((config.style as React.CSSProperties) ?? {}),
      }}
    >
      <style>{`
        [data-snapshot-component="breadcrumb"] a:focus {
          outline: none;
        }
        [data-snapshot-component="breadcrumb"] a:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
          border-radius: var(--sn-radius-sm, 0.25rem);
        }
      `}</style>
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sn-spacing-xs, 0.25rem)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "var(--sn-font-size-sm, 0.875rem)",
          flexWrap: "wrap",
        }}
      >
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isCollapsed = "collapsed" in item;

          return (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--sn-spacing-xs, 0.25rem)",
              }}
            >
              {/* Separator (before every item except the first) */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "var(--sn-color-muted-foreground, #9ca3af)",
                    userSelect: "none",
                  }}
                >
                  {separator}
                </span>
              )}

              {isCollapsed ? (
                <span
                  style={{
                    color: "var(--sn-color-muted-foreground, #9ca3af)",
                  }}
                >
                  ...
                </span>
              ) : isLast ? (
                /* Current page — not a link */
                <span
                  aria-current="page"
                  style={{
                    color: "var(--sn-color-foreground, #111827)",
                    fontWeight:
                      "var(--sn-font-weight-medium, 500)" as unknown as number,
                  }}
                >
                  {item.icon && (
                    <span
                      aria-hidden="true"
                      style={{
                        marginRight: "var(--sn-spacing-xs, 0.25rem)",
                      }}
                    >
                      {renderIcon(item.icon, 14)}
                    </span>
                  )}
                  {item.label}
                </span>
              ) : (
                /* Clickable breadcrumb item */
                <a
                  href={(item as BreadcrumbItemConfig).path ?? "#"}
                  onClick={(event) =>
                    handleNavigate(event, item as BreadcrumbItemConfig)
                  }
                  style={{
                    color: "var(--sn-color-muted-foreground, #6b7280)",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: `color var(--sn-duration-fast, 150ms) var(--sn-ease-out, ease-out)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--sn-color-foreground, #111827)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--sn-color-muted-foreground, #6b7280)";
                  }}
                >
                  {(item as BreadcrumbItemConfig).icon && (
                    <span
                      aria-hidden="true"
                      style={{
                        marginRight: "var(--sn-spacing-xs, 0.25rem)",
                      }}
                    >
                      {renderIcon((item as BreadcrumbItemConfig).icon, 14)}
                    </span>
                  )}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
