import { z } from "zod";
/**
 * Zod config schema for the RichTextEditor component.
 *
 * Defines all manifest-settable fields for a CodeMirror 6-based markdown editor
 * with toolbar, preview pane, and split view support.
 *
 * @example
 * ```json
 * {
 *   "type": "rich-text-editor",
 *   "id": "content-editor",
 *   "content": "# Hello\n\nStart writing...",
 *   "mode": "split",
 *   "toolbar": ["bold", "italic", "h1", "h2", "separator", "code", "link"]
 * }
 * ```
 */
export declare const richTextEditorConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"rich-text-editor">;
    content: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    mode: z.ZodOptional<z.ZodEnum<["edit", "preview", "split"]>>;
    readonly: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    toolbar: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodArray<z.ZodEnum<["bold", "italic", "strikethrough", "h1", "h2", "h3", "bullet-list", "ordered-list", "code", "code-block", "link", "quote", "separator"]>, "many">]>>;
    minHeight: z.ZodOptional<z.ZodString>;
    maxHeight: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "separator" | "content" | "toolbar" | "toolbarGroup" | "toolbarButton" | "modeGroup" | "modeButton" | "editorPane" | "previewPane" | "emptyPreview", z.ZodOptional<z.ZodObject<{
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
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbarGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbarButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        modeGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        modeButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        editorPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        previewPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyPreview?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        separator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbarGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbarButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        modeGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        modeButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        editorPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        previewPane?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyPreview?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    content?: unknown;
    placeholder?: unknown;
    mode?: unknown;
    readonly?: unknown;
    toolbar?: unknown;
    minHeight?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    content?: unknown;
    placeholder?: unknown;
    mode?: unknown;
    readonly?: unknown;
    toolbar?: unknown;
    minHeight?: unknown;
    maxHeight?: unknown;
    slots?: unknown;
}>;
