'use client';

import { useSubscribe } from "../../../context";
import type { SlotOverrides } from "../../_base/types";
import { CodeBase } from "./standalone";
import type { CodeConfig } from "./types";

/**
 * Manifest adapter — resolves config refs and delegates to CodeBase.
 */
export function Code({ config }: { config: CodeConfig }) {
  const value = useSubscribe(config.value);

  return (
    <CodeBase
      id={config.id}
      value={String(value ?? "")}
      fallback={config.fallback}
      className={config.className}
      style={config.style}
      slots={config.slots as SlotOverrides}
    />
  );
}
