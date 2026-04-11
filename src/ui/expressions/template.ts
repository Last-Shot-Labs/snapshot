import { getNestedValue } from "../context/utils";
import type { I18nConfig } from "../i18n/schema";
import { resolveTRef } from "../i18n/resolve";

export interface ResolveTemplateOptions {
  locale?: string;
  i18n?: I18nConfig;
}

function resolvePath(path: string, context: Record<string, unknown>): unknown {
  return getNestedValue(context, path);
}

function resolveDateTemplate(
  token: string,
  context: Record<string, unknown>,
  locale: string,
): string | undefined {
  const [path = "", format = "medium"] = token.split("|");
  const value = resolvePath(path, context);
  if (!value) {
    return undefined;
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const dateStyleMap = {
    short: "short",
    medium: "medium",
    long: "long",
    full: "full",
  } as const;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: dateStyleMap[format as keyof typeof dateStyleMap] ?? "medium",
  }).format(date);
}

function resolveNumberTemplate(
  token: string,
  context: Record<string, unknown>,
  locale: string,
): string | undefined {
  const [path = "", ...rawOptions] = token.split("|");
  const value = resolvePath(path, context);
  if (value == null || Number.isNaN(Number(value))) {
    return undefined;
  }

  const options = rawOptions.reduce<Intl.NumberFormatOptions>((result, option) => {
    const [key, rawValue] = option.split(":");
    if (!key || !rawValue) {
      return result;
    }

    if (key === "style") {
      result.style = rawValue as Intl.NumberFormatOptions["style"];
    } else if (key === "currency") {
      result.currency = rawValue;
    }

    return result;
  }, {});

  return new Intl.NumberFormat(locale, options).format(Number(value));
}

export function resolveTemplate(
  template: string,
  context: Record<string, unknown>,
  options: ResolveTemplateOptions = {},
): string {
  if (!template.includes("{")) {
    return template;
  }

  const locale = options.locale ?? "en";

  return template.replace(/\{([^}]+)\}/g, (match, token: string) => {
    if (token.startsWith("i18n:")) {
      const key = token.slice(5);
      const resolved = resolveTRef({ t: key }, locale, options.i18n);
      return resolved || key;
    }

    if (token.startsWith("date:")) {
      return resolveDateTemplate(token.slice(5), context, locale) ?? match;
    }

    if (token.startsWith("number:")) {
      return resolveNumberTemplate(token.slice(7), context, locale) ?? match;
    }

    const resolved = resolvePath(token, context);
    if (resolved == null) {
      return match;
    }
    return String(resolved);
  });
}
