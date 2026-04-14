# Snapshot API Cheatsheet

> Auto-generated from source. For full details see the reference pages under `apps/docs/src/content/docs/reference/`.

## SDK (`@lastshotlabs/snapshot`)

### Factory
- `createSnapshot<TWSEvents extends Record<string, unknown> = Record<string, unknown>>(config: SnapshotConfig) => Snapsh...` — Create a per-instance snapshot runtime from bootstrap config and a manifest.

### API Client
- `ApiError` *(class)* — HTTP error thrown by Snapshot API clients for non-success responses.
- `getRegisteredClient(name: string) => ClientFactory | undefined` — Look up a previously registered custom client factory.
- `registerClient(name: string, factory: ClientFactory) => void` — Register a named custom client factory.

### Auth
- `AuthContract` *(interface)* — Full auth contract used by `createSnapshot()` to build auth URLs and requests.
- `AuthContractConfig` *(interface)* — Partial auth contract overrides.
- `AuthEndpoints` *(interface)* — Relative auth endpoint paths used by Snapshot's built-in auth hooks.
- `AuthErrorConfig` *(interface)* — Optional configuration for auth error formatting.
- `AuthErrorContext` *(typealias)* — Auth UI contexts that can provide custom error messaging.
- `AuthHeaders` *(interface)* — Header names Snapshot sends for session and CSRF-aware auth requests.
- `AuthUser` *(interface)* — Minimal authenticated user shape returned by Snapshot auth hooks.
- `createAuthErrorFormatter(config?: AuthErrorConfig | undefined) => (error: ApiError, context: AuthErrorContext) => string` — Create a reusable auth error formatter with shared formatting rules.
- `defaultContract(apiUrl: string) => AuthContract` — Create the built-in auth contract for a given API base URL.
- `ForgotPasswordBody` *(interface)* — Request body for the forgot-password endpoint.
- `formatAuthError(error: ApiError, context: AuthErrorContext, config?: AuthErrorConfig | undefined) => string` — Format a raw auth `ApiError` into the message shown to application code.
- `isMfaChallenge(result: LoginResult) => result is MfaChallenge` — Narrow a login result to the MFA challenge branch.
- `LoginBody` *(interface)* — Credentials posted to the login endpoint.
- `LoginResponse` *(interface)* — Raw login response shape from bunshot (includes MFA fields)
- `LoginResult` *(typealias)* — useLogin resolves to either a user or an MFA challenge
- `LoginVars` *(typealias)* — Login variables accepted by `useLogin()`.
- `LogoutVars` *(interface)* — Logout options accepted by `useLogout()`.
- `mergeContract(apiUrl: string, partial?: AuthContractConfig | undefined) => AuthContract` — Merge a partial auth contract override with the built-in defaults.
- `MfaChallenge` *(interface)* — Returned by useLogin when mfaRequired is true
- `MfaDisableBody` *(interface)* — Request body for disabling MFA.
- `MfaEmailOtpDisableBody` *(interface)* — Request body for disabling email OTP MFA.
- `MfaEmailOtpEnableResponse` *(interface)* — Response returned when email OTP MFA setup begins.
- `MfaEmailOtpVerifySetupBody` *(interface)* — Request body for confirming email OTP MFA setup.
- `MfaMethod` *(typealias)* — MFA method identifiers supported by Snapshot's auth contract.
- `MfaMethodsResponse` *(interface)* — Response listing the enabled MFA methods for the current user.
- `MfaRecoveryCodesBody` *(interface)* — Request body for regenerating recovery codes.
- `MfaRecoveryCodesResponse` *(interface)* — Recovery codes returned by the auth API.
- `MfaResendBody` *(interface)* — Request body for resending an MFA challenge.
- `MfaSetupResponse` *(interface)* — Setup payload returned when provisioning TOTP MFA.
- `MfaVerifyBody` *(interface)* — Request body for verifying an MFA challenge.
- `MfaVerifySetupBody` *(interface)* — Verification body for confirming an MFA setup flow.
- `MfaVerifySetupResponse` *(interface)* — Response returned after successful MFA setup verification.
- `OAuthExchangeBody` *(interface)* — Request body for exchanging an OAuth callback code.
- `OAuthExchangeResponse` *(interface)* — Tokens returned after a successful OAuth exchange.
- `OAuthProvider` *(typealias)* — OAuth provider identifier used by auth URL helpers and OAuth hooks.
- `PasskeyLoginBody` *(interface)* — Request body for completing a passkey login.
- `PasskeyLoginOptionsBody` *(interface)* — Request body for retrieving passkey login options.
- `PasskeyLoginOptionsResponse` *(interface)* — Response returned when beginning a passkey login flow.
- `PasskeyLoginVars` *(typealias)* — Passkey login variables accepted by `usePasskeyLogin()`.
- `RefreshTokenBody` *(interface)* — Request body for refreshing auth tokens.
- `RefreshTokenResponse` *(interface)* — Token refresh response returned by the auth API.
- `RegisterBody` *(interface)* — Registration payload posted to the register endpoint.
- `RegisterVars` *(typealias)* — Registration variables accepted by `useRegister()`.
- `ResendVerificationBody` *(interface)* — Request body for sending a new verification email.
- `ResetPasswordBody` *(interface)* — Request body for completing a password reset flow.
- `Session` *(interface)* — Active session metadata returned by session-management hooks.
- `SetPasswordBody` *(interface)* — Request body for setting or rotating an account password.
- `TokenStorage` *(interface)* — Per-instance token storage used by Snapshot auth flows.
- `WebAuthnCredential` *(interface)* — Registered WebAuthn credential metadata.
- `WebAuthnRegisterBody` *(interface)* — Request body for registering a WebAuthn credential.
- `WebAuthnRegisterOptionsResponse` *(interface)* — Response returned when requesting WebAuthn registration options.

### Community
- `BanBody` *(interface)* — Request body for creating a user ban.
- `BanCheckResponse` *(interface)* — Result returned when checking whether a user is banned.
- `BanResponse` *(interface)* — Ban record returned by moderation endpoints.
- `communityContract` — Built-in route contract for Snapshot community APIs.
- `CommunityHooks` *(typealias)* — Hook surface returned by `createCommunityHooks()`.
- `CommunityNotification` *(interface)* — Normalized notification shape used by `useCommunityNotifications()`.
- `CommunityNotificationType` *(typealias)* — Community notification types surfaced by Snapshot's notification helpers.
- `CommunitySearchParams` *(interface)* — Search parameters accepted by the community search hooks.
- `ContainerResponse` *(interface)* — Community container returned by the community API.
- `CreateContainerBody` *(interface)* — Request body for creating a community container.
- `CreateReplyBody` *(interface)* — Request body for creating a reply.
- `CreateThreadBody` *(interface)* — Request body for creating a thread in a container.
- `ListParams` *(interface)* — Shared page-based pagination parameters.
- `NotificationResponse` *(interface)* — Notification record returned by community notification endpoints.
- `PaginatedResponse` *(interface)* — Generic paginated list response used by community and webhook list endpoints.
- `ReactionBody` *(interface)* — Emoji reaction payload for thread and reply reaction endpoints.
- `ReplyListParams` *(interface)* — List parameters for fetching replies in a specific thread.
- `ReplyResponse` *(interface)* — Reply record returned by the community API.
- `ReportBody` *(interface)* — Request body for filing a community moderation report.
- `ReportResponse` *(interface)* — Report record returned by moderation endpoints.
- `ResolveReportBody` *(interface)* — Request body for resolving a moderation report.
- `SearchResponse` *(interface)* — Search results returned by the thread and reply search endpoints.
- `ThreadListParams` *(interface)* — List parameters for fetching threads in a specific container.
- `ThreadResponse` *(interface)* — Thread record returned by the community API.
- `UpdateContainerBody` *(interface)* — Request body for updating a community container.
- `UpdateReplyBody` *(interface)* — Request body for updating an existing reply.
- `UpdateThreadBody` *(interface)* — Request body for updating or moderating a thread.
- `UseCommunityNotificationsOpts` *(interface)* — Options for the community notifications hook.
- `UseCommunityNotificationsResult` *(interface)* — Return shape of `useCommunityNotifications()`.

### Webhooks
- `CreateWebhookEndpointBody` *(interface)* — Request body for creating a webhook endpoint.
- `ListWebhookDeliveriesParams` *(interface)* — Parameters for listing deliveries for a single webhook endpoint.
- `ListWebhookEndpointsParams` *(interface)* — Page-based pagination parameters for listing webhook endpoints.
- `TestWebhookBody` *(interface)* — Request body for sending a test delivery through a webhook endpoint.
- `UpdateWebhookEndpointBody` *(interface)* — Request body for updating a webhook endpoint.
- `WebhookDeliveryResponse` *(interface)* — Delivery record returned for a webhook endpoint event attempt.
- `WebhookEndpointResponse` *(interface)* — Webhook endpoint record returned by the webhook API.
- `WebhookHooks` *(typealias)* — Hook surface returned by `createWebhookHooks()`.
- `webhooksContract` — Built-in route contract for Snapshot webhook APIs.

### Plugins
- `definePlugin(plugin: SnapshotPlugin) => SnapshotPlugin` — Identity function for defining plugins with full type inference.
- `PluginComponentEntry` *(interface)* — A component entry in a plugin: the React component + its Zod schema.
- `PluginComponentGroupDefinition` *(interface)* — A component group definition in a plugin.
- `PluginSetupContext` *(interface)* — Context passed to plugin setup() hooks.
- `SnapshotPlugin` *(interface)* — Snapshot plugin interface.

### Push Notifications
- `PushState` *(typealias)* — High-level browser push subscription state reported by `usePushNotifications()`.
- `usePushNotifications(opts?: UsePushNotificationsOpts | undefined) => UsePushNotificationsResult` — Standalone hook for Web Push subscription management.
- `UsePushNotificationsOpts` *(interface)* — Optional overrides for the manifest-backed push configuration.
- `UsePushNotificationsResult` *(interface)* — Return shape of `usePushNotifications()`.

### Realtime
- `SocketHook` *(interface)* — Realtime websocket control surface returned by `useSocket()`.
- `SseConfig` *(interface)* — SSE configuration.
- `SseConnectionStatus` *(typealias)* — Lifecycle state of a managed SSE connection.
- `SseEndpointConfig` *(interface)* — Per-endpoint SSE behavior configuration.
- `SseEventHookResult` *(interface)* — Return type of useSseEvent<T>(endpoint, event)
- `SseHookResult` *(interface)* — Return type of useSSE(endpoint)
- `WebSocketManager` *(class)* — Per-instance WebSocket connection manager.

### Schema Generation
- `generateManifestSchema(options: GenerateOptions) => void` — Generate a JSON Schema for the snapshot manifest and write it to disk.

