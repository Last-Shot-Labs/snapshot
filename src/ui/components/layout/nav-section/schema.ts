import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema } from "../../_base/schema";

export const navSectionConfigSchema = extendComponentSchema({
  type: z.literal("nav-section"),
  label: z.string().optional(),
  collapsible: z.boolean().optional(),
  defaultCollapsed: z.boolean().optional(),
  items: z.array(componentConfigSchema),
}).strict();
