'use client';

import React, { useMemo } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { interpolate } from "../../../actions/interpolate";
import { useAutoBreadcrumbs } from "../../../hooks/use-auto-breadcrumbs";
import { renderIcon } from "../../../icons/render";
import { useManifestRuntime, useRouteRuntime } from "../../../manifest/runtime";
import type { BreadcrumbConfig, BreadcrumbItemConfig } from "./types";

const SEPARATORS: Record<string, string> = {
  slash: "/",
  chevron: "\u203A",
  dot: "\u00B7",
  arrow: "\u2192",
};

function collapseItems(
  items: BreadcrumbItemConfig[],
  maxItems: number,
): Array<BreadcrumbItemConfig | { label: "..."; collapsed: true }> {
  if (items.length <= maxItems) {
    return items;
  }

  const tail = items.slice(-(maxItems - 1));
  return [items[0]!, { label: "...", collapsed: true } as never, ...tail];
}

/**
 * Breadcrumb component that supports explicit items and manifest-driven auto generation.
 */
export function BreadcrumbComponent({ config }: { config: BreadcrumbConfig }) {
  const execute = useActionExecutor();
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const separator = SEPARATORS[config.separator ?? "chevron"] ?? "\u203A";
  const autoItems = useAutoBreadcrumbs(
    manifest?.app.breadcrumbs?.auto || (config.source ?? "manual") === "route"
      ? {
          auto: true,
          home:
            config.includeHome === false
              ? undefined
              : manifest?.app.breadcrumbs?.home ??
                (manifest?.app.home
                  ? {
                      label: "Home",
                      href: manifest.app.home,
                    }
                  : undefined),
          separator: manifest?.app.breadcrumbs?.separator ?? "/",
          labels: manifest?.app.breadcrumbs?.labels,
        }
      : undefined,
  );
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
    const baseItems = config.items?.length ? config.items : autoItems;
    return baseItems.map((item) => ({
      ...item,
      label: interpolate(item.label, context),
      path: item.path ? interpolate(item.path, context) : undefined,
    }));
  }, [autoItems, config.items, context]);

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
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  style={{
                    color: "var(--sn-color-muted-foreground, #9ca3af)",
                    userSelect: "none",
                  }}
                >
                  {separator}
                </span>
              ) : null}

              {isCollapsed ? (
                <span
                  style={{
                    color: "var(--sn-color-muted-foreground, #9ca3af)",
                  }}
                >
                  ...
                </span>
              ) : isLast ? (
                <span
                  aria-current="page"
                  style={{
                    color: "var(--sn-color-foreground, #111827)",
                    fontWeight:
                      "var(--sn-font-weight-medium, 500)" as unknown as number,
                  }}
                >
                  {item.icon ? (
                    <span
                      aria-hidden="true"
                      style={{
                        marginRight: "var(--sn-spacing-xs, 0.25rem)",
                      }}
                    >
                      {renderIcon(item.icon, 14)}
                    </span>
                  ) : null}
                  {item.label}
                </span>
              ) : (
                <a
                  href={(item as BreadcrumbItemConfig).path ?? "#"}
                  onClick={(event) =>
                    handleNavigate(event, item as BreadcrumbItemConfig)
                  }
                  style={{
                    color: "var(--sn-color-muted-foreground, #6b7280)",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition:
                      "color var(--sn-duration-fast, 150ms) var(--sn-ease-out, ease-out)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color =
                      "var(--sn-color-foreground, #111827)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color =
                      "var(--sn-color-muted-foreground, #6b7280)";
                  }}
                >
                  {(item as BreadcrumbItemConfig).icon ? (
                    <span
                      aria-hidden="true"
                      style={{
                        marginRight: "var(--sn-spacing-xs, 0.25rem)",
                      }}
                    >
                      {renderIcon((item as BreadcrumbItemConfig).icon, 14)}
                    </span>
                  ) : null}
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
