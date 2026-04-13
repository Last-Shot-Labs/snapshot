import path from "node:path";
import * as ts from "typescript";
import {
  escapeCell,
  markdownPage,
  repoPath,
  relToRepo,
  writeDoc,
} from "./_common";

type Surface = {
  label: string;
  file: string;
  output: string;
  description: string;
};

const surfaces: Surface[] = [
  {
    label: "SDK",
    file: repoPath("src", "index.ts"),
    output: "reference/sdk.md",
    description: "Generated from src/index.ts and the declarations it re-exports.",
  },
  {
    label: "UI",
    file: repoPath("src", "ui.ts"),
    output: "reference/ui.md",
    description: "Generated from src/ui.ts and the declarations it re-exports.",
  },
  {
    label: "SSR",
    file: repoPath("src", "ssr", "index.ts"),
    output: "reference/ssr.md",
    description: "Generated from src/ssr/index.ts and the declarations it re-exports.",
  },
  {
    label: "Vite",
    file: repoPath("src", "vite", "index.ts"),
    output: "reference/vite.md",
    description: "Generated from src/vite/index.ts and the declarations it re-exports.",
  },
];

function getProgram(): ts.Program {
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
  return ts.createProgram({
    rootNames: parsed.fileNames,
    options: parsed.options,
  });
}

function getDeclarationKind(symbol: ts.Symbol, checker: ts.TypeChecker): string {
  const target =
    symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration = target.declarations?.[0];
  if (!declaration) return "unknown";
  const kind = ts.SyntaxKind[declaration.kind] ?? "unknown";
  return kind
    .replace(/Declaration$/, "")
    .replace(/Signature$/, "")
    .replace(/^JSDoc/, "")
    .toLowerCase();
}

function getDocString(symbol: ts.Symbol, checker: ts.TypeChecker): string {
  const target =
    symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  return (
    ts.displayPartsToString(target.getDocumentationComment(checker)).trim() ||
    "No JSDoc description."
  );
}

function getSourcePath(symbol: ts.Symbol, checker: ts.TypeChecker): string {
  const target =
    symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration = target.declarations?.[0];
  if (!declaration) return "unknown";
  return relToRepo(declaration.getSourceFile().fileName);
}

function renderSurface(program: ts.Program, surface: Surface): void {
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(surface.file);
  if (!sourceFile) {
    throw new Error(`Missing source file: ${surface.file}`);
  }

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    throw new Error(`Missing module symbol for: ${surface.file}`);
  }

  const exports = checker
    .getExportsOfModule(moduleSymbol)
    .filter((symbol) => symbol.getName() !== "default")
    .sort((a, b) => a.getName().localeCompare(b.getName()));

  const rows = exports.map((symbol) => {
    const name = symbol.getName();
    const kind = getDeclarationKind(symbol, checker);
    const sourcePath = getSourcePath(symbol, checker);
    const docs = getDocString(symbol, checker);
    return `| \`${escapeCell(name)}\` | ${escapeCell(kind)} | \`${escapeCell(sourcePath)}\` | ${escapeCell(docs)} |`;
  });

  writeDoc(
    surface.output,
    markdownPage(
      `${surface.label} Reference`,
      surface.description,
      [
        surface.description,
        "",
        `Generated from \`${relToRepo(surface.file)}\`.`,
        "",
        "| Export | Kind | Source | Description |",
        "|---|---|---|---|",
        ...rows,
      ].join("\n"),
    ),
  );
}

export function generateApiReference(): void {
  const program = getProgram();
  for (const surface of surfaces) {
    renderSurface(program, surface);
  }
}

if (import.meta.main) {
  generateApiReference();
}
