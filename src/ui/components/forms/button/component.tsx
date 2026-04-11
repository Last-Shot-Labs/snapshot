'use client';

import type { CSSProperties, ReactNode } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { useSubscribe } from "../../../context/hooks";
import { BUTTON_INTERACTIVE_CSS, getButtonStyle } from "../../_base/button-styles";
import type { ButtonConfig } from "../../../manifest/types";

/**
 * Config-driven button primitive.
 *
 * This is the shared button component used by manifest pages and by higher-level
 * screens that need the same visual language without re-implementing button CSS.
 */
export interface ButtonControlProps {
  children: ReactNode;
  type?: "button" | "submit";
  variant?: ButtonConfig["variant"];
  size?: ButtonConfig["size"];
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function ButtonControl({
  children,
  type = "button",
  variant = "default",
  size = "md",
  disabled,
  onClick,
  className,
  style,
}: ButtonControlProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-sn-button=""
      data-variant={variant}
      className={className}
      style={{
        ...getButtonStyle(variant, size, disabled),
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: size === "lg" ? "3.25rem" : "2.875rem",
        appearance: "none",
        fontFamily:
          "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        opacity: 1,
        textAlign: "center",
        boxShadow: disabled
          ? "inset 0 1px 0 rgba(255,255,255,0.35)"
          : "0 1px 2px rgba(15,23,42,0.08)",
        filter: disabled ? "saturate(0.55) brightness(0.97)" : undefined,
        backgroundColor:
          disabled && variant === "default"
            ? "color-mix(in oklch, var(--sn-color-primary, #2563eb) 28%, var(--sn-color-background, #fff))"
            : disabled && variant === "secondary"
              ? "color-mix(in oklch, var(--sn-color-secondary, #f1f5f9) 72%, var(--sn-color-background, #fff))"
              : disabled && variant === "outline"
                ? "color-mix(in oklch, var(--sn-color-background, #fff) 96%, var(--sn-color-border, #e5e7eb))"
                : undefined,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function Button({ config }: { config: ButtonConfig }) {
  const execute = useActionExecutor();
  const visible = useSubscribe(config.visible ?? true);
  const disabled = useSubscribe(config.disabled ?? false) as boolean;

  if (visible === false) {
    return null;
  }

  const variant = config.variant ?? "default";
  const size = config.size ?? "md";
  const action = config.action;

  return (
    <div
      data-snapshot-component="button"
      className={config.className}
      style={config.style as CSSProperties}
    >
      <ButtonControl
        type="button"
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={() => {
          if (disabled || !action) {
            return;
          }
          void execute(action as Parameters<typeof execute>[0]);
        }}
      >
        {config.label}
      </ButtonControl>
      <style>{BUTTON_INTERACTIVE_CSS}</style>
    </div>
  );
}
