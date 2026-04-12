'use client';

import React, { useCallback, useRef, useState } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { Icon } from "../../../icons/index";
import type { DropdownMenuConfig } from "./types";
import {
  FloatingPanel,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  FloatingMenuStyles,
} from "../../primitives/floating-menu";

/**
 * Style map for trigger button variants.
 */
const VARIANT_STYLES: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--sn-color-primary, #2563eb)",
    color: "var(--sn-color-primary-foreground, #fff)",
    border: "var(--sn-border-default, 1px) solid transparent",
  },
  secondary: {
    backgroundColor: "var(--sn-color-secondary, #f1f5f9)",
    color: "var(--sn-color-secondary-foreground, #0f172a)",
    border: "var(--sn-border-default, 1px) solid transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--sn-color-foreground, #111827)",
    border:
      "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--sn-color-foreground, #111827)",
    border: "var(--sn-border-default, 1px) solid transparent",
  },
};

/**
 * DropdownMenu component — a trigger button that opens a positioned dropdown
 * with items, separators, labels, and keyboard navigation.
 *
 * Uses the shared FloatingPanel primitive for positioning, animation, and
 * dismiss behavior, and MenuItem for consistent item rendering.
 *
 * @param props.config - The dropdown menu config from the manifest
 *
 * @example
 * ```json
 * {
 *   "type": "dropdown-menu",
 *   "trigger": { "label": "Actions", "variant": "outline" },
 *   "items": [
 *     { "type": "item", "label": "Edit", "action": { "type": "navigate", "to": "/edit" } },
 *     { "type": "separator" },
 *     { "type": "item", "label": "Delete", "destructive": true, "action": { "type": "api", "method": "DELETE", "endpoint": "/items/1" } }
 *   ]
 * }
 * ```
 */
export function DropdownMenu({ config }: { config: DropdownMenuConfig }) {
  const execute = useActionExecutor();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const variant = config.trigger.variant ?? "default";
  const align = config.align ?? "start";
  const side = config.side ?? "bottom";

  // Collect actionable item indices for keyboard navigation
  const actionableIndices = config.items
    .map((item, i) => (item.type === "item" && !item.disabled ? i : -1))
    .filter((i) => i !== -1);

  const open = useCallback(() => {
    setIsOpen(true);
    setFocusedIndex(-1);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  const handleItemClick = useCallback(
    (index: number) => {
      const item = config.items[index];
      if (!item || item.type !== "item" || item.disabled) return;
      void execute(item.action);
      close();
    },
    [config.items, execute, close],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
          return;
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const currentPos = actionableIndices.indexOf(focusedIndex);
        const nextPos =
          currentPos < actionableIndices.length - 1 ? currentPos + 1 : 0;
        setFocusedIndex(actionableIndices[nextPos] ?? 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const currentPos = actionableIndices.indexOf(focusedIndex);
        const prevPos =
          currentPos > 0 ? currentPos - 1 : actionableIndices.length - 1;
        setFocusedIndex(actionableIndices[prevPos] ?? 0);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleItemClick(focusedIndex);
        }
      }
    },
    [isOpen, focusedIndex, actionableIndices, open, handleItemClick],
  );

  return (
    <div
      ref={containerRef}
      data-snapshot-component="dropdown-menu"
      data-testid="dropdown-menu"
      className={config.className}
      style={{
        position: "relative",
        display: "inline-block",
        ...((config.style as React.CSSProperties) ?? {}),
      }}
    >
      <FloatingMenuStyles />
      <style>{`
        [data-snapshot-component="dropdown-menu"] > button:focus { outline: none; }
        [data-snapshot-component="dropdown-menu"] > button:hover {
          filter: brightness(0.95);
        }
        [data-snapshot-component="dropdown-menu"] > button:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
      `}</style>

      {/* Trigger button */}
      <button
        type="button"
        data-testid="dropdown-menu-trigger"
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        style={{
          ...VARIANT_STYLES[variant],
          padding: "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
          borderRadius: "var(--sn-radius-md, 0.375rem)",
          fontSize: "var(--sn-font-size-sm, 0.875rem)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--sn-spacing-xs, 0.25rem)",
          fontFamily: "inherit",
          lineHeight: "var(--sn-leading-normal, 1.5)",
        }}
      >
        {config.trigger.icon && <Icon name={config.trigger.icon} size={16} />}
        {config.trigger.label && <span>{config.trigger.label}</span>}
      </button>

      {/* Menu — positioning, animation, dismiss all handled by FloatingPanel */}
      <FloatingPanel
        open={isOpen}
        onClose={close}
        containerRef={containerRef}
        side={side}
        align={align}
        minWidth="180px"
      >
        <div onKeyDown={handleKeyDown} data-testid="dropdown-menu-content">
          {config.items.map((entry, i) => {
            if (entry.type === "separator") {
              return <MenuSeparator key={`sep-${i}`} />;
            }

            if (entry.type === "label") {
              return <MenuLabel key={`label-${i}`} text={entry.text} />;
            }

            // type === "item"
            return (
              <MenuItem
                key={`item-${i}`}
                label={entry.label}
                icon={entry.icon}
                onClick={() => handleItemClick(i)}
                disabled={entry.disabled}
                destructive={entry.destructive}
                active={focusedIndex === i}
              />
            );
          })}
        </div>
      </FloatingPanel>
    </div>
  );
}
