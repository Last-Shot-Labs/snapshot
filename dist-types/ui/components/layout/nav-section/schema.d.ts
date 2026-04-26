import { z } from "zod";
export declare const navSectionSlotNames: readonly ["root", "header", "headerLabel", "headerIcon", "content"];
export declare const navSectionConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"nav-section">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    collapsible: z.ZodOptional<z.ZodBoolean>;
    defaultCollapsed: z.ZodOptional<z.ZodBoolean>;
    items: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "header" | "headerIcon" | "headerLabel", z.ZodOptional<z.ZodObject<{
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
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        headerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        headerLabel?: {
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
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        headerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        headerLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    collapsible?: unknown;
    defaultCollapsed?: unknown;
    items?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    collapsible?: unknown;
    defaultCollapsed?: unknown;
    items?: unknown;
    slots?: unknown;
}>;
