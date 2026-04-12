"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import { useSubscribe } from "../../../context/index";
import { renderIcon } from "../../../icons/render";
import type { NavDropdownConfig } from "./types";

export function NavDropdown({ config }: { config: NavDropdownConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const align = config.align ?? "start";

  const triggerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--sn-spacing-xs, 0.25rem)",
    padding: "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
    border: "none",
    background: "transparent",
    color: "inherit",
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    cursor: "pointer",
    fontSize: "var(--sn-font-size-sm, 0.875rem)",
    fontFamily: "inherit",
    fontWeight: 500,
    whiteSpace: "nowrap",
    transition:
      "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
  };

  const panelStyle: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: align === "end" ? undefined : "0",
    right: align === "end" ? "0" : undefined,
    minWidth: config.width ?? "11rem",
    listStyle: "none",
    margin: 0,
    padding: "var(--sn-spacing-xs, 0.25rem)",
    background: "var(--sn-color-popover, var(--sn-color-background))",
    border: "1px solid var(--sn-color-border)",
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    boxShadow:
      "0 4px 16px -2px rgba(0,0,0,0.12), 0 2px 6px -1px rgba(0,0,0,0.07)",
    zIndex: 200,
  };

  const handleTriggerClick = () => setIsOpen((v) => !v);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "flex" }}
      onPointerEnter={
        config.trigger === "hover" ? () => setIsOpen(true) : undefined
      }
      onPointerLeave={
        config.trigger === "hover" ? () => setIsOpen(false) : undefined
      }
    >
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        style={triggerStyle}
      >
        {config.icon && (
          <span aria-hidden="true">{renderIcon(config.icon, 16)}</span>
        )}
        <span>{config.label}</span>
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            opacity: 0.6,
            fontSize: "0.625rem",
            transition: "transform var(--sn-duration-fast, 150ms)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <div role="menu" style={panelStyle}>
          {config.items.map((item, i) => (
            <div
              key={(item as { id?: string }).id ?? i}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsOpen(false);
              }}
            >
              <ComponentRenderer config={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
