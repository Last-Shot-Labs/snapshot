import { z } from "zod";
/**
 * Zod config schema for the Separator component.
 *
 * A simple visual divider line, either horizontal or vertical.
 * Optionally renders a centered label between the lines.
 *
 * @example
 * ```json
 * {
 *   "type": "separator",
 *   "orientation": "horizontal",
 *   "label": "Or continue with"
 * }
 * ```
 */
export declare const separatorConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"separator">;
    orientation: z.ZodOptional<z.ZodEnum<["horizontal", "vertical"]>>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "line", z.ZodOptional<z.ZodObject<{
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
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        line?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
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
    orientation?: unknown;
    label?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    orientation?: unknown;
    label?: unknown;
    slots?: unknown;
}>;
