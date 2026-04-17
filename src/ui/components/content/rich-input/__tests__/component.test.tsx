// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RichInput } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const clearContentSpy = vi.fn();
let editorHtml = "<p>Hello</p>";
let editorText = "Hello";

const editorChain = {
  focus: () => editorChain,
  unsetLink: () => editorChain,
  setLink: () => editorChain,
  toggleBold: () => editorChain,
  toggleItalic: () => editorChain,
  toggleUnderline: () => editorChain,
  toggleStrike: () => editorChain,
  toggleCode: () => editorChain,
  toggleCodeBlock: () => editorChain,
  toggleBulletList: () => editorChain,
  toggleOrderedList: () => editorChain,
  run: () => true,
};

const editor = {
  getHTML: () => editorHtml,
  getText: () => editorText,
  setEditable: vi.fn(),
  isActive: () => false,
  chain: () => editorChain,
  commands: {
    clearContent: clearContentSpy,
  },
};

const subscribedValues: Record<string, unknown> = {
  "copy.richInput.placeholder": "Type a message for {route.params.id}",
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
    usePublish: () => publishSpy,
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
      currentRoute: { id: "composer" },
      currentPath: "/threads/123",
      params: { id: "123" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => executeSpy,
}));

vi.mock("../../../../icons/index", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

vi.mock("@tiptap/react", async () => {
  const React = await import("react");
  return {
    useEditor: (options: { onUpdate?: (payload: { editor: typeof editor }) => void }) => {
      React.useEffect(() => {
        options.onUpdate?.({ editor });
      }, [options]);
      return editor;
    },
    EditorContent: () => <div data-testid="rich-input-editor">editor</div>,
  };
});

vi.mock("@tiptap/starter-kit", () => ({
  default: { configure: () => ({}) },
}));

vi.mock("@tiptap/extension-placeholder", () => ({
  default: { configure: () => ({}) },
}));

vi.mock("@tiptap/extension-link", () => ({
  default: { configure: () => ({}) },
}));

vi.mock("@tiptap/extension-underline", () => ({
  default: {},
}));

vi.mock("@tiptap/core", () => ({
  Extension: {
    create: () => ({}),
  },
}));

describe("RichInput", () => {
  it("renders toolbar state and dispatches send actions", () => {
    clearContentSpy.mockReset();
    executeSpy.mockReset();
    publishSpy.mockReset();
    editorHtml = "<p>Hello</p>";
    editorText = "Hello";

    render(
      <RichInput
        config={{
          type: "rich-input",
          id: "composer",
          className: "rich-input-root",
          features: ["bold", "link"],
          maxLength: 10,
          minHeight: "120px",
          maxHeight: "240px",
          sendAction: { type: "custom" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("rich-input")).toBeTruthy();
    expect(screen.getByTestId("rich-input").classList.contains("rich-input-root")).toBe(
      true,
    );
    expect((screen.getByTestId("rich-input") as HTMLElement).style.minHeight).toBe("");
    expect((screen.getByTestId("rich-input") as HTMLElement).style.maxHeight).toBe("");
    expect(
      (
        document.querySelector('[data-snapshot-id="composer-editorArea"]') as
          | HTMLElement
          | null
      )?.style.minHeight,
    ).toBe("120px");
    expect(
      (
        document.querySelector('[data-snapshot-id="composer-editorArea"]') as
          | HTMLElement
          | null
      )?.style.maxHeight,
    ).toBe("240px");
    expect(screen.getByTestId("rich-input-editor")).toBeTruthy();
    expect(screen.getByTestId("rich-input-toolbar")).toBeTruthy();
    expect(screen.getByText("5/10")).toBeTruthy();

    fireEvent.click(screen.getByTestId("rich-input-send"));

    expect(executeSpy).toHaveBeenCalledWith(
      { type: "custom" },
      { html: "<p>Hello</p>", text: "Hello", mentions: [] },
    );
    expect(clearContentSpy).toHaveBeenCalledWith(true);
    expect(publishSpy).toHaveBeenCalledWith({ html: "", text: "", mentions: [] });
  });

  it("renders a ref-backed placeholder when empty", () => {
    clearContentSpy.mockReset();
    executeSpy.mockReset();
    publishSpy.mockReset();
    editorHtml = "<p></p>";
    editorText = "";

    render(
      <RichInput
        config={{
          type: "rich-input",
          id: "composer-placeholder",
          placeholder: { from: "copy.richInput.placeholder" },
        }}
      />,
    );

    expect(screen.getByText("Type a message for 123")).toBeTruthy();
  });
});
