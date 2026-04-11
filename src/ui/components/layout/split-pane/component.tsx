'use client';

import { useState, useCallback, useRef, type CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";

export interface SplitPaneConfig {
  type: "split-pane";
  id?: string;
  direction?: "horizontal" | "vertical";
  defaultSplit?: number; // percentage 0-100
  minSize?: number; // pixels
  children: ComponentConfig[];
  className?: string;
  style?: Record<string, string | number>;
}

export function SplitPane({ config }: { config: Record<string, unknown> }) {
  const splitConfig = config as unknown as SplitPaneConfig;
  const direction = splitConfig.direction ?? "horizontal";
  const [split, setSplit] = useState(splitConfig.defaultSplit ?? 50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const minSize = splitConfig.minSize ?? 100;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pct: number;
    if (direction === "horizontal") {
      const x = e.clientX - rect.left;
      pct = (x / rect.width) * 100;
    } else {
      const y = e.clientY - rect.top;
      pct = (y / rect.height) * 100;
    }
    // Clamp to min sizes
    const minPct = (minSize / (direction === "horizontal" ? rect.width : rect.height)) * 100;
    pct = Math.max(minPct, Math.min(100 - minPct, pct));
    setSplit(pct);
  }, [direction, minSize]);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const isHorizontal = direction === "horizontal";
  const configStyle = splitConfig.style as CSSProperties | undefined;

  // Only render first two children
  const children = Array.isArray(splitConfig.children) ? splitConfig.children.slice(0, 2) : [];

  return (
    <div
      ref={containerRef}
      data-snapshot-component="split-pane"
      className={splitConfig.className}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        width: "100%",
        height: isHorizontal ? "100%" : undefined,
        minHeight: isHorizontal ? "400px" : undefined,
        overflow: "hidden",
        ...configStyle,
      }}
    >
      {/* First pane */}
      <div
        style={{
          [isHorizontal ? "width" : "height"]: `${split}%`,
          overflow: "auto",
          minWidth: isHorizontal ? minSize : undefined,
          minHeight: !isHorizontal ? minSize : undefined,
        }}
      >
        {children[0] != null && (
          <ComponentRenderer config={children[0]} />
        )}
      </div>

      {/* Divider */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          [isHorizontal ? "width" : "height"]: "4px",
          [isHorizontal ? "minWidth" : "minHeight"]: "4px",
          background: "var(--sn-color-border, #e5e7eb)",
          cursor: isHorizontal ? "col-resize" : "row-resize",
          flexShrink: 0,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "var(--sn-color-primary, #2563eb)"; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "var(--sn-color-border, #e5e7eb)"; }}
      />

      {/* Second pane */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          minWidth: isHorizontal ? minSize : undefined,
          minHeight: !isHorizontal ? minSize : undefined,
        }}
      >
        {children[1] != null && (
          <ComponentRenderer config={children[1]} />
        )}
      </div>
    </div>
  );
}
