import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, "..", "..");
export const docsRoot = path.join(
  repoRoot,
  "apps",
  "docs",
  "src",
  "content",
  "docs",
);

export function repoPath(...segments: string[]): string {
  return path.join(repoRoot, ...segments);
}

export function ensureDir(filePath: string): void {
  mkdirSync(path.dirname(filePath), { recursive: true });
}

export function writeDoc(relativePath: string, content: string): void {
  const filePath = path.join(docsRoot, relativePath);
  ensureDir(filePath);
  writeFileSync(filePath, `${content.trim()}\n`, "utf8");
}

export function relToRepo(filePath: string): string {
  return path.relative(repoRoot, filePath).replace(/\\/g, "/");
}

export function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n+/g, " ").trim();
}

export function markdownPage(
  title: string,
  description: string,
  body: string,
): string {
  return `---
title: ${title}
description: ${description}
draft: false
---

${body}`;
}
