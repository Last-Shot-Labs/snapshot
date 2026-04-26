import { z } from "zod";
/**
 * Overlay alias schema for manifest-driven confirmation dialogs.
 */
export declare const confirmDialogConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"confirm-dialog">;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg", "xl", "full"]>>;
    confirmLabel: z.ZodDefault<z.ZodUnion<[z.ZodString, any]>>;
    cancelLabel: z.ZodDefault<z.ZodUnion<[z.ZodString, any]>>;
    confirmVariant: z.ZodDefault<z.ZodEnum<["default", "secondary", "destructive", "ghost"]>>;
    cancelVariant: z.ZodDefault<z.ZodEnum<["default", "secondary", "destructive", "ghost"]>>;
    confirmAction: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    cancelAction: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    dismissOnConfirm: z.ZodDefault<z.ZodBoolean>;
    dismissOnCancel: z.ZodDefault<z.ZodBoolean>;
    onOpen: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    onClose: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    urlParam: z.ZodOptional<z.ZodString>;
    trapFocus: z.ZodDefault<z.ZodBoolean>;
    initialFocus: z.ZodOptional<z.ZodString>;
    returnFocus: z.ZodDefault<z.ZodBoolean>;
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
    description?: unknown;
    size?: unknown;
    confirmLabel?: unknown;
    cancelLabel?: unknown;
    confirmVariant?: unknown;
    cancelVariant?: unknown;
    confirmAction?: unknown;
    cancelAction?: unknown;
    dismissOnConfirm?: unknown;
    dismissOnCancel?: unknown;
    onOpen?: unknown;
    onClose?: unknown;
    urlParam?: unknown;
    trapFocus?: unknown;
    initialFocus?: unknown;
    returnFocus?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    size?: unknown;
    confirmLabel?: unknown;
    cancelLabel?: unknown;
    confirmVariant?: unknown;
    cancelVariant?: unknown;
    confirmAction?: unknown;
    cancelAction?: unknown;
    dismissOnConfirm?: unknown;
    dismissOnCancel?: unknown;
    onOpen?: unknown;
    onClose?: unknown;
    urlParam?: unknown;
    trapFocus?: unknown;
    initialFocus?: unknown;
    returnFocus?: unknown;
    slots?: unknown;
}>;
