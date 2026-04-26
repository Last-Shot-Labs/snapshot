import { z } from "zod";
/**
 * Zod config schema for the Switch component.
 *
 * Defines all manifest-settable fields for a toggle switch
 * that controls a boolean value.
 *
 * @example
 * ```json
 * {
 *   "type": "switch",
 *   "label": "Enable notifications",
 *   "description": "Receive email alerts for new activity",
 *   "defaultChecked": false,
 *   "color": "success"
 * }
 * ```
 */
export declare const switchConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"switch">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    defaultChecked: z.ZodOptional<z.ZodBoolean>;
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    color: z.ZodOptional<z.ZodEnum<["primary", "success", "destructive", "warning"]>>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
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
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "description" | "track" | "thumb" | "labelGroup", z.ZodOptional<z.ZodObject<{
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
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        thumb?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        labelGroup?: {
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
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        thumb?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        labelGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    description?: unknown;
    defaultChecked?: unknown;
    disabled?: unknown;
    color?: unknown;
    size?: unknown;
    on?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    description?: unknown;
    defaultChecked?: unknown;
    disabled?: unknown;
    color?: unknown;
    size?: unknown;
    on?: unknown;
    slots?: unknown;
}>;
