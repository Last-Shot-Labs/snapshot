import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { fromRefSchema } from "../../_base/types";

export const collapsibleSlotNames = ["root", "trigger", "content"] as const;

export const collapsibleConfigSchema = extendComponentSchema({
  type: z.literal("collapsible"),
  open: z
    .union([
      z.boolean(),
      fromRefSchema,
      z.object({ expr: z.string() }).strict(),
    ])
    .optional(),
  defaultOpen: z.boolean().optional(),
  trigger: componentConfigSchema.optional(),
  children: z.array(componentConfigSchema),
  duration: z.enum(["instant", "fast", "normal", "slow"]).optional(),
  publishTo: z.string().optional(),
  slots: slotsSchema(collapsibleSlotNames).optional(),
}).strict();
