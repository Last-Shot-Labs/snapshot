import { rmSync } from "node:fs";
import { generateApiReference } from "./generate-api-reference.ts";
import { generateCapabilityMap } from "./generate-capability-map.ts";
import { generateCliReference } from "./generate-cli-reference.ts";
import { generateComponentReference } from "./generate-component-reference.ts";
import { generateManifestReference } from "./generate-manifest-reference.ts";

rmSync("apps/docs/.astro", { recursive: true, force: true });

generateApiReference();
generateCapabilityMap();
generateCliReference();
generateComponentReference();
generateManifestReference();
