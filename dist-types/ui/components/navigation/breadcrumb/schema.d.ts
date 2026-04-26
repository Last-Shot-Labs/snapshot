import { z } from "zod";
export declare const breadcrumbSlotNames: readonly ["root", "list", "item", "link", "current", "separator", "icon"];
/**
 * Schema for a single breadcrumb item.
 */
export declare const breadcrumbItemSchema: z.ZodObject<{
    /** Display label for the breadcrumb segment. */
    label: z.ZodUnion<[z.ZodString, any]>;
    /** Route path for navigation. Omit for the current (last) item. */
    path: z.ZodOptional<z.ZodString>;
    /** Optional icon name displayed before the label. */
    icon: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"link" | "icon" | "item" | "current", z.ZodOptional<z.ZodObject<{
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
        link?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        current?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        link?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        current?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    label?: unknown;
    path?: unknown;
    icon?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    label?: unknown;
    path?: unknown;
    icon?: unknown;
    slots?: unknown;
}>;
/**
 * Zod config schema for the Breadcrumb component.
 *
 * Renders a navigation breadcrumb trail showing the user's
 * location within the application hierarchy.
 *
 * @example
 * ```json
 * {
 *   "type": "breadcrumb",
 *   "separator": "chevron",
 *   "items": [
 *     { "label": "Home", "path": "/" },
 *     { "label": "Users", "path": "/users" },
 *     { "label": "John Doe" }
 *   ]
 * }
 * ```
 */
export declare const breadcrumbConfigSchema: z.ZodType<Record<string, any>>;
