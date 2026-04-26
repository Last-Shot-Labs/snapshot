import { z } from "zod";
export declare const textSlotNames: readonly ["root"];
export declare const textConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"text">;
    value: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>;
    variant: z.ZodDefault<z.ZodEnum<["default", "muted", "subtle"]>>;
    size: z.ZodDefault<z.ZodEnum<["xs", "sm", "md", "lg"]>>;
    weight: z.ZodDefault<z.ZodEnum<["light", "normal", "medium", "semibold", "bold"]>>;
    align: z.ZodDefault<z.ZodEnum<["left", "center", "right"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root", z.ZodOptional<z.ZodObject<{
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
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    variant?: unknown;
    size?: unknown;
    weight?: unknown;
    align?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    variant?: unknown;
    size?: unknown;
    weight?: unknown;
    align?: unknown;
    slots?: unknown;
}>;
