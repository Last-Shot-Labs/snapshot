import { z } from "zod";
export declare const listSlotNames: readonly ["root", "list", "item", "itemBody", "itemLink", "itemHandle", "itemTitle", "itemDescription", "itemIcon", "itemBadge", "divider", "liveBanner", "liveText", "emptyState", "emptyMessage", "loadingState", "loadingItem", "loadingIcon", "loadingBody", "loadingTitle", "loadingDescription", "errorState"];
export declare const listItemSlotNames: readonly ["item", "itemBody", "itemLink", "itemHandle", "itemTitle", "itemDescription", "itemIcon", "itemBadge", "divider"];
/**
 * Schema for a static list item.
 */
export declare const listItemSchema: z.ZodObject<{
    /** Stable item identity for reordering and cross-component drag-and-drop. */
    id: z.ZodOptional<z.ZodString>;
    /** Primary text for the item. */
    title: z.ZodUnion<[z.ZodString, any]>;
    /** Secondary description text. */
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** Icon name displayed at the start. */
    icon: z.ZodOptional<z.ZodString>;
    /** Badge text displayed inline. */
    badge: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** Semantic color for the badge. */
    badgeColor: z.ZodOptional<z.ZodEnum<["primary", "secondary", "success", "warning", "destructive", "info"]>>;
    /** Action dispatched on item click. */
    action: any;
    /** Link href for the item. */
    href: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"item" | "divider" | "itemIcon" | "itemBadge" | "itemBody" | "itemLink" | "itemHandle" | "itemTitle" | "itemDescription", z.ZodOptional<z.ZodObject<{
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
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        divider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemBadge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemBody?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemLink?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemHandle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemTitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemDescription?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        divider?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemBadge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemBody?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemLink?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemHandle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemTitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemDescription?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    id?: unknown;
    title?: unknown;
    description?: unknown;
    icon?: unknown;
    badge?: unknown;
    badgeColor?: unknown;
    action?: unknown;
    href?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    id?: unknown;
    title?: unknown;
    description?: unknown;
    icon?: unknown;
    badge?: unknown;
    badgeColor?: unknown;
    action?: unknown;
    href?: unknown;
    slots?: unknown;
}>;
/**
 * Zod config schema for the List component.
 *
 * Renders a vertical list of items with optional icons, descriptions,
 * badges, and click actions. Supports both static items and data-fetched items.
 *
 * @example
 * ```json
 * {
 *   "type": "list",
 *   "variant": "bordered",
 *   "items": [
 *     { "title": "Users", "description": "Manage user accounts", "icon": "users", "badge": "12", "badgeColor": "primary" },
 *     { "title": "Settings", "description": "App configuration", "icon": "settings" }
 *   ]
 * }
 * ```
 */
export declare const listConfigSchema: z.ZodType<Record<string, any>>;
