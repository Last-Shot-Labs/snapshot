'use client';

import type { CSSProperties } from "react";

export interface VideoConfig {
  type: "video";
  id?: string;
  src: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  style?: Record<string, string | number>;
}

export function Video({ config }: { config: VideoConfig }) {
  const configStyle = config.style as CSSProperties | undefined;
  return (
    <video
      data-snapshot-component="video"
      className={config.className}
      src={config.src}
      poster={config.poster}
      controls={config.controls !== false}
      autoPlay={config.autoPlay}
      loop={config.loop}
      muted={config.muted ?? config.autoPlay}
      playsInline
      style={{
        width: "100%",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        ...configStyle,
      }}
    />
  );
}
