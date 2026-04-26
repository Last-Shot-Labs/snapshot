import { z } from "zod";
/**
 * Zod config schema for the RichInput component.
 *
 * A TipTap-based WYSIWYG editor for chat messages, comments, and posts.
 * Users see formatted text as they type (bold, italic, mentions, etc.)
 * rather than raw markdown.
 *
 * @example
 * ```json
 * {
 *   "type": "rich-input",
 *   "id": "chat-input",
 *   "placeholder": "Type a message...",
 *   "sendOnEnter": true,
 *   "features": ["bold", "italic", "mention", "emoji", "code"],
 *   "sendAction": {
 *     "type": "api",
 *     "method": "POST",
 *     "endpoint": "/api/channels/general/messages",
 *     "body": { "from": "chat-input" }
 *   }
 * }
 * ```
 */
export declare const richInputConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"rich-input">;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    features: z.ZodOptional<z.ZodArray<z.ZodEnum<["bold", "italic", "underline", "strike", "code", "code-block", "link", "bullet-list", "ordered-list", "mention", "emoji"]>, "many">>;
    mentionData: any;
    mentionDisplayField: z.ZodOptional<z.ZodString>;
    mentionValueField: z.ZodOptional<z.ZodString>;
    sendAction: any;
    sendOnEnter: z.ZodOptional<z.ZodBoolean>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    minHeight: z.ZodOptional<z.ZodString>;
    maxHeight: z.ZodOptional<z.ZodString>;
    readonly: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "placeholder" | "toolbar" | "counter" | "toolbarButton" | "editorArea" | "editorContent" | "linkBar" | "linkIcon" | "linkInput" | "linkCloseButton" | "formattingGroup" | "statusGroup" | "sendButton", z.ZodOptional<z.ZodObject<{
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
        placeholder?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        counter?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbarButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        editorArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        editorContent?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkBar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkCloseButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        formattingGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        statusGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        sendButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        placeholder?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        counter?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        toolbarButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        editorArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        editorContent?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkBar?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkInput?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        linkCloseButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        formattingGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        statusGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        sendButton?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    features?: unknown;
    mentionData?: unknown;
    mentionDisplayField?: unknown;
    mentionValueField?: unknown;
    sendAction?: unknown;
    sendOnEnter?: unknown;
    maxLength?: unknown;
    minHeight?: unknown;
    maxHeight?: unknown;
    readonly?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    placeholder?: unknown;
    features?: unknown;
    mentionData?: unknown;
    mentionDisplayField?: unknown;
    mentionValueField?: unknown;
    sendAction?: unknown;
    sendOnEnter?: unknown;
    maxLength?: unknown;
    minHeight?: unknown;
    maxHeight?: unknown;
    readonly?: unknown;
    slots?: unknown;
}>;
