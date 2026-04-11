import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ApiError } from "../../api/error";
import { mergeContract, type AuthContract } from "../../auth/contract";
import { BUTTON_INTERACTIVE_CSS } from "../components/_base/button-styles";
import { BaseTextField } from "../components/_base/form-controls";
import { ButtonControl } from "../components/forms/button";
import {
  Heading as StructuralHeading,
} from "./structural";
import { useSetStateValue, useStateValue } from "../state";
import type {
  AuthErrorContext,
  AuthUser,
  LoginResponse,
  MfaChallenge,
  MfaMethod,
  OAuthProvider,
  RegisterVars,
  ResetPasswordBody,
  SnapshotInstance,
  VerifyEmailBody,
} from "../../types";
import { getAuthScreenPath, type AuthScreen } from "./auth-routes";
import { isPasskeySupported, startPasskeyAuthentication } from "./passkey";
import type { CompiledManifest, CompiledRoute } from "./types";

const AUTH_QUERY_KEY = ["auth", "me"] as const;
const MANIFEST_AUTH_MFA_STATE_KEY = "__manifestAuth.pendingMfaChallenge";

interface AuthProviderConfig {
  name: string;
  provider: OAuthProvider;
  label?: string;
  description?: string;
  autoRedirect?: boolean;
}

interface AuthPasskeyConfig {
  enabled: boolean;
  autoPrompt: boolean;
}

interface ManifestAuthRuntimeConfig {
  authMode: "cookie" | "token";
  contract: AuthContract;
}

