"use client";

import type { CSSProperties } from "react";
import { useSubscribe } from "../../../context/index";
import { useActionExecutor } from "../../../actions/executor";
import { renderIcon } from "../../../icons/render";
import type { IconButtonConfig } from "./types";

const SIZE_MAP: Record<string, string> = {
  xs: "1.5rem",
  sm: "2rem",
  md: "2.5rem",
  lg: "3rem",
};

const ICON_SIZE_MAP: Record<string, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
};

const VARIANT_STYLES: Record<string, CSSProperties> = {
  default: {
    background: "var(--sn-color-primary)",
    color: "var(--sn-color-primary-foreground)",
    border: "none",
  },
  secondary: {
    background: "var(--sn-color-secondary)",
    color: "var(--sn-color-secondary-foreground)",
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "inherit",
    border: "1px solid var(--sn-color-border)",
  },
  ghost: {
    background: "transparent",
    color: "inherit",
    border: "none",
  },
  destructive: {
    background: "var(--sn-color-destructive)",
    color: "var(--sn-color-destructive-foreground)",
    border: "none",
  },
};

export function IconButton({ config }: { config: IconButtonConfig }) {
  const execute = useActionExecutor();
  const resolvedDisabled = useSubscribe(
    typeof config.disabled === "object" && "from" in config.disabled
      ? config.disabled
      : undefined,
  );
  const isDisabled =
    typeof config.disabled === "boolean"
      ? config.disabled
      : typeof resolvedDisabled === "boolean"
        ? resolvedDisabled
        : false;

  const size = config.size ?? "md";
  const variant = config.variant ?? "ghost";
  const shape = config.shape ?? "circle";
  const dim = SIZE_MAP[size] ?? SIZE_MAP.md;
  const iconSize = ICON_SIZE_MAP[size] ?? ICON_SIZE_MAP.md;

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: dim,
    height: dim,
    borderRadius:
      shape === "circle"
        ? "var(--sn-radius-full, 9999px)"
        : "var(--sn-radius-md, 0.375rem)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.5 : 1,
    fontFamily: "inherit",
    transition:
      "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
    ...(VARIANT_STYLES[variant] ?? VARIANT_STYLES.ghost),
  };

  return (
    <button
      type="button"
      aria-label={config.ariaLabel}
      title={config.tooltip ?? config.ariaLabel}
      disabled={isDisabled}
      onClick={() => {
        if (config.action) {
          void execute(config.action as Parameters<typeof execute>[0]);
        }
      }}
      style={style}
    >
      {renderIcon(config.icon, iconSize)}
    </button>
  );
}
