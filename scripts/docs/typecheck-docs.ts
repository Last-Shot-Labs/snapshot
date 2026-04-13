import { spawnSync } from "node:child_process";

const result = spawnSync(
  "bun",
  ["x", "astro", "check", "--root", "apps/docs"],
  {
    stdio: "inherit",
    encoding: "utf8",
  },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
