import { z } from "zod";
export declare const dividerSlotNames: readonly ["root", "label", "lineStart", "lineEnd"];
export declare const dividerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"divider">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>>;
    orientation: z.ZodDefault<z.ZodEnum<["horizontal", "vertical"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "lineStart" | "lineEnd", z.ZodOptional<z.ZodObject<{
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
        lineStart?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        lineEnd?: {
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
        lineStart?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        lineEnd?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    orientation?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    orientation?: unknown;
    slots?: unknown;
}>;
