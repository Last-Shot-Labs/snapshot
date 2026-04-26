import { z } from "zod";
/**
 * Zod config schema for the Textarea component.
 *
 * Defines a multi-line text input with label, character count,
 * validation, and configurable resize behavior.
 *
 * @example
 * ```json
 * {
 *   "type": "textarea",
 *   "id": "bio-field",
 *   "label": "Bio",
 *   "placeholder": "Tell us about yourself...",
 *   "rows": 5,
 *   "maxLength": 500,
 *   "resize": "vertical"
 * }
 * ```
 */
export declare const textareaConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"textarea">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    rows: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    required: z.ZodOptional<z.ZodBoolean>;
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    readonly: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    helperText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    errorText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    resize: z.ZodOptional<z.ZodEnum<["none", "vertical", "horizontal", "both"]>>;
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
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "control" | "meta" | "requiredIndicator" | "helper" | "counter", z.ZodOptional<z.ZodObject<{
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
        control?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        meta?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        requiredIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        counter?: {
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
        control?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        meta?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        requiredIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        counter?: {
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
    rows?: unknown;
    maxLength?: unknown;
    required?: unknown;
    disabled?: unknown;
    readonly?: unknown;
    helperText?: unknown;
    errorText?: unknown;
    resize?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    value?: unknown;
    rows?: unknown;
    maxLength?: unknown;
    required?: unknown;
    disabled?: unknown;
    readonly?: unknown;
    helperText?: unknown;
    errorText?: unknown;
    resize?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
