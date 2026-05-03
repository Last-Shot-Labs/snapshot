import {
  collectRegisteredManifestComponents,
} from "../docs/component-inventory.ts";
import { registerBuiltInComponents } from "../../src/ui/components/register.ts";
import { getRegisteredSchemas } from "../../src/ui/manifest/schema.ts";
import {
  COMPONENT_FIXTURES,
  type ComponentFixture,
} from "../../src/ui/components/__stories__/component-fixtures.ts";

function issuePath(path: Array<string | number>): string {
  return path.length > 0 ? path.join(".") : "(root)";
}

function formatFixtureIssue(type: string, fixture: ComponentFixture): string {
  return `${type} / ${fixture.name}`;
}

registerBuiltInComponents(true);

const registeredComponents = collectRegisteredManifestComponents();
const registeredTypes = new Set(registeredComponents.map((component) => component.type));
const schemas = getRegisteredSchemas();
const failures: string[] = [];

for (const component of registeredComponents) {
  const fixtures = COMPONENT_FIXTURES[component.type];
  if (!fixtures || fixtures.length === 0) {
    failures.push(`Missing Storybook fixture for "${component.type}".`);
    continue;
  }

  const schema = schemas.get(component.type);
  if (!schema) {
    failures.push(`Missing registered schema for "${component.type}".`);
    continue;
  }

  for (const fixture of fixtures) {
    if (fixture.config.type !== component.type) {
      failures.push(
        `${formatFixtureIssue(component.type, fixture)} config.type is "${fixture.config.type}".`,
      );
      continue;
    }

    const result = schema.safeParse(fixture.config);
    if (!result.success) {
      const details = result.error.issues
        .slice(0, 5)
        .map((issue) => `${issuePath(issue.path)}: ${issue.message}`)
        .join("; ");
      failures.push(
        `${formatFixtureIssue(component.type, fixture)} failed schema validation: ${details}`,
      );
    }
  }
}

for (const type of Object.keys(COMPONENT_FIXTURES)) {
  if (!registeredTypes.has(type)) {
    failures.push(`Fixture exists for unregistered component type "${type}".`);
  }
}

if (failures.length > 0) {
  console.error(`[storybook:coverage] ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `[storybook:coverage] Verified ${registeredComponents.length} registered component stories and fixture schemas.`,
);
