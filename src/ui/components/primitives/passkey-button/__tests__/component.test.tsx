/**
 * @vitest-environment jsdom
 */
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const execute = vi.fn();
const refValues: Record<string, unknown> = {
  "global.labels.passkey": "Use passkey alpha",
};
let manifestRuntime: {
  raw: Record<string, unknown>;
  auth: {
    passkey?: boolean | Record<string, unknown>;
    screenOptions?: Record<string, unknown>;
    contract?: {
      endpoints?: Record<string, string>;
    };
  };
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (
    value &&
    typeof value === "object" &&
    "from" in (value as Record<string, unknown>) &&
    typeof (value as unknown as { from: unknown }).from === "string"
  ) {
    return refValues[(value as unknown as { from: string }).from] as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        resolveRefs(entry),
      ]),
    ) as T;
  }

  return value;
}

vi.mock("../../../../context", () => ({
  useSubscribe: () => null,
  useResolveFrom: <T extends Record<string, unknown>>(value: T) => resolveRefs(value),
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

vi.mock("../../../../manifest/passkey", () => ({
  isPasskeySupported: () => true,
  startPasskeyAuthentication: vi.fn().mockResolvedValue({ id: "credential" }),
}));

import { SnapshotApiContext } from "../../../../actions/executor";
import { PasskeyButton } from "../component";

afterEach(() => {
  cleanup();
  execute.mockReset();
});

describe("PasskeyButton", () => {
  it("remains stable when passkey auth becomes enabled after an empty render", () => {
    manifestRuntime = {
      raw: {},
      auth: {
        passkey: false,
      },
    };

    const { rerender } = render(
      <PasskeyButton
        config={{ type: "passkey-button", label: "Sign in with passkey" }}
      />,
    );
    expect(screen.queryByRole("button")).toBeNull();

    manifestRuntime = {
      raw: {},
      auth: {
        passkey: { enabled: true },
      },
    };

    rerender(
      <PasskeyButton
        config={{ type: "passkey-button", label: "Sign in with passkey" }}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "Sign in with passkey",
      }),
    ).toBeTruthy();
  });

  it("runs the passkey flow and preserves label slot styling", async () => {
    manifestRuntime = {
      raw: {},
      auth: {
        passkey: { enabled: true },
        contract: {
          endpoints: {
            passkeyLoginOptions: "/auth/passkey/login-options",
            passkeyLogin: "/auth/passkey/login",
          },
        },
      },
    };

    const api = {
      post: vi
        .fn()
        .mockResolvedValueOnce({ options: { challenge: "abc" }, passkeyToken: "token-1" })
        .mockResolvedValueOnce({ ok: true }),
    };

    render(
      <SnapshotApiContext.Provider value={api as never}>
        <PasskeyButton
          config={{
            type: "passkey-button",
            className: "passkey-root",
            label: "Sign in with passkey",
            slots: {
              label: { className: "passkey-label-slot" },
            },
          }}
        />
      </SnapshotApiContext.Provider>,
    );

    expect(screen.getByText("Sign in with passkey").className).toContain(
      "passkey-label-slot",
    );
    expect(screen.getByRole("button").className).toContain("passkey-root");

    fireEvent.click(screen.getByRole("button", { name: "Sign in with passkey" }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(2);
    });
  });

  it("applies root active-state slot styling through the shared button primitive", async () => {
    manifestRuntime = {
      raw: {},
      auth: {
        passkey: { enabled: true },
      },
    };

    let releaseSecondPost: (() => void) | undefined;
    const api = {
      post: vi
        .fn()
        .mockResolvedValueOnce({ options: { challenge: "abc" }, passkeyToken: "token-1" })
        .mockImplementationOnce(
          () =>
            new Promise((resolve) => {
              releaseSecondPost = () => resolve({ ok: true });
            }),
        ),
    };

    render(
      <SnapshotApiContext.Provider value={api as never}>
        <PasskeyButton
          config={{
            type: "passkey-button",
            label: "Sign in with passkey",
            slots: {
              root: {
                states: {
                  active: {
                    className: "passkey-root-active",
                  },
                },
              },
            },
          }}
        />
      </SnapshotApiContext.Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign in with passkey" }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(2);
    });

    expect(screen.getByRole("button").className).toContain("passkey-root-active");

    releaseSecondPost?.();
    await waitFor(() => {
      expect(screen.getByRole("button").className).not.toContain("passkey-root-active");
    });
  });

  it("executes onError actions instead of surfacing unhandled rejections", async () => {
    manifestRuntime = {
      raw: {},
      auth: {
        passkey: { enabled: true },
      },
    };

    const apiError = new Error("passkey options failed");
    const api = {
      post: vi.fn().mockRejectedValue(apiError),
    };

    render(
      <SnapshotApiContext.Provider value={api as never}>
        <PasskeyButton
          config={{
            type: "passkey-button",
            label: "Sign in with passkey",
            onError: {
              type: "toast",
              variant: "error",
              message: "Passkey failed",
            },
          }}
        />
      </SnapshotApiContext.Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign in with passkey" }));

    await waitFor(() => {
      expect(execute).toHaveBeenCalledWith(
        {
          type: "toast",
          variant: "error",
          message: "Passkey failed",
        },
        { error: apiError },
      );
    });
  });

  it("respects screen-level autoPrompt opt-out over manifest defaults", async () => {
    manifestRuntime = {
      raw: {},
      auth: {
        passkey: { enabled: true, autoPrompt: true },
        screenOptions: {
          signin: {
            passkey: {
              enabled: true,
              autoPrompt: false,
            },
          },
        },
      },
    };

    const api = {
      post: vi.fn(),
    };

    render(
      <SnapshotApiContext.Provider value={api as never}>
        <PasskeyButton
          config={{
            type: "passkey-button",
            label: "Sign in with passkey",
          }}
        />
      </SnapshotApiContext.Provider>,
    );

    await Promise.resolve();
    expect(api.post).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", {
        name: "Sign in with passkey",
      }),
    ).toBeTruthy();
  });

  it("resolves ref-backed screen-level labels", () => {
    manifestRuntime = {
      raw: {},
      auth: {
        passkey: { enabled: true },
        screenOptions: {
          signin: {
            labels: {
              passkeyButton: { from: "global.labels.passkey" },
            },
          },
        },
      },
    };

    render(
      <SnapshotApiContext.Provider value={null as never}>
        <PasskeyButton
          config={{
            type: "passkey-button",
            label: "Fallback",
          }}
        />
      </SnapshotApiContext.Provider>,
    );

    expect(
      screen.getByRole("button", {
        name: "Use passkey alpha",
      }),
    ).toBeTruthy();
  });
});
