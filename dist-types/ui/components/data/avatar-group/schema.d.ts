import { z } from "zod";
/**
 * Zod config schema for the AvatarGroup component.
 *
 * Displays a row of overlapping avatars with an optional "+N" overflow
 * count. Commonly used for showing team members, assignees, or participants.
 *
 * @example
 * ```json
 * {
 *   "type": "avatar-group",
 *   "avatars": [
 *     { "name": "Alice", "src": "/avatars/alice.jpg" },
 *     { "name": "Bob" },
 *     { "name": "Charlie", "src": "/avatars/charlie.jpg" },
 *     { "name": "Diana" },
 *     { "name": "Eve" }
 *   ],
 *   "max": 3,
 *   "size": "md"
 * }
 * ```
 */
export declare const avatarGroupConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"avatar-group">;
    avatars: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Display name (used for initials fallback and tooltip). */
        name: z.ZodString;
        /** Image URL. */
        src: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        src?: string | undefined;
    }, {
        name: string;
        src?: string | undefined;
    }>, "many">>;
    data: any;
    nameField: z.ZodOptional<z.ZodString>;
    srcField: z.ZodOptional<z.ZodString>;
    max: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    overlap: z.ZodOptional<z.ZodNumber>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "overflow" | "item" | "image" | "initials", z.ZodOptional<z.ZodObject<{
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
        overflow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
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
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        overflow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
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
    avatars?: unknown;
    data?: unknown;
    nameField?: unknown;
    srcField?: unknown;
    max?: unknown;
    size?: unknown;
    overlap?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    avatars?: unknown;
    data?: unknown;
    nameField?: unknown;
    srcField?: unknown;
    max?: unknown;
    size?: unknown;
    overlap?: unknown;
    slots?: unknown;
}>;
