/**
 * Generates the comprehensive manifest schema reference page.
 *
 * Imports Zod schemas at runtime and uses introspection to produce
 * field tables with types, defaults, enum values, and nested structures.
 */

import { markdownPage, writeDoc } from "./_common.ts";
import {
  extractFields,
  extractUnionVariants,
  fieldsToMarkdownTable,
  fieldsToMarkdownSections,
  registerKnownSchema,
  type SchemaField,
} from "./_zod-introspect.ts";

import {
  manifestConfigSchema,
  appConfigSchema,
  navigationConfigSchema,
  navItemSchema,
  routeConfigSchema,
  routeGuardConfigSchema,
  routeTransitionSchema,
  authScreenConfigSchema,
  authProviderSchema,
  authContractSchema,
  authSessionSchema,
  realtimeConfigSchema,
  realtimeWsSchema,
  realtimeSseEndpointSchema,
  presenceConfigSchema,
  overlayConfigSchema,
  workflowsConfigSchema,
  stateValueConfigSchema,
  toastConfigSchema,
  analyticsConfigSchema,
  analyticsProviderSchema,
  observabilityConfigSchema,
  pushConfigSchema,
  manifestSsrConfigSchema,
  clientConfigSchema,
  componentsConfigSchema,
  shortcutsConfigSchema,
  shortcutConfigSchema,
  subAppConfigSchema,
  subAppInheritSchema,
  baseComponentConfigSchema,
  fromRefSchema,
  policyExprSchema,
  policyRefSchema,
  exprSchema,
  loadingConfigSchema,
  emptyStateConfigSchema,
  errorStateConfigSchema,
  suspenseFallbackSchema,
  appCacheSchema,
} from "../../src/ui/manifest/schema.ts";

import { envRefSchema } from "../../src/ui/manifest/env.ts";
import { tRefSchema, i18nConfigSchema } from "../../src/ui/i18n/schema.ts";
import { themeConfigSchema } from "../../src/ui/tokens/schema.ts";
import {
  resourceConfigSchema,
  optimisticConfigSchema,
  dataSourceSchema,
  endpointTargetSchema,
} from "../../src/ui/manifest/resources.ts";
import {
  statefulElementSchema,
  styleableElementSchema,
} from "../../src/ui/components/_base/schema.ts";

// ── Register known schemas for friendly type names ───────────────────────────

registerKnownSchema(fromRefSchema, "FromRef");
registerKnownSchema(envRefSchema, "EnvRef");
registerKnownSchema(tRefSchema, "TRef");
registerKnownSchema(dataSourceSchema, "DataSource");
registerKnownSchema(endpointTargetSchema, "EndpointTarget");
registerKnownSchema(policyExprSchema, "PolicyExpr");
registerKnownSchema(policyRefSchema, "PolicyRef");
registerKnownSchema(exprSchema, "Expr");
registerKnownSchema(baseComponentConfigSchema, "ComponentConfig");
registerKnownSchema(themeConfigSchema, "ThemeConfig");
registerKnownSchema(i18nConfigSchema, "I18nConfig");
registerKnownSchema(statefulElementSchema, "SlotStyle");
registerKnownSchema(styleableElementSchema, "SlotStyle");

// ── Helpers ──────────────────────────────────────────────────────────────────

function section(heading: string, schemaFields: SchemaField[], parentPath: string, headingLevel = 4): string {
  const parts: string[] = [];
  parts.push(fieldsToMarkdownSections(schemaFields, parentPath, headingLevel));
  return parts.join("\n");
}

function schemaTable(schema: import("zod").ZodType, exclude?: Set<string>): SchemaField[] {
  return extractFields(schema, 0, exclude);
}

// ── Build page ───────────────────────────────────────────────────────────────

