import { z } from "zod";
export declare const popoverSlotNames: readonly ["root", "trigger", "triggerLabel", "triggerIcon", "panel", "content", "header", "title", "description", "footer", "closeButton"];
/**
 * Zod schema for the Popover component.
 *
 * Defines a trigger-driven floating panel with optional title, description, footer content, width,
 * placement, and canonical slot-based styling for the trigger and panel sub-surfaces.
 */
export declare const popoverConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"popover">;
    trigger: z.ZodUnion<[z.ZodString, any]>;
    triggerIcon: z.ZodOptional<z.ZodString>;
    triggerVariant: z.ZodOptional<z.ZodEnum<["default", "secondary", "outline", "ghost", "destructive", "link"]>>;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    content: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    footer: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    placement: z.ZodOptional<z.ZodEnum<["top", "bottom"]>>;
    width: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "description" | "content" | "header" | "footer" | "panel" | "closeButton" | "trigger" | "triggerLabel" | "triggerIcon", z.ZodOptional<z.ZodObject<{
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
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        footer?: {
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
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        triggerLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        triggerIcon?: {
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
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        footer?: {
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
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        triggerLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        triggerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    trigger?: unknown;
    triggerIcon?: unknown;
    triggerVariant?: unknown;
    title?: unknown;
    description?: unknown;
    content?: unknown;
    footer?: unknown;
    placement?: unknown;
    width?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    trigger?: unknown;
    triggerIcon?: unknown;
    triggerVariant?: unknown;
    title?: unknown;
    description?: unknown;
    content?: unknown;
    footer?: unknown;
    placement?: unknown;
    width?: unknown;
    slots?: unknown;
}>;
