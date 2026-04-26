import { z } from "zod";
/**
 * Zod config schema for the Skeleton component.
 *
 * Defines all manifest-settable fields for a loading placeholder
 * that can substitute any content shape.
 *
 * @example
 * ```json
 * {
 *   "type": "skeleton",
 *   "variant": "text",
 *   "lines": 4,
 *   "animated": true
 * }
 * ```
 */
export declare const skeletonConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"skeleton">;
    variant: z.ZodOptional<z.ZodEnum<["text", "circular", "rectangular", "card"]>>;
    width: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    lines: z.ZodOptional<z.ZodNumber>;
    animated: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"shape" | "root" | "title" | "body" | "line", z.ZodOptional<z.ZodObject<{
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
        shape?: {
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
        line?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        shape?: {
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
        line?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    variant?: unknown;
    width?: unknown;
    height?: unknown;
    lines?: unknown;
    animated?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    variant?: unknown;
    width?: unknown;
    height?: unknown;
    lines?: unknown;
    animated?: unknown;
    slots?: unknown;
}>;
