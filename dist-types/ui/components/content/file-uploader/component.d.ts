import type { FileUploaderConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, handles manifest-based upload,
 * and delegates rendering to FileUploaderBase.
 */
export declare function FileUploader({ config }: {
    config: FileUploaderConfig;
}): import("react/jsx-runtime").JSX.Element | null;