interface ManifestAuthScreenProps {
  manifest: CompiledManifest;
  route: CompiledRoute;
  screen: AuthScreen;
  snapshot: Pick<
    SnapshotInstance,
    "api" | "queryClient" | "tokenStorage" | "formatAuthError" | "getOAuthUrl"
  >;
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

/**
 * Resolve the auth screen id for the current route.
 *
 * Auth screens are addressed by route id only; the route path is irrelevant.
 *
 * @param manifest - Compiled manifest
 * @param route - Active route
 * @returns The matching auth screen, or null when the route is not an auth screen
 */
export function resolveAuthScreen(
  manifest: CompiledManifest,
  route: CompiledRoute | null,
): AuthScreen | null {
  if (!manifest.auth || !route) {
    return null;
  }

  for (const screen of manifest.auth.screens) {
    if (route.id === screen) {
      return screen;
    }
  }

  return null;
}

function useLocationSearch(): URLSearchParams {
  const [search, setSearch] = useState(() =>
    typeof window === "undefined" ? "" : window.location.search,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      setSearch(window.location.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return useMemo(() => new URLSearchParams(search), [search]);
}

function resolveHomePath(manifest: CompiledManifest): string {
  return manifest.app.home ?? manifest.firstRoute?.path ?? "/";
}

function getAuthScreenOptions(manifest: CompiledManifest, screen: AuthScreen) {
  return manifest.auth?.screenOptions?.[screen];
}

function resolveConfiguredLinks(
  manifest: CompiledManifest,
  screen: AuthScreen,
): Array<{ label: string; path: string }> {
  const links = getAuthScreenOptions(manifest, screen)?.links ?? [];

  return links
    .map((link) => {
      const path =
        link.path ??
        (link.screen ? getAuthScreenPath(manifest, link.screen) : undefined);

      if (!path) {
        return null;
      }

      return {
        label: link.label,
        path,
      };
    })
    .filter((value): value is { label: string; path: string } => value != null);
}

function titleCase(value: string): string {
  if (!value) {
    return value;
  }

  return value[0]!.toUpperCase() + value.slice(1).replace(/[-_]/g, " ");
}

function resolveProviderTarget(
  name: string,
  provider:
    | {
        type:
          | "google"
          | "github"
          | "microsoft"
          | "apple"
          | "facebook"
          | "discord"
          | "custom";
        name?: string;
        label?: string;
        description?: string;
        autoRedirect?: boolean;
      }
    | undefined,
): AuthProviderConfig | null {
  if (!provider) {
    return null;
  }

  return {
    name,
    provider: name as OAuthProvider,
    label: provider.label ?? `Continue with ${titleCase(name)}`,
    description: provider.description,
    autoRedirect: provider.autoRedirect,
  };
}

function normalizePasskeyConfig(
  value:
    | boolean
    | {
        enabled?: boolean;
        autoPrompt?: boolean;
      }
    | undefined,
): AuthPasskeyConfig {
  if (typeof value === "boolean") {
    return {
      enabled: value,
      autoPrompt: false,
    };
  }

  return {
    enabled: value?.enabled ?? false,
    autoPrompt: value?.autoPrompt ?? false,
  };
}

function resolveAuthHeading(
  manifest: CompiledManifest,
  screen: AuthScreen,
): { title: string; description: string } {
  const branding = manifest.auth?.branding;
  const options = getAuthScreenOptions(manifest, screen);

  return {
    title:
      options?.title ??
      branding?.title ??
      (
        {
          login: "Sign in",
          register: "Create account",
          "forgot-password": "Forgot password",
          "reset-password": "Reset password",
          "verify-email": "Verify email",
          mfa: "Two-factor verification",
        } as const
      )[screen],
    description:
      options?.description ??
      branding?.description ??
      (
        {
          login: "Sign in to continue.",
          register: "Create your account to get started.",
          "forgot-password": "Enter your email and we will send a reset link.",
          "reset-password": "Choose a new password for your account.",
          "verify-email": "Confirm your email address to finish setup.",
          mfa: "Enter the verification code from your authentication method.",
        } as const
      )[screen],
  };
}

function resolveSubmitLabel(
  manifest: CompiledManifest,
  screen: AuthScreen,
  fallback: string,
): string {
  return getAuthScreenOptions(manifest, screen)?.submitLabel ?? fallback;
}

function resolveSectionOrder(
  manifest: CompiledManifest,
  screen: AuthScreen,
  fallback: Array<"form" | "providers" | "passkey" | "links">,
): Array<"form" | "providers" | "passkey" | "links"> {
  return getAuthScreenOptions(manifest, screen)?.sections ?? fallback;
}

function resolveAuxLabel(
  manifest: CompiledManifest,
  screen: AuthScreen,
  key: "providersHeading" | "passkeyButton" | "method" | "resend",
  fallback: string,
): string {
  return getAuthScreenOptions(manifest, screen)?.labels?.[key] ?? fallback;
}

function resolveSuccessMessage(
  manifest: CompiledManifest,
  screen: AuthScreen,
  fallback: string,
): string {
  return getAuthScreenOptions(manifest, screen)?.successMessage ?? fallback;
}

function resolveScreenProviders(
  manifest: CompiledManifest,
  screen: AuthScreen,
): AuthProviderConfig[] {
  const declaredProviders = manifest.auth?.providers ?? {};
  const configuredProviderRefs = getAuthScreenOptions(manifest, screen)?.providers;
  const providerRefs =
    configuredProviderRefs ?? Object.keys(declaredProviders);
  if (providerRefs.length === 0) {
    return [];
  }

  return providerRefs
    .map((providerName) =>
      resolveProviderTarget(providerName, declaredProviders[providerName]),
    )
    .filter((provider): provider is AuthProviderConfig => provider !== null);
}

function resolveProviderMode(
  manifest: CompiledManifest,
  screen: AuthScreen,
): "buttons" | "auto" {
  return (
    getAuthScreenOptions(manifest, screen)?.providerMode ??
    manifest.auth?.providerMode ??
    "buttons"
  );
}

function resolvePasskeyConfig(
  manifest: CompiledManifest,
  screen: AuthScreen,
): AuthPasskeyConfig {
  const screenPasskey = getAuthScreenOptions(manifest, screen)?.passkey;
  if (screenPasskey !== undefined) {
    return normalizePasskeyConfig(screenPasskey);
  }

  return normalizePasskeyConfig(manifest.auth?.passkey);
}

function resolveFieldMeta(
  manifest: CompiledManifest,
  screen: AuthScreen,
  field: "email" | "password" | "name" | "code" | "method",
  fallback: {
    label: string;
    placeholder?: string;
  },
): {
  label: string;
  placeholder?: string;
} {
  const fieldConfig = getAuthScreenOptions(manifest, screen)?.fields?.[field];
  return {
    label: fieldConfig?.label ?? fallback.label,
    placeholder: fieldConfig?.placeholder ?? fallback.placeholder,
  };
}

function resolvePostAuthPath(
  manifest: CompiledManifest,
  search: URLSearchParams,
  flow?: "login" | "register" | "mfa",
): string {
  const redirectTarget = search.get("redirect") ?? search.get("redirectTo");
  if (redirectTarget && redirectTarget.startsWith("/")) {
    return redirectTarget;
  }

  const configuredRedirect =
    flow === "login"
      ? manifest.auth?.redirects?.afterLogin
      : flow === "register"
        ? manifest.auth?.redirects?.afterRegister
        : flow === "mfa"
          ? manifest.auth?.redirects?.afterMfa
          : undefined;

  if (configuredRedirect) {
    return configuredRedirect;
  }

  return resolveHomePath(manifest);
}

function usePendingMfaChallengeState(): [
  MfaChallenge | null,
  (challenge: MfaChallenge | null) => void,
] {
  const challenge = useStateValue(MANIFEST_AUTH_MFA_STATE_KEY, {
    scope: "app",
  }) as MfaChallenge | null | undefined;
  const setChallenge = useSetStateValue(MANIFEST_AUTH_MFA_STATE_KEY, {
    scope: "app",
  });

  return [challenge ?? null, (nextChallenge) => setChallenge(nextChallenge)];
}

function useGuestRouteRedirect(
  manifest: CompiledManifest,
  screen: AuthScreen,
  navigate: (to: string, options?: { replace?: boolean }) => void,
): void {
  const authState = useStateValue("auth", { scope: "app" }) as {
    isAuthenticated?: boolean;
    isLoading?: boolean;
  } | null;

  useEffect(() => {
    if (authState?.isLoading) {
      return;
    }

    if (!authState?.isAuthenticated) {
      return;
    }

    if (
      screen === "login" ||
      screen === "register" ||
      screen === "forgot-password" ||
      screen === "reset-password"
    ) {
      navigate(
        manifest.auth?.redirects?.authenticated ?? resolveHomePath(manifest),
        { replace: true },
      );
    }
  }, [
    authState?.isAuthenticated,
    authState?.isLoading,
    manifest,
    navigate,
    screen,
  ]);
}

function useApplyAuthenticatedUser(manifest: CompiledManifest) {
  const setUser = useSetStateValue("user", { scope: "app" });
  const setAuth = useSetStateValue("auth", { scope: "app" });

  return (user: AuthUser | null) => {
    setUser(user);
    setAuth({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
      isError: false,
      screens: manifest.auth?.screens ?? [],
    });
  };
}

function applyAuthTokens(
  authMode: "cookie" | "token",
  snapshot: Pick<SnapshotInstance, "tokenStorage">,
  response: LoginResponse | Record<string, unknown>,
): void {
  if (authMode === "cookie") {
    return;
  }

  const token =
    typeof response["token"] === "string" ? response["token"] : null;
  const refreshToken =
    typeof response["refreshToken"] === "string"
      ? response["refreshToken"]
      : null;

  if (token) {
    snapshot.tokenStorage.set(token);
  }

  if (refreshToken) {
    snapshot.tokenStorage.setRefreshToken(refreshToken);
  }
}

function AuthShell({
  manifest,
  screen,
  children,
}: {
  manifest: CompiledManifest;
  screen: AuthScreen;
  children: React.ReactNode;
}) {
  const branding = manifest.auth?.branding;
  const { title, description } = resolveAuthHeading(manifest, screen);

  return (
    <main
      data-snapshot-auth-screen={screen}
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--sn-spacing-2xl, 3rem) var(--sn-spacing-md, 1rem)",
        background:
          "linear-gradient(180deg, color-mix(in oklch, var(--sn-color-muted, #f8fafc) 35%, transparent) 0%, var(--sn-color-background, #fff) 100%)",
        color: "var(--sn-color-foreground, #0f172a)",
        fontFamily:
          "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "28rem",
          background: "var(--sn-color-surface, #fff)",
          border:
            "var(--sn-border-default, 1px) solid var(--sn-color-border, rgba(15,23,42,0.08))",
          borderRadius: "var(--sn-radius-xl, 1rem)",
          boxShadow: "var(--sn-shadow-xl, 0 20px 40px rgba(15,23,42,0.08))",
          padding: "clamp(var(--sn-spacing-lg, 1.5rem), 4vw, var(--sn-spacing-2xl, 3rem))",
          fontFamily: "inherit",
        }}
      >
        {branding?.logo ? (
          <img
            src={branding.logo}
            alt={branding.title ?? "Brand logo"}
            style={{
              height: "var(--sn-spacing-2xl, 2.5rem)",
              width: "auto",
              marginBottom: "var(--sn-spacing-md, 1rem)",
            }}
          />
        ) : null}
        <StructuralHeading
          config={{
            type: "heading",
            text: title,
            level: 1,
            style: {
              fontSize: "var(--sn-font-size-2xl, 1.5rem)",
              margin: 0,
              color: "var(--sn-color-foreground, #0f172a)",
              lineHeight: "var(--sn-leading-tight, 1.25)",
              fontFamily: "inherit",
              fontWeight: "var(--sn-font-weight-bold, 700)",
              letterSpacing: "-0.02em",
            },
          }}
        />
        <p
          style={{
            color: "var(--sn-color-muted-foreground, #475569)",
            marginTop: "var(--sn-spacing-xs, 0.5rem)",
            marginBottom: "var(--sn-spacing-lg, 1.5rem)",
            fontSize: "var(--sn-font-size-md, 1rem)",
            lineHeight: "var(--sn-leading-relaxed, 1.75)",
          }}
        >
          {description}
        </p>
        {children}
        <style>{`
          [data-snapshot-auth-screen],
          [data-snapshot-auth-screen] * {
            font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            font-synthesis: none;
          }
        `}</style>
        <style>{BUTTON_INTERACTIVE_CSS}</style>
      </section>
    </main>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <BaseTextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
}

function ErrorMessage({
  error,
  formatError,
  context,
}: {
  error: ApiError | null;
  formatError: (error: ApiError, context: AuthErrorContext) => string;
  context: AuthErrorContext;
}) {
  if (!error) {
    return null;
  }

  return (
    <p
      role="alert"
      style={{
        color: "var(--sn-color-destructive, #b91c1c)",
        marginTop: 0,
        marginBottom: "var(--sn-spacing-sm, 0.875rem)",
        fontSize: "var(--sn-font-size-sm, 0.925rem)",
      }}
    >
      {formatError(error, context)}
    </p>
  );
}

function SuccessMessage({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <p
      style={{
        color: "var(--sn-color-success, #166534)",
        background:
          "color-mix(in oklch, var(--sn-color-success, #22c55e) 10%, var(--sn-color-background, #fff))",
        border:
          "var(--sn-border-default, 1px) solid color-mix(in oklch, var(--sn-color-success, #22c55e) 25%, transparent)",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        padding:
          "var(--sn-spacing-sm, 0.75rem) var(--sn-spacing-md, 0.875rem)",
        marginTop: 0,
        marginBottom: "var(--sn-spacing-sm, 0.875rem)",
        fontSize: "var(--sn-font-size-sm, 0.925rem)",
      }}
    >
      {message}
    </p>
  );
}

function ActionsRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sn-spacing-sm, 0.75rem)",
        marginTop: "var(--sn-spacing-md, 1rem)",
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <ButtonControl
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant="default"
      size="md"
    >
      {children}
    </ButtonControl>
  );
}

function SecondaryButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonControl
      type="button"
      disabled={disabled}
      onClick={onClick}
      variant="secondary"
      size="md"
    >
      {children}
    </ButtonControl>
  );
}

function LinksRow({
  items,
  navigate,
}: {
  items: Array<{ label: string; path: string }>;
  navigate: (to: string) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sn-spacing-xs, 0.625rem)",
        marginTop: "var(--sn-spacing-md, 1rem)",
      }}
    >
      {items.map((item) => (
        <button
          key={item.path}
          type="button"
          onClick={() => navigate(item.path)}
          style={{
            textAlign: "left",
            background: "transparent",
            border: 0,
            color: "var(--sn-color-muted-foreground, #475569)",
            padding: 0,
            cursor: "pointer",
            fontSize: "var(--sn-font-size-sm, 0.925rem)",
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function renderScreenSections(
  sections: Array<"form" | "providers" | "passkey" | "links">,
  blocks: Partial<
    Record<"form" | "providers" | "passkey" | "links", React.ReactNode>
  >,
) {
  return sections.map((section) => {
    const content = blocks[section];
    if (!content) {
      return null;
    }

    return <div key={section}>{content}</div>;
  });
}

function redirectToAuthProvider(
  provider: OAuthProvider,
  getOAuthUrl: (provider: OAuthProvider) => string,
): void {
  const url = getOAuthUrl(provider);
  window.dispatchEvent(
    new CustomEvent("snapshot:auth-provider-redirect", {
      detail: {
        provider,
        url,
      },
    }),
  );
  if (typeof window.location.assign === "function") {
    window.location.assign(url);
    return;
  }
  window.location.href = url;
}

function OAuthButtons({
  providers,
  getOAuthUrl,
  heading,
}: {
  providers: AuthProviderConfig[];
  getOAuthUrl: (provider: OAuthProvider) => string;
  heading: string;
}) {
  if (providers.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "var(--sn-spacing-md, 1rem)" }}>
      <div
        style={{
          position: "relative",
          marginBottom: "var(--sn-spacing-md, 1rem)",
          textAlign: "center",
          color: "var(--sn-color-muted-foreground, #64748b)",
          fontSize: "var(--sn-font-size-xs, 0.825rem)",
        }}
      >
        {heading}
      </div>
      <div style={{ display: "grid", gap: "var(--sn-spacing-sm, 0.625rem)" }}>
        {providers.map((providerConfig) => (
          <SecondaryButton
            key={providerConfig.name}
            onClick={() => {
              redirectToAuthProvider(providerConfig.provider, getOAuthUrl);
            }}
          >
            <span
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: providerConfig.description
                  ? "var(--sn-spacing-2xs, 0.25rem)"
                  : 0,
                textAlign: "center",
              }}
            >
              <span>
                {providerConfig.label ??
                  `Continue with ${providerConfig.provider[0]?.toUpperCase()}${providerConfig.provider.slice(1)}`}
              </span>
              {providerConfig.description ? (
                <span
                  style={{
                    fontSize: "var(--sn-font-size-xs, 0.8rem)",
                    fontWeight: "var(--sn-font-weight-normal, 400)",
                    color: "var(--sn-color-muted-foreground, #475569)",
                  }}
                >
                  {providerConfig.description}
                </span>
              ) : null}
            </span>
          </SecondaryButton>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({
  manifest,
  snapshot,
  runtimeConfig,
  navigate,
  setPendingChallenge,
}: {
  manifest: CompiledManifest;
  snapshot: ManifestAuthScreenProps["snapshot"];
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string) => void;
  setPendingChallenge: (challenge: MfaChallenge | null) => void;
}) {
  const applyAuthenticatedUser = useApplyAuthenticatedUser(manifest);
  const search = useLocationSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginPath = getAuthScreenPath(manifest, "login");
  const registerPath = getAuthScreenPath(manifest, "register");
  const forgotPasswordPath = getAuthScreenPath(manifest, "forgot-password");
  const mfaPath = getAuthScreenPath(manifest, "mfa");
  const providers = resolveScreenProviders(manifest, "login");
  const providerMode = resolveProviderMode(manifest, "login");
  const passkeyConfig = resolvePasskeyConfig(manifest, "login");
  const sectionOrder = resolveSectionOrder(manifest, "login", [
    "form",
    "providers",
    "passkey",
    "links",
  ]);
  const emailField = resolveFieldMeta(manifest, "login", "email", {
    label: "Email",
    placeholder: "you@example.com",
  });
  const passwordField = resolveFieldMeta(manifest, "login", "password", {
    label: "Password",
    placeholder: "Enter your password",
  });
  const configuredLinks = resolveConfiguredLinks(manifest, "login");
  const links =
    configuredLinks.length > 0
      ? configuredLinks
      : [
          ...(registerPath && registerPath !== loginPath
            ? [{ label: "Create account", path: registerPath }]
            : []),
          ...(forgotPasswordPath && forgotPasswordPath !== loginPath
            ? [{ label: "Forgot password?", path: forgotPasswordPath }]
            : []),
        ];
  const mutation = useMutation<
    { type: "user"; user: AuthUser } | { type: "mfa"; challenge: MfaChallenge },
    ApiError,
    { email: string; password: string }
  >({
    mutationFn: async (body) => {
      const response = await snapshot.api.post<LoginResponse>(
        runtimeConfig.contract.endpoints.login,
        body,
      );

      if (response.mfaRequired && response.mfaToken) {
        return {
          type: "mfa",
          challenge: {
            mfaToken: response.mfaToken,
            mfaMethods: response.mfaMethods ?? [],
          },
        };
      }

      applyAuthTokens(runtimeConfig.authMode, snapshot, response);
      const user = await snapshot.api.get<AuthUser>(
        runtimeConfig.contract.endpoints.me,
      );
      return { type: "user", user };
    },
    onSuccess: (result) => {
      if (result.type === "mfa") {
        setPendingChallenge(result.challenge);
        if (mfaPath) {
          navigate(mfaPath);
        }
        return;
      }

      setPendingChallenge(null);
      applyAuthenticatedUser(result.user);
      snapshot.queryClient.setQueryData(AUTH_QUERY_KEY, result.user);
      navigate(resolvePostAuthPath(manifest, search, "login"));
    },
  });
  const passkeyMutation = useMutation<
    { type: "user"; user: AuthUser } | { type: "mfa"; challenge: MfaChallenge },
    ApiError | Error,
    void
  >({
    mutationFn: async () => {
      const { options, passkeyToken } = await snapshot.api.post<{
        options: unknown;
        passkeyToken: string;
      }>(runtimeConfig.contract.endpoints.passkeyLoginOptions, {
        identifier: email || undefined,
      });
      const assertionResponse = await startPasskeyAuthentication(options);
      const response = await snapshot.api.post<LoginResponse>(
        runtimeConfig.contract.endpoints.passkeyLogin,
        {
          passkeyToken,
          assertionResponse,
        },
      );

      if (response.mfaRequired && response.mfaToken) {
        return {
          type: "mfa",
          challenge: {
            mfaToken: response.mfaToken,
            mfaMethods: response.mfaMethods ?? [],
          },
        };
      }

      applyAuthTokens(runtimeConfig.authMode, snapshot, response);
      const user = await snapshot.api.get<AuthUser>(
        runtimeConfig.contract.endpoints.me,
      );
      return { type: "user", user };
    },
    onSuccess: (result) => {
      if (result.type === "mfa") {
        setPendingChallenge(result.challenge);
        if (mfaPath) {
          navigate(mfaPath);
        }
        return;
      }

      setPendingChallenge(null);
      applyAuthenticatedUser(result.user);
      snapshot.queryClient.setQueryData(AUTH_QUERY_KEY, result.user);
      navigate(resolvePostAuthPath(manifest, search, "login"));
    },
  });
  const showPasskey = passkeyConfig.enabled && isPasskeySupported();
  const autoFlowRef = useRef(false);
  const runPasskeyPrompt = useCallback(() => {
    void passkeyMutation.mutateAsync().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        passkeyMutation.reset();
      }
    });
  }, [passkeyMutation]);

  useEffect(() => {
    if (autoFlowRef.current) {
      return;
    }

    if (showPasskey && passkeyConfig.autoPrompt) {
      autoFlowRef.current = true;
      runPasskeyPrompt();
      return;
    }

    const autoRedirectProvider =
      providers.length === 1
        ? providers[0]
        : providers.find((provider) => provider.autoRedirect);

    if (
      !passkeyConfig.autoPrompt &&
      autoRedirectProvider &&
      (providerMode === "auto" || autoRedirectProvider.autoRedirect)
    ) {
      autoFlowRef.current = true;
      redirectToAuthProvider(
        autoRedirectProvider.provider,
        snapshot.getOAuthUrl,
      );
    }
  }, [
    passkeyConfig.autoPrompt,
    providerMode,
    providers,
    runPasskeyPrompt,
    showPasskey,
    snapshot,
  ]);
  const formBlock = (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate({ email, password });
      }}
    >
      <Field
        label={emailField.label}
        type="email"
        value={email}
        onChange={setEmail}
        placeholder={emailField.placeholder}
      />
      <Field
        label={passwordField.label}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={passwordField.placeholder}
        autoComplete="current-password"
      />
      <ErrorMessage
        error={(mutation.error as ApiError | null) ?? null}
        formatError={snapshot.formatAuthError}
        context="login"
      />
      <PrimaryButton
        type="submit"
        disabled={
          mutation.isPending || email.length === 0 || password.length === 0
        }
      >
        {mutation.isPending
          ? "Signing in..."
          : resolveSubmitLabel(manifest, "login", "Sign in")}
      </PrimaryButton>
    </form>
  );
  const providersBlock = (
    <OAuthButtons
      providers={providers}
      getOAuthUrl={snapshot.getOAuthUrl}
      heading={resolveAuxLabel(
        manifest,
        "login",
        "providersHeading",
        "Continue with a provider",
      )}
    />
  );
  const passkeyBlock = showPasskey ? (
    <div
      style={{
        marginTop: "var(--sn-spacing-md, 1rem)",
        display: "grid",
        gap: "var(--sn-spacing-sm, 0.75rem)",
      }}
    >
      <ErrorMessage
        error={
          passkeyMutation.error instanceof Error &&
          "status" in passkeyMutation.error
            ? (passkeyMutation.error as ApiError)
            : null
        }
        formatError={snapshot.formatAuthError}
        context="login"
      />
      <SecondaryButton
        disabled={passkeyMutation.isPending}
        onClick={runPasskeyPrompt}
      >
        {passkeyMutation.isPending
          ? "Signing in..."
          : resolveAuxLabel(
              manifest,
              "login",
              "passkeyButton",
              "Sign in with passkey",
            )}
      </SecondaryButton>
    </div>
  ) : null;
  const linksBlock = <LinksRow items={links} navigate={navigate} />;

  return (
    <AuthShell manifest={manifest} screen="login">
      {renderScreenSections(sectionOrder, {
        form: formBlock,
        providers: providersBlock,
        passkey: passkeyBlock,
        links: linksBlock,
      })}
    </AuthShell>
  );
}

