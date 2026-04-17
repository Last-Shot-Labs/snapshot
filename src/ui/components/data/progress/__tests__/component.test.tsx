// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Progress } from "../component";

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (typeof value === "object" && value !== null && "from" in value) {
    return undefined as T;
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
  useSubscribe: (value: unknown) => value,
  usePublish: () => vi.fn(),
  useResolveFrom: <T,>(value: T) => resolveRefs(value),
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

describe("Progress", () => {
  it("renders label and percentage for the bar variant", () => {
    render(
      <Progress
        config={{
          type: "progress",
          id: "upload-progress",
          className: "progress-root-class",
          value: 65,
          label: "Upload",
          showValue: true,
          slots: {
            root: { className: "progress-root-slot" },
          },
        }}
      />,
    );

    expect(screen.getByTestId("progress").className).toContain("progress-root-class");
    expect(screen.getByTestId("progress").className).toContain("progress-root-slot");
    expect(screen.getByText("Upload")).toBeTruthy();
    expect(screen.getByText("65%")).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("65");
  });

  it("resolves templated labels against route runtime", () => {
    render(
      <Progress
        config={{
          type: "progress",
          value: 50,
          label: "Upload {route.params.id}",
          showValue: false,
        }}
      />,
    );

    expect(screen.getByText("Upload alpha")).toBeTruthy();
  });
});
