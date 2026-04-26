import { z } from "zod";
export declare const treeViewSlotNames: readonly ["root", "loadingState", "loadingItem", "loadingMarker", "loadingLabel", "loadingLabelSecondary", "errorState", "emptyState", "item", "row", "label", "icon", "badge", "connector", "disclosure", "children"];
/**
 * Recursive schema for a tree node item.
 * Each node can have nested children of the same shape.
 */
export declare const treeItemSchema: z.ZodType<TreeItemInput[]>;
/**
 * TypeScript type for tree item input (matches the Zod schema).
 * Defined manually because z.lazy() prevents z.infer from resolving recursion.
 */
export interface TreeItemInput {
    label: string | {
        from: string;
        transform?: string;
        transformArg?: string | number;
    };
    icon?: string;
    badge?: string | {
        from: string;
        transform?: string;
        transformArg?: string | number;
    };
    value?: string;
    children?: TreeItemInput[];
    disabled?: boolean;
    expanded?: boolean;
    slots?: Partial<Record<(typeof treeViewSlotNames)[number], Record<string, unknown>>>;
}
/**
 * Zod config schema for the TreeView component.
 *
 * Defines all manifest-settable fields for a hierarchical expandable tree.
 *
 * @example
 * ```json
 * {
 *   "type": "tree-view",
 *   "items": [
 *     {
 *       "label": "Documents",
 *       "icon": "folder",
 *       "children": [
 *         { "label": "report.pdf", "icon": "file", "value": "report" }
 *       ]
 *     }
 *   ]
 * }
 * ```
 */
export declare const treeViewConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"tree-view">;
    data: any;
    items: z.ZodOptional<z.ZodType<TreeItemInput[], z.ZodTypeDef, TreeItemInput[]>>;
    selectable: z.ZodOptional<z.ZodBoolean>;
    multiSelect: z.ZodOptional<z.ZodBoolean>;
    showIcon: z.ZodOptional<z.ZodBoolean>;
    showConnectors: z.ZodOptional<z.ZodBoolean>;
    action: any;
    error: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        className: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
        states: z.ZodOptional<z.ZodOptional<z.ZodRecord<any, z.ZodObject<{
            [x: string]: z.ZodOptional<any>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
        }, {
            [x: string]: any;
        }>>>>;
        hover: any;
        focus: any;
        active: any;
        background: any;
        backgroundColor: z.ZodOptional<z.ZodString>;
        padding: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        paddingX: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        paddingY: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        margin: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        marginX: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        marginY: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        gap: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        minWidth: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        maxWidth: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        minHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        maxHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        bg: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        borderRadius: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        border: z.ZodOptional<z.ZodString>;
        shadow: z.ZodOptional<z.ZodString>;
        opacity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        overflow: z.ZodOptional<z.ZodString>;
        cursor: z.ZodOptional<z.ZodString>;
        position: any;
        inset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        display: any;
        flexDirection: any;
        alignItems: z.ZodOptional<z.ZodString>;
        justifyContent: z.ZodOptional<z.ZodString>;
        flexWrap: z.ZodOptional<z.ZodString>;
        flex: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        gridTemplateColumns: z.ZodOptional<z.ZodString>;
        gridTemplateRows: z.ZodOptional<z.ZodString>;
        gridColumn: z.ZodOptional<z.ZodString>;
        gridRow: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        lineHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        letterSpacing: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        title: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
        retry: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            label: z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
        }>]>>;
        icon: z.ZodOptional<z.ZodString>;
        slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "retry" | "icon" | "description", z.ZodOptional<z.ZodObject<{
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
            title?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            retry?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            icon?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            description?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
        }, {
            root?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            title?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            retry?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            icon?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            description?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        id?: unknown;
        className?: unknown;
        style?: unknown;
        states?: unknown;
        hover?: unknown;
        focus?: unknown;
        active?: unknown;
        background?: unknown;
        backgroundColor?: unknown;
        padding?: unknown;
        paddingX?: unknown;
        paddingY?: unknown;
        margin?: unknown;
        marginX?: unknown;
        marginY?: unknown;
        gap?: unknown;
        width?: unknown;
        minWidth?: unknown;
        maxWidth?: unknown;
        height?: unknown;
        minHeight?: unknown;
        maxHeight?: unknown;
        bg?: unknown;
        color?: unknown;
        borderRadius?: unknown;
        border?: unknown;
        shadow?: unknown;
        opacity?: unknown;
        overflow?: unknown;
        cursor?: unknown;
        position?: unknown;
        inset?: unknown;
        display?: unknown;
        flexDirection?: unknown;
        alignItems?: unknown;
        justifyContent?: unknown;
        flexWrap?: unknown;
        flex?: unknown;
        gridTemplateColumns?: unknown;
        gridTemplateRows?: unknown;
        gridColumn?: unknown;
        gridRow?: unknown;
        textAlign?: unknown;
        fontSize?: unknown;
        fontWeight?: unknown;
        lineHeight?: unknown;
        letterSpacing?: unknown;
        title?: unknown;
        description?: unknown;
        retry?: unknown;
        icon?: unknown;
        slots?: unknown;
    }, {
        [x: string]: any;
        id?: unknown;
        className?: unknown;
        style?: unknown;
        states?: unknown;
        hover?: unknown;
        focus?: unknown;
        active?: unknown;
        background?: unknown;
        backgroundColor?: unknown;
        padding?: unknown;
        paddingX?: unknown;
        paddingY?: unknown;
        margin?: unknown;
        marginX?: unknown;
        marginY?: unknown;
        gap?: unknown;
        width?: unknown;
        minWidth?: unknown;
        maxWidth?: unknown;
        height?: unknown;
        minHeight?: unknown;
        maxHeight?: unknown;
        bg?: unknown;
        color?: unknown;
        borderRadius?: unknown;
        border?: unknown;
        shadow?: unknown;
        opacity?: unknown;
        overflow?: unknown;
        cursor?: unknown;
        position?: unknown;
        inset?: unknown;
        display?: unknown;
        flexDirection?: unknown;
        alignItems?: unknown;
        justifyContent?: unknown;
        flexWrap?: unknown;
        flex?: unknown;
        gridTemplateColumns?: unknown;
        gridTemplateRows?: unknown;
        gridColumn?: unknown;
        gridRow?: unknown;
        textAlign?: unknown;
        fontSize?: unknown;
        fontWeight?: unknown;
        lineHeight?: unknown;
        letterSpacing?: unknown;
        title?: unknown;
        description?: unknown;
        retry?: unknown;
        icon?: unknown;
        slots?: unknown;
    }>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon" | "row" | "children" | "item" | "badge" | "emptyState" | "loadingState" | "errorState" | "loadingItem" | "loadingMarker" | "connector" | "loadingLabel" | "loadingLabelSecondary" | "disclosure", z.ZodOptional<z.ZodObject<{
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
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        row?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        children?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        badge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        errorState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingItem?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingMarker?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        connector?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingLabelSecondary?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        disclosure?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        row?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        children?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        badge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        errorState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingItem?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingMarker?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        connector?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingLabelSecondary?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        disclosure?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    items?: unknown;
    selectable?: unknown;
    multiSelect?: unknown;
    showIcon?: unknown;
    showConnectors?: unknown;
    action?: unknown;
    error?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    items?: unknown;
    selectable?: unknown;
    multiSelect?: unknown;
    showIcon?: unknown;
    showConnectors?: unknown;
    action?: unknown;
    error?: unknown;
    slots?: unknown;
}>;
