"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { NavSectionConfig } from "./types";

export function NavSection({ config }: { config: NavSectionConfig }) {
  const [isCollapsed, setIsCollapsed] = useState(
    config.defaultCollapsed ?? false,
  );
  const showItems = !config.collapsible || !isCollapsed;

  return (
    <div data-nav-section="">
      {config.label && (
        <div
          data-nav-section-label=""
          onClick={
            config.collapsible ? () => setIsCollapsed((v) => !v) : undefined
          }
          onKeyDown={
            config.collapsible
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsCollapsed((v) => !v);
                  }
                }
              : undefined
          }
          role={config.collapsible ? "button" : undefined}
          tabIndex={config.collapsible ? 0 : undefined}
          aria-expanded={config.collapsible ? !isCollapsed : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding:
              "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
            color: "var(--sn-color-muted-foreground)",
            cursor: config.collapsible ? "pointer" : undefined,
            userSelect: "none",
          }}
        >
          <span>{config.label}</span>
          {config.collapsible && (
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                opacity: 0.6,
                fontSize: "0.625rem",
                transition: "transform var(--sn-duration-fast, 150ms)",
                transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
              }}
            >
              ▾
            </span>
          )}
        </div>
      )}
      {showItems && (
        <div
          data-nav-section-items=""
          style={{ display: "flex", flexDirection: "column" }}
        >
          {config.items.map((item, i) => (
            <ComponentRenderer
              key={(item as { id?: string }).id ?? i}
              config={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
