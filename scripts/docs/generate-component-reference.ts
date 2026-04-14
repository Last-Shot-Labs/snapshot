/**
 * Generates the comprehensive component reference page.
 *
 * Uses the component inventory to find all components, then imports
 * each component's schema.ts at runtime for Zod introspection to
 * extract component-specific fields, types, defaults, and slot names.
 */

import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { markdownPage, writeDoc } from "./_common.ts";
import {
  collectComponentDirectories,
  collectRegisteredManifestComponents,
} from "./component-inventory.ts";
import {
  extractFields,
  fieldsToMarkdownTable,
  registerKnownSchema,
  type SchemaField,
} from "./_zod-introspect.ts";

import {
  baseComponentConfigSchema,
  fromRefSchema,
  policyExprSchema,
  policyRefSchema,
  exprSchema,
} from "../../src/ui/manifest/schema.ts";
import { envRefSchema } from "../../src/ui/manifest/env.ts";
import { tRefSchema } from "../../src/ui/i18n/schema.ts";
import { themeConfigSchema } from "../../src/ui/tokens/schema.ts";
import {
  dataSourceSchema,
  endpointTargetSchema,
} from "../../src/ui/manifest/resources.ts";
import {
  statefulElementSchema,
  styleableElementSchema,
  extendedBaseComponentSchema,
} from "../../src/ui/components/_base/schema.ts";
import { fromRefSchema as baseFromRefSchema } from "../../src/ui/components/_base/types.ts";

// ── Register known schemas ───────────────────────────────────────────────────

registerKnownSchema(fromRefSchema, "FromRef");
registerKnownSchema(baseFromRefSchema, "FromRef");
registerKnownSchema(envRefSchema, "EnvRef");
registerKnownSchema(tRefSchema, "TRef");
registerKnownSchema(dataSourceSchema, "DataSource");
registerKnownSchema(endpointTargetSchema, "EndpointTarget");
registerKnownSchema(policyExprSchema, "PolicyExpr");
registerKnownSchema(policyRefSchema, "PolicyRef");
registerKnownSchema(exprSchema, "Expr");
registerKnownSchema(baseComponentConfigSchema, "BaseComponentConfig");
registerKnownSchema(themeConfigSchema, "ThemeConfig");
registerKnownSchema(statefulElementSchema, "SlotStyle");
registerKnownSchema(styleableElementSchema, "SlotStyle");

// ── Collect base field names to exclude from component-specific tables ──────

const baseFieldNames = new Set(Object.keys(baseComponentConfigSchema.shape));

let extendedBaseFieldNames: Set<string>;
try {
  const extShape = extendedBaseComponentSchema.shape ?? {};
  extendedBaseFieldNames = new Set(Object.keys(extShape));
} catch {
  extendedBaseFieldNames = baseFieldNames;
}

const excludeFields = new Set([...baseFieldNames, ...extendedBaseFieldNames]);

// ── Domain display names and order ───────────────────────────────────────────

const DOMAIN_ORDER = [
  "layout",
  "forms",
  "data",
  "content",
  "navigation",
  "overlay",
  "media",
  "communication",
  "workflow",
  "commerce",
  "feedback",
  "primitives",
];

const DOMAIN_LABELS: Record<string, string> = {
  layout: "Layout",
  forms: "Forms",
  data: "Data Display",
  content: "Content",
  navigation: "Navigation",
  overlay: "Overlays",
  media: "Media",
  communication: "Communication",
  workflow: "Workflow",
  commerce: "Commerce",
  feedback: "Feedback States",
  primitives: "Primitives",
};

// ── Schema extraction helpers ────────────────────────────────────────────────

interface ComponentInfo {
  name: string;
  domain: string;
  relativeDir: string;
  manifestTypes: string[];
  fields: SchemaField[];
  slotNames: string[];
  jsDoc: string;
}

