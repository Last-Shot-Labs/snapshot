import { z } from "zod";
/**
 * Zod config schema for the Alert component.
 *
 * Defines all manifest-settable fields for a notification banner/alert
 * with icon, title, description, and optional action button.
 *
 * @example
 * ```json
 * {
 *   "type": "alert",
 *   "title": "Success",
 *   "description": "Your changes have been saved.",
 *   "variant": "success",
 *   "dismissible": true
 * }
 * ```
 */
export declare const alertConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"alert">;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodUnion<[z.ZodString, any]>;
    variant: z.ZodOptional<z.ZodEnum<["info", "success", "warning", "destructive", "default"]>>;
    icon: z.ZodOptional<z.ZodString>;
    dismissible: z.ZodOptional<z.ZodBoolean>;
    action: any;
    actionLabel: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "action" | "title" | "icon" | "description" | "content" | "dismiss", z.ZodOptional<z.ZodObject<{
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
        action?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dismiss?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        action?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dismiss?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    variant?: unknown;
    icon?: unknown;
    dismissible?: unknown;
    action?: unknown;
    actionLabel?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    variant?: unknown;
    icon?: unknown;
    dismissible?: unknown;
    action?: unknown;
    actionLabel?: unknown;
    slots?: unknown;
}>;
