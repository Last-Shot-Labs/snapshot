import { z } from "zod";
export declare const rowConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"row">;
    children: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    gap: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>, z.ZodObject<{
        default: z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>;
        sm: z.ZodOptional<z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>>;
        md: z.ZodOptional<z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>>;
        lg: z.ZodOptional<z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>>;
        xl: z.ZodOptional<z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>>;
        "2xl": z.ZodOptional<z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>>;
    }, "strict", z.ZodTypeAny, {
        default: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs";
        lg?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        sm?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        md?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        xl?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        "2xl"?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
    }, {
        default: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs";
        lg?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        sm?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        md?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        xl?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
        "2xl"?: "lg" | "sm" | "md" | "none" | "xl" | "2xl" | "xs" | "2xs" | undefined;
    }>]>>;
    justify: z.ZodOptional<z.ZodEnum<["start", "center", "end", "between", "around"]>>;
    align: z.ZodOptional<z.ZodEnum<["start", "center", "end", "stretch"]>>;
    wrap: z.ZodOptional<z.ZodBoolean>;
    overflow: z.ZodOptional<z.ZodEnum<["auto", "hidden", "scroll", "visible"]>>;
    maxHeight: z.ZodOptional<z.ZodString>;
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
    children?: unknown;
    gap?: unknown;
    justify?: unknown;
    align?: unknown;
    wrap?: unknown;
    overflow?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    children?: unknown;
    gap?: unknown;
    justify?: unknown;
    align?: unknown;
    wrap?: unknown;
    overflow?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}>;