function findConfigSchema(
  mod: Record<string, unknown>,
  componentName: string,
): import("zod").ZodType | null {
  const exports = Object.keys(mod);
  const camelName = componentName.replace(/-([a-z])/g, (_, c: string) =>
    c.toUpperCase(),
  );

  // Standard: e.g. "buttonConfigSchema"
  const exactKey = `${camelName}ConfigSchema`;
  if (exports.includes(exactKey) && mod[exactKey]) {
    return mod[exactKey] as import("zod").ZodType;
  }

  // Snapshot prefix: e.g. "snapshotImageSchema"
  const snapshotKey = `snapshot${camelName.charAt(0).toUpperCase() + camelName.slice(1)}Schema`;
  if (exports.includes(snapshotKey) && mod[snapshotKey]) {
    return mod[snapshotKey] as import("zod").ZodType;
  }

  // Plain name: e.g. "feedSchema", "wizardSchema", "prefetchLinkSchema"
  const plainKey = `${camelName}Schema`;
  if (exports.includes(plainKey) && mod[plainKey]) {
    return mod[plainKey] as import("zod").ZodType;
  }

  // Component-specific variant: e.g. "outletComponentSchema"
  const componentKey = `${camelName}ComponentSchema`;
  if (exports.includes(componentKey) && mod[componentKey]) {
    return mod[componentKey] as import("zod").ZodType;
  }

  // Any export ending in ConfigSchema (excluding sub-schemas)
  const subSchemaPatterns =
    /column|Column|item|Item|step|Step|entry|Entry|filter|Filter|event|Event|field|Field|action|Action|validation|Validation|section|Section|slot|Slot/;
  const configKey = exports.find(
    (k) =>
      (k.endsWith("ConfigSchema") || k.endsWith("configSchema")) &&
      !subSchemaPatterns.test(k),
  );
  if (configKey && mod[configKey]) {
    return mod[configKey] as import("zod").ZodType;
  }

  return null;
}

function findSlotNames(mod: Record<string, unknown>): string[] {
  const exports = Object.keys(mod);
  const slotKey = exports.find(
    (k) =>
      (k.endsWith("SlotNames") || k.endsWith("slotNames")) &&
      !k.includes("Column") &&
      !k.includes("column") &&
      !k.includes("Row") &&
      !k.includes("row"),
  );
  if (slotKey && Array.isArray(mod[slotKey])) {
    return mod[slotKey] as string[];
  }
  return [];
}

function extractJsDoc(schemaPath: string, componentName: string): string {
  try {
    const source = readFileSync(schemaPath, "utf8");
    const camelName = componentName.replace(/-([a-z])/g, (_, c: string) =>
      c.toUpperCase(),
    );
    // Match a JSDoc comment immediately before (within 2 lines) the target export.
    // The (?:^[ \t]*\n){0,2} allows 0-2 blank lines between the comment close and the export.
    const targets = [
      `${camelName}ConfigSchema`,
      `snapshot${camelName.charAt(0).toUpperCase() + camelName.slice(1)}Schema`,
      `${camelName}Schema`,
    ];

    for (const target of targets) {
      const pattern = new RegExp(
        `/\\*\\*\\s*\\n([\\s\\S]*?)\\*/\\s*\\n(?:\\s*\\n){0,2}export\\s+const\\s+${target}`,
      );
      const match = source.match(pattern);
      if (match?.[1]) {
        const cleaned = match[1]
          .replace(/^\s*\*\s?/gm, "")
          .replace(/@\w+.*$/gm, "")
          .trim();
        if (cleaned.length > 0 && !cleaned.includes("export const")) {
          return cleaned;
        }
      }
    }
  } catch {
    // Ignore read errors
  }
  return "";
}

async function extractComponentInfo(
  domain: string,
  componentName: string,
  relativeDir: string,
  absoluteDir: string,
): Promise<ComponentInfo | null> {
  const schemaPath = path.join(absoluteDir, "schema.ts");
  try {
    statSync(schemaPath);
  } catch {
    return null;
  }

  try {
    const mod = (await import(schemaPath)) as Record<string, unknown>;
    const configSchema = findConfigSchema(mod, componentName);
    if (!configSchema) return null;

    const fields = extractFields(configSchema, 0, excludeFields);
    const slotNames = findSlotNames(mod);
    const jsDoc = extractJsDoc(schemaPath, componentName);

    return {
      name: componentName,
      domain,
      relativeDir,
      manifestTypes: [],
      fields,
      slotNames,
      jsDoc,
    };
  } catch (err) {
    console.warn(`  Warning: Could not process ${componentName}: ${err}`);
    return null;
  }
}

