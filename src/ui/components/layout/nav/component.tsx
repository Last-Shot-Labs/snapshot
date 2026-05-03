'use client';

import { useEffect, useState } from "react";
import { useSubscribe } from "../../../context";
import { resolveRuntimeLocale, resolveTRef } from "../../../i18n/resolve";
import { isTRef, type I18nConfig, type TRef } from "../../../i18n/schema";
import { ComponentRenderer } from "../../../manifest/renderer";
import { useManifestRuntime } from "../../../manifest/runtime";
import type { ComponentConfig } from "../../../manifest/types";
import { ComponentWrapper } from "../../_base/component-wrapper";
import { extractSurfaceConfig } from "../../_base/style-surfaces";
import { NavDropdown } from "../nav-dropdown";
import { NavLink } from "../nav-link";
import { NavLogo } from "../nav-logo";
import { NavUserMenu } from "../nav-user-menu";
import { useNav } from "./hook";
import type { NavConfig } from "./schema";
import type { ResolvedNavItem } from "./types";
import { NavBase, type NavBaseItem, type NavBaseLogo } from "./standalone";

function resolveNavText(
  value: string | TRef | undefined,
  locale: string | undefined,
  i18n: I18nConfig | undefined,
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (isTRef(value)) return resolveTRef(value, locale, i18n);
  return "";
}

function resolvePositiveBadge(item: ResolvedNavItem): number | undefined {
  return item.resolvedBadge !== null && item.resolvedBadge > 0
    ? item.resolvedBadge
    : undefined;
}

function buildNavLinkConfig(
  item: ResolvedNavItem,
  id: string,
  slots: NavConfig["slots"],
) {
  return {
    type: "nav-link" as const,
    id,
    label: item.label,
    path: item.path ?? "/",
    icon: item.icon,
    badge: resolvePositiveBadge(item),
    disabled: item.isDisabled,
    active: item.isActive,
    matchChildren: true,
    slots: {
      root: slots?.item ?? item.slots?.item,
      label: slots?.itemLabel ?? item.slots?.itemLabel,
      icon: slots?.itemIcon ?? item.slots?.itemIcon,
      badge: slots?.itemBadge ?? item.slots?.itemBadge,
    },
  };
}

function buildDropdownLinkConfig(
  item: ResolvedNavItem,
  id: string,
  slots: NavConfig["slots"],
) {
  return {
    type: "nav-link" as const,
    id,
    label: item.label,
    path: item.path ?? "/",
    icon: item.icon,
    badge: resolvePositiveBadge(item),
    disabled: item.isDisabled,
    active: item.isActive,
    matchChildren: true,
    slots: {
      root: slots?.dropdownItem ?? item.slots?.dropdownItem,
      label: slots?.dropdownItemLabel ?? item.slots?.dropdownItemLabel,
      icon: slots?.dropdownItemIcon ?? item.slots?.dropdownItemIcon,
      badge: slots?.dropdownItemBadge ?? item.slots?.dropdownItemBadge,
    },
  };
}

interface NavComponentProps {
  config: NavConfig;
  pathname?: string;
  onNavigate?: (path: string) => void;
  variant?: "sidebar" | "top-nav";
}

/**
 * Manifest adapter — resolves config refs, i18n, useNav state, and delegates
 * rendering to `NavBase` while injecting manifest-aware sub-components
 * (NavLink, NavDropdown, NavLogo, NavUserMenu) through render callbacks.
 */
