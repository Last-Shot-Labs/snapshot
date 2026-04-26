import { z } from "zod";
export declare const boxConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"box">;
    as: z.ZodOptional<z.ZodEnum<["div", "section", "article", "aside", "header", "footer", "main", "nav", "span"]>>;
    children: z.ZodOptional<z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">>;
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
    as?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    as?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
