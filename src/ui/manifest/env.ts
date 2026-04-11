import { z } from "zod";

/**
 * A manifest reference to a per-environment value.
 */
export type EnvRef = {
  env: string;
  default?: string;
};

/**
 * Zod schema for a manifest environment reference.
 */
export const envRefSchema = z
  .object({
    env: z.string().min(1),
    default: z.string().optional(),
  })
  .strict();

/**
 * Check whether a value is an environment reference.
 *
 * @param value - Unknown input
 * @returns True when the value matches the EnvRef shape
 */
export function isEnvRef(value: unknown): value is EnvRef {
  return (
    typeof value === "object" &&
    value !== null &&
    "env" in value &&
    typeof (value as { env?: unknown }).env === "string"
  );
}

/**
 * Resolve an EnvRef using the configured env source.
 *
 * @param ref - Environment reference to resolve
 * @param env - Key/value env source
 * @returns The resolved value, or the declared default when missing
 */
export function resolveEnvRef(
  ref: EnvRef,
  env: Record<string, string | undefined>,
): string | undefined {
  return env[ref.env] ?? ref.default;
}

/**
 * Build the default env source from the current process environment.
 *
 * This stays CJS-safe so the shared manifest code can build into both ESM and
 * CJS bundles without import.meta warnings.
 *
 * @returns A merged env record with string values
 */
export function getDefaultEnvSource(): Record<string, string | undefined> {
  const processEnv =
    typeof process !== "undefined" && process.env ? process.env : {};

  return { ...processEnv };
}