### Other
- `DeleteAccountBody` *(interface)* — Request body for deleting the current account.
- `RequestOptions` *(interface)* — Optional overrides for individual API client requests.
- `SnapshotConfig` *(interface)* — Bootstrap configuration for `createSnapshot()`.
- `SnapshotInstance` *(interface)* — Runtime surface returned by `createSnapshot()`.
- `VerifyEmailBody` *(interface)* — Request body for confirming email verification.

## SnapshotInstance Hook Surface

These are the hooks and methods available on the object returned by `createSnapshot()`.

### Auth
- `useUser`: `() => { user: AuthUser | null; isLoading: boolean; isError: boolean; }` — Fetch the current authenticated user.
- `useLogin`: `() => UseMutationResult<LoginResult, ApiError, LoginVars>` — Post credentials and log in.
- `useLogout`: `() => UseMutationResult<void, ApiError, void | LogoutVars>` — Clear the session, tokens, and query cache.
- `useRegister`: `() => UseMutationResult<AuthUser, ApiError, RegisterVars>` — Create a new account.
- `useForgotPassword`: `() => UseMutationResult<void, ApiError, ForgotPasswordBody>` — Send a password-reset email to the given address.
- `isMfaChallenge`: `(result: LoginResult) => result is MfaChallenge` — Type-narrowing guard: returns true when a login result is an MFA challenge.
- `formatAuthError`: `(error: ApiError, context: AuthErrorContext) => string` — Format an API error into a user-facing auth error message using optional per-context overrides.

### Theme
- `useTheme`: `() => { theme: "light" | "dark"; toggle: () => void; set: (t: "light" | "dark...` — Read and toggle the current color theme (light/dark).

### MFA
- `usePendingMfaChallenge`: `() => MfaChallenge | null` — Read the pending MFA challenge set by a login that returned `mfaRequired: true`.
- `useMfaVerify`: `() => UseMutationResult<AuthUser, ApiError, Omit<MfaVerifyBody, "mfaToken">>` — Verify an MFA code against the pending challenge.
- `useMfaSetup`: `() => UseMutationResult<MfaSetupResponse, ApiError, void>` — Begin TOTP MFA provisioning.
- `useMfaVerifySetup`: `() => UseMutationResult<MfaVerifySetupResponse, ApiError, MfaVerifySetupBody>` — Confirm TOTP MFA setup by verifying a code from the authenticator app.
- `useMfaDisable`: `() => UseMutationResult<{ message: string; }, ApiError, MfaDisableBody>` — Disable MFA for the current user.
- `useMfaRecoveryCodes`: `() => UseMutationResult<MfaRecoveryCodesResponse, ApiError, MfaRecoveryCodesB...` — Regenerate MFA recovery codes.
- `useMfaEmailOtpEnable`: `() => UseMutationResult<MfaEmailOtpEnableResponse, ApiError, void>` — Begin email OTP MFA enrollment.
- `useMfaEmailOtpVerifySetup`: `() => UseMutationResult<MfaVerifySetupResponse, ApiError, MfaEmailOtpVerifySe...` — Confirm email OTP MFA setup by verifying the emailed code.
- `useMfaEmailOtpDisable`: `() => UseMutationResult<{ message: string; }, ApiError, MfaEmailOtpDisableBody>` — Disable email OTP MFA for the current user.
- `useMfaResend`: `() => UseMutationResult<{ message: string; }, ApiError, MfaResendBody>` — Resend the MFA challenge code (email OTP or SMS).
- `useMfaMethods`: `() => { methods: MfaMethod[] | null; isLoading: boolean; isError: boolean; }` — List MFA methods currently enabled for the authenticated user.

### Account
- `useResetPassword`: `() => UseMutationResult<{ message: string; }, ApiError, ResetPasswordBody>` — Complete a password reset using the token from the reset email.
- `useVerifyEmail`: `() => UseMutationResult<{ message: string; }, ApiError, VerifyEmailBody>` — Confirm the user's email address using a verification token.
- `useResendVerification`: `() => UseMutationResult<{ message: string; }, ApiError, ResendVerificationBody>` — Request a new verification email for the current user.
- `useSetPassword`: `() => UseMutationResult<{ message: string; }, ApiError, SetPasswordBody>` — Set or rotate the account password.
- `useDeleteAccount`: `() => UseMutationResult<void, ApiError, void | DeleteAccountBody>` — Schedule the current account for deletion.
- `useCancelDeletion`: `() => UseMutationResult<{ message: string; }, ApiError, void>` — Cancel a pending account deletion before the grace period expires.
- `useRefreshToken`: `() => UseMutationResult<RefreshTokenResponse, ApiError, void | RefreshTokenBody>` — Refresh the current access and refresh tokens.
- `useSessions`: `() => { sessions: Session[]; isLoading: boolean; isError: boolean; }` — List all active sessions for the authenticated user.
- `useRevokeSession`: `() => UseMutationResult<void, ApiError, string>` — Revoke a session by its ID.

### OAuth
- `useOAuthExchange`: `() => UseMutationResult<OAuthExchangeResponse, ApiError, OAuthExchangeBody>` — Exchange an OAuth callback code for session tokens.
- `useOAuthUnlink`: `() => UseMutationResult<void, ApiError, OAuthProvider>` — Remove an OAuth provider link from the current account.
- `getOAuthUrl`: `(provider: OAuthProvider) => string` — Build the redirect URL for starting an OAuth login flow with the given provider.
- `getLinkUrl`: `(provider: OAuthProvider) => string` — Build the redirect URL for linking an OAuth provider to the current account.

### WebAuthn & Passkeys
- `useWebAuthnRegisterOptions`: `() => UseMutationResult<WebAuthnRegisterOptionsResponse, ApiError, void>` — Request WebAuthn registration options (challenge, relying party info) from the server.
- `useWebAuthnRegister`: `() => UseMutationResult<{ message: string; }, ApiError, WebAuthnRegisterBody>` — Complete WebAuthn credential registration with the attestation response from the authenticator.
- `useWebAuthnCredentials`: `() => { credentials: WebAuthnCredential[]; isLoading: boolean; isError: boole...` — List all registered WebAuthn credentials for the current user.
- `useWebAuthnRemoveCredential`: `() => UseMutationResult<{ message: string; }, ApiError, string>` — Remove a registered WebAuthn credential by its ID.
- `useWebAuthnDisable`: `() => UseMutationResult<{ message: string; }, ApiError, void>` — Disable WebAuthn for the current user and remove all registered credentials.
- `usePasskeyLoginOptions`: `() => UseMutationResult<PasskeyLoginOptionsResponse, ApiError, PasskeyLoginOp...` — Request passkey login options (challenge) from the server to start a passwordless login.
- `usePasskeyLogin`: `() => UseMutationResult<LoginResult, ApiError, PasskeyLoginVars>` — Complete a passkey login with the assertion response from the authenticator.

### Realtime
- `useSocket`: `() => SocketHook<TWSEvents>` — Open and manage a WebSocket connection.
- `useRoom`: `(room: string) => { isSubscribed: boolean; }` — Subscribe to a WebSocket room.
- `useRoomEvent`: `<T>(room: string, event: string, handler: (data: T) => void) => void` — Listen for a specific event on a WebSocket room.
- `useSSE`: `(endpoint: string) => SseHookResult` — Connect to a server-sent events endpoint.
- `useSseEvent`: `<T = unknown>(endpoint: string, event: string) => SseEventHookResult<T>` — Subscribe to a named event on an SSE endpoint.
- `onSseEvent`: `(endpoint: string, event: string, handler: (payload: unknown) => void) => () ...` — Register a callback for a named SSE event.
- `useCommunityNotifications`: `(opts?: UseCommunityNotificationsOpts | undefined) => UseCommunityNotificatio...` — Subscribe to real-time community notifications via SSE.

