import { z } from "zod";

/**
 * Zod schema for layout component configuration.
 * Defines the layout shell that wraps page content.
 */
export const layoutConfigSchema = z
  .object({
    /** Component type discriminator. */
    type: z.literal("layout"),
    /** Layout variant determines the overall page structure. */
    variant: z.enum(["sidebar", "top-nav", "minimal", "full-width"]),
  })
  .strict();

/** Inferred layout config type from the Zod schema. */
export type LayoutConfig = z.infer<typeof layoutConfigSchema>;
