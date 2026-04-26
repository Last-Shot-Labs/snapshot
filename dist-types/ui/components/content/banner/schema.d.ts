import { z } from "zod";
export declare const bannerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"banner">;
    background: z.ZodOptional<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        overlay: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        color?: string | undefined;
        image?: string | undefined;
        overlay?: string | undefined;
    }, {
        color?: string | undefined;
        image?: string | undefined;
        overlay?: string | undefined;
    }>>;
    height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        default: z.ZodOptional<z.ZodString>;
        lg: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        lg?: string | undefined;
        default?: string | undefined;
    }, {
        lg?: string | undefined;
        default?: string | undefined;
    }>]>>;
    align: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    children: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "overlay", z.ZodOptional<z.ZodObject<{
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
        overlay?: {
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
        overlay?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    background?: unknown;
    height?: unknown;
    align?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    background?: unknown;
    height?: unknown;
    align?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
