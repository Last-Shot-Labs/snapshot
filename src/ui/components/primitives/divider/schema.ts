import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";

export const dividerConfigSchema = extendComponentSchema({
  type: z.literal("divider"),
  label: z.string().optional(),
  orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
}).strict();