// ── Generate output ──────────────────────────────────────────────────────────

export async function generateComponentReference(): Promise<void> {
  const directories = collectComponentDirectories();
  const registeredComponents = collectRegisteredManifestComponents();
  const components: ComponentInfo[] = [];
  const manifestTypesByDir = new Map<string, string[]>();

  for (const component of registeredComponents) {
    const list = manifestTypesByDir.get(component.relativeDir) ?? [];
    list.push(component.type);
    manifestTypesByDir.set(component.relativeDir, list);
  }

  for (const entry of directories) {
    if (!entry.hasSchema) continue;

    const info = await extractComponentInfo(
      entry.domain,
      entry.componentName,
      entry.relativeDir,
      entry.absoluteDir,
    );
    if (info) {
      info.manifestTypes = (manifestTypesByDir.get(entry.relativeDir) ?? []).sort();
      components.push(info);
    }
  }

  // Group by domain
  const byDomain = new Map<string, ComponentInfo[]>();
  for (const comp of components) {
    const list = byDomain.get(comp.domain) ?? [];
    list.push(comp);
    byDomain.set(comp.domain, list);
  }

  for (const list of byDomain.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Build TOC and sections
  const toc: string[] = [];
  const sections: string[] = [];
  let totalComponents = 0;

  const orderedDomains = DOMAIN_ORDER.filter((d) => byDomain.has(d));
  for (const d of byDomain.keys()) {
    if (!orderedDomains.includes(d)) orderedDomains.push(d);
  }

  for (const domain of orderedDomains) {
    const comps = byDomain.get(domain);
    if (!comps?.length) continue;

    const label = DOMAIN_LABELS[domain] ?? domain;
    const anchor = domain.toLowerCase().replace(/\s+/g, "-");
    toc.push(`- [${label}](#${anchor}) (${comps.length})`);
    totalComponents += comps.length;

    const sectionLines: string[] = [];
    sectionLines.push(`## ${label}`);
    sectionLines.push("");

    for (const comp of comps) {
      sectionLines.push(`### \`${comp.name}\``);
      sectionLines.push("");

      if (comp.jsDoc) {
        sectionLines.push(comp.jsDoc);
        sectionLines.push("");
      }

      if (comp.manifestTypes.length > 0) {
        sectionLines.push(
          `**Manifest ${comp.manifestTypes.length === 1 ? "type" : "types"}:** ${comp.manifestTypes.map((type) => `\`${type}\``).join(", ")}`,
        );
        sectionLines.push("");
      }

      if (comp.fields.length > 0) {
        sectionLines.push(fieldsToMarkdownTable(comp.fields));
        sectionLines.push("");
      } else {
        sectionLines.push(
          "*No component-specific fields beyond base component fields.*",
        );
        sectionLines.push("");
      }

      if (comp.slotNames.length > 0) {
        sectionLines.push(
          `**Slots:** ${comp.slotNames.map((s) => `\`${s}\``).join(", ")}`,
        );
        sectionLines.push("");
      }

      sectionLines.push("---");
      sectionLines.push("");
    }

    sections.push(sectionLines.join("\n"));
  }

  const body = `
This reference is auto-generated from the Zod schemas in each component's \`schema.ts\` file.
It documents every component-specific config field, default, available slots, and manifest type alias.

All components also accept the [base component fields](/reference/manifest#base-component-fields) (60 fields including \`id\`, \`tokens\`, \`visible\`, \`className\`, \`style\`, \`padding\`, \`margin\`, \`gap\`, layout, typography, and interactive states).

Total components: **${totalComponents}** across ${orderedDomains.length} domains.

## Table of Contents

${toc.join("\n")}

---

${sections.join("\n")}
`.trim();

  writeDoc(
    "reference/components.md",
    markdownPage(
      "Component Reference",
      "Complete auto-generated reference for all Snapshot UI components — config fields, types, defaults, and slots.",
      body,
    ),
  );
}

if (import.meta.main) {
  await generateComponentReference();
}
