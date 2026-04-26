import { z } from "zod";
/**
 * Inline code primitive schema for manifest-rendered code snippets.
 */
export declare const codeConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"code">;
    value: z.ZodUnion<[z.ZodString, any]>;
    fallback: z.ZodOptional<z.ZodString>;
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
    fallback?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    fallback?: unknown;
    slots?: unknown;
}>;
