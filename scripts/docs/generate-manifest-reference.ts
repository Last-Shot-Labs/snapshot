import {
  appConfigSchema,
  manifestConfigSchema,
  navigationConfigSchema,
} from "../../src/ui/manifest/schema";
import { markdownPage, writeDoc } from "./_common";

function unwrapObjectShape(schema: unknown): Record<string, unknown> {
  if (
    schema &&
    typeof schema === "object" &&
    "shape" in schema &&
    typeof (schema as { shape?: unknown }).shape === "object"
  ) {
    return (schema as { shape: Record<string, unknown> }).shape;
  }

  if (
    schema &&
    typeof schema === "object" &&
    "_def" in schema &&
    (schema as { _def?: { schema?: unknown } })._def?.schema
  ) {
    return unwrapObjectShape((schema as { _def: { schema: unknown } })._def.schema);
  }

  return {};
}

function objectKeys(schema: unknown): string[] {
  return Object.keys(unwrapObjectShape(schema));
}

export function generateManifestReference(): void {
  const manifestKeys = objectKeys(manifestConfigSchema);
  const appKeys = objectKeys(appConfigSchema);
  const navigationKeys = objectKeys(navigationConfigSchema);

  const body = [
    "This page is generated from the current Zod schema definitions in `src/ui/manifest/schema.ts`.",
    "",
    "## Top-level keys",
    "",
    ...manifestKeys.map((key) => `- \`${key}\``),
    "",
    "## `app` keys",
    "",
    ...appKeys.map((key) => `- \`${key}\``),
    "",
    "## `navigation` keys",
    "",
    ...navigationKeys.map((key) => `- \`${key}\``),
    "",
    "Use this page to verify the current top-level manifest shape before trusting older prose guides.",
  ].join("\n");

  writeDoc(
    "reference/manifest.md",
    markdownPage(
      "Manifest",
      "Generated top-level manifest schema reference.",
      body,
    ),
  );
}

if (import.meta.main) {
  generateManifestReference();
}
