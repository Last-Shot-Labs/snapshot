import { z } from "zod";
export declare const collapsibleSlotNames: readonly ["root", "trigger", "content"];
export declare const collapsibleConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"collapsible">;
    open: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>]>>;
    defaultOpen: z.ZodOptional<z.ZodBoolean>;
    trigger: z.ZodOptional<z.ZodType<any, z.ZodTypeDef, any>>;
    children: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    duration: z.ZodOptional<z.ZodEnum<["instant", "fast", "normal", "slow"]>>;
    publishTo: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "trigger", z.ZodOptional<z.ZodObject<{
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
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    open?: unknown;
    defaultOpen?: unknown;
    trigger?: unknown;
    children?: unknown;
    duration?: unknown;
    publishTo?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    open?: unknown;
    defaultOpen?: unknown;
    trigger?: unknown;
    children?: unknown;
    duration?: unknown;
    publishTo?: unknown;
    slots?: unknown;
}>;
