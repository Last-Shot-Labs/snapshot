import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { ButtonBase } from "../forms/button/standalone";
import { InputField } from "../forms/input/standalone";
import { SelectField } from "../forms/select/standalone";
import { SwitchField } from "../forms/switch/standalone";
import { TextareaField } from "../forms/textarea/standalone";
import { SliderField } from "../forms/slider/standalone";
import { ToggleGroupBase } from "../forms/toggle-group/standalone";
import { IconButtonBase } from "../forms/icon-button/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createSelectOptions(count: number, domain = "Option") {
  return Array.from({ length: count }, (_, i) => ({
    label: `${domain} ${i + 1}`,
    value: `${domain.toLowerCase().replace(/\s/g, "-")}-${i + 1}`,
  }));
}

function createCountryOptions() {
  return [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
    { label: "Germany", value: "de" },
    { label: "Japan", value: "jp" },
    { label: "Australia", value: "au" },
    { label: "Brazil", value: "br" },
    { label: "France", value: "fr" },
  ];
}

function createRoleOptions() {
  return [
    { label: "Admin", value: "admin" },
    { label: "Editor", value: "editor" },
    { label: "Viewer", value: "viewer" },
  ];
}

function createPlanOptions() {
  return [
    { label: "Free", value: "free" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise" },
  ];
}

function createToggleItems() {
  return [
    { label: "Left", value: "left", icon: "align-left" },
    { label: "Center", value: "center", icon: "align-center" },
    { label: "Right", value: "right", icon: "align-right" },
  ];
}

const GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "1.5rem",
  maxWidth: 800,
};

const STACK_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  maxWidth: 420,
};

const ROW_STYLE: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
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

// ── Button Meta ────────────────────────────────────────────────────────────

const buttonMeta = {
  title: "Components/Forms/Button",
  component: ButtonBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Versatile button component supporting multiple variants, sizes, icons, and loading states. Use for primary actions, destructive operations, and navigation triggers.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Visual style variant of the button.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description: "Size preset controlling padding and font size.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button and prevents interaction.",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the button stretch to fill its container width.",
    },
    label: {
      control: "text",
      description: "Text label displayed inside the button.",
    },
    icon: {
      control: "text",
      description: "Lucide icon name to render alongside the label.",
    },
    onClick: {
      action: "clicked",
      description: "Click event handler.",
    },
  },
} satisfies Meta<typeof ButtonBase>;

export default buttonMeta;
type ButtonStory = StoryObj<typeof buttonMeta>;

// ── Button: Basic Variants ─────────────────────────────────────────────────

export const Default: ButtonStory = {
  args: { label: "Save changes", variant: "default", size: "md" },
};

export const WithIcon: ButtonStory = {
  args: { label: "Deploy", icon: "rocket", variant: "default", size: "md" },
};

export const Destructive: ButtonStory = {
  args: { label: "Delete account", variant: "destructive", size: "md" },
};

export const Outline: ButtonStory = {
  args: { label: "Export CSV", icon: "download", variant: "outline", size: "md" },
};

export const Secondary: ButtonStory = {
  args: { label: "Cancel", variant: "secondary", size: "md" },
};

export const Ghost: ButtonStory = {
  args: { label: "More options", variant: "ghost", size: "md" },
};

export const LinkButton: ButtonStory = {
  name: "Link",
  args: { label: "Learn more", variant: "link", size: "md" },
};

export const IconOnly: ButtonStory = {
  args: { icon: "settings", variant: "ghost", size: "icon", ariaLabel: "Settings" },
};

export const AllVariants: ButtonStory = {
  name: "All Variants",
  render: () => (
    <div style={ROW_STYLE}>
      {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map(
        (variant) => (
          <ButtonBase key={variant} label={variant === "default" ? "Primary" : variant} variant={variant} />
        ),
      )}
    </div>
  ),
};

export const AllSizes: ButtonStory = {
  name: "All Sizes",
  render: () => (
    <div style={ROW_STYLE}>
      <ButtonBase label="Small" size="sm" />
      <ButtonBase label="Medium" size="md" />
      <ButtonBase label="Large" size="lg" />
      <ButtonBase icon="plus" size="icon" ariaLabel="Add" />
    </div>
  ),
};

