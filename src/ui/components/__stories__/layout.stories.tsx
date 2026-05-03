import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { CardBase } from "../layout/card/standalone";
import { NavBase } from "../layout/nav/standalone";
import { GridBase } from "../layout/grid/standalone";
import { BoxBase } from "../layout/box/standalone";
import { SectionBase } from "../layout/section/standalone";
import { SplitPaneBase } from "../layout/split-pane/standalone";
import { CollapsibleBase } from "../layout/collapsible/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createNavItems() {
  return [
    { label: "Dashboard", icon: "layout-dashboard", path: "/dashboard" },
    { label: "Projects", icon: "folder", path: "/projects", badge: 3 },
    { label: "Analytics", icon: "bar-chart-2", path: "/analytics" },
    { label: "Team", icon: "users", path: "/team" },
    {
      label: "Settings",
      icon: "settings",
      path: "/settings",
      children: [
        { label: "General", path: "/settings/general" },
        { label: "Billing", path: "/settings/billing" },
        { label: "API keys", path: "/settings/api-keys" },
      ],
    },
  ];
}

function createTopNavItems() {
  return [
    { label: "Home", icon: "home", path: "/" },
    { label: "Projects", icon: "folder", path: "/projects" },
    { label: "Docs", icon: "book-open", path: "/docs" },
    { label: "Settings", icon: "settings", path: "/settings" },
  ];
}

