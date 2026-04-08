import { z } from "zod";
import { fromRefSchema, componentConfigSchema } from "../../../manifest/schema";

/**
 * Schema for a single step within the stepper.
 */
export const stepConfigSchema = z.object({
  /** Display title for this step. */
  title: z.string(),
  /** Optional description text. */
  description: z.string().optional(),
  /** Lucide icon name (overrides the step number). */
  icon: z.string().optional(),
  /** Child components rendered when this step is active. */
  content: z.array(componentConfigSchema).optional(),
});

/**
 * Zod config schema for the Stepper component.
 *
 * Defines all manifest-settable fields for a multi-step progress indicator.
 *
 * @example
 * ```json
 * {
 *   "type": "stepper",
 *   "steps": [
 *     { "title": "Account", "description": "Create your account" },
 *     { "title": "Profile", "description": "Fill in details" },
 *     { "title": "Review", "description": "Confirm everything" }
 *   ],
 *   "activeStep": 1
 * }
 * ```
 */
export const stepperConfigSchema = z
  .object({
    /** Component type discriminator. */
    type: z.literal("stepper"),
    /** Array of step definitions. At least one required. */
    steps: z.array(stepConfigSchema).min(1),
    /** Index of the currently active step. Supports FromRef. Default: 0. */
    activeStep: z.union([z.number(), fromRefSchema]).optional(),
    /** Layout orientation. Default: "horizontal". */
    orientation: z.enum(["horizontal", "vertical"]).optional(),
    /** Visual variant. Default: "default". */
    variant: z.enum(["default", "simple", "dots"]).optional(),
    /** Whether steps are clickable to navigate. Default: false. */
    clickable: z.boolean().optional(),
    // --- BaseComponentConfig fields ---
    /** Component id for publishing/subscribing. */
    id: z.string().optional(),
    /** Visibility toggle. */
    visible: z.union([z.boolean(), fromRefSchema]).optional(),
    /** Inline style overrides. */
    style: z.record(z.union([z.string(), z.number()])).optional(),
    /** Additional CSS class name. */
    className: z.string().optional(),
  })
  .strict();
