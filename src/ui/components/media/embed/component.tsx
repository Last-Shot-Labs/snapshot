'use client';

import type { CSSProperties } from "react";

export interface EmbedConfig {
  type: "embed";
  id?: string;
  url: string;
  aspectRatio?: string;
  title?: string;
  className?: string;
  style?: Record<string, string | number>;
}

export function Embed({ config }: { config: EmbedConfig }) {
  const aspectRatio = config.aspectRatio ?? "16/9";
  const configStyle = config.style as CSSProperties | undefined;
  return (
    <div
      data-snapshot-component="embed"
      className={config.className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        overflow: "hidden",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        ...configStyle,
      }}
    >
      <iframe
        src={config.url}
        title={config.title ?? "Embedded content"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
