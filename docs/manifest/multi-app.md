# Multi-App Manifest

Snapshot supports multiple API clients and mounted sub-manifests directly from
`snapshot.manifest.json`.

## `clients` and Per-Resource Client Selection

Declare named clients in `clients`, then point each resource at a client name
with `resources.<name>.client`.

```json
{
  "clients": {
    "main": { "apiUrl": { "env": "API_URL" } },
    "billing": { "apiUrl": { "env": "BILLING_API_URL" } }
  },
  "resources": {
    "users": { "method": "GET", "endpoint": "/users", "client": "main" },
    "invoices": { "method": "GET", "endpoint": "/invoices", "client": "billing" }
  }
}
```

When `resources.<name>.client` is omitted, Snapshot uses `"main"`.

Custom clients are declared in the manifest with `custom` and resolved from code
registration:

```json
{
  "clients": {
    "stripe": {
      "apiUrl": { "env": "STRIPE_API_URL" },
      "custom": "stripe-client"
    }
  }
}
```

If a manifest references an unregistered custom client name, compilation fails
with a clear error.

## `subApps` Mounts

Mount sub-manifests under path prefixes with `subApps`.

```json
{
  "subApps": {
    "admin": {
      "mountPath": "/admin",
      "manifest": {
        "app": { "home": "/users" },
        "routes": [
          {
            "id": "admin-users",
            "path": "/users",
            "page": { "content": [{ "type": "heading", "text": "Admin Users" }] }
          }
        ]
      }
    }
  }
}
```

Routes under `/admin/**` resolve against the mounted manifest with the prefix
stripped (for example, `/admin/users` resolves to sub-app route `/users`).

## Inheritance (`subApps.<id>.inherit`)

Sub-app inheritance supports:

- `theme` (default `true`)
- `i18n` (default `true`)
- `policies` (default `true`)
- `state` (default `false`)

Clients always inherit from parent to child, with child definitions replacing
same-name parent clients for the sub-app scope.
