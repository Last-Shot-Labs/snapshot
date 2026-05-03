import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { TabsBase } from "../navigation/tabs/standalone";
import { AccordionBase } from "../navigation/accordion/standalone";
import { BreadcrumbBase } from "../navigation/breadcrumb/standalone";
import { StepperBase } from "../navigation/stepper/standalone";
import { TreeViewBase } from "../navigation/tree-view/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createTabContent(text: string) {
  return (
    <div style={{ padding: "1rem 0" }}>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>{text}</p>
    </div>
  );
}

function createDefaultTabs() {
  return [
    { label: "Overview", icon: "layout-dashboard", content: createTabContent("Project overview and summary metrics.") },
    { label: "Activity", icon: "activity", content: createTabContent("Recent activity log and event timeline.") },
    { label: "Settings", icon: "settings", content: createTabContent("Configure project settings and integrations.") },
    { label: "Members", icon: "users", content: createTabContent("Manage team members and permissions.") },
  ];
}

function createManyTabs(count: number) {
  const icons = ["home", "folder", "file", "settings", "users", "mail", "bell", "star", "heart", "zap", "shield", "globe", "code", "database", "server"];
  return Array.from({ length: count }, (_, i) => ({
    label: `Tab ${i + 1}`,
    icon: icons[i % icons.length],
    content: createTabContent(`Content for tab ${i + 1}. This demonstrates overflow behavior with many tabs.`),
  }));
}

function createAccordionItems() {
  return [
    {
      title: "What is Snapshot?",
      icon: "zap",
      content: (
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)", lineHeight: 1.6 }}>
          Snapshot is a full-stack frontend framework built on top of bunshot-powered backends.
          It ships manifest-driven UI, SDK-driven apps, and SSR integration out of the box.
        </p>
      ),
    },
    {
      title: "How do I style components?",
      icon: "palette",
      content: (
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)", lineHeight: 1.6 }}>
          Components use CSS custom properties (tokens) and a slot-based override system.
          You can customize every surface through the slots prop or by providing a custom theme.
        </p>
      ),
    },
    {
      title: "Can I use standalone components?",
      icon: "box",
      content: (
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)", lineHeight: 1.6 }}>
          Yes -- every component ships a standalone variant that works with plain React props.
          No manifest context required.
        </p>
      ),
    },
  ];
}

function createBreadcrumbItems() {
  return [
    { label: "Home", icon: "home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Acme Corp", path: "/projects/acme" },
    { label: "Settings" },
  ];
}

function createDeepBreadcrumbs() {
  return [
    { label: "Home", path: "/" },
    { label: "Workspace", path: "/workspace" },
    { label: "Projects", path: "/projects" },
    { label: "Acme Corp", path: "/projects/acme" },
    { label: "Settings", path: "/projects/acme/settings" },
    { label: "Integrations", path: "/projects/acme/settings/integrations" },
    { label: "GitHub" },
  ];
}

function createStepperSteps() {
  return [
    { title: "Account", description: "Create your account", icon: 1 },
    { title: "Profile", description: "Set up your profile", icon: 2 },
    { title: "Workspace", description: "Configure workspace", icon: 3 },
    { title: "Done", description: "You're all set", icon: 4 },
  ];
}

function createTreeViewItems() {
  return [
    {
      label: "src",
      value: "src",
      icon: "folder",
      children: [
        {
          label: "components",
          value: "components",
          icon: "folder",
          children: [
            { label: "Button.tsx", value: "button", icon: "file" },
            { label: "Card.tsx", value: "card", icon: "file" },
            { label: "Modal.tsx", value: "modal", icon: "file" },
          ],
        },
        { label: "index.ts", value: "index", icon: "file" },
        { label: "App.tsx", value: "app", icon: "file" },
      ],
    },
    {
      label: "tests",
      value: "tests",
      icon: "folder",
      children: [
        { label: "setup.ts", value: "setup", icon: "file" },
        { label: "Button.test.tsx", value: "button-test", icon: "file" },
      ],
    },
    { label: "package.json", value: "package", icon: "file" },
    { label: "README.md", value: "readme", icon: "file" },
  ];
}

// ── Tabs Meta ──────────────────────────────────────────────────────────────

