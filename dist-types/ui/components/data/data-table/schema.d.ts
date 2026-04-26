import { z } from "zod";
export declare const dataTableSlotNames: readonly ["root", "toolbar", "headerRow", "headerCell", "row", "cell", "actionsCell", "bulkActions", "emptyState", "loadingState", "errorState", "pagination"];
export declare const dataTableRowSlotNames: readonly ["row", "cell", "actionsCell"];
/**
 * Schema for individual column configuration.
 */
export declare const columnConfigSchema: z.ZodObject<{
    /** Field name from the data object. */
    field: z.ZodString;
    /** Display label. Defaults to humanized field name. */
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** Whether the column is sortable. */
    sortable: z.ZodOptional<z.ZodBoolean>;
    /** Display format. */
    format: z.ZodOptional<z.ZodEnum<["date", "number", "currency", "badge", "boolean", "avatar", "progress", "link", "code"]>>;
    /** Color mapping for badge format. Maps field values to semantic colors. */
    badgeColors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    /** Field to use as avatar image src (when format is "avatar"). */
    avatarField: z.ZodOptional<z.ZodString>;
    /** Field to use as link text (when format is "link"). */
    linkTextField: z.ZodOptional<z.ZodString>;
    /** Prefix text for the cell value. */
    prefix: z.ZodOptional<z.ZodString>;
    /** Suffix text for the cell value. */
    suffix: z.ZodOptional<z.ZodString>;
    /** Filter configuration for this column. */
    filter: z.ZodOptional<z.ZodObject<{
        /** Filter input type. */
        type: z.ZodEnum<["select", "text", "date-range"]>;
        /** Options for select filter. 'auto' derives from unique column values. */
        options: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodArray<z.ZodObject<{
            label: z.ZodUnion<[z.ZodString, any]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
            value?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
            value?: unknown;
        }>, "many">]>>;
    }, "strict", z.ZodTypeAny, {
        type: "select" | "text" | "date-range";
        options?: "auto" | {
            [x: string]: any;
            label?: unknown;
            value?: unknown;
        }[] | undefined;
    }, {
        type: "select" | "text" | "date-range";
        options?: "auto" | {
            [x: string]: any;
            label?: unknown;
            value?: unknown;
        }[] | undefined;
    }>>;
    /** Column width (CSS value, e.g. '200px', '20%'). */
    width: z.ZodOptional<z.ZodString>;
    /** Text alignment within the column. */
    align: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    /** Divide numeric value by this before formatting (e.g. 100 for cents → dollars). */
    divisor: z.ZodOptional<z.ZodNumber>;
    /** Resolve foreign-key values against another resource for display. */
    lookup: z.ZodOptional<z.ZodObject<{
        resource: z.ZodString;
        valueField: z.ZodOptional<z.ZodString>;
        labelField: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        resource: string;
        valueField?: string | undefined;
        labelField?: string | undefined;
    }, {
        resource: string;
        valueField?: string | undefined;
        labelField?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    field?: unknown;
    label?: unknown;
    sortable?: unknown;
    format?: unknown;
    badgeColors?: unknown;
    avatarField?: unknown;
    linkTextField?: unknown;
    prefix?: unknown;
    suffix?: unknown;
    filter?: unknown;
    width?: unknown;
    align?: unknown;
    divisor?: unknown;
    lookup?: unknown;
}, {
    [x: string]: any;
    field?: unknown;
    label?: unknown;
    sortable?: unknown;
    format?: unknown;
    badgeColors?: unknown;
    avatarField?: unknown;
    linkTextField?: unknown;
    prefix?: unknown;
    suffix?: unknown;
    filter?: unknown;
    width?: unknown;
    align?: unknown;
    divisor?: unknown;
    lookup?: unknown;
}>;
/**
 * Schema for a per-row action button.
 */
export declare const rowActionSchema: z.ZodObject<{
    /** Button label text. */
    label: z.ZodUnion<[z.ZodString, any]>;
    /** Icon identifier. */
    icon: z.ZodOptional<z.ZodString>;
    /** Action(s) to execute when clicked. Row data is available in action context. */
    action: z.ZodUnion<[any, z.ZodArray<any, "many">]>;
    /** Controls visibility. Can be a static boolean or a FromRef. */
    visible: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"item" | "itemLabel" | "itemIcon", z.ZodOptional<z.ZodObject<{
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
        itemLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        item?: {
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
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    label?: unknown;
    icon?: unknown;
    action?: unknown;
    visible?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    label?: unknown;
    icon?: unknown;
    action?: unknown;
    visible?: unknown;
    slots?: unknown;
}>;
/**
 * Schema for a bulk action on selected rows.
 */
export declare const bulkActionSchema: z.ZodObject<{
    /** Button label text. `{count}` interpolates to selected row count. */
    label: z.ZodUnion<[z.ZodString, any]>;
    /** Icon identifier. */
    icon: z.ZodOptional<z.ZodString>;
    /** Action(s) to execute. Selected rows available in action context. */
    action: z.ZodUnion<[any, z.ZodArray<any, "many">]>;
    slots: z.ZodOptional<z.ZodObject<Record<"item" | "itemLabel" | "itemIcon", z.ZodOptional<z.ZodObject<{
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
        itemLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        itemIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        item?: {
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
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    label?: unknown;
    icon?: unknown;
    action?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    label?: unknown;
    icon?: unknown;
    action?: unknown;
    slots?: unknown;
}>;
/**
 * Zod schema for the DataTable component configuration.
 *
 * Defines a config-driven data table with sorting, pagination, filtering,
 * selection, search, row actions, and bulk actions.
 *
 * @example
 * ```json
 * {
 *   "type": "data-table",
 *   "id": "users-table",
 *   "data": "GET /api/users",
 *   "columns": [
 *     { "field": "name", "sortable": true },
 *     { "field": "email" },
 *     { "field": "status", "format": "badge", "badgeColors": { "active": "success", "inactive": "muted" } }
 *   ],
 *   "pagination": { "type": "offset", "pageSize": 20 },
 *   "selectable": true,
 *   "searchable": true
 * }
 * ```
 */
export declare const dataTableConfigSchema: z.ZodType<Record<string, any>>;
