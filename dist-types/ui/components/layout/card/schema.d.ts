import { z } from "zod";
export declare const cardConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"card">;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    subtitle: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    children: z.ZodDefault<z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">>;
    gap: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "content" | "subtitle" | "header", z.ZodOptional<z.ZodObject<{
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
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        subtitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        subtitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    subtitle?: unknown;
    children?: unknown;
    gap?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    subtitle?: unknown;
    children?: unknown;
    gap?: unknown;
    slots?: unknown;
}>;
