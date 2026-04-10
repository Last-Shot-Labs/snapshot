'use client';

import { useMemo } from "react";
import { useSubscribe } from "../context/index";
import { useManifestRuntime } from "../manifest/runtime";
import { resolveDetectedLocale, resolveTRef } from "./resolve";

/**
 * Resolve a translation key against the active locale.
 *
 * The active locale comes from the manifest i18n detect strategy and current
 * `state.locale` value when present.
 *
 * @param key - Translation key path (e.g. `page.title`)
 * @param vars - Optional interpolation variables
 * @returns Localized string, or the key when missing
 */
export function useT(
  key: string,
  vars?: Record<string, unknown>,
): string {
  const manifest = useManifestRuntime();
  const localeStateValue = useSubscribe({ from: "state.locale" });
  const stateLocale =
    typeof localeStateValue === "string" ? localeStateValue : undefined;
  const i18n = manifest?.raw.i18n;

  const locale = useMemo(
    () =>
      resolveDetectedLocale(i18n, {
        stateLocale,
        navigatorLanguage:
          typeof navigator !== "undefined" ? navigator.language : undefined,
      }),
    [i18n, stateLocale],
  );

  return useMemo(
    () => resolveTRef({ t: key, vars }, locale, i18n),
    [i18n, key, locale, vars],
  );
}
