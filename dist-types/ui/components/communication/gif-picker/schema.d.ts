import { z } from "zod";
/**
 * Zod config schema for the GifPicker component.
 *
 * Searchable GIF picker that queries a GIF API (Giphy/Tenor) and
 * displays results in a masonry-style grid.
 *
 * The component expects a backend proxy endpoint that handles the
 * actual API key and returns GIF results. This avoids exposing
 * API keys in the frontend.
 *
 * @example
 * ```json
 * {
 *   "type": "gif-picker",
 *   "searchEndpoint": "GET /api/gifs/search",
 *   "trendingEndpoint": "GET /api/gifs/trending",
 *   "selectAction": {
 *     "type": "toast",
 *     "message": "GIF selected!"
 *   }
 * }
 * ```
 *
 * Expected API response format:
 * ```json
 * {
 *   "results": [
 *     {
 *       "id": "abc123",
 *       "url": "https://media.giphy.com/media/abc123/giphy.gif",
 *       "preview": "https://media.giphy.com/media/abc123/200w.gif",
 *       "width": 480,
 *       "height": 270,
 *       "title": "Funny cat"
 *     }
 *   ]
 * }
 * ```
 */
export declare const gifPickerConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"gif-picker">;
    searchEndpoint: any;
    trendingEndpoint: any;
    gifs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        preview: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        title: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        id?: unknown;
        url?: unknown;
        preview?: unknown;
        width?: unknown;
        height?: unknown;
        title?: unknown;
    }, {
        [x: string]: any;
        id?: unknown;
        url?: unknown;
        preview?: unknown;
        width?: unknown;
        height?: unknown;
        title?: unknown;
    }>, "many">>;
    urlField: z.ZodOptional<z.ZodString>;
    previewField: z.ZodOptional<z.ZodString>;
    titleField: z.ZodOptional<z.ZodString>;
    selectAction: any;
    columns: z.ZodOptional<z.ZodNumber>;
    maxHeight: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    attribution: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"root" | "content" | "grid" | "item" | "image" | "emptyState" | "loadingState" | "loadingIcon" | "searchSection" | "searchShell" | "searchIcon" | "searchInput" | "attribution", z.ZodOptional<z.ZodObject<{
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
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        grid?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        image?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchSection?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchShell?: {
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
        attribution?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        root?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        content?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        grid?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        image?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        emptyState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingState?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchSection?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        searchShell?: {
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
        attribution?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    searchEndpoint?: unknown;
    trendingEndpoint?: unknown;
    gifs?: unknown;
    urlField?: unknown;
    previewField?: unknown;
    titleField?: unknown;
    selectAction?: unknown;
    columns?: unknown;
    maxHeight?: unknown;
    placeholder?: unknown;
    attribution?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    searchEndpoint?: unknown;
    trendingEndpoint?: unknown;
    gifs?: unknown;
    urlField?: unknown;
    previewField?: unknown;
    titleField?: unknown;
    selectAction?: unknown;
    columns?: unknown;
    maxHeight?: unknown;
    placeholder?: unknown;
    attribution?: unknown;
    slots?: unknown;
}>;
