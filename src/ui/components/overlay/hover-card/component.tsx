"use client";

import { ComponentRenderer } from "../../../manifest/renderer";
import type { SlotOverrides } from "../../_base/types";
import { HoverCardBase } from "./standalone";
import type { HoverCardConfig } from "./types";

/**
 * Manifest adapter — renders manifest children inside HoverCardBase.
 */
export function HoverCard({ config }: { config: HoverCardConfig }) {
  return (
    <HoverCardBase
      id={config.id}
      trigger={<ComponentRenderer config={config.trigger} />}
      openDelay={config.openDelay}
      closeDelay={config.closeDelay}
      side={config.side}
      align={config.align}
      width={config.width}
      className={config.className}
      style={config.style as import("react").CSSProperties}
      slots={config.slots as SlotOverrides}
    >
      {config.content.map((child, index) => (
        <ComponentRenderer
          key={(child as { id?: string }).id ?? index}
          config={child}
        />
      ))}
    </HoverCardBase>
  );
}
