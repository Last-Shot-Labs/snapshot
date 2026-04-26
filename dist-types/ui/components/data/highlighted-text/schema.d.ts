import { z } from "zod";
/**
 * Zod config schema for the HighlightedText component.
 *
 * Renders text with search query highlighting. Matching portions are
 * wrapped in `<mark>` elements with a configurable highlight color.
 *
 * @example
 * ```json
 * {
 *   "type": "highlighted-text",
 *   "text": "The quick brown fox jumps over the lazy dog",
 *   "highlight": "fox"
 * }
 * ```
 */
export declare const highlightedTextConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"highlighted-text">;
    text: z.ZodUnion<[z.ZodString, any]>;
    highlight: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    highlightColor: z.ZodOptional<z.ZodString>;
    caseSensitive: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "mark", z.ZodOptional<z.ZodObject<{
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
        mark?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        mark?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    highlight?: unknown;
    highlightColor?: unknown;
    caseSensitive?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    highlight?: unknown;
    highlightColor?: unknown;
    caseSensitive?: unknown;
    slots?: unknown;
}>;
