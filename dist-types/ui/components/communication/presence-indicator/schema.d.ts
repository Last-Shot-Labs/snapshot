import { z } from "zod";
/**
 * Zod config schema for the PresenceIndicator component.
 *
 * Displays an online/offline/away/busy/dnd status dot with optional label.
 *
 * @example
 * ```json
 * {
 *   "type": "presence-indicator",
 *   "status": "online",
 *   "label": "John Doe",
 *   "size": "md"
 * }
 * ```
 */
export declare const presenceIndicatorConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"presence-indicator">;
    status: z.ZodUnion<[z.ZodEnum<["online", "offline", "away", "busy", "dnd"]>, any]>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    showDot: z.ZodOptional<z.ZodBoolean>;
    showLabel: z.ZodOptional<z.ZodBoolean>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "dot", z.ZodOptional<z.ZodObject<{
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
        dot?: {
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
        dot?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    status?: unknown;
    label?: unknown;
    showDot?: unknown;
    showLabel?: unknown;
    size?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    status?: unknown;
    label?: unknown;
    showDot?: unknown;
    showLabel?: unknown;
    size?: unknown;
    slots?: unknown;
}>;
