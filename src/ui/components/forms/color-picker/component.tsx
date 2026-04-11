'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { usePublish, useSubscribe } from "../../../context/hooks";
import type { ColorPickerConfig } from "./types";

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const safeHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => `${value}${value}`)
          .join("")
      : normalized.padEnd(6, "0").slice(0, 6);
  return [
    Number.parseInt(safeHex.slice(0, 2), 16),
    Number.parseInt(safeHex.slice(2, 4), 16),
    Number.parseInt(safeHex.slice(4, 6), 16),
  ];
}

function rgbToHsl([red, green, blue]: [number, number, number]): [number, number, number] {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return [0, 0, Math.round(lightness * 100)];
  }

  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  switch (max) {
    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      hue = (b - r) / delta + 2;
      break;
    default:
      hue = (r - g) / delta + 4;
      break;
  }

  return [
    Math.round((hue / 6) * 360),
    Math.round(saturation * 100),
    Math.round(lightness * 100),
  ];
}

function formatColorValue(color: string, format: ColorPickerConfig["format"], alpha: number) {
  if (format === "hex") {
    return color;
  }
  const rgb = hexToRgb(color);
  if (format === "rgb") {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(2)})`;
  }
  const hsl = rgbToHsl(rgb);
  return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${alpha.toFixed(2)})`;
}

export function ColorPicker({ config }: { config: ColorPickerConfig }) {
  const execute = useActionExecutor();
  const publish = usePublish(config.id);
  const visible = useSubscribe(config.visible ?? true);
  const [color, setColor] = useState(config.defaultValue ?? "#2563eb");
  const [alpha, setAlpha] = useState(1);
  const displayValue = useMemo(
    () => formatColorValue(color, config.format, config.showAlpha ? alpha : 1),
    [alpha, color, config.format, config.showAlpha],
  );

  useEffect(() => {
    if (!publish) {
      return;
    }
    publish(displayValue);
  }, [displayValue, publish]);

  if (visible === false) {
    return null;
  }

  const triggerChange = (nextColor: string, nextAlpha: number) => {
    if (config.onChange) {
      void execute(config.onChange, {
        value: formatColorValue(nextColor, config.format, config.showAlpha ? nextAlpha : 1),
      });
    }
  };

  return (
    <div
      data-snapshot-component="color-picker"
      className={config.className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        ...(config.style as React.CSSProperties),
      }}
    >
      {config.label ? (
        <label
          style={{
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            fontWeight: "var(--sn-font-weight-medium, 500)",
            color: "var(--sn-color-foreground, #111827)",
          }}
        >
          {config.label}
        </label>
      ) : null}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sn-spacing-sm, 0.5rem)",
        }}
      >
        <input
          type="color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
            triggerChange(event.target.value, alpha);
          }}
          style={{
            width: "3rem",
            height: "3rem",
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
          }}
        />
        {config.allowCustom ? (
          <input
            type="text"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
              triggerChange(event.target.value, alpha);
            }}
            style={{
              flex: 1,
              padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
              borderRadius: "var(--sn-radius-md, 0.375rem)",
              border:
                "var(--sn-border-default, 1px) solid var(--sn-color-border, #d1d5db)",
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              boxSizing: "border-box",
            }}
          />
        ) : null}
      </div>

      {config.showAlpha ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sn-spacing-xs, 0.25rem)",
          }}
        >
          <span
            style={{
              fontSize: "var(--sn-font-size-xs, 0.75rem)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
            }}
          >
            Alpha {Math.round(alpha * 100)}%
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(alpha * 100)}
            onChange={(event) => {
              const nextAlpha = Number(event.target.value) / 100;
              setAlpha(nextAlpha);
              triggerChange(color, nextAlpha);
            }}
          />
        </div>
      ) : null}

      {config.swatches && config.swatches.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(2rem, 1fr))",
            gap: "var(--sn-spacing-xs, 0.25rem)",
          }}
        >
          {config.swatches.map((swatch) => (
            <button
              key={swatch}
              type="button"
              onClick={() => {
                setColor(swatch);
                triggerChange(swatch, alpha);
              }}
              aria-label={swatch}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "var(--sn-radius-sm, 0.25rem)",
                border:
                  "var(--sn-border-default, 1px) solid var(--sn-color-border, #d1d5db)",
                backgroundColor: swatch,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      ) : null}

      <span
        style={{
          fontSize: "var(--sn-font-size-xs, 0.75rem)",
          color: "var(--sn-color-muted-foreground, #6b7280)",
        }}
      >
        {displayValue}
      </span>
    </div>
  );
}
