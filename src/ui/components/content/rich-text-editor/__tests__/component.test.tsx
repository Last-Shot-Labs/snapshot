// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RichTextEditor } from "../component";

const refValues: Record<string, unknown> = {
  "editor.placeholder": "Resolved placeholder for {route.params.id}",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (value && typeof value === "object") {
    if ("from" in (value as Record<string, unknown>)) {
      return refValues[(value as unknown as { from: string }).from] as T;
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
      value &&
      typeof value === "object" &&
      "from" in (value as Record<string, unknown>)
        ? refValues[(value as { from: string }).from]
        : value,
    usePublish: () => null,
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
      currentRoute: { id: "editor" },
      currentPath: "/editor/doc-7",
      params: { id: "doc-7" },
      query: {},
    }),
  };
});

vi.mock("../../../../icons/icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe("RichTextEditor", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders preview mode without creating an editor instance", () => {
    render(
      <RichTextEditor
        config={{
          type: "rich-text-editor",
          id: "article-editor",
          className: "rich-text-root",
          content: "# Hello\n\nPreview mode",
          mode: "preview",
          toolbar: false,
          minHeight: "220px",
          maxHeight: "360px",
        }}
      />,
    );

    expect(screen.getByTestId("rich-text-editor").classList.contains("rich-text-root")).toBe(
      true,
    );
    expect((screen.getByTestId("rich-text-editor") as HTMLElement).style.minHeight).toBe("");
    expect((screen.getByTestId("rich-text-editor") as HTMLElement).style.maxHeight).toBe("");
    expect(
      (
        document.querySelector('[data-snapshot-id="article-editor-content"]') as
          | HTMLElement
          | null
      )?.style.minHeight,
    ).toBe("220px");
    expect(
      (
        document.querySelector('[data-snapshot-id="article-editor-content"]') as
          | HTMLElement
          | null
      )?.style.maxHeight,
    ).toBe("360px");
    expect(screen.getByText("Hello")).toBeDefined();
    expect(screen.getByText("Preview mode")).toBeDefined();
  });

  it("accepts ref-backed placeholders in edit mode", () => {
    render(
      <RichTextEditor
        config={{
          type: "rich-text-editor",
          content: "",
          placeholder: { from: "editor.placeholder" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("rich-text-editor")).toBeTruthy();
  });
});
