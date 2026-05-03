import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { PricingTableBase } from "../commerce/pricing-table/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createThreeTierPricing() {
  return [
    {
      name: "Free",
      description: "For side projects and experimentation.",
      price: 0,
      period: "forever",
      features: [
        { text: "1 workspace", included: true },
        { text: "100 API calls / day", included: true },
        { text: "Community support", included: true },
        { text: "Custom domain", included: false },
        { text: "Analytics", included: false },
      ],
      actionLabel: "Get started",
    },
    {
      name: "Pro",
      description: "For growing teams that need more power.",
      price: 29,
      period: "/month",
      features: [
        { text: "Unlimited workspaces", included: true },
        { text: "50,000 API calls / day", included: true },
        { text: "Priority support", included: true },
        { text: "Custom domain", included: true },
        { text: "Advanced analytics", included: true },
      ],
      actionLabel: "Start free trial",
      highlighted: true,
      badge: "Popular",
    },
    {
      name: "Enterprise",
      description: "For organizations with advanced needs.",
      price: "Custom" as string | number,
      period: "/month",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Unlimited API calls", included: true },
        { text: "Dedicated support", included: true },
        { text: "SSO & SAML", included: true },
        { text: "SLA guarantee", included: true },
      ],
      actionLabel: "Contact sales",
    },
  ];
}

function createTwoTierPricing() {
  return [
    {
      name: "Starter",
      description: "Perfect for individuals and small teams.",
      price: 9,
      period: "/month",
      features: [
        { text: "5 projects", included: true },
        { text: "10 GB storage", included: true },
        { text: "Email support", included: true },
        { text: "API access", included: false },
      ],
      actionLabel: "Choose Starter",
    },
    {
      name: "Professional",
      description: "Everything you need to scale.",
      price: 49,
      period: "/month",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "100 GB storage", included: true },
        { text: "Priority support", included: true },
        { text: "Full API access", included: true },
      ],
      actionLabel: "Choose Professional",
      highlighted: true,
      badge: "Recommended",
    },
  ];
}

function createHighlightedPricing() {
  return [
    {
      name: "Hobby",
      description: "Get started for free with basic features.",
      price: 0,
      period: "forever",
      features: [
        { text: "3 workspaces", included: true },
        { text: "1,000 API calls / day", included: true },
        { text: "Community forum", included: true },
        { text: "Custom branding", included: false },
        { text: "Team collaboration", included: false },
        { text: "Advanced security", included: false },
      ],
      actionLabel: "Start free",
    },
    {
      name: "Team",
      description: "Best value for growing teams.",
      price: 39,
      period: "/month per seat",
      features: [
        { text: "Unlimited workspaces", included: true },
        { text: "100,000 API calls / day", included: true },
        { text: "Priority email support", included: true },
        { text: "Custom branding", included: true },
        { text: "Team collaboration", included: true },
        { text: "Advanced security", included: false },
      ],
      actionLabel: "Start 14-day trial",
      highlighted: true,
      badge: "Best Value",
    },
    {
      name: "Business",
      description: "For large teams with advanced requirements.",
      price: 99,
      period: "/month per seat",
      features: [
        { text: "Everything in Team", included: true },
        { text: "Unlimited API calls", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "White-label branding", included: true },
        { text: "Advanced collaboration", included: true },
        { text: "SOC 2 compliance", included: true },
      ],
      actionLabel: "Contact sales",
    },
  ];
}

// ── Meta ───────────────────────────────────────────────────────────────────

const pricingMeta = {
  title: "Components/Commerce/Pricing Table",
  component: PricingTableBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Pricing table component for displaying tiered subscription plans with feature comparisons, highlighting, and action buttons. Supports any number of tiers with optional badges and recommended-plan indicators.",
      },
    },
  },
  argTypes: {
    tiers: {
      description: "Array of pricing tier configurations including name, price, features, and actions.",
    },
  },
} satisfies Meta<typeof PricingTableBase>;

export default pricingMeta;
type PricingStory = StoryObj<typeof pricingMeta>;

// ── Default: Three Tiers ───────────────────────────────────────────────────

export const Default: PricingStory = {
  render: (args) => <PricingTableBase {...args} />,
  args: {
    tiers: createThreeTierPricing(),
  },
};

// ── Highlighted: Recommended Plan ──────────────────────────────────────────

export const PricingTableHighlighted: PricingStory = {
  name: "Pricing Table / Highlighted",
  render: (args) => <PricingTableBase {...args} />,
  args: {
    tiers: createHighlightedPricing(),
  },
};

// ── Compact: Two Tiers ─────────────────────────────────────────────────────

export const PricingTableCompact: PricingStory = {
  name: "Pricing Table / Compact",
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <PricingTableBase {...args} />
    </div>
  ),
  args: {
    tiers: createTwoTierPricing(),
  },
};
