import { z } from "zod";
export declare const iconButtonConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"icon-button">;
    icon: z.ZodString;
    size: z.ZodOptional<z.ZodEnum<["xs", "sm", "md", "lg"]>>;
    variant: z.ZodOptional<z.ZodEnum<["default", "secondary", "outline", "ghost", "destructive"]>>;
    shape: z.ZodOptional<z.ZodEnum<["circle", "square"]>>;
    ariaLabel: z.ZodString;
    action: any;
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    tooltip: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "icon", z.ZodOptional<z.ZodObject<{
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
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    icon?: unknown;
    size?: unknown;
    variant?: unknown;
    shape?: unknown;
    ariaLabel?: unknown;
    action?: unknown;
    disabled?: unknown;
    tooltip?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    icon?: unknown;
    size?: unknown;
    variant?: unknown;
    shape?: unknown;
    ariaLabel?: unknown;
    action?: unknown;
    disabled?: unknown;
    tooltip?: unknown;
    slots?: unknown;
}>;