### Community
- `useContainers`: `(params?: ListParams | undefined) => UseQueryResult<PaginatedResponse<Contain...` — List community containers with optional pagination.
- `useContainer`: `(containerId: string) => UseQueryResult<ContainerResponse, ApiError>` — Fetch a single container by ID.
- `useCreateContainer`: `() => UseMutationResult<ContainerResponse, ApiError, CreateContainerBody, unk...` — Create a new community container.
- `useUpdateContainer`: `() => UseMutationResult<ContainerResponse, ApiError, { containerId: string; }...` — Update a container's metadata.
- `useDeleteContainer`: `() => UseMutationResult<void, ApiError, { containerId: string; }, unknown>` — Delete a container and its contents.
- `useContainerThreads`: `({ containerId, ...params }: ThreadListParams) => UseQueryResult<PaginatedRes...` — List threads in a container with pagination and optional filters.
- `useContainerThread`: `(threadId: string) => UseQueryResult<ThreadResponse, ApiError>` — Fetch a single thread by ID.
- `useCreateThread`: `() => UseMutationResult<ThreadResponse, ApiError, { containerId: string; } & ...` — Create a new thread in a container.
- `useUpdateThread`: `() => UseMutationResult<ThreadResponse, ApiError, { threadId: string; contain...` — Update a thread's content or metadata.
- `useDeleteThread`: `() => UseMutationResult<void, ApiError, { threadId: string; containerId: stri...` — Delete a thread.
- `usePublishThread`: `() => UseMutationResult<ThreadResponse, ApiError, { threadId: string; contain...` — Publish a draft thread, making it visible to other users.
- `useLockThread`: `() => UseMutationResult<ThreadResponse, ApiError, { threadId: string; contain...` — Lock a thread to prevent new replies.
- `usePinThread`: `() => UseMutationResult<ThreadResponse, ApiError, { threadId: string; contain...` — Pin a thread to the top of its container.
- `useUnpinThread`: `() => UseMutationResult<ThreadResponse, ApiError, { threadId: string; contain...` — Unpin a previously pinned thread.
- `useThreadReplies`: `({ threadId, ...params }: ReplyListParams) => UseQueryResult<PaginatedRespons...` — List replies in a thread with pagination.
- `useReply`: `(replyId: string) => UseQueryResult<ReplyResponse, ApiError>` — Fetch a single reply by ID.
- `useCreateReply`: `() => UseMutationResult<ReplyResponse, ApiError, { threadId: string; } & Crea...` — Post a new reply to a thread.
- `useUpdateReply`: `() => UseMutationResult<ReplyResponse, ApiError, { replyId: string; threadId:...` — Update a reply's content.
- `useDeleteReply`: `() => UseMutationResult<void, ApiError, { replyId: string; threadId: string; ...` — Delete a reply.
- `useThreadReactions`: `(threadId: string) => UseQueryResult<ReactionBody[], ApiError>` — List reactions on a thread.
- `useReplyReactions`: `(replyId: string) => UseQueryResult<ReactionBody[], ApiError>` — List reactions on a reply.
- `useAddThreadReaction`: `() => UseMutationResult<void, ApiError, { threadId: string; containerId: stri...` — Add an emoji reaction to a thread.
- `useRemoveThreadReaction`: `() => UseMutationResult<void, ApiError, { threadId: string; containerId: stri...` — Remove an emoji reaction from a thread.
- `useAddReplyReaction`: `() => UseMutationResult<void, ApiError, { replyId: string; threadId: string; ...` — Add an emoji reaction to a reply.
- `useRemoveReplyReaction`: `() => UseMutationResult<void, ApiError, { replyId: string; threadId: string; ...` — Remove an emoji reaction from a reply.
- `useContainerMembers`: `(containerId: string, params?: ListParams | undefined) => UseQueryResult<Pagi...` — List members of a container with pagination.
- `useContainerModerators`: `(containerId: string, params?: ListParams | undefined) => UseQueryResult<Pagi...` — List moderators of a container.
- `useContainerOwners`: `(containerId: string, params?: ListParams | undefined) => UseQueryResult<Pagi...` — List owners of a container.
- `useAddMember`: `() => UseMutationResult<void, ApiError, { containerId: string; userId: string...` — Add a user as a member of a container.
- `useRemoveMember`: `() => UseMutationResult<void, ApiError, { containerId: string; userId: string...` — Remove a member from a container.
- `useAssignModerator`: `() => UseMutationResult<void, ApiError, { containerId: string; userId: string...` — Promote a member to moderator.
- `useRemoveModerator`: `() => UseMutationResult<void, ApiError, { containerId: string; userId: string...` — Remove moderator role from a user.
- `useAssignOwner`: `() => UseMutationResult<void, ApiError, { containerId: string; userId: string...` — Promote a member to owner.
- `useRemoveOwner`: `() => UseMutationResult<void, ApiError, { containerId: string; userId: string...` — Remove owner role from a user.
- `useNotifications`: `(params?: ListParams | undefined) => UseQueryResult<PaginatedResponse<Notific...` — List notifications for the current user with pagination.
- `useNotificationsUnreadCount`: `() => UseQueryResult<{ count: number; }, ApiError>` — Get the count of unread notifications.
- `useMarkNotificationRead`: `() => UseMutationResult<void, ApiError, { notificationId: string; }, unknown>` — Mark a single notification as read.
- `useMarkAllNotificationsRead`: `() => UseMutationResult<void, ApiError, void, unknown>` — Mark all notifications as read.
- `useReports`: `(params?: ListParams | undefined) => UseQueryResult<PaginatedResponse<ReportR...` — List moderation reports with pagination.
- `useReport`: `(reportId: string) => UseQueryResult<ReportResponse, ApiError>` — Fetch a single report by ID.
- `useCreateReport`: `() => UseMutationResult<ReportResponse, ApiError, ReportBody, unknown>` — File a moderation report against a thread or reply.
- `useResolveReport`: `() => UseMutationResult<ReportResponse, ApiError, { reportId: string; } & Res...` — Resolve a moderation report with an action (e.g., warn, delete).
- `useDismissReport`: `() => UseMutationResult<ReportResponse, ApiError, { reportId: string; }, unkn...` — Dismiss a moderation report without taking action.
- `useBans`: `(params?: ListParams | undefined) => UseQueryResult<PaginatedResponse<BanResp...` — List banned users with pagination.
- `useCheckBan`: `(userId: string, containerId?: string | undefined) => UseQueryResult<BanCheck...` — Check whether a specific user is banned.
- `useCreateBan`: `() => UseMutationResult<BanResponse, ApiError, BanBody, unknown>` — Ban a user from a container or globally.
- `useRemoveBan`: `() => UseMutationResult<void, ApiError, { banId: string; userId: string; }, u...` — Remove a ban, restoring the user's access.
- `useSearchThreads`: `(params: CommunitySearchParams & { q: string; }) => UseQueryResult<SearchResp...` — Full-text search across threads.
- `useSearchReplies`: `(params: CommunitySearchParams & { q: string; }) => UseQueryResult<SearchResp...` — Full-text search across replies.

### Webhooks
- `useWebhookEndpoints`: `() => UseQueryResult<WebhookEndpointResponse[], ApiError>` — List webhook endpoints with pagination.
- `useWebhookEndpoint`: `(endpointId: string) => UseQueryResult<WebhookEndpointResponse, ApiError>` — Fetch a single webhook endpoint by ID.
- `useCreateWebhookEndpoint`: `() => UseMutationResult<WebhookEndpointResponse, ApiError, CreateWebhookEndpo...` — Create a new webhook endpoint.
- `useUpdateWebhookEndpoint`: `() => UseMutationResult<WebhookEndpointResponse, ApiError, { endpointId: stri...` — Update an existing webhook endpoint's URL, events, or status.
- `useDeleteWebhookEndpoint`: `() => UseMutationResult<void, ApiError, { endpointId: string; }, unknown>` — Delete a webhook endpoint.
- `useWebhookDeliveries`: `({ endpointId, page, pageSize, }: ListWebhookDeliveriesParams) => UseQueryRes...` — List delivery attempts for a webhook endpoint.
- `useWebhookDelivery`: `(deliveryId: string) => UseQueryResult<WebhookDeliveryResponse, ApiError>` — Fetch a single delivery record by ID.
- `useTestWebhookEndpoint`: `() => UseMutationResult<void, ApiError, { endpointId: string; } & TestWebhook...` — Send a test delivery through a webhook endpoint.

### Infrastructure
- `api`: `ApiClient` — Low-level API client bound to this snapshot instance.
- `tokenStorage`: `TokenStorage` — Token storage used for session persistence (access + refresh tokens).
- `queryClient`: `QueryClient` — TanStack Query client shared across all hooks in this snapshot instance.
- `useWebSocketManager`: `() => WebSocketManager<TWSEvents> | null` — Access the WebSocket connection manager.
- `bootstrap`: `{ env?: Record<string, string | undefined> | undefined; bearerToken?: string ...` — Bootstrap values used to create this snapshot instance.
- `ManifestApp`: `ComponentType<{}> | undefined` — Config-driven ManifestApp component, available when `manifest` is provided in config.

### Routing
- `protectedBeforeLoad`: `(ctx: { context: { queryClient: QueryClient; }; }) => Promise<void>` — Route guard that redirects unauthenticated users to the login page.
- `guestBeforeLoad`: `(ctx: { context: { queryClient: QueryClient; }; }) => Promise<void>` — Route guard that redirects authenticated users away from guest-only pages.

### Scaffold
- `QueryProvider`: `FC<{ children: ReactNode; }>` — React provider that wraps children with the TanStack QueryClientProvider for this instance.

## UI (`@lastshotlabs/snapshot/ui`)

### Tokens & Flavors
- `AnalyticsProvider` *(interface)* — Analytics provider runtime contract.
- `AnalyticsProviderFactory` *(typealias)* — Factory used to create analytics providers per snapshot instance.
- `AnalyticsProviderInitConfig` *(interface)* — Analytics provider initialization payload.
- `colorToOklch(color: string) => [number, number, number]` — Convert any supported color string to OKLCH values.
- `ComponentTokens` *(typealias)* — Component-level token overrides.
- `componentTokensSchema` — Zod schema for component-level token overrides.
- `contrastRatio(left: string, right: string) => number` — Calculate the WCAG contrast ratio between two supported color values.
- `defineFlavor(name: string, config: FlavorConfig) => Flavor` — Define and register a new flavor.
- `deriveDarkVariant(lightColor: string) => string` — Derive a dark mode variant of a light color.
- `deriveForeground(backgroundColor: string) => string` — Derive a foreground color that passes WCAG AA contrast (4.5:1) against the given background color.
- `Flavor` *(interface)* — Named theme preset.
- `FontConfig` *(typealias)* — Font configuration.
- `fontSchema` — Zod schema for font configuration.
- `getAllFlavors() => Record<string, Flavor>` — Get all registered flavors as a record.
- `getFlavor(name: string) => Flavor | undefined` — Retrieve a registered flavor by name.
- `getRegisteredClient(name: string) => ClientFactory | undefined` — Look up a previously registered custom client factory.
- `hexToOklch(hex: string) => [number, number, number]` — Convert a hex color string to OKLCH values.
- `hslToOklch(h: number, s: number, l: number) => [number, number, number]` — Convert HSL values to OKLCH.
- `meetsWcagAA(left: string, right: string, largeText?: boolean) => boolean` — Check whether two colors satisfy WCAG AA contrast for normal or large text.
- `oklchToHex(l: number, c: number, h: number) => string` — Convert OKLCH values back to a hex color string.
- `oklchToString(l: number, c: number, h: number) => string` — Format OKLCH values as a CSS-compatible string (without the oklch() wrapper).
- `parseOklchString(str: string) => [number, number, number]` — Parse an oklch string (the CSS variable format "L C H") back to values.
- `RadiusScale` *(typealias)* — Border radius scale.
- `radiusSchema` — Zod schema for border radius scale.
- `registerAnalyticsProvider(name: string, factory: AnalyticsProviderFactory) => void` — Register a custom analytics provider factory by name.
- `registerClient(name: string, factory: ClientFactory) => void` — Register a named custom client factory.
- `relativeLuminance(color: string) => number` — Compute relative luminance from OKLCH for WCAG contrast calculations.
- `resolveFrameworkStyles(options?: { respectReducedMotion?: boolean | undefined; } | undefined) => string` — Returns a CSS string containing framework-level styles:  1.
- `resolveTokens(config?: { flavor?: string | undefined; flavors?: Record<string, { extends: string; displayName?: strin...` — Resolve a theme configuration into a complete CSS string.
- `Responsive` *(typealias)* — A breakpoint-aware value.
- `SpacingScale` *(typealias)* — Spacing density.
- `spacingSchema` — Zod schema for spacing density.
- `ThemeColors` *(typealias)* — Semantic color tokens.
- `themeColorsSchema` — Zod schema for semantic color tokens.
- `ThemeConfig` *(typealias)* — Theme configuration in the manifest.
- `themeConfigSchema` — Zod schema for the full theme configuration in the manifest.
- `TokenEditor` *(interface)* — Return type of useTokenEditor().
- `useTokenEditor() => TokenEditor` — React hook for runtime token editing.
- `validateContrast(theme: { flavor?: string | undefined; flavors?: Record<string, { extends: string; displayName?: stri...` — Warn when manifest theme color pairs fail WCAG AA contrast.

