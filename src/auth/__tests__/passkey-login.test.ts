// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { createWebAuthnHooks } from "../webauthn-hooks";
import { defaultContract } from "../contract";
import { atom } from "jotai";
import type { MfaChallenge } from "../../types";
import type { ApiClient } from "../../api/client";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockState = {
  mockNavigate: vi.fn(),
  mockSetAtom: vi.fn(),
  mockSetQueryData: vi.fn(),
  mockInvalidateQueries: vi.fn(),
  capturedMutationConfig: {} as Record<string, unknown>,
};

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockState.mockNavigate,
}));

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jotai")>();
  return {
    ...actual,
    useSetAtom: () => mockState.mockSetAtom,
  };
});

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useMutation: vi.fn((cfg) => {
      mockState.capturedMutationConfig = cfg;
      return { mutate: vi.fn() };
    }),
    useQueryClient: () => ({
      setQueryData: mockState.mockSetQueryData,
      invalidateQueries: mockState.mockInvalidateQueries,
    }),
    useQuery: vi.fn(() => ({
      data: undefined,
      isLoading: false,
      isError: false,
    })),
  };
});

// ── Helpers ──────────────────────────────────────────────────────────────────

const mockUser = { id: "user-1", email: "test@example.com" };

function makeStorage() {
  return {
    get: vi.fn(() => null),
    set: vi.fn(),
    clear: vi.fn(),
    getRefreshToken: vi.fn(() => null),
    setRefreshToken: vi.fn(),
    clearRefreshToken: vi.fn(),
  };
}

function makeApi(loginResponse = { token: "tok", userId: "user-1" }) {
  return {
    post: vi.fn().mockResolvedValue(loginResponse),
    get: vi.fn().mockResolvedValue(mockUser),
    delete: vi.fn().mockResolvedValue({}),
  } as unknown as ApiClient;
}

const pendingMfaChallengeAtom = atom<MfaChallenge | null>(null);

// ── Tests ────────────────────────────────────────────────────────────────────

describe("usePasskeyLogin", () => {
  let storage: ReturnType<typeof makeStorage>;
  let api: ReturnType<typeof makeApi>;

  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState(null, "", "/");
    mockState.capturedMutationConfig = {};
    storage = makeStorage();
    api = makeApi();
  });

  function setup(configOverrides = {}) {
    const config = {
      auth: "cookie" as const,
      mfaPath: "/auth/mfa",
      homePath: "/home",
      ...configOverrides,
    };
    const hooks = createWebAuthnHooks({
      api,
      storage,
      config,
      contract: defaultContract("http://localhost"),
      pendingMfaChallengeAtom,
    });
    renderHook(() => hooks.usePasskeyLogin());
    return { config };
  }

  it("fetches /auth/me (not fabricated user)", async () => {
    setup();
    // Access the last registered mutationFn (usePasskeyLogin is last)
    const mutationFn = mockState.capturedMutationConfig.mutationFn as Function;
    const result = await mutationFn({
      passkeyToken: "pt",
      assertionResponse: {},
    });
    expect(api.get).toHaveBeenCalledWith("/auth/me");
    expect(result).toEqual(mockUser);
  });

  it("uses setQueryData, not invalidateQueries", async () => {
    setup();
    const onSuccess = mockState.capturedMutationConfig.onSuccess as Function;
    await onSuccess(mockUser, { passkeyToken: "pt", assertionResponse: {} });
    expect(mockState.mockSetQueryData).toHaveBeenCalledWith(
      ["auth", "me"],
      mockUser,
    );
    expect(mockState.mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("navigates with browser history", async () => {
    setup();
    const onSuccess = mockState.capturedMutationConfig.onSuccess as Function;
    await onSuccess(mockUser, { passkeyToken: "pt", assertionResponse: {} });
    expect(window.location.pathname).toBe("/home");
  });

  it("redirectTo override works", async () => {
    setup();
    const onSuccess = mockState.capturedMutationConfig.onSuccess as Function;
    await onSuccess(mockUser, {
      passkeyToken: "pt",
      assertionResponse: {},
      redirectTo: "/dashboard",
    });
    expect(window.location.pathname).toBe("/dashboard");
  });

  it("MFA challenge path matches useLogin", async () => {
    const mfaResponse = {
      mfaRequired: true,
      mfaToken: "mfa-tok",
      mfaMethods: ["totp"],
    };
    api = makeApi(mfaResponse as any);
    setup();
    const mutationFn = mockState.capturedMutationConfig.mutationFn as Function;
    const result = await mutationFn({
      passkeyToken: "pt",
      assertionResponse: {},
    });
    expect(result).toEqual({ mfaToken: "mfa-tok", mfaMethods: ["totp"] });

    const onSuccess = mockState.capturedMutationConfig.onSuccess as Function;
    await onSuccess(result, { passkeyToken: "pt", assertionResponse: {} });
    expect(mockState.mockSetAtom).toHaveBeenCalledWith({
      mfaToken: "mfa-tok",
      mfaMethods: ["totp"],
    });
    expect(window.location.pathname).toBe("/auth/mfa");
  });

  it("redirectTo is stripped from request body", async () => {
    setup();
    const mutationFn = mockState.capturedMutationConfig.mutationFn as Function;
    await mutationFn({
      passkeyToken: "pt",
      assertionResponse: {},
      redirectTo: "/somewhere",
    });
    const postedBody = (api.post as ReturnType<typeof vi.fn>).mock.calls[0]![1];
    expect(postedBody).not.toHaveProperty("redirectTo");
    expect(postedBody).toHaveProperty("passkeyToken", "pt");
  });
});