function RegisterScreen({
  manifest,
  snapshot,
  runtimeConfig,
  navigate,
}: {
  manifest: CompiledManifest;
  snapshot: ManifestAuthScreenProps["snapshot"];
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string) => void;
}) {
  const applyAuthenticatedUser = useApplyAuthenticatedUser(manifest);
  const search = useLocationSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const loginPath = getAuthScreenPath(manifest, "login");
  const providers = resolveScreenProviders(manifest, "register");
  const providerMode = resolveProviderMode(manifest, "register");
  const sectionOrder = resolveSectionOrder(manifest, "register", [
    "form",
    "providers",
    "links",
  ]);
  const nameField = resolveFieldMeta(manifest, "register", "name", {
    label: "Name",
    placeholder: "Your name",
  });
  const emailField = resolveFieldMeta(manifest, "register", "email", {
    label: "Email",
    placeholder: "you@example.com",
  });
  const passwordField = resolveFieldMeta(manifest, "register", "password", {
    label: "Password",
    placeholder: "Create a password",
  });
  const configuredLinks = resolveConfiguredLinks(manifest, "register");
  const autoFlowRef = useRef(false);
  const mutation = useMutation<AuthUser, ApiError, RegisterVars>({
    mutationFn: async (body) => {
      const response = await snapshot.api.post<Record<string, unknown>>(
        runtimeConfig.contract.endpoints.register,
        body,
      );
      applyAuthTokens(runtimeConfig.authMode, snapshot, response);
      return snapshot.api.get<AuthUser>(runtimeConfig.contract.endpoints.me);
    },
    onSuccess: (user) => {
      applyAuthenticatedUser(user);
      snapshot.queryClient.setQueryData(AUTH_QUERY_KEY, user);
      navigate(resolvePostAuthPath(manifest, search, "register"));
    },
  });

  useEffect(() => {
    if (autoFlowRef.current) {
      return;
    }

    const autoRedirectProvider =
      providers.length === 1
        ? providers[0]
        : providers.find((provider) => provider.autoRedirect);

    if (
      autoRedirectProvider &&
      (providerMode === "auto" || autoRedirectProvider.autoRedirect)
    ) {
      autoFlowRef.current = true;
      redirectToAuthProvider(
        autoRedirectProvider.provider,
        snapshot.getOAuthUrl,
      );
    }
  }, [providerMode, providers, snapshot]);

  const formBlock = (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate({ email, password, name });
      }}
    >
      <Field
        label={nameField.label}
        value={name}
        onChange={setName}
        placeholder={nameField.placeholder}
      />
      <Field
        label={emailField.label}
        type="email"
        value={email}
        onChange={setEmail}
        placeholder={emailField.placeholder}
      />
      <Field
        label={passwordField.label}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={passwordField.placeholder}
        autoComplete="new-password"
      />
      <ErrorMessage
        error={mutation.error ?? null}
        formatError={snapshot.formatAuthError}
        context="register"
      />
      <PrimaryButton
        type="submit"
        disabled={
          mutation.isPending || email.length === 0 || password.length === 0
        }
      >
        {mutation.isPending
          ? "Creating account..."
          : resolveSubmitLabel(manifest, "register", "Create account")}
      </PrimaryButton>
    </form>
  );
  const providersBlock = (
    <OAuthButtons
      providers={providers}
      getOAuthUrl={snapshot.getOAuthUrl}
      heading={resolveAuxLabel(
        manifest,
        "register",
        "providersHeading",
        "Continue with a provider",
      )}
    />
  );
  const linksBlock = (
    <LinksRow
      items={
        configuredLinks.length > 0
          ? configuredLinks
          : loginPath
            ? [{ label: "Already have an account? Sign in", path: loginPath }]
            : []
      }
      navigate={navigate}
    />
  );

  return (
    <AuthShell manifest={manifest} screen="register">
      {renderScreenSections(sectionOrder, {
        form: formBlock,
        providers: providersBlock,
        links: linksBlock,
      })}
    </AuthShell>
  );
}

