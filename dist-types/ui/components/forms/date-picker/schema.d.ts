import { z } from "zod";
/** Schema for date picker components covering single, range, and multi-date selection. */
export declare const datePickerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"date-picker">;
    mode: z.ZodDefault<z.ZodEnum<["single", "range", "multiple"]>>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    min: z.ZodOptional<z.ZodString>;
    max: z.ZodOptional<z.ZodString>;
    disabledDates: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
        dayOfWeek: z.ZodArray<z.ZodNumber, "many">;
    }, "strict", z.ZodTypeAny, {
        dayOfWeek: number[];
    }, {
        dayOfWeek: number[];
    }>]>, "many">>;
    presets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodUnion<[z.ZodString, any]>;
        start: z.ZodString;
        end: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        start?: unknown;
        end?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        start?: unknown;
        end?: unknown;
    }>, "many">>;
    format: z.ZodOptional<z.ZodString>;
    valueFormat: z.ZodDefault<z.ZodEnum<["iso", "unix", "locale"]>>;
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
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "summary" | "range" | "multiple" | "presets" | "presetButton" | "singleInput" | "rangeStart" | "rangeEnd" | "multipleEntry" | "multipleInput" | "multipleAddButton" | "multipleValues" | "multipleValue", z.ZodOptional<z.ZodObject<{
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
        summary?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        range?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multiple?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        presets?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        presetButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        singleInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rangeStart?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rangeEnd?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleEntry?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleAddButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleValues?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleValue?: {
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
        summary?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        range?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multiple?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        presets?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        presetButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        singleInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rangeStart?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rangeEnd?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleEntry?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleAddButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleValues?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        multipleValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    mode?: unknown;
    label?: unknown;
    placeholder?: unknown;
    min?: unknown;
    max?: unknown;
    disabledDates?: unknown;
    presets?: unknown;
    format?: unknown;
    valueFormat?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    mode?: unknown;
    label?: unknown;
    placeholder?: unknown;
    min?: unknown;
    max?: unknown;
    disabledDates?: unknown;
    presets?: unknown;
    format?: unknown;
    valueFormat?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
