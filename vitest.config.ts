import { defineConfig } from "vitest/config";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  define: {
    __SNAPSHOT_VERSION__: JSON.stringify(pkg.version),
  },
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["@testing-library/jest-dom"],
    exclude: ["**/node_modules/**", "**/.claude/worktrees/**"],
    environmentMatchGlobs: [["**/ui/**/*.test.{ts,tsx}", "happy-dom"]],
  },
});
