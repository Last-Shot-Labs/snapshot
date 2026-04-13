import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const linkSlotNames = ["root", "label", "icon", "badge"] as const;

export const linkConfigSchema = extendComponentSchema({
  type: z.literal("link"),
  text: z.string(),
  to: z.string(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  external: z.boolean().default(false),
  align: z.enum(["left", "center", "right"]).default("left"),
  variant: z.enum(["default", "muted", "button"]).default("default"),
  slots: slotsSchema(linkSlotNames).optional(),
}).strict();
