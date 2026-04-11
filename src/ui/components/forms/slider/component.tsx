'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { usePublish, useSubscribe } from "../../../context/hooks";
import type { SliderConfig } from "./types";

function formatSliderValue(value: number | [number, number], suffix?: string): string {
  if (Array.isArray(value)) {
    return `${value[0]}${suffix ?? ""} - ${value[1]}${suffix ?? ""}`;
  }
  return `${value}${suffix ?? ""}`;
}

export function Slider({ config }: { config: SliderConfig }) {
  const execute = useActionExecutor();
  const publish = usePublish(config.id);
  const visible = useSubscribe(config.visible ?? true);
  const disabled = Boolean(useSubscribe(config.disabled ?? false));
  const initialValue = useMemo(() => {
    if (config.range) {
      return Array.isArray(config.defaultValue)
        ? config.defaultValue
        : ([config.min, config.max] as [number, number]);
    }
    return typeof config.defaultValue === "number" ? config.defaultValue : config.min;
  }, [config.defaultValue, config.max, config.min, config.range]);
  const [singleValue, setSingleValue] = useState(
    Array.isArray(initialValue) ? initialValue[0] : initialValue,
  );
  const [rangeValue, setRangeValue] = useState<[number, number]>(
    Array.isArray(initialValue) ? initialValue : [config.min, config.max],
  );

  useEffect(() => {
    if (!publish) {
      return;
    }
    publish(config.range ? rangeValue : singleValue);
  }, [config.range, publish, rangeValue, singleValue]);

  if (visible === false) {
    return null;
  }

  const currentValue = config.range ? rangeValue : singleValue;
  const trackStart = ((rangeValue[0] - config.min) / (config.max - config.min)) * 100;
  const trackEnd = ((rangeValue[1] - config.min) / (config.max - config.min)) * 100;

  const triggerChange = (value: number | [number, number]) => {
    if (config.onChange) {
      void execute(config.onChange, { value });
    }
  };

  return (
    <div
      data-snapshot-component="slider"
      className={config.className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        ...(config.style as React.CSSProperties),
      }}
    >
      {config.label ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "var(--sn-spacing-sm, 0.5rem)",
            alignItems: "center",
          }}
        >
          <label
            style={{
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              fontWeight: "var(--sn-font-weight-medium, 500)",
              color: "var(--sn-color-foreground, #111827)",
            }}
          >
            {config.label}
          </label>
          {config.showValue ? (
            <span
              style={{
                fontSize: "var(--sn-font-size-xs, 0.75rem)",
                color: "var(--sn-color-muted-foreground, #6b7280)",
              }}
            >
              {formatSliderValue(currentValue, config.suffix)}
            </span>
          ) : null}
        </div>
      ) : null}

      <div style={{ position: "relative", padding: "var(--sn-spacing-sm, 0.5rem) 0" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "0.375rem",
            transform: "translateY(-50%)",
            borderRadius: "var(--sn-radius-full, 9999px)",
            backgroundColor: "var(--sn-color-muted, #e5e7eb)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            height: "0.375rem",
            transform: "translateY(-50%)",
            borderRadius: "var(--sn-radius-full, 9999px)",
            backgroundColor: "var(--sn-color-primary, #2563eb)",
            left: config.range ? `${trackStart}%` : "0%",
            width: config.range ? `${trackEnd - trackStart}%` : `${((singleValue - config.min) / (config.max - config.min)) * 100}%`,
          }}
        />
        {config.range ? (
          <>
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={rangeValue[0]}
              disabled={disabled}
              onChange={(event) => {
                const nextValue = Math.min(Number(event.target.value), rangeValue[1]);
                const updated: [number, number] = [nextValue, rangeValue[1]];
                setRangeValue(updated);
                triggerChange(updated);
              }}
              style={{ ...rangeInputStyle, zIndex: 2 }}
            />
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={rangeValue[1]}
              disabled={disabled}
              onChange={(event) => {
                const nextValue = Math.max(Number(event.target.value), rangeValue[0]);
                const updated: [number, number] = [rangeValue[0], nextValue];
                setRangeValue(updated);
                triggerChange(updated);
              }}
              style={{ ...rangeInputStyle, zIndex: 3 }}
            />
          </>
        ) : (
          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={singleValue}
            disabled={disabled}
            onChange={(event) => {
              const nextValue = Number(event.target.value);
              setSingleValue(nextValue);
              triggerChange(nextValue);
            }}
            style={rangeInputStyle}
          />
        )}
      </div>

      {config.showLimits ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            color: "var(--sn-color-muted-foreground, #6b7280)",
          }}
        >
          <span>{config.min}{config.suffix ?? ""}</span>
          <span>{config.max}{config.suffix ?? ""}</span>
        </div>
      ) : null}
    </div>
  );
}

const rangeInputStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  margin: 0,
  background: "transparent",
  appearance: "none",
  pointerEvents: "auto",
};
