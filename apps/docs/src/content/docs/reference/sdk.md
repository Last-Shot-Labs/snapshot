---
title: SDK Reference
description: Generated from src/index.ts and the declarations it re-exports.
draft: false
---

Generated from src/index.ts and the declarations it re-exports.

Generated from `src/index.ts`.

| Export | Kind | Source | Description |
|---|---|---|---|
| `ApiError` | class | `src/api/error.ts` | HTTP error thrown by Snapshot API clients for non-success responses. |
| `AuthContract` | interface | `src/auth/contract.ts` | Full auth contract used by `createSnapshot()` to build auth URLs and requests. |
| `AuthContractConfig` | interface | `src/auth/contract.ts` | Partial auth contract overrides. |
| `AuthEndpoints` | interface | `src/auth/contract.ts` | Relative auth endpoint paths used by Snapshot's built-in auth hooks. |
| `AuthErrorConfig` | interface | `src/types.ts` | Optional configuration for auth error formatting. |
| `AuthErrorContext` | typealias | `src/types.ts` | Auth UI contexts that can provide custom error messaging. |
| `AuthHeaders` | interface | `src/auth/contract.ts` | Header names Snapshot sends for session and CSRF-aware auth requests. |
| `AuthUser` | interface | `src/types.ts` | Minimal authenticated user shape returned by Snapshot auth hooks. |
| `BanBody` | interface | `src/community/types.ts` | Request body for creating a user ban. |
| `BanCheckResponse` | interface | `src/community/types.ts` | Result returned when checking whether a user is banned. |
| `BanResponse` | interface | `src/community/types.ts` | Ban record returned by moderation endpoints. |
| `communityContract` | variable | `src/community/contract.ts` | Built-in route contract for Snapshot community APIs. |
| `CommunityHooks` | typealias | `src/community/hooks.ts` | Hook surface returned by `createCommunityHooks()`. |
| `CommunityNotification` | interface | `src/types.ts` | Normalized notification shape used by `useCommunityNotifications()`. |
| `CommunityNotificationType` | typealias | `src/types.ts` | Community notification types surfaced by Snapshot's notification helpers. |
| `CommunitySearchParams` | interface | `src/community/types.ts` | Search parameters accepted by the community search hooks. |
| `ContainerResponse` | interface | `src/community/types.ts` | Community container returned by the community API. |
| `createAuthErrorFormatter` | function | `src/auth/error-format.ts` | Create a reusable auth error formatter with shared formatting rules. |
| `CreateContainerBody` | interface | `src/community/types.ts` | Request body for creating a community container. |
| `CreateReplyBody` | interface | `src/community/types.ts` | Request body for creating a reply. |
| `createSnapshot` | function | `src/create-snapshot.tsx` | Create a per-instance snapshot runtime from bootstrap config and a manifest.  Resolves manifest env refs, builds per-instance runtime managers, and wires manifest-driven auth/realtime workflow dispatch events. |
| `CreateThreadBody` | interface | `src/community/types.ts` | Request body for creating a thread in a container. |
| `CreateWebhookEndpointBody` | interface | `src/webhooks/types.ts` | Request body for creating a webhook endpoint. |
| `defaultContract` | function | `src/auth/contract.ts` | Create the built-in auth contract for a given API base URL. |
| `definePlugin` | function | `src/plugin.ts` | Identity function for defining plugins with full type inference. No runtime logic. Exists solely so `const p = definePlugin({...})` gives full autocomplete on the plugin shape. |
| `DeleteAccountBody` | interface | `src/types.ts` | Request body for deleting the current account. |
| `ForgotPasswordBody` | interface | `src/types.ts` | Request body for the forgot-password endpoint. |
| `formatAuthError` | function | `src/auth/error-format.ts` | Format a raw auth `ApiError` into the message shown to application code. |
| `generateManifestSchema` | function | `src/schema-generator.ts` | Generate a JSON Schema for the snapshot manifest and write it to disk. When called without plugins, produces the built-in schema. Consumer apps call this with their plugins to get a schema that includes custom types. |
| `getRegisteredClient` | function | `src/api/client.ts` | Look up a previously registered custom client factory. |
| `isMfaChallenge` | function | `src/types.ts` | Narrow a login result to the MFA challenge branch. |
| `ListParams` | interface | `src/community/types.ts` | Shared page-based pagination parameters. |
| `ListWebhookDeliveriesParams` | interface | `src/webhooks/types.ts` | Parameters for listing deliveries for a single webhook endpoint. |
| `ListWebhookEndpointsParams` | interface | `src/webhooks/types.ts` | Page-based pagination parameters for listing webhook endpoints. |
| `LoginBody` | interface | `src/types.ts` | Credentials posted to the login endpoint. |
| `LoginResponse` | interface | `src/types.ts` | Raw login response shape from bunshot (includes MFA fields) |
| `LoginResult` | typealias | `src/types.ts` | useLogin resolves to either a user or an MFA challenge |
| `LoginVars` | typealias | `src/types.ts` | Login variables accepted by `useLogin()`. |
| `LogoutVars` | interface | `src/types.ts` | Logout options accepted by `useLogout()`. |
| `mergeContract` | function | `src/auth/contract.ts` | Merge a partial auth contract override with the built-in defaults. |
| `MfaChallenge` | interface | `src/types.ts` | Returned by useLogin when mfaRequired is true |
| `MfaDisableBody` | interface | `src/types.ts` | Request body for disabling MFA. |
| `MfaEmailOtpDisableBody` | interface | `src/types.ts` | Request body for disabling email OTP MFA. |
| `MfaEmailOtpEnableResponse` | interface | `src/types.ts` | Response returned when email OTP MFA setup begins. |
| `MfaEmailOtpVerifySetupBody` | interface | `src/types.ts` | Request body for confirming email OTP MFA setup. |
| `MfaMethod` | typealias | `src/types.ts` | MFA method identifiers supported by Snapshot's auth contract. |
| `MfaMethodsResponse` | interface | `src/types.ts` | Response listing the enabled MFA methods for the current user. |
| `MfaRecoveryCodesBody` | interface | `src/types.ts` | Request body for regenerating recovery codes. |
| `MfaRecoveryCodesResponse` | interface | `src/types.ts` | Recovery codes returned by the auth API. |
| `MfaResendBody` | interface | `src/types.ts` | Request body for resending an MFA challenge. |
| `MfaSetupResponse` | interface | `src/types.ts` | Setup payload returned when provisioning TOTP MFA. |
| `MfaVerifyBody` | interface | `src/types.ts` | Request body for verifying an MFA challenge. |
| `MfaVerifySetupBody` | interface | `src/types.ts` | Verification body for confirming an MFA setup flow. |
| `MfaVerifySetupResponse` | interface | `src/types.ts` | Response returned after successful MFA setup verification. |
| `NotificationResponse` | interface | `src/community/types.ts` | Notification record returned by community notification endpoints. |
| `OAuthExchangeBody` | interface | `src/types.ts` | Request body for exchanging an OAuth callback code. |
| `OAuthExchangeResponse` | interface | `src/types.ts` | Tokens returned after a successful OAuth exchange. |
| `OAuthProvider` | typealias | `src/types.ts` | OAuth provider identifier used by auth URL helpers and OAuth hooks. |
| `PaginatedResponse` | interface | `src/community/types.ts` | Generic paginated list response used by community and webhook list endpoints. |
| `PasskeyLoginBody` | interface | `src/types.ts` | Request body for completing a passkey login. |
| `PasskeyLoginOptionsBody` | interface | `src/types.ts` | Request body for retrieving passkey login options. |
| `PasskeyLoginOptionsResponse` | interface | `src/types.ts` | Response returned when beginning a passkey login flow. |
| `PasskeyLoginVars` | typealias | `src/types.ts` | Passkey login variables accepted by `usePasskeyLogin()`. |
| `PluginComponentEntry` | interface | `src/plugin.ts` | A component entry in a plugin: the React component + its Zod schema. |
| `PluginComponentGroupDefinition` | interface | `src/plugin.ts` | A component group definition in a plugin. |
| `PluginSetupContext` | interface | `src/plugin.ts` | Context passed to plugin setup() hooks. |
| `PushState` | typealias | `src/push/hook.ts` | High-level browser push subscription state reported by `usePushNotifications()`. |
| `ReactionBody` | interface | `src/community/types.ts` | Emoji reaction payload for thread and reply reaction endpoints. |
| `RefreshTokenBody` | interface | `src/types.ts` | Request body for refreshing auth tokens. |
| `RefreshTokenResponse` | interface | `src/types.ts` | Token refresh response returned by the auth API. |
| `RegisterBody` | interface | `src/types.ts` | Registration payload posted to the register endpoint. |
| `registerClient` | function | `src/api/client.ts` | Register a named custom client factory. |
| `RegisterVars` | typealias | `src/types.ts` | Registration variables accepted by `useRegister()`. |
| `ReplyListParams` | interface | `src/community/types.ts` | List parameters for fetching replies in a specific thread. |
| `ReplyResponse` | interface | `src/community/types.ts` | Reply record returned by the community API. |
| `ReportBody` | interface | `src/community/types.ts` | Request body for filing a community moderation report. |
| `ReportResponse` | interface | `src/community/types.ts` | Report record returned by moderation endpoints. |
| `RequestOptions` | interface | `src/types.ts` | Optional overrides for individual API client requests. |
| `ResendVerificationBody` | interface | `src/types.ts` | Request body for sending a new verification email. |
| `ResetPasswordBody` | interface | `src/types.ts` | Request body for completing a password reset flow. |
| `ResolveReportBody` | interface | `src/community/types.ts` | Request body for resolving a moderation report. |
| `SearchResponse` | interface | `src/community/types.ts` | Search results returned by the thread and reply search endpoints. |
| `Session` | interface | `src/types.ts` | Active session metadata returned by session-management hooks. |
| `SetPasswordBody` | interface | `src/types.ts` | Request body for setting or rotating an account password. |
| `SnapshotConfig` | interface | `src/types.ts` | Bootstrap configuration for `createSnapshot()`. |
| `SnapshotInstance` | interface | `src/types.ts` | Runtime surface returned by `createSnapshot()`. |
| `SnapshotPlugin` | interface | `src/plugin.ts` | Snapshot plugin interface. |
| `SocketHook` | interface | `src/types.ts` | Realtime websocket control surface returned by `useSocket()`. |
| `SseConfig` | interface | `src/types.ts` | SSE configuration. Each key is an endpoint path that must start with `/__sse/`. The value is per-endpoint options. One EventSource is created per endpoint. reconnectOnLogin: whether to reconnect all endpoints on login success (default true). |
| `SseConnectionStatus` | typealias | `src/sse/manager.ts` | Lifecycle state of a managed SSE connection. |
| `SseEndpointConfig` | interface | `src/types.ts` | Per-endpoint SSE behavior configuration. |
| `SseEventHookResult` | interface | `src/types.ts` | Return type of useSseEvent<T>(endpoint, event) |
| `SseHookResult` | interface | `src/types.ts` | Return type of useSSE(endpoint) |
| `TestWebhookBody` | interface | `src/webhooks/types.ts` | Request body for sending a test delivery through a webhook endpoint. |
| `ThreadListParams` | interface | `src/community/types.ts` | List parameters for fetching threads in a specific container. |
| `ThreadResponse` | interface | `src/community/types.ts` | Thread record returned by the community API. |
| `TokenStorage` | interface | `src/auth/storage.ts` | Per-instance token storage used by Snapshot auth flows. |
| `UpdateContainerBody` | interface | `src/community/types.ts` | Request body for updating a community container. |
| `UpdateReplyBody` | interface | `src/community/types.ts` | Request body for updating an existing reply. |
| `UpdateThreadBody` | interface | `src/community/types.ts` | Request body for updating or moderating a thread. |
| `UpdateWebhookEndpointBody` | interface | `src/webhooks/types.ts` | Request body for updating a webhook endpoint. |
| `UseCommunityNotificationsOpts` | interface | `src/types.ts` | Options for the community notifications hook. |
| `UseCommunityNotificationsResult` | interface | `src/types.ts` | Return shape of `useCommunityNotifications()`. |
| `usePushNotifications` | function | `src/push/hook.ts` | Standalone hook for Web Push subscription management. No dependency on Snapshot's SSE or auth infrastructure. CSRF: /__push/* routes are CSRF-exempt by design. No CSRF header is sent. Auth: requests use credentials: 'include' (cookie auth). Service worker setup: copy sw.js from node_modules/@lastshotlabs/snapshot/dist/sw.js to your project's public/sw.js, OR use `snapshot init` which scaffolds it automatically. |
| `UsePushNotificationsOpts` | interface | `src/push/hook.ts` | Optional overrides for the manifest-backed push configuration. |
| `UsePushNotificationsResult` | interface | `src/push/hook.ts` | Return shape of `usePushNotifications()`. |
| `VerifyEmailBody` | interface | `src/types.ts` | Request body for confirming email verification. |
| `WebAuthnCredential` | interface | `src/types.ts` | Registered WebAuthn credential metadata. |
| `WebAuthnRegisterBody` | interface | `src/types.ts` | Request body for registering a WebAuthn credential. |
| `WebAuthnRegisterOptionsResponse` | interface | `src/types.ts` | Response returned when requesting WebAuthn registration options. |
| `WebhookDeliveryResponse` | interface | `src/webhooks/types.ts` | Delivery record returned for a webhook endpoint event attempt. |
| `WebhookEndpointResponse` | interface | `src/webhooks/types.ts` | Webhook endpoint record returned by the webhook API. |
| `WebhookHooks` | typealias | `src/webhooks/hooks.ts` | Hook surface returned by `createWebhookHooks()`. |
| `webhooksContract` | variable | `src/webhooks/contract.ts` | Built-in route contract for Snapshot webhook APIs. |
| `WebSocketManager` | class | `src/ws/manager.ts` | Per-instance WebSocket connection manager. |
