import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { primitiveTextValueSchema } from "../schema-helpers";

export const textSlotNames = ["root"] as const;

export const textConfigSchema = extendComponentSchema({
  type: z.literal("text"),
  value: primitiveTextValueSchema,
  variant: z.enum(["default", "muted", "subtle"]).default("default"),
  size: z.enum(["xs", "sm", "md", "lg"]).default("md"),
  weight: z
    .enum(["light", "normal", "medium", "semibold", "bold"])
    .default("normal"),
  align: z.enum(["left", "center", "right"]).default("left"),
  slots: slotsSchema(textSlotNames).optional(),
}).strict();
