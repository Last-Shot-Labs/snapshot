'use client';

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { NavConfig } from "./schema";
import { useNav } from "./hook";
import { useActionExecutor } from "../../../actions/executor";
import { renderIcon } from "../../../icons/render";
import type { ResolvedNavItem, AuthUser } from "./types";
import { useManifestRuntime } from "../../../manifest/runtime";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";

/** Props for the Nav component. */
interface NavComponentProps {
  /** Nav configuration from the manifest. */
  config: NavConfig;
  /** Current URL pathname for active route detection. */
  pathname?: string;
  /** Callback when a nav item is clicked. */
  onNavigate?: (path: string) => void;
  /** Layout variant — controls horizontal (top-nav) vs vertical (sidebar) rendering. */
  variant?: "sidebar" | "top-nav";
}

/**
 * Renders a single nav item with active indicator, icon, badge, and children.
 */
function NavItem({
  item,
  onNavigate,
  isTopNav = false,
}: {
  item: ResolvedNavItem;
  onNavigate?: (path: string) => void;
  isTopNav?: boolean;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isTopNav || !dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isTopNav, dropdownOpen]);

  if (!item.isVisible) return null;

  const handleClick = () => {
    if (item.isDisabled) return;
    if (isTopNav && hasChildren) {
      setDropdownOpen((v) => !v);
      return;
    }
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  const buttonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--sn-spacing-sm, 0.5rem)",
    width: isTopNav ? undefined : "100%",
    whiteSpace: isTopNav ? "nowrap" : undefined,
    padding: isTopNav
      ? "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)"
      : "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
    border: "none",
    background: item.isActive
      ? "var(--sn-nav-active-background, var(--sn-color-accent))"
      : "transparent",
    color: item.isActive
      ? "var(--sn-nav-active-foreground, var(--sn-color-accent-foreground))"
      : "inherit",
    opacity: item.isDisabled ? 0.55 : 1,
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    boxShadow: item.isActive ? "inset 0 0 0 1px var(--sn-color-primary)" : "none",
    cursor: item.isDisabled ? "not-allowed" : "pointer",
    textAlign: "left",
    fontSize: "var(--sn-font-size-sm, 0.875rem)",
    fontFamily: "inherit",
    fontWeight: item.isActive ? 600 : 500,
    transition: "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
  };

  return (
    <li
      ref={containerRef}
      data-nav-item=""
      data-active={item.isActive ? "true" : undefined}
      style={isTopNav ? { display: "flex", position: "relative" } : undefined}
    >
      <button
        type="button"
        onClick={handleClick}
        data-nav-link=""
        aria-current={item.isActive ? "page" : undefined}
        aria-disabled={item.isDisabled || undefined}
        disabled={item.isDisabled}
        aria-expanded={isTopNav && hasChildren ? dropdownOpen : undefined}
        aria-haspopup={isTopNav && hasChildren ? "menu" : undefined}
        style={buttonStyle}
      >
        {item.icon ? <span data-nav-icon="" aria-hidden="true">{renderIcon(item.icon, 16)}</span> : null}
        <span
          data-nav-label=""
          style={{
            flex: isTopNav ? undefined : 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </span>
        {item.resolvedBadge !== null && item.resolvedBadge > 0 && (
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
              fontWeight: "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
              borderRadius: "var(--sn-radius-full, 9999px)",
              background: "var(--sn-color-primary)",
              color: "var(--sn-color-primary-foreground)",
            }}
          >
            {item.resolvedBadge}
          </span>
        )}
        {/* Caret indicator for items with children */}
        {hasChildren && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: isTopNav ? "0.125rem" : "auto",
              opacity: 0.6,
              fontSize: "0.625rem",
              transition: "transform var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
              transform: isTopNav
                ? dropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
                : "rotate(0deg)",
            }}
          >
            ▾
          </span>
        )}
      </button>

      {/* Sidebar mode: inline nested list */}
      {!isTopNav && hasChildren && (
        <ul
          data-nav-children=""
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            paddingLeft: "var(--sn-spacing-md, 0.75rem)",
          }}
        >
          {item.children!.map((child, index) => (
            <NavItem
              key={child.path ?? index}
              item={child}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}

      {/* Top-nav mode: floating dropdown */}
      {isTopNav && hasChildren && dropdownOpen && (
        <ul
          role="menu"
          data-nav-dropdown=""
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: "11rem",
            listStyle: "none",
            margin: 0,
            padding: "var(--sn-spacing-xs, 0.25rem)",
            background: "var(--sn-color-popover, var(--sn-color-background))",
            border: "1px solid var(--sn-color-border)",
            borderRadius: "var(--sn-radius-md, 0.375rem)",
            boxShadow: "0 4px 16px -2px rgba(0,0,0,0.12), 0 2px 6px -1px rgba(0,0,0,0.07)",
            zIndex: 200,
          }}
        >
          {item.children!.map((child, index) => (
            <NavItem
              key={child.path ?? index}
              item={child}
              onNavigate={(path) => {
                setDropdownOpen(false);
                onNavigate?.(path);
              }}
              isTopNav={false}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Renders a user menu section with avatar, name, and optional email.
 */
function UserMenu({
  user,
  config,
  isTopNav = false,
}: {
  user: AuthUser;
  config: NavConfig["userMenu"];
  isTopNav?: boolean;
}) {
  const execute = useActionExecutor();
  const showAvatar =
    typeof config === "object" ? (config.showAvatar ?? true) : true;
  const showEmail =
    typeof config === "object" ? (config.showEmail ?? false) : false;
  const menuItems = typeof config === "object" ? (config.items ?? []) : [];

  // In top-nav, render a compact avatar-only button (no dropdown for now)
  if (isTopNav) {
    return (
      <div
        data-nav-user-menu=""
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 var(--sn-spacing-sm, 0.5rem)",
        }}
      >
        {showAvatar && (
          <span
            data-nav-avatar=""
            title={user.name ?? undefined}
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
              fontWeight: "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
              overflow: "hidden",
              cursor: "default",
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
        )}
      </div>
    );
  }

  return (
    <div
      data-nav-user-menu=""
      style={{
        borderTop: "var(--sn-border-default, 1px) solid var(--sn-color-border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sn-spacing-sm, 0.5rem)",
          padding: "var(--sn-spacing-md, 0.75rem)",
        }}
      >
        {showAvatar && (
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
              fontWeight:
                "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
              overflow: "hidden",
            }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ?? "User"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              (user.name?.charAt(0)?.toUpperCase() ?? "U")
            )}
          </span>
        )}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          {user.name && (
            <div
              data-nav-user-name=""
              style={{
                fontSize: "var(--sn-font-size-sm, 0.875rem)",
                fontWeight:
                  "var(--sn-font-weight-medium, 500)" as CSSProperties["fontWeight"],
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
              data-nav-user-email=""
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
      </div>
      {menuItems.length > 0 && (
        <ul
          data-nav-user-items=""
          style={{
            listStyle: "none",
            margin: 0,
            padding:
              "0 var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-sm, 0.5rem)",
          }}
        >
          {menuItems.map((item, i) => (
            <li key={item.label ?? i}>
              <button
                type="button"
                data-nav-user-action=""
                onClick={() => {
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
                  transition: `background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)`,
                }}
              >
                {renderIcon(item.icon, 16)}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Nav component renders navigation items with active state detection,
 * role-based visibility, badge counts, mobile collapse, and user menu.
 *
 * Uses the `useNav` headless hook for all logic. Renders semantic HTML
 * with design token-based styling.
 *
 * @param props - Nav configuration, pathname, and navigation callback
 */
export function Nav({ config, pathname, onNavigate, variant = "sidebar" }: NavComponentProps) {
  const manifest = useManifestRuntime();
  const [currentPath, setCurrentPath] = useState(pathname ?? "/");
  const { items, isCollapsed, toggle, user } = useNav(config, currentPath);
  const effectiveLogo =
    config.logo ??
    (manifest?.app?.title
      ? {
          text: manifest.app.title,
          path: manifest.app.home ?? "/",
        }
      : undefined);
  const showUserMenu = config.userMenu !== false;

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
  const hasTemplate = Array.isArray(
    (config as Record<string, unknown>).template,
  );

  // ── Template mode: render composable component tree ──────────────────────
  if (hasTemplate) {
    const templateItems = (config as Record<string, unknown>).template as ComponentConfig[];
    return (
      <nav
        aria-label="Main navigation"
        data-snapshot-component="nav"
        data-variant={variant}
        className={config.className}
        style={{
          display: "flex",
          flexDirection: isTopNav ? "row" : "column",
          alignItems: isTopNav ? "center" : undefined,
          height: "100%",
          ...((config.style as React.CSSProperties) ?? {}),
        }}
      >
        {templateItems.map((child, i) => (
          <ComponentRenderer
            key={child.id ?? `nav-template-${i}`}
            config={child}
          />
        ))}
      </nav>
    );
  }

  // ── Legacy items mode ────────────────────────────────────────────────────
  return (
    <nav
      aria-label="Main navigation"
      data-snapshot-component="nav"
      data-variant={variant}
      className={config.className}
      data-collapsed={isCollapsed ? "true" : undefined}
      style={{
        display: "flex",
        flexDirection: isTopNav ? "row" : "column",
        alignItems: isTopNav ? "center" : undefined,
        height: isTopNav ? "100%" : "100%",
        ...((config.style as React.CSSProperties) ?? {}),
      }}
    >
      {/* Logo / Brand */}
      {effectiveLogo && (
        <div
          data-nav-logo=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sn-spacing-sm, 0.5rem)",
            padding: isTopNav
              ? "0 var(--sn-spacing-md, 0.75rem)"
              : "var(--sn-spacing-md, 0.75rem)",
            borderBottom: isTopNav
              ? undefined
              : "var(--sn-border-default, 1px) solid var(--sn-color-border)",
            borderRight: isTopNav
              ? "var(--sn-border-default, 1px) solid var(--sn-color-border)"
              : undefined,
            flexShrink: 0,
            cursor: effectiveLogo.path ? "pointer" : undefined,
          }}
          onClick={() => {
            if (effectiveLogo?.path && onNavigate) {
              onNavigate(effectiveLogo.path);
            }
          }}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" || e.key === " ") &&
              effectiveLogo?.path &&
              onNavigate
            ) {
              e.preventDefault();
              onNavigate(effectiveLogo.path);
            }
          }}
          role={effectiveLogo.path ? "link" : undefined}
          tabIndex={effectiveLogo.path ? 0 : undefined}
        >
          {effectiveLogo.src && (
            <img
              src={effectiveLogo.src}
              alt={effectiveLogo.text ?? "Logo"}
              style={{ height: "var(--sn-spacing-lg, 1.5rem)", width: "auto" }}
            />
          )}
          {effectiveLogo.text && (
            <span
              style={{
                fontSize: "var(--sn-font-size-lg, 1.125rem)",
                fontWeight:
                  "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
              }}
            >
              {effectiveLogo.text}
            </span>
          )}
        </div>
      )}

      {/* Mobile toggle button — hidden in top-nav */}
      {config.collapsible !== false && !isTopNav && (
        <button
          type="button"
          data-nav-toggle=""
          onClick={toggle}
          aria-label={isCollapsed ? "Open navigation" : "Close navigation"}
          style={{
            display: "none", // shown via media query
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--sn-spacing-sm, 0.5rem)",
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {isCollapsed ? "\u2630" : "\u2715"}
        </button>
      )}

      {/* Nav items */}
      <ul
        data-nav-items=""
        style={{
          listStyle: "none",
          margin: 0,
          padding: isTopNav ? "0 var(--sn-spacing-xs, 0.25rem)" : "var(--sn-spacing-sm, 0.5rem)",
          flex: isTopNav ? undefined : 1,
          overflow: isTopNav ? "visible" : "auto",
          display: isTopNav ? "flex" : undefined,
          flexDirection: isTopNav ? "row" : undefined,
          alignItems: isTopNav ? "center" : undefined,
          gap: isTopNav ? "var(--sn-spacing-xs, 0.25rem)" : undefined,
        }}
      >
        {items
          .filter((item) => item.isVisible)
          .map((item, index) => (
            <NavItem
              key={item.path ?? index}
              item={item}
              onNavigate={onNavigate}
              isTopNav={isTopNav}
            />
          ))}
      </ul>

      {/* User menu — pushed to end in top-nav */}
      {showUserMenu && user && (
        <div style={isTopNav ? { marginLeft: "auto", flexShrink: 0 } : undefined}>
          <UserMenu user={user} config={config.userMenu} isTopNav={isTopNav} />
        </div>
      )}

      <style>{`
        [data-snapshot-component="nav"] button[data-nav-link]:hover {
          background: var(--sn-color-accent, var(--sn-color-muted));
        }
        [data-snapshot-component="nav"] button[data-nav-link]:focus {
          outline: none;
        }
        [data-snapshot-component="nav"] button[data-nav-link]:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
        [data-snapshot-component="nav"] [data-nav-logo][role="link"]:focus {
          outline: none;
        }
        [data-snapshot-component="nav"] [data-nav-logo][role="link"]:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
        [data-snapshot-component="nav"] [data-nav-user-menu]:focus {
          outline: none;
        }
        [data-snapshot-component="nav"] [data-nav-user-menu]:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
        [data-snapshot-component="nav"] [data-nav-toggle]:focus {
          outline: none;
        }
        [data-snapshot-component="nav"] [data-nav-toggle]:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
        [data-snapshot-component="nav"] [data-nav-user-action]:hover {
          background: var(--sn-color-accent, var(--sn-color-muted));
        }
        [data-snapshot-component="nav"] [data-nav-user-action]:focus {
          outline: none;
        }
        [data-snapshot-component="nav"] [data-nav-user-action]:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
        @media (max-width: 768px) {
          [data-nav-toggle] {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
