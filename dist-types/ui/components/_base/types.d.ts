import { z } from "zod";
import { fromRefSchema, type FromRef as SharedFromRef } from "@lastshotlabs/frontend-contract/refs";
import { dataSourceSchema, endpointTargetSchema, resourceRefSchema } from "../../manifest/resources";
import { componentAnimationSchema, componentBackgroundSchema, componentTransitionSchema, componentZIndexSchema, hoverConfigSchema, focusConfigSchema, activeConfigSchema, exitAnimationSchema } from "./schema";
/**
 * Schema for a FromRef value — a reference to another component's published data.
 * Supports optional transforms (uppercase, lowercase, trim, etc.) and transformArg.
 */
export { fromRefSchema };
/** Type for a FromRef value. */
export type FromRef = SharedFromRef;
/**
 * Type guard — returns true if value is a FromRef object.
 */
export declare function isFromRef(value: unknown): value is FromRef;
/**
 * Creates a Zod schema that accepts either a literal value of type T or a FromRef.
 *
 * @param schema - The Zod schema for the literal value
 * @returns A union schema accepting either the literal or a FromRef
 */
export declare function orFromRef<T extends z.ZodTypeAny>(schema: T): z.ZodUnion<[T, typeof fromRefSchema]>;
export { dataSourceSchema, endpointTargetSchema, resourceRefSchema };
export declare const pollConfigSchema: z.ZodObject<{
    interval: z.ZodNumber;
    pauseWhenHidden: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    interval: number;
    pauseWhenHidden: boolean;
}, {
    interval: number;
    pauseWhenHidden?: boolean | undefined;
}>;
export type ComponentZIndex = z.infer<typeof componentZIndexSchema>;
export type ComponentAnimationConfig = z.infer<typeof componentAnimationSchema>;
export type ComponentBackgroundConfig = z.infer<typeof componentBackgroundSchema>;
export type ComponentTransitionConfig = z.infer<typeof componentTransitionSchema>;
export type HoverConfig = z.infer<typeof hoverConfigSchema>;
export type FocusConfig = z.infer<typeof focusConfigSchema>;
export type ActiveConfig = z.infer<typeof activeConfigSchema>;
export type ExitAnimationConfig = z.infer<typeof exitAnimationSchema>;
/**
 * Base config fields shared by all config-driven components.
 * Every component schema should extend this via `.merge()` or `.extend()`.
 */
export declare const baseComponentConfigSchema: z.ZodObject<{
    /** Unique identifier for this component instance. Used for from-ref publishing. */
    id: z.ZodOptional<z.ZodString>;
    /** Optional token overrides applied to the wrapper. */
    tokens: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    /** String expression that controls visibility. */
    visibleWhen: z.ZodOptional<z.ZodString>;
    /** Whether the component is visible. Can be a FromRef for conditional rendering. */
    visible: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    /** CSS class name(s) to apply to the component wrapper. */
    className: z.ZodOptional<z.ZodString>;
    /** Inline style overrides as a CSS property map. */
    style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    /** Sticky positioning. */
    sticky: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        top: z.ZodOptional<z.ZodString>;
        zIndex: any;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        top?: unknown;
        zIndex?: unknown;
    }, {
        [x: string]: any;
        top?: unknown;
        zIndex?: unknown;
    }>]>>;
    /** Explicit z-index override. */
    zIndex: any;
    /** Enter animation config. */
    animation: any;
    /** Glass effect shorthand. */
    glass: z.ZodOptional<z.ZodBoolean>;
    /** Background fill shorthand. */
    background: any;
    /** Transition shorthand. */
    transition: any;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    id?: unknown;
    tokens?: unknown;
    visibleWhen?: unknown;
    visible?: unknown;
    className?: unknown;
    style?: unknown;
    sticky?: unknown;
    zIndex?: unknown;
    animation?: unknown;
    glass?: unknown;
    background?: unknown;
    transition?: unknown;
}, {
    [x: string]: any;
    id?: unknown;
    tokens?: unknown;
    visibleWhen?: unknown;
    visible?: unknown;
    className?: unknown;
    style?: unknown;
    sticky?: unknown;
    zIndex?: unknown;
    animation?: unknown;
    glass?: unknown;
    background?: unknown;
    transition?: unknown;
}>;
/** Base config type inferred from the schema. */
export type BaseComponentConfig = z.infer<typeof baseComponentConfigSchema>;
