"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useSubscribe } from "../../../context/index";
import { useActionExecutor } from "../../../actions/executor";
import { useManifestRuntime } from "../../../manifest/runtime";
import { renderIcon } from "../../../icons/render";
import type { NavLinkConfig } from "./types";

export function NavLink({ config }: { config: NavLinkConfig }) {
  const execute = useActionExecutor();
  const manifest = useManifestRuntime();

  const resolvedLabel = useSubscribe(
    typeof config.label === "object" && "from" in config.label
      ? config.label
      : undefined,
  );
  const label =
    typeof config.label === "string"
      ? config.label
      : typeof resolvedLabel === "string"
        ? resolvedLabel
        : "";

  const resolvedBadge = useSubscribe(
    typeof config.badge === "object" &&
      config.badge !== null &&
      "from" in config.badge
      ? config.badge
      : undefined,
  );
  const badge =
    typeof config.badge === "number"
      ? config.badge
      : typeof resolvedBadge === "number"
        ? resolvedBadge
        : null;

  const resolvedDisabled = useSubscribe(
    typeof config.disabled === "object" &&
      config.disabled !== null &&
      "from" in config.disabled
      ? config.disabled
      : undefined,
  );
  const isDisabled =
    typeof config.disabled === "boolean"
      ? config.disabled
      : typeof resolvedDisabled === "boolean"
        ? resolvedDisabled
        : false;

  const resolvedActive = useSubscribe(
    typeof config.active === "object" &&
      config.active !== null &&
      "from" in config.active
      ? config.active
      : undefined,
  );

  // Pathname detection
  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentPath(window.location.pathname);
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Active state
  const matchChildren = config.matchChildren !== false;
  const isActive =
    typeof config.active === "boolean"
      ? config.active
      : typeof resolvedActive === "boolean"
        ? resolvedActive
        : matchChildren
          ? currentPath === config.path ||
            currentPath.startsWith(config.path + "/")
          : currentPath === config.path;

  // Role-based visibility
  const rawUser = useSubscribe({ from: "global.user" });
  const user = rawUser as { role?: string; roles?: string[] } | null;
  if (config.authenticated === true && !user) return null;
  if (config.authenticated === false && user) return null;
  if (config.roles && config.roles.length > 0) {
    const userRoles: string[] = [];
    if (user?.role) userRoles.push(user.role);
    if (user?.roles) userRoles.push(...user.roles);
    if (!config.roles.some((r) => userRoles.includes(r))) return null;
  }

  const handleClick = () => {
    if (isDisabled) return;
    void execute({ type: "navigate", to: config.path } as Parameters<
      typeof execute
    >[0]);
  };

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--sn-spacing-sm, 0.5rem)",
    padding: "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
    border: "none",
    background: isActive
      ? "var(--sn-nav-active-background, var(--sn-color-accent))"
      : "transparent",
    color: isActive
      ? "var(--sn-nav-active-foreground, var(--sn-color-accent-foreground))"
      : "inherit",
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.55 : 1,
    fontSize: "var(--sn-font-size-sm, 0.875rem)",
    fontFamily: "inherit",
    fontWeight: isActive ? 600 : 500,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
  };

  return (
    <button
      type="button"
      data-nav-link=""
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      onClick={handleClick}
      style={style}
    >
      {config.icon && (
        <span aria-hidden="true">{renderIcon(config.icon, 16)}</span>
      )}
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {badge !== null && badge > 0 && (
        <span
          data-nav-badge=""
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "1.25rem",
            height: "1.25rem",
            padding: "0 0.375rem",
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            fontWeight: 600,
            borderRadius: "var(--sn-radius-full, 9999px)",
            background: "var(--sn-color-primary)",
            color: "var(--sn-color-primary-foreground)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
