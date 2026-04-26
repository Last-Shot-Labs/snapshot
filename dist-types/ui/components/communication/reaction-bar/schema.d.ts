import { z } from "zod";
/**
 * Zod config schema for the ReactionBar component.
 *
 * Displays emoji reactions with counts and an add button.
 *
 * @example
 * ```json
 * {
 *   "type": "reaction-bar",
 *   "reactions": [
 *     { "emoji": "\ud83d\udc4d", "count": 5, "active": true },
 *     { "emoji": "\u2764\ufe0f", "count": 3 },
 *     { "emoji": "\ud83d\ude02", "count": 2 }
 *   ]
 * }
 * ```
 */
export declare const reactionBarConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"reaction-bar">;
    reactions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Emoji character. */
        emoji: z.ZodString;
        /** Number of reactions. */
        count: z.ZodNumber;
        /** Whether the current user reacted. */
        active: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        emoji: string;
        count: number;
        active?: boolean | undefined;
    }, {
        emoji: string;
        count: number;
        active?: boolean | undefined;
    }>, "many">>;
    data: any;
    addAction: any;
    removeAction: any;
    showAddButton: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "emoji" | "count" | "reaction" | "addWrapper" | "addButton" | "picker", z.ZodOptional<z.ZodObject<{
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
        emoji?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        count?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        reaction?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        addWrapper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        addButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        picker?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emoji?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        count?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        reaction?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        addWrapper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        addButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        picker?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    reactions?: unknown;
    data?: unknown;
    addAction?: unknown;
    removeAction?: unknown;
    showAddButton?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    reactions?: unknown;
    data?: unknown;
    addAction?: unknown;
    removeAction?: unknown;
    showAddButton?: unknown;
    slots?: unknown;
}>;
