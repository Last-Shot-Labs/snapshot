import { z } from "zod";
export declare const sectionConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"section">;
    height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEnum<["screen", "auto"]>]>>;
    align: z.ZodOptional<z.ZodEnum<["start", "center", "end", "stretch"]>>;
    justify: z.ZodOptional<z.ZodEnum<["start", "center", "end", "between", "around"]>>;
    bleed: z.ZodOptional<z.ZodBoolean>;
    children: z.ZodDefault<z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">>;
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
    height?: unknown;
    align?: unknown;
    justify?: unknown;
    bleed?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    height?: unknown;
    align?: unknown;
    justify?: unknown;
    bleed?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
