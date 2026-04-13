import type { PrimitiveAtom, WritableAtom } from "jotai";
import type { createStore } from "jotai/vanilla";
import type { ReactNode } from "react";
import type { ApiClient } from "../../api/client";
import type { EndpointTarget, ResourceMap } from "../manifest/resources";

/** The Jotai store type, derived from the createStore return type. */
export type JotaiStore = ReturnType<typeof createStore>;

export type StateAtom = WritableAtom<unknown, [unknown], void>;

/**
 * Registry of named state atoms.
 * Backing store is shared per scope (app or route).
 */
export interface AtomRegistry {
  register(id: string, atomOverride?: StateAtom): StateAtom;
  get(id: string): StateAtom | undefined;
  unregister(id: string): void;
  keys(): string[];
  readonly store: JotaiStore;
}

/** Lifetime scope for manifest state: shared across the app or recreated per route. */
export type StateScope = "app" | "route";

/**
 * Named state definition from the manifest.
 * App-scope state persists for the app lifetime.
 * Route-scope state is recreated whenever the active route changes.
 */
export interface StateConfig {
  scope?: StateScope;
  data?: EndpointTarget;
  default?: unknown;
  compute?: string;
  persist?:
    | "none"
    | "localStorage"
    | "sessionStorage"
    | {
        storage: "localStorage" | "sessionStorage";
        key?: string;
      };
}

/** Map of named state definitions declared by the manifest runtime. */
export type StateConfigMap = Record<string, StateConfig>;

/** Props accepted by the provider layer that wires manifest state into a React tree. */
export interface StateProviderProps {
  state?: StateConfigMap;
  resources?: ResourceMap;
  api?: ApiClient;
  children: ReactNode;
}
