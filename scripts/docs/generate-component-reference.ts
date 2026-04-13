import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { markdownPage, repoPath, writeDoc } from "./_common.ts";

type DomainMap = Record<string, string[]>;

function walk(dir: string, results: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === "__tests__") continue;
      walk(fullPath, results);
      continue;
    }
    if (entry === "index.ts" || entry === "index.tsx") {
      results.push(fullPath);
    }
  }
  return results;
}

export function generateComponentReference(): void {
  const componentsRoot = repoPath("src", "ui", "components");
  const indexFiles = walk(componentsRoot);
  const domains: DomainMap = {};

  for (const filePath of indexFiles) {
    const relative = path.relative(componentsRoot, filePath).replace(/\\/g, "/");
    const parts = relative.split("/");
    if (parts.length < 2) continue;
    const domain = parts[0]!;
    const componentName = parts.slice(1, -1).join("/");
    if (!componentName) continue;
    (domains[domain] ??= []).push(componentName);
  }

  const body: string[] = [
    "This catalog is generated from component directories under `src/ui/components`.",
    "",
    `Total domains: ${Object.keys(domains).length}`,
  ];

  for (const domain of Object.keys(domains).sort()) {
    body.push("");
    body.push(`## ${domain}`);
    body.push("");
    for (const componentName of domains[domain]!.sort()) {
      body.push(`- \`${componentName}\``);
    }
  }

  writeDoc(
    "reference/components.md",
    markdownPage(
      "Components",
      "Generated catalog of Snapshot UI component directories.",
      body.join("\n"),
    ),
  );
}

if (import.meta.main) {
  generateComponentReference();
}
