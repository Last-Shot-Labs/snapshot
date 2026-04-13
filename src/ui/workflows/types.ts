import type { ActionConfig } from "../actions/types";

/**
 * Supported condition operators for manifest workflows.
 */
export type WorkflowConditionOperator =
  | "truthy"
  | "falsy"
  | "equals"
  | "not-equals"
  | "exists";

/**
 * Simple conditional expression used by workflow nodes.
 */
export interface WorkflowCondition {
  left: unknown;
  operator?: WorkflowConditionOperator;
  right?: unknown;
}

/** Primitive input kinds supported by manifest-declared custom workflow actions. */
export type CustomWorkflowActionInputType = "string" | "number" | "boolean";

/** Schema declaration for a single custom workflow action input. */
export interface CustomWorkflowActionInputSchema {
  type: CustomWorkflowActionInputType;
  required?: boolean;
  default?: string | number | boolean | null;
}

/** Manifest declaration for a custom workflow action. */
export interface CustomWorkflowActionDeclaration {
  input?: Record<string, CustomWorkflowActionInputSchema>;
}

/** Map of custom workflow action names to manifest declarations. */
export type CustomWorkflowActionDeclarationMap = Record<
  string,
  CustomWorkflowActionDeclaration
>;

/**
 * Shared metadata available on all workflow nodes.
 */
export interface WorkflowBaseNode {
  id?: string;
  when?: WorkflowCondition;
}

/**
 * Branch workflow execution based on a condition.
 */
export interface IfWorkflowNode extends WorkflowBaseNode {
  type: "if";
  condition: WorkflowCondition;
  then: WorkflowDefinition;
  else?: WorkflowDefinition;
}

/**
 * Pause workflow execution for a duration in milliseconds.
 */
export interface WaitWorkflowNode extends WorkflowBaseNode {
  type: "wait";
  duration: number;
}

/**
 * Run multiple workflow definitions in parallel.
 */
export interface ParallelWorkflowNode extends WorkflowBaseNode {
  type: "parallel";
  branches: WorkflowDefinition[];
}

/**
 * Retry a workflow definition with optional delay and backoff.
 */
export interface RetryWorkflowNode extends WorkflowBaseNode {
  type: "retry";
  attempts: number;
  delayMs?: number;
  backoffMultiplier?: number;
  step: WorkflowDefinition;
  onFailure?: WorkflowDefinition;
}

/**
 * Write values into the workflow execution context.
 */
export interface AssignWorkflowNode extends WorkflowBaseNode {
  type: "assign";
  values: Record<string, unknown>;
}

/**
 * Execute a workflow definition with optional catch and finally handlers.
 */
export interface TryWorkflowNode extends WorkflowBaseNode {
  type: "try";
  step: WorkflowDefinition;
  catch?: WorkflowDefinition;
  finally?: WorkflowDefinition;
}

/**
 * Execute an action and capture its result into the workflow context.
 */
export interface CaptureWorkflowNode extends WorkflowBaseNode {
  type: "capture";
  action: ActionConfig;
  as: string;
}

/**
 * Any node that can appear inside a workflow definition.
 */
export type WorkflowNode =
  | ActionConfig
  | IfWorkflowNode
  | WaitWorkflowNode
  | ParallelWorkflowNode
  | RetryWorkflowNode
  | AssignWorkflowNode
  | TryWorkflowNode
  | CaptureWorkflowNode;
/**
 * A single workflow node or a sequential list of nodes.
 */
export type WorkflowDefinition = WorkflowNode | WorkflowNode[];
/**
 * Named workflow map keyed by workflow id.
 */
export type WorkflowMap = Record<string, WorkflowDefinition>;

/**
 * Runtime services available to the workflow engine and custom workflow actions.
 */
export interface WorkflowExecutionRuntime {
  context: Record<string, unknown>;
  resolveValue: (value: unknown, context: Record<string, unknown>) => unknown;
  executeAction: (
    action: ActionConfig,
    context: Record<string, unknown>,
  ) => Promise<unknown>;
  getWorkflow: (name: string) => WorkflowDefinition | undefined;
  runDefinition: (
    definition: WorkflowDefinition,
    context?: Record<string, unknown>,
  ) => Promise<void>;
}

export interface CustomWorkflowNode extends WorkflowBaseNode {
  type: string;
  [key: string]: unknown;
}

/**
 * Handler signature for registered custom workflow actions.
 */
export type WorkflowActionHandler = (
  node: CustomWorkflowNode,
  runtime: WorkflowExecutionRuntime,
) => Promise<void>;