function ForgotPasswordScreen({
  manifest,
  snapshot,
  runtimeConfig,
  navigate,
}: {
  manifest: CompiledManifest;
  snapshot: ManifestAuthScreenProps["snapshot"];
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const loginPath = getAuthScreenPath(manifest, "login");
  const sectionOrder = resolveSectionOrder(manifest, "forgot-password", [
    "form",
    "links",
  ]);
  const emailField = resolveFieldMeta(manifest, "forgot-password", "email", {
    label: "Email",
    placeholder: "you@example.com",
  });
  const configuredLinks = resolveConfiguredLinks(manifest, "forgot-password");
  const mutation = useMutation<
    { message?: string } | void,
    ApiError,
    { email: string }
  >({
    mutationFn: (body) =>
      snapshot.api.post<{ message?: string } | void>(
        runtimeConfig.contract.endpoints.forgotPassword,
        body,
      ),
    onSuccess: (data) => {
      setMessage(
        data && typeof data === "object" && typeof data["message"] === "string"
          ? String(data["message"])
          : resolveSuccessMessage(
              manifest,
              "forgot-password",
              "If that email is registered, you will receive a reset link shortly.",
            ),
      );
    },
  });
  const formBlock = (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);
        mutation.mutate({ email });
      }}
    >
      <Field
        label={emailField.label}
        type="email"
        value={email}
        onChange={setEmail}
        placeholder={emailField.placeholder}
      />
      <SuccessMessage message={message} />
      <ErrorMessage
        error={mutation.error ?? null}
        formatError={snapshot.formatAuthError}
        context="forgot-password"
      />
      <PrimaryButton
        type="submit"
        disabled={mutation.isPending || email.length === 0}
      >
        {mutation.isPending
          ? "Sending reset link..."
          : resolveSubmitLabel(manifest, "forgot-password", "Send reset link")}
      </PrimaryButton>
    </form>
  );
  const linksBlock = (
    <LinksRow
      items={
        configuredLinks.length > 0
          ? configuredLinks
          : loginPath
            ? [{ label: "Back to sign in", path: loginPath }]
            : []
      }
      navigate={navigate}
    />
  );

  return (
    <AuthShell manifest={manifest} screen="forgot-password">
      {renderScreenSections(sectionOrder, {
        form: formBlock,
        links: linksBlock,
      })}
    </AuthShell>
  );
}

