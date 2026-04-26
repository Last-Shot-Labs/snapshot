import { z } from "zod";
export declare const inlineEditSlotNames: readonly ["root", "display", "displayText", "displayIcon", "input"];
/**
 * Zod config schema for the InlineEdit component.
 *
 * A click-to-edit text field that toggles between display and edit modes.
 * Publishes `{ value, editing }` to the page context.
 *
 * @example
 * ```json
 * {
 *   "type": "inline-edit",
 *   "id": "title-edit",
 *   "value": "My Title",
 *   "placeholder": "Enter title",
 *   "saveAction": { "type": "api", "method": "PUT", "endpoint": "/api/title", "body": { "from": "title-edit" } }
 * }
 * ```
 */
export declare const inlineEditConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"inline-edit">;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    inputType: z.ZodOptional<z.ZodEnum<["text", "number"]>>;
    saveAction: any;
    cancelOnEscape: z.ZodOptional<z.ZodBoolean>;
    fontSize: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "root" | "display" | "displayText" | "displayIcon", z.ZodOptional<z.ZodObject<{
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
        display?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        displayText?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        displayIcon?: {
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
        display?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        displayText?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        displayIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    placeholder?: unknown;
    inputType?: unknown;
    saveAction?: unknown;
    cancelOnEscape?: unknown;
    fontSize?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    value?: unknown;
    placeholder?: unknown;
    inputType?: unknown;
    saveAction?: unknown;
    cancelOnEscape?: unknown;
    fontSize?: unknown;
    slots?: unknown;
}>;
