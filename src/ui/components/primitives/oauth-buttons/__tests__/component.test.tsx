/**
 * @vitest-environment jsdom
 */
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

const execute = vi.fn();

vi.mock("../../../../context", () => ({
  useSubscribe: () => null,
}));

vi.mock("../../../../actions/executor", async () => {
  const actual =
    await vi.importActual<typeof import("../../../../actions/executor")>(
      "../../../../actions/executor"
    );
  return {
    ...actual,
    useActionExecutor: () => execute,
  };
});

vi.mock("../../../../manifest/runtime", () => ({
  useManifestRuntime: () => ({
    raw: {},
    auth: {
      providers: {
        google: {
          label: "Continue with Google",
          description: "Use your workspace account",
          startUrl: "/auth/google/start",
        },
      },
    },
  }),
  useRouteRuntime: () => ({
    currentRoute: { id: "signin" },
    currentPath: "/sign-in",
    params: {},
    query: {},
  }),
}));

import { OAuthButtons } from "../component";

describe("OAuthButtons", () => {
  it("renders provider buttons through the shared button primitive", () => {
    render(
      <OAuthButtons
        config={{
          type: "oauth-buttons",
          heading: "Continue with",
          slots: {
            providerLabel: { className: "provider-label-slot" },
          },
        }}
      />,
    );

    expect(screen.getByText("Continue with")).toBeTruthy();
    const button = screen.getByRole("button", {
      name: "Continue with Google",
    });
    expect(screen.getByText("Continue with Google").className).toContain(
      "provider-label-slot",
    );

    fireEvent.click(button);
    expect(execute).toHaveBeenCalledWith({
      type: "navigate-external",
      to: "/auth/google/start",
    });
  });
});