### Context & Data Binding
- `AppContextProvider({ globals, resources, api, children, }: AppContextProviderProps) => Element` — Provides persistent global state that survives route changes.
- `AppContextProviderProps` *(interface)* — Props for AppContextProvider.
- `FromRef` *(interface)* — A reference to another component's published value.
- `GlobalConfig` *(typealias)* — Global state definition from the manifest.
- `isFromRef(value: unknown) => value is FromRef` — Type guard for FromRef values.
- `PageContextProvider({ state, resources, api, children, }: PageContextProviderProps) => Element` — Provides per-page state that is destroyed on route change.
- `PageContextProviderProps` *(interface)* — Props for PageContextProvider.
- `ResolvedConfig` *(typealias)* — Resolves a type where FromRef values are replaced with their resolved types.
- `usePublish(id: string | undefined) => (value: unknown) => void` — Registers a component in the page context and returns a setter function to publish values that other components can subscribe to via `{ from: "id" }`.
- `useResolveFrom<T extends Record<string, unknown>>(config: T) => ResolvedConfig<T>` — Resolves all `FromRef` values in a config object at once.
- `useSubscribe(ref: unknown) => unknown` — Subscribes to a value from the shared binding/state registry system.

### State Runtime
- `AtomRegistry` *(interface)* — Registry of named state atoms.
- `clearPersistedState(key: string, storage: PersistStorage) => void` — Remove a persisted state value from the selected browser storage area.
- `readPersistedState(key: string, storage: PersistStorage) => unknown` — Read and JSON-decode a persisted state value, returning `undefined` on failure or absence.
- `RuntimeStateConfig` *(interface)* — Named state definition from the manifest.
- `StateConfigMap` *(typealias)* — Map of named state definitions declared by the manifest runtime.
- `StateHookScope` *(typealias)* — Hook-level scope override that can force app, route, or auto-discovered state resolution.
- `StateProviderProps` *(interface)* — Props accepted by the provider layer that wires manifest state into a React tree.
- `StateScope` *(typealias)* — Lifetime scope for manifest state: shared across the app or recreated per route.
- `toPersistedStateKey(key: string) => string` — Build the storage key used for persisted Snapshot state entries.
- `usePersistedAtom<T>(sourceAtom: PrimitiveAtom<T>, key: string, storage: PersistStorage) => [T, (value: T) => void]` — Bind a primitive atom to browser storage so its value survives page reloads.
- `useResetStateValue(id: string, options?: { scope?: StateHookScope | undefined; } | undefined) => () => void` — Return a callback that resets a named manifest state entry to its configured default.
- `useSetStateValue(id: string, options?: { scope?: StateHookScope | undefined; } | undefined) => (value: unknown) => void` — Return a setter that writes to a named manifest state entry in the resolved scope.
- `useStateValue(id: string, options?: { scope?: StateHookScope | undefined; } | undefined) => unknown` — Read the current value for a named manifest state entry.
- `writePersistedState(key: string, value: unknown, storage: PersistStorage) => void` — Serialize and store a persisted state value, ignoring browser storage failures.

### Actions
- `ActionBase` *(interface)* — Shared timing controls available on every action.
- `ActionConfig` *(typealias)* — All possible action configs.
- `ActionExecuteFn` *(typealias)* — The execute function returned by useActionExecutor.
- `actionSchema` — Discriminated union schema for all action types.
- `ApiAction` *(interface)* — Call an API endpoint.
- `apiActionSchema` — Schema for api action.
- `CloseModalAction` *(interface)* — Close a modal or drawer.
- `closeModalActionSchema` — Schema for close-modal action.
- `ConfirmAction` *(interface)* — Show a confirmation dialog.
- `confirmActionSchema` — Schema for confirm action.
- `ConfirmDialog() => ReactNode` — Render the global confirmation dialog for requests queued through `useConfirmManager`.
- `ConfirmManager` *(interface)* — Imperative API for opening a confirmation dialog from manifest actions or custom UI.
- `ConfirmOptions` *(typealias)* — Options accepted when opening a confirmation dialog.
- `ConfirmRequest` *(interface)* — Internal confirm-dialog request stored in the atom-backed manager queue.
- `CopyAction` *(interface)* — Copy plain text and optionally continue with follow-up actions.
- `CopyToClipboardAction` *(interface)* — Copy plain text and optionally show a simple confirmation toast.
- `copyToClipboardActionSchema` — Schema for the `copy-to-clipboard` action.
- `debounceAction<T>(key: string, fn: () => T | Promise<T>, ms: number) => Promise<T>` — Debounce async or sync action execution by key and resolve all pending callers with the final invocation result.
- `DownloadAction` *(interface)* — Download a file from an endpoint.
- `downloadActionSchema` — Schema for download action.
- `interpolate(template: string, context: Record<string, unknown>) => string` — Replace `{key}` placeholders with values from context.
- `LogAction` *(interface)* — Emit a structured client-side log entry.
- `ModalManager` *(interface)* — Return type of useModalManager.
- `NavigateAction` *(interface)* — Navigate to a route.
- `navigateActionSchema` — Schema for navigate action.
- `OpenModalAction` *(interface)* — Open a modal or drawer by id.
- `openModalActionSchema` — Schema for open-modal action.
- `RefreshAction` *(interface)* — Re-fetch a component's data.
- `refreshActionSchema` — Schema for refresh action.
- `RunWorkflowAction` *(interface)* — Run a named manifest workflow.
- `runWorkflowActionSchema` — Schema for run-workflow action.
- `ScrollToAction` *(interface)* — Show a toast notification.
- `scrollToActionSchema` — Schema for the `scroll-to` action.
- `SetValueAction` *(interface)* — Set another component's published value.
- `setValueActionSchema` — Schema for set-value action.
- `ShowToastOptions` *(interface)* — User-facing toast options accepted by the toast manager.
- `SnapshotApiContext(props: ProviderProps<ApiClient | null>) => ReactNode` — API client context consumed by built-in `api`, `download`, and related runtime actions.
- `throttleAction<T>(key: string, fn: () => T | Promise<T>, ms: number) => Promise<T | undefined>` — Throttle async or sync action execution by key and drop calls inside the active throttle window.
- `ToastAction` *(interface)* — Show a toast notification.
- `toastActionSchema` — Schema for toast action.
- `ToastContainer() => ReactNode` — Render the active toast queue using runtime-configured placement defaults.
- `ToastItem` *(interface)* — Resolved toast entry stored in the runtime queue.
- `ToastManager` *(interface)* — Imperative API for enqueueing and dismissing transient toast messages.
- `TrackAction` *(interface)* — Track an analytics event through all manifest-configured providers.
- `trackActionSchema` — Schema for track action.
- `useActionExecutor() => ActionExecuteFn` — Return the action executor bound to the active runtime, registries, overlays, workflows, and optional API client.
- `useConfirmManager() => ConfirmManager` — Return the shared confirmation manager for the current Snapshot UI tree.
- `useModalManager() => ModalManager` — Hook to manage modal open/close state via a Jotai atom stack.
- `useToastManager() => ToastManager` — Return the toast manager bound to the active manifest runtime configuration.

