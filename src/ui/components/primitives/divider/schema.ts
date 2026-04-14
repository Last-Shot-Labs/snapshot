import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { primitiveTextValueSchema } from "../schema-helpers";

export const dividerSlotNames = ["root", "label", "lineStart", "lineEnd"] as const;

export const dividerConfigSchema = extendComponentSchema({
  type: z.literal("divider"),
  label: primitiveTextValueSchema.optional(),
  orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
  slots: slotsSchema(dividerSlotNames).optional(),
}).strict();
