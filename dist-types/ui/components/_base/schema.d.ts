import { z } from "zod";
import { activeConfigSchema, componentAnimationSchema, componentBackgroundSchema, componentTokenOverridesSchema, componentTransitionSchema, componentZIndexSchema, exitAnimationSchema, focusConfigSchema, hoverConfigSchema, spacingEnum, slotStateNameSchema } from "@lastshotlabs/frontend-contract/components";
export { activeConfigSchema, componentAnimationSchema, componentBackgroundSchema, componentTokenOverridesSchema, componentTransitionSchema, componentZIndexSchema, exitAnimationSchema, focusConfigSchema, hoverConfigSchema, spacingEnum, slotStateNameSchema, };
export declare const styleableElementFields: any;
export declare const styleableElementSchema: z.ZodObject<any, "strict", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
export declare const statefulElementSchema: z.ZodObject<{
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
}>;
export declare function slotsSchema<const T extends readonly [string, ...string[]]>(slotNames: T): z.ZodObject<Record<T[number], z.ZodOptional<z.ZodObject<{
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
}>>>, "strict", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Record<T[number], z.ZodOptional<z.ZodObject<{
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
}>>>>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<Record<T[number], z.ZodOptional<z.ZodObject<{
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
}>>>> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
export declare const extendedBaseComponentSchema: z.ZodObject<any, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
export declare function extendComponentSchema<T extends z.ZodRawShape>(shape: T): z.ZodObject<z.objectUtil.extendShape<any, T>, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<z.objectUtil.extendShape<any, T>>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<z.objectUtil.extendShape<any, T>> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