### Manifest & Rendering
- `AnalyticsConfig` *(typealias)* — Resolved runtime view of `analyticsConfigSchema`.
- `analyticsConfigSchema` — Manifest analytics runtime configuration.
- `analyticsProviderSchema` — Analytics provider declaration schema.
- `AppConfig` *(typealias)* — Resolved runtime view of `appConfigSchema`.
- `appConfigSchema` — Schema for the top-level manifest `app` section.
- `AuthProviderConfig` *(typealias)* — Resolved runtime view of `authProviderSchema`.
- `authProviderSchema` — Auth provider declaration schema.
- `AuthScreenConfig` *(typealias)* — Resolved runtime view of `authScreenConfigSchema`.
- `authScreenConfigSchema` — Schema for the manifest auth screen and auth workflow configuration.
- `BaseComponentConfig` *(typealias)* — Resolved runtime view of `baseComponentConfigSchema`.
- `baseComponentConfigSchema` — Shared base schema applied to all manifest-driven components.
- `bootBuiltins() => void` — Register all built-in manifest registries exactly once.
- `BreadcrumbAutoConfig` *(interface)* — Auto-breadcrumb configuration used to derive labels and optional home state from routes.
- `BreadcrumbItem` *(interface)* — A single breadcrumb entry rendered from the matched route stack.
- `buildRequestUrl(endpoint: string, params?: Record<string, unknown>, pathParams?: Record<string, unknown>) => string` — Interpolate path params and append remaining params as a query string.
- `ButtonConfig` *(typealias)* — Resolved runtime view of `buttonConfigSchema`.
- `buttonConfigSchema` — Schema for the built-in `button` component.
- `CardConfig` *(typealias)* — Resolved runtime view of `cardConfigSchema`.
- `cardConfigSchema` — Zod config schema for the Card component.
- `CompiledManifest` *(interface)* — Runtime manifest shape produced by `compileManifest()`.
- `CompiledRoute` *(interface)* — Runtime route shape produced by `compileManifest()`.
- `compileManifest(manifest: unknown) => CompiledManifest` — Parse and compile a manifest into the runtime shape.
- `ComponentConfig` *(typealias)* — Runtime config union for manifest-renderable components.
- `componentConfigSchema` — Union schema covering every component config Snapshot can render from a manifest.
- `ComponentRenderer({ config }: ComponentRendererProps) => Element | null` — Renders a single component from its manifest config.
- `ComponentRendererProps` *(interface)* — Props for the ComponentRenderer component.
- `componentsConfigSchema` — Schema for the top-level `components` section of a manifest.
- `ConfigDrivenComponent` *(typealias)* — React component type that can participate in the config-driven manifest runtime.
- `customComponentDeclarationSchema` — Schema for a custom component declaration under `components.custom`.
- `customComponentPropSchema` — Schema for a declared prop on a manifest custom component registration.
- `dataSourceSchema` — Data source accepted by data-aware manifest components.
- `defineManifest<TManifest extends ManifestConfig>(manifest: TManifest) => TManifest` — Define a manifest without compiling it.
- `endpointTargetSchema` — Endpoint target accepted by actions and resource-aware components.
- `fromRefSchema` — Zod schema for a FromRef value.
- `generateBreadcrumbs(match: RouteMatch, config: BreadcrumbAutoConfig) => BreadcrumbItem[]` — Generate breadcrumb items from the current matched route hierarchy.
- `generateJsonSchema() => Record<string, unknown>` — Generate a JSON Schema for snapshot manifests.
- `getRegisteredGuards() => string[]` — List the names of all currently registered route guards.
- `getRegisteredSchemaTypes() => string[]` — Return the currently registered manifest component type names.
- `HeadingConfig` *(typealias)* — Resolved runtime view of `headingConfigSchema`.
- `headingConfigSchema` — Schema for the built-in `heading` component.
- `httpMethodSchema` — Supported HTTP methods for manifest resources and endpoint targets.
- `injectStyleSheet(id: string, css: string) => void` — Inject or update a stylesheet in the document head.
- `isResourceRef(value: unknown) => value is { resource: string; params?: Record<string, unknown> | undefined; }` — Return `true` when a value is a manifest resource reference object.
- `ManifestApp({ manifest, apiUrl, lazyComponents, }: ManifestAppProps) => Element | null` — Render the manifest-driven application shell.
- `ManifestAppProps` *(interface)* — Props accepted by the `ManifestApp` component.
- `ManifestConfig` *(typealias)* — Raw manifest input shape accepted by `parseManifest()` before defaults are applied during compilation.
- `manifestConfigSchema` — Top-level schema for `snapshot.manifest.json`.
- `ManifestRuntimeProvider({ manifest, api, clients, children, }: { manifest: CompiledManifest; api?: ApiClientLike | un...` — Provides manifest runtime state, resource cache state, and mutation helpers.
- `NavigationConfig` *(typealias)* — Runtime view of `navigationConfigSchema`.
- `navigationConfigSchema` — Schema for the top-level manifest navigation configuration.
- `NavItem` *(interface)* — Navigation item rendered by Snapshot navigation components.
- `navItemSchema` — Recursive schema for navigation items used by manifest navigation surfaces.
- `outletComponentSchema` — Schema for the built-in `outlet` component used by route layouts.
- `OutletConfig` *(typealias)* — Resolved runtime view of `outletComponentSchema`.
- `OverlayConfig` *(typealias)* — Resolved runtime view of `overlayConfigSchema`.
- `overlayConfigSchema` — Schema for named modal, drawer, and confirm-dialog overlay declarations.
- `OverlayRuntimeProvider({ value, children, }: { value: OverlayRuntimeValue; children: ReactNode; }) => Element` — Provide the current overlay runtime payload and metadata.
- `PageConfig` *(typealias)* — Resolved runtime view of `pageConfigSchema`.
- `pageConfigSchema` — Schema for a manifest page definition.
- `PageRenderer({ page, routeId, state, resources, api, }: PageRendererProps) => Element` — Renders a page from its manifest config.
- `PageRendererProps` *(interface)* — Props for the PageRenderer component.
- `parseManifest(manifest: unknown) => { routes: any[]; push?: { vapidPublicKey: string | { env: string; default?: strin...` — Parse an unknown value into a validated manifest.
- `PushConfig` *(typealias)* — Resolved runtime view of `pushConfigSchema`.
- `pushConfigSchema` — Manifest push-notification runtime configuration.
- `registerComponent(type: string, component: ConfigDrivenComponent) => void` — Register a React component for a manifest component type string.
- `registerComponentSchema(type: string, schema: ZodType<any, ZodTypeDef, any>) => void` — Register a component-specific manifest schema by component `type`.
- `registerGuard(name: string, def: GuardDef) => void` — Register a named route guard implementation for manifest resolution.
- `resetBootBuiltins() => void` — Reset the boot flag so tests can re-run built-in registration deterministically.
- `resolveGuard(name: string) => GuardDef | undefined` — Resolve a previously registered route guard by name.
- `ResourceConfigMap` *(typealias)* — Named manifest resource map keyed by resource id.
- `resourceConfigSchema` — Schema for a manifest resource declaration.
- `resourceRefSchema` — Reference to a named manifest resource with optional parameter overrides.
- `RouteConfig` *(typealias)* — Resolved runtime view of `routeConfigSchema`.
- `routeConfigSchema` — Recursive schema for a manifest route tree node.
- `RouteGuard` *(typealias)* — Resolved runtime view of `routeGuardSchema`.
- `RouteGuardConfig` *(typealias)* — Resolved runtime view of `routeGuardConfigSchema`.
- `routeGuardConfigSchema` — Object-form route guard schema with auth, role, and policy controls.
- `routeGuardSchema` — Route guard schema, accepting either a named guard or inline guard config.
- `RouteMatch` *(interface)* — Resolved route match for the current pathname.
- `RouteRuntimeProvider({ value, children, }: { value: RouteRuntimeValue; children: ReactNode; }) => Element` — Provide route runtime state to manifest-rendered components.
- `routeTransitionSchema` — Schema for route transition metadata.
- `RowConfig` *(interface)* — Runtime config for the built-in `row` layout component.
- `rowConfigSchema` — Schema for the built-in `row` layout component.
- `SelectConfig` *(typealias)* — Resolved runtime view of `selectConfigSchema`.
- `selectConfigSchema` — Schema for the built-in `select` component.
- `StateConfig` *(typealias)* — Named manifest state map keyed by state id.
- `StateValueConfig` *(typealias)* — Runtime state declaration for a single named manifest state value.
- `stateValueConfigSchema` — Schema for a named manifest state value declaration.
- `ToastConfig` *(typealias)* — Resolved runtime view of `toastConfigSchema`.
- `toastConfigSchema` — Manifest toast defaults used by the `toast` action runtime.
- `TransitionWrapper({ config, routeKey, children, }: { config?: TransitionConfig | undefined; routeKey: string; childre...` — Apply enter transitions around routed content when a route transition config is present.
- `useManifestResourceCache() => ManifestResourceCacheValue | null` — Access the manifest resource cache runtime for loads, invalidation, and resource-driven mutations.
- `useManifestResourceFocusRefetch(resourceName?: string | undefined, enabled?: boolean) => void` — Invalidate a manifest resource when the window regains focus.
- `useManifestResourceMountRefetch(resourceName?: string | undefined, enabled?: boolean) => void` — Invalidate a manifest resource on mount when the resource opts into it.
- `useManifestRuntime() => CompiledManifest | null` — Access the compiled manifest runtime.
- `useOverlayRuntime() => OverlayRuntimeValue | null` — Access the current overlay runtime state.
- `useRoutePrefetch(endpoints: (string | { resource: string; params?: Record<string, unknown> | undefined; })[] | undefi...` — Prefetch route-scoped resources when a compiled route advertises eager endpoints.
- `useRouteRuntime() => RouteRuntimeValue | null` — Access the current route runtime state.

### Data Components
- `AvatarGroup({ config }: { config: { type: "avatar-group"; data?: string | { resource: string; params?: Record<string,...` — AvatarGroup — displays a row of overlapping avatars with "+N" overflow.
- `AvatarGroupConfig` *(typealias)* — Inferred config type from the AvatarGroup Zod schema.
- `avatarGroupConfigSchema` — Zod config schema for the AvatarGroup component.
- `BulkAction` *(typealias)* — Inferred bulk action type.
- `bulkActionSchema` — Schema for a bulk action on selected rows.
- `Chart({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { ...` — Render a config-driven chart with manifest data sources, live refresh, and slot-aware styling.
- `ChartConfig` *(typealias)* — Inferred type for the Chart component configuration.
- `chartSchema` — Zod schema for the Chart component configuration.
- `ColumnConfig` *(typealias)* — Inferred column configuration type.
- `columnConfigSchema` — Schema for individual column configuration.
- `DataTable({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; } ...` — Config-driven DataTable component.
- `DataTableConfig` *(typealias)* — Inferred DataTable configuration type from the Zod schema.
- `dataTableConfigSchema` — Zod schema for the DataTable component configuration.
- `DetailCard({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; }...` — DetailCard — data-driven detail view that resolves fields from a record resource and renders them inside a configurable card surface with formatted values, copy-to-clipboard, and header actions.
- `DetailCardConfig` *(typealias)* — DetailCard configuration type inferred from the schema.
- `detailCardConfigSchema` — Zod schema for DetailCard component configuration.
- `EntityPicker({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined;...` — Render a searchable entity picker from manifest-provided options or data.
- `EntityPickerConfig` *(typealias)* — Inferred config type from the EntityPicker Zod schema.
- `entityPickerConfigSchema` — Zod config schema for the EntityPicker component.
- `FavoriteButton({ config }: { config: { type: "favorite-button"; size?: "sm" | "md" | "lg" | undefined; id?: string | ...` — FavoriteButton component — a config-driven star toggle for marking favorites.
- `FavoriteButtonConfig` *(typealias)* — Inferred config type from the FavoriteButton Zod schema.
- `favoriteButtonConfigSchema` — Zod config schema for the FavoriteButton component.
- `Feed({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { f...` — Render an activity feed with grouping, empty states, live refresh, and optional infinite scrolling.
- `FeedConfig` *(typealias)* — Inferred type for the Feed component config (from Zod schema).
- `FeedItem` *(interface)* — A single resolved feed item for rendering.
- `feedSchema` — Zod schema for the Feed component configuration.
- `FilterBar({ config }: { config: { type: "filter-bar"; id?: string | undefined; visible?: boolean | { from: string; tr...` — FilterBar component — search input + filter dropdowns + active filter pills.
- `FilterBarConfig` *(typealias)* — Inferred config type for the FilterBar component.
- `filterBarConfigSchema` — Zod config schema for the FilterBar component.
- `HighlightedText({ config }: { config: { type: "highlighted-text"; text: string | { from: string; transform?: "string"...` — HighlightedText component — renders text with search query highlighting.
- `HighlightedTextConfig` *(typealias)* — Inferred config type from the HighlightedText Zod schema.
- `highlightedTextConfigSchema` — Zod config schema for the HighlightedText component.
- `NotificationBell({ config, }: { config: { type: "notification-bell"; ariaLive: "off" | "polite" | "assertive"; size?:...` — NotificationBell component — a config-driven bell icon with unread count badge.
- `NotificationBellConfig` *(typealias)* — Inferred config type from the NotificationBell Zod schema.
- `notificationBellConfigSchema` — Zod config schema for the NotificationBell component.
- `PaginationState` *(interface)* — Pagination state for the data table.
- `ResolvedColumn` *(interface)* — Resolved column definition used internally by the hook and component.
- `RowAction` *(typealias)* — Inferred row action type.
- `rowActionSchema` — Schema for a per-row action button.
- `SaveIndicator({ config }: { config: { status: "error" | { from: string; transform?: "string" | "number" | "boolean" |...` — SaveIndicator component — a config-driven inline status indicator showing idle, saving, saved, or error states.
- `SaveIndicatorConfig` *(typealias)* — Inferred config type from the SaveIndicator Zod schema.
- `saveIndicatorConfigSchema` — Zod config schema for the SaveIndicator component.
- `ScrollArea({ config }: { config: { type: "scroll-area"; id?: string | undefined; visible?: boolean | { from: string; ...` — ScrollArea component — a scrollable container with custom-styled thin scrollbars.
- `ScrollAreaConfig` *(typealias)* — Inferred config type for the ScrollArea component.
- `scrollAreaConfigSchema` — Zod config schema for the ScrollArea component.
- `Separator({ config }: { config: { type: "separator"; id?: string | undefined; visible?: boolean | { from: string; tra...` — Separator component — a simple visual divider line (horizontal or vertical).
- `SeparatorConfig` *(typealias)* — Inferred config type for the Separator component.
- `separatorConfigSchema` — Zod config schema for the Separator component.
- `SeriesConfig` *(typealias)* — Inferred type for a single chart series config.
- `seriesConfigSchema` — Schema for a single data series in the chart.
- `SortState` *(interface)* — Sort state for the data table.
- `StatCard({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; } |...` — StatCard component — a data-fetching card that displays a single metric with optional trend indicator.
- `StatCardConfig` *(typealias)* — Inferred config type from the StatCard Zod schema.
- `statCardConfigSchema` — Zod config schema for the StatCard component.
- `trendConfigSchema` — Schema for the trend indicator configuration.
- `useDataTable(config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: s...` — Headless hook for managing data table state.
- `UseDataTableResult` *(interface)* — Return type of the `useDataTable` headless hook.
- `useDetailCard(config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: ...` — Hook that powers the DetailCard component.
- `UseDetailCardResult` *(interface)* — Return type of the useDetailCard hook.
- `UseFeedResult` *(interface)* — Return type of the useFeed headless hook.
- `UseStatCardResult` *(interface)* — Result returned by the StatCard headless hook or internal logic.

