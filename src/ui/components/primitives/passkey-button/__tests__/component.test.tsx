/**
 * @vitest-environment jsdom
 */
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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
      contract: {
        endpoints: {
          passkeyLoginOptions: "/auth/passkey/login-options",
          passkeyLogin: "/auth/passkey/login",
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

vi.mock("../../../../manifest/passkey", () => ({
  isPasskeySupported: () => true,
  startPasskeyAuthentication: vi.fn().mockResolvedValue({ id: "credential" }),
}));

import { SnapshotApiContext } from "../../../../actions/executor";
import { PasskeyButton } from "../component";

describe("PasskeyButton", () => {
  it("runs the passkey flow and preserves label slot styling", async () => {
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

    fireEvent.click(screen.getByRole("button", { name: "Sign in with passkey" }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(2);
    });
  });
});
