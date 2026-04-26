import { z } from "zod";
export declare const navSearchSlotNames: readonly ["root", "input", "shortcut"];
export declare const navSearchConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"nav-search">;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    onSearch: any;
    shortcut: z.ZodOptional<z.ZodString>;
    publishTo: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "root" | "shortcut", z.ZodOptional<z.ZodObject<{
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
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        shortcut?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        shortcut?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    onSearch?: unknown;
    shortcut?: unknown;
    publishTo?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    onSearch?: unknown;
    shortcut?: unknown;
    publishTo?: unknown;
    slots?: unknown;
}>;
