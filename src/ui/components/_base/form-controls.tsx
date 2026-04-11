'use client';

import type { CSSProperties, ReactNode } from "react";
import { getButtonStyle } from "./button-styles";

export interface BaseButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function BaseButton({
  children,
  type = "button",
  variant = "default",
  size = "md",
  disabled,
  onClick,
  className,
  style,
}: BaseButtonProps) {
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

export interface BaseTextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  style?: CSSProperties;
}

export function BaseTextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  className,
  style,
}: BaseTextFieldProps) {
  return (
    <label
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sn-spacing-2xs, 0.375rem)",
        marginBottom: "var(--sn-spacing-sm, 0.875rem)",
        ...style,
      }}
    >
      <span
        style={{
          fontSize: "var(--sn-font-size-sm, 0.925rem)",
          fontWeight: "var(--sn-font-weight-semibold, 600)",
          color: "var(--sn-color-foreground, #0f172a)",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.currentTarget.value)}
        style={{
          width: "100%",
          appearance: "none",
          backgroundColor: "var(--sn-color-background, #fff)",
          color: "var(--sn-color-foreground, #0f172a)",
          border:
            "var(--sn-border-default, 1px) solid var(--sn-color-input, var(--sn-color-border, rgba(15,23,42,0.14)))",
          borderRadius: "var(--sn-radius-lg, 0.75rem)",
          padding:
            "var(--sn-spacing-sm, 0.75rem) var(--sn-spacing-md, 0.875rem)",
          boxShadow: "inset 0 1px 2px rgba(15,23,42,0.04)",
          fontSize: "var(--sn-font-size-md, 1rem)",
          lineHeight: "var(--sn-leading-normal, 1.5)",
          fontFamily:
            "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      />
    </label>
  );
}
