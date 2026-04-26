import { z } from "zod";
export declare const buttonSlotNames: readonly ["root", "label", "icon", "leadingIcon"];
export declare const buttonConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"button">;
    label: z.ZodUnion<[z.ZodString, any]>;
    icon: z.ZodOptional<z.ZodString>;
    variant: z.ZodOptional<z.ZodEnum<["default", "secondary", "outline", "ghost", "destructive", "link"]>>;
    size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg", "icon"]>>;
    action: z.ZodUnion<[any, z.ZodArray<any, "many">]>;
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    fullWidth: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon" | "leadingIcon", z.ZodOptional<z.ZodObject<{
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
        leadingIcon?: {
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
        leadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    icon?: unknown;
    variant?: unknown;
    size?: unknown;
    action?: unknown;
    disabled?: unknown;
    fullWidth?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    icon?: unknown;
    variant?: unknown;
    size?: unknown;
    action?: unknown;
    disabled?: unknown;
    fullWidth?: unknown;
    slots?: unknown;
}>;
