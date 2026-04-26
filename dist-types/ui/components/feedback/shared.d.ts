import { z } from "zod";
/**
 * Base config shape shared by feedback components.
 *
 * Feedback components are small manifest-driven views that may still accept the
 * common component wrapper props used elsewhere in the UI system.
 */
export declare const feedbackBaseConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodString;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
}>;
/** Shared config shape for the built-in feedback components. */
export type FeedbackBaseConfig = z.infer<typeof feedbackBaseConfigSchema>;
