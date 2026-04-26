import { z } from "zod";
/**
 * Zod config schema for the CodeBlock component.
 *
 * Defines all manifest-settable fields for a code display block
 * with optional copy button and line numbers.
 *
 * @example
 * ```json
 * {
 *   "type": "code-block",
 *   "code": "const x = 42;",
 *   "language": "typescript",
 *   "showLineNumbers": true,
 *   "title": "example.ts"
 * }
 * ```
 */
export declare const codeBlockConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"code-block">;
    code: z.ZodUnion<[z.ZodString, any]>;
    language: z.ZodOptional<z.ZodString>;
    highlight: z.ZodOptional<z.ZodBoolean>;
    showLineNumbers: z.ZodOptional<z.ZodBoolean>;
    showCopy: z.ZodOptional<z.ZodBoolean>;
    maxHeight: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    wrap: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"code" | "root" | "title" | "body" | "pre" | "copyButton" | "language" | "titleBar" | "titleMeta" | "lineNumbers", z.ZodOptional<z.ZodObject<{
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
        code?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        body?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pre?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        copyButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        language?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        titleBar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        titleMeta?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        lineNumbers?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        code?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        body?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pre?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        copyButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        language?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        titleBar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        titleMeta?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        lineNumbers?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    code?: unknown;
    language?: unknown;
    highlight?: unknown;
    showLineNumbers?: unknown;
    showCopy?: unknown;
    maxHeight?: unknown;
    title?: unknown;
    wrap?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    code?: unknown;
    language?: unknown;
    highlight?: unknown;
    showLineNumbers?: unknown;
    showCopy?: unknown;
    maxHeight?: unknown;
    title?: unknown;
    wrap?: unknown;
    slots?: unknown;
}>;
