import { readFileSync } from "node:fs";
import { markdownPage, repoPath, writeDoc } from "./_common.ts";

function findObjectBody(source: string, exportName: string): string {
  const exportMarker = `export const ${exportName} = z`;
  const exportIndex = source.indexOf(exportMarker);
  if (exportIndex === -1) {
    throw new Error(`Could not find export ${exportName}`);
  }

  const objectCallIndex = source.indexOf(".object({", exportIndex);
  if (objectCallIndex === -1) {
    throw new Error(`Could not find z.object call for ${exportName}`);
  }

  const bodyStart = source.indexOf("{", objectCallIndex);
  if (bodyStart === -1) {
    throw new Error(`Could not find object body start for ${exportName}`);
  }

  let depth = 1;
  let inString: '"' | "'" | "`" | null = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = bodyStart + 1; index < source.length; index += 1) {
    const char = source[index]!;
    const next = source[index + 1];
    const previous = source[index - 1];

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (previous === "*" && char === "/") {
        inBlockComment = false;
      }
      continue;
    }

    if (inString) {
      if (char === inString && previous !== "\\") {
        inString = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(bodyStart + 1, index);
      }
    }
  }

  throw new Error(`Could not find object body end for ${exportName}`);
}

function splitTopLevelEntries(body: string): string[] {
  const entries: string[] = [];
  let current = "";
  let braceDepth = 0;
  let bracketDepth = 0;
  let parenDepth = 0;
  let inString: '"' | "'" | "`" | null = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index]!;
    const next = body[index + 1];
    const previous = body[index - 1];

    current += char;

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (previous === "*" && char === "/") {
        inBlockComment = false;
      }
      continue;
    }

    if (inString) {
      if (char === inString && previous !== "\\") {
        inString = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      continue;
    }

    if (char === "/" && next === "*") {
      inBlockComment = true;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = char;
      continue;
    }

    if (char === "{") {
      braceDepth += 1;
      continue;
    }

    if (char === "}") {
      braceDepth -= 1;
      continue;
    }

    if (char === "[") {
      bracketDepth += 1;
      continue;
    }

    if (char === "]") {
      bracketDepth -= 1;
      continue;
    }

    if (char === "(") {
      parenDepth += 1;
      continue;
    }

    if (char === ")") {
      parenDepth -= 1;
      continue;
    }

    if (
      char === "," &&
      braceDepth === 0 &&
      bracketDepth === 0 &&
      parenDepth === 0
    ) {
      entries.push(current.slice(0, -1));
      current = "";
    }
  }

  const trailing = current.trim();
  if (trailing) {
    entries.push(current);
  }

  return entries;
}

function extractTopLevelKeys(body: string): string[] {
  return splitTopLevelEntries(body)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(
        /^(?:(?:\/\*[\s\S]*?\*\/|\/\/[^\n]*)\s*)*(?:(["'])(.*?)\1|([$A-Z_a-z][\w$]*))\s*:/s,
      );
      return match?.[2] ?? match?.[3] ?? null;
    })
    .filter((key): key is string => key !== null);
}

export function generateManifestReference(): void {
  const schemaSource = readFileSync(repoPath("src", "ui", "manifest", "schema.ts"), "utf8");
  const manifestKeys = extractTopLevelKeys(
    findObjectBody(schemaSource, "manifestConfigSchema"),
  );
  const appKeys = extractTopLevelKeys(findObjectBody(schemaSource, "appConfigSchema"));
  const navigationKeys = extractTopLevelKeys(
    findObjectBody(schemaSource, "navigationConfigSchema"),
  );

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
