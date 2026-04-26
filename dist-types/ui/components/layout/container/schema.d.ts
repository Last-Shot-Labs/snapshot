import { z } from "zod";
export declare const containerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"container">;
    maxWidth: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["xs", "sm", "md", "lg", "xl", "2xl", "full", "prose"]>, z.ZodNumber]>>;
    padding: z.ZodDefault<z.ZodEnum<["none", "xs", "sm", "md", "lg", "xl"]>>;
    center: z.ZodDefault<z.ZodBoolean>;
    children: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "item", z.ZodOptional<z.ZodObject<{
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
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    maxWidth?: unknown;
    padding?: unknown;
    center?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    maxWidth?: unknown;
    padding?: unknown;
    center?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
