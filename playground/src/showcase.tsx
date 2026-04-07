import React, { useState } from "react";
import {
  ComponentRenderer,
  PageContextProvider,
} from "@lastshotlabs/snapshot/ui";

type Page = "dashboard" | "data" | "forms" | "overlay" | "structural" | "primitives" | "navigation" | "content" | "workflow";

const PAGES: { key: Page; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "data", label: "Data Display" },
  { key: "primitives", label: "Primitives" },
  { key: "forms", label: "Forms" },
  { key: "overlay", label: "Overlay" },
  { key: "navigation", label: "Navigation" },
  { key: "content", label: "Content" },
  { key: "workflow", label: "Workflow" },
  { key: "structural", label: "Structural" },
];

// ── Dashboard page configs ──────────────────────────────────────────────

const statCards = {
  type: "row",
  gap: "md",
  children: [
    {
      type: "stat-card",
      id: "revenue",
      data: "GET /api/stats/revenue",
      field: "value",
      label: "Total Revenue",
      format: "currency",
      currency: "USD",
      icon: "dollar-sign",
      trend: { field: "change", sentiment: "up-is-good", format: "percent" },
      span: 3,
    },
    {
      type: "stat-card",
      id: "users-count",
      data: "GET /api/stats/users",
      field: "value",
      label: "Total Users",
      format: "compact",
      icon: "users",
      trend: { field: "change", sentiment: "up-is-good", format: "percent" },
      span: 3,
    },
    {
      type: "stat-card",
      id: "orders",
      data: "GET /api/stats/orders",
      field: "value",
      label: "Orders",
      format: "number",
      icon: "shopping-cart",
      trend: { field: "change", sentiment: "up-is-good", format: "percent" },
      span: 3,
    },
    {
      type: "stat-card",
      id: "conversion",
      data: "GET /api/stats/conversion",
      field: "value",
      label: "Conversion Rate",
      format: "percent",
      icon: "trending-up",
      trend: { field: "change", sentiment: "up-is-good", format: "percent" },
      span: 3,
    },
  ],
};

// ── Data page configs ───────────────────────────────────────────────────

// DataTable uses useComponentData for data fetching
const dataTable = {
  type: "data-table",
  id: "users-table",
  data: "GET /api/users",
  columns: [
    { field: "name", label: "Name", sortable: true },
    { field: "email", label: "Email", sortable: true },
    {
      field: "role",
      label: "Role",
      format: "badge",
      badgeColors: { Admin: "blue", Editor: "green", Viewer: "gray" },
    },
    {
      field: "status",
      label: "Status",
      format: "badge",
      badgeColors: { active: "green", inactive: "red" },
    },
    { field: "joined", label: "Joined", format: "date", sortable: true },
  ],
  searchable: { placeholder: "Search users...", fields: ["name", "email"] },
  selectable: true,
  pagination: { type: "offset", pageSize: 10 },
  density: "default",
  actions: [
    {
      label: "Edit",
      icon: "pencil",
      action: { type: "toast", message: "Edit clicked for {name}" },
    },
    {
      label: "Delete",
      icon: "trash",
      action: {
        type: "confirm",
        title: "Delete user?",
        message: "Are you sure you want to delete {name}?",
        onConfirm: { type: "toast", message: "Deleted {name}" },
      },
    },
  ],
  bulkActions: [
    {
      label: "Delete {count} users",
      icon: "trash",
      action: { type: "toast", message: "Bulk delete triggered" },
    },
  ],
};

const detailCard = {
  type: "detail-card",
  data: "GET /api/user/1",
  title: "User Profile",
  fields: [
    { field: "name", label: "Full Name" },
    { field: "email", label: "Email", format: "email" },
    { field: "role", label: "Role", format: "badge" },
    { field: "department", label: "Department" },
    { field: "location", label: "Location" },
    { field: "phone", label: "Phone" },
    { field: "verified", label: "Verified", format: "boolean" },
    { field: "joined", label: "Member Since", format: "date" },
  ],
  actions: [
    {
      label: "Edit Profile",
      icon: "pencil",
      action: { type: "toast", message: "Edit profile clicked" },
    },
  ],
};

