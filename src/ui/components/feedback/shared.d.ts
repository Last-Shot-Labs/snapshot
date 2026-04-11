import { z } from "zod";
/**
 * Base config shape shared by feedback components.
 *
 * Feedback components are small manifest-driven views that may still accept the
 * common component wrapper props used elsewhere in the UI system.
 */
export declare const feedbackBaseConfigSchema: z.ZodObject<{
    type: z.ZodString;
    className: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
}, "strict", z.ZodTypeAny, {
    type: string;
    style?: Record<string, string | number> | undefined;
    className?: string | undefined;
}, {
    type: string;
    style?: Record<string, string | number> | undefined;
    className?: string | undefined;
}>;
/** Shared config shape for the built-in feedback components. */
export type FeedbackBaseConfig = z.infer<typeof feedbackBaseConfigSchema>;
