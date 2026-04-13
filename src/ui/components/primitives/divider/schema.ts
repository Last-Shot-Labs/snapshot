import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const dividerSlotNames = ["root", "label", "lineStart", "lineEnd"] as const;

export const dividerConfigSchema = extendComponentSchema({
  type: z.literal("divider"),
  label: z.string().optional(),
  orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
  slots: slotsSchema(dividerSlotNames).optional(),
}).strict();
