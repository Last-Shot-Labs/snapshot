import { z } from "zod";
export declare const kanbanSlotNames: readonly ["root", "column", "columnHeader", "columnTitle", "columnCount", "columnBody", "card", "cardTitle", "cardDescription", "cardMeta", "emptyState"];
export declare const kanbanColumnSlotNames: readonly ["column", "columnHeader", "columnTitle", "columnCount", "columnBody"];
/**
 * Schema for a Kanban board column definition.
 */
export declare const kanbanColumnSchema: z.ZodObject<{
    /** Unique key matching the value in the column field. */
    key: z.ZodString;
    /** Display title for the column header. */
    title: z.ZodUnion<[z.ZodString, any]>;
    /** Semantic color for the column header accent. */
    color: z.ZodOptional<z.ZodEnum<["primary", "secondary", "success", "warning", "destructive", "info", "muted"]>>;
    /** Maximum number of cards allowed in this column. */
    limit: z.ZodOptional<z.ZodNumber>;
    /** Per-column slot overrides for visible column surfaces. */
    slots: z.ZodOptional<z.ZodObject<Record<"column" | "columnCount" | "columnHeader" | "columnTitle" | "columnBody", z.ZodOptional<z.ZodObject<{
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
        column?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnCount?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnHeader?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnTitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnBody?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        column?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnCount?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnHeader?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnTitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        columnBody?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    key?: unknown;
    title?: unknown;
    color?: unknown;
    limit?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    key?: unknown;
    title?: unknown;
    color?: unknown;
    limit?: unknown;
    slots?: unknown;
}>;
/**
 * Zod config schema for the Kanban board component.
 *
 * Renders a column-based card board driven by data from an API endpoint.
 * Cards are placed into columns based on a configurable status/column field.
 *
 * @example
 * ```json
 * {
 *   "type": "kanban",
 *   "data": "GET /api/tasks",
 *   "columns": [
 *     { "key": "todo", "title": "To Do", "color": "info" },
 *     { "key": "in-progress", "title": "In Progress", "color": "warning", "limit": 5 },
 *     { "key": "done", "title": "Done", "color": "success" }
 *   ],
 *   "columnField": "status",
 *   "titleField": "title",
 *   "descriptionField": "description"
 * }
 * ```
 */
export declare const kanbanConfigSchema: z.ZodType<Record<string, any>>;
