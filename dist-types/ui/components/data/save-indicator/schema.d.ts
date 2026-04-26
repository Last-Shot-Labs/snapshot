import { z } from "zod";
/**
 * Zod config schema for the SaveIndicator component.
 *
 * Defines all manifest-settable fields for a save status indicator
 * that shows idle, saving, saved, or error states.
 *
 * @example
 * ```json
 * {
 *   "type": "save-indicator",
 *   "status": { "from": "my-form.saveStatus" },
 *   "savedText": "All changes saved",
 *   "showIcon": true
 * }
 * ```
 */
export declare const saveIndicatorConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"save-indicator">;
    status: z.ZodUnion<[z.ZodEnum<["idle", "saving", "saved", "error"]>, any]>;
    savedText: z.ZodOptional<z.ZodString>;
    savingText: z.ZodOptional<z.ZodString>;
    errorText: z.ZodOptional<z.ZodString>;
    showIcon: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon", z.ZodOptional<z.ZodObject<{
        [x: string]: any;
    } & {
        states: z.ZodOptional<z.ZodRecord<any, z.ZodObject<{
            [x: string]: z.ZodOptional<any>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
        }, {
            [x: string]: any;
        }>>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        states?: unknown;
    }, {
        [x: string]: any;
        states?: unknown;
    }>>>, "strict", z.ZodTypeAny, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    status?: unknown;
    savedText?: unknown;
    savingText?: unknown;
    errorText?: unknown;
    showIcon?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    status?: unknown;
    savedText?: unknown;
    savingText?: unknown;
    errorText?: unknown;
    showIcon?: unknown;
    slots?: unknown;
}>;