### Form Components
- `AutoForm({ config }: { config: { type: "form" | "auto-form"; fields: "auto" | { name: string; type: "number" | "selec...` — Config-driven form component with multi-column layout, conditional field visibility, and section grouping.
- `AutoFormConfig` *(typealias)* — Inferred type for the AutoForm component config.
- `autoFormConfigSchema` — Zod schema for the AutoForm component config.
- `ColorPicker({ config }: { config: { type: "color-picker"; format: "hex" | "rgb" | "hsl"; allowCustom: boolean; showAl...` — Render a manifest-driven color picker input.
- `ColorPickerConfig` *(typealias)* — Config for the manifest-driven color picker component.
- `colorPickerConfigSchema` — Schema for color picker components with optional swatches, alpha, and change actions.
- `DatePicker({ config }: { config: { type: "date-picker"; mode: "single" | "range" | "multiple"; valueFormat: "iso" | "...` — Render a manifest-driven date picker input.
- `DatePickerConfig` *(typealias)* — Config for the manifest-driven date picker component.
- `datePickerConfigSchema` — Schema for date picker components covering single, range, and multi-date selection.
- `FieldConfig` *(typealias)* — Inferred type for a single field configuration.
- `fieldConfigSchema` — Schema for an individual field configuration.
- `FieldErrors` *(typealias)* — Per-field validation error.
- `InlineEdit({ config }: { config: { type: "inline-edit"; background?: string | { size?: "auto" | "cover" | "contain" |...` — InlineEdit component — click-to-edit text field.
- `InlineEditConfig` *(typealias)* — Inferred config type for the InlineEdit component.
- `inlineEditConfigSchema` — Zod config schema for the InlineEdit component.
- `Input({ config }: { config: { type: "input"; value?: string | { from: string; transform?: "string" | "number" | "bool...` — Config-driven Input component — a standalone text input field with label, placeholder, validation, optional icon, and helper/error text.
- `InputConfig` *(typealias)* — Inferred config type from the Input Zod schema.
- `inputConfigSchema` — Zod config schema for the Input component.
- `LocationInput({ config }: { config: LocationInputConfig; }) => Element | null` — LocationInput — geocode autocomplete input.
- `LocationInputConfig` *(interface)* — Public config shape for the LocationInput component.
- `locationInputConfigSchema` — Zod config schema for the LocationInput component.
- `MultiSelect({ config }: { config: { type: "multi-select"; data?: string | { resource: string; params?: Record<string,...` — Config-driven MultiSelect component — a dropdown with checkboxes for selecting multiple values.
- `MultiSelectConfig` *(typealias)* — Inferred config type from the MultiSelect Zod schema.
- `multiSelectConfigSchema` — Zod config schema for the MultiSelect component.
- `QuickAdd({ config }: { config: { type: "quick-add"; id?: string | undefined; visible?: boolean | { from: string; tran...` — QuickAdd component — a config-driven inline creation bar for quick item entry.
- `QuickAddConfig` *(typealias)* — Inferred config type from the QuickAdd Zod schema.
- `quickAddConfigSchema` — Zod config schema for the QuickAdd component.
- `Select({ config }: { config: { options: string | { resource: string; params?: { [x: string]: unknown; } | undefined; ...` — Manifest-driven select input with support for static options and resource-backed option lists.
- `Slider({ config }: { config: { type: "slider"; min: number; max: number; range: boolean; step: number; showValue: boo...` — Render a manifest-driven slider input.
- `SliderConfig` *(typealias)* — Config for the manifest-driven slider component.
- `sliderConfigSchema` — Schema for single-value and ranged slider controls with optional value display/actions.
- `TagSelector({ config }: { config: { type: "tag-selector"; data?: string | { resource: string; params?: Record<string,...` — TagSelector component — a tag input for selecting and creating tags.
- `TagSelectorConfig` *(typealias)* — Inferred config type from the TagSelector Zod schema.
- `tagSelectorConfigSchema` — Zod config schema for the TagSelector component.
- `Textarea({ config }: { config: { type: "textarea"; value?: string | { from: string; transform?: "string" | "number" |...` — Config-driven Textarea component — a multi-line text input with label, character count, validation, and configurable resize.
- `TextareaConfig` *(typealias)* — Inferred config type from the Textarea Zod schema.
- `textareaConfigSchema` — Zod config schema for the Textarea component.
- `Toggle({ config }: { config: { type: "toggle"; size?: "sm" | "md" | "lg" | undefined; variant?: "default" | "outline"...` — Config-driven Toggle component — a pressed/unpressed toggle button.
- `ToggleConfig` *(typealias)* — Inferred config type from the Toggle Zod schema.
- `toggleConfigSchema` — Zod config schema for the Toggle component.
- `TouchedFields` *(typealias)* — Tracks which fields have been interacted with.
- `useAutoForm(fields: { name: string; type: "number" | "select" | "date" | "text" | "color" | "email" | "datetime" | "t...` — Headless hook for form state management.
- `UseAutoFormResult` *(interface)* — Return type for the useAutoForm headless hook.
- `useWizard(config: { type: "wizard"; submitLabel: string; steps: { title: string; fields: { name: string; type: "numbe...` — Manage wizard step state, validation, submission, and transition flow.
- `UseWizardResult` *(interface)* — Return type of the useWizard headless hook.
- `Wizard({ config }: { config: { type: "wizard"; submitLabel: string; steps: { title: string; fields: { name: string; t...` — Render a multi-step form wizard with built-in validation, step state, and slot-aware styling.
- `WizardConfig` *(typealias)* — Inferred type for the Wizard component configuration.
- `wizardSchema` — Zod schema for the Wizard component configuration.
- `WizardStepConfig` *(typealias)* — Inferred type for a single wizard step configuration.
- `wizardStepSchema` — Schema for a single wizard step.

### Communication Components
- `buildEmojiMap(emojis: CustomEmoji[]) => Map<string, CustomEmoji>` — Builds a shortcode lookup map from an array of custom emojis.
- `ChatWindow({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined; }...` — ChatWindow — full chat interface composing a message thread, rich input, and typing indicator.
- `ChatWindowConfig` *(typealias)* — Inferred config type from the ChatWindow Zod schema.
- `chatWindowConfigSchema` — Zod config schema for the ChatWindow component.
- `CommentSection({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefine...` — CommentSection — displays a list of comments with author avatars, timestamps, and an embedded rich input for posting new comments.
- `CommentSectionConfig` *(typealias)* — Inferred config type from the CommentSection Zod schema.
- `commentSectionConfigSchema` — Zod config schema for the CommentSection component.
- `CUSTOM_EMOJI_CSS` — CSS for custom emoji sizing.
- `CustomEmoji` *(interface)* — Shape of a custom emoji entry.
- `EmojiPicker({ config }: { config: { type: "emoji-picker"; id?: string | undefined; visible?: boolean | { from: string...` — EmojiPicker — searchable grid of emojis organized by category.
- `EmojiPickerConfig` *(typealias)* — Inferred config type from the EmojiPicker Zod schema.
- `emojiPickerConfigSchema` — Zod config schema for the EmojiPicker component.
- `GifEntry` *(interface)* — Shape of a GIF entry.
- `GifPicker({ config }: { config: { type: "gif-picker"; id?: string | undefined; visible?: boolean | { from: string; tr...` — GifPicker — searchable GIF grid with support for API-powered search or static GIF data.
- `GifPickerConfig` *(typealias)* — Inferred config type from the GifPicker Zod schema.
- `gifPickerConfigSchema` — Zod config schema for the GifPicker component.
- `MessageThread({ config }: { config: { data: string | { resource: string; params?: Record<string, unknown> | undefined...` — MessageThread — scrollable message list with avatars, timestamps, message grouping, and date separators.
- `MessageThreadConfig` *(typealias)* — Inferred config type from the MessageThread Zod schema.
- `messageThreadConfigSchema` — Zod config schema for the MessageThread component.
- `parseShortcodes(text: string, emojis: Map<string, CustomEmoji>) => string` — Parses shortcodes in text and replaces them with `<img>` tags.
- `PresenceIndicator({ config, }: { config: { status: { from: string; transform?: "string" | "number" | "boolean" | "len...` — PresenceIndicator — displays online/offline/away/busy/dnd status with a colored dot and optional label.
- `PresenceIndicatorConfig` *(typealias)* — Inferred config type from the PresenceIndicator Zod schema.
- `presenceIndicatorConfigSchema` — Zod config schema for the PresenceIndicator component.
- `ReactionBar({ config }: { config: { type: "reaction-bar"; data?: string | { resource: string; params?: Record<string,...` — ReactionBar — displays emoji reactions with counts and an optional add button that opens an emoji picker popover.
- `ReactionBarConfig` *(typealias)* — Inferred config type from the ReactionBar Zod schema.
- `reactionBarConfigSchema` — Zod config schema for the ReactionBar component.
- `resolveEmojiRecords(records: Record<string, unknown>[], urlField?: string, urlPrefix?: string | undefined) => CustomE...` — Resolves emoji records from the API into CustomEmoji entries.
- `TypingIndicator({ config }: { config: { type: "typing-indicator"; id?: string | undefined; visible?: boolean | { from...` — TypingIndicator — shows animated bouncing dots with user names to indicate who is currently typing.
- `TypingIndicatorConfig` *(typealias)* — Inferred config type from the TypingIndicator Zod schema.
- `typingIndicatorConfigSchema` — Zod config schema for the TypingIndicator component.

