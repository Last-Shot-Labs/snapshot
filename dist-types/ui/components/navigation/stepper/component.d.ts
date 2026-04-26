import type { StepperConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, publishes state, and renders
 * manifest children in step content, delegates layout to StepperBase.
 */
export declare function Stepper({ config }: {
    config: StepperConfig;
}): import("react/jsx-runtime").JSX.Element | null;
