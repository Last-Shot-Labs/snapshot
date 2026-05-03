import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { BannerBase } from "../content/banner/standalone";
import { CodeBlockBase } from "../content/code-block/standalone";
import { TimelineBase } from "../content/timeline/standalone";
import { HeadingBase } from "../content/heading/standalone";
import { FileUploaderBase } from "../content/file-uploader/standalone";
import { CompareViewBase } from "../content/compare-view/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createTimelineItems() {
  return [
    { title: "Project created", description: "Repository initialized with boilerplate.", date: "May 1, 2026", icon: "rocket", color: "primary" },
    { title: "Team onboarded", description: "4 engineers joined the workspace.", date: "May 5, 2026", icon: "users", color: "success" },
    { title: "Alpha deployed", description: "First alpha build pushed to staging.", date: "May 12, 2026", icon: "cloud", color: "info" },
    { title: "Beta launch", description: "Public beta opened to early adopters.", date: "May 20, 2026", icon: "zap", color: "warning" },
  ];
}

function createInteractiveTimeline() {
  return [
    { title: "Requirements gathered", description: "Stakeholder interviews and technical discovery complete.", date: "Apr 15, 2026", icon: "clipboard-list", color: "success" },
    { title: "Design review", description: "Wireframes approved by design lead.", date: "Apr 22, 2026", icon: "figma", color: "success" },
    { title: "Sprint 1 complete", description: "Core components built and tested.", date: "May 1, 2026", icon: "check-circle", color: "success" },
    { title: "Sprint 2 in progress", description: "Integration tests and API wiring.", date: "May 8, 2026", icon: "loader", color: "primary" },
    { title: "QA review", description: "Pending quality assurance pass.", date: "May 15, 2026", icon: "shield-check", color: "secondary" },
    { title: "Production release", description: "Scheduled for general availability.", date: "May 22, 2026", icon: "rocket", color: "secondary" },
  ];
}

function createCodeSample() {
  return `import { createSnapshot } from "@lastshotlabs/snapshot";

const app = createSnapshot({
  auth: { providers: ["google", "github"] },
  theme: { flavor: "neutral" },
});

app.mount("#root");`;
}

function createJsxCodeSample() {
  return `export function Dashboard() {
  return (
    <CardBase title="Revenue" subtitle="Monthly recurring">
      <StatCardBase
        value="$42,800"
        label="MRR"
        trend={{ direction: "up", value: "+18%", percentage: 18, sentiment: "positive" }}
      />
    </CardBase>
  );
}`;
}

function createCompareLeft() {
  return `function greet(name) {\n  console.log("Hello " + name);\n}`;
}

function createCompareRight() {
  return `function greet(name: string): void {\n  console.log(\`Hello \${name}\`);\n}`;
}

// ── Meta ───────────────────────────────────────────────────────────────────

const bannerMeta = {
  title: "Components/Content/Banner",
  component: BannerBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Content display components including banners, code blocks with syntax highlighting, timelines, headings, file uploaders, and side-by-side compare views.",
      },
    },
  },
  argTypes: {
    height: {
      control: "text",
      description: "CSS height value for the banner.",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Horizontal alignment of banner content.",
    },
  },
} satisfies Meta<typeof BannerBase>;

export default bannerMeta;
type BannerStory = StoryObj<typeof bannerMeta>;

// ── Banner: Default ────────────────────────────────────────────────────────

export const Default: BannerStory = {
  args: {
    height: "40vh",
    align: "center",
    background: { color: "#1a1a2e", overlay: "rgba(0,0,0,0.3)" },
    children: (
      <div style={{ color: "#fff", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 0.75rem", fontSize: "2.5rem", fontWeight: 760 }}>Welcome to Snapshot</h1>
        <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.85 }}>
          Build beautiful apps at the speed of thought.
        </p>
      </div>
    ),
  },
};

// ── Banner: Gradient ───────────────────────────────────────────────────────

export const BannerWithGradient: BannerStory = {
  name: "Banner / Gradient",
  args: {
    height: "30vh",
    align: "left",
    background: { color: "linear-gradient(135deg, #0f766e, #2563eb)" },
    children: (
      <div style={{ color: "#fff", maxWidth: 480, padding: "0 2rem" }}>
        <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem", fontWeight: 700 }}>Ship faster</h2>
        <p style={{ margin: 0, fontSize: "1rem", opacity: 0.9 }}>
          Snapshot gives you production-ready components from day one.
        </p>
      </div>
    ),
  },
};