function createGridCells(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Cell ${i + 1}`,
  }));
}

function createMetricCards() {
  return [
    { title: "Revenue", subtitle: "Monthly recurring", value: "$42,800" },
    { title: "Customers", subtitle: "Active accounts", value: "1,284" },
    { title: "Uptime", subtitle: "Last 30 days", value: "99.98%" },
  ];
}

const CELL_STYLE: React.CSSProperties = {
  padding: "2rem",
  background: "var(--sn-color-card, #fff)",
  border: "1px solid var(--sn-color-border, #e5e7eb)",
  borderRadius: "var(--sn-radius-md, 0.5rem)",
  textAlign: "center",
  fontSize: "0.875rem",
  color: "var(--sn-color-muted-foreground)",
};

const LABEL_STYLE: React.CSSProperties = {
  margin: "0 0 0.75rem",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "var(--sn-color-muted-foreground)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.02em",
};

// ── Card Meta ──────────────────────────────────────────────────────────────

const cardMeta = {
  title: "Components/Layout/Card",
  component: CardBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Card component for grouping related content with an optional title, subtitle, and configurable internal spacing. Serves as the primary content container across Snapshot apps.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Header title for the card.",
    },
    subtitle: {
      control: "text",
      description: "Subtitle shown below the title.",
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "Spacing between child elements inside the card.",
    },
    className: {
      control: "text",
      description: "CSS class applied to the card root element.",
    },
  },
} satisfies Meta<typeof CardBase>;

export default cardMeta;
type CardStory = StoryObj<typeof cardMeta>;

export const Default: CardStory = {
  args: {
    title: "Project overview",
    subtitle: "Track your project metrics and milestones",
    gap: "md",
    children: (
      <p style={{ margin: 0, color: "var(--sn-color-muted-foreground)", fontSize: "0.875rem", lineHeight: 1.6 }}>
        Your project is on track with 86% completion. The next milestone is the beta
        launch scheduled for next week. All critical issues have been resolved.
      </p>
    ),
  },
};

export const CardGrid: CardStory = {
  name: "Card Grid",
  render: () => {
    const metrics = createMetricCards();
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {metrics.map((m) => (
          <CardBase key={m.title} title={m.title} subtitle={m.subtitle}>
            <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>{m.value}</p>
          </CardBase>
        ))}
      </div>
    );
  },
};

// ── Card: Hover/Focus States ───────────────────────────────────────────────

export const CardVariants: CardStory = {
  name: "Card / Variants",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
      <CardBase title="Default card" subtitle="Standard content container">
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
          Static content card with title and subtitle.
        </p>
      </CardBase>
      <CardBase title="No subtitle" gap="sm">
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
          Card with tighter spacing and no subtitle.
        </p>
      </CardBase>
      <CardBase title="Large gap card" subtitle="With extra spacing" gap="lg">
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
          Uses the large gap preset for spacious layouts.
        </p>
      </CardBase>
    </div>
  ),
};

// ── Nav ─────────────────────────────────────────────────────────────────────

export const NavSidebar: StoryObj<typeof NavBase> = {
  name: "Nav / Sidebar",
  render: () => {
    function SidebarDemo() {
      const [collapsed, setCollapsed] = useState(false);
      return (
        <div style={{ height: 520, display: "flex", border: "1px solid var(--sn-color-border, #e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
          <NavBase
            variant="sidebar"
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            logo={{ text: "Acme Inc", path: "/" }}
            pathname="/dashboard"
            items={createNavItems()}
            onNavigate={(path) => console.log("Navigate to", path)}
          />
          <div style={{ flex: 1, padding: "2rem", background: "var(--sn-color-background, #fafafa)" }}>
            <p style={{ margin: 0, color: "var(--sn-color-muted-foreground)" }}>Page content area</p>
          </div>
        </div>
      );
    }
    return <SidebarDemo />;
  },
};

export const NavTopBar: StoryObj<typeof NavBase> = {
  name: "Nav / Top Bar",
  render: () => (
    <NavBase
      variant="top-nav"
      logo={{ text: "Workspace" }}
      pathname="/projects"
      items={createTopNavItems()}
      onNavigate={(path) => console.log("Navigate to", path)}
    />
  ),
};

// ── Grid ────────────────────────────────────────────────────────────────────

export const Grid: StoryObj<typeof GridBase> = {
  render: () => {
    const cells = createGridCells(6);
    return (
      <GridBase columns={3} gap="md">
        {cells.map((cell) => (
          <div key={cell.id} style={CELL_STYLE}>
            {cell.label}
          </div>
        ))}
      </GridBase>
    );
  },
};

// ── Grid: Responsive ───────────────────────────────────────────────────────

export const ResponsiveGrid: StoryObj<typeof GridBase> = {
  name: "Grid / Responsive",
  render: () => {
    const cells = createGridCells(12);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <p style={LABEL_STYLE}>4 columns (resize browser to see wrapping)</p>
          <GridBase columns={4} gap="md">
            {cells.slice(0, 8).map((cell) => (
              <div key={cell.id} style={CELL_STYLE}>
                {cell.label}
              </div>
            ))}
          </GridBase>
        </div>
        <div>
          <p style={LABEL_STYLE}>3 columns</p>
          <GridBase columns={3} gap="md">
            {cells.slice(0, 6).map((cell) => (
              <div key={cell.id} style={CELL_STYLE}>
                {cell.label}
              </div>
            ))}
          </GridBase>
        </div>
        <div>
          <p style={LABEL_STYLE}>2 columns</p>
          <GridBase columns={2} gap="lg">
            {cells.slice(0, 4).map((cell) => (
              <div key={cell.id} style={CELL_STYLE}>
                {cell.label}
              </div>
            ))}
          </GridBase>
        </div>
      </div>
    );
  },
};

// ── Box ─────────────────────────────────────────────────────────────────────

export const Box: StoryObj<typeof BoxBase> = {
  render: () => (
    <BoxBase style={{ padding: "1.5rem", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ margin: 0, fontWeight: 600 }}>Contained content</p>
      <p style={{ margin: 0, color: "var(--sn-color-muted-foreground)", fontSize: "0.875rem" }}>
        The Box component is a styled container that renders as any semantic HTML element.
      </p>
    </BoxBase>
  ),
};

// ── Collapsible ─────────────────────────────────────────────────────────────

export const Collapsible: StoryObj<typeof CollapsibleBase> = {
  render: () => (
    <CollapsibleBase
      defaultOpen={false}
      trigger={
        <button style={{ padding: "0.5rem 1rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, border: "1px solid var(--sn-color-border, #e5e7eb)", borderRadius: "var(--sn-radius-md, 0.375rem)", background: "var(--sn-color-card, #fff)" }}>
          Advanced options
        </button>
      }
    >
      <div style={{ padding: "0.75rem 0" }}>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
          These settings are for power users. Most projects work fine with the defaults.
        </p>
      </div>
    </CollapsibleBase>
  ),
};

// ── Split Pane ──────────────────────────────────────────────────────────────

export const SplitPane: StoryObj<typeof SplitPaneBase> = {
  render: () => (
    <div style={{ height: 300, border: "1px solid var(--sn-color-border, #e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
      <SplitPaneBase
        direction="horizontal"
        defaultSplit={35}
        minSize={180}
        first={
          <div style={{ padding: "1rem", height: "100%", background: "var(--sn-color-card, #fff)" }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem" }}>Sidebar panel</p>
          </div>
        }
        second={
          <div style={{ padding: "1rem", height: "100%", background: "var(--sn-color-background, #fafafa)" }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem" }}>Main content</p>
          </div>
        }
      />
    </div>
  ),
};

// ── Split Pane: Interactive ────────────────────────────────────────────────

export const SplitPaneInteractive: StoryObj<typeof SplitPaneBase> = {
  name: "Split Pane / Interactive",
  render: () => {
    function SplitPaneDemo() {
      const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setDirection("horizontal")}
              style={{
                padding: "0.4rem 0.75rem",
                fontSize: "0.8rem",
                border: "1px solid var(--sn-color-border, #e5e7eb)",
                borderRadius: "var(--sn-radius-md, 0.375rem)",
                background: direction === "horizontal" ? "var(--sn-color-primary)" : "var(--sn-color-card, #fff)",
                color: direction === "horizontal" ? "#fff" : "inherit",
                cursor: "pointer",
              }}
            >
              Horizontal
            </button>
            <button
              onClick={() => setDirection("vertical")}
              style={{
                padding: "0.4rem 0.75rem",
                fontSize: "0.8rem",
                border: "1px solid var(--sn-color-border, #e5e7eb)",
                borderRadius: "var(--sn-radius-md, 0.375rem)",
                background: direction === "vertical" ? "var(--sn-color-primary)" : "var(--sn-color-card, #fff)",
                color: direction === "vertical" ? "#fff" : "inherit",
                cursor: "pointer",
              }}
            >
              Vertical
            </button>
          </div>
          <div style={{ height: 360, border: "1px solid var(--sn-color-border, #e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
            <SplitPaneBase
              direction={direction}
              defaultSplit={40}
              minSize={120}
              first={
                <div style={{ padding: "1rem", height: "100%", background: "var(--sn-color-card, #fff)" }}>
                  <p style={{ margin: "0 0 0.5rem", fontWeight: 600, fontSize: "0.875rem" }}>Editor</p>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>
                    Drag the divider to resize this panel. The minimum size is 120px.
                  </p>
                </div>
              }
              second={
                <div style={{ padding: "1rem", height: "100%", background: "var(--sn-color-background, #fafafa)" }}>
                  <p style={{ margin: "0 0 0.5rem", fontWeight: 600, fontSize: "0.875rem" }}>Preview</p>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>
                    Content renders here based on the editor input. Both panels maintain their scroll state independently.
                  </p>
                </div>
              }
            />
          </div>
        </div>
      );
    }
    return <SplitPaneDemo />;
  },
};
