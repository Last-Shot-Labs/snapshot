import { z } from "zod";
export declare const carouselSlotNames: readonly ["root", "viewport", "track", "slide", "controls", "prevButton", "nextButton", "indicator", "indicatorItem"];
export declare const carouselConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"carousel">;
    autoPlay: z.ZodOptional<z.ZodBoolean>;
    interval: z.ZodOptional<z.ZodNumber>;
    showDots: z.ZodOptional<z.ZodBoolean>;
    showArrows: z.ZodOptional<z.ZodBoolean>;
    children: z.ZodOptional<z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "track" | "indicator" | "controls" | "viewport" | "nextButton" | "slide" | "prevButton" | "indicatorItem", z.ZodOptional<z.ZodObject<{
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
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        indicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        controls?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        viewport?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        nextButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        slide?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        prevButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        indicatorItem?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        track?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        indicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        controls?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        viewport?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        nextButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        slide?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        prevButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        indicatorItem?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    autoPlay?: unknown;
    interval?: unknown;
    showDots?: unknown;
    showArrows?: unknown;
    children?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    autoPlay?: unknown;
    interval?: unknown;
    showDots?: unknown;
    showArrows?: unknown;
    children?: unknown;
    slots?: unknown;
}>;