function ResetPasswordScreen({
  manifest,
  snapshot,
  runtimeConfig,
  navigate,
}: {
  manifest: CompiledManifest;
  snapshot: ManifestAuthScreenProps["snapshot"];
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string) => void;
}) {
  const search = useLocationSearch();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const token = search.get("token") ?? "";
  const loginPath = getAuthScreenPath(manifest, "login");
  const sectionOrder = resolveSectionOrder(manifest, "reset-password", [
    "form",
    "links",
  ]);
  const passwordField = resolveFieldMeta(
    manifest,
    "reset-password",
    "password",
    {
      label: "New password",
      placeholder: "Create a new password",
    },
  );
  const configuredLinks = resolveConfiguredLinks(manifest, "reset-password");
  const mutation = useMutation<
    { message?: string },
    ApiError,
    ResetPasswordBody
  >({
    mutationFn: (body) =>
      snapshot.api.post<{ message?: string }>(
        runtimeConfig.contract.endpoints.resetPassword,
        body,
      ),
    onSuccess: (data) => {
      setMessage(
        data.message ??
          resolveSuccessMessage(
            manifest,
            "reset-password",
            "Your password has been reset.",
          ),
      );
    },
  });
  const formBlock = (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!token) {
          return;
        }
        setMessage(null);
        mutation.mutate({ token, password });
      }}
    >
      <Field
        label={passwordField.label}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={passwordField.placeholder}
        autoComplete="new-password"
      />
      {!token ? (
      <p
        role="alert"
        style={{
          color: "var(--sn-color-destructive, #b91c1c)",
          marginTop: 0,
        }}
      >
        This reset link is missing a token.
      </p>
      ) : null}
      <SuccessMessage message={message} />
      <ErrorMessage
        error={mutation.error ?? null}
        formatError={snapshot.formatAuthError}
        context="reset-password"
      />
      <PrimaryButton
        type="submit"
        disabled={
          mutation.isPending || password.length === 0 || token.length === 0
        }
      >
        {mutation.isPending
          ? "Resetting password..."
          : resolveSubmitLabel(manifest, "reset-password", "Reset password")}
      </PrimaryButton>
    </form>
  );
  const linksBlock =
    configuredLinks.length > 0 ? (
      <LinksRow items={configuredLinks} navigate={navigate} />
    ) : loginPath ? (
      <ActionsRow>
        <SecondaryButton onClick={() => navigate(loginPath)}>
          Back to sign in
        </SecondaryButton>
      </ActionsRow>
    ) : null;

  return (
    <AuthShell manifest={manifest} screen="reset-password">
      {renderScreenSections(sectionOrder, {
        form: formBlock,
        links: linksBlock,
      })}
    </AuthShell>
  );
}

