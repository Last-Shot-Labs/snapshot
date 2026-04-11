import { atom, createStore } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { evaluateExpression } from "../expressions/parser";
import type { AtomRegistry, JotaiStore } from "./types";

export function extractStateDependencies(expression: string): string[] {
  const refs = new Set<string>();
  const matcher = /\{([^}]+)\}/g;
  let match = matcher.exec(expression);
  while (match) {
    const ref = match[1]?.trim();
    if (ref) {
      refs.add(ref);
    }
    match = matcher.exec(expression);
  }
  return [...refs];
}

function toExpressionTemplate(expression: string): string {
  return expression.replace(/\{([^}]+)\}/g, (_, ref: string) => ref.trim());
}

export function createComputedAtom(
  computeExpr: string,
  registry: AtomRegistry,
): PrimitiveAtom<unknown> {
  const dependencies = extractStateDependencies(computeExpr);
  const expression = toExpressionTemplate(computeExpr);
  const computedAtom = atom((get) => {
    const context: Record<string, unknown> = {};
    for (const dependency of dependencies) {
      const dependencyAtom = registry.get(dependency);
      if (dependencyAtom) {
        context[dependency] = get(dependencyAtom);
      }
    }
    return evaluateExpression(expression, context);
  });
  computedAtom.debugLabel = `snapshot:computed:${computeExpr}`;
  return computedAtom;
}

/**
 * Jotai-backed registry for named state atoms.
 */
export class AtomRegistryImpl implements AtomRegistry {
  private readonly atoms = new Map<string, PrimitiveAtom<unknown>>();
  readonly store: JotaiStore;

  constructor(store?: JotaiStore) {
    this.store = store ?? createStore();
  }

  register(
    id: string,
    atomOverride?: PrimitiveAtom<unknown>,
  ): PrimitiveAtom<unknown> {
    const existing = this.atoms.get(id);
    if (existing && !atomOverride) return existing;
    if (existing && atomOverride) {
      atomOverride.debugLabel = atomOverride.debugLabel ?? `snapshot:${id}`;
      this.atoms.set(id, atomOverride);
      return atomOverride;
    }

    const created = atomOverride ?? atom<unknown>(undefined);
    created.debugLabel = `snapshot:${id}`;
    this.atoms.set(id, created);
    return created;
  }

  get(id: string): PrimitiveAtom<unknown> | undefined {
    return this.atoms.get(id);
  }

  unregister(id: string): void {
    this.atoms.delete(id);
  }

  keys(): string[] {
    return [...this.atoms.keys()];
  }
}
