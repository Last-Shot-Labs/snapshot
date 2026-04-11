import { z } from "zod";
import { baseComponentConfigSchema } from "../../../manifest/schema";

export const snapshotImageSchema = baseComponentConfigSchema.extend({
  type: z.literal("image"),
  src: z.string().min(1),
  width: z.number().int().positive().max(4096),
  height: z.number().int().positive().max(4096).optional(),
  quality: z.number().int().min(1).max(100).default(75),
  format: z
    .enum(["avif", "webp", "jpeg", "png", "original"])
    .default("original"),
  sizes: z.string().optional(),
  priority: z.boolean().default(false),
  placeholder: z.enum(["blur", "empty", "skeleton"]).default("empty"),
  loading: z.enum(["lazy", "eager"]).optional(),
  aspectRatio: z.string().optional(),
  alt: z.string(),
});
