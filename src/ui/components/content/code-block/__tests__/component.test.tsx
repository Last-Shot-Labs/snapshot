// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CodeBlock } from "../component";

const refValues: Record<string, unknown> = {
  "codeBlock.title": "resolved-{route.params.id}.ts",
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
      currentRoute: { id: "code" },
      currentPath: "/code/alpha",
      params: { id: "alpha" },
      query: {},
    }),
  };
});

describe("CodeBlock", () => {
  const writeText = vi.fn();

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  it("renders title metadata and copies code", () => {
    const { container } = render(
      <CodeBlock
        config={{
          type: "code-block",
          id: "answer-code",
          className: "code-block-root",
          code: "const answer = 42;",
          language: "typescript",
          title: "answer.ts",
          showLineNumbers: true,
          maxHeight: "240px",
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-id="answer-code"]')?.className,
    ).toContain("code-block-root");
    expect(
      (container.querySelector('[data-snapshot-id="answer-code"]') as HTMLElement | null)
        ?.style.maxHeight,
    ).toBe("");
    expect(
      (container.querySelector('[data-snapshot-id="answer-code-body"]') as HTMLElement | null)
        ?.style.maxHeight,
    ).toBe("240px");
    expect(screen.getByTestId("code-block-title").textContent).toBe("answer.ts");
    expect(screen.getByTestId("code-block-language").textContent).toBe("typescript");
    expect(screen.getByTestId("code-block-line-numbers").textContent).toContain("1");

    fireEvent.click(screen.getByTestId("code-block-copy"));

    expect(writeText).toHaveBeenCalledWith("const answer = 42;");
  });

  it("renders ref-backed titles", () => {
    render(
      <CodeBlock
        config={{
          type: "code-block",
          code: "const answer = 42;",
          title: { from: "codeBlock.title" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("code-block-title").textContent).toBe(
      "resolved-alpha.ts",
    );
  });
});
