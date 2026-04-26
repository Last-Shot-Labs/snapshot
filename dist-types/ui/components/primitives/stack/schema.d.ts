import { z } from "zod";
export declare const stackSlotNames: readonly ["root", "item"];
export declare const stackConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"stack">;
    children: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    gap: z.ZodDefault<z.ZodEnum<["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]>>;
    align: z.ZodDefault<z.ZodEnum<["stretch", "start", "center", "end"]>>;
    justify: z.ZodDefault<z.ZodEnum<["start", "center", "end", "between", "around"]>>;
    maxWidth: z.ZodOptional<z.ZodEnum<["xs", "sm", "md", "lg", "xl", "2xl", "full"]>>;
    padding: z.ZodOptional<z.ZodEnum<["none", "sm", "md", "lg", "xl"]>>;
    overflow: z.ZodOptional<z.ZodEnum<["auto", "hidden", "scroll", "visible"]>>;
    maxHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        default: z.ZodString;
        sm: z.ZodOptional<z.ZodString>;
        md: z.ZodOptional<z.ZodString>;
        lg: z.ZodOptional<z.ZodString>;
        xl: z.ZodOptional<z.ZodString>;
        "2xl": z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        default: string;
        lg?: string | undefined;
        sm?: string | undefined;
        md?: string | undefined;
        xl?: string | undefined;
        "2xl"?: string | undefined;
    }, {
        default: string;
        lg?: string | undefined;
        sm?: string | undefined;
        md?: string | undefined;
        xl?: string | undefined;
        "2xl"?: string | undefined;
    }>]>>;
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
    align?: unknown;
    justify?: unknown;
    maxWidth?: unknown;
    padding?: unknown;
    overflow?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    children?: unknown;
    gap?: unknown;
    align?: unknown;
    justify?: unknown;
    maxWidth?: unknown;
    padding?: unknown;
    overflow?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}>;
