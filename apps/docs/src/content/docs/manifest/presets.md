---
title: Presets
description: Factory functions that generate complete page configurations from minimal input.
draft: false
---

Presets are factory functions that generate full page configurations from a few options. Instead of writing dozens of component configs by hand, you describe what you want and the preset builds it.

## Available presets

| Preset | Description |
|--------|-------------|
| `crudPage` | Data table with create/edit/delete overlays |
| `dashboardPage` | KPI stats, charts, and activity feed |
| `settingsPage` | Sectioned settings with form fields |
| `authPage` | Login, register, and forgot-password screens |

## CRUD Page

Generates a data table with create modal, edit drawer, and delete confirmation.

```json
{
  "routes": [
    {
      "id": "users",
      "path": "/users",
      "preset": "crud",
      "presetConfig": {
        "title": "Users",
        "listEndpoint": "/api/users",
        "createEndpoint": "/api/users",
        "updateEndpoint": "/api/users",
        "deleteEndpoint": "/api/users",
        "columns": [
          { "key": "name", "label": "Name" },
          { "key": "email", "label": "Email" },
          { "key": "role", "label": "Role", "badge": true }
        ],
        "createForm": {
          "fields": [
            { "key": "name", "type": "text", "label": "Full Name", "required": true },
            { "key": "email", "type": "email", "label": "Email", "required": true },
            { "key": "role", "type": "select", "label": "Role", "options": [
              { "label": "Admin", "value": "admin" },
              { "label": "Member", "value": "member" }
            ]}
          ]
        }
      }
    }
  ]
}
```

This generates:
- A data table bound to the `listEndpoint`
- A "Create" button that opens a modal with an auto-form
- Edit and Delete row actions
- A confirm dialog for deletions

## Dashboard Page

Generates a stats row, charts, and an activity feed.

```json
{
  "routes": [
    {
      "id": "dashboard",
      "path": "/",
      "preset": "dashboard",
      "presetConfig": {
        "title": "Dashboard",
        "stats": [
          { "label": "Revenue", "endpoint": "/api/stats/revenue", "valueKey": "value", "format": "currency", "icon": "dollar-sign" },
          { "label": "Users", "endpoint": "/api/stats/users", "valueKey": "value", "icon": "users" },
          { "label": "Orders", "endpoint": "/api/stats/orders", "valueKey": "value", "icon": "shopping-cart" }
        ],
        "charts": [
          {
            "variant": "area",
            "endpoint": "/api/analytics",
            "title": "Revenue",
            "series": [{ "field": "revenue", "label": "Revenue" }]
          }
        ],
        "activityFeed": {
          "endpoint": "/api/activity",
          "title": "Recent Activity",
          "limit": 10
        }
      }
    }
  ]
}
```

## Settings Page

Generates sectioned forms, each with its own submit endpoint.

```json
{
  "routes": [
    {
      "id": "settings",
      "path": "/settings",
      "preset": "settings",
      "presetConfig": {
        "title": "Settings",
        "sections": [
          {
            "label": "Profile",
            "submitEndpoint": "/api/settings/profile",
            "dataEndpoint": "/api/settings/profile",
            "fields": [
              { "key": "name", "type": "text", "label": "Full Name", "required": true },
              { "key": "email", "type": "email", "label": "Email", "required": true },
              { "key": "bio", "type": "textarea", "label": "Bio" }
            ]
          },
          {
            "label": "Notifications",
            "submitEndpoint": "/api/settings/notifications",
            "fields": [
              { "key": "emailNotifs", "type": "toggle", "label": "Email notifications" },
              { "key": "pushNotifs", "type": "toggle", "label": "Push notifications" }
            ]
          }
        ]
      }
    }
  ]
}
```

## Auth Page

Generates login, register, and forgot-password screens with optional OAuth and passkey support.

```json
{
  "auth": {
    "preset": "auth",
    "presetConfig": {
      "screen": "login",
      "branding": {
        "appName": "My App",
        "logo": "/logo.svg",
        "tagline": "Welcome back"
      },
      "oauthProviders": ["google", "github"],
      "passkey": true,
      "redirects": {
        "afterLogin": "/",
        "register": "/register",
        "forgotPassword": "/forgot-password"
      }
    }
  }
}
```

## Using presets in code-first apps

Presets are also available as JavaScript functions for programmatic use:

```tsx
import { crudPage, dashboardPage, settingsPage } from "@lastshotlabs/snapshot/ui";

const manifest = {
  routes: [
    dashboardPage({ title: "Dashboard", stats: [...], charts: [...] }),
    crudPage({ title: "Users", listEndpoint: "/api/users", columns: [...] }),
    settingsPage({ title: "Settings", sections: [...] }),
  ],
};
```

## Next steps

- [Manifest Examples](/manifest/examples/) -- complete manifest app examples
- [Manifest Reference](/reference/manifest/) -- full schema documentation
- [Manifest Quick Start](/manifest/quick-start/) -- step-by-step guide