// ── Button: Loading State ──────────────────────────────────────────────────

export const ButtonDisabledStates: ButtonStory = {
  name: "Button / Disabled States",
  render: () => (
    <div style={{ ...STACK_STYLE, gap: "1rem" }}>
      <p style={LABEL_STYLE}>Disabled buttons across all variants</p>
      <div style={ROW_STYLE}>
        <ButtonBase label="Primary" disabled />
        <ButtonBase label="Secondary" variant="secondary" disabled />
        <ButtonBase label="Outline" variant="outline" disabled />
        <ButtonBase label="Ghost" variant="ghost" disabled />
        <ButtonBase label="Destructive" variant="destructive" disabled />
        <ButtonBase label="Link" variant="link" disabled />
      </div>
    </div>
  ),
};

export const ButtonFullWidth: ButtonStory = {
  name: "Button / Full Width",
  render: () => (
    <div style={{ ...STACK_STYLE, gap: "0.75rem" }}>
      <ButtonBase label="Full width primary" fullWidth />
      <ButtonBase label="Full width outline" variant="outline" fullWidth icon="download" />
      <ButtonBase label="Full width secondary" variant="secondary" fullWidth />
    </div>
  ),
};

// ── Input States Grid ──────────────────────────────────────────────────────

export const InputStates: ButtonStory = {
  name: "Input / States Grid",
  render: () => (
    <div style={GRID_STYLE}>
      <InputField
        label="Default"
        placeholder="Enter value..."
      />
      <InputField
        label="With value"
        value="ada@example.com"
        icon="mail"
      />
      <InputField
        label="Error state"
        value="ab"
        errorText="Username must be at least 3 characters."
      />
      <InputField
        label="Disabled"
        value="Cannot edit"
        disabled
      />
      <InputField
        label="Read-only"
        value="Read-only value"
        readOnly
      />
      <InputField
        label="With helper"
        placeholder="you@example.com"
        helperText="We'll never share your email."
        icon="mail"
      />
    </div>
  ),
};

// ── Form Validation ────────────────────────────────────────────────────────

export const FormValidation: ButtonStory = {
  name: "Form / Real-Time Validation",
  render: () => {
    function ValidationDemo() {
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const usernameError =
        username.length > 0 && username.length < 3
          ? "Username must be at least 3 characters."
          : undefined;

      const emailError =
        email.length > 0 && !email.includes("@")
          ? "Please enter a valid email address."
          : undefined;

      const passwordError =
        password.length > 0 && password.length < 8
          ? `Password needs ${8 - password.length} more character${8 - password.length === 1 ? "" : "s"}.`
          : undefined;

      const isValid =
        username.length >= 3 &&
        email.includes("@") &&
        password.length >= 8;

      return (
        <div style={STACK_STYLE}>
          <InputField
            label="Username"
            placeholder="ada_lovelace"
            icon="user"
            value={username}
            onChange={(val) => setUsername(val)}
            errorText={usernameError}
            helperText={
              !usernameError && username.length >= 3
                ? "Username is available."
                : undefined
            }
          />
          <InputField
            label="Email"
            placeholder="you@example.com"
            icon="mail"
            type="email"
            value={email}
            onChange={(val) => setEmail(val)}
            errorText={emailError}
          />
          <InputField
            label="Password"
            placeholder="Min. 8 characters"
            icon="lock"
            type="password"
            value={password}
            onChange={(val) => setPassword(val)}
            errorText={passwordError}
            helperText={
              !passwordError && password.length >= 8
                ? "Strong password."
                : undefined
            }
          />
          <ButtonBase
            label="Create account"
            icon="check"
            disabled={!isValid}
            fullWidth
          />
        </div>
      );
    }
    return <ValidationDemo />;
  },
};

// ── Input ───────────────────────────────────────────────────────────────────

export const Input: StoryObj<typeof InputField> = {
  render: (args) => <InputField {...args} />,
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    helperText: "We'll never share your email.",
  },
};

