import { z } from "zod";
export declare const oauthButtonsSlotNames: readonly ["root", "heading", "providerGroup", "provider", "providerIcon", "providerLabel", "providerDescription"];
export declare const oauthButtonsConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"oauth-buttons">;
    heading: z.ZodOptional<z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "heading" | "provider" | "providerGroup" | "providerIcon" | "providerLabel" | "providerDescription", z.ZodOptional<z.ZodObject<{
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
        heading?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        provider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerDescription?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        heading?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        provider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        providerDescription?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    heading?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    heading?: unknown;
    slots?: unknown;
}>;
