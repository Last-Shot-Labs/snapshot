import { z } from "zod";
export declare const videoConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"video">;
    src: z.ZodString;
    poster: z.ZodOptional<z.ZodString>;
    controls: z.ZodOptional<z.ZodBoolean>;
    autoPlay: z.ZodOptional<z.ZodBoolean>;
    loop: z.ZodOptional<z.ZodBoolean>;
    muted: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"root", z.ZodOptional<z.ZodObject<{
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
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    poster?: unknown;
    controls?: unknown;
    autoPlay?: unknown;
    loop?: unknown;
    muted?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    poster?: unknown;
    controls?: unknown;
    autoPlay?: unknown;
    loop?: unknown;
    muted?: unknown;
    slots?: unknown;
}>;
