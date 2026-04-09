import { z } from "zod";

/**
 * Zod config schema for the `<SnapshotImage>` component.
 *
 * Defines all manifest-settable fields for an optimized image that routes
 * through the `bunshot-image` plugin's `/_snapshot/image` handler.
 *
 * @example
 * ```json
 * {
 *   "src": "/uploads/cover.jpg",
 *   "width": 1200,
 *   "height": 630,
 *   "quality": 80,
 *   "format": "avif",
 *   "alt": "Post cover",
 *   "priority": true
 * }
 * ```
 */
export const snapshotImageSchema = z.object({
  /** Source URL — relative path or absolute URL. */
  src: z.string().min(1),
  /** Output width in pixels (1–4096). */
  width: z.number().int().positive().max(4096),
  /** Output height in pixels (1–4096). Omit to preserve aspect ratio. */
  height: z.number().int().positive().max(4096).optional(),
  /**
   * Compression quality 1–100.
   * @default 75
   */
  quality: z.number().int().min(1).max(100).default(75),
  /**
   * Output format.
   * @default 'original'
   */
  format: z
    .enum(["avif", "webp", "jpeg", "png", "original"])
    .default("original"),
  /** `sizes` attribute passed directly to the `<img>` element. */
  sizes: z.string().optional(),
  /**
   * When `true`, uses `loading="eager"` and injects a `<link rel="preload">`.
   * @default false
   */
  priority: z.boolean().default(false),
  /**
   * Placeholder strategy while the image loads.
   * - `'blur'` — renders a blurred background color div until the image loads.
   * - `'empty'` — no placeholder.
   * @default 'empty'
   */
  placeholder: z.enum(["blur", "empty"]).default("empty"),
  /** Alt text for accessibility. Required. */
  alt: z.string(),
  /** Additional CSS class name for the wrapper element. */
  className: z.string().optional(),
});
