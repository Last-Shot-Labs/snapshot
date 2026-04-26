import { z } from "zod";
/**
 * Zod config schema for the FavoriteButton component.
 *
 * Defines all manifest-settable fields for a star toggle button
 * used to mark items as favorites.
 *
 * @example
 * ```json
 * {
 *   "type": "favorite-button",
 *   "active": false,
 *   "size": "md",
 *   "toggleAction": { "type": "api", "method": "POST", "endpoint": "/api/favorites" }
 * }
 * ```
 */
export declare const favoriteButtonConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"favorite-button">;
    active: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    toggleAction: any;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "icon", z.ZodOptional<z.ZodObject<{
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
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    active?: unknown;
    size?: unknown;
    toggleAction?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    active?: unknown;
    size?: unknown;
    toggleAction?: unknown;
    slots?: unknown;
}>;
