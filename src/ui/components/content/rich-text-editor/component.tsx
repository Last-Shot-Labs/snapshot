'use client';

import { useCallback, useEffect, useRef } from "react";
import type { SlotOverrides } from "../../_base/types";
import { usePublish, useResolveFrom, useSubscribe } from "../../../context/hooks";
import {
  resolveOptionalPrimitiveValue,
  usePrimitiveValueOptions,
} from "../../primitives/resolve-value";
import { RichTextEditorBase } from "./standalone";
import type { RichTextEditorConfig } from "./types";

/**
 * Manifest adapter — resolves config refs, wires publish, and delegates to RichTextEditorBase.
 */
export function RichTextEditor({ config }: { config: RichTextEditorConfig }) {
  const resolvedContent = useSubscribe(config.content ?? "") as string;
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({ placeholder: config.placeholder });
  const resolvedPlaceholder = resolveOptionalPrimitiveValue(
    resolvedConfig.placeholder,
    primitiveOptions,
  );
  const resolvedReadonly = useSubscribe(config.readonly ?? false) as boolean;
  const visible = useSubscribe(config.visible ?? true);
  const publish = usePublish(config.id);
  const publishRef = useRef(publish);
  publishRef.current = publish;
  const resolvedContentRef = useRef(resolvedContent);
  resolvedContentRef.current = resolvedContent;
  const publishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (publishTimerRef.current) clearTimeout(publishTimerRef.current);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      if (!publish) return;
      if (publishTimerRef.current) clearTimeout(publishTimerRef.current);
      publishTimerRef.current = setTimeout(() => publish(value), 300);
    },
    [publish],
  );

  // Mount-only: publish the initial resolved content once.
  // Uses refs to avoid stale closures without adding reactive deps.
  useEffect(() => {
    if (publishRef.current && resolvedContentRef.current) {
      publishRef.current(resolvedContentRef.current);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- intentional mount-only effect

  if (visible === false) return null;

  return (
    <RichTextEditorBase
      id={config.id}
      content={resolvedContent}
      placeholder={resolvedPlaceholder}
      readonly={resolvedReadonly}
      mode={config.mode}
      toolbar={config.toolbar}
      minHeight={config.minHeight}
      maxHeight={config.maxHeight}
      onChange={handleChange}
      className={config.className}
      style={config.style}
      slots={config.slots as SlotOverrides}
    />
  );
}
