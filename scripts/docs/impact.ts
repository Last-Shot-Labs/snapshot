import { existsSync, readFileSync } from "node:fs";
import { repoPath } from "./_common";

type ImpactMap = {
  surfaces: Record<
    string,
    {
      sources: string[];
      docs: string[];
    }
  >;
};

const impactMapPath = repoPath("docs", "documentation-impact-map.json");
const impactMap = JSON.parse(readFileSync(impactMapPath, "utf8")) as ImpactMap;

let hasError = false;

for (const [surface, config] of Object.entries(impactMap.surfaces)) {
  for (const filePath of [...config.sources, ...config.docs]) {
    const absolutePath = repoPath(...filePath.split(/[\\/]/));
    if (!existsSync(absolutePath)) {
      console.error(
        `[docs:impact] Missing mapped path for surface "${surface}": ${filePath}`,
      );
      hasError = true;
    }
  }
}

const baseRef = process.env["DOCS_IMPACT_BASE"];
if (baseRef) {
  const { spawnSync } = await import("node:child_process");
  const diff = spawnSync("git", ["diff", "--name-only", baseRef, "HEAD"], {
    cwd: repoPath(),
    encoding: "utf8",
  });

  if (diff.status === 0) {
    const changedFiles = diff.stdout
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);

    for (const changedFile of changedFiles) {
      const mapped = Object.values(impactMap.surfaces).some((surface) =>
        surface.sources.some(
          (source) =>
            changedFile === source || changedFile.startsWith(`${source}/`),
        ),
      );

      if (
        changedFile.startsWith("src/") &&
        !changedFile.startsWith("src/test") &&
        !mapped
      ) {
        console.error(
          `[docs:impact] Changed source file is not covered by the impact map: ${changedFile}`,
        );
        hasError = true;
      }
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log(
  `[docs:impact] Validated ${Object.keys(impactMap.surfaces).length} mapped surfaces.`,
);
