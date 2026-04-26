import { z } from "zod";
/**
 * Zod config schema for the TagSelector component.
 *
 * A tag input that allows selecting from predefined tags or creating new ones.
 * Tags display as colored pills with remove buttons.
 *
 * @example
 * ```json
 * {
 *   "type": "tag-selector",
 *   "id": "topic-tags",
 *   "label": "Topics",
 *   "tags": [
 *     { "label": "React", "value": "react", "color": "#61dafb" },
 *     { "label": "TypeScript", "value": "ts", "color": "#3178c6" }
 *   ],
 *   "allowCreate": true,
 *   "maxTags": 5
 * }
 * ```
 */
export declare const tagSelectorConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"tag-selector">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Display label for the tag. */
        label: z.ZodUnion<[z.ZodString, any]>;
        /** Value identifier for the tag. */
        value: z.ZodString;
        /** CSS color for the tag pill. */
        color: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        value?: unknown;
        color?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        value?: unknown;
        color?: unknown;
    }>, "many">>;
    data: any;
    labelField: z.ZodOptional<z.ZodString>;
    valueField: z.ZodOptional<z.ZodString>;
    colorField: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, any]>>;
    allowCreate: z.ZodOptional<z.ZodBoolean>;
    createAction: any;
    on: z.ZodOptional<z.ZodObject<{
        click: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        focus: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        blur: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        keyDown: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        mouseEnter: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        mouseLeave: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    } & {
        pointerDown: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        pointerUp: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        touchStart: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        touchEnd: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    } & {
        change: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
        input: z.ZodOptional<z.ZodUnion<[any, z.ZodArray<any, "many">]>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        click?: unknown;
        focus?: unknown;
        blur?: unknown;
        keyDown?: unknown;
        mouseEnter?: unknown;
        mouseLeave?: unknown;
        pointerDown?: unknown;
        pointerUp?: unknown;
        touchStart?: unknown;
        touchEnd?: unknown;
        change?: unknown;
        input?: unknown;
    }, {
        [x: string]: any;
        click?: unknown;
        focus?: unknown;
        blur?: unknown;
        keyDown?: unknown;
        mouseEnter?: unknown;
        mouseLeave?: unknown;
        pointerDown?: unknown;
        pointerUp?: unknown;
        touchStart?: unknown;
        touchEnd?: unknown;
        change?: unknown;
        input?: unknown;
    }>>;
    maxTags: z.ZodOptional<z.ZodNumber>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "root" | "error" | "loading" | "label" | "option" | "field" | "dropdown" | "optionLabel" | "pill" | "pillLabel" | "errorMessage" | "retryButton" | "removeButton" | "optionSwatch" | "createOption" | "createOptionLabel", z.ZodOptional<z.ZodObject<{
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
        input?: {
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
        option?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
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
        pill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pillLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        errorMessage?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        retryButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        removeButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionSwatch?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        createOption?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        createOptionLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        input?: {
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
        option?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
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
        pill?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        pillLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        errorMessage?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        retryButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        removeButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionSwatch?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        createOption?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        createOptionLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    tags?: unknown;
    data?: unknown;
    labelField?: unknown;
    valueField?: unknown;
    colorField?: unknown;
    value?: unknown;
    allowCreate?: unknown;
    createAction?: unknown;
    on?: unknown;
    maxTags?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    tags?: unknown;
    data?: unknown;
    labelField?: unknown;
    valueField?: unknown;
    colorField?: unknown;
    value?: unknown;
    allowCreate?: unknown;
    createAction?: unknown;
    on?: unknown;
    maxTags?: unknown;
    slots?: unknown;
}>;
