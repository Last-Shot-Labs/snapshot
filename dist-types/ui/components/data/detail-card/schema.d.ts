import { z } from "zod";
export declare const detailCardSlotNames: readonly ["root", "panel", "header", "title", "actions", "actionButton", "fields", "field", "fieldLabel", "fieldValue", "emptyValue", "booleanValue", "badgeValue", "linkValue", "imageValue", "copyButton", "skeleton", "skeletonRow", "skeletonLabel", "skeletonValue", "emptyState", "loadingState", "errorState"];
export declare const detailCardFieldSlotNames: readonly ["field", "fieldLabel", "fieldValue", "emptyValue", "booleanValue", "badgeValue", "linkValue", "imageValue", "copyButton"];
export declare const detailCardActionSlotNames: readonly ["actionButton"];
/**
 * Supported field format types for detail card fields.
 * Controls how the field value is rendered.
 */
export declare const detailFieldFormatSchema: z.ZodEnum<["text", "date", "datetime", "number", "currency", "badge", "boolean", "email", "url", "image", "link", "list"]>;
/**
 * Configuration for a single field in the detail card.
 */
export declare const detailFieldConfigSchema: z.ZodObject<{
    /** The field key to read from the data object. */
    field: z.ZodString;
    /** Display label. Defaults to a humanized version of the field name. */
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** How to format/render the value. Defaults to 'text'. */
    format: z.ZodOptional<z.ZodEnum<["text", "date", "datetime", "number", "currency", "badge", "boolean", "email", "url", "image", "link", "list"]>>;
    /** Whether to show a copy-to-clipboard button next to the value. */
    copyable: z.ZodOptional<z.ZodBoolean>;
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
    /** Field-level slot overrides. */
    slots: z.ZodOptional<z.ZodObject<Record<"field" | "fieldLabel" | "fieldValue" | "emptyValue" | "booleanValue" | "badgeValue" | "linkValue" | "imageValue" | "copyButton", z.ZodOptional<z.ZodObject<{
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
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fieldLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fieldValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        booleanValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        badgeValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        imageValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        copyButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fieldLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fieldValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        booleanValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        badgeValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        imageValue?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        copyButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    field?: unknown;
    label?: unknown;
    format?: unknown;
    copyable?: unknown;
    divisor?: unknown;
    lookup?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    field?: unknown;
    label?: unknown;
    format?: unknown;
    copyable?: unknown;
    divisor?: unknown;
    lookup?: unknown;
    slots?: unknown;
}>;
/**
 * Action button configuration for the detail card header.
 */
export declare const detailCardActionSchema: z.ZodObject<{
    /** Button label text. */
    label: z.ZodUnion<[z.ZodString, any]>;
    /** Optional icon identifier. */
    icon: z.ZodOptional<z.ZodString>;
    /** Action(s) to execute when clicked. */
    action: z.ZodUnion<[any, z.ZodArray<any, "many">]>;
    /** Action button slot overrides. */
    slots: z.ZodOptional<z.ZodObject<Record<"actionButton", z.ZodOptional<z.ZodObject<{
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
        actionButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        actionButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
 * Zod schema for DetailCard component configuration.
 *
 * The detail card displays a single record's fields in a key-value layout.
 * Used in drawers, modals, and detail pages.
 *
 * @example
 * ```json
 * {
 *   "type": "detail-card",
 *   "id": "user-detail",
 *   "data": { "from": "users-table.selected" },
 *   "title": "User Details",
 *   "fields": [
 *     { "field": "name", "label": "Full Name" },
 *     { "field": "email", "format": "email", "copyable": true },
 *     { "field": "role", "format": "badge" },
 *     { "field": "createdAt", "format": "date" }
 *   ],
 *   "actions": [
 *     { "label": "Edit", "action": { "type": "open-modal", "modal": "edit-user" } }
 *   ]
 * }
 * ```
 */
export declare const detailCardConfigSchema: z.ZodType<Record<string, any>>;
/** DetailCard configuration type inferred from the schema. */
export type DetailCardConfig = z.infer<typeof detailCardConfigSchema>;
/** Single field configuration type inferred from the schema. */
export type DetailFieldConfig = z.infer<typeof detailFieldConfigSchema>;
/** Detail card action type inferred from the schema. */
export type DetailCardAction = z.infer<typeof detailCardActionSchema>;
/** Field format type. */
export type DetailFieldFormat = z.infer<typeof detailFieldFormatSchema>;
export type DetailCardSlotNames = typeof detailCardSlotNames;
export type DetailCardFieldSlotNames = typeof detailCardFieldSlotNames;
export type DetailCardActionSlotNames = typeof detailCardActionSlotNames;
