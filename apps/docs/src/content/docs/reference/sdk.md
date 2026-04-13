---
title: SDK Reference
description: Generated from src/index.ts and the declarations it re-exports.
draft: false
---

Generated from src/index.ts and the declarations it re-exports.

Generated from `src/index.ts`.

| Export | Kind | Source | Description |
|---|---|---|---|
| `ApiError` | class | `src/api/error.ts` | No JSDoc description. |
| `AuthContract` | interface | `src/auth/contract.ts` | No JSDoc description. |
| `AuthContractConfig` | interface | `src/auth/contract.ts` | Partial auth contract overrides. |
| `AuthEndpoints` | interface | `src/auth/contract.ts` | No JSDoc description. |
| `AuthErrorConfig` | interface | `src/types.ts` | No JSDoc description. |
| `AuthErrorContext` | typealias | `src/types.ts` | No JSDoc description. |
| `AuthHeaders` | interface | `src/auth/contract.ts` | No JSDoc description. |
| `AuthUser` | interface | `src/types.ts` | No JSDoc description. |
| `BanBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `BanCheckResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `BanResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `communityContract` | variable | `src/community/contract.ts` | No JSDoc description. |
| `CommunityHooks` | typealias | `src/community/hooks.ts` | No JSDoc description. |
| `CommunityNotification` | interface | `src/types.ts` | No JSDoc description. |
| `CommunityNotificationType` | typealias | `src/types.ts` | No JSDoc description. |
| `CommunitySearchParams` | interface | `src/community/types.ts` | No JSDoc description. |
| `ContainerResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `createAuthErrorFormatter` | function | `src/auth/error-format.ts` | No JSDoc description. |
| `CreateContainerBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `CreateReplyBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `createSnapshot` | function | `src/create-snapshot.tsx` | Create a per-instance snapshot runtime from bootstrap config and a manifest.  Resolves manifest env refs, builds per-instance runtime managers, and wires manifest-driven auth/realtime workflow dispatch events. |
| `CreateThreadBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `CreateWebhookEndpointBody` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `defaultContract` | function | `src/auth/contract.ts` | No JSDoc description. |
| `definePlugin` | function | `src/plugin.ts` | Identity function for defining plugins with full type inference. No runtime logic. Exists solely so `const p = definePlugin({...})` gives full autocomplete on the plugin shape. |
| `DeleteAccountBody` | interface | `src/types.ts` | No JSDoc description. |
| `ForgotPasswordBody` | interface | `src/types.ts` | No JSDoc description. |
| `formatAuthError` | function | `src/auth/error-format.ts` | No JSDoc description. |
| `generateManifestSchema` | function | `src/schema-generator.ts` | Generate a JSON Schema for the snapshot manifest and write it to disk. When called without plugins, produces the built-in schema. Consumer apps call this with their plugins to get a schema that includes custom types. |
| `getRegisteredClient` | function | `src/api/client.ts` | Look up a previously registered custom client factory. |
| `isMfaChallenge` | function | `src/types.ts` | No JSDoc description. |
| `ListParams` | interface | `src/community/types.ts` | No JSDoc description. |
| `ListWebhookDeliveriesParams` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `ListWebhookEndpointsParams` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `LoginBody` | interface | `src/types.ts` | No JSDoc description. |
| `LoginResponse` | interface | `src/types.ts` | Raw login response shape from bunshot (includes MFA fields) |
| `LoginResult` | typealias | `src/types.ts` | useLogin resolves to either a user or an MFA challenge |
| `LoginVars` | typealias | `src/types.ts` | No JSDoc description. |
| `LogoutVars` | interface | `src/types.ts` | No JSDoc description. |
| `mergeContract` | function | `src/auth/contract.ts` | Merge a partial auth contract override with the built-in defaults. |
| `MfaChallenge` | interface | `src/types.ts` | Returned by useLogin when mfaRequired is true |
| `MfaDisableBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaEmailOtpDisableBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaEmailOtpEnableResponse` | interface | `src/types.ts` | No JSDoc description. |
| `MfaEmailOtpVerifySetupBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaMethod` | typealias | `src/types.ts` | No JSDoc description. |
| `MfaMethodsResponse` | interface | `src/types.ts` | No JSDoc description. |
| `MfaRecoveryCodesBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaRecoveryCodesResponse` | interface | `src/types.ts` | No JSDoc description. |
| `MfaResendBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaSetupResponse` | interface | `src/types.ts` | No JSDoc description. |
| `MfaVerifyBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaVerifySetupBody` | interface | `src/types.ts` | No JSDoc description. |
| `MfaVerifySetupResponse` | interface | `src/types.ts` | No JSDoc description. |
| `NotificationResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `OAuthExchangeBody` | interface | `src/types.ts` | No JSDoc description. |
| `OAuthExchangeResponse` | interface | `src/types.ts` | No JSDoc description. |
| `OAuthProvider` | typealias | `src/types.ts` | OAuth provider identifier used by auth URL helpers and OAuth hooks. |
| `PaginatedResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `PasskeyLoginBody` | interface | `src/types.ts` | No JSDoc description. |
| `PasskeyLoginOptionsBody` | interface | `src/types.ts` | No JSDoc description. |
| `PasskeyLoginOptionsResponse` | interface | `src/types.ts` | No JSDoc description. |
| `PasskeyLoginVars` | typealias | `src/types.ts` | No JSDoc description. |
| `PluginComponentEntry` | interface | `src/plugin.ts` | A component entry in a plugin: the React component + its Zod schema. |
| `PluginComponentGroupDefinition` | interface | `src/plugin.ts` | A component group definition in a plugin. |
| `PluginSetupContext` | interface | `src/plugin.ts` | Context passed to plugin setup() hooks. |
| `PushState` | typealias | `src/push/hook.ts` | No JSDoc description. |
| `ReactionBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `RefreshTokenBody` | interface | `src/types.ts` | No JSDoc description. |
| `RefreshTokenResponse` | interface | `src/types.ts` | No JSDoc description. |
| `RegisterBody` | interface | `src/types.ts` | No JSDoc description. |
| `registerClient` | function | `src/api/client.ts` | Register a named custom client factory. |
| `RegisterVars` | typealias | `src/types.ts` | No JSDoc description. |
| `ReplyListParams` | interface | `src/community/types.ts` | No JSDoc description. |
| `ReplyResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `ReportBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `ReportResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `RequestOptions` | interface | `src/types.ts` | No JSDoc description. |
| `ResendVerificationBody` | interface | `src/types.ts` | No JSDoc description. |
| `ResetPasswordBody` | interface | `src/types.ts` | No JSDoc description. |
| `ResolveReportBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `SearchResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `Session` | interface | `src/types.ts` | No JSDoc description. |
| `SetPasswordBody` | interface | `src/types.ts` | No JSDoc description. |
| `SnapshotConfig` | interface | `src/types.ts` | No JSDoc description. |
| `SnapshotInstance` | interface | `src/types.ts` | No JSDoc description. |
| `SnapshotPlugin` | interface | `src/plugin.ts` | Snapshot plugin interface. |
| `SocketHook` | interface | `src/types.ts` | No JSDoc description. |
| `SseConfig` | interface | `src/types.ts` | SSE configuration. Each key is an endpoint path that must start with `/__sse/`. The value is per-endpoint options. One EventSource is created per endpoint. reconnectOnLogin: whether to reconnect all endpoints on login success (default true). |
| `SseConnectionStatus` | typealias | `src/sse/manager.ts` | No JSDoc description. |
| `SseEndpointConfig` | interface | `src/types.ts` | No JSDoc description. |
| `SseEventHookResult` | interface | `src/types.ts` | Return type of useSseEvent<T>(endpoint, event) |
| `SseHookResult` | interface | `src/types.ts` | Return type of useSSE(endpoint) |
| `TestWebhookBody` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `ThreadListParams` | interface | `src/community/types.ts` | No JSDoc description. |
| `ThreadResponse` | interface | `src/community/types.ts` | No JSDoc description. |
| `TokenStorage` | interface | `src/auth/storage.ts` | Per-instance token storage used by Snapshot auth flows. |
| `UpdateContainerBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `UpdateReplyBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `UpdateThreadBody` | interface | `src/community/types.ts` | No JSDoc description. |
| `UpdateWebhookEndpointBody` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `UseCommunityNotificationsOpts` | interface | `src/types.ts` | No JSDoc description. |
| `UseCommunityNotificationsResult` | interface | `src/types.ts` | No JSDoc description. |
| `usePushNotifications` | function | `src/push/hook.ts` | Standalone hook for Web Push subscription management. No dependency on Snapshot's SSE or auth infrastructure. CSRF: /__push/* routes are CSRF-exempt by design. No CSRF header is sent. Auth: requests use credentials: 'include' (cookie auth). Service worker setup: copy sw.js from node_modules/@lastshotlabs/snapshot/dist/sw.js to your project's public/sw.js, OR use `snapshot init` which scaffolds it automatically. |
| `UsePushNotificationsOpts` | interface | `src/push/hook.ts` | No JSDoc description. |
| `UsePushNotificationsResult` | interface | `src/push/hook.ts` | No JSDoc description. |
| `VerifyEmailBody` | interface | `src/types.ts` | No JSDoc description. |
| `WebAuthnCredential` | interface | `src/types.ts` | No JSDoc description. |
| `WebAuthnRegisterBody` | interface | `src/types.ts` | No JSDoc description. |
| `WebAuthnRegisterOptionsResponse` | interface | `src/types.ts` | No JSDoc description. |
| `WebhookDeliveryResponse` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `WebhookEndpointResponse` | interface | `src/webhooks/types.ts` | No JSDoc description. |
| `WebhookHooks` | typealias | `src/webhooks/hooks.ts` | No JSDoc description. |
| `webhooksContract` | variable | `src/webhooks/contract.ts` | No JSDoc description. |
| `WebSocketManager` | class | `src/ws/manager.ts` | Per-instance WebSocket connection manager. |
