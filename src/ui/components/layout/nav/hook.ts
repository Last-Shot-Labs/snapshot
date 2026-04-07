import { useState, useMemo, useCallback } from "react";
import { useSubscribe } from "../../../context/index";
import type { NavConfig, NavItemConfig } from "./schema";
import type { AuthUser, ResolvedNavItem, UseNavResult } from "./types";

/**
 * Resolve a single nav item: compute active state, visibility, and badge value.
 */
function resolveNavItem(
  item: NavItemConfig,
  pathname: string,
  userRoles: string[],
  subscribedBadge: unknown,
): ResolvedNavItem {
  const isActive = item.path ? pathname === item.path : false;
  const isVisible =
    !item.roles ||
    item.roles.length === 0 ||
    item.roles.some((role: string) => userRoles.includes(role));

  let resolvedBadge: number | null = null;
  if (typeof item.badge === "number") {
    resolvedBadge = item.badge;
  } else if (typeof subscribedBadge === "number") {
    resolvedBadge = subscribedBadge;
  }

  const resolvedChildren = item.children?.map((child: NavItemConfig) =>
    resolveNavItem(child, pathname, userRoles, undefined),
  );

  return {
    ...item,
    isActive,
    isVisible,
    resolvedBadge,
    children: resolvedChildren,
  };
}

/**
 * Recursively find the first active item in a resolved nav tree.
 */
function findActiveItem(items: ResolvedNavItem[]): ResolvedNavItem | null {
  for (const item of items) {
    if (item.isActive && item.isVisible) return item;
    if (item.children) {
      const child = findActiveItem(item.children);
      if (child) return child;
    }
  }
  return null;
}

/**
 * Headless hook for nav component logic.
 * Resolves nav items with active state, role-based visibility,
 * badge resolution from FromRefs, and collapse toggle.
 *
 * @param config - Nav component configuration from the manifest
 * @param pathname - Current URL pathname for active route detection
 * @returns Resolved nav items, active item, collapse state, and user info
 */
export function useNav(config: NavConfig, pathname: string): UseNavResult {
  const [isCollapsed, setIsCollapsed] = useState(config.collapsible !== false);

  // Read global.user from AppContext for role filtering and user menu
  const rawUser = useSubscribe({ from: "global.user" });
  const user = (rawUser as AuthUser) ?? null;

  const userRoles = useMemo(() => {
    if (!user) return [] as string[];
    const roles: string[] = [];
    if (user.role) roles.push(user.role);
    if (user.roles) roles.push(...user.roles);
    return roles;
  }, [user]);

  // Subscribe to badge FromRefs for each item that has a FromRef badge.
  // We collect all badge subscriptions in a stable order based on item index.
  const badgeValues: unknown[] = [];
  for (const item of config.items) {
    if (
      typeof item.badge === "object" &&
      item.badge !== null &&
      "from" in item.badge
    ) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      badgeValues.push(useSubscribe(item.badge));
    } else {
      badgeValues.push(undefined);
    }
  }

  const items = useMemo(() => {
    return config.items.map((item, index) =>
      resolveNavItem(item, pathname, userRoles, badgeValues[index]),
    );
    // badgeValues is intentionally spread to avoid array reference instability
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.items, pathname, userRoles, ...badgeValues]);

  const activeItem = useMemo(() => findActiveItem(items), [items]);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return {
    items,
    activeItem,
    isCollapsed,
    toggle,
    user,
  };
}
