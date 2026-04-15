'use client';

import { useEffect } from "react";
import { useActionExecutor } from "../../actions/executor";
import {
  MenuItem,
  MenuLabel,
  MenuSeparator,
} from "../primitives/floating-menu";
import { SurfaceStyles } from "./surface-styles";
import { resolveSurfacePresentation } from "./style-surfaces";
import type { ActionConfig } from "../../actions/types";

export type ContextMenuPortalItem =
  | {
      type?: "item";
      label: string;
      icon?: string;
      action?: ActionConfig;
      variant?: "default" | "destructive";
      disabled?: boolean;
      slots?: Record<string, unknown>;
    }
  | {
      type: "separator";
      slots?: Record<string, unknown>;
    }
  | {
      type: "label";
      text: string;
      slots?: Record<string, unknown>;
    };

export interface ContextMenuPortalState {
  x: number;
  y: number;
  context?: Record<string, unknown>;
}

function clampPosition(state: ContextMenuPortalState) {
  return {
    left: `min(${state.x}px, calc(100vw - var(--sn-spacing-xl, 2rem) - 12rem))`,
    top: `min(${state.y}px, calc(100vh - var(--sn-spacing-xl, 2rem) - 12rem))`,
  };
}

export function ContextMenuPortal({
  items,
  state,
  onClose,
  slots,
  idBase = "context-menu",
}: {
  items: ContextMenuPortalItem[];
  state: ContextMenuPortalState | null;
  onClose: () => void;
  slots?: Record<string, unknown>;
  idBase?: string;
}) {
  const execute = useActionExecutor();

  useEffect(() => {
    if (!state || typeof document === "undefined") {
      return;
    }

    const handlePointerDown = () => onClose();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, state]);

  if (!state) {
    return null;
  }

  const panelSurface = resolveSurfacePresentation({
    surfaceId: `${idBase}-panel`,
    implementationBase: {
      position: "fixed",
      zIndex: "var(--sn-z-index-popover, 50)",
      minWidth: "12rem",
      display: "grid",
      gap: "var(--sn-spacing-2xs, 0.125rem)",
    },
    componentSurface: slots?.panel as Record<string, unknown> | undefined,
  });

  return (
    <>
      <div
        role="menu"
        data-snapshot-id={`${idBase}-panel`}
        className={panelSurface.className}
        style={{
          ...panelSurface.style,
          ...clampPosition(state),
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {items.map((item, index) => {
          if (item.type === "separator") {
            return (
              <MenuSeparator
                key={`${idBase}-separator-${index}`}
                surfaceId={`${idBase}-separator-${index}`}
                slot={(item.slots?.separator as Record<string, unknown> | undefined) ?? (slots?.separator as Record<string, unknown> | undefined)}
              />
            );
          }

          if (item.type === "label") {
            return (
              <MenuLabel
                key={`${idBase}-label-${index}`}
                text={item.text}
                surfaceId={`${idBase}-label-${index}`}
                slot={(item.slots?.label as Record<string, unknown> | undefined) ?? (slots?.label as Record<string, unknown> | undefined)}
              />
            );
          }

          return (
            <MenuItem
              key={`${idBase}-item-${index}`}
              label={item.label}
              icon={item.icon}
              disabled={item.disabled}
              destructive={item.variant === "destructive"}
              onClick={() => {
                onClose();
                if (item.action) {
                  void execute(item.action, state.context);
                }
              }}
              surfaceId={`${idBase}-item-${index}`}
              slot={(item.slots?.item as Record<string, unknown> | undefined) ?? (slots?.item as Record<string, unknown> | undefined)}
              labelSlot={(item.slots?.itemLabel as Record<string, unknown> | undefined) ?? (slots?.itemLabel as Record<string, unknown> | undefined)}
              iconSlot={(item.slots?.itemIcon as Record<string, unknown> | undefined) ?? (slots?.itemIcon as Record<string, unknown> | undefined)}
            />
          );
        })}
      </div>
      <SurfaceStyles css={panelSurface.scopedCss} />
    </>
  );
}
