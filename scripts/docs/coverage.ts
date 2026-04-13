import path from "node:path";
import * as ts from "typescript";
import { repoPath } from "./_common.ts";

const requiredExports = [
  { file: repoPath("src", "create-snapshot.tsx"), exportName: "createSnapshot" },
  { file: repoPath("src", "api", "client.ts"), exportName: "registerClient" },
  { file: repoPath("src", "api", "client.ts"), exportName: "getRegisteredClient" },
  { file: repoPath("src", "plugin.ts"), exportName: "definePlugin" },
  {
    file: repoPath("src", "schema-generator.ts"),
    exportName: "generateManifestSchema",
  },
  { file: repoPath("src", "vite", "index.ts"), exportName: "snapshotApp" },
  { file: repoPath("src", "vite", "index.ts"), exportName: "snapshotSync" },
  { file: repoPath("src", "vite", "index.ts"), exportName: "snapshotSsr" },
];

const configPath = ts.findConfigFile(
  repoPath(),
  ts.sys.fileExists,
  "tsconfig.json",
);
if (!configPath) {
  throw new Error("Could not locate tsconfig.json");
}
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  path.dirname(configPath),
);
const program = ts.createProgram({
  rootNames: parsed.fileNames,
  options: parsed.options,
});
const checker = program.getTypeChecker();

let hasError = false;

for (const item of requiredExports) {
  const sourceFile = program.getSourceFile(item.file);
  if (!sourceFile) {
    console.error(`[docs:coverage] Missing source file: ${item.file}`);
    hasError = true;
    continue;
  }

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    console.error(`[docs:coverage] Missing module symbol for: ${item.file}`);
    hasError = true;
    continue;
  }

  const symbol = checker
    .getExportsOfModule(moduleSymbol)
    .find((entry) => entry.getName() === item.exportName);
  if (!symbol) {
    console.error(
      `[docs:coverage] Missing export ${item.exportName} in ${item.file}`,
    );
    hasError = true;
    continue;
  }

  const target =
    symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const docs = ts
    .displayPartsToString(target.getDocumentationComment(checker))
    .trim();
  if (!docs) {
    console.error(
      `[docs:coverage] Missing JSDoc for ${item.exportName} in ${item.file}`,
    );
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}

console.log(
  `[docs:coverage] Verified JSDoc on ${requiredExports.length} required exports.`,
);
