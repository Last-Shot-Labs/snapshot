import { z } from "zod";
/**
 * Zod config schema for the LinkEmbed component.
 *
 * Renders rich URL previews with platform-specific renderers for
 * YouTube, Instagram, TikTok, Twitter/X, and generic Open Graph cards.
 * Also supports inline GIF embeds.
 *
 * @example
 * ```json
 * {
 *   "type": "link-embed",
 *   "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 * }
 * ```
 *
 * @example
 * ```json
 * {
 *   "type": "link-embed",
 *   "url": "https://twitter.com/user/status/123",
 *   "meta": {
 *     "title": "Tweet by @user",
 *     "description": "Hello world!",
 *     "image": "https://pbs.twimg.com/...",
 *     "siteName": "Twitter",
 *     "favicon": "https://abs.twimg.com/favicons/twitter.3.ico"
 *   }
 * }
 * ```
 */
export declare const linkEmbedConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"link-embed">;
    url: z.ZodUnion<[z.ZodString, any]>;
    meta: z.ZodOptional<z.ZodObject<{
        /** Page title. */
        title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
        /** Page description. */
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
        /** Preview image URL. */
        image: z.ZodOptional<z.ZodString>;
        /** Site name (e.g., "YouTube", "Twitter"). */
        siteName: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
        /** Site favicon URL. */
        favicon: z.ZodOptional<z.ZodString>;
        /** Content type hint. */
        type: z.ZodOptional<z.ZodEnum<["article", "video", "rich", "photo", "gif"]>>;
        /** Accent color (hex). */
        color: z.ZodOptional<z.ZodString>;
        /** oEmbed HTML for rich embeds (iframes). */
        html: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        title?: unknown;
        description?: unknown;
        image?: unknown;
        siteName?: unknown;
        favicon?: unknown;
        type?: unknown;
        color?: unknown;
        html?: unknown;
    }, {
        [x: string]: any;
        title?: unknown;
        description?: unknown;
        image?: unknown;
        siteName?: unknown;
        favicon?: unknown;
        type?: unknown;
        color?: unknown;
        html?: unknown;
    }>>;
    maxWidth: z.ZodOptional<z.ZodString>;
    allowIframe: z.ZodOptional<z.ZodBoolean>;
    aspectRatio: z.ZodOptional<z.ZodString>;
    slots: z.ZodOptional<z.ZodObject<Record<"card" | "root" | "title" | "url" | "description" | "content" | "media" | "embedFrame" | "gifImage" | "siteName" | "thumbnail" | "siteMeta" | "favicon", z.ZodOptional<z.ZodObject<{
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
        card?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        url?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        media?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        embedFrame?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        gifImage?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        siteName?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        thumbnail?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        siteMeta?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        favicon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        card?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        title?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        url?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        media?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        embedFrame?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        gifImage?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        siteName?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        thumbnail?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        siteMeta?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        favicon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    url?: unknown;
    meta?: unknown;
    maxWidth?: unknown;
    allowIframe?: unknown;
    aspectRatio?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    url?: unknown;
    meta?: unknown;
    maxWidth?: unknown;
    allowIframe?: unknown;
    aspectRatio?: unknown;
    slots?: unknown;
}>;
