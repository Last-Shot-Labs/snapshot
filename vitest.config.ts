import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["@testing-library/jest-dom"],
    exclude: ["**/node_modules/**", "**/.claude/worktrees/**"],
    environmentMatchGlobs: [["**/ui/**/*.test.{ts,tsx}", "happy-dom"]],
  },
});
