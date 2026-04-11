import { z } from "zod";
import {
  endpointTargetSchema,
  type EndpointTarget,
} from "../manifest/resources";

export const ACTION_TYPES = [
  "navigate",
  "navigate-external",
  "api",
  "open-modal",
  "close-modal",
  "refresh",
  "set-value",
  "download",
  "copy",
  "copy-to-clipboard",
  "emit",
  "submit-form",
  "reset-form",
  "set-theme",
  "confirm",
  "scroll-to",
  "toast",
  "log",
  "track",
  "run-workflow",
] as const;

export interface ActionBase {
  debounce?: number;
  throttle?: number;
}

/**
 * A reference to another component's published value.
 * Reused from context types for schema validation.
 */
const fromRefSchema = z.object({
  from: z.string(),
});

/**
 * Navigate to a route.
 */
export interface NavigateAction extends ActionBase {
  type: "navigate";
  /** Route path. Supports `{param}` interpolation from context. */
  to: string;
  /** Replace history entry instead of pushing. */
  replace?: boolean;
}

/**
 * Call an API endpoint.
 */
export interface ApiAction extends ActionBase {
  type: "api";
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Endpoint path. Supports `{param}` interpolation. */
  endpoint: EndpointTarget;
  /** Request body. Can include `{ from: 'id' }` refs. */
  body?: Record<string, unknown> | { from: string };
  /** Query parameters. */
  params?: Record<string, unknown>;
  /** Named resources to invalidate after a successful request. */
  invalidates?: string[];
  /** Actions to execute on success. Response data available as `{result}`. */
  onSuccess?: ActionConfig | ActionConfig[];
  /** Actions to execute on error. Error available as `{error}`. */
  onError?: ActionConfig | ActionConfig[];
}

export interface NavigateExternalAction extends ActionBase {
  type: "navigate-external";
  to: string;
  target?: "_self" | "_blank";
}

/**
 * Open a modal or drawer by id.
 */
export interface OpenModalAction extends ActionBase {
  type: "open-modal";
  /** The id of the modal/drawer component to open. */
  modal: string;
  /** Optional runtime payload exposed to the overlay. */
  payload?: unknown;
  /** Optional state binding target that receives the overlay result on close. */
  resultTarget?: string;
}

/**
 * Close a modal or drawer.
 */
export interface CloseModalAction extends ActionBase {
  type: "close-modal";
  /** Specific modal id. Omit to close the topmost. */
  modal?: string;
  /** Optional result written to the opener's configured result target. */
  result?: unknown;
}

/**
 * Re-fetch a component's data.
 */
export interface RefreshAction extends ActionBase {
  type: "refresh";
  /** Component id to refresh. Can be a comma-separated list for multiple. */
  target: string;
}

/**
 * Set another component's published value.
 */
export interface SetValueAction extends ActionBase {
  type: "set-value";
  /** Component id. */
  target: string;
  /** Value to set. Supports `{param}` interpolation when a string. */
  value: unknown;
}

/**
 * Download a file from an endpoint.
 */
export interface DownloadAction extends ActionBase {
  type: "download";
  /** Endpoint path. Supports `{param}` interpolation. */
  endpoint: EndpointTarget;
  /** Suggested filename. */
  filename?: string;
}

export interface CopyAction extends ActionBase {
  type: "copy";
  text: string;
  onSuccess?: ActionConfig | ActionConfig[];
}

export interface CopyToClipboardAction extends ActionBase {
  type: "copy-to-clipboard";
  text: string;
  toast?: string;
}

export interface EmitAction extends ActionBase {
  type: "emit";
  event: string;
  payload?: unknown;
}

export interface SubmitFormAction extends ActionBase {
  type: "submit-form";
  formId: string;
}

export interface ResetFormAction extends ActionBase {
  type: "reset-form";
  formId: string;
}

export interface SetThemeAction extends ActionBase {
  type: "set-theme";
  flavor?: string;
  mode?: "light" | "dark" | "system";
}

/**
 * Show a confirmation dialog. Stops the chain if cancelled.
 */
export interface ConfirmAction extends ActionBase {
  type: "confirm";
  /** Dialog title. */
  title?: string;
  /** Dialog description/message. */
  description?: string;
  /** Backwards-compatible body copy. */
  message?: string;
  /** Confirm button text. Default: "Confirm". */
  confirmLabel?: string;
  /** Cancel button text. Default: "Cancel". */
  cancelLabel?: string;
  /** Visual variant. */
  variant?: "default" | "destructive";
  /** Require an exact typed string before confirm is enabled. */
  requireInput?: string;
  /** Optional actions executed after confirmation succeeds. */
  onConfirm?: ActionConfig | ActionConfig[];
  /** Optional actions executed when the dialog is cancelled. */
  onCancel?: ActionConfig | ActionConfig[];
}

