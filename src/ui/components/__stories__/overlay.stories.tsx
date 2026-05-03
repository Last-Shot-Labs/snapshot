import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { ModalBase } from "../overlay/modal/standalone";
import { DrawerBase } from "../overlay/drawer/standalone";
import { DropdownMenuBase } from "../overlay/dropdown-menu/standalone";
import { PopoverBase } from "../overlay/popover/standalone";
import { CommandPaletteBase } from "../overlay/command-palette/standalone";
import { HoverCardBase } from "../overlay/hover-card/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createCommandGroups() {
  return [
    {
      label: "Navigation",
      items: [
        { label: "Go to Dashboard", icon: "layout-dashboard" },
        { label: "Go to Projects", icon: "folder" },
        { label: "Go to Settings", icon: "settings" },
        { label: "Go to Analytics", icon: "bar-chart-2" },
      ],
    },
    {
      label: "Actions",
      items: [
        { label: "Create new project", icon: "plus" },
        { label: "Invite team member", icon: "user-plus" },
        { label: "Deploy to production", icon: "rocket" },
        { label: "Export data", icon: "download" },
      ],
    },
    {
      label: "Account",
      items: [
        { label: "Profile settings", icon: "user" },
        { label: "Billing", icon: "credit-card" },
        { label: "Sign out", icon: "log-out" },
      ],
    },
  ];
}

function createDropdownItems() {
  return [
    { label: "Edit", icon: "pencil" },
    { label: "Duplicate", icon: "copy" },
    { label: "Archive", icon: "archive" },
    { type: "separator" as const },
    { label: "Delete", icon: "trash-2", destructive: true },
  ];
}

function createNotifications() {
  return [
    "New deployment succeeded",
    "User invited to workspace",
    "Billing cycle renewed",
    "Security audit completed",
  ];
}

const TRIGGER_BUTTON_STYLE: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "var(--sn-color-primary)",
  color: "var(--sn-color-primary-foreground, #fff)",
  border: "none",
  borderRadius: "var(--sn-radius-md, 0.5rem)",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.875rem",
};

const SECONDARY_BUTTON_STYLE: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "var(--sn-color-secondary)",
  color: "var(--sn-color-secondary-foreground)",
  border: "1px solid var(--sn-color-border, #e5e7eb)",
  borderRadius: "var(--sn-radius-md, 0.5rem)",
  cursor: "pointer",
  fontSize: "0.875rem",
};

const DESTRUCTIVE_BUTTON_STYLE: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "var(--sn-color-destructive, #dc2626)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--sn-radius-md, 0.5rem)",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.875rem",
};

const INPUT_STYLE: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  border: "1px solid var(--sn-color-border, #e5e7eb)",
  borderRadius: "var(--sn-radius-md, 0.375rem)",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 500,
};

const ROW_STYLE: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
};

// ── Meta ───────────────────────────────────────────────────────────────────

const overlayMeta = {
  title: "Components/Overlay",
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Overlay components for modals, drawers, dropdown menus, popovers, command palettes, and hover cards. All overlays support controlled open/close state and keyboard accessibility.",
      },
    },
  },
} satisfies Meta;

export default overlayMeta;
type OverlayStory = StoryObj<typeof overlayMeta>;

// ── Modal ──────────────────────────────────────────────────────────────────

function ModalDemo({ size }: { size?: "sm" | "md" | "lg" | "xl" | "full" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={TRIGGER_BUTTON_STYLE}>
        Open modal
      </button>
      <ModalBase
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        size={size ?? "md"}
        footer={[
          { label: "Cancel", variant: "secondary", onClick: () => setOpen(false) },
          { label: "Save changes", onClick: () => setOpen(false) },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ margin: 0, color: "var(--sn-color-muted-foreground)", fontSize: "0.875rem" }}>
            Make changes to your profile here. Click save when you're done.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={LABEL_STYLE}>Display name</label>
            <input defaultValue="Ada Lovelace" style={INPUT_STYLE} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={LABEL_STYLE}>Email</label>
            <input defaultValue="ada@example.com" style={INPUT_STYLE} />
          </div>
        </div>
      </ModalBase>
    </>
  );
}

export const Default: OverlayStory = {
  render: () => <ModalDemo />,
};

// ── Modal: All Sizes ───────────────────────────────────────────────────────

function ModalSizeButton({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const [open, setOpen] = useState(false);
  const descriptions: Record<string, string> = {
    sm: "Best for confirmations and simple alerts. Max-width 400px.",
    md: "Default size for forms and content. Max-width 512px.",
    lg: "For complex content and multi-column layouts. Max-width 680px.",
    xl: "For dashboards and data-heavy views. Max-width 900px.",
  };
  return (
    <>
      <button onClick={() => setOpen(true)} style={SECONDARY_BUTTON_STYLE}>
        {size.toUpperCase()}
      </button>
      <ModalBase
        open={open}
        onClose={() => setOpen(false)}
        title={`${size.toUpperCase()} modal`}
        size={size}
        footer={[{ label: "Close", variant: "secondary", onClick: () => setOpen(false) }]}
      >
        <p style={{ margin: 0, color: "var(--sn-color-muted-foreground)", fontSize: "0.875rem" }}>
          {descriptions[size]} Resize your browser to see how it responds.
        </p>
      </ModalBase>
    </>
  );
}

export const ModalSizes: OverlayStory = {
  name: "Modal / Sizes",
  render: () => (
    <div style={ROW_STYLE}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <ModalSizeButton key={size} size={size} />
      ))}
    </div>
  ),
};

// ── Modal: Confirm Dialog ──────────────────────────────────────────────────

