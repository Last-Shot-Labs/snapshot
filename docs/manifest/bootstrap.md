# Bootstrap and Env Refs

Snapshot starts with a small bootstrap surface and resolves environment values
before it compiles the manifest runtime model.

## Env References

Anywhere the manifest accepts a string, it can also accept:

```json
{ "env": "API_URL" }
```

You can also provide a fallback:

```json
{ "env": "API_URL", "default": "https://api.example.com" }
```

At compile time, Snapshot looks up the named key in the active env source. The
default source reads `import.meta.env` first and then falls back to
`process.env`.

If the env variable is missing and no default is provided, compilation fails
with a clear error.

## Why It Exists

This keeps deployment-specific values out of application code. The manifest can
stay portable while still adapting to different environments without manual
rewiring.
