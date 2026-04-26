import { z } from "zod";
/**
 * Zod config schema for the QuickAdd component.
 *
 * Defines all manifest-settable fields for an inline creation bar
 * that allows quick item entry with a text input and submit button.
 *
 * @example
 * ```json
 * {
 *   "type": "quick-add",
 *   "placeholder": "Add a task...",
 *   "submitAction": { "type": "api", "method": "POST", "endpoint": "/api/tasks" },
 *   "clearOnSubmit": true
 * }
 * ```
 */
export declare const quickAddConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"quick-add">;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    icon: z.ZodOptional<z.ZodString>;
    on: z.ZodOptional<z.ZodObject<Pick<{
        submit: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        success: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        error: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    }, "submit">, "strict", z.ZodTypeAny, {
        [x: string]: any;
        submit?: unknown;
    }, {
        [x: string]: any;
        submit?: unknown;
    }>>;
    submitOnEnter: z.ZodOptional<z.ZodBoolean>;
    showButton: z.ZodOptional<z.ZodBoolean>;
    buttonText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    clearOnSubmit: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "root" | "icon" | "button", z.ZodOptional<z.ZodObject<{
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
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        button?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        button?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    icon?: unknown;
    on?: unknown;
    submitOnEnter?: unknown;
    showButton?: unknown;
    buttonText?: unknown;
    clearOnSubmit?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    icon?: unknown;
    on?: unknown;
    submitOnEnter?: unknown;
    showButton?: unknown;
    buttonText?: unknown;
    clearOnSubmit?: unknown;
    slots?: unknown;
}>;