function VerifyEmailScreen({
  manifest,
  snapshot,
  runtimeConfig,
  navigate,
}: {
  manifest: CompiledManifest;
  snapshot: ManifestAuthScreenProps["snapshot"];
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string) => void;
}) {
  const search = useLocationSearch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const token = search.get("token") ?? "";
  const loginPath = getAuthScreenPath(manifest, "login");
  const sectionOrder = resolveSectionOrder(manifest, "verify-email", [
    "form",
    "links",
  ]);
  const emailField = resolveFieldMeta(manifest, "verify-email", "email", {
    label: "Email",
    placeholder: "you@example.com",
  });
  const configuredLinks = resolveConfiguredLinks(manifest, "verify-email");
  const hasTriggeredRef = useRef(false);
  const mutation = useMutation<{ message?: string }, ApiError, VerifyEmailBody>(
    {
      mutationFn: (body) =>
        snapshot.api.post<{ message?: string }>(
          runtimeConfig.contract.endpoints.verifyEmail,
          body,
        ),
      onSuccess: (data) => {
        setMessage(
          data.message ??
            resolveSuccessMessage(
              manifest,
              "verify-email",
              "Your email has been verified.",
            ),
        );
      },
    },
  );
  const resendMutation = useMutation<
    { message?: string },
    ApiError,
    { email: string }
  >({
    mutationFn: (body) =>
      snapshot.api.post<{ message?: string }>(
        runtimeConfig.contract.endpoints.resendVerification,
        body,
      ),
    onSuccess: (data) => {
      setMessage(
        data.message ??
          resolveSuccessMessage(
            manifest,
            "verify-email",
            "Verification email sent.",
          ),
      );
    },
  });

  useEffect(() => {
    if (!token || hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;
    mutation.mutate({ token });
  }, [mutation, token]);
  const formBlock = (
    <>
      {!token ? (
        <>
          <p
            role="alert"
            style={{
              color: "var(--sn-color-destructive, #b91c1c)",
              marginTop: 0,
            }}
          >
            This verification link is missing a token.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMessage(null);
              resendMutation.mutate({ email });
            }}
          >
            <Field
              label={emailField.label}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder={emailField.placeholder}
            />
            <PrimaryButton
              type="submit"
              disabled={resendMutation.isPending || email.length === 0}
            >
              {resendMutation.isPending
                ? "Sending verification..."
                : resolveSubmitLabel(
                    manifest,
                    "verify-email",
                    "Resend verification email",
                  )}
            </PrimaryButton>
          </form>
        </>
      ) : null}
      <SuccessMessage message={message} />
      <ErrorMessage
        error={mutation.error ?? resendMutation.error ?? null}
        formatError={snapshot.formatAuthError}
        context="verify-email"
      />
    </>
  );
  const linksBlock =
    configuredLinks.length > 0 ? (
      <LinksRow items={configuredLinks} navigate={navigate} />
    ) : loginPath ? (
      <ActionsRow>
        <PrimaryButton onClick={() => navigate(loginPath)}>
          Continue to sign in
        </PrimaryButton>
      </ActionsRow>
    ) : null;

  return (
    <AuthShell manifest={manifest} screen="verify-email">
      {renderScreenSections(sectionOrder, {
        form: formBlock,
        links: linksBlock,
      })}
    </AuthShell>
  );
}

