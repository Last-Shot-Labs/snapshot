# Manifest Realtime

Realtime connection settings live in the manifest under `manifest.realtime`.
Snapshot reads these settings during manifest compilation and uses them to
configure the runtime WebSocket and SSE managers.

## WebSocket

```json
{
  "realtime": {
    "ws": {
      "url": { "env": "WS_URL" },
      "autoReconnect": true,
      "reconnectOnLogin": true,
      "reconnectOnFocus": true,
      "on": {
        "connected": "ws-connected",
        "disconnected": "ws-disconnected",
        "reconnecting": "ws-reconnecting",
        "reconnectFailed": "ws-reconnect-failed"
      }
    }
  }
}
```

### Defaults

- `url` defaults to the API URL with `http:` rewritten to `ws:` and `https:`
  rewritten to `wss:`
- `autoReconnect` defaults to `true`
- `reconnectOnLogin` defaults to `true`
- `reconnectOnFocus` defaults to `true`

## SSE

```json
{
  "realtime": {
    "sse": {
      "reconnectOnLogin": true,
      "endpoints": {
        "/__sse/notifications": {
          "withCredentials": true,
          "on": {
            "connected": "notifications-connected",
            "error": "notifications-error",
            "closed": "notifications-closed"
          }
        }
      }
    }
  }
}
```

Each SSE endpoint is keyed by its path. Snapshot joins the key to the API URL at
runtime.

### Defaults

- `reconnectOnLogin` defaults to `true`
- `withCredentials` defaults to `false`

## Workflow Hooks

The `on` blocks map lifecycle events to workflow names. Snapshot validates those
workflow names during manifest compilation, so a missing workflow fails fast.

## Environment Values

`manifest.realtime.ws.url` accepts `{ "env": "..." }` just like other string
fields in the manifest. If the env variable is missing and no fallback is
provided, compilation fails.
