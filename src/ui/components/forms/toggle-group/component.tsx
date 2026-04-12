"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { useSubscribe, usePublish } from "../../../context/index";
import { useActionExecutor } from "../../../actions/executor";
import { renderIcon } from "../../../icons/render";
import type { ToggleGroupConfig } from "./types";

const SIZE_MAP: Record<
  string,
  { height: string; fontSize: string; padding: string; iconSize: number }
> = {
  sm: {
    height: "2rem",
    fontSize: "var(--sn-font-size-xs, 0.75rem)",
    padding: "0 var(--sn-spacing-sm, 0.5rem)",
    iconSize: 14,
  },
  md: {
    height: "2.5rem",
    fontSize: "var(--sn-font-size-sm, 0.875rem)",
    padding: "0 var(--sn-spacing-md, 0.75rem)",
    iconSize: 16,
  },
  lg: {
    height: "3rem",
    fontSize: "var(--sn-font-size-base, 1rem)",
    padding: "0 var(--sn-spacing-lg, 1rem)",
    iconSize: 18,
  },
};

export function ToggleGroup({ config }: { config: ToggleGroupConfig }) {
  const execute = useActionExecutor();
  const controlledValue = useSubscribe(
    config.value != null &&
      typeof config.value === "object" &&
      "from" in config.value
      ? config.value
      : undefined,
  );

  const initialValue =
    config.defaultValue ?? (config.mode === "multiple" ? [] : "");
  const [internalValue, setInternalValue] = useState<string | string[]>(
    initialValue,
  );
  const publish = usePublish(config.publishTo);

  const currentValue: string | string[] =
    controlledValue !== undefined
      ? (controlledValue as string | string[])
      : internalValue;

  const isSelected = (value: string): boolean => {
    if (Array.isArray(currentValue)) return currentValue.includes(value);
    return currentValue === value;
  };

  const handleToggle = (value: string) => {
    let next: string | string[];
    if (config.mode === "multiple") {
      const arr = Array.isArray(currentValue) ? currentValue : [];
      next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
    } else {
      next = currentValue === value ? "" : value;
    }
    setInternalValue(next);
    if (config.publishTo) publish(next);
    if (config.onChange) {
      void execute(config.onChange as Parameters<typeof execute>[0]);
    }
  };

  const size = config.size ?? "md";
  const variant = config.variant ?? "outline";
  const sizeConfig = SIZE_MAP[size] ?? SIZE_MAP["md"]!;

  return (
    <div
      role="group"
      style={{
        display: "inline-flex",
        borderRadius: "var(--sn-radius-md, 0.375rem)",
        border:
          variant === "outline"
            ? "1px solid var(--sn-color-border)"
            : undefined,
        overflow: "hidden",
      }}
    >
      {config.items.map((item, i) => {
        const selected = isSelected(item.value);
        const itemDisabled =
          typeof item.disabled === "boolean" ? item.disabled : false;

        const itemStyle: CSSProperties = {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--sn-spacing-xs, 0.25rem)",
          height: sizeConfig.height,
          padding: sizeConfig.padding,
          fontSize: sizeConfig.fontSize,
          fontFamily: "inherit",
          fontWeight: selected ? 600 : 400,
          background: selected ? "var(--sn-color-accent)" : "transparent",
          color: selected ? "var(--sn-color-accent-foreground)" : "inherit",
          border: "none",
          borderRight:
            variant === "outline" && i < config.items.length - 1
              ? "1px solid var(--sn-color-border)"
              : undefined,
          cursor: itemDisabled ? "not-allowed" : "pointer",
          opacity: itemDisabled ? 0.5 : 1,
          transition:
            "background var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
        };

        return (
          <button
            key={item.value}
            type="button"
            role={config.mode === "multiple" ? "checkbox" : "radio"}
            aria-checked={selected}
            aria-label={item.label ?? item.value}
            disabled={itemDisabled}
            onClick={() => handleToggle(item.value)}
            style={itemStyle}
          >
            {item.icon && renderIcon(item.icon, sizeConfig.iconSize)}
            {item.label && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
