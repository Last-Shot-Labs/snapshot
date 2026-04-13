import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { escapeCell, markdownPage, repoPath, relToRepo, writeDoc } from "./_common";

type CommandInfo = {
  command: string;
  description: string;
  source: string;
};

function walk(dir: string, results: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, results);
      continue;
    }
    if (entry.endsWith(".ts")) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractDescription(source: string): string {
  const match = source.match(/static override description = "([^"]+)"/);
  return match?.[1] ?? "No description found.";
}

function toCommandName(sourcePath: string): string {
  const relative = path.relative(repoPath("src", "cli", "commands"), sourcePath);
  return relative.replace(/\\/g, " ").replace(/\.ts$/, "").replace(/ index$/, "");
}

export function generateCliReference(): void {
  const files = walk(repoPath("src", "cli", "commands"));
  const commands: CommandInfo[] = files.map((filePath) => {
    const source = readFileSync(filePath, "utf8");
    return {
      command: toCommandName(filePath),
      description: extractDescription(source),
      source: relToRepo(filePath),
    };
  });

  const rows = commands
    .sort((a, b) => a.command.localeCompare(b.command))
    .map(
      (command) =>
        `| \`${escapeCell(command.command)}\` | ${escapeCell(command.description)} | \`${escapeCell(command.source)}\` |`,
    );

  writeDoc(
    "reference/cli.md",
    markdownPage(
      "CLI",
      "Generated command inventory from src/cli/commands.",
      [
        "This page is generated from command source files under `src/cli/commands`.",
        "",
        "| Command | Description | Source |",
        "|---|---|---|",
        ...rows,
      ].join("\n"),
    ),
  );
}

if (import.meta.main) {
  generateCliReference();
}
