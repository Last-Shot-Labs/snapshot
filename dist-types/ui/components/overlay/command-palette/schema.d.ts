import { z } from "zod";
export declare const commandPaletteSlotNames: readonly ["root", "trigger", "panel", "search", "searchInput", "list", "item", "itemLabel", "itemIcon", "groupLabel", "emptyState"];
export declare const commandPaletteItemSlotNames: readonly ["item", "itemLabel", "itemIcon"];
/** Zod config schema for the CommandPalette component. A keyboard-driven overlay that groups commands, supports search with remote endpoints, tracks recent items, and dispatches actions on selection. */
export declare const commandPaletteConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"command-palette">;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    groups: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodUnion<[z.ZodString, any]>;
        items: z.ZodArray<z.ZodObject<{
            label: z.ZodUnion<[z.ZodString, any]>;
            icon: z.ZodOptional<z.ZodString>;
            shortcut: z.ZodOptional<z.ZodString>;
            action: any;
            description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
            icon?: unknown;
            shortcut?: unknown;
            action?: unknown;
            description?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
            icon?: unknown;
            shortcut?: unknown;
            action?: unknown;
            description?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        items?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        items?: unknown;
    }>, "many">>;
    data: any;
    autoRegisterShortcuts: z.ZodDefault<z.ZodBoolean>;
    searchEndpoint: z.ZodOptional<z.ZodObject<{
        endpoint: any;
        debounce: z.ZodDefault<z.ZodNumber>;
        minLength: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        endpoint?: unknown;
        debounce?: unknown;
        minLength?: unknown;
    }, {
        [x: string]: any;
        endpoint?: unknown;
        debounce?: unknown;
        minLength?: unknown;
    }>>;
    recentItems: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        maxItems: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        maxItems: number;
    }, {
        enabled?: boolean | undefined;
        maxItems?: number | undefined;
    }>>;
    shortcut: z.ZodDefault<z.ZodString>;
    emptyMessage: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    maxHeight: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "search" | "list" | "item" | "panel" | "trigger" | "itemLabel" | "itemIcon" | "emptyState" | "searchInput" | "groupLabel", z.ZodOptional<z.ZodObject<{
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
        search?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        list?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        groupLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        search?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        list?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        groupLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    groups?: unknown;
    data?: unknown;
    autoRegisterShortcuts?: unknown;
    searchEndpoint?: unknown;
    recentItems?: unknown;
    shortcut?: unknown;
    emptyMessage?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    groups?: unknown;
    data?: unknown;
    autoRegisterShortcuts?: unknown;
    searchEndpoint?: unknown;
    recentItems?: unknown;
    shortcut?: unknown;
    emptyMessage?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}>;