const tabsMeta = {
  title: "Components/Navigation/Tabs",
  component: TabsBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Tabbed navigation component supporting default, underline, and pills variants. Use for switching between content sections without page navigation.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "underline", "pills"],
      description: "Visual style of the tab bar.",
    },
    defaultTab: {
      control: "number",
      description: "Zero-based index of the initially active tab.",
    },
  },
} satisfies Meta<typeof TabsBase>;

export default tabsMeta;
type TabsStory = StoryObj<typeof tabsMeta>;

export const Default: TabsStory = {
  args: {
    variant: "default",
    tabs: createDefaultTabs(),
  },
};

export const Underline: TabsStory = {
  name: "Underline Variant",
  args: {
    variant: "underline",
    tabs: [
      { label: "General", content: createTabContent("General account settings.") },
      { label: "Security", content: createTabContent("Two-factor authentication and sessions.") },
      { label: "Notifications", content: createTabContent("Email and push notification preferences.") },
      { label: "Billing", content: createTabContent("Payment methods and invoices."), disabled: true },
    ],
  },
};

export const Pills: TabsStory = {
  name: "Pills Variant",
  args: {
    variant: "pills",
    tabs: [
      { label: "All", content: createTabContent("All items across every category.") },
      { label: "Active", content: createTabContent("Only active items.") },
      { label: "Archived", content: createTabContent("Previously archived items.") },
    ],
  },
};

// ── Tabs: Overflow ─────────────────────────────────────────────────────────

export const TabsOverflow: TabsStory = {
  name: "Tabs / Overflow",
  args: {
    variant: "default",
    tabs: createManyTabs(12),
  },
};

// ── Accordion ───────────────────────────────────────────────────────────────

export const Accordion: StoryObj<typeof AccordionBase> = {
  render: (args) => <AccordionBase {...args} />,
  args: {
    variant: "default",
    mode: "single",
    items: createAccordionItems(),
  },
};

export const AccordionBordered: StoryObj<typeof AccordionBase> = {
  name: "Accordion / Bordered",
  render: (args) => <AccordionBase {...args} />,
  args: {
    variant: "bordered",
    mode: "multiple",
    defaultOpen: [0],
    items: [
      { title: "Account", content: <p style={{ margin: 0, fontSize: "0.875rem" }}>Manage your account details.</p> },
      { title: "Privacy", content: <p style={{ margin: 0, fontSize: "0.875rem" }}>Control data sharing and visibility.</p> },
      { title: "Integrations", content: <p style={{ margin: 0, fontSize: "0.875rem" }}>Connect third-party services.</p> },
    ],
  },
};

// ── Breadcrumb ──────────────────────────────────────────────────────────────

export const Breadcrumb: StoryObj<typeof BreadcrumbBase> = {
  render: (args) => <BreadcrumbBase {...args} />,
  args: {
    separator: "chevron",
    items: createBreadcrumbItems(),
  },
};

export const BreadcrumbCollapsed: StoryObj<typeof BreadcrumbBase> = {
  name: "Breadcrumb / Collapsed",
  render: (args) => <BreadcrumbBase {...args} />,
  args: {
    separator: "slash",
    maxItems: 3,
    items: createDeepBreadcrumbs(),
  },
};

// ── Stepper ─────────────────────────────────────────────────────────────────

export const Stepper: StoryObj<typeof StepperBase> = {
  render: (args) => <StepperBase {...args} />,
  args: {
    activeStep: 1,
    variant: "default",
    orientation: "horizontal",
    clickable: true,
    steps: createStepperSteps(),
  },
};

export const StepperVertical: StoryObj<typeof StepperBase> = {
  name: "Stepper / Vertical",
  render: (args) => <StepperBase {...args} />,
  args: {
    activeStep: 2,
    variant: "default",
    orientation: "vertical",
    steps: [
      {
        title: "Order placed",
        description: "May 1, 2026 at 2:34 PM",
        icon: 1,
        content: <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>Your order has been confirmed.</p>,
      },
      {
        title: "Processing",
        description: "May 1, 2026 at 3:12 PM",
        icon: 2,
        content: <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>Preparing for shipment.</p>,
      },
      {
        title: "Shipped",
        description: "Estimated May 3",
        icon: 3,
        content: <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>In transit via express delivery.</p>,
      },
      { title: "Delivered", icon: 4 },
    ],
  },
};

// ── Tree View ───────────────────────────────────────────────────────────────

export const TreeView: StoryObj<typeof TreeViewBase> = {
  render: (args) => <TreeViewBase {...args} />,
  args: {
    items: createTreeViewItems(),
  },
};
