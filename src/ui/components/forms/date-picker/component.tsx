"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { usePublish, useSubscribe } from "../../../context/hooks";
import type { DatePickerConfig } from "./types";

function toOutputValue(
  value: string | string[] | { start: string; end: string },
  format: DatePickerConfig["valueFormat"],
) {
  const convert = (input: string) => {
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) {
      return input;
    }
    if (format === "unix") {
      return Math.floor(date.getTime() / 1000);
    }
    if (format === "locale") {
      return new Intl.DateTimeFormat().format(date);
    }
    return date.toISOString();
  };

  if (Array.isArray(value)) {
    return value.map(convert);
  }
  if (typeof value === "object") {
    return {
      start: convert(value.start),
      end: convert(value.end),
    };
  }
  return convert(value);
}

function isDisabledDate(
  value: string,
  disabledDates: DatePickerConfig["disabledDates"],
): boolean {
  if (!disabledDates || value.length === 0) {
    return false;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return disabledDates.some((entry) => {
    if (typeof entry === "string") {
      return entry === value;
    }
    return entry.dayOfWeek.includes(date.getDay());
  });
}

function formatDisplayValue(value: string, format?: string): string {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  if (format) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
      date,
    );
  }
  return new Intl.DateTimeFormat().format(date);
}

/**
 * Render a manifest-driven date picker input.
 */
