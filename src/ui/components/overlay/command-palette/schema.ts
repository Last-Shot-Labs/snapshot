import { z } from "zod";
import { actionSchema } from "../../../actions/types";
// Canonical fromRefSchema source is _base/types.ts
import {
  dataSourceSchema,
  endpointTargetSchema,
  fromRefSchema,
} from "../../_base/types";

/**
 * Schema for a single command item within a group.
 */
const commandItemSchema = z.object({
  /** Display label for the command. */
  label: z.string(),
  /** Optional icon name (Lucide icon in kebab-case). */
  icon: z.string().optional(),
  /** Optional keyboard shortcut display text (e.g. "Ctrl+K"). */
  shortcut: z.string().optional(),
  /** Action to dispatch when this item is selected. */
  action: actionSchema.optional(),
  /** Optional description text shown below the label. */
  description: z.string().optional(),
});

/**
 * Schema for a group of command items.
 */
const commandGroupSchema = z.object({
  /** Group heading label. */
  label: z.string(),
  /** Items in this group. */
  items: z.array(commandItemSchema),
});

/**
 * Zod config schema for the CommandPalette component.
 *
 * A searchable command/action list (like VS Code Ctrl+K or macOS Spotlight).
 * Supports grouped items with icons, shortcuts, descriptions, and actions.
 *
 * @example
 * ```json
 * {
 *   "type": "command-palette",
 *   "placeholder": "Search commands...",
 *   "groups": [
 *     {
 *       "label": "Navigation",
 *       "items": [
 *         { "label": "Go to Dashboard", "icon": "layout-dashboard", "action": { "type": "navigate", "to": "/dashboard" } },
 *         { "label": "Go to Settings", "icon": "settings", "shortcut": "Ctrl+,", "action": { "type": "navigate", "to": "/settings" } }
 *       ]
 *     }
 *   ]
 * }
 * ```
 */
export const commandPaletteConfigSchema = z
  .object({
    /** Component type discriminator. */
    type: z.literal("command-palette"),
    /** Search input placeholder text. Default: "Type a command...". */
    placeholder: z.string().optional(),
    /** Static command groups. */
    groups: z.array(commandGroupSchema).optional(),
    /** API endpoint for dynamic items. Supports FromRef. */
    data: dataSourceSchema.optional(),
    /** Auto-register labeled manifest shortcuts as commands. */
    autoRegisterShortcuts: z.boolean().default(true),
    /** Debounced remote search endpoint. */
    searchEndpoint: z
      .object({
        endpoint: endpointTargetSchema,
        debounce: z.number().int().positive().default(300),
        minLength: z.number().int().nonnegative().default(2),
      })
      .optional(),
    /** Persist and show recent commands. */
    recentItems: z
      .object({
        enabled: z.boolean().default(false),
        maxItems: z.number().int().positive().default(5),
      })
      .optional(),
    /** Keyboard shortcut used to open the palette. */
    shortcut: z.string().default("ctrl+k"),
    /** Message shown when search yields no results. Default: "No results found". */
    emptyMessage: z.string().optional(),
    /** Max height of the results list. Default: "300px". */
    maxHeight: z.string().optional(),
    // --- BaseComponentConfig fields ---
    /** Component id for publishing/subscribing. */
    id: z.string().optional(),
    /** Visibility toggle. Can be a FromRef for conditional display. */
    visible: z.union([z.boolean(), fromRefSchema]).optional(),
    /** Inline style overrides. */
    style: z.record(z.union([z.string(), z.number()])).optional(),
    /** Additional CSS class name. */
    className: z.string().optional(),
  })
  .strict();
