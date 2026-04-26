import { z } from "zod";
export declare const hoverCardSlotNames: readonly ["root", "panel", "content"];
export declare const hoverCardConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"hover-card">;
    trigger: z.ZodType<any, z.ZodTypeDef, any>;
    content: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    align: z.ZodOptional<z.ZodEnum<["start", "center", "end"]>>;
    side: z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right"]>>;
    openDelay: z.ZodOptional<z.ZodNumber>;
    closeDelay: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "panel", z.ZodOptional<z.ZodObject<{
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
        panel?: {
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
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    trigger?: unknown;
    content?: unknown;
    align?: unknown;
    side?: unknown;
    openDelay?: unknown;
    closeDelay?: unknown;
    width?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    trigger?: unknown;
    content?: unknown;
    align?: unknown;
    side?: unknown;
    openDelay?: unknown;
    closeDelay?: unknown;
    width?: unknown;
    slots?: unknown;
}>;
