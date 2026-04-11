'use client';

import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useActionExecutor } from "../../actions/executor";
import { Icon } from "../../icons/index";
import type { ActionConfig } from "../../actions/types";

export interface ContextMenuPortalItem {
  label: string;
  icon?: string;
  action?: ActionConfig;
  variant?: "default" | "destructive";
  separator?: boolean;
  disabled?: boolean;
}

export interface ContextMenuPortalState {
  x: number;
  y: number;
  context?: Record<string, unknown>;
}

function clampPosition(state: ContextMenuPortalState): CSSProperties {
  return {
    left: `min(${state.x}px, calc(100vw - var(--sn-spacing-xl, 2rem) - 12rem))`,
    top: `min(${state.y}px, calc(100vh - var(--sn-spacing-xl, 2rem) - 12rem))`,
  };
}

export function ContextMenuPortal({
  items,
  state,
  onClose,
}: {
  items: ContextMenuPortalItem[];
  state: ContextMenuPortalState | null;
  onClose: () => void;
}) {
  const execute = useActionExecutor();

  useEffect(() => {
    if (!state || typeof document === "undefined") {
      return;
    }

    const handlePointerDown = () => {
      onClose();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, state]);

  if (!state) {
    return null;
  }

  return (
    <div
      role="menu"
      style={{
        position: "fixed",
        zIndex: "var(--sn-z-index-popover, 50)" as unknown as number,
        minWidth: "12rem",
        display: "grid",
        gap: "var(--sn-spacing-2xs, 0.125rem)",
        padding: "var(--sn-spacing-2xs, 0.125rem)",
        background: "var(--sn-color-popover, #fff)",
        color: "var(--sn-color-popover-foreground, #111)",
        border: "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
        borderRadius: "var(--sn-radius-md, 0.5rem)",
        boxShadow: "var(--sn-shadow-xl, 0 25px 50px -12px rgba(0,0,0,0.25))",
        ...clampPosition(state),
      }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div
            key={`separator-${index}`}
            role="separator"
            style={{
              height: "1px",
              margin: "var(--sn-spacing-2xs, 0.125rem) 0",
              background: "var(--sn-color-border, #e5e7eb)",
            }}
          />
        ) : (
          <button
            key={`item-${index}`}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => {
              onClose();
              if (item.action) {
                void execute(item.action, state.context);
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sn-spacing-sm, 0.5rem)",
              width: "100%",
              padding:
                "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
              border: "none",
              borderRadius: "var(--sn-radius-sm, 0.25rem)",
              background: "transparent",
              color:
                item.variant === "destructive"
                  ? "var(--sn-color-destructive, #ef4444)"
                  : "inherit",
              opacity: item.disabled ? "var(--sn-opacity-disabled, 0.5)" : 1,
              cursor: item.disabled ? "not-allowed" : "pointer",
              textAlign: "left",
            }}
          >
            {item.icon ? <Icon name={item.icon} size={14} /> : null}
            <span>{item.label}</span>
          </button>
        ),
      )}
    </div>
  );
}
