'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { renderIcon } from "../../../icons/render";

const ANIMATION_DURATION = 150;

// ── FloatingPanel ──────────────────────────────────────────────────────────

export interface FloatingPanelProps {
  /** Whether the panel is visible. */
  open: boolean;
  /** Called when the panel should close (click-outside, escape). */
  onClose: () => void;
  /**
   * Ref to the wrapper element that contains both the trigger and this panel.
   * Clicks inside this element will NOT close the panel.
   */
  containerRef: RefObject<HTMLElement | null>;
  /** Which side of the trigger to appear on. Default: "bottom". */
  side?: "top" | "bottom";
  /** Horizontal alignment. Default: "start". */
  align?: "start" | "center" | "end";
  /** Enable fade + scale animation. Default: true. */
  animate?: boolean;
  /** Minimum width. Default: "11rem". */
  minWidth?: string;
  /** ARIA role. Default: "menu". */
  role?: string;
  /** Extra data-attributes on the floating element. */
  dataAttributes?: Record<string, string>;
  /** Override styles. */
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

export function FloatingPanel({
  open,
  onClose,
  containerRef,
  side = "bottom",
  align = "start",
  animate: enableAnimation = true,
  minWidth = "11rem",
  role = "menu",
  dataAttributes,
  style,
  className,
  children,
}: FloatingPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stableClose = useCallback(() => onClose(), [onClose]);

  // ── Mount / animate lifecycle ────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setMounted(true);
      if (enableAnimation) {
        openTimerRef.current = setTimeout(() => {
          setAnimating(true);
          openTimerRef.current = null;
        }, 10);
      } else {
        setAnimating(true);
      }
    } else {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      setAnimating(false);
      if (enableAnimation && mounted) {
        closeTimerRef.current = setTimeout(() => {
          setMounted(false);
          closeTimerRef.current = null;
        }, ANIMATION_DURATION);
      } else {
        setMounted(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, enableAnimation]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // ── Click outside ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        stableClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, stableClose, containerRef]);

  // ── Escape key ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        stableClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, stableClose]);

  if (!mounted) return null;

  // ── Positioning ──────────────────────────────────────────────────────────
  const alignStyle: CSSProperties =
    align === "end"
      ? { right: 0 }
      : align === "center"
        ? { left: "50%" }
        : { left: 0 };

  const sideStyle: CSSProperties =
    side === "top"
      ? { bottom: "100%", marginBottom: "var(--sn-spacing-xs, 0.25rem)" }
      : { top: "100%", marginTop: "var(--sn-spacing-xs, 0.25rem)" };

  const centerTranslate = align === "center" ? "translateX(-50%) " : "";
  const animationStyle: CSSProperties = enableAnimation
    ? {
        opacity: animating ? 1 : 0,
        transform: `${centerTranslate}${animating ? "scale(1)" : "scale(0.95)"}`,
        transformOrigin: side === "top" ? "bottom" : "top",
        transition: `opacity var(--sn-duration-fast, ${ANIMATION_DURATION}ms) var(--sn-ease-default, ease), transform var(--sn-duration-fast, ${ANIMATION_DURATION}ms) var(--sn-ease-default, ease)`,
      }
    : align === "center"
      ? { transform: "translateX(-50%)" }
      : {};

  return (
    <div
      role={role}
      className={className}
      data-floating-panel=""
      {...(dataAttributes ?? {})}
      style={{
        position: "absolute",
        ...alignStyle,
        ...sideStyle,
        ...animationStyle,
        zIndex: "var(--sn-z-index-dropdown, 50)" as unknown as number,
        minWidth,
        backgroundColor:
          "var(--sn-color-popover, var(--sn-color-card, #ffffff))",
        border:
          "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
        borderRadius: "var(--sn-radius-md, 0.375rem)",
        boxShadow:
          "var(--sn-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1))",
        padding: "var(--sn-spacing-xs, 0.25rem)",
        listStyle: "none",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── MenuItem ───────────────────────────────────────────────────────────────

export interface MenuItemProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  /** ARIA role. Default: "menuitem". */
  role?: string;
  /** Whether this item is currently active/selected. */
  active?: boolean;
  style?: CSSProperties;
}

export function MenuItem({
  label,
  icon,
  onClick,
  disabled = false,
  destructive = false,
  role = "menuitem",
  active = false,
  style,
}: MenuItemProps) {
  return (
    <button
      type="button"
      role={role}
      data-menu-item=""
      data-active={active ? "true" : undefined}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        width: "100%",
        padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
        border: "none",
        background: active
          ? "var(--sn-color-accent, var(--sn-color-muted, #f3f4f6))"
          : undefined,
        color: destructive
          ? "var(--sn-color-destructive, #dc2626)"
          : "inherit",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : undefined,
        borderRadius: "var(--sn-radius-sm, 0.25rem)",
        fontSize: "var(--sn-font-size-sm, 0.875rem)",
        fontFamily: "inherit",
        fontWeight: active ? 600 : 500,
        textAlign: "left",
        transition:
          "background-color var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
        ...style,
      }}
    >
      {icon ? (
        <span
          aria-hidden="true"
          style={{ display: "inline-flex", flexShrink: 0 }}
        >
          {renderIcon(icon, 16)}
        </span>
      ) : null}
      <span
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ── MenuSeparator ──────────────────────────────────────────────────────────

export function MenuSeparator() {
  return (
    <div
      role="separator"
      data-menu-separator=""
      style={{
        height: "1px",
        backgroundColor: "var(--sn-color-border, #e5e7eb)",
        margin: "var(--sn-spacing-xs, 0.25rem) 0",
      }}
    />
  );
}

// ── MenuLabel ──────────────────────────────────────────────────────────────

export function MenuLabel({ text }: { text: string }) {
  return (
    <div
      data-menu-label=""
      style={{
        fontSize: "var(--sn-font-size-xs, 0.75rem)",
        fontWeight: 600,
        color: "var(--sn-color-muted-foreground, #6b7280)",
        padding:
          "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-md, 0.75rem)",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────────────────

/**
 * Inject once into the page. Handles hover/focus for all floating menu items.
 * Call this from any component that uses FloatingPanel + MenuItem.
 */
export function FloatingMenuStyles() {
  return (
    <style>{`
      [data-floating-panel] [data-menu-item]:hover:not(:disabled) {
        background-color: var(--sn-color-accent, var(--sn-color-muted, #f3f4f6));
      }
      [data-floating-panel] [data-menu-item]:focus { outline: none; }
      [data-floating-panel] [data-menu-item]:focus-visible {
        outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
        outline-offset: -2px;
      }
    `}</style>
  );
}