export function DatePicker({ config }: { config: DatePickerConfig }) {
  const execute = useActionExecutor();
  const publish = usePublish(config.id);
  const visible = useSubscribe(config.visible ?? true);
  const [singleValue, setSingleValue] = useState("");
  const [rangeValue, setRangeValue] = useState({ start: "", end: "" });
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const [multipleInput, setMultipleInput] = useState("");

  const publishedValue = useMemo(() => {
    if (config.mode === "range") {
      return rangeValue;
    }
    if (config.mode === "multiple") {
      return multipleValue;
    }
    return singleValue;
  }, [config.mode, multipleValue, rangeValue, singleValue]);

  useEffect(() => {
    if (!publish) {
      return;
    }

    if (config.mode === "range") {
      publish(toOutputValue(rangeValue, config.valueFormat));
      return;
    }
    if (config.mode === "multiple") {
      publish(toOutputValue(multipleValue, config.valueFormat));
      return;
    }
    publish(
      singleValue ? toOutputValue(singleValue, config.valueFormat) : null,
    );
  }, [
    config.mode,
    config.valueFormat,
    multipleValue,
    publish,
    rangeValue,
    singleValue,
  ]);

  if (visible === false) {
    return null;
  }

  const triggerChange = (value: unknown) => {
    if (config.onChange) {
      void execute(config.onChange, { value });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
    borderRadius: "var(--sn-radius-md, 0.375rem)",
    border:
      "var(--sn-border-default, 1px) solid var(--sn-color-border, #d1d5db)",
    fontSize: "var(--sn-font-size-sm, 0.875rem)",
    backgroundColor: "var(--sn-color-background, #ffffff)",
    color: "var(--sn-color-foreground, #111827)",
    boxSizing: "border-box",
  };

  return (
    <div
      data-snapshot-component="date-picker"
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

      {config.presets && config.presets.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--sn-spacing-xs, 0.25rem)",
          }}
        >
          {config.presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                if (config.mode === "range") {
                  const nextValue = { start: preset.start, end: preset.end };
                  setRangeValue(nextValue);
                  triggerChange(toOutputValue(nextValue, config.valueFormat));
                  return;
                }
                if (config.mode === "multiple") {
                  const nextValue = [preset.start, preset.end].filter(Boolean);
                  setMultipleValue(nextValue);
                  triggerChange(toOutputValue(nextValue, config.valueFormat));
                  return;
                }
                setSingleValue(preset.start);
                triggerChange(toOutputValue(preset.start, config.valueFormat));
              }}
              style={{
                border:
                  "var(--sn-border-thin, 1px) solid var(--sn-color-border, #d1d5db)",
                backgroundColor: "var(--sn-color-card, #ffffff)",
                borderRadius: "var(--sn-radius-sm, 0.25rem)",
                padding:
                  "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
                cursor: "pointer",
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      ) : null}

      {config.mode === "single" ? (
        <input
          type="date"
          value={singleValue}
          min={config.min}
          max={config.max}
          placeholder={config.placeholder}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (isDisabledDate(nextValue, config.disabledDates)) {
              return;
            }
            setSingleValue(nextValue);
            triggerChange(toOutputValue(nextValue, config.valueFormat));
          }}
          style={inputStyle}
        />
      ) : null}

      {config.mode === "range" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "var(--sn-spacing-sm, 0.5rem)",
          }}
        >
          <input
            type="date"
            value={rangeValue.start}
            min={config.min}
            max={config.max}
            onChange={(event) => {
              const nextValue = event.target.value;
              if (isDisabledDate(nextValue, config.disabledDates)) {
                return;
              }
              const updated = { ...rangeValue, start: nextValue };
              setRangeValue(updated);
              triggerChange(toOutputValue(updated, config.valueFormat));
            }}
            style={inputStyle}
          />
          <input
            type="date"
            value={rangeValue.end}
            min={rangeValue.start || config.min}
            max={config.max}
            onChange={(event) => {
              const nextValue = event.target.value;
              if (isDisabledDate(nextValue, config.disabledDates)) {
                return;
              }
              const updated = { ...rangeValue, end: nextValue };
              setRangeValue(updated);
              triggerChange(toOutputValue(updated, config.valueFormat));
            }}
            style={inputStyle}
          />
        </div>
      ) : null}

      {config.mode === "multiple" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sn-spacing-sm, 0.5rem)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--sn-spacing-sm, 0.5rem)",
            }}
          >
            <input
              type="date"
              value={multipleInput}
              min={config.min}
              max={config.max}
              onChange={(event) => setMultipleInput(event.target.value)}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => {
                if (
                  multipleInput.length === 0 ||
                  isDisabledDate(multipleInput, config.disabledDates)
                ) {
                  return;
                }
                const nextValue = [...multipleValue, multipleInput]
                  .filter(
                    (value, index, array) => array.indexOf(value) === index,
                  )
                  .sort();
                setMultipleValue(nextValue);
                setMultipleInput("");
                triggerChange(toOutputValue(nextValue, config.valueFormat));
              }}
              style={{
                border:
                  "var(--sn-border-thin, 1px) solid var(--sn-color-border, #d1d5db)",
                backgroundColor: "var(--sn-color-card, #ffffff)",
                borderRadius: "var(--sn-radius-sm, 0.25rem)",
                padding:
                  "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 0.75rem)",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--sn-spacing-xs, 0.25rem)",
            }}
          >
            {multipleValue.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  const nextValue = multipleValue.filter(
                    (entry) => entry !== value,
                  );
                  setMultipleValue(nextValue);
                  triggerChange(toOutputValue(nextValue, config.valueFormat));
                }}
                style={{
                  border:
                    "var(--sn-border-thin, 1px) solid var(--sn-color-border, #d1d5db)",
                  backgroundColor: "var(--sn-color-secondary, #f3f4f6)",
                  borderRadius: "var(--sn-radius-full, 9999px)",
                  padding:
                    "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
                  cursor: "pointer",
                }}
              >
                {formatDisplayValue(value, config.format)} ×
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div
        style={{
          fontSize: "var(--sn-font-size-xs, 0.75rem)",
          color: "var(--sn-color-muted-foreground, #6b7280)",
        }}
      >
        {config.mode === "single"
          ? formatDisplayValue(singleValue, config.format)
          : config.mode === "range"
            ? `${formatDisplayValue(rangeValue.start, config.format)}${
                rangeValue.end
                  ? ` → ${formatDisplayValue(rangeValue.end, config.format)}`
                  : ""
              }`
            : multipleValue
                .map((value) => formatDisplayValue(value, config.format))
                .join(", ")}
      </div>
    </div>
  );
}