export function generateManifestReference(): void {
  const topLevelFields = schemaTable(manifestConfigSchema);

  const body = `
This reference is auto-generated from the Zod schemas in \`src/ui/manifest/schema.ts\` and related files.
It documents every field, type, default, and constraint in the manifest format.

For guides on building manifest apps, see the [Manifest Apps guide](/build/manifest-apps).

## Table of Contents

- [Top-Level Structure](#top-level-structure)
- [Dynamic Value Types](#dynamic-value-types)
- [app — Application Config](#app)
- [navigation — Navigation Config](#navigation)
- [routes — Route Tree](#routes)
- [resources — Data Resources](#resources)
- [state — Named State](#state)
- [auth — Authentication](#auth)
- [realtime — WebSocket and SSE](#realtime)
- [workflows — Action Workflows](#workflows)
- [overlays — Modal, Drawer, Confirm](#overlays)
- [toast — Toast Notifications](#toast)
- [analytics — Analytics Providers](#analytics)
- [observability — Audit and Errors](#observability)
- [push — Push Notifications](#push)
- [ssr — Server-Side Rendering](#ssr)
- [clients — Named API Clients](#clients)
- [policies — Access Control](#policies)
- [shortcuts — Keyboard Shortcuts](#shortcuts)
- [components — Custom Components](#components)
- [componentGroups — Reusable Groups](#componentgroups)
- [subApps — Mounted Sub-Applications](#subapps)
- [theme — Design Tokens](#theme)
- [i18n — Internationalization](#i18n)
- [Base Component Fields](#base-component-fields)
- [Common Sub-Schemas](#common-sub-schemas)

---

## Top-Level Structure

The root of \`snapshot.manifest.json\`. Only \`routes\` is required.

\`\`\`json
{
  "app": { "title": "My App", "shell": "sidebar", "home": "/dashboard" },
  "theme": { "flavor": "violet" },
  "navigation": { "mode": "sidebar", "items": [...] },
  "auth": { "screens": ["login", "register"], ... },
  "routes": [
    { "id": "dashboard", "path": "/dashboard", "content": [...] }
  ],
  "resources": { "user.list": { "method": "GET", "endpoint": "/api/users" } },
  "state": { "filters": { "scope": "route", "default": { "status": "all" } } },
  "workflows": { "users.after-save": { "type": "toast", "message": "Saved" } },
  "i18n": { "default": "en", "locales": ["en"] }
}
\`\`\`

${fieldsToMarkdownTable(topLevelFields)}

---

## Dynamic Value Types

Many manifest fields accept dynamic values in addition to static strings. These are the common dynamic types:

| Type | Shape | Description |
|------|-------|-------------|
| \`FromRef\` | \`{ from: string, transform?, transformArg? }\` | Reference a value from page state, resources, or context. Supports 17 transforms: \`uppercase\`, \`lowercase\`, \`trim\`, \`length\`, \`number\`, \`boolean\`, \`string\`, \`json\`, \`keys\`, \`values\`, \`first\`, \`last\`, \`count\`, \`sum\`, \`join\`, \`split\`, \`default\` |
| \`EnvRef\` | \`{ env: string, default? }\` | Reference an environment variable |
| \`TRef\` | \`{ t: string, vars? }\` | i18n translation key reference |
| \`Expr\` | \`{ expr: string }\` | Expression evaluated through the Snapshot AST parser |
| \`DataSource\` | \`string \\| FromRef \\| { resource, params? }\` | Data binding — string endpoint, FromRef, or named resource reference |
| \`EndpointTarget\` | \`string \\| { resource, params? }\` | API endpoint — string URL or named resource reference |
| \`PolicyExpr\` | \`string \\| { all } \\| { any } \\| { not } \\| { equals } \\| ...\` | Boolean logic expression with \`all\`, \`any\`, \`not\`, \`equals\`, \`not-equals\`, \`exists\`, \`truthy\`, \`falsy\`, \`in\` |

---

## \`app\`

Application-level configuration.

\`\`\`json
{
  "app": {
    "title": "Snapshot App",
    "shell": "sidebar",
    "home": "/dashboard",
    "cache": {
      "defaultCacheMs": 30000,
      "defaultStaleMs": 60000
    }
  }
}
\`\`\`

${section("app", schemaTable(appConfigSchema), "app")}

---

## \`navigation\`

Navigation UI configuration. Must define either \`items\` (legacy mode) or \`template\` (composable mode).

\`\`\`json
{
  "navigation": {
    "mode": "sidebar",
    "items": [
      { "label": "Dashboard", "path": "/dashboard", "icon": "layout-dashboard" },
      { "label": "Users", "path": "/users", "icon": "users" },
      {
        "label": "Settings",
        "icon": "settings",
        "children": [
          { "label": "General", "path": "/settings/general" },
          { "label": "Billing", "path": "/settings/billing" }
        ]
      }
    ],
    "userMenu": {
      "items": [
        { "label": { "t": "nav.logout" }, "action": { "type": "navigate", "to": "/logout" } }
      ]
    },
    "logo": { "text": { "t": "nav.brand" } }
  }
}
\`\`\`

${section("navigation", schemaTable(navigationConfigSchema), "navigation")}

### \`navigation.items[]\` — Navigation Item

Recursive schema for hierarchical navigation items.

${fieldsToMarkdownTable(schemaTable(navItemSchema))}

---

## \`routes\`

Route tree definitions. Each route requires \`id\` and \`path\`. Must define either \`content\` or \`preset\`, but not both. Children create nested routes.

\`\`\`json
{
  "routes": [
    {
      "id": "dashboard",
      "path": "/dashboard",
      "layouts": ["sidebar"],
      "title": "Dashboard",
      "guard": "authenticated",
      "content": [
        { "type": "heading", "text": "Dashboard", "level": 1 },
        {
          "type": "row",
          "gap": "md",
          "children": [
            { "type": "stat-card", "label": "Users", "value": { "from": "resources.user.stats.total" } },
            { "type": "stat-card", "label": "Revenue", "value": { "from": "resources.user.stats.revenue" } }
          ]
        },
        { "type": "data-table", "data": { "resource": "user.list" }, "columns": [...] }
      ]
    },
    {
      "id": "user-detail",
      "path": "/users/:id",
      "title": { "from": "route.params.id" },
      "content": [{ "type": "heading", "text": { "from": "resources.user.detail.name" } }],
      "children": [
        { "id": "user-posts", "path": "posts", "content": [...] }
      ]
    },
    {
      "id": "settings",
      "path": "/settings",
      "preset": "settings-page"
    }
  ]
}
\`\`\`

${section("routes[]", schemaTable(routeConfigSchema), "routes[]")}

### Route Guard (object form)

Guards can be a string (policy name) or an object:

\`\`\`json
{
  "guard": {
    "policy": "is-admin",
    "redirect": "/forbidden"
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(routeGuardConfigSchema))}

### Route Transition

\`\`\`json
{
  "transition": {
    "enter": "fade-in",
    "exit": "fade-out",
    "duration": 200
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(routeTransitionSchema))}

---

## \`resources\`

Named data resource declarations. Keyed by resource name (\`Record<string, ResourceConfig>\`).

\`\`\`json
{
  "resources": {
    "user.list": {
      "method": "GET",
      "endpoint": "/api/users",
      "cacheMs": 30000,
      "pollMs": 60000,
      "refetchOnMount": true,
      "refetchOnWindowFocus": true,
      "invalidates": ["user.stats"]
    },
    "user.stats": {
      "method": "GET",
      "endpoint": "/api/users/stats",
      "dependsOn": ["user.list"]
    },
    "user.create": {
      "method": "POST",
      "endpoint": "/api/users",
      "optimistic": {
        "target": "user.list",
        "merge": "append",
        "idField": "id"
      }
    },
    "user.delete": {
      "method": "DELETE",
      "endpoint": "/api/users/{id}",
      "optimistic": {
        "target": "user.list",
        "merge": "remove",
        "idField": "id"
      }
    },
    "external.payments": {
      "method": "GET",
      "endpoint": "/api/payments",
      "client": "payments",
      "retry": 2,
      "retryDelayMs": 500
    }
  }
}
\`\`\`

${section("resources.<name>", schemaTable(resourceConfigSchema), "resources.<name>")}

### Optimistic Update Config

Required when \`merge\` is \`"replace"\`, \`"patch"\`, or \`"remove"\`: \`idField\` must be set.

\`\`\`json
{
  "optimistic": {
    "target": "user.list",
    "merge": "append",
    "idField": "id"
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(optimisticConfigSchema))}

---

## \`state\`

Named state declarations. Keyed by state name (\`Record<string, StateValueConfig>\`).
Cannot declare both \`compute\` and \`data\` on the same state.

\`\`\`json
{
  "state": {
    "user": {
      "data": "GET /api/me",
      "default": null
    },
    "filters": {
      "scope": "route",
      "default": { "status": "all", "search": "" }
    },
    "routeCounter": {
      "scope": "route",
      "default": 0
    },
    "realtimeResult": {
      "scope": "app",
      "default": ""
    }
  }
}
\`\`\`

${section("state.<name>", schemaTable(stateValueConfigSchema), "state.<name>")}

---

## \`auth\`

Authentication screens, session handling, providers, MFA, and WebAuthn configuration.

\`\`\`json
{
  "auth": {
    "screens": ["login", "register", "forgot-password"],
    "branding": {
      "logo": "/logo.svg",
      "title": "My App",
      "description": "Welcome back"
    },
    "providers": {
      "google": { "type": "google" },
      "github": {
        "type": "github",
        "label": "Continue with GitHub Enterprise",
        "autoRedirect": true
      }
    },
    "providerMode": "auto",
    "passkey": {
      "enabled": true,
      "autoPrompt": true
    },
    "redirects": {
      "authenticated": "/dashboard",
      "afterLogin": "/reports",
      "unauthenticated": "/login",
      "forbidden": "/forbidden"
    },
    "session": {
      "mode": "token",
      "storage": "memory",
      "key": "auth.token"
    },
    "contract": {
      "endpoints": { "me": "/custom/auth/me" },
      "headers": { "csrf": "x-custom-csrf" },
      "csrfCookieName": "custom_csrf"
    },
    "on": {
      "unauthenticated": "redirect-to-login",
      "forbidden": "show-forbidden",
      "logout": "clear-session"
    },
    "screenOptions": {
      "login": {
        "title": "Welcome back",
        "description": "Use your work account",
        "submitLabel": "Continue",
        "sections": ["providers", "passkey", "form", "links"],
        "labels": {
          "providersHeading": "Use a provider",
          "passkeyButton": "Use a passkey"
        },
        "providers": ["google"],
        "providerMode": "buttons",
        "passkey": { "enabled": true },
        "fields": {
          "email": { "label": "Work email", "placeholder": "me@company.com" },
          "password": { "label": "Secret phrase" }
        },
        "links": [{ "label": "Create account", "screen": "register" }]
      }
    }
  }
}
\`\`\`

${section("auth", schemaTable(authScreenConfigSchema), "auth")}

### \`auth.session\` — Session Settings

\`\`\`json
{
  "session": {
    "mode": "token",
    "storage": "memory",
    "key": "auth.token"
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(authSessionSchema))}

### \`auth.contract\` — Endpoint Overrides

\`\`\`json
{
  "contract": {
    "endpoints": { "me": "/custom/auth/me" },
    "headers": { "csrf": "x-custom-csrf" },
    "csrfCookieName": "custom_csrf"
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(authContractSchema))}

### \`auth.providers.<name>\` — OAuth/SAML Provider

Custom providers (\`type: "custom"\`) require a \`name\` field.

\`\`\`json
{
  "providers": {
    "google": { "type": "google" },
    "github": {
      "type": "github",
      "label": "Continue with GitHub Enterprise",
      "description": "Use your engineering identity",
      "autoRedirect": true
    },
    "internal": {
      "type": "custom",
      "name": "internal-sso",
      "label": "Company SSO"
    }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(authProviderSchema))}

---

## \`realtime\`

WebSocket, Server-Sent Events, and presence configuration.

\`\`\`json
{
  "realtime": {
    "ws": {
      "url": { "env": "WS_URL", "default": "wss://example.com/ws" },
      "reconnectOnLogin": false,
      "on": {
        "connected": "ws-connected",
        "disconnected": "ws-disconnected",
        "reconnecting": "ws-reconnecting",
        "reconnectFailed": "ws-reconnect-failed"
      }
    },
    "sse": {
      "endpoints": {
        "/__sse/updates": {
          "withCredentials": true,
          "on": {
            "connected": "sse-connected",
            "error": "sse-error",
            "closed": "sse-closed"
          }
        }
      }
    },
    "presence": {
      "enabled": true,
      "channel": "app-presence",
      "heartbeatInterval": 10000,
      "offlineThreshold": 30000
    }
  }
}
\`\`\`

${section("realtime", schemaTable(realtimeConfigSchema), "realtime")}

### \`realtime.ws\` — WebSocket Config

\`events\` is merged into \`on\` so lifecycle hooks and event hooks resolve uniformly.

${section("realtime.ws", schemaTable(realtimeWsSchema), "realtime.ws")}

### \`realtime.sse.endpoints.<name>\` — SSE Endpoint

\`\`\`json
{
  "/__sse/notifications": {
    "withCredentials": true,
    "on": {
      "connected": "sse-connected",
      "error": "sse-error",
      "closed": "sse-closed"
    }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(realtimeSseEndpointSchema))}

### \`realtime.presence\` — Presence Tracking

\`\`\`json
{
  "presence": {
    "enabled": true,
    "channel": "app-presence",
    "heartbeatInterval": 10000,
    "offlineThreshold": 30000,
    "userData": { "name": "Alice" }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(presenceConfigSchema))}

---

## \`workflows\`

Named workflow definitions plus custom action declarations.
Top-level key \`actions\` declares custom action types. All other keys are workflow definitions.

\`\`\`json
{
  "workflows": {
    "users.after-save": {
      "type": "toast",
      "message": "Saved"
    },
    "users.delete": {
      "type": "if",
      "condition": {
        "left": { "from": "global.user.role" },
        "operator": "equals",
        "right": "admin"
      },
      "then": { "type": "run-workflow", "workflow": "users.delete-confirmed" }
    },
    "users.delete-confirmed": [
      { "type": "confirm", "message": "Delete this user?" },
      { "type": "api", "method": "DELETE", "endpoint": "/api/users/{id}" },
      { "type": "toast", "message": "User deleted" }
    ],
    "users.sync": {
      "type": "retry",
      "attempts": 3,
      "delayMs": 250,
      "backoffMultiplier": 2,
      "step": {
        "type": "api",
        "method": "POST",
        "endpoint": "/api/users/sync"
      },
      "onFailure": { "type": "toast", "message": "Sync failed" }
    },
    "users.reconcile": {
      "type": "try",
      "step": {
        "type": "api",
        "method": "POST",
        "endpoint": "/api/users/reconcile"
      },
      "catch": { "type": "toast", "message": "Reconcile failed" },
      "finally": { "type": "toast", "message": "Reconcile complete" }
    },
    "users.fetch-current": {
      "type": "capture",
      "action": {
        "type": "api",
        "method": "GET",
        "endpoint": { "resource": "user.list" }
      },
      "as": "current.users"
    },
    "users.decorate": [
      { "type": "assign", "values": { "source": "manifest" } },
      { "type": "toast", "message": "Decorated" }
    ],
    "auth-401": [
      { "type": "navigate", "to": "/login" }
    ]
  }
}
\`\`\`

${section("workflows", schemaTable(workflowsConfigSchema), "workflows")}

Workflow nodes support these control-flow types:

| Node Type | Key Fields | Description |
|-----------|------------|-------------|
| \`if\` | \`condition\`, \`then\`, \`else?\` | Conditional branching |
| \`wait\` | \`duration\` (ms) | Delay execution |
| \`parallel\` | \`branches[]\` | Execute branches concurrently |
| \`retry\` | \`attempts\`, \`delayMs?\`, \`backoffMultiplier?\`, \`step\`, \`onFailure?\` | Retry with backoff |
| \`assign\` | \`values\` (Record) | Set state values |
| \`try\` | \`step\`, \`catch?\`, \`finally?\` | Error handling |
| \`capture\` | \`action\`, \`as\` (string) | Execute action and capture result |

All nodes support optional \`id\` and \`when\` (condition) fields.

---

## \`overlays\`

Named overlay declarations. Keyed by overlay name (\`Record<string, OverlayConfig>\`).
Each overlay is one of three types:

\`\`\`json
{
  "overlays": {
    "help": {
      "type": "modal",
      "title": "Help",
      "content": [{ "type": "heading", "text": "Getting Started" }]
    },
    "user-edit": {
      "type": "drawer",
      "title": { "from": "overlay.payload.title" },
      "content": [
        { "type": "form", "data": { "from": "overlay.payload" }, "fields": [...] }
      ],
      "footer": {
        "actions": [
          {
            "label": "Apply",
            "dismiss": true,
            "action": {
              "type": "set-value",
              "target": "global.overlayResult",
              "value": "{overlay.payload.result}"
            }
          }
        ]
      }
    },
    "delete-confirm": {
      "type": "confirm-dialog",
      "title": "Delete Item?",
      "message": "This action cannot be undone.",
      "confirmLabel": "Delete",
      "cancelLabel": "Cancel"
    }
  }
}
\`\`\`

${(() => {
  const variants = extractUnionVariants(overlayConfigSchema);
  if (!variants) return "*Could not extract overlay variants.*";
  return variants.map((v) => {
    return `### \`overlays.<name>\` — type: \`"${v.discriminatorValue}"\`\n\n${fieldsToMarkdownTable(v.fields)}`;
  }).join("\n\n");
})()}

