import { z } from "zod";
export declare const spacerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"spacer">;
    size: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]>, z.ZodString]>>;
    axis: z.ZodDefault<z.ZodEnum<["horizontal", "vertical"]>>;
    flex: z.ZodOptional<z.ZodBoolean>;
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
    size?: unknown;
    axis?: unknown;
    flex?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    size?: unknown;
    axis?: unknown;
    flex?: unknown;
    slots?: unknown;
}>;
