import { z } from "zod";

/** Locale detection strategies for manifest i18n resolution. */
export const i18nDetectStrategySchema = z.enum([
  "state",
  "navigator",
  "default",
  "header",
]);

const i18nInlineStringsSchema: z.ZodType<
  Record<string, string | Record<string, unknown>>
> = z.lazy(() =>
  z.record(z.union([z.string(), i18nInlineStringsSchema])) as z.ZodType<
    Record<string, string | Record<string, unknown>>
  >,
);

/** Translation reference used in text-bearing manifest fields. */
export const tRefSchema = z
  .object({
    t: z.string().min(1),
    vars: z.record(z.unknown()).optional(),
  })
  .strict();

/** Manifest i18n configuration. */
export const i18nConfigSchema = z
  .object({
    default: z.string().min(1),
    locales: z.array(z.string().min(1)).min(1),
    strings: z.record(z.union([z.string(), i18nInlineStringsSchema])),
    detect: z.array(i18nDetectStrategySchema).optional(),
  })
  .strict();

/** Type for `{ "t": "..." }` translation references. */
export type TRef = z.infer<typeof tRefSchema>;
/** Type for the `manifest.i18n` block. */
export type I18nConfig = z.infer<typeof i18nConfigSchema>;

/**
 * Check whether a value is a translation reference.
 *
 * @param value - Unknown input
 * @returns True when the value matches `TRef`
 */
export function isTRef(value: unknown): value is TRef {
  return (
    typeof value === "object" &&
    value !== null &&
    "t" in value &&
    typeof (value as { t?: unknown }).t === "string"
  );
}
