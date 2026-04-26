import { z } from "zod";
export declare const navLogoSlotNames: readonly ["root", "icon", "label"];
export declare const navLogoConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"nav-logo">;
    src: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    path: z.ZodOptional<z.ZodString>;
    logoHeight: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label" | "icon", z.ZodOptional<z.ZodObject<{
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
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    text?: unknown;
    path?: unknown;
    logoHeight?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    text?: unknown;
    path?: unknown;
    logoHeight?: unknown;
    slots?: unknown;
}>;
