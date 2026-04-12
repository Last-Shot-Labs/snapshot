/**
 * Generates dist/snapshot-schema.json from the manifest Zod schema.
 *
 * Run: bun run scripts/generate-manifest-schema.ts
 * This runs automatically as part of `bun run build`.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { zodToJsonSchema } from "zod-to-json-schema";

import { registerBuiltInComponents } from "../src/ui/components/register";
import { manifestConfigSchema, getRegisteredSchemas } from "../src/ui/manifest/schema";

registerBuiltInComponents();

// ── Build icon enum from the icon paths registry ────────────────────────────
const iconPathsSrc = readFileSync(
  path.resolve(import.meta.dir, "../src/ui/icons/paths.ts"),
  "utf8",
);
const ICON_NAMES: string[] = [
  ...iconPathsSrc.matchAll(/^\s+"([a-z0-9-]+)":/gm),
].map((m) => m[1]!);
const iconEnum = { type: "string", enum: ICON_NAMES };

// ── Build component type enum from the registry ─────────────────────────────
const registeredSchemas = getRegisteredSchemas();
const COMPONENT_TYPES = [...registeredSchemas.keys()];
const componentTypeEnum = { type: "string", enum: COMPONENT_TYPES };

// ── Generate the main manifest schema ───────────────────────────────────────
const rawSchema = zodToJsonSchema(manifestConfigSchema, {
  $refStrategy: "root",
  errorMessages: false,
  markdownDescription: true,
}) as Record<string, unknown>;

// ── Post-process: walk schema and inject enums ───────────────────────────────
//
// zodToJsonSchema can't see through passthrough() validators used for the
// component registry, so icon and type fields come out as plain strings.
// We fix this in a post-processing pass over the JSON Schema object.

function walk(node: unknown): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }
  const obj = node as Record<string, unknown>;

  // Inject icon enum on any string property named "icon"
  if (obj["icon"] && typeof obj["icon"] === "object") {
    const iconProp = obj["icon"] as Record<string, unknown>;
    if (iconProp["type"] === "string" && !iconProp["enum"]) {
      obj["icon"] = { ...iconProp, ...iconEnum };
    }
  }

  // Inject component type enum on any string property named "type" that is
  // a plain string schema inside an object that also has other component-like props
  if (
    obj["type"] &&
    typeof obj["type"] === "object" &&
    (obj["type"] as Record<string, unknown>)["type"] === "string" &&
    !(obj["type"] as Record<string, unknown>)["enum"] &&
    // Only inject when the parent looks like a component schema (has "type" + "id" or "content")
    ("id" in obj || "content" in obj || "children" in obj || "data" in obj)
  ) {
    obj["type"] = {
      ...(obj["type"] as Record<string, unknown>),
      ...componentTypeEnum,
    };
  }

  for (const val of Object.values(obj)) {
    walk(val);
  }
}

walk(rawSchema);

// ── Inject meta ──────────────────────────────────────────────────────────────
rawSchema["$schema"] = "http://json-schema.org/draft-07/schema#";
rawSchema["title"] = "Snapshot Manifest";
rawSchema["description"] =
  "Configuration schema for snapshot.manifest.json — the Snapshot frontend manifest file.";

// ── Write output ─────────────────────────────────────────────────────────────
const outDir = path.resolve(import.meta.dir, "../dist");
mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "snapshot-schema.json");
writeFileSync(outPath, JSON.stringify(rawSchema, null, 2));
console.log(`[snapshot] Generated ${outPath}`);
