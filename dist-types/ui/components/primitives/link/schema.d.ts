import { z } from "zod";
export declare const linkSlotNames: readonly ["root", "label", "icon", "badge"];
export declare const linkConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"link">;
    text: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>;
    to: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>]>;
    icon: z.ZodOptional<z.ZodString>;
    badge: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>>;
    external: z.ZodDefault<z.ZodBoolean>;
    disabled: z.ZodOptional<z.ZodBoolean>;
    current: z.ZodOptional<z.ZodBoolean>;
    matchChildren: z.ZodDefault<z.ZodBoolean>;
    align: z.ZodDefault<z.ZodEnum<["left", "center", "right"]>>;
    variant: z.ZodDefault<z.ZodEnum<["default", "muted", "button", "navigation"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon" | "badge", z.ZodOptional<z.ZodObject<{
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
        badge?: {
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
        badge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    to?: unknown;
    icon?: unknown;
    badge?: unknown;
    external?: unknown;
    disabled?: unknown;
    current?: unknown;
    matchChildren?: unknown;
    align?: unknown;
    variant?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    to?: unknown;
    icon?: unknown;
    badge?: unknown;
    external?: unknown;
    disabled?: unknown;
    current?: unknown;
    matchChildren?: unknown;
    align?: unknown;
    variant?: unknown;
    slots?: unknown;
}>;
