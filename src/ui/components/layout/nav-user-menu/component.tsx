"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useSubscribe } from "../../../context/index";
import { useActionExecutor } from "../../../actions/executor";
import { renderIcon } from "../../../icons/render";
import type { NavUserMenuConfig } from "./types";

interface UserInfo {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
  roles?: string[];
}

export function NavUserMenu({ config }: { config: NavUserMenuConfig }) {
  const rawUser = useSubscribe({ from: "global.user" });
  const user = rawUser as UserInfo | null;
  const execute = useActionExecutor();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const showAvatar = config.showAvatar !== false;
  const showName = config.showName !== false;
  const showEmail = config.showEmail ?? false;
  const mode = config.mode ?? "compact";

  // Outside click to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Filter menu items by role
  const userRoles: string[] = [];
  if (user.role) userRoles.push(user.role);
  if (user.roles) userRoles.push(...user.roles);

  const menuItems = (config.items ?? []).filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.some((r) => userRoles.includes(r));
  });

  const avatarEl = showAvatar ? (
    <span
      data-nav-avatar=""
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2rem",
        height: "2rem",
        borderRadius: "var(--sn-radius-full, 9999px)",
        background: "var(--sn-color-muted)",
        color: "var(--sn-color-muted-foreground)",
        fontSize: "var(--sn-font-size-sm, 0.875rem)",
        fontWeight: 600,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name ?? "User"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        (user.name?.charAt(0)?.toUpperCase() ?? "U")
      )}
    </span>
  ) : null;

  const triggerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--sn-spacing-sm, 0.5rem)",
    padding: "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
    border: "none",
    background: "transparent",
    color: "inherit",
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "var(--sn-font-size-sm, 0.875rem)",
    transition:
      "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
  };

  const dropdownStyle: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 4px)",
    right: "0",
    minWidth: "12rem",
    padding: "var(--sn-spacing-xs, 0.25rem)",
    background: "var(--sn-color-popover, var(--sn-color-background))",
    border: "1px solid var(--sn-color-border)",
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    boxShadow:
      "0 4px 16px -2px rgba(0,0,0,0.12), 0 2px 6px -1px rgba(0,0,0,0.07)",
    zIndex: 200,
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      data-nav-user-menu=""
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        style={triggerStyle}
      >
        {avatarEl}
        {mode === "full" && showName && user.name && (
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.name}
          </span>
        )}
      </button>
      {isOpen && (
        <div role="menu" style={dropdownStyle}>
          {/* User info header */}
          <div
            style={{
              padding:
                "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
              borderBottom:
                menuItems.length > 0
                  ? "1px solid var(--sn-color-border)"
                  : undefined,
            }}
          >
            {user.name && (
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "var(--sn-font-size-sm, 0.875rem)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.name}
              </div>
            )}
            {showEmail && user.email && (
              <div
                style={{
                  fontSize: "var(--sn-font-size-xs, 0.75rem)",
                  color: "var(--sn-color-muted-foreground)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </div>
            )}
          </div>
          {/* Menu items */}
          {menuItems.map((item, i) => (
            <button
              key={item.label ?? i}
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                void execute(item.action as Parameters<typeof execute>[0]);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--sn-spacing-sm, 0.5rem)",
                width: "100%",
                padding:
                  "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-md, 0.75rem)",
                border: "none",
                background: "transparent",
                color: "inherit",
                borderRadius: "var(--sn-radius-md, 0.375rem)",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "var(--sn-font-size-sm, 0.875rem)",
                fontFamily: "inherit",
                transition:
                  "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
              }}
            >
              {item.icon && renderIcon(item.icon, 16)}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
