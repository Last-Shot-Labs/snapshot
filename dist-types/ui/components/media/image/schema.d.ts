import { z } from "zod";
/** Schema for optimized image components rendered through Snapshot's image route. */
export declare const snapshotImageSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodOptional<z.ZodNumber>;
    quality: z.ZodDefault<z.ZodNumber>;
    format: z.ZodDefault<z.ZodEnum<["avif", "webp", "jpeg", "png", "original"]>>;
    sizes: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodBoolean>;
    placeholder: z.ZodDefault<z.ZodEnum<["blur", "empty", "skeleton"]>>;
    loading: z.ZodOptional<z.ZodEnum<["lazy", "eager"]>>;
    aspectRatio: z.ZodOptional<z.ZodString>;
    alt: z.ZodString;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "placeholder" | "image", z.ZodOptional<z.ZodObject<{
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
        placeholder?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        image?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        placeholder?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        image?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    width?: unknown;
    height?: unknown;
    quality?: unknown;
    format?: unknown;
    sizes?: unknown;
    priority?: unknown;
    placeholder?: unknown;
    loading?: unknown;
    aspectRatio?: unknown;
    alt?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    src?: unknown;
    width?: unknown;
    height?: unknown;
    quality?: unknown;
    format?: unknown;
    sizes?: unknown;
    priority?: unknown;
    placeholder?: unknown;
    loading?: unknown;
    aspectRatio?: unknown;
    alt?: unknown;
    slots?: unknown;
}>;
