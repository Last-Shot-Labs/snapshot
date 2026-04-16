import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";

/**
 * Slot declaration supported by layout variants that expose named slot areas.
 */
export const layoutSlotSchema = z
  .object({
    /** Slot name. */
    name: z.string().min(1),
    /** Whether this slot must be populated by the route. */
    required: z.boolean().default(false),
  })
  .strict();

/**
 * Zod schema for layout component configuration.
 * Defines the layout shell that wraps page content.
 */
export const layoutConfigSchema = extendComponentSchema({
  /** Component type discriminator. */
  type: z.literal("layout"),
  /** Layout variant determines the overall page structure. */
  variant: z.string().min(1).default("sidebar"),
  /** Custom sidebar width (CSS value). Default: 16rem. */
  sidebarWidth: z.string().optional(),
  /** Optional slot declarations supported by this layout. */
  slots: z.array(layoutSlotSchema).optional(),
})
  .strict();

/** Inferred layout config type from the Zod schema. */
export type LayoutConfig = z.infer<typeof layoutConfigSchema>;
