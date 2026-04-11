'use client';

import React, { useCallback, useEffect, useState } from "react";
import { useSubscribe, usePublish } from "../../../context/hooks";
import { ContextMenuPortal } from "../../_base/context-menu-portal";
import type { ContextMenuConfig } from "./types";

export function ContextMenu({ config }: { config: ContextMenuConfig }) {
  const visible = useSubscribe(config.visible ?? true);
  const publish = usePublish(config.id);
  const [menuState, setMenuState] = useState<{
    x: number;
    y: number;
    context?: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    publish?.({ isOpen: menuState !== null });
  }, [menuState, publish]);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuState({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  if (visible === false) {
    return null;
  }

  return (
    <div
      data-snapshot-component="context-menu"
      className={config.className}
      style={{
        position: "relative",
        display: "inline-block",
        ...((config.style as React.CSSProperties) ?? {}),
      }}
    >
      <div
        data-testid="context-menu-area"
        onContextMenu={handleContextMenu}
        style={{
          cursor: "context-menu",
          padding: "var(--sn-spacing-sm, 0.5rem)",
          userSelect: "none",
        }}
      >
        {config.triggerText ? (
          <span
            style={{
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
            }}
          >
            {config.triggerText}
          </span>
        ) : null}
      </div>
      <ContextMenuPortal
        items={config.items ?? []}
        state={menuState}
        onClose={() => setMenuState(null)}
      />
    </div>
  );
}
