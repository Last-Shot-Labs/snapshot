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
        <Icon name="search-x" label="Search clear" />
      </div>,
    );

    expect(container.querySelectorAll("svg")).toHaveLength(5);
    expect(screen.queryByText("pencil")).toBeNull();
    expect(screen.queryByText("trash")).toBeNull();
    expect(screen.queryByText("table-properties")).toBeNull();
    expect(screen.queryByText("gantt-chart")).toBeNull();
    expect(screen.queryByText("search-x")).toBeNull();
  });

  it("renders a neutral svg fallback for unknown icons instead of raw text", () => {
    const { container } = render(
      <Icon name="definitely-missing" label="Fallback" />,
    );

    expect(container.querySelectorAll("svg")).toHaveLength(1);
    expect(screen.queryByText("definitely-missing")).toBeNull();
  });
});
