import { existsSync } from "node:fs";
import { markdownPage, repoPath, writeDoc } from "./_common";

type Capability = {
  name: string;
  status: "present" | "missing";
  evidence: string[];
};

function detectCapability(name: string, files: string[]): Capability {
  const present = files.filter((file) => existsSync(repoPath(file)));
  return {
    name,
    status: present.length > 0 ? "present" : "missing",
    evidence: present,
  };
}

export function generateCapabilityMap(): void {
  const capabilities = [
    detectCapability("SDK bootstrap and auth", [
      "src/index.ts",
      "src/create-snapshot.tsx",
      "src/auth/hooks.ts",
    ]),
    detectCapability("Manifest-driven UI", [
      "src/ui.ts",
      "src/ui/manifest/schema.ts",
      "src/ui/manifest/app.tsx",
    ]),
    detectCapability("SSR and manifest rendering", [
      "src/ssr/index.ts",
      "src/ssr/manifest-renderer.ts",
      "src/ssr/render.ts",
    ]),
    detectCapability("React Server Components support", [
      "src/ssr/rsc.ts",
      "src/vite/rsc-transform.ts",
    ]),
    detectCapability("Vite app and sync plugins", ["src/vite/index.ts"]),
    detectCapability("CLI scaffold and sync", [
      "src/cli/commands/init.ts",
      "src/cli/commands/sync.ts",
      "src/cli/commands/manifest/init.ts",
    ]),
    detectCapability("Community and notification APIs", [
      "src/community/index.ts",
      "src/webhooks/index.ts",
    ]),
    detectCapability("Realtime: websocket and SSE", [
      "src/ws/manager.ts",
      "src/sse/manager.ts",
      "src/push/hook.ts",
    ]),
    detectCapability("Content and media components", [
      "src/ui/components/content/markdown/index.ts",
      "src/ui/components/content/rich-input/index.ts",
      "src/ui/components/content/rich-text-editor/index.ts",
      "src/ui/components/content/file-uploader/index.ts",
    ]),
    detectCapability("Communication components", [
      "src/ui/components/communication/chat-window/index.ts",
      "src/ui/components/communication/emoji-picker/index.ts",
      "src/ui/components/communication/gif-picker/index.ts",
    ]),
    detectCapability("Workflow and dashboard presets", [
      "src/ui/presets/index.ts",
      "src/ui/components/workflow/notification-feed/index.ts",
      "src/ui/components/commerce/pricing-table/index.ts",
    ]),
    detectCapability("Visual component showcase", ["playground/src/showcase.tsx"]),
  ];

  const rows = capabilities.map((capability) => {
    const evidence =
      capability.evidence.length > 0
        ? capability.evidence.map((value) => `\`${value}\``).join(", ")
        : "None";
    return `| ${capability.name} | ${capability.status} | ${evidence} |`;
  });

  writeDoc(
    "start-here/capabilities.md",
    markdownPage(
      "Capabilities",
      "Generated overview of major Snapshot capabilities backed by current source.",
      [
        "This page is generated from current source presence checks. It exists to keep the top-level docs honest about what Snapshot can do on `main`.",
        "",
        "| Capability | Status | Evidence |",
        "|---|---|---|",
        ...rows,
      ].join("\n"),
    ),
  );
}

if (import.meta.main) {
  generateCapabilityMap();
}
