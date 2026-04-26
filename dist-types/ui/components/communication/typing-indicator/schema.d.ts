import { z } from "zod";
/**
 * Zod config schema for the TypingIndicator component.
 *
 * Displays an animated "User is typing..." indicator with bouncing dots.
 *
 * @example
 * ```json
 * {
 *   "type": "typing-indicator",
 *   "users": [{ "name": "Alice" }, { "name": "Bob" }]
 * }
 * ```
 */
export declare const typingIndicatorConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"typing-indicator">;
    users: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        avatar: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        avatar?: string | undefined;
    }, {
        name: string;
        avatar?: string | undefined;
    }>, "many">, any]>>;
    maxDisplay: z.ZodOptional<z.ZodNumber>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "text" | "dot" | "dots", z.ZodOptional<z.ZodObject<{
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
        dot?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dots?: {
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
        dot?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dots?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    users?: unknown;
    maxDisplay?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    users?: unknown;
    maxDisplay?: unknown;
    slots?: unknown;
}>;
