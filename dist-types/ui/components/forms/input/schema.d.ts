import { z } from "zod";
/**
 * Zod config schema for the Input component.
 *
 * Defines a standalone text input field with label, placeholder,
 * validation, and optional icon.
 *
 * @example
 * ```json
 * {
 *   "type": "input",
 *   "id": "email-field",
 *   "label": "Email",
 *   "inputType": "email",
 *   "placeholder": "you@example.com",
 *   "required": true,
 *   "helperText": "We'll never share your email"
 * }
 * ```
 */
export declare const inputConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"input">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    inputType: z.ZodOptional<z.ZodEnum<["text", "email", "password", "number", "url", "tel", "search"]>>;
    required: z.ZodOptional<z.ZodBoolean>;
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    readonly: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    pattern: z.ZodOptional<z.ZodString>;
    helperText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    errorText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    icon: z.ZodOptional<z.ZodString>;
    on: z.ZodOptional<z.ZodObject<{
        click: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        focus: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        blur: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        keyDown: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        mouseEnter: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        mouseLeave: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    } & {
        pointerDown: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        pointerUp: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        touchStart: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        touchEnd: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    } & {
        change: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        input: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        click?: unknown;
        focus?: unknown;
        blur?: unknown;
        keyDown?: unknown;
        mouseEnter?: unknown;
        mouseLeave?: unknown;
        pointerDown?: unknown;
        pointerUp?: unknown;
        touchStart?: unknown;
        touchEnd?: unknown;
        change?: unknown;
        input?: unknown;
    }, {
        [x: string]: any;
        click?: unknown;
        focus?: unknown;
        blur?: unknown;
        keyDown?: unknown;
        mouseEnter?: unknown;
        mouseLeave?: unknown;
        pointerDown?: unknown;
        pointerUp?: unknown;
        touchStart?: unknown;
        touchEnd?: unknown;
        change?: unknown;
        input?: unknown;
    }>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon" | "control" | "requiredIndicator" | "field" | "helper", z.ZodOptional<z.ZodObject<{
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
        control?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        requiredIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
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
        control?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        requiredIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    value?: unknown;
    inputType?: unknown;
    required?: unknown;
    disabled?: unknown;
    readonly?: unknown;
    maxLength?: unknown;
    pattern?: unknown;
    helperText?: unknown;
    errorText?: unknown;
    icon?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    value?: unknown;
    inputType?: unknown;
    required?: unknown;
    disabled?: unknown;
    readonly?: unknown;
    maxLength?: unknown;
    pattern?: unknown;
    helperText?: unknown;
    errorText?: unknown;
    icon?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
