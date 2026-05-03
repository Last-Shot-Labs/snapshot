'use client';

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { SpacerBase } from "./standalone";
import type { SpacerConfig } from "./types";

export function Spacer({ config }: { config: SpacerConfig }) {
  return (
    <SpacerBase
      id={config.id}
      size={config.size}
      axis={config.axis}
      flex={config.flex}
      className={config.className}
      style={config.style as CSSProperties}
      slots={config.slots as SlotOverrides}
    />
  );
}
