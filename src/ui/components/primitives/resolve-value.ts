import { useSubscribe } from "../../context";
import { resolveRuntimeLocale } from "../../i18n/resolve";
import { useManifestRuntime, useRouteRuntime } from "../../manifest/runtime";
import { resolveTemplate } from "../../expressions/template";
import { resolveTRef } from "../../i18n/resolve";
import { isTRef, type I18nConfig } from "../../i18n/schema";

export interface PrimitiveValueOptions {
  context: Record<string, unknown>;
  locale?: string;
  i18n?: I18nConfig;
}

export function usePrimitiveValueOptions(): PrimitiveValueOptions {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const localeState = useSubscribe({ from: "global.locale" });
  const activeLocale = resolveRuntimeLocale(manifest?.raw.i18n, localeState);

  return {
    context: {
      app: manifest?.app ?? {},
      auth: manifest?.auth ?? {},
      route: {
        ...(routeRuntime?.currentRoute ?? {}),
        path: routeRuntime?.currentPath,
        params: routeRuntime?.params,
        query: routeRuntime?.query,
      },
    },
    locale: activeLocale,
    i18n: manifest?.raw.i18n,
  };
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
