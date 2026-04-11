/**
 * Generate a JSON Schema for snapshot manifests.
 *
 * The schema is intentionally conservative and focuses on the public top-level
 * manifest contract so editors can provide autocomplete and inline validation
 * without requiring Snapshot's full runtime schema registry at generation time.
 */
export function generateJsonSchema(): Record<string, unknown> {
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Snapshot Manifest",
    description: "Configuration schema for snapshot.manifest.json",
    type: "object",
    additionalProperties: false,
    required: ["routes"],
    properties: {
      $schema: { type: "string" },
      app: { $ref: "#/definitions/app" },
      components: { type: "object" },
      theme: { type: "object" },
      toast: { type: "object" },
      analytics: { type: "object" },
      observability: { type: "object" },
      push: { type: "object" },
      ssr: { type: "object" },
      state: { type: "object" },
      navigation: { type: "object" },
      auth: { type: "object" },
      realtime: { type: "object" },
      clients: { type: "object" },
      resources: { type: "object" },
      workflows: { type: "object" },
      overlays: { type: "object" },
      presets: { type: "object" },
      policies: { type: "object" },
      i18n: { type: "object" },
      subApps: { type: "object" },
      shortcuts: { type: "object" },
      routes: {
        type: "array",
        minItems: 1,
        items: { $ref: "#/definitions/route" },
      },
    },
    definitions: {
      app: {
        type: "object",
        additionalProperties: true,
        properties: {
          title: { type: "string" },
          shell: { type: "string" },
          home: { type: "string" },
          breadcrumbs: { type: "object" },
          a11y: {
            type: "object",
            additionalProperties: false,
            properties: {
              respectReducedMotion: { type: "boolean" },
              skipLinks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["label", "target"],
                  properties: {
                    label: { type: "string" },
                    target: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      route: {
        type: "object",
        additionalProperties: true,
        required: ["id", "path"],
        properties: {
          id: { type: "string" },
          path: { type: "string" },
          title: { type: "string" },
          breadcrumb: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/definitions/component" },
          },
          preset: { type: "string" },
          presetConfig: { type: "object" },
          preload: { type: "array", items: {} },
          prefetch: { type: "array", items: {} },
          children: {
            type: "array",
            items: { $ref: "#/definitions/route" },
          },
          layouts: {
            type: "array",
            items: {
              anyOf: [{ type: "string" }, { type: "object" }],
            },
          },
        },
      },
      component: {
        type: "object",
        additionalProperties: true,
        required: ["type"],
        properties: {
          type: { type: "string" },
          id: { type: "string" },
          className: { type: "string" },
          ariaLabel: { type: "string" },
          ariaDescribedBy: { type: "string" },
          ariaLive: {
            enum: ["off", "polite", "assertive"],
          },
          role: { type: "string" },
          children: {
            type: "array",
            items: { $ref: "#/definitions/component" },
          },
        },
      },
    },
  };
}
