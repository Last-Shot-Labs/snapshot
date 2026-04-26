import { z } from "zod";
/**
 * Zod config schema for the ScrollArea component.
 *
 * A scrollable container with custom-styled thin scrollbars
 * that respect the design token system.
 *
 * @example
 * ```json
 * {
 *   "type": "scroll-area",
 *   "maxHeight": "300px",
 *   "orientation": "vertical",
 *   "showScrollbar": "hover",
 *   "content": [
 *     { "type": "heading", "text": "Long list..." }
 *   ]
 * }
 * ```
 */
export declare const scrollAreaConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"scroll-area">;
    maxHeight: z.ZodOptional<z.ZodString>;
    maxWidth: z.ZodOptional<z.ZodString>;
    orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal", "both"]>>;
    showScrollbar: z.ZodOptional<z.ZodEnum<["always", "hover", "auto"]>>;
    content: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "viewport", z.ZodOptional<z.ZodObject<{
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
        viewport?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        viewport?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    orientation?: unknown;
    showScrollbar?: unknown;
    content?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    orientation?: unknown;
    showScrollbar?: unknown;
    content?: unknown;
    slots?: unknown;
}>;
