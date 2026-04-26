import { z } from "zod";
export declare const chartSlotNames: readonly ["root", "legend", "legendItem", "tooltip", "series", "axis", "grid"];
/**
 * Schema for a single data series in the chart.
 */
export declare const seriesConfigSchema: z.ZodObject<{
    /** Data key in each data record. */
    key: z.ZodString;
    /** Display label for this series (legend, tooltip). */
    label: z.ZodUnion<[z.ZodString, any]>;
    /** CSS color value or CSS variable (e.g. "var(--sn-chart-1)"). */
    color: z.ZodOptional<z.ZodString>;
    /** Divide numeric series values before display (e.g. cents to dollars). */
    divisor: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    key?: unknown;
    label?: unknown;
    color?: unknown;
    divisor?: unknown;
}, {
    [x: string]: any;
    key?: unknown;
    label?: unknown;
    color?: unknown;
    divisor?: unknown;
}>;
/**
 * Zod schema for the Chart component configuration.
 *
 * Renders a data visualization (bar, line, area, pie, donut) from an endpoint
 * or from-ref. Uses Recharts under the hood. Colors default to
 * `--sn-chart-1` through `--sn-chart-5` tokens.
 */
export declare const chartSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"chart">;
    data: any;
    chartType: z.ZodDefault<z.ZodEnum<["bar", "line", "area", "pie", "donut", "sparkline", "funnel", "radar", "treemap", "scatter"]>>;
    xKey: z.ZodString;
    xLookup: z.ZodOptional<z.ZodObject<{
        resource: z.ZodString;
        valueField: z.ZodOptional<z.ZodString>;
        labelField: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        resource: string;
        valueField?: string | undefined;
        labelField?: string | undefined;
    }, {
        resource: string;
        valueField?: string | undefined;
        labelField?: string | undefined;
    }>>;
    series: z.ZodArray<z.ZodObject<{
        /** Data key in each data record. */
        key: z.ZodString;
        /** Display label for this series (legend, tooltip). */
        label: z.ZodUnion<[z.ZodString, any]>;
        /** CSS color value or CSS variable (e.g. "var(--sn-chart-1)"). */
        color: z.ZodOptional<z.ZodString>;
        /** Divide numeric series values before display (e.g. cents to dollars). */
        divisor: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        key?: unknown;
        label?: unknown;
        color?: unknown;
        divisor?: unknown;
    }, {
        [x: string]: any;
        key?: unknown;
        label?: unknown;
        color?: unknown;
        divisor?: unknown;
    }>, "many">;
    height: z.ZodDefault<z.ZodNumber>;
    aspectRatio: z.ZodOptional<z.ZodString>;
    legend: z.ZodDefault<z.ZodBoolean>;
    grid: z.ZodDefault<z.ZodBoolean>;
    emptyMessage: z.ZodDefault<z.ZodUnion<[z.ZodString, any]>>;
    empty: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        className: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
        states: z.ZodOptional<z.ZodOptional<z.ZodRecord<any, z.ZodObject<{
            [x: string]: z.ZodOptional<any>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
        }, {
            [x: string]: any;
        }>>>>;
        hover: any;
        focus: any;
        active: any;
        background: any;
        backgroundColor: z.ZodOptional<z.ZodString>;
        padding: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        paddingX: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        paddingY: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        margin: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        marginX: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        marginY: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        gap: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        minWidth: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        maxWidth: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        minHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        maxHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        bg: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        borderRadius: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        border: z.ZodOptional<z.ZodString>;
        shadow: z.ZodOptional<z.ZodString>;
        opacity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        overflow: z.ZodOptional<z.ZodString>;
        cursor: z.ZodOptional<z.ZodString>;
        position: any;
        inset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        display: any;
        flexDirection: any;
        alignItems: z.ZodOptional<z.ZodString>;
        justifyContent: z.ZodOptional<z.ZodString>;
        flexWrap: z.ZodOptional<z.ZodString>;
        flex: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        gridTemplateColumns: z.ZodOptional<z.ZodString>;
        gridTemplateRows: z.ZodOptional<z.ZodString>;
        gridColumn: z.ZodOptional<z.ZodString>;
        gridRow: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodUnion<[any, z.ZodString, z.ZodNumber]>>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        lineHeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        letterSpacing: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        icon: z.ZodOptional<z.ZodString>;
        title: z.ZodDefault<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
        size: z.ZodOptional<z.ZodEnum<["sm", "md", "lg"]>>;
        iconColor: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
            action: z.ZodUnion<[z.ZodType<any, z.ZodTypeDef, any>, z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">]>;
            icon: z.ZodOptional<z.ZodString>;
            variant: z.ZodDefault<z.ZodEnum<["default", "primary", "outline"]>>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
            action?: unknown;
            icon?: unknown;
            variant?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
            action?: unknown;
            icon?: unknown;
            variant?: unknown;
        }>>;
        slots: z.ZodOptional<z.ZodObject<Record<"root" | "action" | "title" | "icon" | "description", z.ZodOptional<z.ZodObject<{
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
            action?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            title?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            icon?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            description?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
        }, {
            root?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            action?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            title?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            icon?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            description?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        id?: unknown;
        className?: unknown;
        style?: unknown;
        states?: unknown;
        hover?: unknown;
        focus?: unknown;
        active?: unknown;
        background?: unknown;
        backgroundColor?: unknown;
        padding?: unknown;
        paddingX?: unknown;
        paddingY?: unknown;
        margin?: unknown;
        marginX?: unknown;
        marginY?: unknown;
        gap?: unknown;
        width?: unknown;
        minWidth?: unknown;
        maxWidth?: unknown;
        height?: unknown;
        minHeight?: unknown;
        maxHeight?: unknown;
        bg?: unknown;
        color?: unknown;
        borderRadius?: unknown;
        border?: unknown;
        shadow?: unknown;
        opacity?: unknown;
        overflow?: unknown;
        cursor?: unknown;
        position?: unknown;
        inset?: unknown;
        display?: unknown;
        flexDirection?: unknown;
        alignItems?: unknown;
        justifyContent?: unknown;
        flexWrap?: unknown;
        flex?: unknown;
        gridTemplateColumns?: unknown;
        gridTemplateRows?: unknown;
        gridColumn?: unknown;
        gridRow?: unknown;
        textAlign?: unknown;
        fontSize?: unknown;
        fontWeight?: unknown;
        lineHeight?: unknown;
        letterSpacing?: unknown;
        icon?: unknown;
        title?: unknown;
        description?: unknown;
        size?: unknown;
        iconColor?: unknown;
        action?: unknown;
        slots?: unknown;
    }, {
        [x: string]: any;
        id?: unknown;
        className?: unknown;
        style?: unknown;
        states?: unknown;
        hover?: unknown;
        focus?: unknown;
        active?: unknown;
        background?: unknown;
        backgroundColor?: unknown;
        padding?: unknown;
        paddingX?: unknown;
        paddingY?: unknown;
        margin?: unknown;
        marginX?: unknown;
        marginY?: unknown;
        gap?: unknown;
        width?: unknown;
        minWidth?: unknown;
        maxWidth?: unknown;
        height?: unknown;
        minHeight?: unknown;
        maxHeight?: unknown;
        bg?: unknown;
        color?: unknown;
        borderRadius?: unknown;
        border?: unknown;
        shadow?: unknown;
        opacity?: unknown;
        overflow?: unknown;
        cursor?: unknown;
        position?: unknown;
        inset?: unknown;
        display?: unknown;
        flexDirection?: unknown;
        alignItems?: unknown;
        justifyContent?: unknown;
        flexWrap?: unknown;
        flex?: unknown;
        gridTemplateColumns?: unknown;
        gridTemplateRows?: unknown;
        gridColumn?: unknown;
        gridRow?: unknown;
        textAlign?: unknown;
        fontSize?: unknown;
        fontWeight?: unknown;
        lineHeight?: unknown;
        letterSpacing?: unknown;
        icon?: unknown;
        title?: unknown;
        description?: unknown;
        size?: unknown;
        iconColor?: unknown;
        action?: unknown;
        slots?: unknown;
    }>>;
    hideWhenEmpty: z.ZodDefault<z.ZodBoolean>;
    loading: z.ZodOptional<z.ZodObject<any, "strict", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>>;
    live: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        event: z.ZodDefault<z.ZodString>;
        debounce: z.ZodOptional<z.ZodNumber>;
        indicator: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        event: string;
        indicator: boolean;
        debounce?: number | undefined;
    }, {
        event?: string | undefined;
        debounce?: number | undefined;
        indicator?: boolean | undefined;
    }>]>>;
    onClick: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    poll: z.ZodOptional<z.ZodObject<{
        interval: z.ZodNumber;
        pauseWhenHidden: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        interval: number;
        pauseWhenHidden: boolean;
    }, {
        interval: number;
        pauseWhenHidden?: boolean | undefined;
    }>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "grid" | "legend" | "tooltip" | "axis" | "legendItem" | "series", z.ZodOptional<z.ZodObject<{
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
        grid?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        legend?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tooltip?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        axis?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        legendItem?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        series?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        grid?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        legend?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        tooltip?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        axis?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        legendItem?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        series?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    chartType?: unknown;
    xKey?: unknown;
    xLookup?: unknown;
    series?: unknown;
    height?: unknown;
    aspectRatio?: unknown;
    legend?: unknown;
    grid?: unknown;
    emptyMessage?: unknown;
    empty?: unknown;
    hideWhenEmpty?: unknown;
    loading?: unknown;
    live?: unknown;
    onClick?: unknown;
    poll?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    chartType?: unknown;
    xKey?: unknown;
    xLookup?: unknown;
    series?: unknown;
    height?: unknown;
    aspectRatio?: unknown;
    legend?: unknown;
    grid?: unknown;
    emptyMessage?: unknown;
    empty?: unknown;
    hideWhenEmpty?: unknown;
    loading?: unknown;
    live?: unknown;
    onClick?: unknown;
    poll?: unknown;
    slots?: unknown;
}>;
