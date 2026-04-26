import { z } from "zod";
export declare const navDropdownSlotNames: readonly ["root", "trigger", "triggerLabel", "triggerIcon", "panel", "item", "itemLabel", "itemIcon", "separator", "label"];
export declare const navDropdownConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"nav-dropdown">;
    label: z.ZodUnion<[z.ZodString, any]>;
    icon: z.ZodOptional<z.ZodString>;
    trigger: z.ZodOptional<z.ZodEnum<["click", "hover"]>>;
    current: z.ZodOptional<z.ZodBoolean>;
    disabled: z.ZodOptional<z.ZodBoolean>;
    align: z.ZodOptional<z.ZodEnum<["start", "center", "end"]>>;
    width: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    authenticated: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "separator" | "item" | "panel" | "trigger" | "itemLabel" | "itemIcon" | "triggerLabel" | "triggerIcon", z.ZodOptional<z.ZodObject<{
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
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
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
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
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
    label?: unknown;
    icon?: unknown;
    trigger?: unknown;
    current?: unknown;
    disabled?: unknown;
    align?: unknown;
    width?: unknown;
    items?: unknown;
    roles?: unknown;
    authenticated?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    icon?: unknown;
    trigger?: unknown;
    current?: unknown;
    disabled?: unknown;
    align?: unknown;
    width?: unknown;
    items?: unknown;
    roles?: unknown;
    authenticated?: unknown;
    slots?: unknown;
}>;
