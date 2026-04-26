import { z } from "zod";
export declare const splitPaneSlotNames: readonly ["root", "pane", "firstPane", "secondPane", "divider"];
export declare const splitPaneConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"split-pane">;
    direction: z.ZodOptional<z.ZodEnum<["horizontal", "vertical"]>>;
    defaultSplit: z.ZodOptional<z.ZodNumber>;
    minSize: z.ZodOptional<z.ZodNumber>;
    children: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "divider" | "pane" | "firstPane" | "secondPane", z.ZodOptional<z.ZodObject<{
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
        divider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        firstPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        secondPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        divider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        firstPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        secondPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    direction?: unknown;
    defaultSplit?: unknown;
    minSize?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    direction?: unknown;
    defaultSplit?: unknown;
    minSize?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
