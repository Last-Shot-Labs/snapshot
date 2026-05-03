"use client";

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { useResolveFrom } from "../../../context/hooks";
import { useT } from "../../../i18n/hook";
import {
  resolveOptionalPrimitiveValue,
  usePrimitiveValueOptions,
} from "../../primitives/resolve-value";
import { DefaultNotFoundBase } from "./standalone";
import type { NotFoundConfig } from "./types";

export function DefaultNotFound({ config }: { config: NotFoundConfig }) {
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({
    title: config.title,
    description: config.description,
  });
  const resolvedTitle = resolveOptionalPrimitiveValue(
    resolvedConfig.title,
    primitiveOptions,
  );
  const resolvedDescription = resolveOptionalPrimitiveValue(
    resolvedConfig.description,
    primitiveOptions,
  );
  const i18nTitle = useT("feedback.notFound.title");
  const i18nDescription = useT("feedback.notFound.description");
  const titleTranslated = i18nTitle !== "feedback.notFound.title";
  const descriptionTranslated =
    i18nDescription !== "feedback.notFound.description";

  return (
    <DefaultNotFoundBase
      title={resolvedTitle ?? (titleTranslated ? i18nTitle : undefined)}
      description={
        resolvedDescription ??
        (descriptionTranslated ? i18nDescription : undefined)
      }
      id={config.id}
      className={config.className}
      style={config.style as CSSProperties}
      slots={config.slots as SlotOverrides}
    />
  );
}
