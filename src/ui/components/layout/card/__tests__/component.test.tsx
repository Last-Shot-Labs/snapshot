// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Card } from "../component";

vi.mock("../../../../context", () => ({
  useSubscribe: (value: unknown) => value,
}));

vi.mock("../../../../hooks/use-breakpoint", () => ({
  useResponsiveValue: (value: unknown) => value,
}));

vi.mock("../../../../manifest/renderer", () => ({
  ComponentRenderer: ({ config }: { config: { type: string; id?: string } }) => (
    <div data-testid="card-child">{config.id ?? config.type}</div>
  ),
}));

describe("Card", () => {
  it("renders resolved heading content and child components", () => {
    render(
      <Card
        config={{
          type: "card",
          title: "Account",
          subtitle: "Settings",
          background: { image: "/hero.png", overlay: "rgba(0, 0, 0, 0.25)" },
          children: [{ type: "text", id: "details" }],
        }}
      />,
    );

    expect(screen.getByText("Account")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
    expect(screen.getByTestId("card-child").textContent).toContain("details");
  });
});
