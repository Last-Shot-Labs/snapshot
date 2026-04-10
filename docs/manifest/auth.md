# Manifest Auth

Snapshot auth is configured in the manifest. During B2, the session settings
move under `manifest.auth.session`.

## Session

```json
{
  "auth": {
    "screens": ["login"],
    "session": {
      "mode": "token",
      "storage": "sessionStorage",
      "key": "snapshot.token"
    }
  }
}
```

### Fields

- `mode` controls whether Snapshot uses cookie auth or token auth.
- `storage` controls where tokens are stored when `mode` is `token`.
- `key` sets the token storage key.

### Defaults

- `mode`: `cookie`
- `storage`: `sessionStorage`
- `key`: `snapshot.token`

When the session block is omitted, Snapshot keeps cookie mode and no-op token
storage behavior for the current bootstrap path.
