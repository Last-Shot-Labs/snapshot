import { z } from "zod";
export declare const drawerSlotNames: readonly ["root", "overlay", "panel", "header", "title", "closeButton", "body", "footer", "footerAction"];
/**
 * Zod schema for drawer component config.
 * Drawers are slide-in panels from the left or right edge of the screen.
 * Like modals, they are opened/closed via the modal manager.
 */
export declare const drawerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"drawer">;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    size: z.ZodDefault<z.ZodEnum<["sm", "md", "lg", "xl", "full"]>>;
    side: z.ZodDefault<z.ZodEnum<["left", "right"]>>;
    trigger: any;
    content: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
    onOpen: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    onClose: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    urlParam: z.ZodOptional<z.ZodString>;
    trapFocus: z.ZodDefault<z.ZodBoolean>;
    initialFocus: z.ZodOptional<z.ZodString>;
    returnFocus: z.ZodDefault<z.ZodBoolean>;
    footer: z.ZodOptional<z.ZodObject<{
        /** Action buttons rendered in the footer. */
        actions: z.ZodArray<z.ZodObject<{
            /** Button label text. */
            label: z.ZodUnion<[z.ZodString, any]>;
            /** Button visual variant. */
            variant: z.ZodOptional<z.ZodEnum<["default", "secondary", "destructive", "ghost"]>>;
            /** Action to dispatch on click. */
            action: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
            /** Close the drawer after the action executes. Default: false. */
            dismiss: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
            variant?: unknown;
            action?: unknown;
            dismiss?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
            variant?: unknown;
            action?: unknown;
            dismiss?: unknown;
        }>, "many">;
        /** Footer alignment. Default: "right". */
        align: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    }, "strip", z.ZodTypeAny, {
        actions: {
            [x: string]: any;
            label?: unknown;
            variant?: unknown;
            action?: unknown;
            dismiss?: unknown;
        }[];
        align?: "center" | "left" | "right" | undefined;
    }, {
        actions: {
            [x: string]: any;
            label?: unknown;
            variant?: unknown;
            action?: unknown;
            dismiss?: unknown;
        }[];
        align?: "center" | "left" | "right" | undefined;
    }>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "header" | "body" | "footer" | "overlay" | "panel" | "closeButton" | "footerAction", z.ZodOptional<z.ZodObject<{
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
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        body?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        footer?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        overlay?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        closeButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        footerAction?: {
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
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        body?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        footer?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        overlay?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        closeButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        footerAction?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    size?: unknown;
    side?: unknown;
    trigger?: unknown;
    content?: unknown;
    onOpen?: unknown;
    onClose?: unknown;
    urlParam?: unknown;
    trapFocus?: unknown;
    initialFocus?: unknown;
    returnFocus?: unknown;
    footer?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    size?: unknown;
    side?: unknown;
    trigger?: unknown;
    content?: unknown;
    onOpen?: unknown;
    onClose?: unknown;
    urlParam?: unknown;
    trapFocus?: unknown;
    initialFocus?: unknown;
    returnFocus?: unknown;
    footer?: unknown;
    slots?: unknown;
}>;
/** Inferred type for drawer config. */
export type DrawerConfig = z.input<typeof drawerConfigSchema>;
