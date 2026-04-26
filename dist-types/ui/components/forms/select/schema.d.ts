import { z } from "zod";
export declare const selectConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"select">;
    options: z.ZodUnion<[z.ZodArray<z.ZodObject<{
        label: z.ZodUnion<[z.ZodString, any]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        value?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        value?: unknown;
    }>, "many">, any]>;
    valueField: z.ZodOptional<z.ZodString>;
    labelField: z.ZodOptional<z.ZodString>;
    default: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
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
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "control" | "requiredIndicator" | "helper", z.ZodOptional<z.ZodObject<{
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
        requiredIndicator?: {
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
        control?: {
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
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    options?: unknown;
    valueField?: unknown;
    labelField?: unknown;
    default?: unknown;
    placeholder?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    options?: unknown;
    valueField?: unknown;
    labelField?: unknown;
    default?: unknown;
    placeholder?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