export const ConfirmDialog: OverlayStory = {
  name: "Modal / Confirm Dialog",
  render: () => {
    function ConfirmDemo() {
      const [open, setOpen] = useState(false);
      const [confirmed, setConfirmed] = useState(false);
      return (
        <>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button onClick={() => { setOpen(true); setConfirmed(false); }} style={DESTRUCTIVE_BUTTON_STYLE}>
              Delete project
            </button>
            {confirmed && (
              <span style={{ fontSize: "0.875rem", color: "var(--sn-color-success, #16a34a)" }}>
                Project deleted (simulated).
              </span>
            )}
          </div>
          <ModalBase
            open={open}
            onClose={() => setOpen(false)}
            title="Delete project?"
            size="sm"
            footer={[
              { label: "Cancel", variant: "secondary", onClick: () => setOpen(false) },
              {
                label: "Delete permanently",
                variant: "destructive",
                onClick: () => {
                  setOpen(false);
                  setConfirmed(true);
                },
              },
            ]}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ margin: 0, color: "var(--sn-color-muted-foreground)", fontSize: "0.875rem" }}>
                This action cannot be undone. This will permanently delete the project
                <strong> Northstar</strong> and all associated data including deployments,
                environment variables, and team permissions.
              </p>
            </div>
          </ModalBase>
        </>
      );
    }
    return <ConfirmDemo />;
  },
};

// ── Drawer ──────────────────────────────────────────────────────────────────

function DrawerDemo({ side }: { side?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const notifications = createNotifications();
  return (
    <>
      <button onClick={() => setOpen(true)} style={TRIGGER_BUTTON_STYLE}>
        Open {side ?? "right"} drawer
      </button>
      <DrawerBase
        open={open}
        onClose={() => setOpen(false)}
        title="Notifications"
        side={side ?? "right"}
        size="md"
        footer={[
          { label: "Mark all read", variant: "ghost", onClick: () => {} },
          { label: "Close", variant: "secondary", onClick: () => setOpen(false) },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {notifications.map((msg, i) => (
            <div
              key={i}
              style={{
                padding: "0.75rem",
                background: "var(--sn-color-muted, #f3f4f6)",
                borderRadius: "var(--sn-radius-md, 0.375rem)",
                fontSize: "0.875rem",
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      </DrawerBase>
    </>
  );
}

export const Drawer: OverlayStory = {
  render: () => <DrawerDemo />,
};

export const DrawerLeft: OverlayStory = {
  name: "Drawer / Left Side",
  render: () => <DrawerDemo side="left" />,
};

// ── Context Menu ───────────────────────────────────────────────────────────

export const ContextMenu: OverlayStory = {
  name: "Context Menu",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
        Right-click (or long-press on touch devices) the area below to open the context menu.
      </p>
      <DropdownMenuBase
        trigger={{ label: "Right-click target area", icon: "mouse-pointer", variant: "outline" }}
        items={[
          { label: "Cut", icon: "scissors" },
          { label: "Copy", icon: "copy" },
          { label: "Paste", icon: "clipboard" },
          { type: "separator" },
          { label: "Select all", icon: "check-square" },
          { type: "separator" },
          { label: "Delete", icon: "trash-2", destructive: true },
        ]}
      />
    </div>
  ),
};

// ── Dropdown Menu ───────────────────────────────────────────────────────────

export const DropdownMenu: OverlayStory = {
  render: () => (
    <DropdownMenuBase
      trigger={{ label: "Actions", icon: "more-vertical" }}
      items={createDropdownItems()}
    />
  ),
};

// ── Popover ─────────────────────────────────────────────────────────────────

export const Popover: OverlayStory = {
  render: () => (
    <PopoverBase
      triggerLabel="Quick settings"
      triggerVariant="outline"
      title="Display preferences"
      description="Adjust how content is rendered in your workspace."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>
          Popover body content goes here -- forms, toggles, or anything.
        </p>
      </div>
    </PopoverBase>
  ),
};

// ── Command Palette ─────────────────────────────────────────────────────────

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "0.5rem 1rem",
          background: "var(--sn-color-card, #fff)",
          border: "1px solid var(--sn-color-border, #e5e7eb)",
          borderRadius: "var(--sn-radius-md, 0.5rem)",
          cursor: "pointer",
          fontSize: "0.875rem",
          color: "var(--sn-color-muted-foreground)",
        }}
      >
        Press{" "}
        <kbd
          style={{
            padding: "0.15rem 0.4rem",
            background: "var(--sn-color-muted)",
            borderRadius: 4,
            fontFamily: "inherit",
            fontSize: "0.8rem",
          }}
        >
          Cmd+K
        </kbd>{" "}
        or click
      </button>
      <CommandPaletteBase
        open={open}
        onClose={() => setOpen(false)}
        placeholder="Type a command or search..."
        groups={createCommandGroups()}
        onSelect={(item) => {
          console.log("Selected:", item);
          setOpen(false);
        }}
      />
    </>
  );
}

export const CommandPalette: OverlayStory = {
  render: () => <CommandPaletteDemo />,
};

// ── Hover Card ──────────────────────────────────────────────────────────────

export const HoverCard: OverlayStory = {
  render: () => (
    <HoverCardBase
      trigger={
        <span style={{ textDecoration: "underline", cursor: "pointer", fontSize: "0.875rem" }}>
          @ada-lovelace
        </span>
      }
    >
      <div style={{ padding: "0.75rem", maxWidth: 260 }}>
        <p style={{ margin: "0 0 0.25rem", fontWeight: 600, fontSize: "0.875rem" }}>Ada Lovelace</p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>
          Engineering lead -- Joined April 2024
        </p>
      </div>
    </HoverCardBase>
  ),
};