### Content Components
- `Code({ config }: { config: { value: string | { from: string; transform?: "string" | "number" | "boolean" | "length" |...` — Inline code primitive rendered inside flowing text or compact metadata.
- `CodeConfig` *(typealias)* — Inferred config type for the Code component.
- `codeConfigSchema` — Inline code primitive schema for manifest-rendered code snippets.
- `CompareView({ config }: { config: { type: "compare-view"; left: string | { from: string; transform?: "string" | "numb...` — CompareView component — a config-driven side-by-side diff viewer for comparing two text values.
- `CompareViewConfig` *(typealias)* — Inferred config type from the CompareView Zod schema.
- `compareViewConfigSchema` — Zod config schema for the CompareView component.
- `detectPlatform(url: string, options?: { darkMode?: boolean | undefined; } | undefined) => PlatformInfo | null` — Detects the platform from a URL and extracts embed info.
- `Heading({ config }: { config: { type: "heading"; text: string | { from: string; transform?: "string" | "number" | "bo...` — Heading component for manifest-driven page titles and section headings.
- `LinkEmbed({ config }: { config: { url: string | { from: string; transform?: "string" | "number" | "boolean" | "length...` — LinkEmbed — renders rich URL previews with platform-specific renderers.
- `LinkEmbedConfig` *(typealias)* — Inferred config type from the LinkEmbed Zod schema.
- `linkEmbedConfigSchema` — Zod config schema for the LinkEmbed component.
- `Markdown({ config }: { config: { type: "markdown"; content: string | { from: string; transform?: "string" | "number" ...` — Markdown component — renders markdown content with full GFM support and syntax highlighting powered by rehype-highlight.
- `MarkdownConfig` *(typealias)* — Inferred config type from the Markdown Zod schema.
- `markdownConfigSchema` — Zod config schema for the Markdown component.
- `Platform` *(typealias)* — Platform detection and embed URL extraction.
- `PLATFORM_COLORS` — Platform accent colors.
- `PLATFORM_NAMES` — Platform display names.
- `PlatformInfo` *(interface)* — Resolved platform metadata used to render a platform-specific embedded preview.
- `RichInput({ config }: { config: { type: "rich-input"; id?: string | undefined; visible?: boolean | { from: string; tr...` — RichInput component — TipTap-based WYSIWYG editor for chat messages, comments, and posts.
- `RichInputConfig` *(typealias)* — Inferred config type from the RichInput Zod schema.
- `richInputConfigSchema` — Zod config schema for the RichInput component.
- `RichTextEditor({ config }: { config: { type: "rich-text-editor"; mode?: "split" | "edit" | "preview" | undefined; id?...` — RichTextEditor component — a CodeMirror 6-based markdown editor with toolbar, preview pane, and split view support.
- `RichTextEditorConfig` *(typealias)* — Inferred config type from the RichTextEditor Zod schema.
- `richTextEditorConfigSchema` — Zod config schema for the RichTextEditor component.

### Overlay Components
- `CommandPalette({ config }: { config: { type: "command-palette"; shortcut: string; autoRegisterShortcuts: boolean; dat...` — CommandPalette — search-driven command palette that renders static groups or fetches remote results, then dispatches manifest actions for the selected command.
- `CommandPaletteConfig` *(typealias)* — Inferred config type for the CommandPalette component.
- `commandPaletteConfigSchema` — Zod config schema for the CommandPalette component.
- `ConfirmDialogComponent({ config, }: { config: { type: "confirm-dialog"; description?: string | { from: string; transf...` — Confirmation dialog alias built on top of the modal overlay runtime.
- `ConfirmDialogConfig` *(typealias)* — Input config type for the ConfirmDialog component.
- `confirmDialogConfigSchema` — Overlay alias schema for manifest-driven confirmation dialogs.
- `ContextMenu({ config }: { config: { type: "context-menu"; background?: string | { size?: "auto" | "cover" | "contain"...` — Render a right-click context menu backed by the shared context-menu portal runtime.
- `ContextMenuConfig` *(typealias)* — Inferred config type for the ContextMenu component.
- `contextMenuConfigSchema` — Zod schema for the ContextMenu component.
- `DrawerComponent({ config }: { config: { type: "drawer"; size: "sm" | "md" | "lg" | "xl" | "full"; content: Record<str...` — Drawer component — renders a slide-in panel from the left or right edge.
- `DrawerConfig` *(typealias)* — Inferred type for drawer config.
- `drawerConfigSchema` — Zod schema for drawer component config.
- `ModalComponent({ config }: { config: { type: "modal"; size: "sm" | "md" | "lg" | "xl" | "full"; content: Record<strin...` — Modal component — renders an overlay dialog with child components.
- `ModalConfig` *(typealias)* — Inferred type for modal config.
- `modalConfigSchema` — Zod schema for modal component config.
- `Popover({ config }: { config: { type: "popover"; trigger: string | { from: string; transform?: "string" | "number" | ...` — Floating panel component triggered by a button-like control.
- `PopoverConfig` *(typealias)* — Inferred config type for the Popover component.
- `popoverConfigSchema` — Zod schema for the Popover component.

### Navigation Components
- `PrefetchLink({ id, to, prefetch, children, className, style, slots, target, rel, }: { to: string; target?: string | u...` — `<PrefetchLink>` — a prefetch primitive that renders a plain `<a>` anchor and automatically injects `<link rel="prefetch">` tags for the matching route's JS chunks and CSS files.
- `PrefetchLinkConfig` *(typealias)* — The output type of `prefetchLinkSchema` — all fields fully resolved with defaults applied.
- `prefetchLinkSchema` — Zod schema for `<PrefetchLink>` config.
- `TabConfig` *(typealias)* — Inferred type for a single tab config.
- `tabConfigSchema` — Schema for a single tab within the tabs component.
- `TabsComponent({ config }: { config: { type: "tabs"; variant: "default" | "underline" | "pills"; children: { label: st...` — Tabs component — renders a tab bar with content panels.
- `TabsConfig` *(typealias)* — Inferred type for tabs config.
- `tabsConfigSchema` — Zod schema for tabs component config.

### Layout Components
- `Card({ config }: { config: { type: "card"; children: any[]; suspense?: { type: "custom" | "skeleton" | "spinner"; var...` — Card layout primitive for grouped content with an optional title block.
- `Column({ config }: { config: { type: "column"; children: any[]; background?: string | { size?: "auto" | "cover" | "co...` — Column layout primitive for vertical composition with the same mental model as `row`.
- `Layout({ config, nav, slots, children }: LayoutProps) => Element` — Layout shell component that wraps page content.
- `LayoutColumnConfig` *(typealias)* — Inferred config type for the Column layout component.
- `layoutColumnConfigSchema` — Zod config schema for the Column layout component.
- `LayoutConfig` *(typealias)* — Inferred layout config type from the Zod schema.
- `layoutConfigSchema` — Zod schema for layout component configuration.
- `LayoutProps` *(interface)* — Props for the Layout component.
- `LayoutVariant` *(typealias)* — Layout variant type extracted from the schema.
- `Nav({ config, pathname, onNavigate, variant, }: NavComponentProps) => Element` — Grouped navigation component for manifest app shells.
- `NavConfig` *(typealias)* — Runtime config type for the Nav component.
- `navConfigSchema` — Zod schema for the grouped Nav component.
- `NavItemConfig` *(typealias)* — Runtime config type for a grouped nav item, including optional child items and per-item slots.
- `Outlet({ config }: { config: { type: "outlet"; background?: string | { size?: "auto" | "cover" | "contain" | undefine...` — Layout outlet primitive used to render nested child routes from the compiled manifest route tree.
- `ResolvedNavItem` *(interface)* — A nav item enriched with computed state: active detection, visibility based on role, and resolved badge value.
- `useNav(config: { type: "nav"; background?: string | { size?: "auto" | "cover" | "contain" | undefined; overlay?: stri...` — Headless hook for nav component logic.
- `UseNavResult` *(interface)* — Return type of the useNav headless hook.

### Media Components
- `SnapshotImage({ config }: { config: { type: "image"; width: number; format: "avif" | "webp" | "jpeg" | "png" | "origi...` — Render a manifest-driven image component with Snapshot styling tokens.
- `SnapshotImageConfig` *(typealias)* — Inferred config type from the SnapshotImage Zod schema.
- `snapshotImageSchema` — Schema for optimized image components rendered through Snapshot's image route.

### Page Presets
- `ActivityFeedDef` *(interface)* — Feed section definition for dashboard-style presets.
- `AuthBrandingDef` *(interface)* — Branding and background options for the auth page preset.
- `authPage(options: AuthPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; bre...` — Build a manifest page config for a common auth screen.
- `AuthPageOptions` *(interface)* — Options for the `authPage` preset factory.
- `authPresetConfigSchema` — Validate preset config for auth screens such as login, register, and password recovery.
- `ChartDef` *(interface)* — Chart section definition for dashboard-style presets.
- `ColumnDef` *(interface)* — A single column definition for the CRUD page table.
- `crudPage(options: CrudPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; bre...` — Builds a manifest `PageConfig` for a standard CRUD page.
- `CrudPageOptions` *(interface)* — Options for the `crudPage` preset factory.
- `crudPresetConfigSchema` — Validate preset config for a CRUD page assembled from list/form primitives.
- `dashboardPage(options: DashboardPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | unde...` — Builds a manifest `PageConfig` for a dashboard page.
- `DashboardPageOptions` *(interface)* — Options for the `dashboardPage` preset factory.
- `dashboardPresetConfigSchema` — Validate preset config for a dashboard page with stats, charts, and activity sections.
- `EmptyStateDef` *(interface)* — Empty-state content shown by preset-generated pages.
- `expandPreset(preset: string, presetConfig: unknown) => { content: any[]; title?: string | undefined; roles?: string[]...` — Validate a named preset config and expand it into the equivalent page config.
- `FilterDef` *(interface)* — A filter definition for the CRUD page toolbar.
- `FilterOption` *(interface)* — A filter option entry.
- `FormDef` *(interface)* — A form definition used in CRUD create/update modals and settings tabs.
- `FormFieldDef` *(interface)* — A single form field definition.
- `FormFieldOption` *(interface)* — An option entry for select/radio form fields.
- `PaginationDef` *(interface)* — Pagination settings for preset-generated list surfaces.
- `settingsPage(options: SettingsPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefi...` — Builds a manifest `PageConfig` for a settings page.
- `SettingsPageOptions` *(interface)* — Options for the `settingsPage` preset factory.
- `settingsPresetConfigSchema` — Validate preset config for a settings page composed from one or more submitted sections.
- `SettingsSectionDef` *(interface)* — A single settings section (one tab in the settings page).
- `StatDef` *(interface)* — A single stat card definition for the dashboard page.

