import type { ReactNode } from "react";
import { z } from "zod";
export declare const prefetchLinkSlotNames: readonly ["root"];
/**
 * Zod schema for `<PrefetchLink>` config.
 *
 * `<PrefetchLink>` is a prefetch primitive that renders a plain `<a>` tag and
 * automatically injects `<link rel="prefetch">` tags for the route's JS chunks
 * and CSS files when the user hovers over the link or when it enters the viewport.
 *
 * It is not a router-aware component — consumers wire their own router.
 * This avoids a peer dependency on TanStack Router.
 */
export declare const prefetchLinkSchema: z.ZodObject<{
    [x: string]: any;
} & {
    to: z.ZodString;
    prefetch: z.ZodDefault<z.ZodEnum<["hover", "visible", "viewport", "eager", "none"]>>;
    children: z.ZodOptional<z.ZodType<ReactNode, z.ZodTypeDef, ReactNode>>;
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
    target: z.ZodOptional<z.ZodString>;
    rel: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    to?: unknown;
    prefetch?: unknown;
    children?: unknown;
    slots?: unknown;
    target?: unknown;
    rel?: unknown;
}, {
    [x: string]: any;
    to?: unknown;
    prefetch?: unknown;
    children?: unknown;
    slots?: unknown;
    target?: unknown;
    rel?: unknown;
}>;
/**
 * The output type of `prefetchLinkSchema` — all fields fully resolved with
 * defaults applied. This is the type received by the component implementation.
 */
export type PrefetchLinkConfig = z.infer<typeof prefetchLinkSchema>;
/**
 * The input type of `prefetchLinkSchema` — mirrors what callers pass before
 * Zod applies defaults. Use this as the component's public prop type so that
 * `prefetch` and other defaulted fields are optional at the call site.
 */
export type PrefetchLinkProps = z.input<typeof prefetchLinkSchema>;
export type PrefetchLinkSlotNames = typeof prefetchLinkSlotNames;
