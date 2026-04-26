import { z } from "zod";
export declare const voteConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"vote">;
    value: z.ZodOptional<z.ZodUnion<[z.ZodNumber, any]>>;
    upAction: any;
    downAction: any;
    slots: z.ZodOptional<z.ZodObject<Record<"value" | "root" | "upvote" | "downvote", z.ZodOptional<z.ZodObject<{
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
        value?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        upvote?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        downvote?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        value?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        upvote?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        downvote?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    upAction?: unknown;
    downAction?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    upAction?: unknown;
    downAction?: unknown;
    slots?: unknown;
}>;
