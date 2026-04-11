import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";

export const linkConfigSchema = extendComponentSchema({
  type: z.literal("link"),
  text: z.string(),
  to: z.string(),
  external: z.boolean().default(false),
  align: z.enum(["left", "center", "right"]).default("left"),
  variant: z.enum(["default", "muted", "button"]).default("default"),
}).strict();
