"use client";

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { useResolveFrom } from "../../../context/hooks";
import { useT } from "../../../i18n/hook";
import {
  resolveOptionalPrimitiveValue,
  usePrimitiveValueOptions,
} from "../../primitives/resolve-value";
import { DefaultErrorBase } from "./standalone";
import type { ErrorPageConfig } from "./types";

export function DefaultError({ config }: { config: ErrorPageConfig }) {
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({
    title: config.title,
    description: config.description,
    retryLabel: config.retryLabel,
  });
  const resolvedTitle = resolveOptionalPrimitiveValue(
    resolvedConfig.title,
    primitiveOptions,
  );
  const resolvedDescription = resolveOptionalPrimitiveValue(
    resolvedConfig.description,
    primitiveOptions,
  );
  const resolvedRetryLabel = resolveOptionalPrimitiveValue(
    resolvedConfig.retryLabel,
    primitiveOptions,
  );

  // i18n defaults — keys resolve through the manifest's i18n config when
  // present, and fall back to the English string baked into the standalone
  // when no translation is registered.
  const i18nTitle = useT("feedback.error.title");
  const i18nDescription = useT("feedback.error.description");
  const i18nRetry = useT("feedback.error.retry");
  const titleHasTranslation = i18nTitle !== "feedback.error.title";
  const descriptionHasTranslation =
    i18nDescription !== "feedback.error.description";
  const retryHasTranslation = i18nRetry !== "feedback.error.retry";

  return (
    <DefaultErrorBase
      title={
        resolvedTitle ?? (titleHasTranslation ? i18nTitle : undefined)
      }
      description={
        resolvedDescription ??
        (descriptionHasTranslation ? i18nDescription : undefined)
      }
      showRetry={config.showRetry}
      retryLabel={
        resolvedRetryLabel ?? (retryHasTranslation ? i18nRetry : undefined)
      }
      id={config.id}
      className={config.className}
      style={config.style as CSSProperties}
      slots={config.slots as SlotOverrides}
    />
  );
}
