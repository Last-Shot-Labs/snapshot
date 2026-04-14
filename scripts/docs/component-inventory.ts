import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import * as ts from "typescript";
import { relToRepo, repoPath } from "./_common.ts";

export interface ComponentDirectoryRecord {
  domain: string;
  componentName: string;
  relativeDir: string;
  absoluteDir: string;
  hasComponent: boolean;
  hasSchema: boolean;
  hasComponentTest: boolean;
  hasSchemaTest: boolean;
}

export interface ManifestComponentRecord {
  type: string;
  domain: string;
  componentName: string;
  relativeDir: string;
  schemaExport: string;
}

function walkComponentDirs(dir: string, results: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === "__tests__") {
        continue;
      }
      walkComponentDirs(fullPath, results);
      continue;
    }

    if (entry === "index.ts" || entry === "index.tsx") {
      results.push(path.dirname(fullPath));
    }
  }

  return results;
}

export function collectComponentDirectories(): ComponentDirectoryRecord[] {
  const componentsRoot = repoPath("src", "ui", "components");
  const dirs = walkComponentDirs(componentsRoot);

  return dirs
    .map((absoluteDir) => {
      const relativeDir = path.relative(componentsRoot, absoluteDir).replace(/\\/g, "/");
      const [domain, ...parts] = relativeDir.split("/");
      const componentName = parts.join("/");
      const testsDir = path.join(absoluteDir, "__tests__");
      const tests = statIfExists(testsDir)?.isDirectory()
        ? readdirSync(testsDir)
        : [];

      return {
        domain: domain ?? "",
        componentName,
        relativeDir,
        absoluteDir,
        hasComponent:
          fileExists(path.join(absoluteDir, "component.tsx")) ||
          fileExists(path.join(absoluteDir, "component.ts")),
        hasSchema: fileExists(path.join(absoluteDir, "schema.ts")),
        hasComponentTest: tests.some((name) =>
          /component\.test\.(ts|tsx)$/.test(name),
        ),
        hasSchemaTest: tests.some((name) => /schema\.test\.(ts|tsx)$/.test(name)),
      } satisfies ComponentDirectoryRecord;
    })
    .filter((record) => Boolean(record.domain) && Boolean(record.componentName))
    .sort((left, right) => left.relativeDir.localeCompare(right.relativeDir));
}

function normalizeComponentDir(registerFile: string, importPath: string): string | null {
  if (!importPath.startsWith(".")) {
    return null;
  }

  const absoluteImport = path.resolve(path.dirname(registerFile), importPath);
  const relativeImport = relToRepo(absoluteImport);
  const marker = "src/ui/components/";
  const markerIndex = relativeImport.indexOf(marker);
  if (markerIndex === -1) {
    return null;
  }

  return relativeImport
    .slice(markerIndex + marker.length)
    .replace(/\/(index|schema|component|types)$/, "");
}

export function collectRegisteredManifestComponents(): ManifestComponentRecord[] {
  const registerFile = repoPath("src", "ui", "components", "register.ts");
  const sourceText = readFileSync(registerFile, "utf8");
  const sourceFile = ts.createSourceFile(
    registerFile,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const importSourceByIdentifier = new Map<string, string>();

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }

    const importPath = statement.moduleSpecifier.text;
    const componentDir = normalizeComponentDir(registerFile, importPath);
    if (!componentDir) {
      continue;
    }

    const namedBindings = statement.importClause?.namedBindings;
    if (!namedBindings || !ts.isNamedImports(namedBindings)) {
      continue;
    }

    for (const element of namedBindings.elements) {
      importSourceByIdentifier.set(element.name.text, componentDir);
    }
  }

  const records: ManifestComponentRecord[] = [];

  function visit(node: ts.Node): void {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "registerComponentSchema" &&
      node.arguments.length >= 2 &&
      ts.isStringLiteral(node.arguments[0]!) &&
      ts.isIdentifier(node.arguments[1]!)
    ) {
      const type = node.arguments[0].text;
      const schemaExport = node.arguments[1].text;
      const relativeDir = importSourceByIdentifier.get(schemaExport);
      if (relativeDir) {
        const [domain, ...parts] = relativeDir.split("/");
        records.push({
          type,
          domain: domain ?? "",
          componentName: parts.join("/"),
          relativeDir,
          schemaExport,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return records.sort((left, right) => left.type.localeCompare(right.type));
}

export function collectLazyLoadedTypes(): Set<string> {
  const lazyRegistryFile = repoPath("src", "ui", "manifest", "lazy-registry.ts");
  const sourceText = readFileSync(lazyRegistryFile, "utf8");
  const sourceFile = ts.createSourceFile(
    lazyRegistryFile,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const loadedTypes = new Set<string>();

  function readLoaderKey(name: ts.PropertyName): string | null {
    if (ts.isIdentifier(name)) {
      return name.text;
    }
    if (ts.isStringLiteral(name)) {
      return name.text;
    }
    return null;
  }

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && node.name.getText() === "COMPONENT_LOADERS") {
      if (node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
        for (const property of node.initializer.properties) {
          if (ts.isPropertyAssignment(property)) {
            const key = readLoaderKey(property.name);
            if (key) {
              loadedTypes.add(key);
            }
          }
        }
      }
    }

    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isElementAccessExpression(node.left) &&
      ts.isIdentifier(node.left.expression) &&
      node.left.expression.text === "COMPONENT_LOADERS" &&
      ts.isStringLiteral(node.left.argumentExpression)
    ) {
      loadedTypes.add(node.left.argumentExpression.text);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return loadedTypes;
}

function fileExists(filePath: string): boolean {
  return Boolean(statIfExists(filePath));
}

function statIfExists(filePath: string) {
  try {
    return statSync(filePath);
  } catch {
    return null;
  }
}
