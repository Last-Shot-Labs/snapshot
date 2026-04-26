import type { WizardConfig, UseWizardResult } from "./types";
/**
 * Headless hook that manages multi-step wizard state including step navigation,
 * per-step validation, field tracking, and final submission.
 *
 * Provides reactive state for the current step, accumulated data across steps,
 * validation errors, and transition controls (next/prev/skip/reset).
 *
 * @param config - Wizard configuration from the manifest, including steps,
 *   validation rules, submit action, and transition settings.
 * @returns Wizard state and step-navigation controls.
 *
 * @example
 * ```tsx
 * const wizard = useWizard(wizardConfig);
 *
 * return (
 *   <div>
 *     <p>Step {wizard.currentStep + 1} of {wizard.totalSteps}</p>
 *     {wizard.isSubmitting && <Spinner />}
 *     {wizard.submitError && <p>{wizard.submitError.message}</p>}
 *     <button onClick={wizard.prevStep} disabled={wizard.isFirstStep}>Back</button>
 *     <button onClick={wizard.nextStep}>
 *       {wizard.isLastStep ? "Submit" : "Next"}
 *     </button>
 *   </div>
 * );
 * ```
 */
export declare function useWizard(config: WizardConfig): UseWizardResult;
