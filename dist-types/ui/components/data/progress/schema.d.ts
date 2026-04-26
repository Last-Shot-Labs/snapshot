import { z } from "zod";
/**
 * Zod config schema for the Progress component.
 *
 * Defines all manifest-settable fields for a progress bar/ring
 * that displays determinate or indeterminate progress.
 *
 * @example
 * ```json
 * {
 *   "type": "progress",
 *   "value": 65,
 *   "label": "Upload progress",
 *   "showValue": true,
 *   "color": "primary"
 * }
 * ```
 */
export declare const progressConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"progress">;
    value: z.ZodOptional<z.ZodUnion<[z.ZodNumber, any]>>;
    max: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    showValue: z.ZodOptional<z.ZodBoolean>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    color: z.ZodOptional<z.ZodEnum<["primary", "secondary", "accent", "destructive", "success", "warning", "info"]>>;
    variant: z.ZodOptional<z.ZodEnum<["bar", "circular"]>>;
    segments: z.ZodOptional<z.ZodNumber>;
    slots: z.ZodOptional<z.ZodObject<Record<"value" | "fill" | "root" | "label" | "track" | "labelRow" | "circularContainer" | "circularSvg" | "segmentsRow" | "segment" | "circularTrack" | "circularFill", z.ZodOptional<z.ZodObject<{
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
        value?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        labelRow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularContainer?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularSvg?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        segmentsRow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        segment?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularTrack?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularFill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        value?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        labelRow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularContainer?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularSvg?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        segmentsRow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        segment?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularTrack?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        circularFill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    max?: unknown;
    label?: unknown;
    showValue?: unknown;
    size?: unknown;
    color?: unknown;
    variant?: unknown;
    segments?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    max?: unknown;
    label?: unknown;
    showValue?: unknown;
    size?: unknown;
    color?: unknown;
    variant?: unknown;
    segments?: unknown;
    slots?: unknown;
}>;
