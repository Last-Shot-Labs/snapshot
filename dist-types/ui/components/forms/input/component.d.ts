import type { InputConfig } from "./types";
export { InputControl } from "./control";
/**
 * Manifest adapter — resolves config refs and actions, delegates to InputField.
 */
export declare function Input({ config }: {
    config: InputConfig;
}): import("react/jsx-runtime").JSX.Element | null;
