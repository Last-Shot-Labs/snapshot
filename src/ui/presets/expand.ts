import { z } from "zod";
import { authPage } from "./auth-page";
import { crudPage } from "./crud-page";
import { dashboardPage } from "./dashboard-page";
import {
  authPresetConfigSchema,
  crudPresetConfigSchema,
  dashboardPresetConfigSchema,
  settingsPresetConfigSchema,
} from "./schemas";
import { settingsPage } from "./settings-page";
import type { PageConfig } from "../manifest/types";

export type PresetName = "crud" | "dashboard" | "settings" | "auth";

const PRESET_REGISTRY: Record<
  PresetName,
  {
    schema: z.ZodType;
    factory: (config: unknown) => PageConfig;
  }
> = {
  crud: {
    schema: crudPresetConfigSchema,
    factory: (config) => crudPage(config as Parameters<typeof crudPage>[0]),
  },
  dashboard: {
    schema: dashboardPresetConfigSchema,
    factory: (config) =>
      dashboardPage(config as Parameters<typeof dashboardPage>[0]),
  },
  settings: {
    schema: settingsPresetConfigSchema,
    factory: (config) =>
      settingsPage(config as Parameters<typeof settingsPage>[0]),
  },
  auth: {
    schema: authPresetConfigSchema,
    factory: (config) => authPage(config as Parameters<typeof authPage>[0]),
  },
};

/** Validate a named preset config and expand it into the equivalent page config. */
export function expandPreset(
  preset: string,
  presetConfig: unknown,
): PageConfig {
  const entry = PRESET_REGISTRY[preset as PresetName];
  if (!entry) {
    throw new Error(
      `Unknown preset "${preset}". Valid presets: ${Object.keys(PRESET_REGISTRY).join(", ")}`,
    );
  }

  const validated = entry.schema.parse(presetConfig);
  return entry.factory(validated);
}
