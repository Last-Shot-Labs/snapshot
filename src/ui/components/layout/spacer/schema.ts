import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";

export const spacerConfigSchema = extendComponentSchema({
  type: z.literal("spacer"),
  size: z
    .union([
      z.enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]),
      z.string(),
    ])
    .default("md"),
  axis: z.enum(["horizontal", "vertical"]).default("vertical"),
  flex: z.boolean().optional(),
}).strict();
