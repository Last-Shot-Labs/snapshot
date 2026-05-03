import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ButtonBase,
  ButtonControl,
  type ButtonControlProps,
} from "../forms/button";

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const sizes = ["sm", "md", "lg", "icon"] as const;

const states: Array<{
  label: string;
  activeStates?: ButtonControlProps["activeStates"];
  disabled?: boolean;
  ariaPressed?: boolean;
  ariaSelected?: boolean;
  ariaCurrent?: true;
  ariaExpanded?: boolean;
}> = [
  { label: "Default" },
  { label: "Hover", activeStates: ["hover"] },
  { label: "Focus", activeStates: ["focus"] },
  { label: "Pressed", activeStates: ["active"], ariaPressed: true },
  { label: "Selected", activeStates: ["selected"], ariaSelected: true },
  { label: "Current", activeStates: ["current"], ariaCurrent: true },
  { label: "Open", activeStates: ["open"], ariaExpanded: true },
  { label: "Invalid", activeStates: ["invalid"] },
  { label: "Disabled", disabled: true },
];

const pageStyle: CSSProperties = {
  display: "grid",
  gap: 28,
  color: "var(--sn-color-foreground, #111827)",
  fontFamily: "var(--sn-font-sans, Inter, system-ui, sans-serif)",
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: 12,
};

const labelStyle: CSSProperties = {
  margin: 0,
  color: "var(--sn-color-muted-foreground, #6b7280)",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const rowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 12,
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))",
  gap: 12,
  maxWidth: 980,
};

function ButtonSystem() {
  return (
    <div style={pageStyle}>
      <section style={sectionStyle}>
        <p style={labelStyle}>Variants</p>
        <div style={rowStyle}>
          {variants.map((variant) => (
            <ButtonBase
              key={variant}
              label={variant === "default" ? "Primary" : variant}
              variant={variant}
              size="md"
              icon={variant === "default" ? "save" : undefined}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={labelStyle}>Sizes</p>
        <div style={rowStyle}>
          {sizes.map((size) => (
            <ButtonBase
              key={size}
              label={size === "icon" ? undefined : size.toUpperCase()}
              icon={size === "icon" ? "settings" : "arrow-right"}
              ariaLabel={size === "icon" ? "Settings" : undefined}
              size={size}
              variant={size === "icon" ? "outline" : "secondary"}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={labelStyle}>States</p>
        <div style={gridStyle}>
          {states.map((state) => (
            <ButtonControl
              key={state.label}
              surfaceId={`button-system-${state.label.toLowerCase()}`}
              variant="outline"
              size="md"
              disabled={state.disabled}
              activeStates={state.activeStates}
              ariaPressed={state.ariaPressed}
              ariaSelected={state.ariaSelected}
              ariaCurrent={state.ariaCurrent}
              ariaExpanded={state.ariaExpanded}
            >
              {state.label}
            </ButtonControl>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Components/Forms/Button System",
  component: ButtonSystem,
  render: () => <ButtonSystem />,
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta<typeof ButtonSystem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
