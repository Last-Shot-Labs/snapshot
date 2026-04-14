// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "../component";

vi.mock("../../../../context/hooks", () => ({
  usePublish: () => null,
  useSubscribe: (value: unknown) => value,
}));

vi.mock("../../../_base/use-component-data", () => ({
  useComponentData: () => ({
    data: [{ id: "us", name: "United States" }],
    isLoading: false,
  }),
}));

describe("Select", () => {
  it("renders resource-backed options using the configured fields", () => {
    render(
      <Select
        config={{
          type: "select",
          options: { resource: "countries" },
          valueField: "id",
          labelField: "name",
        }}
      />,
    );

    expect(screen.getByRole("option", { name: "United States" })).toBeDefined();
  });

  it("applies placeholder and updates the selected value", () => {
    render(
      <Select
        config={{
          type: "select",
          options: [
            { label: "One", value: "1" },
            { label: "Two", value: "2" },
          ],
          placeholder: "Choose one",
        }}
      />,
    );

    const select = screen.getByLabelText("Choose one") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "2" } });
    expect(select.value).toBe("2");
  });
});
