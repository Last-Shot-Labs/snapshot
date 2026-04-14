/**
 * @vitest-environment jsdom
 */
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const execute = vi.fn();
let manifestRuntime: {
  raw: Record<string, unknown>;
  auth: {
    providers: Record<string, unknown>;
    providerMode?: string;
  };
};

vi.mock("../../../../context", () => ({
  useSubscribe: () => null,
  useResolveFrom: <T extends Record<string, unknown>>(value: T) => value,
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
  useManifestRuntime: () => manifestRuntime,
  useRouteRuntime: () => ({
    currentRoute: { id: "signin" },
    currentPath: "/sign-in",
    params: {},
    query: {},
  }),
}));

import { OAuthButtons } from "../component";

afterEach(() => {
  cleanup();
  execute.mockReset();
});

describe("OAuthButtons", () => {
  it("remains stable when providers become available after an empty render", () => {
    manifestRuntime = {
      raw: {},
      auth: {
        providers: {},
      },
    };

    const { rerender } = render(<OAuthButtons config={{ type: "oauth-buttons" }} />);
    expect(screen.queryByRole("button")).toBeNull();

    manifestRuntime = {
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
    };

    rerender(<OAuthButtons config={{ type: "oauth-buttons" }} />);
    expect(
      screen.getByRole("button", {
        name: "Continue with Google",
      }),
    ).toBeTruthy();
  });

  it("renders provider buttons through the shared button primitive", () => {
    manifestRuntime = {
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
    };

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

  it("connects provider descriptions through aria-describedby", () => {
    manifestRuntime = {
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
    };

    render(<OAuthButtons config={{ type: "oauth-buttons" }} />);

    const button = screen.getByRole("button", {
      name: "Continue with Google",
    });
    const description = screen.getByText("Use your workspace account");

    expect(button.getAttribute("aria-describedby")).toBe(description.id);
  });

  it("does not auto-redirect when a single provider opts out", () => {
    manifestRuntime = {
      raw: {},
      auth: {
        providerMode: "auto",
        providers: {
          google: {
            label: "Continue with Google",
            autoRedirect: false,
            startUrl: "/auth/google/start",
          },
        },
      },
    };

    render(<OAuthButtons config={{ type: "oauth-buttons" }} />);

    expect(execute).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", {
        name: "Continue with Google",
      }),
    ).toBeTruthy();
  });
});
