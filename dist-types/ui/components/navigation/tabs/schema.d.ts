import { z } from "zod";
export declare const tabsSlotNames: readonly ["root", "list", "tab", "tabLabel", "tabIcon", "panel"];
/**
 * Schema for a single tab within the tabs component.
 */
export declare const tabConfigSchema: z.ZodObject<{
    /** Display label for the tab. */
    label: z.ZodUnion<[z.ZodString, any]>;
    /** Optional icon name (e.g. Lucide icon). */
    icon: z.ZodOptional<z.ZodString>;
    /** Child components rendered when this tab is active. */
    content: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
    /** Whether this tab is disabled. */
    disabled: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"tab" | "panel" | "tabLabel" | "tabIcon", z.ZodOptional<z.ZodObject<{
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
        tab?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        tab?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    label?: unknown;
    icon?: unknown;
    content?: unknown;
    disabled?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    label?: unknown;
    icon?: unknown;
    content?: unknown;
    disabled?: unknown;
    slots?: unknown;
}>;
/** Inferred type for a single tab config. */
export type TabConfig = z.input<typeof tabConfigSchema>;
/**
 * Zod schema for tabs component config.
 * Tabs provide in-page navigation between content panels.
 * Each tab's content is rendered via ComponentRenderer.
 */
export declare const tabsConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"tabs">;
    children: z.ZodArray<z.ZodObject<{
        /** Display label for the tab. */
        label: z.ZodUnion<[z.ZodString, any]>;
        /** Optional icon name (e.g. Lucide icon). */
        icon: z.ZodOptional<z.ZodString>;
        /** Child components rendered when this tab is active. */
        content: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
        /** Whether this tab is disabled. */
        disabled: z.ZodOptional<z.ZodBoolean>;
        slots: z.ZodOptional<z.ZodObject<Record<"tab" | "panel" | "tabLabel" | "tabIcon", z.ZodOptional<z.ZodObject<{
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
            tab?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            panel?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            tabLabel?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            tabIcon?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
        }, {
            tab?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            panel?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            tabLabel?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            tabIcon?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        icon?: unknown;
        content?: unknown;
        disabled?: unknown;
        slots?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        icon?: unknown;
        content?: unknown;
        disabled?: unknown;
        slots?: unknown;
    }>, "many">;
    defaultTab: z.ZodDefault<z.ZodNumber>;
    urlSync: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        params: z.ZodRecord<z.ZodString, z.ZodString>;
        replace: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        params: Record<string, string>;
        replace: boolean;
    }, {
        params: Record<string, string>;
        replace?: boolean | undefined;
    }>]>>;
    variant: z.ZodDefault<z.ZodEnum<["default", "underline", "pills"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "list" | "tab" | "panel" | "tabLabel" | "tabIcon", z.ZodOptional<z.ZodObject<{
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
        list?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tab?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        list?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tab?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        panel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tabIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    children?: unknown;
    defaultTab?: unknown;
    urlSync?: unknown;
    variant?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    children?: unknown;
    defaultTab?: unknown;
    urlSync?: unknown;
    variant?: unknown;
    slots?: unknown;
}>;
/** Inferred type for tabs config. */
export type TabsConfig = z.input<typeof tabsConfigSchema>;
