// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Textarea, TextareaControl } from "../component";

const subscribedValues: Record<string, unknown> = {
  "editor.copy.label": "Notes {route.params.id}",
  "editor.copy.placeholder": "Add notes for {route.path}",
  "editor.copy.helper": "Keep it concise for {route.params.id}",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (value && typeof value === "object") {
    if ("from" in (value as Record<string, unknown>)) {
      return subscribedValues[(value as unknown as { from: string }).from] as T;
    }

    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        resolveRefs(entry),
      ]),
    ) as T;
  }

  return value;
}

vi.mock("../../../../context/hooks", async () => {
  const actual = await vi.importActual("../../../../context/hooks");

  return {
    ...actual,
    useSubscribe: (value: unknown) =>
      typeof value === "object" && value !== null && "from" in value
        ? subscribedValues[(value as { from: string }).from]
        : value,
    usePublish: () => vi.fn(),
    useResolveFrom: resolveRefs,
  };
});

vi.mock("../../../../manifest/runtime", async () => {
  const actual = await vi.importActual("../../../../manifest/runtime");

  return {
    ...actual,
    useManifestRuntime: () => ({
      raw: { routes: [] },
      app: {},
      auth: {},
    }),
    useRouteRuntime: () => ({
      currentRoute: { id: "notes" },
      currentPath: "/notes/42",
      params: { id: "42" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => vi.fn(),
}));

describe("Textarea", () => {
  it("shows the character count and required validation feedback", () => {
    const { container } = render(
      <Textarea
        config={{
          type: "textarea",
          id: "notes",
          className: "textarea-root-class",
          label: { from: "editor.copy.label" },
          placeholder: { from: "editor.copy.placeholder" },
          helperText: { from: "editor.copy.helper" },
          required: true,
          maxLength: 10,
          slots: {
            root: { className: "textarea-root-slot" },
          },
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-id="notes"]')?.className,
    ).toContain("textarea-root-class");
    expect(
      container.querySelector('[data-snapshot-id="notes"]')?.className,
    ).toContain("textarea-root-slot");
    expect(screen.getByText("Notes 42")).toBeDefined();

    const textarea = screen.getByRole("textbox");
    expect(textarea.getAttribute("placeholder")).toBe("Add notes for /notes/42");
    expect(screen.getByText("0/10")).toBeTruthy();

    fireEvent.blur(textarea);

    expect(screen.getByRole("alert").textContent).toBe("This field is required");
    expect(textarea.getAttribute("aria-invalid")).toBe("true");
  });

  it("merges direct control overrides through the shared surface path", () => {
    render(
      <TextareaControl
        surfaceId="notes-control"
        ariaLabel="Notes control"
        value=""
        className="textarea-direct-class"
        style={{ paddingTop: "2rem" }}
        itemSurfaceConfig={{ className: "textarea-item-class" }}
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Notes control" });
    expect(textarea.className).toContain("textarea-direct-class");
    expect(textarea.className).toContain("textarea-item-class");
    expect(textarea.style.paddingTop).toBe("2rem");
  });

  it("resolves helper text templates through the primitive pipeline", () => {
    render(
      <Textarea
        config={{
          type: "textarea",
          id: "notes-template",
          helperText: { from: "editor.copy.helper" },
        }}
      />,
    );

    expect(screen.getByText("Keep it concise for 42")).toBeDefined();
  });
});