// ── Forms page configs ──────────────────────────────────────────────────

const autoForm = {
  type: "form",
  id: "user-form",
  submit: "/api/users",
  method: "POST",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter full name",
      validation: { minLength: 2 },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "user@example.com",
    },
    {
      name: "role",
      type: "select",
      label: "Role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
    {
      name: "department",
      type: "text",
      label: "Department",
      placeholder: "Engineering",
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      placeholder: "Tell us about yourself...",
    },
    {
      name: "notifications",
      type: "checkbox",
      label: "Enable email notifications",
    },
  ],
  submitLabel: "Create User",
  onSuccess: {
    type: "toast",
    message: "User created successfully!",
    variant: "success",
  },
  onError: {
    type: "toast",
    message: "Failed to create user",
    variant: "error",
  },
};

// ── Overlay page configs ────────────────────────────────────────────────

const modalTrigger = {
  type: "button",
  label: "Open Modal",
  action: { type: "open-modal", modal: "demo-modal" },
  variant: "default",
};

const modal = {
  type: "modal",
  id: "demo-modal",
  title: "Example Modal",
  size: "md",
  content: [
    { type: "heading", text: "Send Feedback", level: 3 },
    {
      type: "form",
      submit: "/api/feedback",
      fields: [
        {
          name: "feedback",
          type: "textarea",
          label: "Your Feedback",
          required: true,
        },
        {
          name: "rating",
          type: "select",
          label: "Rating",
          options: [
            { label: "Great", value: "5" },
            { label: "Good", value: "4" },
            { label: "OK", value: "3" },
          ],
        },
      ],
      submitLabel: "Submit Feedback",
      onSuccess: { type: "close-modal", modal: "demo-modal" },
    },
  ],
};

const drawerTrigger = {
  type: "button",
  label: "Open Drawer",
  action: { type: "open-modal", modal: "demo-drawer" },
  variant: "outline",
};

const drawer = {
  type: "drawer",
  id: "demo-drawer",
  title: "Settings Drawer",
  side: "right",
  size: "md",
  content: [
    { type: "heading", text: "Preferences", level: 3 },
    {
      type: "form",
      submit: "/api/settings",
      fields: [
        {
          name: "theme",
          type: "select",
          label: "Theme",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ],
        },
        {
          name: "language",
          type: "select",
          label: "Language",
          options: [
            { label: "English", value: "en" },
            { label: "Spanish", value: "es" },
          ],
        },
        { name: "compact", type: "checkbox", label: "Compact mode" },
      ],
      submitLabel: "Save Settings",
    },
  ],
};

// ── Tabs config ─────────────────────────────────────────────────────────

const tabs = {
  type: "tabs",
  id: "demo-tabs",
  variant: "underline",
  children: [
    {
      label: "Overview",
      content: [
        { type: "heading", text: "Overview Tab", level: 3 },
        {
          type: "stat-card",
          data: "GET /api/stats/revenue",
          field: "value",
          label: "Revenue",
          format: "currency",
        },
      ],
    },
    {
      label: "Details",
      content: [
        { type: "heading", text: "Details Tab", level: 3 },
        {
          type: "detail-card",
          data: "GET /api/user/1",
          title: "User Info",
          fields: "auto",
        },
      ],
    },
    {
      label: "Settings",
      disabled: true,
      content: [{ type: "heading", text: "Disabled tab" }],
    },
  ],
};

// ── Structural configs ──────────────────────────────────────────────────

const structuralRow = {
  type: "row",
  gap: "md",
  justify: "between",
  align: "center",
  children: [
    { type: "heading", text: "Left Side", level: 4 },
    {
      type: "row",
      gap: "sm",
      children: [
        {
          type: "button",
          label: "Cancel",
          action: { type: "toast", message: "Cancelled" },
          variant: "outline",
          size: "sm",
        },
        {
          type: "button",
          label: "Save",
          action: {
            type: "toast",
            message: "Saved!",
            variant: "success",
          },
          variant: "default",
          size: "sm",
        },
        {
          type: "button",
          label: "Delete",
          action: {
            type: "confirm",
            title: "Delete?",
            message: "This cannot be undone.",
            onConfirm: { type: "toast", message: "Deleted" },
          },
          variant: "destructive",
          size: "sm",
        },
      ],
    },
  ],
};