### Hooks & Utilities
- `Breakpoint` *(typealias)* — All breakpoint names including `"default"` (below `sm`).
- `ComponentDataResult` *(interface)* — Result returned by `useComponentData`.
- `getSortableStyle(transform: Transform | null, transition: string | undefined, isDragging: boolean) => CSSProperties` — CSS transform helper for sortable items.
- `resolveResponsiveValue<T>(value: T | { default: T; sm?: T | undefined; md?: T | undefined; lg?: T | undefined; xl?: T...` — Resolve a responsive value for a given breakpoint.
- `UI_BREAKPOINTS` — Breakpoint pixel thresholds (mobile-first, min-width).
- `useAutoBreadcrumbs(config?: BreadcrumbAutoConfig | undefined) => BreadcrumbItem[]` — Resolve auto-generated breadcrumb items for the current route match.
- `useBreakpoint() => Breakpoint` — Returns the currently active breakpoint based on window width.
- `useComponentData(dataConfig: string | FromRef | { resource: string; params?: Record<string, unknown> | undefined; }, ...` — Shared data-fetching hook for config-driven components.
- `useDndSensors() => SensorDescriptor<SensorOptions>[]` — Pre-configured sensor setup for pointer + keyboard DnD.
- `useInfiniteScroll({ hasNextPage, isLoading, loadNextPage, threshold, }: UseInfiniteScrollOptions) => RefObject<HTMLDi...` — Observe a sentinel element and load the next page when it enters the viewport.
- `UseInfiniteScrollOptions` *(interface)* — Options for loading additional items when a sentinel approaches the viewport.
- `usePoll({ interval, pauseWhenHidden, onPoll, enabled, }: UsePollOptions) => void` — Invoke a callback on an interval with optional document-visibility pausing.
- `UsePollOptions` *(interface)* — Options controlling interval-based polling from client components.
- `useResponsiveValue<T>(value: T | { default: T; sm?: T | undefined; md?: T | undefined; lg?: T | undefined; xl?: T | u...` — Resolve a responsive value to the appropriate value for the current breakpoint.
- `useUrlSync(options: UseUrlSyncOptions) => void` — Keep a slice of local state synchronized with URL query parameters.
- `useVirtualList({ totalCount, itemHeight, overscan, }: UseVirtualListOptions) => UseVirtualListResult` — Compute the visible slice for a fixed-height virtualized list container.

### Icons
- `Icon({ name, size, color, className, label, }: IconProps) => Element` — Render a Snapshot icon from the built-in icon registry.
- `ICON_PATHS` — SVG inner content for Lucide icons.
- `IconProps` *(interface)* — Props for the {@link Icon} component.

### Workflows
- `AssignWorkflowNode` *(interface)* — Write values into the workflow execution context.
- `CaptureWorkflowNode` *(interface)* — Execute an action and capture its result into the workflow context.
- `getRegisteredWorkflowAction(type: string) => WorkflowActionHandler | undefined` — Retrieve a registered runtime handler for a custom workflow action type.
- `IfWorkflowNode` *(interface)* — Branch workflow execution based on a condition.
- `ParallelWorkflowNode` *(interface)* — Run multiple workflow definitions in parallel.
- `registerWorkflowAction(type: string, handler: WorkflowActionHandler) => void` — Register a runtime handler for a custom workflow action type.
- `RetryWorkflowNode` *(interface)* — Retry a workflow definition with optional delay and backoff.
- `runWorkflow(definition: WorkflowDefinition, options: { workflows?: WorkflowMap | undefined; context?: Record<string, ...` — Execute a workflow definition against the supplied runtime hooks and mutable context.
- `TryWorkflowNode` *(interface)* — Execute a workflow definition with optional catch and finally handlers.
- `WaitWorkflowNode` *(interface)* — Pause workflow execution for a duration in milliseconds.
- `WorkflowActionHandler` *(typealias)* — Handler signature for registered custom workflow actions.
- `WorkflowCondition` *(interface)* — Simple conditional expression used by workflow nodes.
- `WorkflowConditionOperator` *(typealias)* — Supported condition operators for manifest workflows.
- `workflowConditionSchema` — Schema for conditional expressions used by workflow control-flow nodes.
- `WorkflowDefinition` *(typealias)* — A single workflow node or a sequential list of nodes.
- `workflowDefinitionSchema` — Schema for a workflow definition expressed as one node or a sequential node list.
- `WorkflowMap` *(typealias)* — Named workflow map keyed by workflow id.
- `WorkflowNode` *(typealias)* — Any node that can appear inside a workflow definition.
- `workflowNodeSchema` — Recursive schema describing every built-in workflow node and action node shape.

### Other
- `getRegisteredLayouts() => string[]` — List the names of all currently registered manifest layouts.
- `registerBuiltInComponents(force?: boolean) => void` — Register all built-in config-driven components with the manifest system.
- `registerLayout(name: string, layout: RegisteredLayout) => void` — Register a named layout component for manifest layout resolution.
- `resetBuiltInComponentRegistration() => void` — Reset the built-in component registration guard so tests can rebuild the registry.
- `resolveLayout(name: string) => RegisteredLayout | undefined` — Resolve a previously registered layout by name.

## SSR (`@lastshotlabs/snapshot/ssr`)

- `__callServerAction__(action: string, module: string, args: unknown[]) => Promise<unknown>` — Called by server action stubs in the client bundle.
- `buildComponentId(relativePath: string, exportName: string) => string` — Builds the component ID string used as a key in {@link RscManifest.components}.
- `createManifestRenderer(rawConfig: ManifestSsrConfig) => { resolve(url: URL, bsCtx: unknown): Promise<SsrRouteMatchSha...` — Create a manifest-based SSR renderer.
- `createPprCache() => PprCache` — Create an in-memory PPR shell cache.
- `createReactRenderer(config: SnapshotSsrConfig) => { resolve(url: URL, bsCtx: unknown): Promise<ServerRouteMatchShape ...` — Create the official React renderer for `bunshot-ssr`.
- `extractPprShell(element: ReactElement<unknown, string | JSXElementConstructor<any>>) => Promise<PprShell>` — Render only the static shell of a React tree.
- `hasUseClientDirective(code: string) => boolean` — Returns `true` if the source file contains a `'use client'` or `"use client"` directive as its first meaningful content (before any non-whitespace, non-comment code).
- `hasUseServerDirective(code: string) => boolean` — Returns `true` if the source file contains a `'use server'` or `"use server"` directive as its first meaningful content.
- `ManifestPreloadResolver` *(typealias)* — Server-side resolver for a single named manifest resource.
- `ManifestSsrConfig` *(interface)* — Configuration for `createManifestRenderer()`.
- `PprCache` *(interface)* — Interface for the PPR static shell cache.
- `PprCacheEntry` *(interface)* — A single entry in the PPR shell cache.
- `PprShell` *(interface)* — The result of a build-time static shell extraction for a PPR route.
- `renderPage(element: ReactElement<unknown, string | JSXElementConstructor<any>>, context: SsrRequestContext, shell: Ss...` — Render a React element tree to a streaming HTML `Response`.
- `RenderPprOptions` *(interface)* — Options for `renderPprPage()`.
- `renderPprPage(options: RenderPprOptions) => Promise<Response>` — Render a PPR (Partial Prerendering) route.
- `RscManifest` *(interface)* — Maps client component IDs to their output chunk URLs.
- `RscOptions` *(interface)* — Options for RSC-enabled rendering passed to `renderPage()`.
- `safeJsonStringify(value: unknown) => string` — JSON-stringify a value with XSS-safe escaping.
- `ServerRouteMatchShape` *(interface)* — Structural equivalent of `SsrRouteMatch` from `@lastshotlabs/bunshot-ssr`.
- `SnapshotSsrConfig` *(interface)* — Configuration for `createReactRenderer()`.
- `SsrForbiddenResult` *(interface)* — Signal from a server route's `load()` that the user lacks permission.
- `SsrLoadContext` *(interface)* — The context object passed to every server route `load()` and `meta()` function.
- `SsrLoaderReturn` *(typealias)* — All valid return types from a server route's `load()` function.
- `SsrLoadResult` *(interface)* — Successful result from a server route's `load()` function.
- `SsrMeta` *(interface)* — SsrMeta shape — structural equivalent of `SsrMeta` from `@lastshotlabs/bunshot-ssr`.
- `SsrNotFoundResult` *(interface)* — Signal from a server route's `load()` that the resource was not found.
- `SsrQueryCacheEntry` *(interface)* — A TanStack Query cache entry to pre-seed during SSR.
- `SsrRedirectResult` *(interface)* — Signal from a server route's `load()` that the client should be redirected.
- `SsrRequestContext` *(interface)* — Per-request SSR context.
- `SsrShellShape` *(interface)* — Structural equivalent of `SsrShell` from `@lastshotlabs/bunshot-ssr`.
- `SsrUnauthorizedResult` *(interface)* — Signal from a server route's `load()` that the user is not authenticated.
- `StaticShellWrapper({ children, }: { children?: ReactNode; }) => ReactElement<unknown, string | JSXElementConstructor<...` — Wrap a React element so that all Suspense boundaries render only their fallbacks (never await the actual children).
- `unstable_noStore() => void` — Opt the current request out of ISR caching.
- `usePrefetchRoute() => (path: string) => void` — Returns a callback that prefetches the JS chunks and CSS files for a given URL path by injecting `<link rel="prefetch">` tags into `document.head`.

## Vite (`@lastshotlabs/snapshot/vite`)

- `snapshotApp(opts?: SnapshotAppOptions) => Plugin<any>` — Vite plugin that boots a manifest-driven Snapshot app from `snapshot.manifest.json`.
- `SnapshotAppOptions` *(interface)* — Options for `snapshotApp()`, the manifest-driven Snapshot app Vite plugin.
- `snapshotSsr(opts?: SnapshotSsrOptions) => Plugin<any>[]` — Vite plugin for SSR builds with Snapshot.
- `SnapshotSsrOptions` *(interface)* — Options for the `snapshotSsr()` Vite plugin.
- `snapshotSync(opts?: SnapshotSyncOptions) => Plugin<any>` — Vite plugin that runs Snapshot's OpenAPI sync step during the Vite lifecycle.
- `SnapshotSyncOptions` *(interface)* — Options for `snapshotSync()`, Snapshot's Vite-driven Bunshot sync plugin.
- `staticParamsPlugin(opts: StaticParamsPluginOptions) => Plugin<any>` — Vite plugin that scans the server routes directory for `generateStaticParams` exports at build time and writes `static-params.json` to the client output directory.
