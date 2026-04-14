import path from "node:path";
import * as ts from "typescript";
import { repoPath } from "./_common.ts";

const entrypoints = [
  repoPath("src", "index.ts"),
  repoPath("src", "ui.ts"),
  repoPath("src", "ssr", "index.ts"),
  repoPath("src", "vite", "index.ts"),
  repoPath("src", "ui", "manifest", "index.ts"),
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
let verifiedExports = 0;

for (const entrypoint of entrypoints) {
  const sourceFile = program.getSourceFile(entrypoint);
  if (!sourceFile) {
    console.error(`[docs:coverage] Missing source file: ${entrypoint}`);
    hasError = true;
    continue;
  }

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    console.error(`[docs:coverage] Missing module symbol for: ${entrypoint}`);
    hasError = true;
    continue;
  }

  for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
    const target =
      symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    const declarations = target.getDeclarations() ?? symbol.getDeclarations() ?? [];
    const declarationFile = declarations[0]?.getSourceFile().fileName;

    if (!declarationFile || declarationFile.includes("node_modules")) {
      continue;
    }

    const docs = ts
      .displayPartsToString(target.getDocumentationComment(checker))
      .trim();
    if (!docs) {
      console.error(
        `[docs:coverage] Missing JSDoc for ${symbol.getName()} exported from ${path.relative(repoPath(), entrypoint).replace(/\\/g, "/")}`,
      );
      hasError = true;
      continue;
    }

    verifiedExports += 1;
  }
}

if (hasError) {
  process.exit(1);
}

console.log(
  `[docs:coverage] Verified JSDoc on ${verifiedExports} local public exports across ${entrypoints.length} entrypoints.`,
);
