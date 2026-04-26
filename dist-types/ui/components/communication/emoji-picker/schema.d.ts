import { z } from "zod";
/**
 * Zod config schema for the EmojiPicker component.
 *
 * Renders a searchable grid of emojis organized by category.
 *
 * @example
 * ```json
 * {
 *   "type": "emoji-picker",
 *   "id": "emoji",
 *   "perRow": 8,
 *   "maxHeight": "300px"
 * }
 * ```
 */
export declare const emojiPickerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"emoji-picker">;
    categories: z.ZodOptional<z.ZodArray<z.ZodEnum<["smileys", "people", "animals", "food", "travel", "activities", "objects", "symbols", "flags"]>, "many">>;
    perRow: z.ZodOptional<z.ZodNumber>;
    maxHeight: z.ZodOptional<z.ZodString>;
    customEmojis: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        shortcode: z.ZodString;
        url: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
        animated: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        url: string;
        shortcode: string;
        animated?: boolean | undefined;
        category?: string | undefined;
    }, {
        name: string;
        id: string;
        url: string;
        shortcode: string;
        animated?: boolean | undefined;
        category?: string | undefined;
    }>, "many">>;
    customEmojiData: any;
    emojiUrlField: z.ZodOptional<z.ZodString>;
    emojiUrlPrefix: z.ZodOptional<z.ZodString>;
    selectAction: any;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "emptyState" | "searchSection" | "searchShell" | "searchIcon" | "searchInput" | "categoryTabs" | "categoryTab" | "gridScroll" | "categorySection" | "categoryLabel" | "emojiGrid" | "emojiButton" | "customEmoji", z.ZodOptional<z.ZodObject<{
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
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchSection?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchShell?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categoryTabs?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categoryTab?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        gridScroll?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categorySection?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categoryLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emojiGrid?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emojiButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        customEmoji?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchSection?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchShell?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categoryTabs?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categoryTab?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        gridScroll?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categorySection?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        categoryLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emojiGrid?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emojiButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        customEmoji?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    categories?: unknown;
    perRow?: unknown;
    maxHeight?: unknown;
    customEmojis?: unknown;
    customEmojiData?: unknown;
    emojiUrlField?: unknown;
    emojiUrlPrefix?: unknown;
    selectAction?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    categories?: unknown;
    perRow?: unknown;
    maxHeight?: unknown;
    customEmojis?: unknown;
    customEmojiData?: unknown;
    emojiUrlField?: unknown;
    emojiUrlPrefix?: unknown;
    selectAction?: unknown;
    slots?: unknown;
}>;
