import { z } from "zod";
import {
  baseComponentConfigSchema,
  componentConfigSchema,
  fromRefSchema,
} from "../../../manifest/schema";

/**
 * Zod config schema for the Tooltip component.
 *
 * Wraps child components and shows a tooltip on hover with
 * configurable placement and delay.
 *
 * @example
 * ```json
 * {
 *   "type": "tooltip",
 *   "text": "Click to view details",
 *   "placement": "top",
 *   "content": [{ "type": "button", "label": "View", "action": { "type": "navigate", "to": "/details" } }]
 * }
 * ```
 */
export const tooltipConfigSchema = baseComponentConfigSchema.extend({
  /** Component type discriminator. */
  type: z.literal("tooltip"),
  /** Tooltip text content. Supports FromRef for dynamic text. */
  text: z.union([z.string(), fromRefSchema]),
  /** Child components wrapped by the tooltip trigger. */
  content: z.array(componentConfigSchema).min(1),
  /** Position of the tooltip relative to the trigger. */
  placement: z.enum(["top", "bottom", "left", "right"]).optional(),
  /** Show delay in milliseconds. */
  delay: z.number().optional(),
  /** Inline style overrides. */
  style: z.record(z.union([z.string(), z.number()])).optional(),
  /** Additional CSS class name. */
  className: z.string().optional(),
});
