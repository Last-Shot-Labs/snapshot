import { z } from "zod";
/**
 * Zod config schema for the NotificationBell component.
 *
 * Defines all manifest-settable fields for a bell icon with
 * an unread count badge.
 *
 * @example
 * ```json
 * {
 *   "type": "notification-bell",
 *   "count": 5,
 *   "max": 99,
 *   "clickAction": { "type": "navigate", "to": "/notifications" }
 * }
 * ```
 */
export declare const notificationBellConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"notification-bell">;
    count: z.ZodOptional<z.ZodUnion<[z.ZodNumber, any]>>;
    max: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    clickAction: z.ZodOptional<z.ZodLazy<z.ZodPipeline<z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodAny>>>;
    ariaLive: z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "button" | "badge", z.ZodOptional<z.ZodObject<{
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
        button?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        badge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        button?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        badge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    count?: unknown;
    max?: unknown;
    size?: unknown;
    clickAction?: unknown;
    ariaLive?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    count?: unknown;
    max?: unknown;
    size?: unknown;
    clickAction?: unknown;
    ariaLive?: unknown;
    slots?: unknown;
}>;
