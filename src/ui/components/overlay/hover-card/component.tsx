"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { HoverCardConfig } from "./types";

export function HoverCard({ config }: { config: HoverCardConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openDelay = config.openDelay ?? 300;
  const closeDelay = config.closeDelay ?? 200;
  const side = config.side ?? "bottom";
  const align = config.align ?? "center";

  const clearTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleEnter = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => setIsOpen(true), openDelay);
  };

  const handleLeave = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const positionStyle: CSSProperties = {};
  if (side === "bottom") {
    positionStyle.top = "calc(100% + 4px)";
  } else if (side === "top") {
    positionStyle.bottom = "calc(100% + 4px)";
  } else if (side === "left") {
    positionStyle.right = "calc(100% + 4px)";
    positionStyle.top = "0";
  } else {
    positionStyle.left = "calc(100% + 4px)";
    positionStyle.top = "0";
  }

  if (side === "bottom" || side === "top") {
    if (align === "start") positionStyle.left = "0";
    else if (align === "end") positionStyle.right = "0";
    else {
      positionStyle.left = "50%";
      positionStyle.transform = "translateX(-50%)";
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      <ComponentRenderer config={config.trigger} />
      {isOpen && (
        <div
          data-hover-card=""
          style={{
            position: "absolute",
            zIndex: "var(--sn-z-index-popover, 50)" as string,
            width: config.width ?? "auto",
            background: "var(--sn-color-popover, var(--sn-color-card, #fff))",
            border: "1px solid var(--sn-color-border, #e5e7eb)",
            borderRadius: "var(--sn-radius-lg, 0.75rem)",
            boxShadow:
              "0 4px 16px -2px rgba(0,0,0,0.12), 0 2px 6px -1px rgba(0,0,0,0.07)",
            ...positionStyle,
          }}
        >
          {config.content.map((child, i) => (
            <ComponentRenderer
              key={(child as { id?: string }).id ?? i}
              config={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}
