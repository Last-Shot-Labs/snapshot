import { z } from "zod";
/**
 * Zod config schema for the Avatar component.
 *
 * Defines all manifest-settable fields for a user/entity avatar
 * with image, initials, or icon fallback and optional status dot.
 *
 * @example
 * ```json
 * {
 *   "type": "avatar",
 *   "src": "https://example.com/photo.jpg",
 *   "name": "Jane Doe",
 *   "size": "lg",
 *   "status": "online"
 * }
 * ```
 */
export declare const avatarConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"avatar">;
    src: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    alt: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    icon: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodEnum<["xs", "sm", "md", "lg", "xl"]>>;
    shape: z.ZodOptional<z.ZodEnum<["circle", "square"]>>;
    status: z.ZodOptional<z.ZodEnum<["online", "offline", "busy", "away"]>>;
    color: z.ZodOptional<z.ZodEnum<["primary", "secondary", "muted", "accent"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"status" | "root" | "icon" | "fallback" | "image" | "initials", z.ZodOptional<z.ZodObject<{
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
        status?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fallback?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        image?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        initials?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        status?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fallback?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        image?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        initials?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    alt?: unknown;
    name?: unknown;
    icon?: unknown;
    size?: unknown;
    shape?: unknown;
    status?: unknown;
    color?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    alt?: unknown;
    name?: unknown;
    icon?: unknown;
    size?: unknown;
    shape?: unknown;
    status?: unknown;
    color?: unknown;
    slots?: unknown;
}>;
