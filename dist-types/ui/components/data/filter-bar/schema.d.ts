import { z } from "zod";
export declare const filterBarConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"filter-bar">;
    searchPlaceholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    showSearch: z.ZodOptional<z.ZodBoolean>;
    filters: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodUnion<[z.ZodString, any]>;
        options: z.ZodArray<z.ZodObject<{
            label: z.ZodUnion<[z.ZodString, any]>;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
            value?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
            value?: unknown;
        }>, "many">;
        multiple: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        key?: unknown;
        label?: unknown;
        options?: unknown;
        multiple?: unknown;
    }, {
        [x: string]: any;
        key?: unknown;
        label?: unknown;
        options?: unknown;
        multiple?: unknown;
    }>, "many">>;
    changeAction: any;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "search" | "option" | "toolbar" | "dropdown" | "optionLabel" | "searchIcon" | "searchInput" | "pill" | "pillLabel" | "pillRemove" | "optionIndicator" | "filterButton" | "clearButton", z.ZodOptional<z.ZodObject<{
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
        search?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        option?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropdown?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pillLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pillRemove?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        filterButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        clearButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        search?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        option?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropdown?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pillLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pillRemove?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        filterButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        clearButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    searchPlaceholder?: unknown;
    showSearch?: unknown;
    filters?: unknown;
    changeAction?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    searchPlaceholder?: unknown;
    showSearch?: unknown;
    filters?: unknown;
    changeAction?: unknown;
    slots?: unknown;
}>;
