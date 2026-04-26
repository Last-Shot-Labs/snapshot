import { z } from "zod";
export declare const embedConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"embed">;
    url: z.ZodUnion<[z.ZodString, any]>;
    aspectRatio: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "frame", z.ZodOptional<z.ZodObject<{
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
        frame?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        frame?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    url?: unknown;
    aspectRatio?: unknown;
    title?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    url?: unknown;
    aspectRatio?: unknown;
    title?: unknown;
    slots?: unknown;
}>;