const headings = {
  type: "row",
  gap: "sm",
  children: [
    { type: "heading", text: "Heading 1", level: 1 },
    { type: "heading", text: "Heading 2", level: 2 },
    { type: "heading", text: "Heading 3", level: 3 },
    { type: "heading", text: "Heading 4", level: 4 },
    { type: "heading", text: "Heading 5", level: 5 },
    { type: "heading", text: "Heading 6", level: 6 },
  ],
};

const selectDemo = {
  type: "select",
  id: "color-picker",
  options: [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Purple", value: "purple" },
  ],
  placeholder: "Pick a color...",
};

// ── Primitives page configs ────────────────────────────────────────────

const badgeRow = {
  type: "row",
  gap: "sm",
  wrap: true,
  children: [
    { type: "badge", text: "Default", color: "secondary", variant: "soft" },
    { type: "badge", text: "Primary", color: "primary", variant: "solid" },
    { type: "badge", text: "Success", color: "success", variant: "soft" },
    { type: "badge", text: "Warning", color: "warning", variant: "outline" },
    { type: "badge", text: "Destructive", color: "destructive", variant: "solid" },
    { type: "badge", text: "Info", color: "info", variant: "soft" },
    { type: "badge", text: "Dot Variant", color: "primary", variant: "dot" },
    { type: "badge", text: "Large", color: "accent", variant: "solid", size: "lg" },
    { type: "badge", text: "Small", color: "muted", variant: "outline", size: "sm" },
  ],
};

const avatarRow = {
  type: "row",
  gap: "md",
  align: "center",
  children: [
    { type: "avatar", name: "Alice Johnson", size: "xs" },
    { type: "avatar", name: "Bob Smith", size: "sm", color: "accent" },
    { type: "avatar", name: "Carol Davis", size: "md", status: "online" },
    { type: "avatar", name: "Dave Wilson", size: "lg", status: "busy", color: "secondary" },
    { type: "avatar", name: "Eve", size: "xl", status: "away" },
    { type: "avatar", shape: "square", name: "SQ", size: "lg" },
  ],
};

const alerts = {
  type: "row",
  gap: "md",
  children: [
    { type: "alert", variant: "info", title: "Information", description: "This is an informational message about the system.", span: 12 },
    { type: "alert", variant: "success", title: "Success!", description: "Your changes have been saved successfully.", dismissible: true, span: 12 },
    { type: "alert", variant: "warning", description: "Your trial expires in 3 days. Upgrade now.", actionLabel: "Upgrade", action: { type: "toast", message: "Upgrade clicked" }, span: 12 },
    { type: "alert", variant: "destructive", title: "Error", description: "Failed to connect to the database. Please check your configuration.", dismissible: true, span: 12 },
  ],
};

const progressBars = {
  type: "row",
  gap: "md",
  children: [
    { type: "progress", value: 75, label: "Upload Progress", showValue: true, color: "primary", span: 6 },
    { type: "progress", value: 45, label: "Storage Used", showValue: true, color: "warning", size: "lg", span: 6 },
    { type: "progress", value: 100, label: "Complete", showValue: true, color: "success", size: "sm", span: 6 },
    { type: "progress", label: "Loading...", color: "info", span: 6 },
  ],
};

const skeletonDemo = {
  type: "row",
  gap: "md",
  children: [
    { type: "skeleton", variant: "text", lines: 3, span: 4 },
    { type: "skeleton", variant: "circular", width: 64, height: 64, span: 2 },
    { type: "skeleton", variant: "card", span: 6 },
  ],
};

const emptyStateDemo = {
  type: "empty-state",
  title: "No results found",
  description: "Try adjusting your search or filter to find what you're looking for.",
  icon: "search",
  actionLabel: "Clear Filters",
  action: { type: "toast", message: "Filters cleared" },
};

