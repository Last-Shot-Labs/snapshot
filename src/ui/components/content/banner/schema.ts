import { z } from "zod";

export const bannerConfigSchema = z.object({
  type: z.literal("banner"),
  id: z.string().optional(),
  background: z.object({
    image: z.string().optional(),
    overlay: z.string().optional(),
    color: z.string().optional(),
  }).strict().optional(),
  height: z.union([
    z.string(),
    z.object({
      default: z.string().optional(),
      lg: z.string().optional(),
    }).strict(),
  ]).optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  children: z.array(z.unknown()).optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
}).strict();