/**
 * Show a toast notification.
 */
export interface ScrollToAction extends ActionBase {
  type: "scroll-to";
  target: string;
  behavior?: "smooth" | "instant" | "auto";
  block?: "start" | "center" | "end" | "nearest";
}

/**
 * Show a toast notification.
 */
export interface ToastAction extends ActionBase {
  type: "toast";
  /** Message. Supports `{param}` interpolation. */
  message: string;
  /** Visual variant. */
  variant?: "success" | "error" | "warning" | "info";
  /** Auto-dismiss duration in ms. Default: 5000. 0 = no auto-dismiss. */
  duration?: number;
  /** Optional action button in the toast. */
  action?: { label: string; action: ActionConfig };
}

/**
 * Track an analytics event through all manifest-configured providers.
 */
export interface TrackAction extends ActionBase {
  type: "track";
  /** Analytics event name. Supports `{param}` interpolation. */
  event: string;
  /** Optional event properties. Supports nested `{ from: "..." }` refs. */
  props?: Record<string, unknown>;
}

export interface LogAction extends ActionBase {
  type: "log";
  level: "info" | "warn" | "error" | "debug";
  message: string;
  data?: Record<string, unknown>;
}

/**
 * Run a named manifest workflow.
 */
export interface RunWorkflowAction extends ActionBase {
  type: "run-workflow";
  /** Workflow id declared in manifest.workflows. */
  workflow: string;
  /** Additional context merged into the workflow run. */
  input?: Record<string, unknown>;
}

/**
 * All possible action configs. Discriminated union on `type`.
 */
export type ActionConfig =
  | NavigateAction
  | NavigateExternalAction
  | ApiAction
  | OpenModalAction
  | CloseModalAction
  | RefreshAction
  | SetValueAction
  | DownloadAction
  | CopyAction
  | CopyToClipboardAction
  | EmitAction
  | SubmitFormAction
  | ResetFormAction
  | SetThemeAction
  | ConfirmAction
  | ScrollToAction
  | ToastAction
  | LogAction
  | TrackAction
  | RunWorkflowAction;

/**
 * The execute function returned by useActionExecutor.
 */
export type ActionExecuteFn = (
  action: ActionConfig | ActionConfig[],
  context?: Record<string, unknown>,
) => Promise<void>;

// --- Zod Schemas ---
// Because ApiAction and ToastAction have recursive references to ActionConfig,
// all schemas that participate in the recursion use z.lazy().

const actionTimingFields = {
  debounce: z.number().int().positive().optional(),
  throttle: z.number().int().positive().optional(),
} as const;

/** Schema for navigate action. */
export const navigateActionSchema = z
  .object({
    type: z.literal("navigate"),
    to: z.string(),
    replace: z.boolean().optional(),
  })
  .extend(actionTimingFields)
  .strict();

