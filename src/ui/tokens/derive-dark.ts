import { deriveDarkVariant as deriveDarkVariantFromColor } from "./color";
import type { Flavor, ThemeColors } from "./types";

type FlavorConfig = Omit<Flavor, "name">;

type ColorKey = Exclude<keyof ThemeColors, "chart">;

const COLOR_KEYS: ColorKey[] = [
  "background",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "success",
  "warning",
  "info",
  "card",
  "popover",
  "sidebar",
  "border",
  "input",
  "ring",
];

/**
 * Derive a dark-mode color variant from a light-mode color.
 *
 * @param lightColor - Any color accepted by the token color parser
 * @returns Derived dark-mode color string
 */
export function deriveDarkVariant(lightColor: string): string {
  return deriveDarkVariantFromColor(lightColor);
}

/**
 * Derive a merged dark palette using parent + overrides precedence.
 *
 * Precedence per color key:
 * 1. `overrides.darkColors[key]`
 * 2. `deriveDarkVariant(overrides.colors[key])`
 * 3. `parent.darkColors[key]`
 * 4. `deriveDarkVariant(parent.colors[key])`
 *
 * @param parent - Parent flavor values
 * @param overrides - Partial flavor overrides from a child declaration
 * @returns Merged dark color map for the extended flavor
 */
export function deriveDarkColors(
  parent: Pick<FlavorConfig, "colors" | "darkColors">,
  overrides: Pick<Partial<FlavorConfig>, "colors" | "darkColors">,
): ThemeColors {
  const result: ThemeColors = {};

  for (const key of COLOR_KEYS) {
    const explicitDark = overrides.darkColors?.[key];
    if (explicitDark !== undefined) {
      result[key] = explicitDark;
      continue;
    }

    const overrideLight = overrides.colors?.[key];
    if (overrideLight !== undefined) {
      result[key] = deriveDarkVariant(overrideLight);
      continue;
    }

    const parentDark = parent.darkColors?.[key];
    if (parentDark !== undefined) {
      result[key] = parentDark;
      continue;
    }

    const parentLight = parent.colors?.[key];
    if (parentLight !== undefined) {
      result[key] = deriveDarkVariant(parentLight);
    }
  }

  const explicitDarkChart = overrides.darkColors?.chart;
  if (explicitDarkChart !== undefined) {
    result.chart = explicitDarkChart;
  } else if (overrides.colors?.chart !== undefined) {
    result.chart = overrides.colors.chart.map((value) =>
      deriveDarkVariant(value),
    ) as ThemeColors["chart"];
  } else if (parent.darkColors?.chart !== undefined) {
    result.chart = parent.darkColors.chart;
  } else if (parent.colors?.chart !== undefined) {
    result.chart = parent.colors.chart.map((value) =>
      deriveDarkVariant(value),
    ) as ThemeColors["chart"];
  }

  return result;
}
