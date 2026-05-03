"use client";

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { useResolveFrom } from "../../../context/hooks";
import { useT } from "../../../i18n/hook";
import {
  resolveOptionalPrimitiveValue,
  usePrimitiveValueOptions,
} from "../../primitives/resolve-value";
import { DefaultLoadingBase } from "./standalone";
import type { SpinnerConfig } from "./types";

export function DefaultLoading({ config }: { config: SpinnerConfig }) {
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({ label: config.label });
  const resolvedLabel = resolveOptionalPrimitiveValue(
    resolvedConfig.label,
    primitiveOptions,
  );
  const i18nLabel = useT("feedback.loading.label");
  const labelHasTranslation = i18nLabel !== "feedback.loading.label";

  return (
    <DefaultLoadingBase
      label={resolvedLabel ?? (labelHasTranslation ? i18nLabel : undefined)}
      size={config.size}
      id={config.id}
      className={config.className}
      style={config.style as CSSProperties}
      slots={config.slots as SlotOverrides}
    />
  );
}
