import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const bannerConfigSchema = extendComponentSchema({
  type: z.literal("banner"),
  background: z
    .object({
      image: z.string().optional(),
      overlay: z.string().optional(),
      color: z.string().optional(),
    })
    .strict()
    .optional(),
  height: z
    .union([
      z.string(),
      z
        .object({
          default: z.string().optional(),
          lg: z.string().optional(),
        })
        .strict(),
    ])
    .optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  children: z.array(z.unknown()).optional(),
  slots: slotsSchema(["root", "overlay", "content"]).optional(),
}).strict();
