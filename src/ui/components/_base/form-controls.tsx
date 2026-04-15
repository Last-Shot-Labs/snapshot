'use client';

import type { CSSProperties, ReactNode } from "react";
import { ButtonControl } from "../forms/button";
import { InputControl } from "../forms/input";

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
    <ButtonControl
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={className}
      fullWidth
      style={style}
    >
      {children}
    </ButtonControl>
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
      <InputControl
        type={type as Parameters<typeof InputControl>[0]["type"]}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChangeText={onChange}
      />
    </label>
  );
}
