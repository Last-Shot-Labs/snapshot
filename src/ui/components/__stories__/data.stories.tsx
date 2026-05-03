import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { AlertBase } from "../data/alert/standalone";
import { BadgeBase } from "../data/badge/standalone";
import { AvatarBase } from "../data/avatar/standalone";
import { AvatarGroupBase } from "../data/avatar-group/standalone";
import { DataTableBase } from "../data/data-table/standalone";
import { StatCardBase } from "../data/stat-card/standalone";
import { ProgressBase } from "../data/progress/standalone";
import { EmptyStateBase } from "../data/empty-state/standalone";
import { TooltipBase } from "../data/tooltip/standalone";
import { SeparatorBase } from "../data/separator/standalone";
import { SkeletonBase } from "../data/skeleton/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createUsers(count: number) {
  const names = [
    "Ada Lovelace", "Grace Hopper", "Katherine Johnson",
    "Margaret Hamilton", "Hedy Lamarr", "Dorothy Vaughan",
    "Mary Jackson", "Annie Easley",
  ];
  const roles = ["Admin", "Editor", "Viewer"];
  const statuses = ["active", "invited"];
  const len = Math.min(count, names.length);
  return Array.from({ length: len }, (_, i) => {
    const name = names[i]!;
    return {
      id: `u${i + 1}`,
      name,
      email: `${name.split(" ")[0]!.toLowerCase()}@snapshot.test`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      progress: Math.round(30 + Math.random() * 70),
      joined: `2026-0${(i % 4) + 1}-${String((i + 1) * 3).padStart(2, "0")}`,
    };
  });
}

function createAvatars(count: number) {
  const names = ["Ada Lovelace", "Grace Hopper", "Katherine Johnson", "Margaret Hamilton", "Hedy Lamarr"];
  const images = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=96&q=80",
  ];
  const len = Math.min(count, names.length);
  return Array.from({ length: len }, (_, i) => {
    const result: { name: string; src?: string } = { name: names[i]! };
    if (i < images.length) result.src = images[i];
    return result;
  });
}

function createTableColumns(): Array<{
  field: string;
  label: string;
  sortable?: boolean;
  format?: "badge" | "progress" | "date";
  badgeColors?: Record<string, string>;
}> {
  return [
    { field: "name", label: "Name", sortable: true },
    { field: "email", label: "Email", sortable: true },
    { field: "role", label: "Role", format: "badge", badgeColors: { Admin: "primary", Editor: "info", Viewer: "secondary" } },
    { field: "status", label: "Status", format: "badge", badgeColors: { active: "success", invited: "warning" } },
    { field: "progress", label: "Progress", format: "progress" },
    { field: "joined", label: "Joined", format: "date", sortable: true },
  ];
}

const BADGE_COLORS = [
  "primary", "secondary", "success", "destructive",
  "warning", "info",
] as const;

const BADGE_VARIANTS = ["solid", "soft", "outline", "dot"] as const;

const GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
};

const STACK_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: 560,
};

const ROW_STYLE: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  alignItems: "center",
};

const LABEL_STYLE: React.CSSProperties = {
  margin: "0 0 0.5rem",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "var(--sn-color-muted-foreground)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.02em",
};

// ── Alert Meta ─────────────────────────────────────────────────────────────

const alertMeta = {
  title: "Components/Data/Alert",
  component: AlertBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Contextual alert component for displaying status messages, warnings, errors, and success confirmations. Supports dismissible behavior and action buttons.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive"],
      description: "Semantic color variant indicating the alert purpose.",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed by the user.",
    },
    title: {
      control: "text",
      description: "Bold heading text for the alert.",
    },
    description: {
      control: "text",
      description: "Supporting description text below the title.",
    },
    actionLabel: {
      control: "text",
      description: "Label for an optional action button.",
    },
    icon: {
      control: "text",
      description: "Lucide icon name to display before the title.",
    },
  },
} satisfies Meta<typeof AlertBase>;

export default alertMeta;
type AlertStory = StoryObj<typeof alertMeta>;

export const Info: AlertStory = {
  args: {
    variant: "info",
    title: "New deployment queued",
    description: "Your changes will go live in approximately 3 minutes.",
  },
};

export const Success: AlertStory = {
  args: {
    variant: "success",
    title: "Payment received",
    description: "Invoice #4821 has been paid successfully.",
  },
};

export const Warning: AlertStory = {
  args: {
    variant: "warning",
    title: "Rate limit approaching",
    description: "You have used 89% of your API quota for this billing period.",
    actionLabel: "View usage",
  },
};

export const Destructive: AlertStory = {
  args: {
    variant: "destructive",
    title: "Build failed",
    description: "TypeScript compilation errors in 3 files. Check the build log for details.",
    dismissible: true,
    actionLabel: "View log",
  },
};

export const AllVariants: AlertStory = {
  name: "All Variants",
  render: () => (
    <div style={STACK_STYLE}>
      <AlertBase variant="info" title="Info" description="Informational alert message." />
      <AlertBase variant="success" title="Success" description="Operation completed." />
      <AlertBase variant="warning" title="Warning" description="Proceed with caution." />
      <AlertBase variant="destructive" title="Error" description="Something went wrong." />
      <AlertBase title="Default" description="A neutral alert with no variant." />
    </div>
  ),
};