const switchDemo = {
  type: "row",
  gap: "lg",
  children: [
    { type: "switch", label: "Email notifications", description: "Receive email updates about activity", defaultChecked: true, color: "primary", span: 4 },
    { type: "switch", label: "Dark mode", color: "secondary", span: 4 },
    { type: "switch", label: "Auto-save", description: "Automatically save changes", defaultChecked: true, color: "success", size: "sm", span: 4 },
  ],
};

const tooltipDemo = {
  type: "row",
  gap: "md",
  children: [
    { type: "tooltip", text: "This is a tooltip on top", placement: "top", content: [{ type: "button", label: "Hover Me (Top)", variant: "outline", size: "sm" }] },
    { type: "tooltip", text: "Tooltip on the right side", placement: "right", content: [{ type: "button", label: "Hover Me (Right)", variant: "outline", size: "sm" }] },
    { type: "tooltip", text: "Bottom tooltip here", placement: "bottom", content: [{ type: "button", label: "Hover Me (Bottom)", variant: "outline", size: "sm" }] },
  ],
};

const listDemo = {
  type: "list",
  variant: "bordered",
  divider: true,
  items: [
    { title: "Alice Johnson", description: "Senior Engineer · Engineering", icon: "user", badge: "Admin", badgeColor: "primary" },
    { title: "Bob Smith", description: "Product Manager · Product", icon: "user", badge: "Editor", badgeColor: "success" },
    { title: "Carol Davis", description: "Designer · Design", icon: "user", badge: "Viewer", badgeColor: "secondary" },
    { title: "Dave Wilson", description: "DevOps · Infrastructure", icon: "user" },
  ],
};

// ── Navigation page configs ───────────────────────────────────────────

const accordionDemo = {
  type: "accordion",
  variant: "bordered",
  mode: "single",
  items: [
    { title: "What is Snapshot?", content: [{ type: "heading", text: "Snapshot is a config-driven UI framework that lets you build enterprise applications from JSON manifests.", level: 5 }] },
    { title: "How does theming work?", content: [{ type: "heading", text: "Snapshot uses a design token system with flavors, semantic colors, and component-level overrides — all customizable at runtime.", level: 5 }] },
    { title: "Can I use custom components?", content: [{ type: "heading", text: "Yes! Register custom components via the component registry and reference them as { type: 'custom', component: 'MyComponent' }.", level: 5 }] },
    { title: "Disabled Section", disabled: true, content: [{ type: "heading", text: "This is disabled" }] },
  ],
};

const breadcrumbDemo = {
  type: "breadcrumb",
  separator: "chevron",
  items: [
    { label: "Home", path: "/", icon: "home" },
    { label: "Settings", path: "/settings" },
    { label: "Profile", path: "/settings/profile" },
    { label: "Notifications" },
  ],
};

const stepperDemo = {
  type: "stepper",
  activeStep: 1,
  orientation: "horizontal",
  steps: [
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Fill in your details" },
    { title: "Preferences", description: "Set your preferences" },
    { title: "Complete", description: "All done!" },
  ],
};

const treeViewDemo = {
  type: "tree-view",
  selectable: true,
  showConnectors: true,
  items: [
    {
      label: "Documents", icon: "folder", value: "docs", expanded: true,
      children: [
        { label: "report.pdf", icon: "file", value: "report" },
        { label: "invoice.xlsx", icon: "file", value: "invoice" },
        {
          label: "Images", icon: "folder", value: "images",
          children: [
            { label: "logo.png", icon: "image", value: "logo" },
            { label: "banner.jpg", icon: "image", value: "banner" },
          ],
        },
      ],
    },
    {
      label: "Source Code", icon: "folder", value: "src",
      children: [
        { label: "index.ts", icon: "code", value: "index" },
        { label: "app.tsx", icon: "code", value: "app" },
      ],
    },
    { label: "README.md", icon: "file-text", value: "readme" },
  ],
};

const dropdownDemo = {
  type: "dropdown-menu",
  trigger: { label: "Actions", variant: "outline" },
  items: [
    { type: "label", text: "User Actions" },
    { type: "item", label: "Edit Profile", icon: "edit", action: { type: "toast", message: "Edit profile" } },
    { type: "item", label: "Settings", icon: "settings", action: { type: "toast", message: "Settings" } },
    { type: "separator" },
    { type: "item", label: "Delete Account", icon: "trash-2", action: { type: "toast", message: "Delete clicked" }, destructive: true },
  ],
};

