import { z } from "zod";
/**
 * Manifest config for the default not-found state.
 */
export declare const notFoundConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"not-found">;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    homeLabel: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "description" | "eyebrow", z.ZodOptional<z.ZodObject<{
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
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        eyebrow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        eyebrow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    homeLabel?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    title?: unknown;
    description?: unknown;
    homeLabel?: unknown;
    slots?: unknown;
}>;
/** Config for the default not-found feedback component. */
export type NotFoundConfig = z.input<typeof notFoundConfigSchema>;