// ── Alert: Dismissing ──────────────────────────────────────────────────────

export const AlertDismissing: AlertStory = {
  name: "Alert / Dismissible",
  render: () => (
    <div style={STACK_STYLE}>
      <AlertBase
        variant="info"
        title="Update available"
        description="A new version is ready to install."
        dismissible
      />
      <AlertBase
        variant="success"
        title="Changes saved"
        description="Your settings have been updated."
        dismissible
      />
      <AlertBase
        variant="warning"
        title="Storage almost full"
        description="You are using 92% of available storage."
        dismissible
        actionLabel="Manage storage"
      />
    </div>
  ),
};

// ── Badge: All Colors Grid ─────────────────────────────────────────────────

export const Badge: StoryObj<typeof BadgeBase> = {
  render: () => (
    <div style={ROW_STYLE}>
      <BadgeBase text="Active" color="success" variant="solid" />
      <BadgeBase text="Pending" color="warning" variant="soft" />
      <BadgeBase text="Declined" color="destructive" variant="outline" />
      <BadgeBase text="Draft" color="secondary" variant="soft" />
      <BadgeBase text="New" color="primary" variant="solid" size="sm" />
      <BadgeBase text="Beta" color="info" variant="dot" />
    </div>
  ),
};

export const BadgeAllColors: StoryObj<typeof BadgeBase> = {
  name: "Badge / All Colors",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {BADGE_VARIANTS.map((variant) => (
        <div key={variant}>
          <p style={LABEL_STYLE}>{variant}</p>
          <div style={ROW_STYLE}>
            {BADGE_COLORS.map((color) => (
              <BadgeBase
                key={`${variant}-${color}`}
                text={color}
                color={color}
                variant={variant}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const BadgeSizes: StoryObj<typeof BadgeBase> = {
  name: "Badge / Sizes",
  render: () => (
    <div style={ROW_STYLE}>
      <BadgeBase text="Extra small" size="xs" color="primary" variant="soft" />
      <BadgeBase text="Small" size="sm" color="primary" variant="soft" />
      <BadgeBase text="Medium" size="md" color="primary" variant="soft" />
      <BadgeBase text="Large" size="lg" color="primary" variant="soft" />
    </div>
  ),
};

// ── Avatar ──────────────────────────────────────────────────────────────────

export const Avatar: StoryObj<typeof AvatarBase> = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <AvatarBase
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80"
        name="Ada Lovelace"
        size="lg"
        status="online"
      />
      <AvatarBase name="Grace Hopper" size="lg" status="busy" />
      <AvatarBase name="Katherine Johnson" size="lg" color="primary" />
      <AvatarBase icon="user" size="lg" />
    </div>
  ),
};

export const AvatarSizes: StoryObj<typeof AvatarBase> = {
  name: "Avatar / Sizes",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <AvatarBase name="AL" size="xs" />
      <AvatarBase name="AL" size="sm" />
      <AvatarBase name="AL" size="md" />
      <AvatarBase name="AL" size="lg" />
      <AvatarBase name="AL" size="xl" />
    </div>
  ),
};

export const AvatarGroup: StoryObj<typeof AvatarGroupBase> = {
  render: (args) => <AvatarGroupBase {...args} />,
  args: {
    avatars: createAvatars(5),
    max: 4,
    size: "md",
  },
};

// ── Stat Card ───────────────────────────────────────────────────────────────

export const StatCard: StoryObj<typeof StatCardBase> = {
  render: () => (
    <div style={GRID_STYLE}>
      <StatCardBase
        label="Monthly Revenue"
        value="$128,400"
        icon="dollar-sign"
        trend={{ direction: "up", value: "+18.4%", percentage: 18.4, sentiment: "positive" }}
      />
      <StatCardBase
        label="Active Users"
        value="3,842"
        icon="users"
        trend={{ direction: "up", value: "+12%", percentage: 12, sentiment: "positive" }}
      />
      <StatCardBase
        label="Error Rate"
        value="0.24%"
        icon="alert-triangle"
        trend={{ direction: "down", value: "-8%", percentage: -8, sentiment: "positive" }}
      />
      <StatCardBase
        label="Avg Response"
        value="142ms"
        icon="clock"
        trend={{ direction: "flat", value: "0%", percentage: 0, sentiment: "neutral" }}
      />
    </div>
  ),
};

export const StatCardLoading: StoryObj<typeof StatCardBase> = {
  name: "Stat Card / Loading",
  render: (args) => <StatCardBase {...args} />,
  args: { label: "Revenue", value: null, isLoading: true, icon: "dollar-sign" },
};

// ── Progress ────────────────────────────────────────────────────────────────

export const Progress: StoryObj<typeof ProgressBase> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 400 }}>
      <ProgressBase value={72} label="Upload progress" showValue size="md" color="primary" />
      <ProgressBase value={45} label="Storage used" showValue size="sm" color="warning" />
      <ProgressBase value={100} label="Complete" showValue size="md" color="success" />
      <ProgressBase label="Processing..." size="sm" />
    </div>
  ),
};

