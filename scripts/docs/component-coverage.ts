import { readFileSync } from "node:fs";
import {
  collectComponentDirectories,
  collectLazyLoadedTypes,
  collectRegisteredManifestComponents,
} from "./component-inventory.ts";
import { repoPath } from "./_common.ts";

const componentDocsPath = repoPath(
  "apps",
  "docs",
  "src",
  "content",
  "docs",
  "reference",
  "components.md",
);
const apiDocsPath = repoPath(
  "apps",
  "docs",
  "src",
  "content",
  "docs",
  "reference",
  "ui",
  "index.md",
);

const componentDocs = readFileSync(componentDocsPath, "utf8");
const apiDocs = readFileSync(apiDocsPath, "utf8");
const componentDirectories = collectComponentDirectories();
const manifestComponents = collectRegisteredManifestComponents();
const lazyLoadedTypes = collectLazyLoadedTypes();

let hasError = false;

for (const directory of componentDirectories) {
  if (directory.hasComponent && !directory.hasComponentTest) {
    console.error(
      `[components:coverage] Missing component test for ${directory.relativeDir}`,
    );
    hasError = true;
  }

  if (directory.hasSchema && !directory.hasSchemaTest) {
    console.error(
      `[components:coverage] Missing schema test for ${directory.relativeDir}`,
    );
    hasError = true;
  }

  if (!componentDocs.includes(`### \`${directory.componentName}\``)) {
    console.error(
      `[components:coverage] Missing component directory doc entry for ${directory.relativeDir}`,
    );
    hasError = true;
  }
}

for (const component of manifestComponents) {
  if (!lazyLoadedTypes.has(component.type)) {
    console.error(
      `[components:coverage] Missing lazy loader for manifest component type "${component.type}" (${component.relativeDir})`,
    );
    hasError = true;
  }

  if (!componentDocs.includes(`\`${component.type}\``)) {
    console.error(
      `[components:coverage] Missing manifest type doc entry for "${component.type}" (${component.relativeDir})`,
    );
    hasError = true;
  }
}

if (/No JSDoc description|No description/i.test(apiDocs)) {
  console.error(
    `[components:coverage] Generated API reference still contains missing-description placeholders.`,
  );
  hasError = true;
}

if (hasError) {
  process.exit(1);
}

console.log(
  `[components:coverage] Verified ${componentDirectories.length} component directories, ${manifestComponents.length} manifest component types, and generated component/API docs.`,
);
