import { z } from "zod";
export declare const primitiveExprSchema: z.ZodObject<{
    expr: z.ZodString;
}, "strict", z.ZodTypeAny, {
    expr: string;
}, {
    expr: string;
}>;
export declare const primitiveTextValueSchema: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
    expr: z.ZodString;
}, "strict", z.ZodTypeAny, {
    expr: string;
}, {
    expr: string;
}>, any]>;
export declare const primitiveStringValueSchema: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
    expr: z.ZodString;
}, "strict", z.ZodTypeAny, {
    expr: string;
}, {
    expr: string;
}>]>;
export declare const primitiveDisplayValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, any, any, z.ZodObject<{
    expr: z.ZodString;
}, "strict", z.ZodTypeAny, {
    expr: string;
}, {
    expr: string;
}>, any]>;
