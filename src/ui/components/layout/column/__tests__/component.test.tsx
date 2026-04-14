// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Column } from "../component";

vi.mock("../../../../hooks/use-breakpoint", () => ({
  useResponsiveValue: (value: unknown) => value,
}));

vi.mock("../../../../manifest/renderer", () => ({
  ComponentRenderer: ({ config }: { config: { type: string; id?: string } }) => (
    <div data-testid="column-child">{config.id ?? config.type}</div>
  ),
}));

describe("Column", () => {
  it("renders children in a vertical stack", () => {
    const { container } = render(
      <Column
        config={{
          type: "column",
          gap: "md",
          className: "stack",
          children: [{ type: "text", id: "first-child" }],
        }}
      />,
    );

    expect(screen.getByTestId("column-child").textContent).toContain("first-child");
    const column = container.firstElementChild as HTMLElement | null;
    expect(column?.style.flexDirection).toBe("column");
    expect(column?.classList.contains("stack")).toBe(true);
  });
});