export const InputWithError: StoryObj<typeof InputField> = {
  name: "Input / Error State",
  render: (args) => <InputField {...args} />,
  args: {
    label: "Username",
    value: "ab",
    errorText: "Username must be at least 3 characters.",
  },
};

export const InputWithIcon: StoryObj<typeof InputField> = {
  name: "Input / With Icon",
  render: (args) => <InputField {...args} />,
  args: {
    label: "Search",
    placeholder: "Search anything...",
    icon: "search",
    type: "search",
  },
};

// ── Select ──────────────────────────────────────────────────────────────────

export const Select: StoryObj<typeof SelectField> = {
  render: (args) => <SelectField {...args} />,
  args: {
    label: "Country",
    placeholder: "Choose a country",
    options: createCountryOptions(),
    helperText: "Select your primary residence.",
  },
};

export const SelectWithError: StoryObj<typeof SelectField> = {
  name: "Select / Error State",
  render: (args) => <SelectField {...args} />,
  args: {
    label: "Plan",
    placeholder: "Select a plan",
    options: createPlanOptions(),
    errorText: "A plan is required to continue.",
    required: true,
  },
};

// ── Switch ──────────────────────────────────────────────────────────────────

export const Switch: StoryObj<typeof SwitchField> = {
  render: (args) => <SwitchField {...args} />,
  args: {
    label: "Dark mode",
    description: "Enable the dark theme across the app.",
    size: "md",
  },
};

export const SwitchSizes: StoryObj<typeof SwitchField> = {
  name: "Switch / All Sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <SwitchField label="Small" size="sm" defaultChecked />
      <SwitchField label="Medium" size="md" />
      <SwitchField label="Large" size="lg" defaultChecked />
    </div>
  ),
};

// ── Textarea ────────────────────────────────────────────────────────────────

export const Textarea: StoryObj<typeof TextareaField> = {
  render: (args) => <TextareaField {...args} />,
  args: {
    label: "Message",
    placeholder: "Write your message here...",
    rows: 4,
    maxLength: 500,
    helperText: "Markdown is supported.",
  },
};

// ── Slider ──────────────────────────────────────────────────────────────────

export const Slider: StoryObj<typeof SliderField> = {
  render: (args) => <SliderField {...args} />,
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    defaultValue: 65,
    showValue: true,
  },
};

// ── Toggle Group ────────────────────────────────────────────────────────────

export const ToggleGroup: StoryObj<typeof ToggleGroupBase> = {
  render: (args) => <ToggleGroupBase {...args} />,
  args: {
    items: createToggleItems(),
    variant: "outline",
  },
};

// ── Icon Button ─────────────────────────────────────────────────────────────

export const IconButton: StoryObj<typeof IconButtonBase> = {
  render: () => (
    <div style={ROW_STYLE}>
      <IconButtonBase icon="heart" ariaLabel="Favorite" variant="ghost" />
      <IconButtonBase icon="share-2" ariaLabel="Share" variant="outline" />
      <IconButtonBase icon="trash-2" ariaLabel="Delete" variant="destructive" />
      <IconButtonBase icon="plus" ariaLabel="Add" variant="default" />
      <IconButtonBase icon="settings" ariaLabel="Settings" variant="secondary" />
    </div>
  ),
};

// ── Form Composition ────────────────────────────────────────────────────────

export const FormComposition: StoryObj = {
  name: "Form Composition",
  render: () => (
    <div style={STACK_STYLE}>
      <InputField label="Full name" placeholder="Ada Lovelace" icon="user" />
      <InputField label="Email" placeholder="ada@example.com" type="email" icon="mail" />
      <SelectField
        label="Role"
        placeholder="Select role"
        options={createRoleOptions()}
      />
      <TextareaField label="Bio" placeholder="Tell us about yourself..." rows={3} maxLength={280} />
      <SliderField label="Experience (years)" min={0} max={30} defaultValue={5} showValue />
      <SwitchField label="Send email notifications" size="sm" />
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <ButtonBase label="Cancel" variant="outline" />
        <ButtonBase label="Create account" icon="check" />
      </div>
    </div>
  ),
};
