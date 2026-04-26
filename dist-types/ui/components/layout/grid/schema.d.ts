import { z } from "zod";
export declare const gridConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"grid">;
    areas: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
        default: z.ZodArray<z.ZodString, "many">;
        sm: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        md: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        lg: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        xl: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        "2xl": z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        default: string[];
        lg?: string[] | undefined;
        sm?: string[] | undefined;
        md?: string[] | undefined;
        xl?: string[] | undefined;
        "2xl"?: string[] | undefined;
    }, {
        default: string[];
        lg?: string[] | undefined;
        sm?: string[] | undefined;
        md?: string[] | undefined;
        xl?: string[] | undefined;
        "2xl"?: string[] | undefined;
    }>]>>;
    rows: z.ZodOptional<z.ZodString>;
    columns: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.ZodObject<{
        default: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        sm: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        md: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        lg: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        xl: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        "2xl": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "strict", z.ZodTypeAny, {
        default: string | number;
        lg?: string | number | undefined;
        sm?: string | number | undefined;
        md?: string | number | undefined;
        xl?: string | number | undefined;
        "2xl"?: string | number | undefined;
    }, {
        default: string | number;
        lg?: string | number | undefined;
        sm?: string | number | undefined;
        md?: string | number | undefined;
        xl?: string | number | undefined;
        "2xl"?: string | number | undefined;
    }>]>>;
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
    children: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
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
    areas?: unknown;
    rows?: unknown;
    columns?: unknown;
    gap?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    areas?: unknown;
    rows?: unknown;
    columns?: unknown;
    gap?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
