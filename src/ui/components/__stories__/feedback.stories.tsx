import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { DefaultLoadingBase } from "../feedback/default-loading/standalone";
import { DefaultErrorBase } from "../feedback/default-error/standalone";
import { DefaultNotFoundBase } from "../feedback/default-not-found/standalone";
import { DefaultOfflineBase } from "../feedback/default-offline/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createFeedbackStates() {
  return {
    loading: { label: "Loading your workspace..." },
    error: {
      title: "Something went wrong",
      description: "We couldn't load the dashboard. Please try again.",
      showRetry: true,
      retryLabel: "Retry",
    },
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
    },
    offline: {
      title: "You're offline",
      description: "Some features may be unavailable until you're back online.",
    },
  };
}

const GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "1.5rem",
};

const CARD_STYLE: React.CSSProperties = {
  border: "1px solid var(--sn-color-border, #e5e7eb)",
  borderRadius: "var(--sn-radius-md, 0.5rem)",
  overflow: "hidden",
};

const CARD_HEADER_STYLE: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  background: "var(--sn-color-muted, #f3f4f6)",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  color: "var(--sn-color-muted-foreground)",
};

const CARD_BODY_STYLE: React.CSSProperties = {
  padding: "1rem",
  minHeight: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ── Meta ───────────────────────────────────────────────────────────────────

const loadingMeta = {
  title: "Components/Feedback/States",
  component: DefaultLoadingBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Feedback state components for loading, error, not-found, and offline conditions. These provide consistent, accessible fallback UIs across Snapshot applications.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Descriptive label displayed during the loading state.",
    },
  },
} satisfies Meta<typeof DefaultLoadingBase>;

export default loadingMeta;

// ── Loading ────────────────────────────────────────────────────────────────

export const Loading: StoryObj<typeof DefaultLoadingBase> = {
  render: (args) => <DefaultLoadingBase {...args} />,
  args: {
    label: "Loading your workspace...",
  },
};

// ── Error ──────────────────────────────────────────────────────────────────

export const Error: StoryObj<typeof DefaultErrorBase> = {
  render: (args) => <DefaultErrorBase {...args} />,
  args: {
    title: "Something went wrong",
    description: "We couldn't load the dashboard. Please try again.",
    showRetry: true,
    retryLabel: "Retry",
    onRetry: () => console.log("Retry clicked"),
  },
};

// ── Not Found ──────────────────────────────────────────────────────────────

export const NotFound: StoryObj<typeof DefaultNotFoundBase> = {
  render: (args) => <DefaultNotFoundBase {...args} />,
  args: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
  },
};

// ── Offline ────────────────────────────────────────────────────────────────

export const Offline: StoryObj<typeof DefaultOfflineBase> = {
  render: (args) => <DefaultOfflineBase {...args} />,
  args: {
    title: "You're offline",
    description: "Some features may be unavailable until you're back online.",
  },
};

// ── All States Grid ────────────────────────────────────────────────────────

export const AllStatesGrid: StoryObj = {
  name: "All States Grid",
  render: () => {
    const states = createFeedbackStates();
    return (
      <div style={GRID_STYLE}>
        <div style={CARD_STYLE}>
          <div style={CARD_HEADER_STYLE}>Loading</div>
          <div style={CARD_BODY_STYLE}>
            <DefaultLoadingBase label={states.loading.label} />
          </div>
        </div>
        <div style={CARD_STYLE}>
          <div style={CARD_HEADER_STYLE}>Error</div>
          <div style={CARD_BODY_STYLE}>
            <DefaultErrorBase
              title={states.error.title}
              description={states.error.description}
              showRetry={states.error.showRetry}
              retryLabel={states.error.retryLabel}
              onRetry={() => console.log("Retry clicked")}
            />
          </div>
        </div>
        <div style={CARD_STYLE}>
          <div style={CARD_HEADER_STYLE}>Not Found</div>
          <div style={CARD_BODY_STYLE}>
            <DefaultNotFoundBase
              title={states.notFound.title}
              description={states.notFound.description}
            />
          </div>
        </div>
        <div style={CARD_STYLE}>
          <div style={CARD_HEADER_STYLE}>Offline</div>
          <div style={CARD_BODY_STYLE}>
            <DefaultOfflineBase
              title={states.offline.title}
              description={states.offline.description}
            />
          </div>
        </div>
      </div>
    );
  },
};

// ── Custom Styled States ───────────────────────────────────────────────────

export const CustomStyledStates: StoryObj = {
  name: "Custom Styled States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div
        style={{
          padding: "2rem",
          background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
          borderRadius: "var(--sn-radius-md, 0.5rem)",
          border: "1px solid var(--sn-color-border, #e5e7eb)",
        }}
      >
        <DefaultErrorBase
          title="Service temporarily unavailable"
          description="Our servers are undergoing scheduled maintenance. We expect to be back online within 30 minutes."
          showRetry
          retryLabel="Check status"
          onRetry={() => console.log("Status check")}
        />
      </div>
      <div
        style={{
          padding: "2rem",
          background: "var(--sn-color-card, #fff)",
          borderRadius: "var(--sn-radius-md, 0.5rem)",
          border: "2px dashed var(--sn-color-border, #e5e7eb)",
        }}
      >
        <DefaultNotFoundBase
          title="No results match your search"
          description="Try adjusting your filters or using different search terms."
        />
      </div>
    </div>
  ),
};
