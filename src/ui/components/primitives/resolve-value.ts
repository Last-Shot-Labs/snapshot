import { resolveTemplate } from "../../expressions/template";
import { resolveTRef } from "../../i18n/resolve";
import { isTRef, type I18nConfig } from "../../i18n/schema";

interface PrimitiveValueOptions {
  context: Record<string, unknown>;
  locale?: string;
  i18n?: I18nConfig;
}

export function resolvePrimitiveValue(
  value: unknown,
  { context, locale, i18n }: PrimitiveValueOptions,
): string {
  if (value == null) {
    return "";
  }

  const baseValue = isTRef(value)
    ? resolveTRef(value, locale, i18n)
    : String(value);

  return resolveTemplate(baseValue, context, {
    locale,
    i18n,
  });
}

export function resolveOptionalPrimitiveValue(
  value: unknown,
  options: PrimitiveValueOptions,
): string | undefined {
  if (value == null) {
    return undefined;
  }

  return resolvePrimitiveValue(value, options);
}