// ── Content page configs ──────────────────────────────────────────────

const timelineDemo = {
  type: "timeline",
  variant: "default",
  items: [
    { title: "Project Created", description: "Initial repository setup and scaffolding", date: "2025-01-15", color: "primary" },
    { title: "First Release", description: "v1.0.0 shipped to production", date: "2025-02-20", color: "success" },
    { title: "Security Patch", description: "Critical vulnerability fixed in auth module", date: "2025-03-10", color: "destructive" },
    { title: "Major Update", description: "v2.0 with new component library and token system", date: "2025-04-01", color: "info" },
  ],
};

const codeBlockDemo = {
  type: "code-block",
  title: "example.ts",
  language: "TypeScript",
  showLineNumbers: true,
  showCopy: true,
  code: `import { createSnapshot } from "@lastshotlabs/snapshot";

const app = createSnapshot({
  apiUrl: "https://api.example.com",
  auth: { strategy: "jwt" },
});

export const { useLogin, useLogout, useUser } = app;`,
};

const fileUploaderDemo = {
  type: "file-uploader",
  accept: "image/*,.pdf",
  maxSize: 5242880,
  maxFiles: 3,
  label: "Upload Documents",
  description: "PDF or images up to 5MB each. Maximum 3 files.",
  variant: "dropzone",
};

// ── Workflow page configs ─────────────────────────────────────────────

const kanbanDemo = {
  type: "kanban",
  data: "GET /api/tasks",
  columns: [
    { key: "todo", title: "To Do", color: "secondary" },
    { key: "in-progress", title: "In Progress", color: "info", limit: 3 },
    { key: "review", title: "Review", color: "warning" },
    { key: "done", title: "Done", color: "success" },
  ],
  columnField: "status",
  titleField: "title",
  descriptionField: "description",
};

const calendarDemo = {
  type: "calendar",
  view: "month",
  events: [
    { title: "Sprint Planning", date: "2025-04-07", color: "primary" },
    { title: "Design Review", date: "2025-04-09", color: "info" },
    { title: "Release v2.1", date: "2025-04-15", color: "success" },
    { title: "Team Retro", date: "2025-04-18", color: "warning" },
    { title: "Deadline", date: "2025-04-25", color: "destructive" },
  ],
};

const pricingDemo = {
  type: "pricing-table",
  currency: "$",
  variant: "cards",
  tiers: [
    {
      name: "Starter",
      price: 0,
      period: "/month",
      description: "For individuals getting started",
      features: [
        { text: "Up to 3 projects", included: true },
        { text: "Basic analytics", included: true },
        { text: "Email support", included: true },
        { text: "Custom domains", included: false },
        { text: "API access", included: false },
      ],
      actionLabel: "Get Started",
      action: { type: "toast", message: "Starter selected" },
    },
    {
      name: "Pro",
      price: 29,
      period: "/month",
      description: "For teams and professionals",
      highlighted: true,
      badge: "Most Popular",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Priority support", included: true },
        { text: "Custom domains", included: true },
        { text: "API access", included: false },
      ],
      actionLabel: "Upgrade to Pro",
      action: { type: "toast", message: "Pro selected" },
    },
    {
      name: "Enterprise",
      price: 99,
      period: "/month",
      description: "For large organizations",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced analytics", included: true },
        { text: "24/7 support", included: true },
        { text: "Custom domains", included: true },
        { text: "Full API access", included: true },
      ],
      actionLabel: "Contact Sales",
      action: { type: "toast", message: "Enterprise selected" },
    },
  ],
};

// ── UI helpers ──────────────────────────────────────────────────────────

function ShowcaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="showcase__section">
      <div className="showcase__section-header">{title}</div>
      <div className="showcase__section-body">{children}</div>
    </div>
  );
}

function RenderConfig({ config }: { config: any }) {
  return <ComponentRenderer config={config} />;
}

