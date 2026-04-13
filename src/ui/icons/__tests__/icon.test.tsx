// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "../icon";

describe("Icon", () => {
  it("resolves common config aliases instead of rendering fallback text", () => {
    const { container } = render(
      <div>
        <Icon name="pencil" label="Edit" />
        <Icon name="trash" label="Delete" />
        <Icon name="table-properties" label="Table" />
        <Icon name="gantt-chart" label="Timeline" />
      </div>,
    );

    expect(container.querySelectorAll("svg")).toHaveLength(4);
    expect(screen.queryByText("pencil")).toBeNull();
    expect(screen.queryByText("trash")).toBeNull();
    expect(screen.queryByText("table-properties")).toBeNull();
    expect(screen.queryByText("gantt-chart")).toBeNull();
  });
});
