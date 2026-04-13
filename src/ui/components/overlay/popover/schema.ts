import { z } from "zod";
import { fromRefSchema } from "../../_base/types";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const popoverSlotNames = [
  "root",
  "trigger",
  "triggerLabel",
  "triggerIcon",
  "panel",
  "content",
  "header",
  "title",
  "description",
  "footer",
  "closeButton",
] as const;

export const popoverConfigSchema = extendComponentSchema({
  type: z.literal("popover"),
  trigger: z.union([z.string(), fromRefSchema]),
  triggerIcon: z.string().optional(),
  triggerVariant: z
    .enum(["default", "secondary", "outline", "ghost", "destructive", "link"])
    .optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.array(z.any()).optional(),
  footer: z.array(z.any()).optional(),
  placement: z.enum(["top", "bottom"]).optional(),
  width: z.string().optional(),
  slots: slotsSchema(popoverSlotNames).optional(),
}).strict();