// ── Banner: Dismissible ────────────────────────────────────────────────────

export const BannerDismissible: BannerStory = {
  name: "Banner / Dismissible",
  render: () => {
    function DismissibleBannerDemo() {
      const [visible, setVisible] = useState(true);
      if (!visible) {
        return (
          <button
            onClick={() => setVisible(true)}
            style={{
              padding: "0.5rem 1rem",
              background: "var(--sn-color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--sn-radius-md, 0.375rem)",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Show banner again
          </button>
        );
      }
      return (
        <div style={{ position: "relative" }}>
          <BannerBase
            height="auto"
            align="center"
            background={{ color: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            <div style={{ color: "#fff", textAlign: "center", padding: "1.5rem 3rem 1.5rem 1.5rem" }}>
              <p style={{ margin: "0 0 0.25rem", fontWeight: 600, fontSize: "0.95rem" }}>
                New feature: Team collaboration is now available
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.85 }}>
                Invite your team and start collaborating in real time.
              </p>
            </div>
          </BannerBase>
          <button
            onClick={() => setVisible(false)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              cursor: "pointer",
              color: "#fff",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Dismiss banner"
          >
            x
          </button>
        </div>
      );
    }
    return <DismissibleBannerDemo />;
  },
};

// ── Code Block ──────────────────────────────────────────────────────────────

export const CodeBlock: StoryObj<typeof CodeBlockBase> = {
  render: (args) => <CodeBlockBase {...args} />,
  args: {
    code: createCodeSample(),
    language: "typescript",
    title: "app.ts",
    showLineNumbers: true,
  },
};

export const CodeBlockJSX: StoryObj<typeof CodeBlockBase> = {
  name: "Code Block / JSX",
  render: (args) => <CodeBlockBase {...args} />,
  args: {
    code: createJsxCodeSample(),
    language: "typescript",
    title: "Dashboard.tsx",
    showLineNumbers: true,
  },
};

// ── Code Block: Copy ───────────────────────────────────────────────────────

export const CodeBlockCopy: StoryObj<typeof CodeBlockBase> = {
  name: "Code Block / Copy Button",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <CodeBlockBase
        code="npm install @lastshotlabs/snapshot"
        language="bash"
        title="Installation"
        showCopy
      />
      <CodeBlockBase
        code={createCodeSample()}
        language="typescript"
        title="Quick Start"
        showLineNumbers
        showCopy
      />
    </div>
  ),
};

// ── Timeline ────────────────────────────────────────────────────────────────

export const Timeline: StoryObj<typeof TimelineBase> = {
  render: (args) => <TimelineBase {...args} />,
  args: {
    items: createTimelineItems(),
  },
};

// ── Timeline: Interactive ──────────────────────────────────────────────────

export const TimelineInteractive: StoryObj<typeof TimelineBase> = {
  name: "Timeline / Interactive",
  render: () => {
    const items = createInteractiveTimeline();
    return (
      <div style={{ maxWidth: 600 }}>
        <TimelineBase items={items} />
      </div>
    );
  },
};

// ── Heading ─────────────────────────────────────────────────────────────────

export const Heading: StoryObj<typeof HeadingBase> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <HeadingBase level={1} text="Heading Level 1" />
      <HeadingBase level={2} text="Heading Level 2" />
      <HeadingBase level={3} text="Heading Level 3" />
      <HeadingBase level={4} text="Heading Level 4" />
    </div>
  ),
};

// ── File Uploader ───────────────────────────────────────────────────────────

export const FileUploader: StoryObj<typeof FileUploaderBase> = {
  render: (args) => <FileUploaderBase {...args} />,
  args: {
    accept: ".png,.jpg,.jpeg,.gif,.webp",
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
    label: "Upload images",
    description: "Drag and drop files here, or click to browse. Max 5 MB each.",
  },
};

// ── Compare View ────────────────────────────────────────────────────────────

export const CompareView: StoryObj<typeof CompareViewBase> = {
  render: (args) => <CompareViewBase {...args} />,
  args: {
    left: createCompareLeft(),
    right: createCompareRight(),
    leftLabel: "Before",
    rightLabel: "After",
  },
};
