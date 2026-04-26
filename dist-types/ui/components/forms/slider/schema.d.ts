import { z } from "zod";
/** Schema for single-value and ranged slider controls with optional value display/actions. */
export declare const sliderConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"slider">;
    min: z.ZodDefault<z.ZodNumber>;
    max: z.ZodDefault<z.ZodNumber>;
    step: z.ZodDefault<z.ZodNumber>;
    defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    range: z.ZodDefault<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    showValue: z.ZodDefault<z.ZodBoolean>;
    showLimits: z.ZodDefault<z.ZodBoolean>;
    suffix: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
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
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "value" | "fill" | "root" | "label" | "header" | "track" | "rail" | "inputStart" | "inputEnd" | "limits" | "minLabel" | "maxLabel", z.ZodOptional<z.ZodObject<{
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
        fill?: {
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
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rail?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputStart?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputEnd?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        limits?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        minLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        maxLabel?: {
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
        fill?: {
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
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rail?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputStart?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputEnd?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        limits?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        minLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        maxLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    min?: unknown;
    max?: unknown;
    step?: unknown;
    defaultValue?: unknown;
    range?: unknown;
    label?: unknown;
    showValue?: unknown;
    showLimits?: unknown;
    suffix?: unknown;
    on?: unknown;
    disabled?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    min?: unknown;
    max?: unknown;
    step?: unknown;
    defaultValue?: unknown;
    range?: unknown;
    label?: unknown;
    showValue?: unknown;
    showLimits?: unknown;
    suffix?: unknown;
    on?: unknown;
    disabled?: unknown;
    slots?: unknown;
}>;
