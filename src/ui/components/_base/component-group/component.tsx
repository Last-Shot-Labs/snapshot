"use client";

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { useManifestRuntime } from "../../../manifest/runtime";
import { ComponentRenderer } from "../../../manifest/renderer";
import { ComponentGroupBase } from "./standalone";
import type { ComponentGroupConfig } from "./types";
import type { ComponentConfig } from "../../../manifest/types";

/**
 * Renders a named component group from the manifest's componentGroups map.
 *
 * Looks up the group definition, applies per-instance overrides by component id,
 * and delegates to ComponentGroupBase for layout.
 */
export function ComponentGroup({ config }: { config: ComponentGroupConfig }) {
  const manifest = useManifestRuntime();
  const rootId = config.id ?? "component-group";

  const groupDefs = (manifest?.raw as Record<string, unknown> | undefined)?.[
    "componentGroups"
  ] as
    | Record<string, { components: Array<Record<string, unknown>> }>
    | undefined;

  const groupDef = groupDefs?.[config.group];

  if (!groupDef) {
    if (
      typeof process !== "undefined" &&
      process.env?.["NODE_ENV"] === "development"
    ) {
      console.warn(`[snapshot] Unknown component group: "${config.group}"`);
    }
    return null;
  }

  const overrides = config.overrides;

  return (
    <ComponentGroupBase
      id={config.id}
      className={config.className}
      style={config.style as CSSProperties}
      slots={config.slots as SlotOverrides}
    >
      {groupDef.components.map((componentConfig, index) => {
        let resolved = componentConfig;

        // Apply overrides by component id with a deep merge so nested
        // `slots`, `style`, and state maps compose with the group's
        // base config instead of being clobbered.
        if (overrides && typeof componentConfig["id"] === "string") {
          const idOverride = overrides[componentConfig["id"]];
          if (idOverride) {
            resolved = deepMergeOverrides(componentConfig, idOverride);
          }
        }

        return (
          <ComponentRenderer
            key={(resolved["id"] as string) ?? index}
            config={resolved as ComponentConfig}
          />
        );
      })}
    </ComponentGroupBase>
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Recursively merge an override config onto a base config. Plain objects are
 * merged key-by-key so nested `slots`, `style`, `states`, and `hover/focus/active`
 * compose. Arrays and primitives are replaced.
 */
function deepMergeOverrides(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const [key, overrideValue] of Object.entries(override)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMergeOverrides(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }
  return result;
}