function MfaScreen({
  manifest,
  snapshot,
  runtimeConfig,
  navigate,
  pendingChallenge,
  setPendingChallenge,
}: {
  manifest: CompiledManifest;
  snapshot: ManifestAuthScreenProps["snapshot"];
  runtimeConfig: ManifestAuthRuntimeConfig;
  navigate: (to: string) => void;
  pendingChallenge: MfaChallenge | null;
  setPendingChallenge: (challenge: MfaChallenge | null) => void;
}) {
  const applyAuthenticatedUser = useApplyAuthenticatedUser(manifest);
  const search = useLocationSearch();
  const [code, setCode] = useState("");
  const [method, setMethod] = useState<MfaMethod>(
    pendingChallenge?.mfaMethods[0] ?? ("totp" as const),
  );
  const [message, setMessage] = useState<string | null>(null);
  const loginPath = getAuthScreenPath(manifest, "login");
  const sectionOrder = resolveSectionOrder(manifest, "mfa", ["form", "links"]);
  const codeField = resolveFieldMeta(manifest, "mfa", "code", {
    label: "Verification code",
    placeholder: "Enter the code",
  });
  const methodField = resolveFieldMeta(manifest, "mfa", "method", {
    label: "Method",
  });
  const configuredLinks = resolveConfiguredLinks(manifest, "mfa");
  const mutation = useMutation<
    AuthUser,
    ApiError,
    { code: string; method: string }
  >({
    mutationFn: async (body) => {
      if (!pendingChallenge) {
        throw new Error("No pending MFA challenge");
      }

      const response = await snapshot.api.post<LoginResponse>(
        runtimeConfig.contract.endpoints.mfaVerify,
        {
          mfaToken: pendingChallenge.mfaToken,
          code: body.code,
          method: body.method,
        },
      );

      applyAuthTokens(runtimeConfig.authMode, snapshot, response);
      return snapshot.api.get<AuthUser>(runtimeConfig.contract.endpoints.me);
    },
    onSuccess: (user) => {
      setPendingChallenge(null);
      applyAuthenticatedUser(user);
      snapshot.queryClient.setQueryData(AUTH_QUERY_KEY, user);
      navigate(resolvePostAuthPath(manifest, search, "mfa"));
    },
  });
  const resendMutation = useMutation<{ message?: string }, ApiError, void>({
    mutationFn: async () => {
      if (!pendingChallenge) {
        throw new Error("No pending MFA challenge");
      }

      return snapshot.api.post<{ message?: string }>(
        runtimeConfig.contract.endpoints.mfaResend,
        {
          mfaToken: pendingChallenge.mfaToken,
        },
      );
    },
    onSuccess: (data) => {
      setMessage(
        data.message ??
          resolveSuccessMessage(
            manifest,
            "mfa",
            "A new verification code has been sent.",
          ),
      );
    },
  });

  useEffect(() => {
    if (pendingChallenge?.mfaMethods[0]) {
      setMethod(pendingChallenge.mfaMethods[0]);
    }
  }, [pendingChallenge]);
  const formBlock = !pendingChallenge ? (
    <p
      style={{
        color: "var(--sn-color-muted-foreground, #475569)",
        marginTop: 0,
      }}
    >
      There is no active verification challenge.
    </p>
  ) : (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);
        mutation.mutate({ code, method });
      }}
    >
      <Field
        label={codeField.label}
        value={code}
        onChange={setCode}
        placeholder={codeField.placeholder}
      />
      {pendingChallenge.mfaMethods.length > 1 ? (
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sn-spacing-2xs, 0.375rem)",
            marginBottom: "var(--sn-spacing-sm, 0.875rem)",
          }}
        >
          <span
            style={{
              fontSize: "var(--sn-font-size-sm, 0.925rem)",
              fontWeight: "var(--sn-font-weight-semibold, 600)",
              color: "var(--sn-color-foreground, #0f172a)",
            }}
          >
            {methodField.label}
          </span>
          <select
            value={method}
            onChange={(event) =>
              setMethod(event.currentTarget.value as MfaMethod)
            }
            style={{
              backgroundColor: "var(--sn-color-background, #fff)",
              color: "var(--sn-color-foreground, #0f172a)",
              border:
                "var(--sn-border-default, 1px) solid var(--sn-color-input, var(--sn-color-border, rgba(15,23,42,0.14)))",
              borderRadius: "var(--sn-radius-lg, 0.75rem)",
              padding:
                "var(--sn-spacing-sm, 0.75rem) var(--sn-spacing-md, 0.875rem)",
              fontSize: "var(--sn-font-size-md, 1rem)",
            }}
          >
            {pendingChallenge.mfaMethods.map((candidate) => (
              <option key={candidate} value={candidate}>
                {candidate}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <SuccessMessage message={message} />
      <ErrorMessage
        error={(mutation.error as ApiError | null) ?? null}
        formatError={snapshot.formatAuthError}
        context="login"
      />
      <PrimaryButton
        type="submit"
        disabled={mutation.isPending || code.length === 0}
      >
        {mutation.isPending
          ? "Verifying..."
          : resolveSubmitLabel(manifest, "mfa", "Verify")}
      </PrimaryButton>
      {pendingChallenge.mfaMethods.includes("emailOtp") ? (
        <div style={{ marginTop: "var(--sn-spacing-sm, 0.75rem)" }}>
          <SecondaryButton
            disabled={resendMutation.isPending}
            onClick={() => {
              setMessage(null);
              resendMutation.mutate();
            }}
          >
            {resendMutation.isPending
              ? "Sending..."
              : resolveAuxLabel(manifest, "mfa", "resend", "Resend code")}
          </SecondaryButton>
        </div>
      ) : null}
    </form>
  );
  const linksBlock =
    configuredLinks.length > 0 ? (
      <LinksRow items={configuredLinks} navigate={navigate} />
    ) : loginPath ? (
      <ActionsRow>
        <PrimaryButton onClick={() => navigate(loginPath)}>
          Back to sign in
        </PrimaryButton>
      </ActionsRow>
    ) : null;

  return (
    <AuthShell manifest={manifest} screen="mfa">
      {renderScreenSections(sectionOrder, {
        form: formBlock,
        links: linksBlock,
      })}
    </AuthShell>
  );
}

/**
 * Render the configured auth screen for the active route.
 *
 * @param props - Auth screen runtime props
 * @returns The auth screen content for the route
 */
export function ManifestAuthScreen({
  manifest,
  route,
  screen,
  snapshot,
  runtimeConfig,
  navigate,
}: ManifestAuthScreenProps) {
  const [pendingChallenge, setPendingChallenge] = usePendingMfaChallengeState();

  useGuestRouteRedirect(manifest, screen, navigate);

  switch (screen) {
    case "login":
      return (
        <LoginScreen
          manifest={manifest}
          snapshot={snapshot}
          runtimeConfig={runtimeConfig}
          navigate={navigate}
          setPendingChallenge={setPendingChallenge}
        />
      );
    case "register":
      return (
        <RegisterScreen
          manifest={manifest}
          snapshot={snapshot}
          runtimeConfig={runtimeConfig}
          navigate={navigate}
        />
      );
    case "forgot-password":
      return (
        <ForgotPasswordScreen
          manifest={manifest}
          snapshot={snapshot}
          runtimeConfig={runtimeConfig}
          navigate={navigate}
        />
      );
    case "reset-password":
      return (
        <ResetPasswordScreen
          manifest={manifest}
          snapshot={snapshot}
          runtimeConfig={runtimeConfig}
          navigate={navigate}
        />
      );
    case "verify-email":
      return (
        <VerifyEmailScreen
          manifest={manifest}
          snapshot={snapshot}
          runtimeConfig={runtimeConfig}
          navigate={navigate}
        />
      );
    case "mfa":
      return (
        <MfaScreen
          manifest={manifest}
          snapshot={snapshot}
          runtimeConfig={runtimeConfig}
          navigate={navigate}
          pendingChallenge={pendingChallenge}
          setPendingChallenge={setPendingChallenge}
        />
      );
    default:
      return route.page.content ? null : null;
  }
}

/**
 * Build the runtime auth config from the compiled manifest.
 *
 * @param apiUrl - Backend API base URL
 * @param manifest - Compiled manifest, used for auth contract overrides
 * @returns Runtime auth configuration derived from manifest auth settings
 */
export function createManifestAuthRuntimeConfig(
  apiUrl: string,
  manifest: CompiledManifest,
): ManifestAuthRuntimeConfig {
  return {
    authMode: manifest.auth?.session?.mode ?? "cookie",
    contract: mergeContract(apiUrl, manifest.auth?.contract),
  };
}