export const navigateExternalActionSchema = z
  .object({
    type: z.literal("navigate-external"),
    to: z.string(),
    target: z.enum(["_self", "_blank"]).optional(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for open-modal action. */
export const openModalActionSchema = z
  .object({
    type: z.literal("open-modal"),
    modal: z.string(),
    payload: z.unknown().optional(),
    resultTarget: z.string().optional(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for close-modal action. */
export const closeModalActionSchema = z
  .object({
    type: z.literal("close-modal"),
    modal: z.string().optional(),
    result: z.unknown().optional(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for refresh action. */
export const refreshActionSchema = z
  .object({
    type: z.literal("refresh"),
    target: z.string(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for set-value action. */
export const setValueActionSchema = z
  .object({
    type: z.literal("set-value"),
    target: z.string(),
    value: z.unknown(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for download action. */
export const downloadActionSchema = z
  .object({
    type: z.literal("download"),
    endpoint: endpointTargetSchema,
    filename: z.string().optional(),
  })
  .extend(actionTimingFields)
  .strict();

export const copyActionSchema: z.ZodType<CopyAction> = z.lazy(() =>
  z
    .object({
      type: z.literal("copy"),
      text: z.string(),
      onSuccess: z
        .union([z.lazy(() => actionSchema), z.array(z.lazy(() => actionSchema))])
        .optional(),
    })
    .extend(actionTimingFields)
    .strict(),
);

export const copyToClipboardActionSchema = z
  .object({
    type: z.literal("copy-to-clipboard"),
    text: z.string(),
    toast: z.string().optional(),
  })
  .extend(actionTimingFields)
  .strict();

export const emitActionSchema = z
  .object({
    type: z.literal("emit"),
    event: z.string().min(1),
    payload: z.unknown().optional(),
  })
  .extend(actionTimingFields)
  .strict();

export const submitFormActionSchema = z
  .object({
    type: z.literal("submit-form"),
    formId: z.string().min(1),
  })
  .extend(actionTimingFields)
  .strict();

export const resetFormActionSchema = z
  .object({
    type: z.literal("reset-form"),
    formId: z.string().min(1),
  })
  .extend(actionTimingFields)
  .strict();

export const setThemeActionSchema = z
  .object({
    type: z.literal("set-theme"),
    flavor: z.string().optional(),
    mode: z.enum(["light", "dark", "system"]).optional(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for confirm action. */
export const confirmActionSchema = z
  .object({
    type: z.literal("confirm"),
    title: z.string().optional(),
    description: z.string().optional(),
    message: z.string().optional(),
    confirmLabel: z.string().optional(),
    cancelLabel: z.string().optional(),
    variant: z.enum(["default", "destructive"]).optional(),
    requireInput: z.string().optional(),
    onConfirm: z
      .union([z.lazy(() => actionSchema), z.array(z.lazy(() => actionSchema))])
      .optional(),
    onCancel: z
      .union([z.lazy(() => actionSchema), z.array(z.lazy(() => actionSchema))])
      .optional(),
  })
  .extend(actionTimingFields)
  .strict();

export const scrollToActionSchema = z
  .object({
    type: z.literal("scroll-to"),
    target: z.string().min(1),
    behavior: z.enum(["smooth", "instant", "auto"]).optional(),
    block: z.enum(["start", "center", "end", "nearest"]).optional(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for run-workflow action. */
export const runWorkflowActionSchema = z
  .object({
    type: z.literal("run-workflow"),
    workflow: z.string().min(1),
    input: z.record(z.unknown()).optional(),
  })
  .extend(actionTimingFields)
  .strict();

/**
 * Builds the api action schema. Separated into a function because it
 * references actionSchema recursively via z.lazy().
 */
function buildApiActionSchema(): z.ZodType<ApiAction> {
  return z
    .object({
      type: z.literal("api"),
      method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
      endpoint: endpointTargetSchema,
      body: z.union([z.record(z.unknown()), fromRefSchema]).optional(),
      params: z.record(z.unknown()).optional(),
      invalidates: z.array(z.string().min(1)).optional(),
      onSuccess: z
        .union([
          z.lazy(() => actionSchema),
          z.array(z.lazy(() => actionSchema)),
        ])
        .optional(),
      onError: z
        .union([
          z.lazy(() => actionSchema),
          z.array(z.lazy(() => actionSchema)),
        ])
        .optional(),
    })
    .extend(actionTimingFields)
    .strict();
}

/**
 * Builds the toast action schema. Separated into a function because it
 * references actionSchema recursively via z.lazy().
 */
function buildToastActionSchema(): z.ZodType<ToastAction> {
  return z
    .object({
      type: z.literal("toast"),
      message: z.string(),
      variant: z.enum(["success", "error", "warning", "info"]).optional(),
      duration: z.number().optional(),
      action: z
        .object({
          label: z.string(),
          action: z.lazy(() => actionSchema),
        })
        .optional(),
    })
    .extend(actionTimingFields)
    .strict();
}

/** Schema for track action. */
export const trackActionSchema = z
  .object({
    type: z.literal("track"),
    event: z.string().min(1),
    props: z.record(z.unknown()).optional(),
  })
  .extend(actionTimingFields)
  .strict();

export const logActionSchema = z
  .object({
    type: z.literal("log"),
    level: z.enum(["info", "warn", "error", "debug"]),
    message: z.string(),
    data: z.record(z.unknown()).optional(),
  })
  .extend(actionTimingFields)
  .strict();

/** Schema for api action. Uses z.lazy() for recursive onSuccess/onError. */
export const apiActionSchema: z.ZodType<ApiAction> = buildApiActionSchema();

/** Schema for toast action. Uses z.lazy() for recursive action. */
export const toastActionSchema: z.ZodType<ToastAction> =
  buildToastActionSchema();

/**
 * Discriminated union schema for all action types.
 * Uses z.union (not z.discriminatedUnion) because some member schemas
 * use z.lazy() for recursion, which is incompatible with
 * z.discriminatedUnion's type requirements.
 */
export const actionSchema: z.ZodType<ActionConfig> = z.lazy(() =>
  z.union([
    navigateActionSchema,
    navigateExternalActionSchema,
    openModalActionSchema,
    closeModalActionSchema,
    refreshActionSchema,
    setValueActionSchema,
    downloadActionSchema,
    copyActionSchema,
    copyToClipboardActionSchema,
    emitActionSchema,
    submitFormActionSchema,
    resetFormActionSchema,
    setThemeActionSchema,
    confirmActionSchema,
    scrollToActionSchema,
    apiActionSchema,
    toastActionSchema,
    logActionSchema,
    trackActionSchema,
    runWorkflowActionSchema,
  ]),
) as z.ZodType<ActionConfig>;
