'use client';

import type { CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";

export interface BannerConfig {
  type: "banner";
  id?: string;
  background?: {
    image?: string;
    overlay?: string;
    color?: string;
  };
  height?: string | { default?: string; lg?: string };
  align?: "left" | "center" | "right";
  children?: ComponentConfig[];
  className?: string;
  style?: Record<string, string | number>;
}

export function Banner({ config }: { config: BannerConfig }) {
  const height = typeof config.height === "string" ? config.height : config.height?.default ?? "50vh";
  const align = config.align ?? "center";
  const bg = config.background;
  const configStyle = config.style as CSSProperties | undefined;

  const alignMap: Record<string, string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <div
      data-snapshot-component="banner"
      className={config.className}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: alignMap[align] ?? "center",
        justifyContent: "center",
        minHeight: height,
        padding: "var(--sn-spacing-xl, 2rem)",
        overflow: "hidden",
        ...(bg?.image ? {
          backgroundImage: `url(${bg.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        } : {}),
        ...(bg?.color ? { backgroundColor: bg.color } : {}),
        ...configStyle,
      }}
    >
      {/* Overlay */}
      {bg?.overlay && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: bg.overlay,
          zIndex: 0,
        }} />
      )}

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: alignMap[align] ?? "center",
        gap: "var(--sn-spacing-md, 1rem)",
        textAlign: align,
        maxWidth: "var(--sn-container-lg, 42rem)",
      }}>
        {config.children?.map((child, i) => (
          <ComponentRenderer key={child.id ?? `banner-child-${i}`} config={child} />
        ))}
      </div>
    </div>
  );
}
