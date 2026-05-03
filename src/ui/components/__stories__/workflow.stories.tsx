import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { KanbanBase } from "../workflow/kanban/standalone";
import { CalendarBase } from "../workflow/calendar/standalone";
import { AuditLogBase } from "../workflow/audit-log/standalone";
import { NotificationFeedBase } from "../workflow/notification-feed/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createKanbanColumns() {
  return [
    { key: "backlog", title: "Backlog", color: "secondary" },
    { key: "progress", title: "In Progress", color: "primary" },
    { key: "review", title: "Review", color: "warning" },
    { key: "done", title: "Done", color: "success" },
  ];
}

function createKanbanItems() {
  return [
    { id: "t1", title: "Design system audit", description: "Review token consistency", status: "backlog", priority: "high" },
    { id: "t2", title: "Accessibility pass", description: "WCAG 2.1 AA compliance", status: "backlog", priority: "medium" },
    { id: "t3", title: "Storybook overhaul", description: "Standalone-first stories", status: "progress", priority: "high" },
    { id: "t4", title: "Nav component polish", description: "Collapse animation + depth nesting", status: "progress", priority: "medium" },
    { id: "t5", title: "Button gradient styling", description: "OKLCH gradient variants", status: "review", priority: "low" },
    { id: "t6", title: "Framework CSS generator", description: "resolveFrameworkStyles()", status: "done", priority: "medium" },
    { id: "t7", title: "Token resolution", description: "8 built-in OKLCH flavors", status: "done", priority: "low" },
  ];
}

function createDragDropKanbanItems() {
  return [
    { id: "d1", title: "Migrate auth flow", description: "Move from session to JWT-based auth", status: "backlog", priority: "high", assignee: "Ada" },
    { id: "d2", title: "Add dark mode tokens", description: "OKLCH-based dark palette generation", status: "backlog", priority: "medium", assignee: "Grace" },
    { id: "d3", title: "Refactor data table", description: "Virtual scrolling for 10k+ rows", status: "progress", priority: "high", assignee: "Katherine" },
    { id: "d4", title: "Write E2E tests", description: "Playwright tests for core flows", status: "progress", priority: "medium", assignee: "Margaret" },
    { id: "d5", title: "Deploy staging build", description: "CI/CD pipeline validation", status: "review", priority: "low", assignee: "Ada" },
    { id: "d6", title: "Update API docs", description: "Swagger spec + generated types", status: "done", priority: "medium", assignee: "Grace" },
  ];
}

function createAuditLogItems() {
  return [
    { id: "a1", action: "user.login", actor: "Ada Lovelace", timestamp: "2026-05-01T14:30:00Z", details: { ip: "192.168.1.42" } },
    { id: "a2", action: "project.create", actor: "Grace Hopper", timestamp: "2026-05-01T13:15:00Z", details: { project: "Northstar" } },
    { id: "a3", action: "deploy.production", actor: "Katherine Johnson", timestamp: "2026-05-01T12:00:00Z", details: { build: "#847", version: "v2.4.1" } },
    { id: "a4", action: "member.invite", actor: "Ada Lovelace", timestamp: "2026-05-01T10:45:00Z", details: { invited: "margaret@example.com" } },
    { id: "a5", action: "api_key.rotate", actor: "Grace Hopper", timestamp: "2026-04-30T16:30:00Z", details: { key: "sk_live_***4f2e" } },
  ];
}

function createNotifications() {
  return [
    { id: "n1", title: "Deployment succeeded", message: "Production build #847 is live.", timestamp: "2026-05-01T14:55:00Z", read: false, type: "success" },
    { id: "n2", title: "New team member", message: "Margaret Hamilton joined the workspace.", timestamp: "2026-05-01T14:00:00Z", read: false, type: "info" },
    { id: "n3", title: "Invoice paid", message: "Invoice #4821 -- $2,400.00", timestamp: "2026-05-01T12:00:00Z", read: true, type: "info" },
    { id: "n4", title: "PR merged", message: "#142: Storybook standalone stories", timestamp: "2026-04-30T16:00:00Z", read: true, type: "info" },
  ];
}

// ── Meta ───────────────────────────────────────────────────────────────────

const kanbanMeta = {
  title: "Components/Workflow/Kanban",
  component: KanbanBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Workflow management components including Kanban boards, calendars, audit logs, and notification feeds. Use for project management, activity tracking, and user notifications.",
      },
    },
  },
  argTypes: {
    columnField: {
      control: "text",
      description: "Field name in items that maps to column keys.",
    },
    titleField: {
      control: "text",
      description: "Field name for the card title.",
    },
    descriptionField: {
      control: "text",
      description: "Field name for the card description.",
    },
  },
} satisfies Meta<typeof KanbanBase>;

export default kanbanMeta;

// ── Kanban: Default ────────────────────────────────────────────────────────

export const Default: StoryObj<typeof KanbanBase> = {
  render: (args) => <KanbanBase {...args} />,
  args: {
    columns: createKanbanColumns(),
    columnField: "status",
    titleField: "title",
    descriptionField: "description",
    items: createKanbanItems(),
  },
};

// ── Kanban: Drag Drop ──────────────────────────────────────────────────────

export const KanbanDragDrop: StoryObj<typeof KanbanBase> = {
  name: "Kanban / Drag & Drop",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
        Drag cards between columns to update their status. Cards show assignee and priority indicators.
      </p>
      <KanbanBase
        columns={createKanbanColumns()}
        columnField="status"
        titleField="title"
        descriptionField="description"
        items={createDragDropKanbanItems()}
      />
    </div>
  ),
};

// ── Calendar ────────────────────────────────────────────────────────────────

export const Calendar: StoryObj<typeof CalendarBase> = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <CalendarBase
        onDateClick={(date: Date) => console.log("Selected:", date)}
      />
    </div>
  ),
};

// ── Audit Log ──────────────────────────────────────────────────────────────

export const AuditLog: StoryObj<typeof AuditLogBase> = {
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <AuditLogBase {...args} />
    </div>
  ),
  args: {
    userField: "actor",
    actionField: "action",
    timestampField: "timestamp",
    detailsField: "details",
    items: createAuditLogItems(),
  },
};

// ── Notification Feed ──────────────────────────────────────────────────────

export const NotificationFeed: StoryObj<typeof NotificationFeedBase> = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <NotificationFeedBase {...args} />
    </div>
  ),
  args: {
    items: createNotifications(),
  },
};
