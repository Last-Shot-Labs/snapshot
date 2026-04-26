import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import type { ApiClient } from "../api/client";
import type { ApiError } from "../api/error";
import type { TokenStorage } from "./storage";
import type {
  ResetPasswordBody,
  VerifyEmailBody,
  ResendVerificationBody,
  SetPasswordBody,
  DeleteAccountBody,
  RefreshTokenBody,
  RefreshTokenResponse,
  Session,
} from "../types";
import type { AuthContract } from "../auth/contract";
import { navigateToPath } from "./navigation";

interface AccountHooksConfig {
  loginPath?: string;
}

interface AccountHooksOptions {
  api: ApiClient;
  storage: TokenStorage;
  config: AccountHooksConfig;
  contract: AuthContract;
  onUnauthenticated?: () => void;
  queryClient: QueryClient;
}

/**
 * Create account-management hooks bound to a single snapshot instance.
 */
export function createAccountHooks({
  api,
  storage,
  config,
  contract,
  onUnauthenticated,
  queryClient: qc,
}: AccountHooksOptions) {
  /** Send a password-reset request for the given email or user. */
  function useResetPassword() {
    return useMutation<{ message: string }, ApiError, ResetPasswordBody>({
      mutationFn: (body) =>
        api.post<{ message: string }>(contract.endpoints.resetPassword, body),
    });
  }

  /** Submit an email-verification token to confirm the user's email address. */
  function useVerifyEmail() {
    return useMutation<{ message: string }, ApiError, VerifyEmailBody>({
      mutationFn: (body) =>
        api.post<{ message: string }>(contract.endpoints.verifyEmail, body),
    });
  }

  /** Resend the email-verification message to the user's address. */
  function useResendVerification() {
    return useMutation<{ message: string }, ApiError, ResendVerificationBody>({
      mutationFn: (body) =>
        api.post<{ message: string }>(
          contract.endpoints.resendVerification,
          body,
        ),
    });
  }

  /** Set or update the user's password. */
  function useSetPassword() {
    return useMutation<{ message: string }, ApiError, SetPasswordBody>({
      mutationFn: (body) =>
        api.post<{ message: string }>(contract.endpoints.setPassword, body),
    });
  }

  /** Delete the current user's account, clear all stored tokens, and navigate to the login page. */
  function useDeleteAccount() {
    return useMutation<void, ApiError, DeleteAccountBody | void>({
      mutationFn: (body) =>
        api.delete<void>(contract.endpoints.deleteAccount, body ?? {}),
      onSuccess: () => {
        storage.clear();
        storage.clearRefreshToken();
        qc.clear();
        onUnauthenticated?.();
        navigateToPath(config.loginPath, { replace: true });
      },
    });
  }

  /** Cancel a pending account deletion request. */
  function useCancelDeletion() {
    return useMutation<{ message: string }, ApiError, void>({
      mutationFn: () =>
        api.post<{ message: string }>(contract.endpoints.cancelDeletion, {}),
    });
  }

  /** Exchange a refresh token for a new access token and persist both in storage. */
  function useRefreshToken() {
    return useMutation<RefreshTokenResponse, ApiError, RefreshTokenBody | void>(
      {
        mutationFn: (body) =>
          api.post<RefreshTokenResponse>(
            contract.endpoints.refresh,
            body ?? {},
          ),
        onSuccess: (data) => {
          storage.set(data.token);
          if (data.refreshToken) {
            storage.setRefreshToken(data.refreshToken);
          }
        },
      },
    );
  }

  /** Query all active sessions for the current user. */
  function useSessions() {
    const { data, isLoading, isError } = useQuery<
      { sessions: Session[] },
      ApiError
    >({
      queryKey: ["auth", "sessions"],
      queryFn: () =>
        api.get<{ sessions: Session[] }>(contract.endpoints.sessions),
    });
    return { sessions: data?.sessions ?? [], isLoading, isError };
  }

  /** Revoke a specific session by ID and invalidate the sessions cache. */
  function useRevokeSession() {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, string>({
      mutationFn: (sessionId) =>
        api.delete<void>(contract.sessionRevoke(sessionId), {}),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["auth", "sessions"] });
      },
    });
  }

  return {
    useResetPassword,
    useVerifyEmail,
    useResendVerification,
    useSetPassword,
    useDeleteAccount,
    useCancelDeletion,
    useRefreshToken,
    useSessions,
    useRevokeSession,
  };
}