/** Each page gets its own PageContextProvider for clean state isolation */
function PageWrapper({ children }: { children: React.ReactNode }) {
  return <PageContextProvider>{children}</PageContextProvider>;
}

function DashboardPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Stat Cards">
          <RenderConfig config={statCards} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function DataPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Data Table">
          <p style={{ fontSize: "0.8125rem", color: "var(--sn-color-muted-foreground, #6b7280)", marginBottom: "1rem" }}>
            Note: DataTable currently expects data via FromRef. The table below shows the empty state.
            StatCard and DetailCard fetch data directly from the mock API.
          </p>
          <RenderConfig config={dataTable} />
        </ShowcaseSection>
        <ShowcaseSection title="Detail Card">
          <RenderConfig config={detailCard} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function FormsPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Auto Form">
          <RenderConfig config={autoForm} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function OverlayPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Modal">
          <div className="showcase__row">
            <RenderConfig config={modalTrigger} />
          </div>
          <RenderConfig config={modal} />
        </ShowcaseSection>
        <ShowcaseSection title="Drawer">
          <div className="showcase__row">
            <RenderConfig config={drawerTrigger} />
          </div>
          <RenderConfig config={drawer} />
        </ShowcaseSection>
        <ShowcaseSection title="Tabs">
          <RenderConfig config={tabs} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function PrimitivesPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Badges">
          <RenderConfig config={badgeRow} />
        </ShowcaseSection>
        <ShowcaseSection title="Avatars">
          <RenderConfig config={avatarRow} />
        </ShowcaseSection>
        <ShowcaseSection title="Alerts">
          <RenderConfig config={alerts} />
        </ShowcaseSection>
        <ShowcaseSection title="Progress Bars">
          <RenderConfig config={progressBars} />
        </ShowcaseSection>
        <ShowcaseSection title="Loading Skeletons">
          <RenderConfig config={skeletonDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Switches">
          <RenderConfig config={switchDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Tooltips">
          <RenderConfig config={tooltipDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="List">
          <RenderConfig config={listDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Empty State">
          <RenderConfig config={emptyStateDemo} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function NavigationPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Breadcrumb">
          <RenderConfig config={breadcrumbDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Accordion">
          <RenderConfig config={accordionDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Stepper">
          <RenderConfig config={stepperDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Tabs">
          <RenderConfig config={tabs} />
        </ShowcaseSection>
        <ShowcaseSection title="Tree View">
          <RenderConfig config={treeViewDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Dropdown Menu">
          <RenderConfig config={dropdownDemo} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function ContentPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Timeline">
          <RenderConfig config={timelineDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Code Block">
          <RenderConfig config={codeBlockDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="File Uploader">
          <RenderConfig config={fileUploaderDemo} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function WorkflowPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Kanban Board">
          <RenderConfig config={kanbanDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Calendar">
          <RenderConfig config={calendarDemo} />
        </ShowcaseSection>
        <ShowcaseSection title="Pricing Table">
          <RenderConfig config={pricingDemo} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

function StructuralPage() {
  return (
    <PageWrapper>
      <div className="showcase">
        <ShowcaseSection title="Row Layout + Buttons">
          <RenderConfig config={structuralRow} />
        </ShowcaseSection>
        <ShowcaseSection title="Headings">
          <RenderConfig config={headings} />
        </ShowcaseSection>
        <ShowcaseSection title="Select">
          <RenderConfig config={selectDemo} />
        </ShowcaseSection>
      </div>
    </PageWrapper>
  );
}

export function ComponentShowcase() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <>
      <div className="page-tabs">
        {PAGES.map(({ key, label }) => (
          <button
            key={key}
            className={`page-tab ${page === key ? "page-tab--active" : ""}`}
            onClick={() => setPage(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {page === "dashboard" && <DashboardPage />}
      {page === "data" && <DataPage />}
      {page === "primitives" && <PrimitivesPage />}
      {page === "forms" && <FormsPage />}
      {page === "overlay" && <OverlayPage />}
      {page === "navigation" && <NavigationPage />}
      {page === "content" && <ContentPage />}
      {page === "workflow" && <WorkflowPage />}
      {page === "structural" && <StructuralPage />}
    </>
  );
}
