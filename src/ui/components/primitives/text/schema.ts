import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";

export const textConfigSchema = extendComponentSchema({
  type: z.literal("text"),
  value: z.string(),
  variant: z.enum(["default", "muted", "subtle"]).default("default"),
  size: z.enum(["xs", "sm", "md", "lg"]).default("md"),
  weight: z
    .enum(["light", "normal", "medium", "semibold", "bold"])
    .default("normal"),
  align: z.enum(["left", "center", "right"]).default("left"),
}).strict();
