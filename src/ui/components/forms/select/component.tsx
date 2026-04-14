'use client';

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePublish, useSubscribe } from "../../../context/hooks";
import { useComponentData } from "../../_base/use-component-data";
import type { SelectConfig } from "./types";

type SelectOption = {
  label: string;
  value: string;
};

function toOptions(
  raw: unknown,
  labelField?: string,
  valueField?: string,
): SelectOption[] {
  const normalizedLabelField = labelField ?? "label";
  const normalizedValueField = valueField ?? "value";
  const payload =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : undefined;
  const items = Array.isArray(raw)
    ? (raw as Record<string, unknown>[])
    : ((payload?.results ??
        payload?.data ??
        payload?.items ??
        []) as Record<string, unknown>[]);

  return items.map((item) => ({
    label: String(
      item.label ??
        item[normalizedLabelField] ??
        item.name ??
        item.title ??
        item.id ??
        "",
    ),
    value: String(
      item.value ??
        item[normalizedValueField] ??
        item.id ??
        item.key ??
        "",
    ),
  }));
}

/**
 * Manifest-driven select input with support for static options and resource-backed
 * option lists.
 */
export function Select({ config }: { config: SelectConfig }) {
  const publish = config.id ? usePublish(config.id) : null;
  const resolvedDefault = useSubscribe(config.default ?? "");
  const resolvedPlaceholder = useSubscribe(config.placeholder ?? "");

  const dataResult = useComponentData(
    !Array.isArray(config.options) && config.options ? config.options : "",
  );

  const options = useMemo(() => {
    if (Array.isArray(config.options)) {
      return config.options.map((option) => ({
        label: String(option.label),
        value: option.value,
      }));
    }

    return toOptions(dataResult.data, config.labelField, config.valueField);
  }, [config.labelField, config.options, config.valueField, dataResult.data]);

  const defaultValue =
    typeof resolvedDefault === "string"
      ? resolvedDefault
      : String(resolvedDefault ?? "");
  const placeholder =
    typeof resolvedPlaceholder === "string"
      ? resolvedPlaceholder
      : String(resolvedPlaceholder ?? "");

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (publish) {
      publish(value);
    }
  }, [publish, value]);

  const isLoading =
    !Array.isArray(config.options) &&
    Boolean(config.options) &&
    dataResult.isLoading &&
    options.length === 0;

  return (
    <select
      id={config.id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      aria-label={placeholder || config.id || "Select"}
      data-snapshot-structural-select=""
      className={config.className}
      style={{
        padding: "var(--sn-spacing-xs, 0.5rem)",
        borderRadius: "var(--sn-radius-md, 0.375rem)",
        border:
          "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
        backgroundColor: "var(--sn-color-background, #fff)",
        color: "var(--sn-color-foreground, #111827)",
        fontSize: "var(--sn-font-size-md, 1rem)",
        fontFamily: "var(--sn-font-sans, inherit)",
        lineHeight: "var(--sn-leading-normal, 1.5)",
        width: "100%",
        ...(config.style as CSSProperties | undefined),
      }}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {isLoading ? (
        <option value="" disabled>
          Loading...
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
