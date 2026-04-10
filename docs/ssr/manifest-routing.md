# Manifest-Driven SSR Routing

Track F adds SSR routing behavior that is declared directly in the Snapshot manifest.

## Convention Fallbacks

`manifest.app.loading`, `manifest.app.error`, `manifest.app.notFound`, and
`manifest.app.offline` are now used by the SSR renderer for route fallback paths.

- 404 uses the configured `notFound` route/component.
- 500 uses the configured `error` route/component.

## Nested Route Layouts

`route.page.layout` is removed. Routes now declare `layouts`:

```json
{
  "id": "dashboard-home",
  "path": "/dashboard",
  "layouts": ["sidebar", "stacked"],
  "content": [{ "type": "heading", "text": "Dashboard" }]
}
```

Layouts are composed outermost-first in declaration order.

When `layouts` is omitted, SSR falls back to `[manifest.app.shell]`.

## Parallel Route Slots

Routes can now declare slot content:

```json
{
  "id": "dashboard-home",
  "path": "/dashboard",
  "layouts": ["sidebar"],
  "slots": {
    "sidebar": [{ "type": "list", "items": [] }],
    "main": [{ "type": "heading", "text": "Dashboard" }]
  },
  "content": [{ "type": "heading", "text": "Dashboard" }]
}
```

Slot-aware built-ins:

- `sidebar`
- `top-nav`
- `stacked`

Each slot is rendered inside its own Suspense boundary.

## SSR Middleware Workflows

Manifest SSR middleware is declared under `manifest.ssr.middleware`:

```json
{
  "ssr": {
    "middleware": [
      { "match": "/admin/**", "workflow": "require-admin" }
    ]
  }
}
```

Middleware workflows receive `input.ssr` context and can mutate response state with
SSR-only actions:

- `set-status`
- `set-header`
- `redirect`
- `rewrite`
- `halt`

`redirect` and `rewrite` are mutually exclusive in the same middleware run.
If `halt` is set, rendering is skipped.
