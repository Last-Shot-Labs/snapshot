import { z } from "zod";
import { actionSchema } from "../../../actions/types";

/**
 * Zod schema for a dropdown menu item — an actionable menu entry.
 */
const dropdownMenuItemSchema = z
  .object({
    type: z.literal("item"),
    /** Display label for the item. */
    label: z.string(),
    /** Optional icon (rendered as text span). */
    icon: z.string().optional(),
    /** Action dispatched when the item is clicked. */
    action: actionSchema,
    /** Whether the item is disabled. */
    disabled: z.boolean().optional(),
    /** Whether the item is destructive (styled in red). */
    destructive: z.boolean().optional(),
  })
  .strict();

/**
 * Zod schema for a dropdown menu separator — a horizontal divider.
 */
const dropdownMenuSeparatorSchema = z
  .object({
    type: z.literal("separator"),
  })
  .strict();

/**
 * Zod schema for a dropdown menu label — a non-interactive group heading.
 */
const dropdownMenuLabelSchema = z
  .object({
    type: z.literal("label"),
    /** Text displayed as a group heading. */
    text: z.string(),
  })
  .strict();

/**
 * Union of all dropdown menu entry types.
 */
const dropdownMenuEntrySchema = z.union([
  dropdownMenuItemSchema,
  dropdownMenuSeparatorSchema,
  dropdownMenuLabelSchema,
]);

/**
 * Zod config schema for the DropdownMenu component.
 *
 * Defines a trigger button that opens a positioned dropdown menu
 * with items, separators, and group labels. Supports keyboard navigation.
 *
 * @example
 * ```json
 * {
 *   "type": "dropdown-menu",
 *   "trigger": { "label": "Actions", "variant": "outline" },
 *   "items": [
 *     { "type": "label", "text": "Options" },
 *     { "type": "item", "label": "Edit", "icon": "✏️", "action": { "type": "navigate", "to": "/edit" } },
 *     { "type": "separator" },
 *     { "type": "item", "label": "Delete", "destructive": true, "action": { "type": "api", "method": "DELETE", "endpoint": "/items/1" } }
 *   ]
 * }
 * ```
 */
export const dropdownMenuConfigSchema = z
  .object({
    /** Component type discriminator. */
    type: z.literal("dropdown-menu"),
    /** Trigger button configuration. */
    trigger: z
      .object({
        /** Button label text. */
        label: z.string().optional(),
        /** Icon rendered before label (as text). */
        icon: z.string().optional(),
        /** Button visual variant. */
        variant: z
          .enum(["default", "secondary", "outline", "ghost"])
          .optional(),
      })
      .strict(),
    /** Menu entries: items, separators, and labels. */
    items: z.array(dropdownMenuEntrySchema),
    /** Horizontal alignment of the menu relative to the trigger. */
    align: z.enum(["start", "center", "end"]).optional(),
    /** Side of the trigger where the menu appears. */
    side: z.enum(["top", "bottom"]).optional(),
    // --- BaseComponentConfig fields ---
    /** Component id for publishing/subscribing. */
    id: z.string().optional(),
    /** Additional CSS class name. */
    className: z.string().optional(),
  })
  .strict();
