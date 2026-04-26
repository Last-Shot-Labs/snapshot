import { z } from "zod";
/**
 * Zod config schema for the LocationInput component.
 *
 * Geocode autocomplete input that searches a backend endpoint,
 * displays matching locations in a dropdown, and extracts
 * coordinates on selection. Publishes `{ name, lat, lng, address }`.
 *
 * @example
 * ```json
 * {
 *   "type": "location-input",
 *   "id": "venue-location",
 *   "label": "Venue",
 *   "placeholder": "Search for a location...",
 *   "searchEndpoint": "GET /api/geocode",
 *   "changeAction": {
 *     "type": "set-value",
 *     "target": "map",
 *     "value": { "from": "venue-location" }
 *   }
 * }
 * ```
 *
 * Expected API response format:
 * ```json
 * [
 *   {
 *     "name": "Central Park",
 *     "address": "New York, NY, USA",
 *     "lat": 40.7829,
 *     "lng": -73.9654
 *   }
 * ]
 * ```
 */
export declare const locationInputConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"location-input">;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    searchEndpoint: any;
    nameField: z.ZodOptional<z.ZodString>;
    addressField: z.ZodOptional<z.ZodString>;
    latField: z.ZodOptional<z.ZodString>;
    lngField: z.ZodOptional<z.ZodString>;
    debounceMs: z.ZodOptional<z.ZodNumber>;
    minChars: z.ZodOptional<z.ZodNumber>;
    showMapLink: z.ZodOptional<z.ZodBoolean>;
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
    disabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    required: z.ZodOptional<z.ZodBoolean>;
    helperText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    errorText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "required" | "root" | "error" | "label" | "leadingIcon" | "field" | "helper" | "results" | "result" | "loadingIcon" | "resultIcon" | "resultContent" | "resultName" | "resultAddress" | "mapLink", z.ZodOptional<z.ZodObject<{
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
        required?: {
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
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        leadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        results?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        result?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultContent?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultName?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultAddress?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        mapLink?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        required?: {
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
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        leadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        results?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        result?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        loadingIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultContent?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultName?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        resultAddress?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        mapLink?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    value?: unknown;
    searchEndpoint?: unknown;
    nameField?: unknown;
    addressField?: unknown;
    latField?: unknown;
    lngField?: unknown;
    debounceMs?: unknown;
    minChars?: unknown;
    showMapLink?: unknown;
    on?: unknown;
    disabled?: unknown;
    required?: unknown;
    helperText?: unknown;
    errorText?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    value?: unknown;
    searchEndpoint?: unknown;
    nameField?: unknown;
    addressField?: unknown;
    latField?: unknown;
    lngField?: unknown;
    debounceMs?: unknown;
    minChars?: unknown;
    showMapLink?: unknown;
    on?: unknown;
    disabled?: unknown;
    required?: unknown;
    helperText?: unknown;
    errorText?: unknown;
    slots?: unknown;
}>;
