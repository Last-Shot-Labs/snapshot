import { z } from "zod";
export declare const navLinkSlotNames: readonly ["root", "label", "icon", "badge"];
export declare const navLinkConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"nav-link">;
    label: z.ZodUnion<[z.ZodString, any]>;
    path: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    badge: z.ZodOptional<z.ZodUnion<[z.ZodNumber, any]>>;
    matchChildren: z.ZodOptional<z.ZodBoolean>;
    active: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    authenticated: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon" | "badge", z.ZodOptional<z.ZodObject<{
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
        badge?: {
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
        badge?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    path?: unknown;
    icon?: unknown;
    badge?: unknown;
    matchChildren?: unknown;
    active?: unknown;
    disabled?: unknown;
    roles?: unknown;
    authenticated?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    path?: unknown;
    icon?: unknown;
    badge?: unknown;
    matchChildren?: unknown;
    active?: unknown;
    disabled?: unknown;
    roles?: unknown;
    authenticated?: unknown;
    slots?: unknown;
}>;
