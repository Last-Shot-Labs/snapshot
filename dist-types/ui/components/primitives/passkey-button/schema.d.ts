import { z } from "zod";
export declare const passkeyButtonSlotNames: readonly ["root", "label"];
export declare const passkeyButtonConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"passkey-button">;
    label: z.ZodDefault<z.ZodUnion<[z.ZodString, any, any, z.ZodObject<{
        expr: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expr: string;
    }, {
        expr: string;
    }>, any]>>;
    onSuccess: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    onError: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "label", z.ZodOptional<z.ZodObject<{
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
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    onSuccess?: unknown;
    onError?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    onSuccess?: unknown;
    onError?: unknown;
    slots?: unknown;
}>;
