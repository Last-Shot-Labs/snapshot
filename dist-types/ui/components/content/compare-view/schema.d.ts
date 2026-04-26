import { z } from "zod";
/**
 * Zod config schema for the CompareView component.
 *
 * Defines all manifest-settable fields for a side-by-side content
 * comparison view with diff highlighting.
 *
 * @example
 * ```json
 * {
 *   "type": "compare-view",
 *   "left": "Original text content",
 *   "right": "Modified text content",
 *   "leftLabel": "Before",
 *   "rightLabel": "After"
 * }
 * ```
 */
export declare const compareViewConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"compare-view">;
    left: z.ZodUnion<[z.ZodString, any]>;
    right: z.ZodUnion<[z.ZodString, any]>;
    leftLabel: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    rightLabel: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    maxHeight: z.ZodOptional<z.ZodString>;
    showLineNumbers: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "text" | "header" | "line" | "divider" | "prefix" | "leftLabel" | "rightLabel" | "panes" | "pane" | "lineNumber", z.ZodOptional<z.ZodObject<{
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
        text?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        line?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        divider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        prefix?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        leftLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rightLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panes?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        lineNumber?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        text?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        line?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        divider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        prefix?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        leftLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        rightLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panes?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        lineNumber?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    left?: unknown;
    right?: unknown;
    leftLabel?: unknown;
    rightLabel?: unknown;
    maxHeight?: unknown;
    showLineNumbers?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    left?: unknown;
    right?: unknown;
    leftLabel?: unknown;
    rightLabel?: unknown;
    maxHeight?: unknown;
    showLineNumbers?: unknown;
    slots?: unknown;
}>;