export const ProgressCircular: StoryObj<typeof ProgressBase> = {
  name: "Progress / Circular",
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <ProgressBase value={72} variant="circular" showValue size="sm" color="primary" />
      <ProgressBase value={45} variant="circular" showValue size="md" color="warning" />
      <ProgressBase value={100} variant="circular" showValue size="lg" color="success" />
    </div>
  ),
};

// ── Data Table ──────────────────────────────────────────────────────────────

export const DataTable: StoryObj<typeof DataTableBase> = {
  render: (args) => <DataTableBase {...args} />,
  args: {
    columns: createTableColumns(),
    rows: createUsers(5),
    searchable: true,
    searchPlaceholder: "Search users...",
    hoverable: true,
    striped: true,
    rowActions: [
      { label: "Edit", icon: "pencil", onAction: (row: Record<string, unknown>) => console.log("Edit:", row) },
      { label: "Delete", icon: "trash-2", variant: "destructive", onAction: (row: Record<string, unknown>) => console.log("Delete:", row) },
    ],
  },
};

// ── Data Table: Loading ────────────────────────────────────────────────────

export const DataTableLoading: StoryObj<typeof DataTableBase> = {
  name: "Data Table / Loading",
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <DataTableBase
        columns={[
          { field: "name", label: "Name" },
          { field: "email", label: "Email" },
          { field: "role", label: "Role" },
          { field: "status", label: "Status" },
        ]}
        rows={[]}
        isLoading
      />
    </div>
  ),
};

// ── Data Table: Empty ──────────────────────────────────────────────────────

export const DataTableEmpty: StoryObj<typeof DataTableBase> = {
  name: "Data Table / Empty State",
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <DataTableBase
        columns={createTableColumns()}
        rows={[]}
        searchable
        searchPlaceholder="Search users..."
        emptyMessage="No users found. Try adjusting your search or invite a new team member."
      />
    </div>
  ),
};

// ── Empty State ─────────────────────────────────────────────────────────────

export const EmptyState: StoryObj<typeof EmptyStateBase> = {
  render: (args) => <EmptyStateBase {...args} />,
  args: {
    icon: "inbox",
    title: "No messages yet",
    description: "When you receive messages, they'll appear here.",
    actionLabel: "Send your first message",
  },
};

// ── Tooltip ─────────────────────────────────────────────────────────────────

export const Tooltip: StoryObj<typeof TooltipBase> = {
  render: (args) => <TooltipBase {...args} />,
  args: {
    text: "This action cannot be undone",
    children: <button style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Hover me</button>,
  },
};

// ── Separator ───────────────────────────────────────────────────────────────

export const Separator: StoryObj<typeof SeparatorBase> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Section one content</p>
      <SeparatorBase />
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Section two content</p>
      <SeparatorBase label="or" />
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Section three content</p>
    </div>
  ),
};

// ── Skeleton ────────────────────────────────────────────────────────────────

export const Skeleton: StoryObj<typeof SkeletonBase> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 320 }}>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <SkeletonBase variant="circular" width={48} height={48} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <SkeletonBase variant="text" width="70%" />
          <SkeletonBase variant="text" width="45%" />
        </div>
      </div>
      <SkeletonBase variant="rectangular" height={120} />
      <SkeletonBase variant="text" />
      <SkeletonBase variant="text" width="80%" />
    </div>
  ),
};

// ── Skeleton: All Variants ─────────────────────────────────────────────────

export const SkeletonVariants: StoryObj<typeof SkeletonBase> = {
  name: "Skeleton / All Variants",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
      <div>
        <p style={LABEL_STYLE}>Text</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <SkeletonBase variant="text" width="100%" />
          <SkeletonBase variant="text" width="85%" />
          <SkeletonBase variant="text" width="70%" />
          <SkeletonBase variant="text" width="55%" />
        </div>
      </div>
      <div>
        <p style={LABEL_STYLE}>Circular</p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <SkeletonBase variant="circular" width={32} height={32} />
          <SkeletonBase variant="circular" width={48} height={48} />
          <SkeletonBase variant="circular" width={64} height={64} />
        </div>
      </div>
      <div>
        <p style={LABEL_STYLE}>Rectangular</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <SkeletonBase variant="rectangular" height={40} />
          <SkeletonBase variant="rectangular" height={80} />
          <SkeletonBase variant="rectangular" height={120} />
        </div>
      </div>
      <div>
        <p style={LABEL_STYLE}>Card Pattern</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1rem", border: "1px solid var(--sn-color-border, #e5e7eb)", borderRadius: "var(--sn-radius-md, 0.5rem)" }}>
          <SkeletonBase variant="rectangular" height={140} />
          <SkeletonBase variant="text" width="60%" />
          <SkeletonBase variant="text" width="90%" />
          <SkeletonBase variant="text" width="40%" />
        </div>
      </div>
    </div>
  ),
};
