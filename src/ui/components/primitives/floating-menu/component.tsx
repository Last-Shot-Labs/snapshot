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
import {
  resolveSurfacePresentation,
  type RuntimeSurfaceState,
} from "../../_base/style-surfaces";

const ANIMATION_DURATION = 150;

type SurfaceConfig = Record<string, unknown>;

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

function resolveSlotSurface(params: {
  surfaceId?: string;
  implementationBase?: Record<string, unknown>;
  componentSurface?: Record<string, unknown>;
  itemSurface?: Record<string, unknown>;
  activeStates?: RuntimeSurfaceState[];
}) {
  return resolveSurfacePresentation(params);
}

export interface FloatingPanelProps {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  side?: "top" | "bottom";
  align?: "start" | "center" | "end";
  animate?: boolean;
  minWidth?: string;
  role?: string;
  dataAttributes?: Record<string, string>;
  style?: CSSProperties;
  className?: string;
  surfaceId?: string;
  slot?: SurfaceConfig;
  activeStates?: RuntimeSurfaceState[];
  testId?: string;
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
  surfaceId,
  slot,
  activeStates,
  testId,
  children,
}: FloatingPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stableClose = useCallback(() => onClose(), [onClose]);

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
  }, [enableAnimation, mounted, open]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handler = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        stableClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [containerRef, open, stableClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        stableClose();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, stableClose]);

  if (!mounted) {
    return null;
  }

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

  const panelSurface = resolveSlotSurface({
    surfaceId,
    implementationBase: {
      position: "absolute",
      zIndex: "var(--sn-z-index-dropdown, 50)",
      minWidth,
      listStyle: "none",
      margin: 0,
    },
    componentSurface: slot,
    activeStates: open ? ["open", ...(activeStates ?? [])] : activeStates,
  });

  return (
    <>
      <div
        role={role}
        className={[className, panelSurface.className].filter(Boolean).join(" ")}
        data-floating-panel=""
        data-snapshot-id={surfaceId}
        data-testid={testId}
        {...(dataAttributes ?? {})}
        style={{
          ...alignStyle,
          ...sideStyle,
          ...animationStyle,
          ...(panelSurface.style ?? {}),
          ...(style ?? {}),
        }}
      >
        {children}
      </div>
      <SurfaceStyles css={panelSurface.scopedCss} />
    </>
  );
}

export interface MenuItemProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  role?: string;
  active?: boolean;
  current?: boolean;
  selected?: boolean;
  style?: CSSProperties;
  className?: string;
  surfaceId?: string;
  slot?: SurfaceConfig;
  labelSlot?: SurfaceConfig;
  iconSlot?: SurfaceConfig;
}

export function MenuItem({
  label,
  icon,
  onClick,
  disabled = false,
  destructive = false,
  role = "menuitem",
  active = false,
  current = false,
  selected = false,
  style,
  className,
  surfaceId,
  slot,
  labelSlot,
  iconSlot,
}: MenuItemProps) {
  const activeStates: RuntimeSurfaceState[] = [];
  if (selected) {
    activeStates.push("selected");
  }
  if (current) {
    activeStates.push("current");
  }
  if (active) {
    activeStates.push("active");
  }
  if (disabled) {
    activeStates.push("disabled");
  }

  const itemSurface = resolveSlotSurface({
    surfaceId,
    implementationBase: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sn-spacing-sm, 0.5rem)",
      width: "100%",
      border: "none",
      background: "transparent",
      textAlign: "left",
      fontFamily: "inherit",
      appearance: "none",
    },
    componentSurface: slot,
    activeStates,
  });
  const labelSurface = resolveSlotSurface({
    surfaceId: surfaceId ? `${surfaceId}-label` : undefined,
    implementationBase: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    componentSurface: labelSlot,
  });
  const iconSurface = resolveSlotSurface({
    surfaceId: surfaceId ? `${surfaceId}-icon` : undefined,
    implementationBase: {
      display: "inline-flex",
      flexShrink: 0,
    },
    componentSurface: iconSlot,
  });

  const itemClassName = [className, itemSurface.className].filter(Boolean).join(" ");

  return (
    <>
      <button
        type="button"
        role={role}
        data-menu-item=""
        data-snapshot-id={surfaceId}
        data-active={active ? "true" : undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        className={itemClassName || undefined}
        style={{
          ...(itemSurface.style ?? {}),
          ...(style ?? {}),
          ...(destructive
            ? { color: "var(--sn-color-destructive, #dc2626)" }
            : undefined),
        }}
      >
        {icon ? (
          <span
            data-menu-item-icon=""
            data-snapshot-id={surfaceId ? `${surfaceId}-icon` : undefined}
            className={iconSurface.className}
            style={iconSurface.style}
          >
            {renderIcon(icon, 16)}
          </span>
        ) : null}
        <span
          data-menu-item-label=""
          data-snapshot-id={surfaceId ? `${surfaceId}-label` : undefined}
          className={labelSurface.className}
          style={labelSurface.style}
        >
          {label}
        </span>
      </button>
      <SurfaceStyles css={itemSurface.scopedCss} />
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={iconSurface.scopedCss} />
    </>
  );
}

export function MenuSeparator({
  surfaceId,
  slot,
}: {
  surfaceId?: string;
  slot?: SurfaceConfig;
}) {
  const separatorSurface = resolveSlotSurface({
    surfaceId,
    implementationBase: {
      height: "1px",
      backgroundColor: "var(--sn-color-border, #e5e7eb)",
      margin: "var(--sn-spacing-xs, 0.25rem) 0",
    },
    componentSurface: slot,
  });

  return (
    <>
      <div
        role="separator"
        data-menu-separator=""
        data-snapshot-id={surfaceId}
        className={separatorSurface.className}
        style={separatorSurface.style}
      />
      <SurfaceStyles css={separatorSurface.scopedCss} />
    </>
  );
}

export function MenuLabel({
  text,
  surfaceId,
  slot,
}: {
  text: string;
  surfaceId?: string;
  slot?: SurfaceConfig;
}) {
  const labelSurface = resolveSlotSurface({
    surfaceId,
    implementationBase: {
      fontWeight: 600,
      userSelect: "none",
    },
    componentSurface: slot,
  });

  return (
    <>
      <div
        data-menu-label=""
        data-snapshot-id={surfaceId}
        className={labelSurface.className}
        style={labelSurface.style}
      >
        {text}
      </div>
      <SurfaceStyles css={labelSurface.scopedCss} />
    </>
  );
}

export function FloatingMenuStyles() {
  return (
    <style>{`
      [data-floating-panel] [data-menu-item]:focus { outline: none; }
      [data-floating-panel] [data-menu-item]:focus-visible {
        outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
        outline-offset: -2px;
      }
    `}</style>
  );
}
