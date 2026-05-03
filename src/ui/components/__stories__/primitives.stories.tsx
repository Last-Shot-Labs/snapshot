import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { TextBase } from "../primitives/text/standalone";
import { StackBase } from "../primitives/stack/standalone";
import { DividerBase } from "../primitives/divider/standalone";
import { LinkBase } from "../primitives/link/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createStackItems(count: number) {
  return Array.from({ length: count }, (_, i) => `Item ${String.fromCharCode(65 + i)}`);
}

function createTextSamples() {
  return {
    sizes: ["xs", "sm", "md", "lg"] as const,
    weights: ["normal", "medium", "semibold", "bold"] as const,
    variants: ["default", "muted", "subtle"] as const,
  };
}

const ITEM_STYLE: React.CSSProperties = {
  padding: "0.75rem 1rem",
  background: "var(--sn-color-card, #fff)",
  border: "1px solid var(--sn-color-border, #e5e7eb)",
  borderRadius: "var(--sn-radius-md, 0.375rem)",
  fontSize: "0.875rem",
};

const LABEL_STYLE: React.CSSProperties = {
  margin: "0 0 0.5rem",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "var(--sn-color-muted-foreground)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.02em",
};

const GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "2rem",
};

// ── Text Meta ──────────────────────────────────────────────────────────────

const textMeta = {
  title: "Components/Primitives/Text",
  component: TextBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Low-level primitive components for text rendering, layout stacking, dividers, and links. These form the foundational building blocks for all higher-level Snapshot components.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Text content to render.",
    },
    variant: {
      control: "select",
      options: ["default", "muted", "subtle"],
      description: "Color variant of the text.",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Font size preset.",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight.",
    },
  },
} satisfies Meta<typeof TextBase>;

export default textMeta;

// ── Text: Default ──────────────────────────────────────────────────────────

export const Default: StoryObj<typeof TextBase> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 560 }}>
      <TextBase value="This is a default text primitive." />
      <TextBase value="Muted text for secondary information." variant="muted" />
      <TextBase value="Small helper text." size="sm" variant="muted" />
      <TextBase value="Bold emphasis." weight="bold" />
    </div>
  ),
};

// ── Text: All Variants ─────────────────────────────────────────────────────

export const TextAllVariants: StoryObj<typeof TextBase> = {
  name: "Text / All Variants",
  render: () => {
    const { sizes, weights, variants } = createTextSamples();
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <p style={LABEL_STYLE}>Sizes</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {sizes.map((size) => (
              <TextBase key={size} value={`Size: ${size}`} size={size} />
            ))}
          </div>
        </div>
        <div>
          <p style={LABEL_STYLE}>Weights</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {weights.map((weight) => (
              <TextBase key={weight} value={`Weight: ${weight}`} weight={weight} />
            ))}
          </div>
        </div>
        <div>
          <p style={LABEL_STYLE}>Variants</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {variants.map((variant) => (
              <TextBase key={variant} value={`Variant: ${variant}`} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ── Stack ───────────────────────────────────────────────────────────────────

export const Stack: StoryObj<typeof StackBase> = {
  render: () => {
    const items = createStackItems(3);
    return (
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <p style={LABEL_STYLE}>Vertical (default)</p>
          <StackBase gap="sm">
            {items.map((item) => (
              <div key={item} style={ITEM_STYLE}>{item}</div>
            ))}
          </StackBase>
        </div>
        <div>
          <p style={LABEL_STYLE}>Horizontal</p>
          <StackBase gap="sm" style={{ flexDirection: "row" }}>
            {items.map((item) => (
              <div key={item} style={ITEM_STYLE}>{item}</div>
            ))}
          </StackBase>
        </div>
      </div>
    );
  },
};

// ── Divider ─────────────────────────────────────────────────────────────────

export const Divider: StoryObj<typeof DividerBase> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Content above</p>
      <DividerBase />
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Content between</p>
      <DividerBase label="or" />
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Content below</p>
    </div>
  ),
};

// ── Link ────────────────────────────────────────────────────────────────────

export const Link: StoryObj<typeof LinkBase> = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <LinkBase to="#" text="Default link" />
      <LinkBase to="#" text="With icon" icon="external-link" />
      <LinkBase to="#" text="Muted link" variant="muted" />
    </div>
  ),
};

// ── Link: States ───────────────────────────────────────────────────────────

export const LinkStates: StoryObj<typeof LinkBase> = {
  name: "Link / States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 400 }}>
      <div>
        <p style={LABEL_STYLE}>Default</p>
        <LinkBase to="#" text="Standard navigation link" />
      </div>
      <div>
        <p style={LABEL_STYLE}>With icon</p>
        <LinkBase to="#" text="External documentation" icon="external-link" />
      </div>
      <div>
        <p style={LABEL_STYLE}>Muted variant</p>
        <LinkBase to="#" text="Secondary link" variant="muted" />
      </div>
      <div>
        <p style={LABEL_STYLE}>Inline usage</p>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Read the{" "}
          <LinkBase to="#" text="getting started guide" />{" "}
          for setup instructions.
        </p>
      </div>
    </div>
  ),
};
