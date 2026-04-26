import { z } from "zod";
export declare const floatingMenuSlotNames: readonly ["root", "trigger", "panel", "item", "itemLabel", "itemIcon", "separator", "label"];
export declare const floatingMenuEntrySchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"item">;
    label: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>;
    icon: z.ZodOptional<z.ZodString>;
    action: any;
    disabled: z.ZodOptional<z.ZodBoolean>;
    destructive: z.ZodOptional<z.ZodBoolean>;
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
    type?: unknown;
    label?: unknown;
    icon?: unknown;
    action?: unknown;
    disabled?: unknown;
    destructive?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    icon?: unknown;
    action?: unknown;
    disabled?: unknown;
    destructive?: unknown;
    slots?: unknown;
}>, z.ZodObject<{
    type: z.ZodLiteral<"separator">;
    slots: z.ZodOptional<z.ZodObject<Record<"separator", z.ZodOptional<z.ZodObject<{
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
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    type: "separator";
    slots?: {
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    } | undefined;
}, {
    type: "separator";
    slots?: {
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"label">;
    text: z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>;
    slots: z.ZodOptional<z.ZodObject<Record<"label", z.ZodOptional<z.ZodObject<{
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
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    text?: unknown;
    slots?: unknown;
}>]>;
export declare const floatingMenuConfigSchema: z.ZodType<Record<string, any>>;
