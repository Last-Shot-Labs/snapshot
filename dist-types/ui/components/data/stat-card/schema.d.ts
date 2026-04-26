import { z } from "zod";
/** Schema for the trend indicator configuration. */
export declare const trendConfigSchema: z.ZodObject<{
    /** Response field containing the comparison value. */
    field: z.ZodString;
    /** Whether an upward trend is good or bad. Default: 'up-is-good'. */
    sentiment: z.ZodOptional<z.ZodEnum<["up-is-good", "up-is-bad"]>>;
    /** How to format the trend value. Default: 'percent'. */
    format: z.ZodOptional<z.ZodEnum<["percent", "absolute"]>>;
}, "strict", z.ZodTypeAny, {
    field: string;
    format?: "absolute" | "percent" | undefined;
    sentiment?: "up-is-good" | "up-is-bad" | undefined;
}, {
    field: string;
    format?: "absolute" | "percent" | undefined;
    sentiment?: "up-is-good" | "up-is-bad" | undefined;
}>;
/**
 * Zod config schema for the StatCard component.
 *
 * Defines all manifest-settable fields for a stat card that displays
 * a single metric with optional trend indicator.
 *
 * @example
 * ```json
 * {
 *   "type": "stat-card",
 *   "data": "GET /api/stats/revenue",
 *   "field": "total",
 *   "label": "Revenue",
 *   "format": "currency",
 *   "trend": { "field": "previousTotal", "sentiment": "up-is-good" }
 * }
 * ```
 */
export declare const statCardConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"stat-card">;
    data: any;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnknown, any]>>>;
    field: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    format: z.ZodOptional<z.ZodEnum<["number", "currency", "percent", "compact", "decimal"]>>;
    currency: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodNumber>;
    prefix: z.ZodOptional<z.ZodString>;
    suffix: z.ZodOptional<z.ZodString>;
    divisor: z.ZodOptional<z.ZodNumber>;
    icon: z.ZodOptional<z.ZodString>;
    iconColor: z.ZodOptional<z.ZodString>;
    trend: z.ZodOptional<z.ZodObject<{
        /** Response field containing the comparison value. */
        field: z.ZodString;
        /** Whether an upward trend is good or bad. Default: 'up-is-good'. */
        sentiment: z.ZodOptional<z.ZodEnum<["up-is-good", "up-is-bad"]>>;
        /** How to format the trend value. Default: 'percent'. */
        format: z.ZodOptional<z.ZodEnum<["percent", "absolute"]>>;
    }, "strict", z.ZodTypeAny, {
        field: string;
        format?: "absolute" | "percent" | undefined;
        sentiment?: "up-is-good" | "up-is-bad" | undefined;
    }, {
        field: string;
        format?: "absolute" | "percent" | undefined;
        sentiment?: "up-is-good" | "up-is-bad" | undefined;
    }>>;
    action: any;
    loading: z.ZodOptional<z.ZodEnum<["skeleton", "pulse", "spinner"]>>;
    error: z.ZodOptional<z.ZodObject<{
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
        title: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>>;
        retry: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            label: z.ZodUnion<[z.ZodUnion<[z.ZodString, any]>, any, any, any]>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
            label?: unknown;
        }, {
            [x: string]: any;
            label?: unknown;
        }>]>>;
        icon: z.ZodOptional<z.ZodString>;
        slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "retry" | "icon" | "description", z.ZodOptional<z.ZodObject<{
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
            title?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            retry?: {
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
            title?: {
                [x: string]: any;
                states?: unknown;
            } | undefined;
            retry?: {
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
        title?: unknown;
        description?: unknown;
        retry?: unknown;
        icon?: unknown;
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
        title?: unknown;
        description?: unknown;
        retry?: unknown;
        icon?: unknown;
        slots?: unknown;
    }>>;
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
    ariaLive: z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"value" | "root" | "error" | "loading" | "label" | "icon" | "empty" | "trend" | "valueRow", z.ZodOptional<z.ZodObject<{
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
        error?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loading?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        empty?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trend?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        valueRow?: {
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
        error?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loading?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        icon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        empty?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trend?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        valueRow?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    params?: unknown;
    field?: unknown;
    label?: unknown;
    format?: unknown;
    currency?: unknown;
    decimals?: unknown;
    prefix?: unknown;
    suffix?: unknown;
    divisor?: unknown;
    icon?: unknown;
    iconColor?: unknown;
    trend?: unknown;
    action?: unknown;
    loading?: unknown;
    error?: unknown;
    poll?: unknown;
    empty?: unknown;
    live?: unknown;
    ariaLive?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    params?: unknown;
    field?: unknown;
    label?: unknown;
    format?: unknown;
    currency?: unknown;
    decimals?: unknown;
    prefix?: unknown;
    suffix?: unknown;
    divisor?: unknown;
    icon?: unknown;
    iconColor?: unknown;
    trend?: unknown;
    action?: unknown;
    loading?: unknown;
    error?: unknown;
    poll?: unknown;
    empty?: unknown;
    live?: unknown;
    ariaLive?: unknown;
    slots?: unknown;
}>;
