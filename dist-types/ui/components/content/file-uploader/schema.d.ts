import { z } from "zod";
/**
 * Zod config schema for the FileUploader component.
 *
 * Renders a drag-and-drop file upload zone with file list,
 * progress tracking, and optional endpoint upload.
 *
 * @example
 * ```json
 * {
 *   "type": "file-uploader",
 *   "accept": "image/*,.pdf",
 *   "maxSize": 5242880,
 *   "maxFiles": 5,
 *   "label": "Upload documents",
 *   "description": "PDF or images up to 5MB each",
 *   "uploadEndpoint": "POST /api/uploads"
 * }
 * ```
 */
export declare const fileUploaderConfigSchema: z.ZodObject<{
    [x: string]: any;
} & {
    type: z.ZodLiteral<"file-uploader">;
    accept: z.ZodOptional<z.ZodString>;
    maxSize: z.ZodOptional<z.ZodNumber>;
    maxFiles: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    variant: z.ZodOptional<z.ZodEnum<["dropzone", "button", "compact"]>>;
    uploadEndpoint: any;
    onUpload: any;
    slots: z.ZodOptional<z.ZodObject<Record<"status" | "root" | "error" | "progress" | "size" | "list" | "item" | "remove" | "trigger" | "triggerIcon" | "dropzone" | "selectedText" | "dropzoneIcon" | "dropzoneLabel" | "dropzoneDescription" | "fileInfo" | "fileName", z.ZodOptional<z.ZodObject<{
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
        status?: {
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
        progress?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        size?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        list?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        remove?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        triggerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzone?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        selectedText?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzoneIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzoneLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzoneDescription?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fileInfo?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fileName?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        status?: {
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
        progress?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        size?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        list?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        item?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        remove?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        trigger?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        triggerIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzone?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        selectedText?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzoneIcon?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzoneLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        dropzoneDescription?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fileInfo?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fileName?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    type?: unknown;
    accept?: unknown;
    maxSize?: unknown;
    maxFiles?: unknown;
    label?: unknown;
    description?: unknown;
    variant?: unknown;
    uploadEndpoint?: unknown;
    onUpload?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    type?: unknown;
    accept?: unknown;
    maxSize?: unknown;
    maxFiles?: unknown;
    label?: unknown;
    description?: unknown;
    variant?: unknown;
    uploadEndpoint?: unknown;
    onUpload?: unknown;
    slots?: unknown;
}>;
