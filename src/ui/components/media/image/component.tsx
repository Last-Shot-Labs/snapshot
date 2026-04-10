'use client';

import { useState, useEffect } from "react";
import type { SnapshotImageConfig } from "./types";

/** Default route prefix used by the bunshot-image plugin. */
const IMAGE_ROUTE = "/_snapshot/image";

/**
 * Build the `/_snapshot/image` URL for a given set of image parameters.
 *
 * @param src - Source image URL (relative or absolute).
 * @param width - Target output width.
 * @param height - Target output height (optional).
 * @param format - Output format.
 * @param quality - Compression quality.
 * @returns The fully-constructed optimization URL.
 *
 * @internal
 */
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

/**
 * `<SnapshotImage>` — a config-driven, optimized image component.
 *
 * Routes image requests through the `bunshot-image` plugin's
 * `/_snapshot/image` handler for automatic resizing and format conversion.
 *
 * Features:
 * - Responsive `srcset` at 0.5×, 1×, 2× of the requested width
 * - `loading="lazy"` by default; `priority={true}` uses `loading="eager"`
 *   and injects `<link rel="preload">` into `document.head` (client-only)
 * - `placeholder="blur"` renders a blurred background div that fades out
 *   when the image finishes loading
 * - `sizes` prop forwarded directly to the `<img sizes>` attribute
 *
 * @param props - Component config matching `snapshotImageSchema`.
 *
 * @example
 * ```tsx
 * <SnapshotImage
 *   src="/uploads/cover.jpg"
 *   width={1200}
 *   height={630}
 *   quality={80}
 *   format="avif"
 *   alt="Post cover"
 *   priority
 * />
 * ```
 */
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
    alt,
    className,
  } = config;

  const [loaded, setLoaded] = useState(false);

  // Build primary src URL
  const imgSrc = buildImageUrl(src, width, height, format, quality);

  // Build responsive srcset at 0.5×, 1×, 2×
  const halfWidth = Math.max(1, Math.round(width / 2));
  const doubleWidth = Math.min(4096, width * 2);
  const halfHeight =
    height !== undefined ? Math.max(1, Math.round(height / 2)) : undefined;
  const doubleHeight =
    height !== undefined ? Math.min(4096, height * 2) : undefined;

  const srcset = [
    `${buildImageUrl(src, halfWidth, halfHeight, format, quality)} ${halfWidth}w`,
    `${buildImageUrl(src, width, height, format, quality)} ${width}w`,
    `${buildImageUrl(src, doubleWidth, doubleHeight, format, quality)} ${doubleWidth}w`,
  ].join(", ");

  // Priority: inject <link rel="preload"> into document.head (client-only)
  useEffect(() => {
    if (!priority) return;
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imgSrc;
    if (sizes) {
      link.setAttribute("imagesizes", sizes);
    }
    link.setAttribute("imagesrcset", srcset);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [priority, imgSrc, srcset, sizes]);

  const showBlur = placeholder === "blur" && !loaded;

  return (
    <div
      data-snapshot-component="snapshot-image"
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        lineHeight: 0,
      }}
    >
      {/* Blur placeholder — visible until image loads */}
      {placeholder === "blur" && (
        <div
          data-testid="snapshot-image-placeholder"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--sn-color-muted, #f1f5f9)",
            filter: "blur(20px)",
            transform: "scale(1.05)",
            transition: `opacity var(--sn-duration-normal, 300ms) var(--sn-ease-out, ease-out)`,
            opacity: showBlur ? 1 : 0,
            pointerEvents: "none",
          }}
        />
      )}

      <img
        data-testid="snapshot-image"
        src={imgSrc}
        srcSet={srcset}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
