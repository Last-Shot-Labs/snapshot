import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { fromRefSchema } from "../../_base/types";

export const navLinkSlotNames = ["root", "label", "icon", "badge"] as const;

export const navLinkConfigSchema = extendComponentSchema({
  type: z.literal("nav-link"),
  label: z.union([z.string(), fromRefSchema]),
  path: z.string(),
  icon: z.string().optional(),
  badge: z.union([z.number(), fromRefSchema]).optional(),
  matchChildren: z.boolean().optional(),
  active: z.union([z.boolean(), fromRefSchema]).optional(),
  disabled: z.union([z.boolean(), fromRefSchema]).optional(),
  roles: z.array(z.string()).optional(),
  authenticated: z.boolean().optional(),
  slots: slotsSchema(navLinkSlotNames).optional(),
}).strict();
