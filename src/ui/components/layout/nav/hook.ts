import { useState, useMemo, useCallback } from "react";
import { useSubscribe } from "../../../context/index";
import { useResolveFromMany } from "../../../context/hooks";
import type { NavConfig, NavItemConfig } from "./schema";
import type { AuthUser, ResolvedNavItem, UseNavResult } from "./types";

/**
 * Resolve a single nav item: compute active state, visibility, and badge value.
 */
function resolveNavItem(
  item: NavItemConfig,
  pathname: string,
  user: AuthUser | null,
  userRoles: string[],
  subscribedBadge: unknown,
  subscribedVisible: unknown,
  subscribedDisabled: unknown,
): ResolvedNavItem {
  const resolvedVisible =
    typeof item.visible === "boolean"
      ? item.visible
      : typeof subscribedVisible === "boolean"
        ? subscribedVisible
        : true;
  const resolvedDisabled =
    typeof item.disabled === "boolean"
      ? item.disabled
      : typeof subscribedDisabled === "boolean"
        ? subscribedDisabled
        : false;
  const matchesAuth =
    item.authenticated === undefined
      ? true
      : item.authenticated
        ? Boolean(user)
        : !user;
  const matchesRole =
    !item.roles ||
    item.roles.length === 0 ||
    item.roles.some((role: string) => userRoles.includes(role));
  const isVisible = resolvedVisible && matchesAuth && matchesRole;

  let resolvedBadge: number | null = null;
  if (typeof item.badge === "number") {
    resolvedBadge = item.badge;
  } else if (typeof subscribedBadge === "number") {
    resolvedBadge = subscribedBadge;
  }

  const resolvedChildren = item.children?.map((child: NavItemConfig) =>
    resolveNavItem(
      child,
      pathname,
      user,
      userRoles,
      undefined,
      undefined,
      undefined,
    ),
  );
  const matchesPath = item.path
    ? pathname === item.path || pathname.startsWith(item.path + "/")
    : false;
  const isActive = resolvedChildren?.length
    ? resolvedChildren.some((child: ResolvedNavItem) => child.isActive)
    : matchesPath;

  return {
    ...item,
    isActive,
    isVisible,
    isDisabled: resolvedDisabled,
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
 *
 * @example
 * ```tsx
 * const nav = useNav(navConfig, window.location.pathname);
 *
 * return (
 *   <aside>
 *     <button onClick={nav.toggleCollapse}>
 *       {nav.isCollapsed ? "Expand" : "Collapse"}
 *     </button>
 *     <ul>
 *       {nav.items.map((item) => (
 *         <li key={item.id} aria-current={item.isActive ? "page" : undefined}>
 *           <a href={item.href}>{item.label}</a>
 *         </li>
 *       ))}
 *     </ul>
 *   </aside>
 * );
 * ```
 */
export function useNav(config: NavConfig, pathname: string): UseNavResult {
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  // Subscribe to per-item FromRefs in stable, dynamic-length hook calls.
  const navItems = config.items ?? [];
  const refForKey = (
    key: "badge" | "visible" | "disabled",
  ): unknown[] =>
    navItems.map((item: NavItemConfig) => {
      const value = item[key];
      if (typeof value === "object" && value !== null && "from" in value) {
        return value;
      }
      return undefined;
    });
  const badgeRefs = useMemo(
    () => refForKey("badge"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navItems],
  );
  const visibilityRefs = useMemo(
    () => refForKey("visible"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navItems],
  );
  const disabledRefs = useMemo(
    () => refForKey("disabled"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navItems],
  );
  const badgeValues = useResolveFromMany(badgeRefs);
  const visibilityValues = useResolveFromMany(visibilityRefs);
  const disabledValues = useResolveFromMany(disabledRefs);

  const items = useMemo(() => {
    return navItems.map((item: NavItemConfig, index: number) =>
      resolveNavItem(
        item,
        pathname,
        user,
        userRoles,
        badgeValues[index],
        visibilityValues[index],
        disabledValues[index],
      ),
    );
  }, [
    navItems,
    pathname,
    user,
    userRoles,
    badgeValues,
    visibilityValues,
    disabledValues,
  ]);

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
