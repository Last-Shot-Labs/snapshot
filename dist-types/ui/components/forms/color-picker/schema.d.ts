import { z } from "zod";
/** Schema for color picker components with optional swatches, alpha, and change actions. */
export declare const colorPickerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"color-picker">;
    format: z.ZodDefault<z.ZodEnum<["hex", "rgb", "hsl"]>>;
    defaultValue: z.ZodOptional<z.ZodString>;
    swatches: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowCustom: z.ZodDefault<z.ZodBoolean>;
    showAlpha: z.ZodDefault<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
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
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "value" | "root" | "label" | "alpha" | "controls" | "picker" | "swatches" | "alphaLabel" | "alphaInput" | "swatch", z.ZodOptional<z.ZodObject<{
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
        value?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        alpha?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        controls?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        picker?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        swatches?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        alphaLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        alphaInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        swatch?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        value?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        alpha?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        controls?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        picker?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        swatches?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        alphaLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        alphaInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        swatch?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    format?: unknown;
    defaultValue?: unknown;
    swatches?: unknown;
    allowCustom?: unknown;
    showAlpha?: unknown;
    label?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    format?: unknown;
    defaultValue?: unknown;
    swatches?: unknown;
    allowCustom?: unknown;
    showAlpha?: unknown;
    label?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
