import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const navDropdownSlotNames = [
  "root",
  "trigger",
  "triggerLabel",
  "triggerIcon",
  "panel",
  "item",
  "itemLabel",
  "itemIcon",
  "separator",
  "label",
] as const;

export const navDropdownConfigSchema = extendComponentSchema({
  type: z.literal("nav-dropdown"),
  label: z.string(),
  icon: z.string().optional(),
  trigger: z.enum(["click", "hover"]).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  width: z.string().optional(),
  items: z.array(componentConfigSchema),
  roles: z.array(z.string()).optional(),
  authenticated: z.boolean().optional(),
  slots: slotsSchema(navDropdownSlotNames).optional(),
}).strict();
