import { z } from "zod";
export declare const accordionSlotNames: readonly ["root", "item", "trigger", "triggerLabel", "triggerIcon", "content"];
/**
 * Schema for a single accordion item.
 */
export declare const accordionItemSchema: z.ZodObject<{
    /** Display title for the accordion header. */
    title: z.ZodUnion<[z.ZodString, any]>;
    /** Child components rendered inside the collapsible panel. */
    content: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    /** Optional icon name displayed before the title. */
    icon: z.ZodOptional<z.ZodString>;
    /** Whether this item is disabled (not expandable). */
    disabled: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"content" | "item" | "trigger" | "triggerLabel" | "triggerIcon", z.ZodOptional<z.ZodObject<{
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
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
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
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
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
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    title?: unknown;
    content?: unknown;
    icon?: unknown;
    disabled?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    title?: unknown;
    content?: unknown;
    icon?: unknown;
    disabled?: unknown;
    slots?: unknown;
}>;
/**
 * Zod config schema for the Accordion component.
 *
 * Renders a list of expandable/collapsible content sections.
 * Supports single-open and multi-open modes, visual variants,
 * and nested component content via ComponentRenderer.
 *
 * @example
 * ```json
 * {
 *   "type": "accordion",
 *   "mode": "single",
 *   "variant": "bordered",
 *   "items": [
 *     { "title": "Section 1", "content": [{ "type": "heading", "text": "Hello" }] },
 *     { "title": "Section 2", "content": [{ "type": "heading", "text": "World" }] }
 *   ]
 * }
 * ```
 */
export declare const accordionConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"accordion">;
    items: z.ZodArray<z.ZodObject<{
        /** Display title for the accordion header. */
        title: z.ZodUnion<[z.ZodString, any]>;
        /** Child components rendered inside the collapsible panel. */
        content: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
        /** Optional icon name displayed before the title. */
        icon: z.ZodOptional<z.ZodString>;
        /** Whether this item is disabled (not expandable). */
        disabled: z.ZodOptional<z.ZodBoolean>;
        slots: z.ZodOptional<z.ZodObject<Record<"content" | "item" | "trigger" | "triggerLabel" | "triggerIcon", z.ZodOptional<z.ZodObject<{
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
            content?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            item?: {
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
            content?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            item?: {
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
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        title?: unknown;
        content?: unknown;
        icon?: unknown;
        disabled?: unknown;
        slots?: unknown;
    }, {
        [x: string]: any;
        title?: unknown;
        content?: unknown;
        icon?: unknown;
        disabled?: unknown;
        slots?: unknown;
    }>, "many">;
    mode: z.ZodOptional<z.ZodEnum<["single", "multiple"]>>;
    defaultOpen: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodArray<z.ZodNumber, "many">]>>;
    variant: z.ZodOptional<z.ZodEnum<["default", "bordered", "separated"]>>;
    iconPosition: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "item" | "trigger" | "triggerLabel" | "triggerIcon", z.ZodOptional<z.ZodObject<{
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
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
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
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
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
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    items?: unknown;
    mode?: unknown;
    defaultOpen?: unknown;
    variant?: unknown;
    iconPosition?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    items?: unknown;
    mode?: unknown;
    defaultOpen?: unknown;
    variant?: unknown;
    iconPosition?: unknown;
    slots?: unknown;
}>;