---

## \`toast\`

Toast notification defaults used by the \`toast\` action runtime.

\`\`\`json
{
  "toast": {
    "position": "bottom-right",
    "duration": 4000,
    "variants": {
      "success": {
        "icon": "check-circle",
        "color": "#16a34a",
        "duration": 3000
      },
      "error": {
        "icon": "alert-circle",
        "color": "#dc2626",
        "duration": 6000
      }
    }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(toastConfigSchema))}

---

## \`analytics\`

Analytics provider configuration.

\`\`\`json
{
  "analytics": {
    "providers": {
      "posthog": {
        "type": "posthog",
        "apiKey": { "env": "POSTHOG_KEY" }
      },
      "ga4": {
        "type": "ga4",
        "apiKey": "G-XXXXXXX"
      },
      "internal": {
        "type": "custom",
        "name": "internal-tracker",
        "config": { "endpoint": "/api/track" }
      }
    }
  }
}
\`\`\`

${section("analytics", schemaTable(analyticsConfigSchema), "analytics")}

### \`analytics.providers.<name>\` — Provider Declaration

Custom providers (\`type: "custom"\`) require a \`name\` field.

${fieldsToMarkdownTable(schemaTable(analyticsProviderSchema))}

---

## \`observability\`

Audit and error logging configuration.

\`\`\`json
{
  "observability": {
    "audit": {
      "sink": "/api/audit"
    },
    "errors": {
      "sink": "/api/errors",
      "include": ["TypeError", "NetworkError"]
    }
  }
}
\`\`\`

${section("observability", schemaTable(observabilityConfigSchema), "observability")}

---

## \`push\`

Push notification runtime configuration.

\`\`\`json
{
  "push": {
    "vapidPublicKey": { "env": "VAPID_PUBLIC_KEY" },
    "serviceWorkerPath": "/sw.js"
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(pushConfigSchema))}

---

## \`ssr\`

Server-side rendering configuration. When \`rsc\` is enabled, the manifest renderer loads \`rsc-manifest.json\` at startup.

\`\`\`json
{
  "ssr": {
    "rsc": true,
    "rscManifestPath": "./dist/server/rsc-manifest.json",
    "middleware": [
      { "match": "/admin/*", "workflow": "auth-check" },
      { "workflow": "global-headers" }
    ]
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(manifestSsrConfigSchema))}

---

## \`clients\`

Named API client registry (\`Record<string, ClientConfig>\`). Used by resources via the \`client\` field.

\`\`\`json
{
  "clients": {
    "payments": {
      "apiUrl": { "env": "PAYMENTS_API_URL" },
      "contract": {
        "endpoints": { "me": "/auth/whoami" }
      }
    },
    "legacy": {
      "apiUrl": "https://legacy.example.com",
      "custom": "LegacyApiClient"
    }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(clientConfigSchema))}

---

## \`policies\`

Named access control policies (\`Record<string, PolicyExpr>\`).

\`\`\`json
{
  "policies": {
    "is-admin": "admin",
    "is-admin-or-owner": {
      "any": [
        { "equals": [{ "from": "global.user.role" }, "admin"] },
        { "equals": [{ "from": "global.user.id" }, { "from": "global.resource.ownerId" }] }
      ]
    },
    "has-email": { "exists": { "from": "global.user.email" } },
    "not-banned": { "not": "is-banned" },
    "role-in-set": { "in": [{ "from": "global.user.role" }, ["admin", "editor"]] }
  }
}
\`\`\`

Policy expressions are recursive boolean logic trees:

| Operator | Shape | Description |
|----------|-------|-------------|
| \`all\` | \`{ all: PolicyExpr[] }\` | All conditions must be true (AND) |
| \`any\` | \`{ any: PolicyExpr[] }\` | At least one must be true (OR) |
| \`not\` | \`{ not: PolicyExpr }\` | Negate a condition |
| \`equals\` | \`{ equals: [a, b] }\` | Value equality |
| \`not-equals\` | \`{ "not-equals": [a, b] }\` | Value inequality |
| \`exists\` | \`{ exists: value }\` | Value is defined |
| \`truthy\` | \`{ truthy: value }\` | Value is truthy |
| \`falsy\` | \`{ falsy: value }\` | Value is falsy |
| \`in\` | \`{ in: [value, array] }\` | Value is in array |

Operands can be: \`string\`, \`number\`, \`boolean\`, \`null\`, \`FromRef\`, or \`EnvRef\`.

---

## \`shortcuts\`

Keyboard shortcut declarations (\`Record<string, ShortcutConfig>\`). Keys are keyboard shortcut strings.

\`\`\`json
{
  "shortcuts": {
    "ctrl+k": {
      "action": { "type": "open-modal", "modal": "command-palette" }
    },
    "g then d": {
      "action": { "type": "navigate", "to": "/dashboard" }
    },
    "ctrl+shift+p": {
      "label": "Open palette",
      "action": [
        { "type": "open-modal", "modal": "command-palette" },
        { "type": "track", "event": "palette.opened" }
      ]
    }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(shortcutConfigSchema))}

---

## \`components\`

Custom component declarations for manifest use.

\`\`\`json
{
  "components": {
    "custom": {
      "order-timeline": {
        "props": {
          "orderId": { "type": "string", "required": true },
          "highlight": { "type": "boolean", "default": false }
        }
      }
    }
  }
}
\`\`\`

Use custom components in route content like any built-in component:

\`\`\`json
{
  "content": [
    { "type": "order-timeline", "orderId": "abc-123", "highlight": true }
  ]
}
\`\`\`

${section("components", schemaTable(componentsConfigSchema), "components")}

Custom component props accept types: \`"string"\`, \`"number"\`, \`"boolean"\`.
Each prop can have \`required\` (boolean) and \`default\` fields.

---

## \`componentGroups\`

Reusable component groups (\`Record<string, { description?, components[] }>\`). Each group bundles a set of components that can be referenced together.

\`\`\`json
{
  "componentGroups": {
    "hero": {
      "description": "Hero banner with CTA",
      "components": [
        { "type": "markdown", "id": "title", "text": "# Welcome" },
        { "type": "button", "id": "cta", "label": "Get Started", "action": { "type": "navigate", "to": "/signup" } }
      ]
    }
  }
}
\`\`\`

Reference a group in route content with overrides:

\`\`\`json
{
  "content": [
    {
      "type": "component-group",
      "group": "hero",
      "overrides": {
        "title": { "text": "# Custom Welcome" }
      }
    }
  ]
}
\`\`\`

---

## \`subApps\`

Mounted sub-application configurations (\`Record<string, SubAppConfig>\`).

\`\`\`json
{
  "subApps": {
    "reporting": {
      "mountPath": "/reports",
      "manifest": "./reports-manifest.json",
      "inherit": {
        "theme": true,
        "i18n": true,
        "policies": true,
        "state": false
      }
    }
  }
}
\`\`\`

${fieldsToMarkdownTable(schemaTable(subAppConfigSchema))}

### \`subApps.<name>.inherit\` — Inheritance Flags

${fieldsToMarkdownTable(schemaTable(subAppInheritSchema))}

---

## \`theme\`

Design token configuration. See the [Styling and Slots guide](/build/styling-and-slots) for details.

\`theme\` accepts a \`ThemeConfig\` object. The theme schema is defined in \`src/ui/tokens/schema.ts\`.

\`\`\`json
{
  "theme": {
    "flavor": "violet",
    "mode": "dark",
    "overrides": {
      "colors": {
        "primary": "#8b5cf6",
        "secondary": "#64748b",
        "background": "#0a0a0a"
      },
      "darkColors": {
        "primary": "#3b82f6",
        "background": "#0a0a0a"
      },
      "radius": "lg",
      "spacing": "comfortable",
      "font": {
        "sans": {
          "family": "Inter",
          "source": "google",
          "weights": [400, 500, 600, 700]
        },
        "display": {
          "family": "Cal Sans",
          "source": "url",
          "url": "/fonts/cal-sans.woff2"
        },
        "baseSize": 16,
        "scale": 1.25
      },
      "components": {
        "card": { "shadow": "md" }
      }
    }
  }
}
\`\`\`

---

## \`i18n\`

Internationalization configuration. \`i18n\` accepts an \`I18nConfig\` object defined in \`src/ui/i18n/schema.ts\`.

\`\`\`json
{
  "i18n": {
    "default": "en",
    "locales": ["en", "fr", "de"],
    "detect": ["state", "navigator", "default"],
    "strings": {
      "en": {
        "greeting": "Hello",
        "nav": { "home": "Home", "logout": "Logout", "brand": "My App" }
      },
      "fr": {
        "greeting": "Bonjour",
        "nav": { "home": "Accueil", "logout": "Déconnexion", "brand": "Mon App" }
      }
    }
  }
}
\`\`\`

Reference translations with t-refs: \`{ "t": "nav.home" }\` or \`{ "t": "greeting", "vars": { "name": "Alice" } }\`.

---

## Base Component Fields

All manifest-driven components inherit these fields (60 fields). Component-specific fields are documented in the [Component Reference](/reference/components).

<details>
<summary>Show all 60 base component fields</summary>

${fieldsToMarkdownTable(schemaTable(baseComponentConfigSchema))}

</details>

---

## Common Sub-Schemas

### Loading Config

Used by data-aware components for loading state customization.

${fieldsToMarkdownTable(schemaTable(loadingConfigSchema))}

### Empty State Config

${fieldsToMarkdownTable(schemaTable(emptyStateConfigSchema))}

### Error State Config

${fieldsToMarkdownTable(schemaTable(errorStateConfigSchema))}

### Suspense Fallback Config

${fieldsToMarkdownTable(schemaTable(suspenseFallbackSchema))}

### Cache Config (\`app.cache\`)

${fieldsToMarkdownTable(schemaTable(appCacheSchema))}
`.trim();

  writeDoc(
    "reference/manifest.md",
    markdownPage(
      "Manifest Schema Reference",
      "Complete auto-generated reference for snapshot.manifest.json — all fields, types, defaults, and constraints.",
      body,
    ),
  );
}

if (import.meta.main) {
  generateManifestReference();
}
