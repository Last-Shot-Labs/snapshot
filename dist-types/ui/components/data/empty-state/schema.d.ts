import { z } from "zod";
/**
 * Zod config schema for the EmptyState component.
 *
 * Defines all manifest-settable fields for a placeholder shown
 * when there is no data to display.
 *
 * @example
 * ```json
 * {
 *   "type": "empty-state",
 *   "title": "No results found",
 *   "description": "Try adjusting your search or filters.",
 *   "icon": "search",
 *   "actionLabel": "Clear filters",
 *   "action": { "type": "set-value", "target": "filters", "value": {} }
 * }
 * ```
 */
export declare const emptyStateConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"empty-state">;
    title: z.ZodUnion<[z.ZodString, any]>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    icon: z.ZodOptional<z.ZodString>;
    action: any;
    actionLabel: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    iconColor: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "action" | "title" | "icon" | "description", z.ZodOptional<z.ZodObject<{
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
        action?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        action?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    icon?: unknown;
    action?: unknown;
    actionLabel?: unknown;
    size?: unknown;
    iconColor?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    icon?: unknown;
    action?: unknown;
    actionLabel?: unknown;
    size?: unknown;
    iconColor?: unknown;
    slots?: unknown;
}>;
