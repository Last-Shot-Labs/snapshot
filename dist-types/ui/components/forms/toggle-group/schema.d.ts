import { z } from "zod";
export declare const toggleGroupSlotNames: readonly ["root", "item", "itemLabel", "itemIcon", "indicator"];
export declare const toggleGroupConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"toggle-group">;
    mode: z.ZodOptional<z.ZodEnum<["single", "multiple"]>>;
    items: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
        icon: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
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
        value?: unknown;
        label?: unknown;
        icon?: unknown;
        disabled?: unknown;
        slots?: unknown;
    }, {
        [x: string]: any;
        value?: unknown;
        label?: unknown;
        icon?: unknown;
        disabled?: unknown;
        slots?: unknown;
    }>, "many">;
    defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, any]>>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
    variant: z.ZodOptional<z.ZodEnum<["outline", "ghost"]>>;
    publishTo: z.ZodOptional<z.ZodString>;
    on: z.ZodOptional<z.ZodObject<{
        click: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        focus: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        blur: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        keyDown: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        mouseEnter: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        mouseLeave: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    } & {
        pointerDown: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        pointerUp: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        touchStart: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        touchEnd: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    } & {
        change: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        input: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        click?: unknown;
        focus?: unknown;
        blur?: unknown;
        keyDown?: unknown;
        mouseEnter?: unknown;
        mouseLeave?: unknown;
        pointerDown?: unknown;
        pointerUp?: unknown;
        touchStart?: unknown;
        touchEnd?: unknown;
        change?: unknown;
        input?: unknown;
    }, {
        [x: string]: any;
        click?: unknown;
        focus?: unknown;
        blur?: unknown;
        keyDown?: unknown;
        mouseEnter?: unknown;
        mouseLeave?: unknown;
        pointerDown?: unknown;
        pointerUp?: unknown;
        touchStart?: unknown;
        touchEnd?: unknown;
        change?: unknown;
        input?: unknown;
    }>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "item" | "indicator" | "itemLabel" | "itemIcon", z.ZodOptional<z.ZodObject<{
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
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        indicator?: {
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
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        indicator?: {
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
    mode?: unknown;
    items?: unknown;
    defaultValue?: unknown;
    value?: unknown;
    size?: unknown;
    variant?: unknown;
    publishTo?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    mode?: unknown;
    items?: unknown;
    defaultValue?: unknown;
    value?: unknown;
    size?: unknown;
    variant?: unknown;
    publishTo?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
