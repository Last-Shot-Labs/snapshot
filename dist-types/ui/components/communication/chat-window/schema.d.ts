import { z } from "zod";
/**
 * Zod config schema for the ChatWindow component.
 *
 * A full chat interface composing a message thread, rich input,
 * and typing indicator into a single component.
 *
 * @example
 * ```json
 * {
 *   "type": "chat-window",
 *   "title": "#general",
 *   "data": "GET /api/channels/general/messages",
 *   "sendAction": {
 *     "type": "api",
 *     "method": "POST",
 *     "endpoint": "/api/channels/general/messages"
 *   },
 *   "height": "600px"
 * }
 * ```
 */
export declare const chatWindowConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"chat-window">;
    data: any;
    contentField: z.ZodOptional<z.ZodString>;
    authorNameField: z.ZodOptional<z.ZodString>;
    authorAvatarField: z.ZodOptional<z.ZodString>;
    timestampField: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    subtitle: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    showHeader: z.ZodOptional<z.ZodBoolean>;
    inputPlaceholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    inputFeatures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    mentionData: any;
    sendAction: any;
    showTypingIndicator: z.ZodOptional<z.ZodBoolean>;
    showReactions: z.ZodOptional<z.ZodBoolean>;
    height: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "title" | "subtitle" | "header" | "titleGroup" | "headerIcon" | "inputArea" | "threadArea" | "typingArea", z.ZodOptional<z.ZodObject<{
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
        subtitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        titleGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        headerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        threadArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        typingArea?: {
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
        subtitle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        header?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        titleGroup?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        headerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        threadArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        typingArea?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    contentField?: unknown;
    authorNameField?: unknown;
    authorAvatarField?: unknown;
    timestampField?: unknown;
    title?: unknown;
    subtitle?: unknown;
    showHeader?: unknown;
    inputPlaceholder?: unknown;
    inputFeatures?: unknown;
    mentionData?: unknown;
    sendAction?: unknown;
    showTypingIndicator?: unknown;
    showReactions?: unknown;
    height?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    data?: unknown;
    contentField?: unknown;
    authorNameField?: unknown;
    authorAvatarField?: unknown;
    timestampField?: unknown;
    title?: unknown;
    subtitle?: unknown;
    showHeader?: unknown;
    inputPlaceholder?: unknown;
    inputFeatures?: unknown;
    mentionData?: unknown;
    sendAction?: unknown;
    showTypingIndicator?: unknown;
    showReactions?: unknown;
    height?: unknown;
    slots?: unknown;
}>;
