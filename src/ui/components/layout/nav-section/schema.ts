import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const navSectionSlotNames = [
  "root",
  "header",
  "headerLabel",
  "headerIcon",
  "content",
] as const;

export const navSectionConfigSchema = extendComponentSchema({
  type: z.literal("nav-section"),
  label: z.string().optional(),
  collapsible: z.boolean().optional(),
  defaultCollapsed: z.boolean().optional(),
  items: z.array(componentConfigSchema),
  slots: slotsSchema(navSectionSlotNames).optional(),
}).strict();