export function Nav({
  config,
  pathname,
  onNavigate,
  variant = "sidebar",
}: NavComponentProps) {
  const manifest = useManifestRuntime();
  const localeState = useSubscribe({ from: "global.locale" });
  const [currentPath, setCurrentPath] = useState(pathname ?? "/");
  const { items, isCollapsed, toggle, user } = useNav(config, currentPath);
  const activeLocale = resolveRuntimeLocale(manifest?.raw.i18n, localeState);
  const effectiveLogo =
    config.logo ??
    (manifest?.app?.title
      ? { text: manifest.app.title, path: manifest.app.home ?? "/" }
      : undefined);

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
      return;
    }
    setCurrentPath(window.location.pathname);
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [pathname]);

  const isTopNav = variant === "top-nav";
  const rootId = config.id ?? "nav";
  const hasTemplate = Array.isArray(
    (config as Record<string, unknown>).template,
  );
  const extractedRootConfig = extractSurfaceConfig(config);
  const rootConfig = {
    ...(config.visible !== undefined ? { visible: config.visible } : {}),
    ...(extractedRootConfig ?? {}),
    ...(config.slots?.root ? { slots: { root: config.slots.root } } : {}),
  };

  if (hasTemplate) {
    const templateItems = (config as Record<string, unknown>)
      .template as ComponentConfig[];
    return (
      <ComponentWrapper type="nav" config={rootConfig}>
        <nav aria-label="Main navigation">
          {templateItems.map((child, index) => (
            <ComponentRenderer
              key={child.id ?? `nav-template-${index}`}
              config={child}
            />
          ))}
        </nav>
      </ComponentWrapper>
    );
  }

  // Adapt resolved manifest items to NavBase's simpler shape. We render real
  // labels here (post i18n resolution) and pass them into the base — the base
  // never sees TRefs.
  const baseItems: NavBaseItem[] = items
    .filter((item) => item.isVisible)
    .map((item) => ({
      label: resolveNavText(item.label, activeLocale, manifest?.raw.i18n),
      path: item.path,
      icon: item.icon,
      badge: resolvePositiveBadge(item),
      disabled: item.isDisabled,
      active: item.isActive,
      visible: item.isVisible,
      children: item.children
        ?.filter((c) => c.isVisible)
        .map((c) => ({
          label: resolveNavText(c.label, activeLocale, manifest?.raw.i18n),
          path: c.path,
          icon: c.icon,
          badge: resolvePositiveBadge(c),
          disabled: c.isDisabled,
          active: c.isActive,
          visible: c.isVisible,
        })),
    }));

  const baseLogo: NavBaseLogo | undefined = effectiveLogo
    ? {
        text: resolveNavText(
          effectiveLogo.text,
          activeLocale,
          manifest?.raw.i18n,
        ),
        src: effectiveLogo.src,
        path: effectiveLogo.path,
      }
    : undefined;

  // Map resolved items by index so renderItem can look up the original
  // ResolvedNavItem (with raw slots, children references) when emitting
  // manifest-aware sub-components.
  const visibleResolved = items.filter((item) => item.isVisible);

  return (
    <ComponentWrapper type="nav" config={rootConfig}>
      <NavBase
        id={rootId}
        variant={variant}
        items={baseItems}
        logo={baseLogo}
        collapsible={config.collapsible !== false}
        pathname={currentPath}
        onNavigate={onNavigate}
        slots={config.slots as Record<string, Record<string, unknown>> | undefined}
        collapsed={isCollapsed}
        onToggleCollapse={toggle}
        renderLogo={(logoArg) =>
          logoArg ? (
            <NavLogo
              config={{
                type: "nav-logo",
                id: `${rootId}-brand`,
                src: logoArg.src,
                text: logoArg.text,
                path: logoArg.path,
                slots: {
                  root: config.slots?.brand,
                  icon: config.slots?.brandIcon,
                  label: config.slots?.brandLabel,
                },
              }}
              onNavigate={onNavigate}
            />
          ) : null
        }
        renderItem={(_baseItem, index, defaultNode) => {
          const item = visibleResolved[index];
          if (!item) return null;
          const itemId = item.path
            ? `${rootId}-item-${index}-${item.path}`
            : `${rootId}-item-${index}`;
          const hasChildren = Boolean(item.children?.length);

          if (!hasChildren && item.path) {
            return (
              <li
                key={item.path ?? `${rootId}-item-${index}`}
                style={isTopNav ? { position: "relative" } : undefined}
              >
                <NavLink
                  config={buildNavLinkConfig(item, itemId, config.slots)}
                  onNavigate={onNavigate}
                />
              </li>
            );
          }

          if (isTopNav && hasChildren) {
            return (
              <li
                key={item.path ?? `${rootId}-item-${index}`}
                style={{ position: "relative" }}
              >
                <NavDropdown
                  config={{
                    type: "nav-dropdown",
                    id: itemId,
                    label: resolveNavText(
                      item.label,
                      activeLocale,
                      manifest?.raw.i18n,
                    ),
                    icon: item.icon,
                    current: item.isActive,
                    disabled: item.isDisabled,
                    align: "start",
                    trigger: "click",
                    slots: {
                      trigger: config.slots?.item ?? item.slots?.item,
                      triggerLabel:
                        config.slots?.itemLabel ?? item.slots?.itemLabel,
                      triggerIcon:
                        config.slots?.itemIcon ?? item.slots?.itemIcon,
                      panel: config.slots?.dropdown,
                      item: config.slots?.dropdownItem,
                      itemLabel: config.slots?.dropdownItemLabel,
                      itemIcon: config.slots?.dropdownItemIcon,
                    },
                    items:
                      item.children
                        ?.filter((child) => child.isVisible)
                        .map((child, ci) =>
                          buildDropdownLinkConfig(
                            child,
                            `${itemId}-dropdown-item-${ci}`,
                            config.slots,
                          ),
                        ) ?? [],
                  }}
                  onNavigate={onNavigate}
                />
              </li>
            );
          }

          // Fallback: nested sidebar with children — keep default rendering.
          return defaultNode;
        }}
        footer={
          user && config.userMenu ? (
            isTopNav ? (
              <div style={{ marginLeft: "auto" }}>
                <NavUserMenu
                  config={{
                    type: "nav-user-menu",
                    id: `${rootId}-user-menu`,
                    mode: "compact",
                    showAvatar:
                      typeof config.userMenu === "object"
                        ? config.userMenu.showAvatar
                        : undefined,
                    showEmail:
                      typeof config.userMenu === "object"
                        ? config.userMenu.showEmail
                        : undefined,
                    showName: false,
                    items:
                      typeof config.userMenu === "object"
                        ? config.userMenu.items
                        : undefined,
                    slots: {
                      trigger: config.slots?.userMenuTrigger,
                      avatar: config.slots?.userAvatar,
                      panel: config.slots?.userMenu,
                      item: config.slots?.userMenuItem,
                    },
                  }}
                />
              </div>
            ) : (
              <div
                data-sn-nav-user=""
                style={{
                  marginTop: "auto",
                  borderTop:
                    "var(--sn-border-thin, 1px) solid var(--sn-color-border)",
                  paddingTop: "var(--sn-spacing-sm, 0.5rem)",
                }}
              >
                <NavUserMenu
                  config={{
                    type: "nav-user-menu",
                    id: `${rootId}-user-menu`,
                    mode: "full",
                    showAvatar:
                      typeof config.userMenu === "object"
                        ? config.userMenu.showAvatar
                        : undefined,
                    showEmail:
                      typeof config.userMenu === "object"
                        ? config.userMenu.showEmail
                        : undefined,
                    showName: true,
                    items:
                      typeof config.userMenu === "object"
                        ? config.userMenu.items
                        : undefined,
                    slots: {
                      trigger: config.slots?.userMenuTrigger,
                      avatar: config.slots?.userAvatar,
                      panel: config.slots?.userMenu,
                      item: config.slots?.userMenuItem,
                    },
                  }}
                />
              </div>
            )
          ) : null
        }
      />
    </ComponentWrapper>
  );
}
