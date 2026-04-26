import { z } from "zod";
/**
 * Zod config schema for the Badge component.
 *
 * Defines all manifest-settable fields for a badge/pill element
 * used for labels, statuses, and counts.
 *
 * @example
 * ```json
 * {
 *   "type": "badge",
 *   "text": "Active",
 *   "color": "success",
 *   "variant": "soft"
 * }
 * ```
 */
export declare const badgeConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"badge">;
    text: z.ZodUnion<[z.ZodString, any]>;
    color: z.ZodOptional<z.ZodEnum<["primary", "secondary", "muted", "accent", "destructive", "success", "warning", "info"]>>;
    variant: z.ZodOptional<z.ZodEnum<["solid", "soft", "outline", "dot"]>>;
    size: z.ZodOptional<z.ZodEnum<["xs", "sm", "md", "lg"]>>;
    icon: z.ZodOptional<z.ZodString>;
    rounded: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon" | "dot", z.ZodOptional<z.ZodObject<{
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
        dot?: {
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
        dot?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    color?: unknown;
    variant?: unknown;
    size?: unknown;
    icon?: unknown;
    rounded?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    color?: unknown;
    variant?: unknown;
    size?: unknown;
    icon?: unknown;
    rounded?: unknown;
    slots?: unknown;
}>;
