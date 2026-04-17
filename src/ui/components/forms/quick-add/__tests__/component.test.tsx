// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuickAdd } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "copy.quickAddPlaceholder": "Add a task",
  "copy.quickAddButton": "Create",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (typeof value === "object" && value !== null && "from" in value) {
    return subscribedValues[(value as { from: string }).from] as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
        key,
        resolveRefs(nested),
      ]),
    ) as T;
  }

  return value;
}

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) =>
    typeof value === "object" && value !== null && "from" in value
      ? subscribedValues[(value as { from: string }).from]
      : value,
  usePublish: () => publishSpy,
  useResolveFrom: <T,>(value: T) => resolveRefs(value),
}));

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => executeSpy,
}));

vi.mock("../../../../icons/index", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid="quick-add-icon">{name}</span>,
}));

vi.mock("../../../../manifest/runtime", async () => {
  const actual =
    await vi.importActual<typeof import("../../../../manifest/runtime")>(
      "../../../../manifest/runtime"
    );

  return {
    ...actual,
    useManifestRuntime: () => ({ raw: {}, app: {}, auth: {} }),
    useRouteRuntime: () => ({
      currentRoute: { id: "workspace", path: "/workspace/:id" },
      currentPath: "/workspace/alpha",
      params: { id: "alpha" },
      query: {},
    }),
  };
});

afterEach(() => {
  cleanup();
});

describe("QuickAdd", () => {
  it("submits entered text and clears the input", () => {
    executeSpy.mockReset();
    publishSpy.mockReset();

    render(
      <QuickAdd
        config={{
          type: "quick-add",
          on: {
            submit: { type: "create-task" } as never,
          },
        }}
      />,
    );

    const input = screen.getByTestId("quick-add-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Write docs" } });
    fireEvent.click(screen.getByTestId("quick-add-button"));

    expect(executeSpy).toHaveBeenCalledWith(
      { type: "create-task" },
      { id: undefined, value: "Write docs" },
    );
    expect(input.value).toBe("");
  });

  it("applies canonical quick-add slots", () => {
    const { container } = render(
      <QuickAdd
        config={{
          type: "quick-add",
          id: "task-add",
          className: "quick-add-root",
          placeholder: { from: "copy.quickAddPlaceholder" },
          buttonText: { from: "copy.quickAddButton" },
          slots: {
            root: { className: "root-slot" },
            icon: { className: "icon-slot" },
            input: { className: "input-slot" },
            button: { className: "button-slot" },
          },
        }}
      />,
    );

    expect(container.querySelector('[data-snapshot-id="task-add"]')?.className).toContain(
      "quick-add-root",
    );
    expect(container.querySelector('[data-snapshot-id="task-add"]')?.className).toContain(
      "root-slot",
    );
    expect(container.querySelector('[data-snapshot-id="task-add-icon"]')?.className).toContain(
      "icon-slot",
    );
    expect(container.querySelector('[data-snapshot-id="task-add-input"]')?.className).toContain(
      "input-slot",
    );
    expect(container.querySelector('[data-snapshot-id="task-add-button"]')?.className).toContain(
      "button-slot",
    );
    expect(screen.getByTestId("quick-add-input").getAttribute("placeholder")).toBe(
      "Add a task",
    );
    expect(screen.getByText("Create")).toBeDefined();
  });

  it("resolves templated placeholder and button copy against route runtime", () => {
    render(
      <QuickAdd
        config={{
          type: "quick-add",
          placeholder: "Add {route.params.id}",
          buttonText: "Create {route.params.id}",
        }}
      />,
    );

    expect(screen.getByTestId("quick-add-input").getAttribute("placeholder")).toBe(
      "Add alpha",
    );
    expect(screen.getByText("Create alpha")).toBeDefined();
  });
});
