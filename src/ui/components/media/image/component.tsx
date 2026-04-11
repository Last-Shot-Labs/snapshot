'use client';

import { useEffect, useState } from "react";
import type { SnapshotImageConfig } from "./types";

const IMAGE_ROUTE = "/_snapshot/image";

function buildImageUrl(
  src: string,
  width: number,
  height: number | undefined,
  format: string,
  quality: number,
): string {
  const params = new URLSearchParams();
  params.set("url", src);
  params.set("w", String(width));
  if (height !== undefined) {
    params.set("h", String(height));
  }
  params.set("f", format);
  params.set("q", String(quality));
  return `${IMAGE_ROUTE}?${params.toString()}`;
}

export function SnapshotImage({ config }: { config: SnapshotImageConfig }) {
  const {
    src,
    width,
    height,
    quality,
    format,
    sizes,
    priority,
    placeholder,
    loading,
    aspectRatio,
    alt,
  } = config;
  const [loaded, setLoaded] = useState(false);

  const imgSrc = buildImageUrl(src, width, height, format, quality);
  const halfWidth = Math.max(1, Math.round(width / 2));
  const doubleWidth = Math.min(4096, width * 2);
  const halfHeight =
    height !== undefined ? Math.max(1, Math.round(height / 2)) : undefined;
  const doubleHeight =
    height !== undefined ? Math.min(4096, height * 2) : undefined;
  const srcSet = [
    `${buildImageUrl(src, halfWidth, halfHeight, format, quality)} ${halfWidth}w`,
    `${buildImageUrl(src, width, height, format, quality)} ${width}w`,
    `${buildImageUrl(src, doubleWidth, doubleHeight, format, quality)} ${doubleWidth}w`,
  ].join(", ");

  useEffect(() => {
    if (!priority || typeof document === "undefined") {
      return;
    }

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imgSrc;
    if (sizes) {
      link.setAttribute("imagesizes", sizes);
    }
    link.setAttribute("imagesrcset", srcSet);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [imgSrc, priority, sizes, srcSet]);

  const showPlaceholder =
    (placeholder === "blur" || placeholder === "skeleton") && !loaded;

  return (
    <div
      data-snapshot-image=""
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        lineHeight: 0,
        width: "100%",
        aspectRatio,
      }}
    >
      {placeholder !== "empty" ? (
        <div
          data-testid="snapshot-image-placeholder"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--sn-color-muted, #f1f5f9)",
            filter: placeholder === "blur" ? "blur(20px)" : undefined,
            transform: placeholder === "blur" ? "scale(1.05)" : undefined,
            transition:
              "opacity var(--sn-duration-normal, 300ms) var(--sn-ease-out, ease-out)",
            opacity: showPlaceholder ? 1 : 0,
            pointerEvents: "none",
            animation:
              placeholder === "skeleton"
                ? "sn-bounce 1.2s var(--sn-ease-default, ease) infinite"
                : undefined,
          }}
        />
      ) : null}

      <img
        data-testid="snapshot-image"
        src={imgSrc}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={loading ?? (priority ? "eager" : "lazy")}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          height: height ? "auto" : "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
