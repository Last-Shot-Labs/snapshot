import { z } from "zod";
/**
 * Slot declaration supported by layout variants that expose named slot areas.
 */
export declare const layoutSlotSchema: z.ZodObject<{
    /** Slot name. */
    name: z.ZodString;
    /** Whether this slot must be populated by the route. */
    required: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name: string;
    required: boolean;
}, {
    name: string;
    required?: boolean | undefined;
}>;
/**
 * Zod schema for layout component configuration.
 * Defines the layout shell that wraps page content.
 */
export declare const layoutConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"layout">;
    variant: z.ZodDefault<z.ZodString>;
    sidebarWidth: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Slot name. */
        name: z.ZodString;
        /** Whether this slot must be populated by the route. */
        required: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        required: boolean;
    }, {
        name: string;
        required?: boolean | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    variant?: unknown;
    sidebarWidth?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    variant?: unknown;
    sidebarWidth?: unknown;
    slots?: unknown;
}>;
/** Inferred layout config type from the Zod schema. */
export type LayoutConfig = z.infer<typeof layoutConfigSchema>;
