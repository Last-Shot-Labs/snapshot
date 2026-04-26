import { z } from "zod";
export declare const tooltipSlotNames: readonly ["root", "content", "arrow"];
/**
 * Zod config schema for the Tooltip component.
 *
 * Wraps child components and shows a tooltip on hover with
 * configurable placement and delay.
 *
 * @example
 * ```json
 * {
 *   "type": "tooltip",
 *   "text": "Click to view details",
 *   "placement": "top",
 *   "content": [{ "type": "button", "label": "View", "action": { "type": "navigate", "to": "/details" } }]
 * }
 * ```
 */
export declare const tooltipConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"tooltip">;
    text: z.ZodUnion<[z.ZodString, any]>;
    content: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    placement: z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right"]>>;
    delay: z.ZodOptional<z.ZodNumber>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "arrow", z.ZodOptional<z.ZodObject<{
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
        arrow?: {
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
        arrow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    content?: unknown;
    placement?: unknown;
    delay?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    content?: unknown;
    placement?: unknown;
    delay?: unknown;
    slots?: unknown;
}>;
