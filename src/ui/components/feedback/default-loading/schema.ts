import { z } from "zod";
import { feedbackBaseConfigSchema } from "../shared";

/**
 * Manifest config for the default loading spinner.
 */
export const spinnerConfigSchema = feedbackBaseConfigSchema.extend({
  type: z.literal("spinner"),
  size: z.enum(["sm", "md", "lg"]).optional(),
  label: z.string().optional(),
});

export type SpinnerConfig = z.infer<typeof spinnerConfigSchema>;
