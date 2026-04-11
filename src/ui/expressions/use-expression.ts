'use client';

import { useMemo } from "react";
import { useSubscribe } from "../context";
import { evaluateExpression, extractExpressionRefs } from "./parser";
import { useManifestRuntime, useRouteRuntime } from "../manifest/runtime";

function toFromRef(ref: string) {
  if (
    !ref ||
    ref.startsWith("auth.") ||
    ref.startsWith("app.") ||
    ref.startsWith("route.") ||
    ref.startsWith("params.") ||
    ref.startsWith("overlay.")
  ) {
    return undefined;
  }

  return { from: ref };
}

function setNestedValue(
  target: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const segments = path.split(".");
  let cursor = target;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index]!;
    const next =
      cursor[segment] && typeof cursor[segment] === "object"
        ? (cursor[segment] as Record<string, unknown>)
        : {};
    cursor[segment] = next;
    cursor = next;
  }
  cursor[segments[segments.length - 1]!] = value;
}

export function useEvaluateExpression(expression: string | undefined): boolean {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const refs = useMemo(
    () => (expression ? extractExpressionRefs(expression).slice(0, 8) : []),
    [expression],
  );
  const r0 = useSubscribe(toFromRef(refs[0] ?? ""));
  const r1 = useSubscribe(toFromRef(refs[1] ?? ""));
  const r2 = useSubscribe(toFromRef(refs[2] ?? ""));
  const r3 = useSubscribe(toFromRef(refs[3] ?? ""));
  const r4 = useSubscribe(toFromRef(refs[4] ?? ""));
  const r5 = useSubscribe(toFromRef(refs[5] ?? ""));
  const r6 = useSubscribe(toFromRef(refs[6] ?? ""));
  const r7 = useSubscribe(toFromRef(refs[7] ?? ""));
  const resolvedRefs = [r0, r1, r2, r3, r4, r5, r6, r7];

  return useMemo(() => {
    if (!expression) {
      return true;
    }

    const resolvedContext = refs.reduce<Record<string, unknown>>(
      (result, ref, index) => {
        if (
          ref.startsWith("auth.") ||
          ref.startsWith("app.") ||
          ref.startsWith("route.") ||
          ref.startsWith("params.") ||
          ref.startsWith("overlay.")
        ) {
          return result;
        }

        setNestedValue(result, ref, resolvedRefs[index]);
        return result;
      },
      {},
    );

    return evaluateExpression(expression, {
      ...resolvedContext,
      app: manifest?.app ?? {},
      auth: manifest?.auth ?? {},
      route: {
        id: routeRuntime?.currentRoute?.id,
        path: routeRuntime?.currentPath,
        pattern: routeRuntime?.currentRoute?.path,
        params: routeRuntime?.params,
        query: routeRuntime?.query,
      },
    });
  }, [expression, manifest?.app, manifest?.auth, refs, resolvedRefs, routeRuntime]);
}
