import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { fromRefSchema } from "../../_base/types";

export const navSlotNames = [
  "root",
  "brand",
  "brandIcon",
  "brandLabel",
  "list",
  "item",
  "itemLabel",
  "itemIcon",
  "itemBadge",
  "dropdown",
  "dropdownItem",
  "dropdownItemLabel",
  "dropdownItemIcon",
  "userMenu",
  "userMenuTrigger",
  "userMenuItem",
  "userAvatar",
] as const;

const navItemSlotNames = [
  "item",
  "itemLabel",
  "itemIcon",
  "itemBadge",
  "dropdownItem",
  "dropdownItemLabel",
  "dropdownItemIcon",
] as const;

const userMenuItemSchema = z
  .object({
    label: z.string(),
    icon: z.string().optional(),
    action: actionSchema,
    roles: z.array(z.string()).optional(),
    slots: slotsSchema(["item", "itemLabel", "itemIcon"]).optional(),
  })
  .strict();

const userMenuConfigSchema = z
  .object({
    showAvatar: z.boolean().optional(),
    showEmail: z.boolean().optional(),
    items: z.array(userMenuItemSchema).optional(),
  })
  .strict();

const logoConfigSchema = z
  .object({
    src: z.string().optional(),
    text: z.string().optional(),
    path: z.string().optional(),
  })
  .strict();

const templateComponentSchema: z.ZodType = z.lazy(() =>
  z.object({ type: z.string() }).passthrough(),
);

const navItemBaseSchema = z
  .object({
    label: z.string(),
    path: z.string().optional(),
    icon: z.string().optional(),
    badge: z.union([z.number(), fromRefSchema]).optional(),
    visible: z.union([z.boolean(), fromRefSchema]).optional(),
    disabled: z.union([z.boolean(), fromRefSchema]).optional(),
    authenticated: z.boolean().optional(),
    roles: z.array(z.string()).optional(),
    slots: slotsSchema(navItemSlotNames).optional(),
  })
  .strict();

export const navItemSchema: z.ZodType = z.lazy(() =>
  navItemBaseSchema.extend({
    children: z.array(navItemSchema).optional(),
  }).strict(),
);

export type NavItemConfig = z.infer<typeof navItemSchema>;

export const navConfigSchema = extendComponentSchema({
  type: z.literal("nav"),
  items: z.array(navItemSchema).optional(),
  template: z.array(templateComponentSchema).optional(),
  collapsible: z.boolean().optional(),
  userMenu: z.union([z.boolean(), userMenuConfigSchema]).optional(),
  logo: logoConfigSchema.optional(),
  slots: slotsSchema(navSlotNames).optional(),
}).strict();

export type NavConfig = z.infer<typeof navConfigSchema>;
