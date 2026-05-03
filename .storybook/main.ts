import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dirname, "..");

const config: StorybookConfig = {
  stories: ["../src/ui/components/__stories__/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(baseConfig) {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), tailwindcss()];
    baseConfig.resolve = {
      ...(baseConfig.resolve ?? {}),
      alias: {
        ...(baseConfig.resolve?.alias ?? {}),
        "@lastshotlabs/snapshot/ui": path.resolve(repoRoot, "src/ui.ts"),
        "@lastshotlabs/snapshot": path.resolve(repoRoot, "src/index.ts"),
      },
    };

    return baseConfig;
  },
};

export default config;
