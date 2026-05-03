'use client';

import type { CSSProperties } from "react";
import type { SlotOverrides } from "../../_base/types";
import { SnapshotImageBase } from "./standalone";
import type { SnapshotImageConfig } from "./types";

/**
 * Manifest adapter — extracts config props and delegates to SnapshotImageBase.
 */
export function SnapshotImage({ config }: { config: SnapshotImageConfig }) {
  return (
    <SnapshotImageBase
      id={config.id}
      src={config.src}
      alt={config.alt}
      width={config.width}
      height={config.height}
      quality={config.quality}
      format={config.format}
      sizes={config.sizes}
      priority={config.priority}
      placeholder={config.placeholder}
      loading={config.loading}
      aspectRatio={config.aspectRatio}
      className={config.className}
      style={config.style as CSSProperties}
      slots={config.slots as SlotOverrides}
    />
  );
}
