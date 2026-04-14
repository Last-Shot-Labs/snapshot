---
title: UI Reference
description: Generated from src/ui.ts and the declarations it re-exports.
draft: false
---

Generated from `src/ui.ts`.

## Contents

- [Tokens & Flavors](#tokens-flavors) (37)
- [API Client](#api-client) (2)
- [Context & Data Binding](#context-data-binding) (11)
- [State Runtime](#state-runtime) (14)
- [Actions](#actions) (49)
- [Manifest & Rendering](#manifest-rendering) (98)
- [Components — Data](#components-data) (61)
- [Components — Forms](#components-forms) (50)
- [Components — Communication](#components-communication) (30)
- [Components — Content](#components-content) (24)
- [Components — Overlay](#components-overlay) (18)
- [Components — Navigation](#components-navigation) (8)
- [Components — Layout](#components-layout) (17)
- [Components — Media](#components-media) (3)
- [Component Utilities](#component-utilities) (2)
- [Page Presets](#page-presets) (26)
- [Hooks & Utilities](#hooks-utilities) (14)
- [Icons](#icons) (3)
- [Workflows](#workflows) (19)
- [Other](#other) (5)

<details>
<summary><strong>All exports (alphabetical)</strong></summary>

| Export | Kind | Source | Description |
|---|---|---|---|
| `ActionBase` | interface | `src/ui/actions/types.ts` | Shared timing controls available on every action. |
| `ActionConfig` | typealias | `src/ui/actions/types.ts` | All possible action configs. Discriminated union on `type`. |
| `ActionExecuteFn` | typealias | `src/ui/actions/types.ts` | The execute function returned by useActionExecutor. |
| `actionSchema` | variable | `src/ui/actions/types.ts` | Discriminated union schema for all action types. Uses z.union (not z.discriminatedUnion) because some member schemas use z.lazy() for recursion, which is incompatible with z.discriminatedUnion's type requirements. |
| `ActivityFeedDef` | interface | `src/ui/presets/types.ts` | Feed section definition for dashboard-style presets. |
| `AnalyticsConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `analyticsConfigSchema`. |
| `analyticsConfigSchema` | variable | `src/ui/manifest/schema.ts` | Manifest analytics runtime configuration. |
| `AnalyticsProvider` | interface | `src/ui/analytics/types.ts` | Analytics provider runtime contract. |
| `AnalyticsProviderFactory` | typealias | `src/ui/analytics/types.ts` | Factory used to create analytics providers per snapshot instance. |
| `AnalyticsProviderInitConfig` | interface | `src/ui/analytics/types.ts` | Analytics provider initialization payload. |
| `analyticsProviderSchema` | variable | `src/ui/manifest/schema.ts` | Analytics provider declaration schema. |
| `ApiAction` | interface | `src/ui/actions/types.ts` | Call an API endpoint. |
| `apiActionSchema` | variable | `src/ui/actions/types.ts` | Schema for api action. Uses z.lazy() for recursive onSuccess/onError. |
| `AppConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `appConfigSchema`. |
| `appConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the top-level manifest `app` section. |
| `AppContextProvider` | function | `src/ui/context/providers.tsx` | Provides persistent global state that survives route changes. Initializes globals from the manifest config. |
| `AppContextProviderProps` | interface | `src/ui/context/types.ts` | Props for AppContextProvider. Wraps the entire app to provide persistent global state. |
| `AssignWorkflowNode` | interface | `src/ui/workflows/types.ts` | Write values into the workflow execution context. |
| `AtomRegistry` | interface | `src/ui/state/types.ts` | Registry of named state atoms. Backing store is shared per scope (app or route). |
| `AuthBrandingDef` | interface | `src/ui/presets/types.ts` | Branding and background options for the auth page preset. |
| `authPage` | function | `src/ui/presets/auth-page.ts` | Build a manifest page config for a common auth screen. |
| `AuthPageOptions` | interface | `src/ui/presets/types.ts` | Options for the `authPage` preset factory. |
| `authPresetConfigSchema` | variable | `src/ui/presets/schemas.ts` | Validate preset config for auth screens such as login, register, and password recovery. |
| `AuthProviderConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `authProviderSchema`. |
| `authProviderSchema` | variable | `src/ui/manifest/schema.ts` | Auth provider declaration schema. Declared at `manifest.auth.providers.<name>`. |
| `AuthScreenConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `authScreenConfigSchema`. |
| `authScreenConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the manifest auth screen and auth workflow configuration. |
| `AutoForm` | function | `src/ui/components/forms/auto-form/component.tsx` | Config-driven form component with multi-column layout, conditional field visibility, and section grouping.  Supports client-side validation, submission to an API endpoint, manifest-aware resource mutation (invalidation + optimistic handling), workflow lifecycle hooks (`beforeSubmit`, `afterSubmit`, `error`), and action chaining on success/error. Publishes form state to the page context when an `id` is configured. |
| `AutoFormConfig` | typealias | `src/ui/components/forms/auto-form/types.ts` | Inferred type for the AutoForm component config. |
| `autoFormConfigSchema` | variable | `src/ui/components/forms/auto-form/schema.ts` | Zod schema for the AutoForm component config.  Defines a config-driven form that auto-generates fields from config or OpenAPI schema. Supports validation, submission, action chaining, multi-column layout, conditional field visibility, and field grouping. |
| `AvatarGroup` | function | `src/ui/components/data/avatar-group/component.tsx` | AvatarGroup — displays a row of overlapping avatars with "+N" overflow. Supports static `avatars` array or API-loaded data. Each avatar shows an image or initials fallback with a deterministic background color. |
| `AvatarGroupConfig` | typealias | `src/ui/components/data/avatar-group/types.ts` | Inferred config type from the AvatarGroup Zod schema. |
| `avatarGroupConfigSchema` | variable | `src/ui/components/data/avatar-group/schema.ts` | Zod config schema for the AvatarGroup component. Displays a row of overlapping avatars with an optional "+N" overflow count. Commonly used for showing team members, assignees, or participants. |
| `BaseComponentConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `baseComponentConfigSchema`. |
| `baseComponentConfigSchema` | variable | `src/ui/manifest/schema.ts` | Shared base schema applied to all manifest-driven components. |
| `bootBuiltins` | function | `src/ui/manifest/boot-builtins.ts` | Register all built-in manifest registries exactly once. |
| `BreadcrumbAutoConfig` | interface | `src/ui/manifest/breadcrumbs.ts` | Auto-breadcrumb configuration used to derive labels and optional home state from routes. |
| `BreadcrumbItem` | interface | `src/ui/manifest/breadcrumbs.ts` | A single breadcrumb entry rendered from the matched route stack. |
| `Breakpoint` | typealias | `src/ui/hooks/use-breakpoint.ts` | All breakpoint names including `"default"` (below `sm`). |
| `buildEmojiMap` | function | `src/ui/components/communication/emoji-picker/custom-emoji.ts` | Builds a shortcode lookup map from an array of custom emojis. |
| `buildRequestUrl` | function | `src/ui/manifest/resources.ts` | Interpolate path params and append remaining params as a query string. |
| `BulkAction` | typealias | `src/ui/components/data/data-table/types.ts` | Inferred bulk action type. |
| `bulkActionSchema` | variable | `src/ui/components/data/data-table/schema.ts` | Schema for a bulk action on selected rows. |
| `ButtonConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `buttonConfigSchema`. |
| `buttonConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the built-in `button` component. |
| `CaptureWorkflowNode` | interface | `src/ui/workflows/types.ts` | Execute an action and capture its result into the workflow context. |
| `Card` | function | `src/ui/components/layout/card/component.tsx` | Card layout primitive for grouped content with an optional title block. |
| `CardConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `cardConfigSchema`. |
| `cardConfigSchema` | variable | `src/ui/manifest/schema.ts` | Zod config schema for the Card component. Defines a card container with optional title, subtitle, children, gap, and suspense fallback. |
| `Chart` | function | `src/ui/components/data/chart/component.tsx` | Render a config-driven chart with manifest data sources, live refresh, and slot-aware styling. |
| `ChartConfig` | typealias | `src/ui/components/data/chart/types.ts` | Inferred type for the Chart component configuration. |
| `ChartDef` | interface | `src/ui/presets/types.ts` | Chart section definition for dashboard-style presets. |
| `chartSchema` | variable | `src/ui/components/data/chart/schema.ts` | Zod schema for the Chart component configuration.  Renders a data visualization (bar, line, area, pie, donut) from an endpoint or from-ref. Uses Recharts under the hood. Colors default to `--sn-chart-1` through `--sn-chart-5` tokens. |
| `ChatWindow` | function | `src/ui/components/communication/chat-window/component.tsx` | ChatWindow — full chat interface composing a message thread, rich input, and typing indicator. Provides a Discord/Slack-style chat experience in a single config-driven component. |
| `ChatWindowConfig` | typealias | `src/ui/components/communication/chat-window/types.ts` | Inferred config type from the ChatWindow Zod schema. |
| `chatWindowConfigSchema` | variable | `src/ui/components/communication/chat-window/schema.ts` | Zod config schema for the ChatWindow component. A full chat interface composing a message thread, rich input, and typing indicator into a single component. |
| `clearPersistedState` | function | `src/ui/state/persist.ts` | Remove a persisted state value from the selected browser storage area. |
| `CloseModalAction` | interface | `src/ui/actions/types.ts` | Close a modal or drawer. |
| `closeModalActionSchema` | variable | `src/ui/actions/types.ts` | Schema for close-modal action. |
| `Code` | function | `src/ui/components/content/code/component.tsx` | Inline code primitive rendered inside flowing text or compact metadata. |
| `CodeConfig` | typealias | `src/ui/components/content/code/types.ts` | Inferred config type for the Code component. |
| `codeConfigSchema` | variable | `src/ui/components/content/code/schema.ts` | Inline code primitive schema for manifest-rendered code snippets. |
| `ColorPicker` | function | `src/ui/components/forms/color-picker/component.tsx` | Render a manifest-driven color picker input. |
| `ColorPickerConfig` | typealias | `src/ui/components/forms/color-picker/types.ts` | Config for the manifest-driven color picker component. |
| `colorPickerConfigSchema` | variable | `src/ui/components/forms/color-picker/schema.ts` | Schema for color picker components with optional swatches, alpha, and change actions. |
| `colorToOklch` | function | `src/ui/tokens/color.ts` | Convert any supported color string to OKLCH values. Supports: hex (#rgb, #rrggbb), oklch strings ("L C H"), and oklch() CSS function. |
| `Column` | function | `src/ui/components/layout/column/component.tsx` | Column layout primitive for vertical composition with the same mental model as `row`. |
| `ColumnConfig` | typealias | `src/ui/components/data/data-table/types.ts` | Inferred column configuration type. |
| `columnConfigSchema` | variable | `src/ui/components/data/data-table/schema.ts` | Schema for individual column configuration. |
| `ColumnDef` | interface | `src/ui/presets/types.ts` | A single column definition for the CRUD page table. |
| `CommandPalette` | function | `src/ui/components/overlay/command-palette/component.tsx` | CommandPalette — search-driven command palette that renders static groups or fetches remote results, then dispatches manifest actions for the selected command. |
| `CommandPaletteConfig` | typealias | `src/ui/components/overlay/command-palette/types.ts` | Inferred config type for the CommandPalette component. |
| `commandPaletteConfigSchema` | variable | `src/ui/components/overlay/command-palette/schema.ts` | Zod config schema for the CommandPalette component. A keyboard-driven overlay that groups commands, supports search with remote endpoints, tracks recent items, and dispatches actions on selection. |
| `CommentSection` | function | `src/ui/components/communication/comment-section/component.tsx` | CommentSection — displays a list of comments with author avatars, timestamps, and an embedded rich input for posting new comments. |
| `CommentSectionConfig` | typealias | `src/ui/components/communication/comment-section/types.ts` | Inferred config type from the CommentSection Zod schema. |
| `commentSectionConfigSchema` | variable | `src/ui/components/communication/comment-section/schema.ts` | Zod config schema for the CommentSection component. Renders a comment list with nested replies and an embedded rich input for posting new comments. |
| `CompareView` | function | `src/ui/components/content/compare-view/component.tsx` | CompareView component — a config-driven side-by-side diff viewer for comparing two text values. Uses a simple LCS-based line diff algorithm. Removed lines are highlighted in red, added lines in green, and unchanged lines render normally. Supports synced scrolling between panes. |
| `CompareViewConfig` | typealias | `src/ui/components/content/compare-view/types.ts` | Inferred config type from the CompareView Zod schema. |
| `compareViewConfigSchema` | variable | `src/ui/components/content/compare-view/schema.ts` | Zod config schema for the CompareView component. Defines all manifest-settable fields for a side-by-side content comparison view with diff highlighting. |
| `CompiledManifest` | interface | `src/ui/manifest/types.ts` | Runtime manifest shape produced by `compileManifest()`. |
| `CompiledRoute` | interface | `src/ui/manifest/types.ts` | Runtime route shape produced by `compileManifest()`. |
| `compileManifest` | function | `src/ui/manifest/compiler.ts` | Parse and compile a manifest into the runtime shape. |
| `ComponentConfig` | typealias | `src/ui/manifest/types.ts` | Runtime config union for manifest-renderable components. |
| `componentConfigSchema` | variable | `src/ui/manifest/schema.ts` | Union schema covering every component config Snapshot can render from a manifest. |
| `ComponentDataResult` | interface | `src/ui/components/_base/use-component-data.ts` | Result returned by `useComponentData`. Provides the fetched data, loading/error states, and a refetch function. |
| `ComponentRenderer` | function | `src/ui/manifest/renderer.tsx` | Renders a single component from its manifest config. |
| `ComponentRendererProps` | interface | `src/ui/manifest/renderer.tsx` | Props for the ComponentRenderer component. |
| `componentsConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the top-level `components` section of a manifest. |
| `ComponentTokens` | typealias | `src/ui/tokens/types.ts` | Component-level token overrides. Per-component styling knobs. |
| `componentTokensSchema` | variable | `src/ui/tokens/schema.ts` | Zod schema for component-level token overrides. |
| `ConfigDrivenComponent` | typealias | `src/ui/manifest/types.ts` | React component type that can participate in the config-driven manifest runtime. |
| `ConfirmAction` | interface | `src/ui/actions/types.ts` | Show a confirmation dialog. Stops the chain if cancelled. |
| `confirmActionSchema` | variable | `src/ui/actions/types.ts` | Schema for confirm action. |
| `ConfirmDialog` | function | `src/ui/actions/confirm.tsx` | Render the global confirmation dialog for requests queued through `useConfirmManager`. |
| `ConfirmDialogComponent` | function | `src/ui/components/overlay/confirm-dialog/component.tsx` | Confirmation dialog alias built on top of the modal overlay runtime. |
| `ConfirmDialogConfig` | typealias | `src/ui/components/overlay/confirm-dialog/types.ts` | Input config type for the ConfirmDialog component. |
| `confirmDialogConfigSchema` | variable | `src/ui/components/overlay/confirm-dialog/schema.ts` | Overlay alias schema for manifest-driven confirmation dialogs. |
| `ConfirmManager` | interface | `src/ui/actions/confirm.tsx` | Imperative API for opening a confirmation dialog from manifest actions or custom UI. |
| `ConfirmOptions` | typealias | `src/ui/actions/confirm.tsx` | Options accepted when opening a confirmation dialog. |
| `ConfirmRequest` | interface | `src/ui/actions/confirm.tsx` | Internal confirm-dialog request stored in the atom-backed manager queue. |
| `ContextMenu` | function | `src/ui/components/overlay/context-menu/component.tsx` | Render a right-click context menu backed by the shared context-menu portal runtime. |
| `ContextMenuConfig` | typealias | `src/ui/components/overlay/context-menu/types.ts` | Inferred config type for the ContextMenu component. |
| `contextMenuConfigSchema` | variable | `src/ui/components/overlay/context-menu/schema.ts` | Zod schema for the ContextMenu component. Defines a right-click menu with styleable trigger, panel, item, label, and separator surfaces. Visibility can be driven by a boolean or a binding reference. |
| `contrastRatio` | function | `src/ui/tokens/color.ts` | Calculate the WCAG contrast ratio between two supported color values. |
| `CopyAction` | interface | `src/ui/actions/types.ts` | Copy plain text and optionally continue with follow-up actions. |
| `CopyToClipboardAction` | interface | `src/ui/actions/types.ts` | Copy plain text and optionally show a simple confirmation toast. |
| `copyToClipboardActionSchema` | variable | `src/ui/actions/types.ts` | Schema for the `copy-to-clipboard` action. |
| `crudPage` | function | `src/ui/presets/crud-page.ts` | Builds a manifest `PageConfig` for a standard CRUD page.  Consumers drop the result into their manifest's `pages` record:  ```ts const manifest = {   pages: {     "/users": crudPage({       title: "Users",       listEndpoint: "GET /api/users",       createEndpoint: "POST /api/users",       deleteEndpoint: "DELETE /api/users/{id}",       columns: [         { key: "name", label: "Name" },         { key: "email", label: "Email" },         { key: "role", label: "Role", badge: true },       ],       createForm: {         fields: [           { key: "name", type: "text", label: "Name", required: true },           { key: "email", type: "email", label: "Email", required: true },         ],       },     }),   }, }; ``` |
| `CrudPageOptions` | interface | `src/ui/presets/types.ts` | Options for the `crudPage` preset factory. Produces a full CRUD page with a data table, create/edit modals, and row actions. |
| `crudPresetConfigSchema` | variable | `src/ui/presets/schemas.ts` | Validate preset config for a CRUD page assembled from list/form primitives. |
| `CUSTOM_EMOJI_CSS` | variable | `src/ui/components/communication/emoji-picker/custom-emoji.ts` | CSS for custom emoji sizing. Custom emojis render as inline images sized to match surrounding text. |
| `customComponentDeclarationSchema` | variable | `src/ui/manifest/schema.ts` | Schema for a custom component declaration under `components.custom`. |
| `customComponentPropSchema` | variable | `src/ui/manifest/schema.ts` | Schema for a declared prop on a manifest custom component registration. |
| `CustomEmoji` | interface | `src/ui/components/communication/emoji-picker/custom-emoji.ts` | Shape of a custom emoji entry. |
| `dashboardPage` | function | `src/ui/presets/dashboard-page.ts` | Builds a manifest `PageConfig` for a dashboard page.  Consumers drop the result into their manifest's `pages` record:  ```ts const manifest = {   pages: {     "/dashboard": dashboardPage({       title: "Overview",       stats: [         { label: "Total Users", endpoint: "GET /api/stats/users", valueKey: "count" },         { label: "Revenue", endpoint: "GET /api/stats/revenue", valueKey: "total", format: "currency" },         { label: "Orders", endpoint: "GET /api/stats/orders", valueKey: "total", format: "number" },         { label: "Conversion", endpoint: "GET /api/stats/conversion", valueKey: "rate", format: "percent" },       ],       recentActivity: "GET /api/activity",     }),   }, }; ``` |
| `DashboardPageOptions` | interface | `src/ui/presets/types.ts` | Options for the `dashboardPage` preset factory. Produces a dashboard with stat cards and an optional activity feed. |
| `dashboardPresetConfigSchema` | variable | `src/ui/presets/schemas.ts` | Validate preset config for a dashboard page with stats, charts, and activity sections. |
| `dataSourceSchema` | variable | `src/ui/manifest/resources.ts` | Data source accepted by data-aware manifest components. |
| `DataTable` | function | `src/ui/components/data/data-table/component.tsx` | Config-driven DataTable component.  Renders an HTML table with sorting, pagination, filtering, selection, search, row actions, and bulk actions. All behavior is driven by the `DataTableConfig` schema.  Publishes state via `usePublish` when `id` is set: `{ selected, selectedRows, selectedIds, filters, sort, page, search, data }` |
| `DataTableConfig` | typealias | `src/ui/components/data/data-table/types.ts` | Inferred DataTable configuration type from the Zod schema. |
| `dataTableConfigSchema` | variable | `src/ui/components/data/data-table/schema.ts` | Zod schema for the DataTable component configuration.  Defines a config-driven data table with sorting, pagination, filtering, selection, search, row actions, and bulk actions. |
| `DatePicker` | function | `src/ui/components/forms/date-picker/component.tsx` | Render a manifest-driven date picker input. |
| `DatePickerConfig` | typealias | `src/ui/components/forms/date-picker/types.ts` | Config for the manifest-driven date picker component. |
| `datePickerConfigSchema` | variable | `src/ui/components/forms/date-picker/schema.ts` | Schema for date picker components covering single, range, and multi-date selection. |
| `debounceAction` | function | `src/ui/actions/timing.ts` | Debounce async or sync action execution by key and resolve all pending callers with the final invocation result. |
| `defineFlavor` | function | `src/ui/tokens/flavors.ts` | Define and register a new flavor. If a flavor with the same name already exists, it is replaced. |
| `defineManifest` | function | `src/ui/manifest/compiler.ts` | Define a manifest without compiling it. |
| `deriveDarkVariant` | function | `src/ui/tokens/color.ts` | Derive a dark mode variant of a light color. Adjusts lightness and chroma for dark mode readability: - If the color is light (L > 0.5), reduce lightness moderately - If the color is dark (L <= 0.5), increase lightness for dark backgrounds - Boost chroma slightly for vibrancy in dark mode |
| `deriveForeground` | function | `src/ui/tokens/color.ts` | Derive a foreground color that passes WCAG AA contrast (4.5:1) against the given background color. Returns a light or dark foreground. |
| `DetailCard` | function | `src/ui/components/data/detail-card/component.tsx` | DetailCard — data-driven detail view that resolves fields from a record resource and renders them inside a configurable card surface with formatted values, copy-to-clipboard, and header actions. |
| `DetailCardConfig` | typealias | `src/ui/components/data/detail-card/schema.ts` | DetailCard configuration type inferred from the schema. |
| `detailCardConfigSchema` | variable | `src/ui/components/data/detail-card/schema.ts` | Zod schema for DetailCard component configuration.  The detail card displays a single record's fields in a key-value layout. Used in drawers, modals, and detail pages. |
| `detectPlatform` | function | `src/ui/components/content/link-embed/platform.ts` | Detects the platform from a URL and extracts embed info. |
| `DownloadAction` | interface | `src/ui/actions/types.ts` | Download a file from an endpoint. |
| `downloadActionSchema` | variable | `src/ui/actions/types.ts` | Schema for download action. |
| `DrawerComponent` | function | `src/ui/components/overlay/drawer/component.tsx` | Drawer component — renders a slide-in panel from the left or right edge.  Controlled by the modal manager (open-modal/close-modal actions). Content is rendered via ComponentRenderer for recursive composition. Supports FromRef trigger for auto-open behavior. |
| `DrawerConfig` | typealias | `src/ui/components/overlay/drawer/schema.ts` | Inferred type for drawer config. |
| `drawerConfigSchema` | variable | `src/ui/components/overlay/drawer/schema.ts` | Zod schema for drawer component config. Drawers are slide-in panels from the left or right edge of the screen. Like modals, they are opened/closed via the modal manager. |
| `EmojiPicker` | function | `src/ui/components/communication/emoji-picker/component.tsx` | EmojiPicker — searchable grid of emojis organized by category. Publishes `{ emoji, name }` when an emoji is selected. |
| `EmojiPickerConfig` | typealias | `src/ui/components/communication/emoji-picker/types.ts` | Inferred config type from the EmojiPicker Zod schema. |
| `emojiPickerConfigSchema` | variable | `src/ui/components/communication/emoji-picker/schema.ts` | Zod config schema for the EmojiPicker component. Renders a searchable grid of emojis organized by category. |
| `EmptyStateDef` | interface | `src/ui/presets/types.ts` | Empty-state content shown by preset-generated pages. |
| `endpointTargetSchema` | variable | `src/ui/manifest/resources.ts` | Endpoint target accepted by actions and resource-aware components. |
| `EntityPicker` | function | `src/ui/components/data/entity-picker/component.tsx` | Render a searchable entity picker from manifest-provided options or data. |
| `EntityPickerConfig` | typealias | `src/ui/components/data/entity-picker/types.ts` | Inferred config type from the EntityPicker Zod schema. |
| `entityPickerConfigSchema` | variable | `src/ui/components/data/entity-picker/schema.ts` | Zod config schema for the EntityPicker component. A searchable dropdown for selecting entities (users, documents, items) from an API endpoint. Supports single and multi-select. |
| `expandPreset` | function | `src/ui/presets/expand.ts` | Validate a named preset config and expand it into the equivalent page config. |
| `FavoriteButton` | function | `src/ui/components/data/favorite-button/component.tsx` | FavoriteButton component — a config-driven star toggle for marking favorites. Renders a star icon that toggles between active (filled/warning color) and inactive (muted foreground) states. Dispatches an optional action on toggle and publishes its active state. |
| `FavoriteButtonConfig` | typealias | `src/ui/components/data/favorite-button/types.ts` | Inferred config type from the FavoriteButton Zod schema. |
| `favoriteButtonConfigSchema` | variable | `src/ui/components/data/favorite-button/schema.ts` | Zod config schema for the FavoriteButton component. Defines all manifest-settable fields for a star toggle button used to mark items as favorites. |
| `Feed` | function | `src/ui/components/data/feed/component.tsx` | Render an activity feed with grouping, empty states, live refresh, and optional infinite scrolling. |
| `FeedConfig` | typealias | `src/ui/components/data/feed/types.ts` | Inferred type for the Feed component config (from Zod schema). |
| `FeedItem` | interface | `src/ui/components/data/feed/types.ts` | A single resolved feed item for rendering. |
| `feedSchema` | variable | `src/ui/components/data/feed/schema.ts` | Zod schema for the Feed component configuration.  Renders a scrollable activity/event stream from an endpoint or from-ref. Supports avatar, title, description, timestamp, badge fields, pagination, and publishes the selected item to the page context when `id` is set. |
| `FieldConfig` | typealias | `src/ui/components/forms/auto-form/types.ts` | Inferred type for a single field configuration. |
| `fieldConfigSchema` | variable | `src/ui/components/forms/auto-form/schema.ts` | Schema for an individual field configuration. |
| `FieldErrors` | typealias | `src/ui/components/forms/auto-form/types.ts` | Per-field validation error. |
| `FilterBar` | function | `src/ui/components/data/filter-bar/component.tsx` | FilterBar component — search input + filter dropdowns + active filter pills. Publishes `{ search, filters }` to the page context so other components (e.g., data tables) can subscribe and react to filter changes. |
| `FilterBarConfig` | typealias | `src/ui/components/data/filter-bar/types.ts` | Inferred config type for the FilterBar component. |
| `filterBarConfigSchema` | variable | `src/ui/components/data/filter-bar/schema.ts` | Zod config schema for the FilterBar component. Renders a search input + filter dropdowns + active filter pills. Publishes `{ search, filters }` to the page context. |
| `FilterDef` | interface | `src/ui/presets/types.ts` | A filter definition for the CRUD page toolbar. |
| `FilterOption` | interface | `src/ui/presets/types.ts` | A filter option entry. |
| `Flavor` | interface | `src/ui/tokens/types.ts` | Named theme preset. Provides a complete set of design tokens. |
| `FontConfig` | typealias | `src/ui/tokens/types.ts` | Font configuration. |
| `fontSchema` | variable | `src/ui/tokens/schema.ts` | Zod schema for font configuration. |
| `FormDef` | interface | `src/ui/presets/types.ts` | A form definition used in CRUD create/update modals and settings tabs. |
| `FormFieldDef` | interface | `src/ui/presets/types.ts` | A single form field definition. |
| `FormFieldOption` | interface | `src/ui/presets/types.ts` | An option entry for select/radio form fields. |
| `FromRef` | interface | `src/ui/context/types.ts` | A reference to another component's published value. Used in config objects to wire components together reactively. |
| `fromRefSchema` | variable | `src/ui/manifest/schema.ts` | Zod schema for a FromRef value. |
| `generateBreadcrumbs` | function | `src/ui/manifest/breadcrumbs.ts` | Generate breadcrumb items from the current matched route hierarchy. |
| `generateJsonSchema` | function | `src/ui/manifest/json-schema.ts` | Generate a JSON Schema for snapshot manifests.  The schema is intentionally conservative and focuses on the public top-level manifest contract so editors can provide autocomplete and inline validation without requiring Snapshot's full runtime schema registry at generation time. |
| `getAllFlavors` | function | `src/ui/tokens/flavors.ts` | Get all registered flavors as a record. |
| `getFlavor` | function | `src/ui/tokens/flavors.ts` | Retrieve a registered flavor by name. |
| `getRegisteredClient` | function | `src/api/client.ts` | Look up a previously registered custom client factory. |
| `getRegisteredGuards` | function | `src/ui/manifest/guard-registry.ts` | List the names of all currently registered route guards. |
| `getRegisteredLayouts` | function | `src/ui/layouts/registry.tsx` | List the names of all currently registered manifest layouts. |
| `getRegisteredSchemaTypes` | function | `src/ui/manifest/schema.ts` | Return the currently registered manifest component type names. |
| `getRegisteredWorkflowAction` | function | `src/ui/workflows/registry.ts` | Retrieve a registered runtime handler for a custom workflow action type. |
| `getSortableStyle` | function | `src/ui/hooks/use-drag-drop.ts` | CSS transform helper for sortable items. Converts the dnd-kit transform into a CSS transform string. |
| `GifEntry` | interface | `src/ui/components/communication/gif-picker/types.ts` | Shape of a GIF entry. |
| `GifPicker` | function | `src/ui/components/communication/gif-picker/component.tsx` | GifPicker — searchable GIF grid with support for API-powered search or static GIF data. Displays a masonry-style grid of GIF previews. |
| `GifPickerConfig` | typealias | `src/ui/components/communication/gif-picker/types.ts` | Inferred config type from the GifPicker Zod schema. |
| `gifPickerConfigSchema` | variable | `src/ui/components/communication/gif-picker/schema.ts` | Zod config schema for the GifPicker component. Searchable GIF picker that queries a GIF API (Giphy/Tenor) and displays results in a masonry-style grid. The component expects a backend proxy endpoint that handles the actual API key and returns GIF results. This avoids exposing API keys in the frontend. |
| `GlobalConfig` | typealias | `src/ui/context/types.ts` | Global state definition from the manifest. This now aliases the shared state config used by the runtime. |
| `Heading` | function | `src/ui/components/content/heading/component.tsx` | Heading component for manifest-driven page titles and section headings. Resolves FromRef and template-backed text, then renders an `h1`-`h6` element with Snapshot token-based typography defaults. |
| `HeadingConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `headingConfigSchema`. |
| `headingConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the built-in `heading` component. |
| `hexToOklch` | function | `src/ui/tokens/color.ts` | Convert a hex color string to OKLCH values. |
| `HighlightedText` | function | `src/ui/components/data/highlighted-text/component.tsx` | HighlightedText component — renders text with search query highlighting. Splits the text by the highlight query and wraps matching portions in `<mark>` elements. Lightweight and purely presentational. |
| `HighlightedTextConfig` | typealias | `src/ui/components/data/highlighted-text/types.ts` | Inferred config type from the HighlightedText Zod schema. |
| `highlightedTextConfigSchema` | variable | `src/ui/components/data/highlighted-text/schema.ts` | Zod config schema for the HighlightedText component. Renders text with search query highlighting. Matching portions are wrapped in `<mark>` elements with a configurable highlight color. |
| `hslToOklch` | function | `src/ui/tokens/color.ts` | Convert HSL values to OKLCH. |
| `httpMethodSchema` | variable | `src/ui/manifest/resources.ts` | Supported HTTP methods for manifest resources and endpoint targets. |
| `Icon` | function | `src/ui/icons/icon.tsx` | Render a Snapshot icon from the built-in icon registry. |
| `ICON_PATHS` | variable | `src/ui/icons/paths.ts` | SVG inner content for Lucide icons. Each entry maps a kebab-case icon name to the SVG child elements (path, circle, line, rect, polyline, etc.) that belong inside a 24x24 `stroke="currentColor"` SVG container. Source: https://lucide.dev — MIT-licensed. |
| `IconProps` | interface | `src/ui/icons/icon.tsx` | Props for the {@link Icon} component. |
| `IfWorkflowNode` | interface | `src/ui/workflows/types.ts` | Branch workflow execution based on a condition. |
| `injectStyleSheet` | function | `src/ui/manifest/app.tsx` | Inject or update a stylesheet in the document head. |
| `InlineEdit` | function | `src/ui/components/forms/inline-edit/component.tsx` | InlineEdit component — click-to-edit text field. Toggles between a display mode and an edit mode. Enter or blur saves the value; Escape reverts to the original value when `cancelOnEscape` is enabled. |
| `InlineEditConfig` | typealias | `src/ui/components/forms/inline-edit/types.ts` | Inferred config type for the InlineEdit component. |
| `inlineEditConfigSchema` | variable | `src/ui/components/forms/inline-edit/schema.ts` | Zod config schema for the InlineEdit component. A click-to-edit text field that toggles between display and edit modes. Publishes `{ value, editing }` to the page context. |
| `Input` | function | `src/ui/components/forms/input/component.tsx` | Config-driven Input component — a standalone text input field with label, placeholder, validation, optional icon, and helper/error text. Publishes `{ value: string }` to the page context when an `id` is set. Supports debounced `changeAction` execution on value change. |
| `InputConfig` | typealias | `src/ui/components/forms/input/types.ts` | Inferred config type from the Input Zod schema. |
| `inputConfigSchema` | variable | `src/ui/components/forms/input/schema.ts` | Zod config schema for the Input component. Defines a standalone text input field with label, placeholder, validation, and optional icon. |
| `interpolate` | function | `src/ui/actions/interpolate.ts` | Replace `{key}` placeholders with values from context. Supports nested paths: `{user.name}`, `{result.id}`. Missing keys are preserved as-is: `{unknown}` stays `{unknown}`. |
| `isFromRef` | function | `src/ui/context/utils.ts` | Type guard for FromRef values. A FromRef is an object with a single `from` string property. |
| `isResourceRef` | function | `src/ui/manifest/resources.ts` | Return `true` when a value is a manifest resource reference object. |
| `Layout` | function | `src/ui/components/layout/layout/component.tsx` | Layout shell component that wraps page content. Renders one of five layout variants based on the config: - **sidebar**: fixed sidebar (collapsible on mobile) + main content area - **top-nav**: horizontal nav bar + content below - **stacked**: vertical header/sidebar/main/footer sections - **minimal**: centered content, no nav (auth pages, onboarding) - **full-width**: edge-to-edge, no nav (landing pages) |
| `LayoutColumnConfig` | typealias | `src/ui/components/layout/column/types.ts` | Inferred config type for the Column layout component. |
| `layoutColumnConfigSchema` | variable | `src/ui/components/layout/column/schema.ts` | Zod config schema for the Column layout component. Defines a vertical flex container with responsive gap, alignment, justify, overflow, and max-height options. |
| `LayoutConfig` | typealias | `src/ui/components/layout/layout/schema.ts` | Inferred layout config type from the Zod schema. |
| `layoutConfigSchema` | variable | `src/ui/components/layout/layout/schema.ts` | Zod schema for layout component configuration. Defines the layout shell that wraps page content. |
| `LayoutProps` | interface | `src/ui/components/layout/layout/types.ts` | Props for the Layout component. |
| `LayoutVariant` | typealias | `src/ui/components/layout/layout/types.ts` | Layout variant type extracted from the schema. |
| `LinkEmbed` | function | `src/ui/components/content/link-embed/component.tsx` | LinkEmbed — renders rich URL previews with platform-specific renderers. Supports YouTube, Instagram, TikTok, Twitter/X iframes, inline GIF images, and generic Open Graph cards for all other URLs. |
| `LinkEmbedConfig` | typealias | `src/ui/components/content/link-embed/types.ts` | Inferred config type from the LinkEmbed Zod schema. |
| `linkEmbedConfigSchema` | variable | `src/ui/components/content/link-embed/schema.ts` | Zod config schema for the LinkEmbed component. Renders rich URL previews with platform-specific renderers for YouTube, Instagram, TikTok, Twitter/X, and generic Open Graph cards. Also supports inline GIF embeds. |
| `LocationInput` | function | `src/ui/components/forms/location-input/component.tsx` | LocationInput — geocode autocomplete input. Searches a backend endpoint as the user types, displays matching locations in a dropdown, and publishes `{ name, lat, lng, address }` on selection. Optionally shows a Google Maps link after selection. |
| `LocationInputConfig` | interface | `src/ui/components/forms/location-input/types.ts` | Public config shape for the LocationInput component. |
| `locationInputConfigSchema` | variable | `src/ui/components/forms/location-input/schema.ts` | Zod config schema for the LocationInput component. Geocode autocomplete input that searches a backend endpoint, displays matching locations in a dropdown, and extracts coordinates on selection. Publishes `{ name, lat, lng, address }`. |
| `LogAction` | interface | `src/ui/actions/types.ts` | Emit a structured client-side log entry. |
| `ManifestApp` | function | `src/ui/manifest/app.tsx` | Render the manifest-driven application shell. |
| `ManifestAppProps` | interface | `src/ui/manifest/types.ts` | Props accepted by the `ManifestApp` component. |
| `ManifestConfig` | typealias | `src/ui/manifest/types.ts` | Raw manifest input shape accepted by `parseManifest()` before defaults are applied during compilation. |
| `manifestConfigSchema` | variable | `src/ui/manifest/schema.ts` | Top-level schema for `snapshot.manifest.json`. |
| `ManifestRuntimeProvider` | function | `src/ui/manifest/runtime.tsx` | Provides manifest runtime state, resource cache state, and mutation helpers. |
| `Markdown` | function | `src/ui/components/content/markdown/component.tsx` | Markdown component — renders markdown content with full GFM support and syntax highlighting powered by rehype-highlight. Uses `--sn-*` design tokens for all typography, colors, and spacing. |
| `MarkdownConfig` | typealias | `src/ui/components/content/markdown/types.ts` | Inferred config type from the Markdown Zod schema. |
| `markdownConfigSchema` | variable | `src/ui/components/content/markdown/schema.ts` | Zod config schema for the Markdown component. Renders markdown content with full GFM support and syntax highlighting. |
| `meetsWcagAA` | function | `src/ui/tokens/color.ts` | Check whether two colors satisfy WCAG AA contrast for normal or large text. |
| `MessageThread` | function | `src/ui/components/communication/message-thread/component.tsx` | MessageThread — scrollable message list with avatars, timestamps, message grouping, and date separators. Renders HTML content from TipTap or other sources with sanitization. |
| `MessageThreadConfig` | typealias | `src/ui/components/communication/message-thread/types.ts` | Inferred config type from the MessageThread Zod schema. |
| `messageThreadConfigSchema` | variable | `src/ui/components/communication/message-thread/schema.ts` | Zod config schema for the MessageThread component. Renders a scrollable message list with avatars, timestamps, message grouping, date separators, and optional reactions/threading. |
| `ModalComponent` | function | `src/ui/components/overlay/modal/component.tsx` | Modal component — renders an overlay dialog with child components.  Controlled by the modal manager (open-modal/close-modal actions). Content is rendered via ComponentRenderer for recursive composition. Supports FromRef trigger for auto-open behavior. |
| `ModalConfig` | typealias | `src/ui/components/overlay/modal/schema.ts` | Inferred type for modal config. |
| `modalConfigSchema` | variable | `src/ui/components/overlay/modal/schema.ts` | Zod schema for modal component config. Modals are overlay dialogs that display child components. They are opened/closed via the modal manager (open-modal/close-modal actions). |
| `ModalManager` | interface | `src/ui/actions/modal-manager.ts` | Return type of useModalManager. |
| `MultiSelect` | function | `src/ui/components/forms/multi-select/component.tsx` | Config-driven MultiSelect component — a dropdown with checkboxes for selecting multiple values. Supports static options, API-loaded options, search filtering, max selection limits, and pill display for selected items. Publishes `{ value: string[] }` to the page context when an `id` is set. |
| `MultiSelectConfig` | typealias | `src/ui/components/forms/multi-select/types.ts` | Inferred config type from the MultiSelect Zod schema. |
| `multiSelectConfigSchema` | variable | `src/ui/components/forms/multi-select/schema.ts` | Zod config schema for the MultiSelect component. Defines a dropdown with checkboxes for selecting multiple values, with optional search filtering and pill display. |
| `Nav` | function | `src/ui/components/layout/nav/component.tsx` | Grouped navigation component for manifest app shells. Renders either `navigation.items` or a composable nav template, resolves translated labels at render time, applies canonical slot/state styling, and optionally renders logo and user-menu surfaces. |
| `NavConfig` | typealias | `src/ui/components/layout/nav/schema.ts` | Runtime config type for the Nav component. |
| `navConfigSchema` | variable | `src/ui/components/layout/nav/schema.ts` | Zod schema for the grouped Nav component. Supports either `items`-driven navigation or template composition, optional logo and user menu configuration, collapsible sidebar behavior, and canonical slot-based surface styling. |
| `NavigateAction` | interface | `src/ui/actions/types.ts` | Navigate to a route. |
| `navigateActionSchema` | variable | `src/ui/actions/types.ts` | Schema for navigate action. |
| `NavigationConfig` | typealias | `src/ui/manifest/types.ts` | Runtime view of `navigationConfigSchema`. Navigation labels remain locale-resolved at render time. |
| `navigationConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the top-level manifest navigation configuration. |
| `NavItem` | interface | `src/ui/manifest/types.ts` | Navigation item rendered by Snapshot navigation components. |
| `NavItemConfig` | typealias | `src/ui/components/layout/nav/schema.ts` | Runtime config type for a grouped nav item, including optional child items and per-item slots. |
| `navItemSchema` | variable | `src/ui/manifest/schema.ts` | Recursive schema for navigation items used by manifest navigation surfaces. |
| `NotificationBell` | function | `src/ui/components/data/notification-bell/component.tsx` | NotificationBell component — a config-driven bell icon with unread count badge. Shows a bell icon with an optional red badge displaying the unread count. Badge is hidden when count is 0 or undefined. Counts exceeding `max` are displayed as "{max}+". |
| `NotificationBellConfig` | typealias | `src/ui/components/data/notification-bell/types.ts` | Inferred config type from the NotificationBell Zod schema. |
| `notificationBellConfigSchema` | variable | `src/ui/components/data/notification-bell/schema.ts` | Zod config schema for the NotificationBell component.  Defines all manifest-settable fields for a bell icon with an unread count badge. |
| `oklchToHex` | function | `src/ui/tokens/color.ts` | Convert OKLCH values back to a hex color string. Used for serializing runtime overrides. |
| `oklchToString` | function | `src/ui/tokens/color.ts` | Format OKLCH values as a CSS-compatible string (without the oklch() wrapper). Output format: "L C H" where L, C, H are rounded to 3 decimal places. |
| `OpenModalAction` | interface | `src/ui/actions/types.ts` | Open a modal or drawer by id. |
| `openModalActionSchema` | variable | `src/ui/actions/types.ts` | Schema for open-modal action. |
| `Outlet` | function | `src/ui/components/layout/outlet/component.tsx` | Layout outlet primitive used to render nested child routes from the compiled manifest route tree. |
| `outletComponentSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the built-in `outlet` component used by route layouts. |
| `OutletConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `outletComponentSchema`. |
| `OverlayConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `overlayConfigSchema`. |
| `overlayConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for named modal, drawer, and confirm-dialog overlay declarations. |
| `OverlayRuntimeProvider` | function | `src/ui/manifest/runtime.tsx` | Provide the current overlay runtime payload and metadata. |
| `PageConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `pageConfigSchema`. |
| `pageConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for a manifest page definition. |
| `PageContextProvider` | function | `src/ui/context/providers.tsx` | Provides per-page state that is destroyed on route change. |
| `PageContextProviderProps` | interface | `src/ui/context/types.ts` | Props for PageContextProvider. Wraps each page/route to provide per-page component state. |
| `PageRenderer` | function | `src/ui/manifest/renderer.tsx` | Renders a page from its manifest config. |
| `PageRendererProps` | interface | `src/ui/manifest/renderer.tsx` | Props for the PageRenderer component. |
| `PaginationDef` | interface | `src/ui/presets/types.ts` | Pagination settings for preset-generated list surfaces. |
| `PaginationState` | interface | `src/ui/components/data/data-table/types.ts` | Pagination state for the data table. |
| `ParallelWorkflowNode` | interface | `src/ui/workflows/types.ts` | Run multiple workflow definitions in parallel. |
| `parseManifest` | function | `src/ui/manifest/compiler.ts` | Parse an unknown value into a validated manifest. |
| `parseOklchString` | function | `src/ui/tokens/color.ts` | Parse an oklch string (the CSS variable format "L C H") back to values. |
| `parseShortcodes` | function | `src/ui/components/communication/emoji-picker/custom-emoji.ts` | Parses shortcodes in text and replaces them with `<img>` tags. |
| `Platform` | typealias | `src/ui/components/content/link-embed/platform.ts` | Platform detection and embed URL extraction. Identifies known platforms from URLs and extracts the embed-compatible URL or ID needed to render platform-specific iframes. |
| `PLATFORM_COLORS` | variable | `src/ui/components/content/link-embed/platform.ts` | Platform accent colors. |
| `PLATFORM_NAMES` | variable | `src/ui/components/content/link-embed/platform.ts` | Platform display names. |
| `PlatformInfo` | interface | `src/ui/components/content/link-embed/platform.ts` | Resolved platform metadata used to render a platform-specific embedded preview. |
| `Popover` | function | `src/ui/components/overlay/popover/component.tsx` | Floating panel component triggered by a button-like control. Uses the shared floating panel primitive, applies canonical slot styling to trigger and content surfaces, and publishes `{ isOpen }` when an `id` is configured. |
| `PopoverConfig` | typealias | `src/ui/components/overlay/popover/types.ts` | Inferred config type for the Popover component. |
| `popoverConfigSchema` | variable | `src/ui/components/overlay/popover/schema.ts` | Zod schema for the Popover component. Defines a trigger-driven floating panel with optional title, description, footer content, width, placement, and canonical slot-based styling for the trigger and panel sub-surfaces. |
| `PrefetchLink` | function | `src/ui/components/navigation/prefetch-link/component.tsx` | `<PrefetchLink>` — a prefetch primitive that renders a plain `<a>` anchor and automatically injects `<link rel="prefetch">` tags for the matching route's JS chunks and CSS files.  Prefetch is triggered by the `prefetch` config field: - `'hover'`    — prefetch when the user mouses over the link (default) - `'viewport'` — prefetch as soon as the link scrolls into view - `'none'`     — no automatic prefetching  This component renders a plain `<a>` tag and does **not** import TanStack Router's `<Link>`. It is a prefetch primitive — consumers wire their own router. This design avoids a peer dependency on TanStack Router in the component library. |
| `PrefetchLinkConfig` | typealias | `src/ui/components/navigation/prefetch-link/schema.ts` | The output type of `prefetchLinkSchema` — all fields fully resolved with defaults applied. This is the type received by the component implementation. |
| `prefetchLinkSchema` | variable | `src/ui/components/navigation/prefetch-link/schema.ts` | Zod schema for `<PrefetchLink>` config.  `<PrefetchLink>` is a prefetch primitive that renders a plain `<a>` tag and automatically injects `<link rel="prefetch">` tags for the route's JS chunks and CSS files when the user hovers over the link or when it enters the viewport.  It is not a router-aware component — consumers wire their own router. This avoids a peer dependency on TanStack Router. |
| `PresenceIndicator` | function | `src/ui/components/communication/presence-indicator/component.tsx` | PresenceIndicator — displays online/offline/away/busy/dnd status with a colored dot and optional label. |
| `PresenceIndicatorConfig` | typealias | `src/ui/components/communication/presence-indicator/types.ts` | Inferred config type from the PresenceIndicator Zod schema. |
| `presenceIndicatorConfigSchema` | variable | `src/ui/components/communication/presence-indicator/schema.ts` | Zod config schema for the PresenceIndicator component. Displays an online/offline/away/busy/dnd status dot with optional label. |
| `PushConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `pushConfigSchema`. |
| `pushConfigSchema` | variable | `src/ui/manifest/schema.ts` | Manifest push-notification runtime configuration. |
| `QuickAdd` | function | `src/ui/components/forms/quick-add/component.tsx` | QuickAdd component — a config-driven inline creation bar for quick item entry. Renders a horizontal bar with an optional icon, text input, and submit button. Enter key submits by default. Dispatches `submitAction` with `{ value }` payload and publishes the current input value. |
| `QuickAddConfig` | typealias | `src/ui/components/forms/quick-add/types.ts` | Inferred config type from the QuickAdd Zod schema. |
| `quickAddConfigSchema` | variable | `src/ui/components/forms/quick-add/schema.ts` | Zod config schema for the QuickAdd component. Defines all manifest-settable fields for an inline creation bar that allows quick item entry with a text input and submit button. |
| `RadiusScale` | typealias | `src/ui/tokens/types.ts` | Border radius scale. |
| `radiusSchema` | variable | `src/ui/tokens/schema.ts` | Zod schema for border radius scale. |
| `ReactionBar` | function | `src/ui/components/communication/reaction-bar/component.tsx` | ReactionBar — displays emoji reactions with counts and an optional add button that opens an emoji picker popover. |
| `ReactionBarConfig` | typealias | `src/ui/components/communication/reaction-bar/types.ts` | Inferred config type from the ReactionBar Zod schema. |
| `reactionBarConfigSchema` | variable | `src/ui/components/communication/reaction-bar/schema.ts` | Zod config schema for the ReactionBar component. Displays emoji reactions with counts and an add button. |
| `readPersistedState` | function | `src/ui/state/persist.ts` | Read and JSON-decode a persisted state value, returning `undefined` on failure or absence. |
| `RefreshAction` | interface | `src/ui/actions/types.ts` | Re-fetch a component's data. |
| `refreshActionSchema` | variable | `src/ui/actions/types.ts` | Schema for refresh action. |
| `registerAnalyticsProvider` | function | `src/ui/analytics/registry.ts` | Register a custom analytics provider factory by name. |
| `registerBuiltInComponents` | function | `src/ui/components/register.ts` | Register all built-in config-driven components with the manifest system. The function is idempotent so boot code can call it safely without worrying about duplicate registrations. |
| `registerClient` | function | `src/api/client.ts` | Register a named custom client factory. |
| `registerComponent` | function | `src/ui/manifest/component-registry.tsx` | Register a React component for a manifest component type string. Used by the framework for built-in components and by consumers for custom components.  Emits a dev warning if overriding an existing registration. |
| `registerComponentSchema` | function | `src/ui/manifest/schema.ts` | Register a component-specific manifest schema by component `type`. |
| `registerGuard` | function | `src/ui/manifest/guard-registry.ts` | Register a named route guard implementation for manifest resolution. |
| `registerLayout` | function | `src/ui/layouts/registry.tsx` | Register a named layout component for manifest layout resolution. |
| `registerWorkflowAction` | function | `src/ui/workflows/registry.ts` | Register a runtime handler for a custom workflow action type. |
| `relativeLuminance` | function | `src/ui/tokens/color.ts` | Compute relative luminance from OKLCH for WCAG contrast calculations. Uses sRGB relative luminance (rec. 709) from the linear RGB values. |
| `resetBootBuiltins` | function | `src/ui/manifest/boot-builtins.ts` | Reset the boot flag so tests can re-run built-in registration deterministically. |
| `resetBuiltInComponentRegistration` | function | `src/ui/components/register.ts` | Reset the built-in component registration guard so tests can rebuild the registry. |
| `ResolvedColumn` | interface | `src/ui/components/data/data-table/types.ts` | Resolved column definition used internally by the hook and component. |
| `ResolvedConfig` | typealias | `src/ui/context/types.ts` | Resolves a type where FromRef values are replaced with their resolved types. Used internally — consumers don't need to use this directly. |
| `ResolvedNavItem` | interface | `src/ui/components/layout/nav/types.ts` | A nav item enriched with computed state: active detection, visibility based on role, and resolved badge value. |
| `resolveEmojiRecords` | function | `src/ui/components/communication/emoji-picker/custom-emoji.ts` | Resolves emoji records from the API into CustomEmoji entries. Handles the `uploadKey` → `url` resolution using a URL prefix or field mapping. |
| `resolveFrameworkStyles` | function | `src/ui/tokens/resolve.ts` | Returns a CSS string containing framework-level styles:  1. CSS reset (box-sizing, margin, padding, body defaults, font inherit) 2. Component polish CSS — data-attribute-driven styles for page layout,    data-table, stat-card, form, detail-card, and focus rings.  All values are parameterized via `--sn-*` token custom properties so the output adapts to whatever theme tokens are active. |
| `resolveGuard` | function | `src/ui/manifest/guard-registry.ts` | Resolve a previously registered route guard by name. |
| `resolveLayout` | function | `src/ui/layouts/registry.tsx` | Resolve a previously registered layout by name. |
| `resolveResponsiveValue` | function | `src/ui/hooks/use-breakpoint.ts` | Resolve a responsive value for a given breakpoint. Cascades down: if the active breakpoint isn't defined, falls back to the next smaller breakpoint, then `default`. For flat (non-object) values, returns the value directly. |
| `resolveTokens` | function | `src/ui/tokens/resolve.ts` | Resolve a theme configuration into a complete CSS string.  Pipeline: 1. Load base flavor (default: neutral) 2. Deep merge overrides onto flavor defaults 3. Convert all colors to oklch 4. Auto-derive foreground colors (contrast-aware) 5. Auto-derive dark mode colors if not provided 6. Map radius/spacing/font to CSS 7. Generate component-level tokens 8. Output CSS string with :root, .dark, and component selectors |
| `ResourceConfigMap` | typealias | `src/ui/manifest/types.ts` | Named manifest resource map keyed by resource id. |
| `resourceConfigSchema` | variable | `src/ui/manifest/resources.ts` | Schema for a manifest resource declaration. |
| `resourceRefSchema` | variable | `src/ui/manifest/resources.ts` | Reference to a named manifest resource with optional parameter overrides. |
| `Responsive` | typealias | `src/ui/tokens/types.ts` | A breakpoint-aware value. Flat value or responsive map. |
| `RetryWorkflowNode` | interface | `src/ui/workflows/types.ts` | Retry a workflow definition with optional delay and backoff. |
| `RichInput` | function | `src/ui/components/content/rich-input/component.tsx` | RichInput component — TipTap-based WYSIWYG editor for chat messages, comments, and posts. Users see formatted text as they type. Publishes `{ html, text, mentions }` to the page context when content changes. |
| `RichInputConfig` | typealias | `src/ui/components/content/rich-input/types.ts` | Inferred config type from the RichInput Zod schema. |
| `richInputConfigSchema` | variable | `src/ui/components/content/rich-input/schema.ts` | Zod config schema for the RichInput component. A TipTap-based WYSIWYG editor for chat messages, comments, and posts. Users see formatted text as they type (bold, italic, mentions, etc.) rather than raw markdown. |
| `RichTextEditor` | function | `src/ui/components/content/rich-text-editor/component.tsx` | RichTextEditor component — a CodeMirror 6-based markdown editor with toolbar, preview pane, and split view support.  Fetches initial content from config or via from-ref, publishes the current markdown content to the page context when the editor has an id. |
| `RichTextEditorConfig` | typealias | `src/ui/components/content/rich-text-editor/types.ts` | Inferred config type from the RichTextEditor Zod schema. |
| `richTextEditorConfigSchema` | variable | `src/ui/components/content/rich-text-editor/schema.ts` | Zod config schema for the RichTextEditor component. Defines all manifest-settable fields for a CodeMirror 6-based markdown editor with toolbar, preview pane, and split view support. |
| `RouteConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `routeConfigSchema`. |
| `routeConfigSchema` | variable | `src/ui/manifest/schema.ts` | Recursive schema for a manifest route tree node. |
| `RouteGuard` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `routeGuardSchema`. |
| `RouteGuardConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `routeGuardConfigSchema`. |
| `routeGuardConfigSchema` | variable | `src/ui/manifest/schema.ts` | Object-form route guard schema with auth, role, and policy controls. |
| `routeGuardSchema` | variable | `src/ui/manifest/schema.ts` | Route guard schema, accepting either a named guard or inline guard config. |
| `RouteMatch` | interface | `src/ui/manifest/types.ts` | Resolved route match for the current pathname. |
| `RouteRuntimeProvider` | function | `src/ui/manifest/runtime.tsx` | Provide route runtime state to manifest-rendered components. |
| `routeTransitionSchema` | variable | `src/ui/manifest/schema.ts` | Schema for route transition metadata. |
| `RowAction` | typealias | `src/ui/components/data/data-table/types.ts` | Inferred row action type. |
| `rowActionSchema` | variable | `src/ui/components/data/data-table/schema.ts` | Schema for a per-row action button. |
| `RowConfig` | interface | `src/ui/manifest/types.ts` | Runtime config for the built-in `row` layout component. |
| `rowConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the built-in `row` layout component. |
| `RuntimeStateConfig` | interface | `src/ui/state/types.ts` | Named state definition from the manifest. App-scope state persists for the app lifetime. Route-scope state is recreated whenever the active route changes. |
| `runWorkflow` | function | `src/ui/workflows/engine.ts` | Execute a workflow definition against the supplied runtime hooks and mutable context. |
| `RunWorkflowAction` | interface | `src/ui/actions/types.ts` | Run a named manifest workflow. |
| `runWorkflowActionSchema` | variable | `src/ui/actions/types.ts` | Schema for run-workflow action. |
| `SaveIndicator` | function | `src/ui/components/data/save-indicator/component.tsx` | SaveIndicator component — a config-driven inline status indicator showing idle, saving, saved, or error states. - idle: nothing rendered - saving: spinning loader icon + saving text - saved: check icon + saved text (success color) - error: alert-circle icon + error text (destructive color) |
| `SaveIndicatorConfig` | typealias | `src/ui/components/data/save-indicator/types.ts` | Inferred config type from the SaveIndicator Zod schema. |
| `saveIndicatorConfigSchema` | variable | `src/ui/components/data/save-indicator/schema.ts` | Zod config schema for the SaveIndicator component. Defines all manifest-settable fields for a save status indicator that shows idle, saving, saved, or error states. |
| `ScrollArea` | function | `src/ui/components/data/scroll-area/component.tsx` | ScrollArea component — a scrollable container with custom-styled thin scrollbars. Supports vertical, horizontal, or bidirectional scrolling. Scrollbar visibility can be always, hover-only, or auto. Uses a scoped `<style>` tag for webkit scrollbar pseudo-element styling. |
| `ScrollAreaConfig` | typealias | `src/ui/components/data/scroll-area/types.ts` | Inferred config type for the ScrollArea component. |
| `scrollAreaConfigSchema` | variable | `src/ui/components/data/scroll-area/schema.ts` | Zod config schema for the ScrollArea component. A scrollable container with custom-styled thin scrollbars that respect the design token system. |
| `ScrollToAction` | interface | `src/ui/actions/types.ts` | Show a toast notification. |
| `scrollToActionSchema` | variable | `src/ui/actions/types.ts` | Schema for the `scroll-to` action. |
| `Select` | function | `src/ui/components/forms/select/component.tsx` | Manifest-driven select input with support for static options and resource-backed option lists. |
| `SelectConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `selectConfigSchema`. |
| `selectConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for the built-in `select` component. |
| `Separator` | function | `src/ui/components/data/separator/component.tsx` | Separator component — a simple visual divider line (horizontal or vertical). Renders a thin line using the border color token. When a label is provided, it renders centered text flanked by lines on each side (common for "or" dividers, date separators, etc.). |
| `SeparatorConfig` | typealias | `src/ui/components/data/separator/types.ts` | Inferred config type for the Separator component. |
| `separatorConfigSchema` | variable | `src/ui/components/data/separator/schema.ts` | Zod config schema for the Separator component. A simple visual divider line, either horizontal or vertical. Optionally renders a centered label between the lines. |
| `SeriesConfig` | typealias | `src/ui/components/data/chart/types.ts` | Inferred type for a single chart series config. |
| `seriesConfigSchema` | variable | `src/ui/components/data/chart/schema.ts` | Schema for a single data series in the chart. |
| `settingsPage` | function | `src/ui/presets/settings-page.ts` | Builds a manifest `PageConfig` for a settings page.  Consumers drop the result into their manifest's `pages` record:  ```ts const manifest = {   pages: {     "/settings": settingsPage({       title: "Settings",       sections: [         {           label: "Profile",           submitEndpoint: "PATCH /api/me/profile",           dataEndpoint: "GET /api/me/profile",           fields: [             { key: "name", type: "text", label: "Name", required: true },             { key: "bio", type: "textarea", label: "Bio" },           ],         },         {           label: "Password",           submitEndpoint: "POST /api/me/password",           fields: [             { key: "currentPassword", type: "password", label: "Current Password", required: true },             { key: "newPassword", type: "password", label: "New Password", required: true },           ],         },       ],     }),   }, }; ``` |
| `SettingsPageOptions` | interface | `src/ui/presets/types.ts` | Options for the `settingsPage` preset factory. Produces a settings page with a tab per section, each containing an AutoForm. |
| `settingsPresetConfigSchema` | variable | `src/ui/presets/schemas.ts` | Validate preset config for a settings page composed from one or more submitted sections. |
| `SettingsSectionDef` | interface | `src/ui/presets/types.ts` | A single settings section (one tab in the settings page). |
| `SetValueAction` | interface | `src/ui/actions/types.ts` | Set another component's published value. |
| `setValueActionSchema` | variable | `src/ui/actions/types.ts` | Schema for set-value action. |
| `ShowToastOptions` | interface | `src/ui/actions/toast.tsx` | User-facing toast options accepted by the toast manager. |
| `Slider` | function | `src/ui/components/forms/slider/component.tsx` | Render a manifest-driven slider input. |
| `SliderConfig` | typealias | `src/ui/components/forms/slider/types.ts` | Config for the manifest-driven slider component. |
| `sliderConfigSchema` | variable | `src/ui/components/forms/slider/schema.ts` | Schema for single-value and ranged slider controls with optional value display/actions. |
| `SnapshotApiContext` | variable | `src/ui/actions/executor.ts` | API client context consumed by built-in `api`, `download`, and related runtime actions. |
| `SnapshotImage` | function | `src/ui/components/media/image/component.tsx` | Render a manifest-driven image component with Snapshot styling tokens. |
| `SnapshotImageConfig` | typealias | `src/ui/components/media/image/types.ts` | Inferred config type from the SnapshotImage Zod schema. This is the single source of truth for what props the `<SnapshotImage>` component accepts. Never define this type manually. |
| `snapshotImageSchema` | variable | `src/ui/components/media/image/schema.ts` | Schema for optimized image components rendered through Snapshot's image route. |
| `SortState` | interface | `src/ui/components/data/data-table/types.ts` | Sort state for the data table. |
| `SpacingScale` | typealias | `src/ui/tokens/types.ts` | Spacing density. Affects padding, gaps, and margins globally. |
| `spacingSchema` | variable | `src/ui/tokens/schema.ts` | Zod schema for spacing density. |
| `StatCard` | function | `src/ui/components/data/stat-card/component.tsx` | StatCard component — a data-fetching card that displays a single metric with optional trend indicator.  Fetches data from the configured endpoint, formats the value according to the format config, and optionally shows a trend arrow with color coding based on sentiment. |
| `StatCardConfig` | typealias | `src/ui/components/data/stat-card/types.ts` | Inferred config type from the StatCard Zod schema. |
| `statCardConfigSchema` | variable | `src/ui/components/data/stat-card/schema.ts` | Zod config schema for the StatCard component.  Defines all manifest-settable fields for a stat card that displays a single metric with optional trend indicator. |
| `StatDef` | interface | `src/ui/presets/types.ts` | A single stat card definition for the dashboard page. |
| `StateConfig` | typealias | `src/ui/manifest/types.ts` | Named manifest state map keyed by state id. |
| `StateConfigMap` | typealias | `src/ui/state/types.ts` | Map of named state definitions declared by the manifest runtime. |
| `StateHookScope` | typealias | `src/ui/state/hooks.ts` | Hook-level scope override that can force app, route, or auto-discovered state resolution. |
| `StateProviderProps` | interface | `src/ui/state/types.ts` | Props accepted by the provider layer that wires manifest state into a React tree. |
| `StateScope` | typealias | `src/ui/state/types.ts` | Lifetime scope for manifest state: shared across the app or recreated per route. |
| `StateValueConfig` | typealias | `src/ui/manifest/types.ts` | Runtime state declaration for a single named manifest state value. |
| `stateValueConfigSchema` | variable | `src/ui/manifest/schema.ts` | Schema for a named manifest state value declaration. |
| `TabConfig` | typealias | `src/ui/components/navigation/tabs/schema.ts` | Inferred type for a single tab config. |
| `tabConfigSchema` | variable | `src/ui/components/navigation/tabs/schema.ts` | Schema for a single tab within the tabs component. |
| `TabsComponent` | function | `src/ui/components/navigation/tabs/component.tsx` | Tabs component — renders a tab bar with content panels.  Each tab's content is rendered via ComponentRenderer for recursive composition. Publishes `{ activeTab, label }` when the component has an id. Lazy-renders tab content: only mounts a tab when first activated, then keeps it mounted. |
| `TabsConfig` | typealias | `src/ui/components/navigation/tabs/schema.ts` | Inferred type for tabs config. |
| `tabsConfigSchema` | variable | `src/ui/components/navigation/tabs/schema.ts` | Zod schema for tabs component config. Tabs provide in-page navigation between content panels. Each tab's content is rendered via ComponentRenderer. |
| `TagSelector` | function | `src/ui/components/forms/tag-selector/component.tsx` | TagSelector component — a tag input for selecting and creating tags. Displays selected tags as colored pills with remove buttons. Includes a text input for searching available tags and optionally creating new ones. |
| `TagSelectorConfig` | typealias | `src/ui/components/forms/tag-selector/types.ts` | Inferred config type from the TagSelector Zod schema. |
| `tagSelectorConfigSchema` | variable | `src/ui/components/forms/tag-selector/schema.ts` | Zod config schema for the TagSelector component. A tag input that allows selecting from predefined tags or creating new ones. Tags display as colored pills with remove buttons. |
| `Textarea` | function | `src/ui/components/forms/textarea/component.tsx` | Config-driven Textarea component — a multi-line text input with label, character count, validation, and configurable resize. Publishes `{ value: string }` to the page context when an `id` is set. Shows a character count indicator when `maxLength` is configured. |
| `TextareaConfig` | typealias | `src/ui/components/forms/textarea/types.ts` | Inferred config type from the Textarea Zod schema. |
| `textareaConfigSchema` | variable | `src/ui/components/forms/textarea/schema.ts` | Zod config schema for the Textarea component. Defines a multi-line text input with label, character count, validation, and configurable resize behavior. |
| `ThemeColors` | typealias | `src/ui/tokens/types.ts` | Semantic color tokens. Each generates a CSS custom property. |
| `themeColorsSchema` | variable | `src/ui/tokens/schema.ts` | Zod schema for semantic color tokens. Each generates a CSS custom property. |
| `ThemeConfig` | typealias | `src/ui/tokens/types.ts` | Theme configuration in the manifest. |
| `themeConfigSchema` | variable | `src/ui/tokens/schema.ts` | Zod schema for the full theme configuration in the manifest. |
| `throttleAction` | function | `src/ui/actions/timing.ts` | Throttle async or sync action execution by key and drop calls inside the active throttle window. |
| `ToastAction` | interface | `src/ui/actions/types.ts` | Show a toast notification. |
| `toastActionSchema` | variable | `src/ui/actions/types.ts` | Schema for toast action. Uses z.lazy() for recursive action. |
| `ToastConfig` | typealias | `src/ui/manifest/types.ts` | Resolved runtime view of `toastConfigSchema`. |
| `toastConfigSchema` | variable | `src/ui/manifest/schema.ts` | Manifest toast defaults used by the `toast` action runtime. |
| `ToastContainer` | function | `src/ui/actions/toast.tsx` | Render the active toast queue using runtime-configured placement defaults. |
| `ToastItem` | interface | `src/ui/actions/toast.tsx` | Resolved toast entry stored in the runtime queue. |
| `ToastManager` | interface | `src/ui/actions/toast.tsx` | Imperative API for enqueueing and dismissing transient toast messages. |
| `Toggle` | function | `src/ui/components/forms/toggle/component.tsx` | Config-driven Toggle component — a pressed/unpressed toggle button. When pressed, displays with primary background and foreground colors. When unpressed, uses transparent background. Publishes `{ pressed: boolean }` to the page context when an `id` is set. |
| `ToggleConfig` | typealias | `src/ui/components/forms/toggle/types.ts` | Inferred config type from the Toggle Zod schema. |
| `toggleConfigSchema` | variable | `src/ui/components/forms/toggle/schema.ts` | Zod config schema for the Toggle component. Defines a pressed/unpressed toggle button that publishes its state. Can display text, an icon, or both. |
| `TokenEditor` | interface | `src/ui/tokens/types.ts` | Return type of useTokenEditor(). |
| `toPersistedStateKey` | function | `src/ui/state/persist.ts` | Build the storage key used for persisted Snapshot state entries. |
| `TouchedFields` | typealias | `src/ui/components/forms/auto-form/types.ts` | Tracks which fields have been interacted with. |
| `TrackAction` | interface | `src/ui/actions/types.ts` | Track an analytics event through all manifest-configured providers. |
| `trackActionSchema` | variable | `src/ui/actions/types.ts` | Schema for track action. |
| `TransitionWrapper` | function | `src/ui/manifest/transition-wrapper.tsx` | Apply enter transitions around routed content when a route transition config is present. |
| `trendConfigSchema` | variable | `src/ui/components/data/stat-card/schema.ts` | Schema for the trend indicator configuration. |
| `TryWorkflowNode` | interface | `src/ui/workflows/types.ts` | Execute a workflow definition with optional catch and finally handlers. |
| `TypingIndicator` | function | `src/ui/components/communication/typing-indicator/component.tsx` | TypingIndicator — shows animated bouncing dots with user names to indicate who is currently typing. |
| `TypingIndicatorConfig` | typealias | `src/ui/components/communication/typing-indicator/types.ts` | Inferred config type from the TypingIndicator Zod schema. |
| `typingIndicatorConfigSchema` | variable | `src/ui/components/communication/typing-indicator/schema.ts` | Zod config schema for the TypingIndicator component. Displays an animated "User is typing..." indicator with bouncing dots. |
| `UI_BREAKPOINTS` | variable | `src/ui/hooks/use-breakpoint.ts` | Breakpoint pixel thresholds (mobile-first, min-width). |
| `useActionExecutor` | function | `src/ui/actions/executor.ts` | Return the action executor bound to the active runtime, registries, overlays, workflows, and optional API client. |
| `useAutoBreadcrumbs` | function | `src/ui/hooks/use-auto-breadcrumbs.ts` | Resolve auto-generated breadcrumb items for the current route match. |
| `useAutoForm` | function | `src/ui/components/forms/auto-form/hook.ts` | Headless hook for form state management.  Tracks field values, validation errors, and touched state. Validates on blur (per-field) and on submit (all fields). |
| `UseAutoFormResult` | interface | `src/ui/components/forms/auto-form/types.ts` | Return type for the useAutoForm headless hook. |
| `useBreakpoint` | function | `src/ui/hooks/use-breakpoint.ts` | Returns the currently active breakpoint based on window width. Uses `matchMedia` for efficient, event-driven updates (no resize polling). Returns `"default"` during SSR. |
| `useComponentData` | function | `src/ui/components/_base/use-component-data.ts` | Shared data-fetching hook for config-driven components.  Parses a data config string like `"GET /api/stats/revenue"` into method + endpoint, resolves any `FromRef` values in params via `useSubscribe`, and fetches data using the API client from `SnapshotApiContext`.  When the API client is not available (e.g., in tests or before ManifestApp provides it), the hook returns a loading state without throwing. |
| `useConfirmManager` | function | `src/ui/actions/confirm.tsx` | Return the shared confirmation manager for the current Snapshot UI tree. |
| `useDataTable` | function | `src/ui/components/data/data-table/hook.ts` | Headless hook for managing data table state.  Provides sorting, pagination, filtering, selection, and search functionality without any rendering. Resolves `FromRef` values in the `data` and `params` fields via `useSubscribe`. |
| `UseDataTableResult` | interface | `src/ui/components/data/data-table/types.ts` | Return type of the `useDataTable` headless hook. Provides all state and handlers needed to render a data table. |
| `useDetailCard` | function | `src/ui/components/data/detail-card/hook.ts` | Hook that powers the DetailCard component. Resolves FromRefs, fetches data from endpoints, formats fields, and publishes the record data for other components to subscribe to. |
| `UseDetailCardResult` | interface | `src/ui/components/data/detail-card/types.ts` | Return type of the useDetailCard hook. |
| `useDndSensors` | function | `src/ui/hooks/use-drag-drop.ts` | Pre-configured sensor setup for pointer + keyboard DnD. Pointer requires 5px distance to activate (prevents click hijacking). Keyboard uses standard coordinates for arrow key navigation. |
| `UseFeedResult` | interface | `src/ui/components/data/feed/types.ts` | Return type of the useFeed headless hook. |
| `useInfiniteScroll` | function | `src/ui/hooks/use-infinite-scroll.ts` | Observe a sentinel element and load the next page when it enters the viewport. |
| `UseInfiniteScrollOptions` | interface | `src/ui/hooks/use-infinite-scroll.ts` | Options for loading additional items when a sentinel approaches the viewport. |
| `useManifestResourceCache` | function | `src/ui/manifest/runtime.tsx` | Access the manifest resource cache runtime for loads, invalidation, and resource-driven mutations. |
| `useManifestResourceFocusRefetch` | function | `src/ui/manifest/runtime.tsx` | Invalidate a manifest resource when the window regains focus. |
| `useManifestResourceMountRefetch` | function | `src/ui/manifest/runtime.tsx` | Invalidate a manifest resource on mount when the resource opts into it. |
| `useManifestRuntime` | function | `src/ui/manifest/runtime.tsx` | Access the compiled manifest runtime. |
| `useModalManager` | function | `src/ui/actions/modal-manager.ts` | Hook to manage modal open/close state via a Jotai atom stack. Provides open, close, isOpen, and the current stack. |
| `useNav` | function | `src/ui/components/layout/nav/hook.ts` | Headless hook for nav component logic. Resolves nav items with active state, role-based visibility, badge resolution from FromRefs, and collapse toggle. |
| `UseNavResult` | interface | `src/ui/components/layout/nav/types.ts` | Return type of the useNav headless hook. |
| `useOverlayRuntime` | function | `src/ui/manifest/runtime.tsx` | Access the current overlay runtime state. |
| `usePersistedAtom` | function | `src/ui/state/use-persisted-atom.ts` | Bind a primitive atom to browser storage so its value survives page reloads. |
| `usePoll` | function | `src/ui/hooks/use-poll.ts` | Invoke a callback on an interval with optional document-visibility pausing. |
| `UsePollOptions` | interface | `src/ui/hooks/use-poll.ts` | Options controlling interval-based polling from client components. |
| `usePublish` | function | `src/ui/context/hooks.ts` | Registers a component in the page context and returns a setter function to publish values that other components can subscribe to via `{ from: "id" }`. |
| `useResetStateValue` | function | `src/ui/state/hooks.ts` | Return a callback that resets a named manifest state entry to its configured default. |
| `useResolveFrom` | function | `src/ui/context/hooks.ts` | Resolves all `FromRef` values in a config object at once. |
| `useResponsiveValue` | function | `src/ui/hooks/use-breakpoint.ts` | Resolve a responsive value to the appropriate value for the current breakpoint. Accepts either a flat value (returned as-is) or a responsive map with breakpoint keys. Falls back to the next smaller defined breakpoint. |
| `useRoutePrefetch` | function | `src/ui/manifest/use-route-prefetch.ts` | Prefetch route-scoped resources when a compiled route advertises eager endpoints. |
| `useRouteRuntime` | function | `src/ui/manifest/runtime.tsx` | Access the current route runtime state. |
| `useSetStateValue` | function | `src/ui/state/hooks.ts` | Return a setter that writes to a named manifest state entry in the resolved scope. |
| `UseStatCardResult` | interface | `src/ui/components/data/stat-card/types.ts` | Result returned by the StatCard headless hook or internal logic. Provides all the data needed to render a stat card. |
| `useStateValue` | function | `src/ui/state/hooks.ts` | Read the current value for a named manifest state entry. |
| `useSubscribe` | function | `src/ui/context/hooks.ts` | Subscribes to a value from the shared binding/state registry system. |
| `useToastManager` | function | `src/ui/actions/toast.tsx` | Return the toast manager bound to the active manifest runtime configuration. |
| `useTokenEditor` | function | `src/ui/tokens/editor.ts` | React hook for runtime token editing. Provides setToken/setFlavor/resetTokens/getTokens/subscribe for live theme customization. Changes are applied instantly via inline styles on document.documentElement. |
| `useUrlSync` | function | `src/ui/hooks/use-url-sync.ts` | Keep a slice of local state synchronized with URL query parameters. |
| `useVirtualList` | function | `src/ui/hooks/use-virtual-list.ts` | Compute the visible slice for a fixed-height virtualized list container. |
| `useWizard` | function | `src/ui/components/forms/wizard/hook.ts` | Manage wizard step state, validation, submission, and transition flow. |
| `UseWizardResult` | interface | `src/ui/components/forms/wizard/types.ts` | Return type of the useWizard headless hook. |
| `validateContrast` | function | `src/ui/tokens/contrast-checker.ts` | Warn when manifest theme color pairs fail WCAG AA contrast. |
| `WaitWorkflowNode` | interface | `src/ui/workflows/types.ts` | Pause workflow execution for a duration in milliseconds. |
| `Wizard` | function | `src/ui/components/forms/wizard/component.tsx` | Render a multi-step form wizard with built-in validation, step state, and slot-aware styling. |
| `WizardConfig` | typealias | `src/ui/components/forms/wizard/types.ts` | Inferred type for the Wizard component configuration. |
| `wizardSchema` | variable | `src/ui/components/forms/wizard/schema.ts` | Zod schema for the Wizard component configuration.  A multi-step form flow. Each step collects fields independently. On the final step, all accumulated data is submitted to `submitEndpoint` (if set) and published to the page context via `id`. |
| `WizardStepConfig` | typealias | `src/ui/components/forms/wizard/types.ts` | Inferred type for a single wizard step configuration. |
| `wizardStepSchema` | variable | `src/ui/components/forms/wizard/schema.ts` | Schema for a single wizard step. |
| `WorkflowActionHandler` | typealias | `src/ui/workflows/types.ts` | Handler signature for registered custom workflow actions. |
| `WorkflowCondition` | interface | `src/ui/workflows/types.ts` | Simple conditional expression used by workflow nodes. |
| `WorkflowConditionOperator` | typealias | `src/ui/workflows/types.ts` | Supported condition operators for manifest workflows. |
| `workflowConditionSchema` | variable | `src/ui/workflows/schema.ts` | Schema for conditional expressions used by workflow control-flow nodes. |
| `WorkflowDefinition` | typealias | `src/ui/workflows/types.ts` | A single workflow node or a sequential list of nodes. |
| `workflowDefinitionSchema` | variable | `src/ui/workflows/schema.ts` | Schema for a workflow definition expressed as one node or a sequential node list. |
| `WorkflowMap` | typealias | `src/ui/workflows/types.ts` | Named workflow map keyed by workflow id. |
| `WorkflowNode` | typealias | `src/ui/workflows/types.ts` | Any node that can appear inside a workflow definition. |
| `workflowNodeSchema` | variable | `src/ui/workflows/schema.ts` | Recursive schema describing every built-in workflow node and action node shape. |
| `writePersistedState` | function | `src/ui/state/persist.ts` | Serialize and store a persisted state value, ignoring browser storage failures. |

</details>

## Tokens & Flavors

| Export | Kind | Description |
|---|---|---|
| `AnalyticsProvider` | interface | Analytics provider runtime contract. |
| `AnalyticsProviderFactory` | typealias | Factory used to create analytics providers per snapshot instance. |
| `AnalyticsProviderInitConfig` | interface | Analytics provider initialization payload. |
| `colorToOklch` | function | Convert any supported color string to OKLCH values. Supports: hex (#rgb, #rrggbb), oklch strings ("L C H"), and oklch() CSS function. |
| `ComponentTokens` | typealias | Component-level token overrides. Per-component styling knobs. |
| `componentTokensSchema` | variable | Zod schema for component-level token overrides. |
| `contrastRatio` | function | Calculate the WCAG contrast ratio between two supported color values. |
| `defineFlavor` | function | Define and register a new flavor. If a flavor with the same name already exists, it is replaced. |
| `deriveDarkVariant` | function | Derive a dark mode variant of a light color. Adjusts lightness and chroma for dark mode readability: - If the color is light (L > 0.5), reduce lightness moderately - If the color is dark (L <= 0.5), increase lightness for dark backgrounds - Boost chroma slightly for vibrancy in dark mode |
| `deriveForeground` | function | Derive a foreground color that passes WCAG AA contrast (4.5:1) against the given background color. Returns a light or dark foreground. |
| `Flavor` | interface | Named theme preset. Provides a complete set of design tokens. |
| `FontConfig` | typealias | Font configuration. |
| `fontSchema` | variable | Zod schema for font configuration. |
| `getAllFlavors` | function | Get all registered flavors as a record. |
| `getFlavor` | function | Retrieve a registered flavor by name. |
| `hexToOklch` | function | Convert a hex color string to OKLCH values. |
| `hslToOklch` | function | Convert HSL values to OKLCH. |
| `meetsWcagAA` | function | Check whether two colors satisfy WCAG AA contrast for normal or large text. |
| `oklchToHex` | function | Convert OKLCH values back to a hex color string. Used for serializing runtime overrides. |
| `oklchToString` | function | Format OKLCH values as a CSS-compatible string (without the oklch() wrapper). Output format: "L C H" where L, C, H are rounded to 3 decimal places. |
| `parseOklchString` | function | Parse an oklch string (the CSS variable format "L C H") back to values. |
| `RadiusScale` | typealias | Border radius scale. |
| `radiusSchema` | variable | Zod schema for border radius scale. |
| `registerAnalyticsProvider` | function | Register a custom analytics provider factory by name. |
| `relativeLuminance` | function | Compute relative luminance from OKLCH for WCAG contrast calculations. Uses sRGB relative luminance (rec. 709) from the linear RGB values. |
| `resolveFrameworkStyles` | function | Returns a CSS string containing framework-level styles:  1. CSS reset (box-sizing, margin, padding, body defaults, font inherit) 2. Component polish CSS — data-attribute-driven styles for page layout,    data-table, stat-card, form, detail-card, and focus rings.  All values are parameterized via `--sn-*` token custom properties so the output adapts to whatever theme tokens are active. |
| `resolveTokens` | function | Resolve a theme configuration into a complete CSS string.  Pipeline: 1. Load base flavor (default: neutral) 2. Deep merge overrides onto flavor defaults 3. Convert all colors to oklch 4. Auto-derive foreground colors (contrast-aware) 5. Auto-derive dark mode colors if not provided 6. Map radius/spacing/font to CSS 7. Generate component-level tokens 8. Output CSS string with :root, .dark, and component selectors |
| `Responsive` | typealias | A breakpoint-aware value. Flat value or responsive map. |
| `SpacingScale` | typealias | Spacing density. Affects padding, gaps, and margins globally. |
| `spacingSchema` | variable | Zod schema for spacing density. |
| `ThemeColors` | typealias | Semantic color tokens. Each generates a CSS custom property. |
| `themeColorsSchema` | variable | Zod schema for semantic color tokens. Each generates a CSS custom property. |
| `ThemeConfig` | typealias | Theme configuration in the manifest. |
| `themeConfigSchema` | variable | Zod schema for the full theme configuration in the manifest. |
| `TokenEditor` | interface | Return type of useTokenEditor(). |
| `useTokenEditor` | function | React hook for runtime token editing. Provides setToken/setFlavor/resetTokens/getTokens/subscribe for live theme customization. Changes are applied instantly via inline styles on document.documentElement. |
| `validateContrast` | function | Warn when manifest theme color pairs fail WCAG AA contrast. |

### Details

#### `colorToOklch(color: string) => [number, number, number]`

Convert any supported color string to OKLCH values.
Supports: hex (#rgb, #rrggbb), oklch strings ("L C H"), and oklch() CSS function.

**Parameters:**

| Name | Description |
|------|-------------|
| `color` | Color string in any supported format |

**Returns:** Tuple of [lightness, chroma, hue]

---

#### `contrastRatio(left: string, right: string) => number`

Calculate the WCAG contrast ratio between two supported color values.

---

#### `defineFlavor(name: string, config: FlavorConfig) => Flavor`

Define and register a new flavor. If a flavor with the same name already exists,
it is replaced.

**Parameters:**

| Name | Description |
|------|-------------|
| `name` | Unique flavor identifier |
| `config` | Flavor configuration (colors, radius, spacing, font, components) |

**Returns:** The registered Flavor object

---

#### `deriveDarkVariant(lightColor: string) => string`

Derive a dark mode variant of a light color.
Adjusts lightness and chroma for dark mode readability:
- If the color is light (L > 0.5), reduce lightness moderately
- If the color is dark (L <= 0.5), increase lightness for dark backgrounds
- Boost chroma slightly for vibrancy in dark mode

**Parameters:**

| Name | Description |
|------|-------------|
| `lightColor` | Light mode color in any supported format |

**Returns:** OKLCH string for the dark mode variant

---

#### `deriveForeground(backgroundColor: string) => string`

Derive a foreground color that passes WCAG AA contrast (4.5:1) against
the given background color. Returns a light or dark foreground.

**Parameters:**

| Name | Description |
|------|-------------|
| `backgroundColor` | Background color in any supported format |

**Returns:** OKLCH string for the foreground color

---

#### `getAllFlavors() => Record<string, Flavor>`

Get all registered flavors as a record.

**Returns:** Record of flavor name to Flavor object

---

#### `getFlavor(name: string) => Flavor | undefined`

Retrieve a registered flavor by name.

**Parameters:**

| Name | Description |
|------|-------------|
| `name` | Flavor identifier |

**Returns:** The Flavor object, or undefined if not found

---

#### `hexToOklch(hex: string) => [number, number, number]`

Convert a hex color string to OKLCH values.

**Parameters:**

| Name | Description |
|------|-------------|
| `hex` | CSS hex color (e.g. "#ff0000", "#f00") |

**Returns:** Tuple of [lightness, chroma, hue]

---

#### `hslToOklch(h: number, s: number, l: number) => [number, number, number]`

Convert HSL values to OKLCH.

**Parameters:**

| Name | Description |
|------|-------------|
| `h` | Hue in degrees [0, 360) |
| `s` | Saturation [0, 100] |
| `l` | Lightness [0, 100] |

**Returns:** Tuple of [lightness, chroma, hue]

---

#### `meetsWcagAA(left: string, right: string, largeText?: boolean) => boolean`

Check whether two colors satisfy WCAG AA contrast for normal or large text.

---

#### `oklchToHex(l: number, c: number, h: number) => string`

Convert OKLCH values back to a hex color string.
Used for serializing runtime overrides.

**Parameters:**

| Name | Description |
|------|-------------|
| `l` | Lightness [0, 1] |
| `c` | Chroma [0, ~0.4] |
| `h` | Hue [0, 360) |

**Returns:** CSS hex color string (e.g. "#ff0000")

---

#### `oklchToString(l: number, c: number, h: number) => string`

Format OKLCH values as a CSS-compatible string (without the oklch() wrapper).
Output format: "L C H" where L, C, H are rounded to 3 decimal places.

**Parameters:**

| Name | Description |
|------|-------------|
| `l` | Lightness [0, 1] |
| `c` | Chroma [0, ~0.4] |
| `h` | Hue [0, 360) |

**Returns:** Formatted string like "0.637 0.237 25.465"

---

#### `parseOklchString(str: string) => [number, number, number]`

Parse an oklch string (the CSS variable format "L C H") back to values.

**Parameters:**

| Name | Description |
|------|-------------|
| `str` | OKLCH string like "0.637 0.237 25.465" |

**Returns:** Tuple of [lightness, chroma, hue]

---

#### `registerAnalyticsProvider(name: string, factory: AnalyticsProviderFactory) => void`

Register a custom analytics provider factory by name.

**Parameters:**

| Name | Description |
|------|-------------|
| `name` | Provider identifier used in `manifest.analytics.providers.*.name` |
| `factory` | Per-instance provider factory |

---

#### `relativeLuminance(color: string) => number`

Compute relative luminance from OKLCH for WCAG contrast calculations.
Uses sRGB relative luminance (rec. 709) from the linear RGB values.

---

#### `resolveFrameworkStyles(options?: { respectReducedMotion?: boolean | undefined; } | undefined) => string`

Returns a CSS string containing framework-level styles:

1. CSS reset (box-sizing, margin, padding, body defaults, font inherit)
2. Component polish CSS — data-attribute-driven styles for page layout,
   data-table, stat-card, form, detail-card, and focus rings.

All values are parameterized via `--sn-*` token custom properties so the
output adapts to whatever theme tokens are active.

---

#### `resolveTokens(config?: { flavor?: string | undefined; flavors?: Record<string, { extends: string; components?: { card?: { border?: boolean | undefined; shadow?: "none" | "sm" | "md" | "lg" | "xl" | undefined; padd...`

Resolve a theme configuration into a complete CSS string.

Pipeline:
1. Load base flavor (default: neutral)
2. Deep merge overrides onto flavor defaults
3. Convert all colors to oklch
4. Auto-derive foreground colors (contrast-aware)
5. Auto-derive dark mode colors if not provided
6. Map radius/spacing/font to CSS
7. Generate component-level tokens
8. Output CSS string with :root, .dark, and component selectors

**Parameters:**

| Name | Description |
|------|-------------|
| `config` | Theme configuration (flavor name + overrides) |

**Returns:** Complete CSS string ready to inject or write to a file

---

#### `useTokenEditor() => TokenEditor`

React hook for runtime token editing.

Provides setToken/setFlavor/resetTokens/getTokens/subscribe for live
theme customization. Changes are applied instantly via inline styles
on document.documentElement.

**Returns:** TokenEditor interface for runtime token manipulation

---

#### `validateContrast(theme: { flavor?: string | undefined; flavors?: Record<string, { extends: string; components?: { card?: { border?: boolean | undefined; shadow?: "none" | "sm" | "md" | "lg" | "xl" | undefined; paddin...`

Warn when manifest theme color pairs fail WCAG AA contrast.

---

## API Client

| Export | Kind | Description |
|---|---|---|
| `getRegisteredClient` | function | Look up a previously registered custom client factory. |
| `registerClient` | function | Register a named custom client factory. |

### Details

#### `getRegisteredClient(name: string) => ClientFactory | undefined`

Look up a previously registered custom client factory.

**Parameters:**

| Name | Description |
|------|-------------|
| `name` | Registered client factory name |

**Returns:** The registered factory when found

---

#### `registerClient(name: string, factory: ClientFactory) => void`

Register a named custom client factory.

**Parameters:**

| Name | Description |
|------|-------------|
| `name` | Manifest-facing client factory name |
| `factory` | Factory that creates an ApiClient-like instance |

---

## Context & Data Binding

| Export | Kind | Description |
|---|---|---|
| `AppContextProvider` | function | Provides persistent global state that survives route changes. Initializes globals from the manifest config. |
| `AppContextProviderProps` | interface | Props for AppContextProvider. Wraps the entire app to provide persistent global state. |
| `FromRef` | interface | A reference to another component's published value. Used in config objects to wire components together reactively. |
| `GlobalConfig` | typealias | Global state definition from the manifest. This now aliases the shared state config used by the runtime. |
| `isFromRef` | function | Type guard for FromRef values. A FromRef is an object with a single `from` string property. |
| `PageContextProvider` | function | Provides per-page state that is destroyed on route change. |
| `PageContextProviderProps` | interface | Props for PageContextProvider. Wraps each page/route to provide per-page component state. |
| `ResolvedConfig` | typealias | Resolves a type where FromRef values are replaced with their resolved types. Used internally — consumers don't need to use this directly. |
| `usePublish` | function | Registers a component in the page context and returns a setter function to publish values that other components can subscribe to via `{ from: "id" }`. |
| `useResolveFrom` | function | Resolves all `FromRef` values in a config object at once. |
| `useSubscribe` | function | Subscribes to a value from the shared binding/state registry system. |

### Details

#### `AppContextProvider({ globals, resources, api, children, }: AppContextProviderProps) => Element`

Provides persistent global state that survives route changes.
Initializes globals from the manifest config.

---

#### `FromRef` *(interface)*

A reference to another component's published value.
Used in config objects to wire components together reactively.

**Example:**

```ts
// Reference a page-level component's value
{ from: "users-table.selected" }

// Reference a nested field
{ from: "users-table.selected.name" }

// Reference a global value
{ from: "global.user" }
```

---

#### `isFromRef(value: unknown) => value is FromRef`

Type guard for FromRef values.
A FromRef is an object with a single `from` string property.

**Parameters:**

| Name | Description |
|------|-------------|
| `value` | The value to check |

**Returns:** True if the value is a FromRef

---

#### `PageContextProvider({ state, resources, api, children, }: PageContextProviderProps) => Element`

Provides per-page state that is destroyed on route change.

---

#### `usePublish(id: string | undefined) => (value: unknown) => void`

Registers a component in the page context and returns a setter function
to publish values that other components can subscribe to via `{ from: "id" }`.

---

#### `useResolveFrom<T extends Record<string, unknown>>(config: T) => ResolvedConfig<T>`

Resolves all `FromRef` values in a config object at once.

---

#### `useSubscribe(ref: unknown) => unknown`

Subscribes to a value from the shared binding/state registry system.

---

## State Runtime

| Export | Kind | Description |
|---|---|---|
| `AtomRegistry` | interface | Registry of named state atoms. Backing store is shared per scope (app or route). |
| `clearPersistedState` | function | Remove a persisted state value from the selected browser storage area. |
| `readPersistedState` | function | Read and JSON-decode a persisted state value, returning `undefined` on failure or absence. |
| `RuntimeStateConfig` | interface | Named state definition from the manifest. App-scope state persists for the app lifetime. Route-scope state is recreated whenever the active route changes. |
| `StateConfigMap` | typealias | Map of named state definitions declared by the manifest runtime. |
| `StateHookScope` | typealias | Hook-level scope override that can force app, route, or auto-discovered state resolution. |
| `StateProviderProps` | interface | Props accepted by the provider layer that wires manifest state into a React tree. |
| `StateScope` | typealias | Lifetime scope for manifest state: shared across the app or recreated per route. |
| `toPersistedStateKey` | function | Build the storage key used for persisted Snapshot state entries. |
| `usePersistedAtom` | function | Bind a primitive atom to browser storage so its value survives page reloads. |
| `useResetStateValue` | function | Return a callback that resets a named manifest state entry to its configured default. |
| `useSetStateValue` | function | Return a setter that writes to a named manifest state entry in the resolved scope. |
| `useStateValue` | function | Read the current value for a named manifest state entry. |
| `writePersistedState` | function | Serialize and store a persisted state value, ignoring browser storage failures. |

### Details

#### `clearPersistedState(key: string, storage: PersistStorage) => void`

Remove a persisted state value from the selected browser storage area.

---

#### `readPersistedState(key: string, storage: PersistStorage) => unknown`

Read and JSON-decode a persisted state value, returning `undefined` on failure or absence.

---

#### `toPersistedStateKey(key: string) => string`

Build the storage key used for persisted Snapshot state entries.

---

#### `usePersistedAtom<T>(sourceAtom: PrimitiveAtom<T>, key: string, storage: PersistStorage) => [T, (value: T) => void]`

Bind a primitive atom to browser storage so its value survives page reloads.

---

#### `useResetStateValue(id: string, options?: { scope?: StateHookScope | undefined; } | undefined) => () => void`

Return a callback that resets a named manifest state entry to its configured default.

---

#### `useSetStateValue(id: string, options?: { scope?: StateHookScope | undefined; } | undefined) => (value: unknown) => void`

Return a setter that writes to a named manifest state entry in the resolved scope.

---

#### `useStateValue(id: string, options?: { scope?: StateHookScope | undefined; } | undefined) => unknown`

Read the current value for a named manifest state entry.

---

#### `writePersistedState(key: string, value: unknown, storage: PersistStorage) => void`

Serialize and store a persisted state value, ignoring browser storage failures.

---

## Actions

| Export | Kind | Description |
|---|---|---|
| `ActionBase` | interface | Shared timing controls available on every action. |
| `ActionConfig` | typealias | All possible action configs. Discriminated union on `type`. |
| `ActionExecuteFn` | typealias | The execute function returned by useActionExecutor. |
| `actionSchema` | variable | Discriminated union schema for all action types. Uses z.union (not z.discriminatedUnion) because some member schemas use z.lazy() for recursion, which is incompatible with z.discriminatedUnion's type requirements. |
| `ApiAction` | interface | Call an API endpoint. |
| `apiActionSchema` | variable | Schema for api action. Uses z.lazy() for recursive onSuccess/onError. |
| `CloseModalAction` | interface | Close a modal or drawer. |
| `closeModalActionSchema` | variable | Schema for close-modal action. |
| `ConfirmAction` | interface | Show a confirmation dialog. Stops the chain if cancelled. |
| `confirmActionSchema` | variable | Schema for confirm action. |
| `ConfirmDialog` | function | Render the global confirmation dialog for requests queued through `useConfirmManager`. |
| `ConfirmManager` | interface | Imperative API for opening a confirmation dialog from manifest actions or custom UI. |
| `ConfirmOptions` | typealias | Options accepted when opening a confirmation dialog. |
| `ConfirmRequest` | interface | Internal confirm-dialog request stored in the atom-backed manager queue. |
| `CopyAction` | interface | Copy plain text and optionally continue with follow-up actions. |
| `CopyToClipboardAction` | interface | Copy plain text and optionally show a simple confirmation toast. |
| `copyToClipboardActionSchema` | variable | Schema for the `copy-to-clipboard` action. |
| `debounceAction` | function | Debounce async or sync action execution by key and resolve all pending callers with the final invocation result. |
| `DownloadAction` | interface | Download a file from an endpoint. |
| `downloadActionSchema` | variable | Schema for download action. |
| `interpolate` | function | Replace `{key}` placeholders with values from context. Supports nested paths: `{user.name}`, `{result.id}`. Missing keys are preserved as-is: `{unknown}` stays `{unknown}`. |
| `LogAction` | interface | Emit a structured client-side log entry. |
| `ModalManager` | interface | Return type of useModalManager. |
| `NavigateAction` | interface | Navigate to a route. |
| `navigateActionSchema` | variable | Schema for navigate action. |
| `OpenModalAction` | interface | Open a modal or drawer by id. |
| `openModalActionSchema` | variable | Schema for open-modal action. |
| `RefreshAction` | interface | Re-fetch a component's data. |
| `refreshActionSchema` | variable | Schema for refresh action. |
| `RunWorkflowAction` | interface | Run a named manifest workflow. |
| `runWorkflowActionSchema` | variable | Schema for run-workflow action. |
| `ScrollToAction` | interface | Show a toast notification. |
| `scrollToActionSchema` | variable | Schema for the `scroll-to` action. |
| `SetValueAction` | interface | Set another component's published value. |
| `setValueActionSchema` | variable | Schema for set-value action. |
| `ShowToastOptions` | interface | User-facing toast options accepted by the toast manager. |
| `SnapshotApiContext` | variable | API client context consumed by built-in `api`, `download`, and related runtime actions. |
| `throttleAction` | function | Throttle async or sync action execution by key and drop calls inside the active throttle window. |
| `ToastAction` | interface | Show a toast notification. |
| `toastActionSchema` | variable | Schema for toast action. Uses z.lazy() for recursive action. |
| `ToastContainer` | function | Render the active toast queue using runtime-configured placement defaults. |
| `ToastItem` | interface | Resolved toast entry stored in the runtime queue. |
| `ToastManager` | interface | Imperative API for enqueueing and dismissing transient toast messages. |
| `TrackAction` | interface | Track an analytics event through all manifest-configured providers. |
| `trackActionSchema` | variable | Schema for track action. |
| `useActionExecutor` | function | Return the action executor bound to the active runtime, registries, overlays, workflows, and optional API client. |
| `useConfirmManager` | function | Return the shared confirmation manager for the current Snapshot UI tree. |
| `useModalManager` | function | Hook to manage modal open/close state via a Jotai atom stack. Provides open, close, isOpen, and the current stack. |
| `useToastManager` | function | Return the toast manager bound to the active manifest runtime configuration. |

### Details

#### `ConfirmDialog() => ReactNode`

Render the global confirmation dialog for requests queued through `useConfirmManager`.

---

#### `debounceAction<T>(key: string, fn: () => T | Promise<T>, ms: number) => Promise<T>`

Debounce async or sync action execution by key and resolve all pending callers
with the final invocation result.

---

#### `interpolate(template: string, context: Record<string, unknown>) => string`

Replace `{key}` placeholders with values from context.
Supports nested paths: `{user.name}`, `{result.id}`.
Missing keys are preserved as-is: `{unknown}` stays `{unknown}`.

**Parameters:**

| Name | Description |
|------|-------------|
| `template` | The template string with `{key}` placeholders |
| `context` | The context object to resolve values from |

**Returns:** The interpolated string

**Example:**

```ts
interpolate('/users/{id}', { id: 5 }) // → '/users/5'
interpolate('{user.name}', { user: { name: 'Jo' } }) // → 'Jo'
interpolate('{missing}', {}) // → '{missing}'
```

---

#### `throttleAction<T>(key: string, fn: () => T | Promise<T>, ms: number) => Promise<T | undefined>`

Throttle async or sync action execution by key and drop calls inside the
active throttle window.

---

#### `ToastContainer() => ReactNode`

Render the active toast queue using runtime-configured placement defaults.

---

#### `useActionExecutor() => ActionExecuteFn`

Return the action executor bound to the active runtime, registries, overlays,
workflows, and optional API client.

---

#### `useConfirmManager() => ConfirmManager`

Return the shared confirmation manager for the current Snapshot UI tree.

---

#### `useModalManager() => ModalManager`

Hook to manage modal open/close state via a Jotai atom stack.
Provides open, close, isOpen, and the current stack.

**Returns:** A ModalManager with methods to control the modal stack

**Example:**

```tsx
const { open, close, isOpen, stack } = useModalManager()
open('edit-user')
close('edit-user')
close() // closes topmost
```

---

#### `useToastManager() => ToastManager`

Return the toast manager bound to the active manifest runtime configuration.

---

## Manifest & Rendering

| Export | Kind | Description |
|---|---|---|
| `AnalyticsConfig` | typealias | Resolved runtime view of `analyticsConfigSchema`. |
| `analyticsConfigSchema` | variable | Manifest analytics runtime configuration. |
| `analyticsProviderSchema` | variable | Analytics provider declaration schema. |
| `AppConfig` | typealias | Resolved runtime view of `appConfigSchema`. |
| `appConfigSchema` | variable | Schema for the top-level manifest `app` section. |
| `AuthProviderConfig` | typealias | Resolved runtime view of `authProviderSchema`. |
| `authProviderSchema` | variable | Auth provider declaration schema. Declared at `manifest.auth.providers.<name>`. |
| `AuthScreenConfig` | typealias | Resolved runtime view of `authScreenConfigSchema`. |
| `authScreenConfigSchema` | variable | Schema for the manifest auth screen and auth workflow configuration. |
| `BaseComponentConfig` | typealias | Resolved runtime view of `baseComponentConfigSchema`. |
| `baseComponentConfigSchema` | variable | Shared base schema applied to all manifest-driven components. |
| `bootBuiltins` | function | Register all built-in manifest registries exactly once. |
| `BreadcrumbAutoConfig` | interface | Auto-breadcrumb configuration used to derive labels and optional home state from routes. |
| `BreadcrumbItem` | interface | A single breadcrumb entry rendered from the matched route stack. |
| `buildRequestUrl` | function | Interpolate path params and append remaining params as a query string. |
| `ButtonConfig` | typealias | Resolved runtime view of `buttonConfigSchema`. |
| `buttonConfigSchema` | variable | Schema for the built-in `button` component. |
| `CardConfig` | typealias | Resolved runtime view of `cardConfigSchema`. |
| `cardConfigSchema` | variable | Zod config schema for the Card component. Defines a card container with optional title, subtitle, children, gap, and suspense fallback. |
| `CompiledManifest` | interface | Runtime manifest shape produced by `compileManifest()`. |
| `CompiledRoute` | interface | Runtime route shape produced by `compileManifest()`. |
| `compileManifest` | function | Parse and compile a manifest into the runtime shape. |
| `ComponentConfig` | typealias | Runtime config union for manifest-renderable components. |
| `componentConfigSchema` | variable | Union schema covering every component config Snapshot can render from a manifest. |
| `ComponentRenderer` | function | Renders a single component from its manifest config. |
| `ComponentRendererProps` | interface | Props for the ComponentRenderer component. |
| `componentsConfigSchema` | variable | Schema for the top-level `components` section of a manifest. |
| `ConfigDrivenComponent` | typealias | React component type that can participate in the config-driven manifest runtime. |
| `customComponentDeclarationSchema` | variable | Schema for a custom component declaration under `components.custom`. |
| `customComponentPropSchema` | variable | Schema for a declared prop on a manifest custom component registration. |
| `dataSourceSchema` | variable | Data source accepted by data-aware manifest components. |
| `defineManifest` | function | Define a manifest without compiling it. |
| `endpointTargetSchema` | variable | Endpoint target accepted by actions and resource-aware components. |
| `fromRefSchema` | variable | Zod schema for a FromRef value. |
| `generateBreadcrumbs` | function | Generate breadcrumb items from the current matched route hierarchy. |
| `generateJsonSchema` | function | Generate a JSON Schema for snapshot manifests.  The schema is intentionally conservative and focuses on the public top-level manifest contract so editors can provide autocomplete and inline validation without requiring Snapshot's full runtime schema registry at generation time. |
| `getRegisteredGuards` | function | List the names of all currently registered route guards. |
| `getRegisteredSchemaTypes` | function | Return the currently registered manifest component type names. |
| `HeadingConfig` | typealias | Resolved runtime view of `headingConfigSchema`. |
| `headingConfigSchema` | variable | Schema for the built-in `heading` component. |
| `httpMethodSchema` | variable | Supported HTTP methods for manifest resources and endpoint targets. |
| `injectStyleSheet` | function | Inject or update a stylesheet in the document head. |
| `isResourceRef` | function | Return `true` when a value is a manifest resource reference object. |
| `ManifestApp` | function | Render the manifest-driven application shell. |
| `ManifestAppProps` | interface | Props accepted by the `ManifestApp` component. |
| `ManifestConfig` | typealias | Raw manifest input shape accepted by `parseManifest()` before defaults are applied during compilation. |
| `manifestConfigSchema` | variable | Top-level schema for `snapshot.manifest.json`. |
| `ManifestRuntimeProvider` | function | Provides manifest runtime state, resource cache state, and mutation helpers. |
| `NavigationConfig` | typealias | Runtime view of `navigationConfigSchema`. Navigation labels remain locale-resolved at render time. |
| `navigationConfigSchema` | variable | Schema for the top-level manifest navigation configuration. |
| `NavItem` | interface | Navigation item rendered by Snapshot navigation components. |
| `navItemSchema` | variable | Recursive schema for navigation items used by manifest navigation surfaces. |
| `outletComponentSchema` | variable | Schema for the built-in `outlet` component used by route layouts. |
| `OutletConfig` | typealias | Resolved runtime view of `outletComponentSchema`. |
| `OverlayConfig` | typealias | Resolved runtime view of `overlayConfigSchema`. |
| `overlayConfigSchema` | variable | Schema for named modal, drawer, and confirm-dialog overlay declarations. |
| `OverlayRuntimeProvider` | function | Provide the current overlay runtime payload and metadata. |
| `PageConfig` | typealias | Resolved runtime view of `pageConfigSchema`. |
| `pageConfigSchema` | variable | Schema for a manifest page definition. |
| `PageRenderer` | function | Renders a page from its manifest config. |
| `PageRendererProps` | interface | Props for the PageRenderer component. |
| `parseManifest` | function | Parse an unknown value into a validated manifest. |
| `PushConfig` | typealias | Resolved runtime view of `pushConfigSchema`. |
| `pushConfigSchema` | variable | Manifest push-notification runtime configuration. |
| `registerComponent` | function | Register a React component for a manifest component type string. Used by the framework for built-in components and by consumers for custom components.  Emits a dev warning if overriding an existing registration. |
| `registerComponentSchema` | function | Register a component-specific manifest schema by component `type`. |
| `registerGuard` | function | Register a named route guard implementation for manifest resolution. |
| `resetBootBuiltins` | function | Reset the boot flag so tests can re-run built-in registration deterministically. |
| `resolveGuard` | function | Resolve a previously registered route guard by name. |
| `ResourceConfigMap` | typealias | Named manifest resource map keyed by resource id. |
| `resourceConfigSchema` | variable | Schema for a manifest resource declaration. |
| `resourceRefSchema` | variable | Reference to a named manifest resource with optional parameter overrides. |
| `RouteConfig` | typealias | Resolved runtime view of `routeConfigSchema`. |
| `routeConfigSchema` | variable | Recursive schema for a manifest route tree node. |
| `RouteGuard` | typealias | Resolved runtime view of `routeGuardSchema`. |
| `RouteGuardConfig` | typealias | Resolved runtime view of `routeGuardConfigSchema`. |
| `routeGuardConfigSchema` | variable | Object-form route guard schema with auth, role, and policy controls. |
| `routeGuardSchema` | variable | Route guard schema, accepting either a named guard or inline guard config. |
| `RouteMatch` | interface | Resolved route match for the current pathname. |
| `RouteRuntimeProvider` | function | Provide route runtime state to manifest-rendered components. |
| `routeTransitionSchema` | variable | Schema for route transition metadata. |
| `RowConfig` | interface | Runtime config for the built-in `row` layout component. |
| `rowConfigSchema` | variable | Schema for the built-in `row` layout component. |
| `SelectConfig` | typealias | Resolved runtime view of `selectConfigSchema`. |
| `selectConfigSchema` | variable | Schema for the built-in `select` component. |
| `StateConfig` | typealias | Named manifest state map keyed by state id. |
| `StateValueConfig` | typealias | Runtime state declaration for a single named manifest state value. |
| `stateValueConfigSchema` | variable | Schema for a named manifest state value declaration. |
| `ToastConfig` | typealias | Resolved runtime view of `toastConfigSchema`. |
| `toastConfigSchema` | variable | Manifest toast defaults used by the `toast` action runtime. |
| `TransitionWrapper` | function | Apply enter transitions around routed content when a route transition config is present. |
| `useManifestResourceCache` | function | Access the manifest resource cache runtime for loads, invalidation, and resource-driven mutations. |
| `useManifestResourceFocusRefetch` | function | Invalidate a manifest resource when the window regains focus. |
| `useManifestResourceMountRefetch` | function | Invalidate a manifest resource on mount when the resource opts into it. |
| `useManifestRuntime` | function | Access the compiled manifest runtime. |
| `useOverlayRuntime` | function | Access the current overlay runtime state. |
| `useRoutePrefetch` | function | Prefetch route-scoped resources when a compiled route advertises eager endpoints. |
| `useRouteRuntime` | function | Access the current route runtime state. |

### Details

#### `bootBuiltins() => void`

Register all built-in manifest registries exactly once.

**Returns:** Nothing.

---

#### `buildRequestUrl(endpoint: string, params?: Record<string, unknown>, pathParams?: Record<string, unknown>) => string`

Interpolate path params and append remaining params as a query string.

---

#### `compileManifest(manifest: unknown) => CompiledManifest`

Parse and compile a manifest into the runtime shape.

**Parameters:**

| Name | Description |
|------|-------------|
| `manifest` | Manifest JSON or object |
| `options` | Compile options |

**Returns:** The compiled manifest runtime model

---

#### `ComponentRenderer({ config }: ComponentRendererProps) => Element | null`

Renders a single component from its manifest config.

---

#### `defineManifest<TManifest extends ManifestConfig>(manifest: TManifest) => TManifest`

Define a manifest without compiling it.

**Parameters:**

| Name | Description |
|------|-------------|
| `manifest` | Manifest object to return unchanged |

**Returns:** The same manifest object, typed as `ManifestConfig`

---

#### `generateBreadcrumbs(match: RouteMatch, config: BreadcrumbAutoConfig) => BreadcrumbItem[]`

Generate breadcrumb items from the current matched route hierarchy.

---

#### `generateJsonSchema() => Record<string, unknown>`

Generate a JSON Schema for snapshot manifests.

The schema is intentionally conservative and focuses on the public top-level
manifest contract so editors can provide autocomplete and inline validation
without requiring Snapshot's full runtime schema registry at generation time.

---

#### `getRegisteredGuards() => string[]`

List the names of all currently registered route guards.

---

#### `getRegisteredSchemaTypes() => string[]`

Return the currently registered manifest component type names.

---

#### `injectStyleSheet(id: string, css: string) => void`

Inject or update a stylesheet in the document head.

**Parameters:**

| Name | Description |
|------|-------------|
| `id` | Stable style element id |
| `css` | CSS text to inject |

---

#### `isResourceRef(value: unknown) => value is { resource: string; params?: Record<string, unknown> | undefined; }`

Return `true` when a value is a manifest resource reference object.

---

#### `ManifestApp({ manifest, apiUrl, lazyComponents, }: ManifestAppProps) => Element | null`

Render the manifest-driven application shell.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Manifest runtime props |

**Returns:** A fully rendered manifest application

---

#### `ManifestRuntimeProvider({ manifest, api, clients, children, }: { manifest: CompiledManifest; api?: ApiClientLike | undefined; clients?: Record<string, ApiClientLike> | undefined; children: ReactNode; }) => Element`

Provides manifest runtime state, resource cache state, and mutation helpers.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Provider props containing compiled manifest and API clients |

---

#### `OverlayRuntimeProvider({ value, children, }: { value: OverlayRuntimeValue; children: ReactNode; }) => Element`

Provide the current overlay runtime payload and metadata.

---

#### `PageRenderer({ page, routeId, state, resources, api, }: PageRendererProps) => Element`

Renders a page from its manifest config.

---

#### `parseManifest(manifest: unknown) => { routes: any[]; $schema?: string | undefined; push?: { vapidPublicKey: string | { env: string; default?: string | undefined; }; serviceWorkerPath: string; applicationServerKey?...`

Parse an unknown value into a validated manifest.

**Parameters:**

| Name | Description |
|------|-------------|
| `manifest` | Unknown input value |

**Returns:** The parsed manifest

---

#### `registerComponent(type: string, component: ConfigDrivenComponent) => void`

Register a React component for a manifest component type string.
Used by the framework for built-in components and by consumers for custom components.

Emits a dev warning if overriding an existing registration.

**Parameters:**

| Name | Description |
|------|-------------|
| `type` | The component type string (e.g. "row", "heading", "stat-card") |
| `component` | The React component that renders this type |

---

#### `registerComponentSchema(type: string, schema: ZodType<any, ZodTypeDef, any>) => void`

Register a component-specific manifest schema by component `type`.

---

#### `registerGuard(name: string, def: GuardDef) => void`

Register a named route guard implementation for manifest resolution.

---

#### `resetBootBuiltins() => void`

Reset the boot flag so tests can re-run built-in registration deterministically.

---

#### `resolveGuard(name: string) => GuardDef | undefined`

Resolve a previously registered route guard by name.

---

#### `RouteRuntimeProvider({ value, children, }: { value: RouteRuntimeValue; children: ReactNode; }) => Element`

Provide route runtime state to manifest-rendered components.

---

#### `TransitionWrapper({ config, routeKey, children, }: { config?: TransitionConfig | undefined; routeKey: string; children: ReactNode; }) => Element`

Apply enter transitions around routed content when a route transition config is present.

---

#### `useManifestResourceCache() => ManifestResourceCacheValue | null`

Access the manifest resource cache runtime for loads, invalidation, and
resource-driven mutations.

---

#### `useManifestResourceFocusRefetch(resourceName?: string | undefined, enabled?: boolean) => void`

Invalidate a manifest resource when the window regains focus.

---

#### `useManifestResourceMountRefetch(resourceName?: string | undefined, enabled?: boolean) => void`

Invalidate a manifest resource on mount when the resource opts into it.

---

#### `useManifestRuntime() => CompiledManifest | null`

Access the compiled manifest runtime.

---

#### `useOverlayRuntime() => OverlayRuntimeValue | null`

Access the current overlay runtime state.

---

#### `useRoutePrefetch(endpoints: (string | { resource: string; params?: Record<string, unknown> | undefined; })[] | undefined) => void`

Prefetch route-scoped resources when a compiled route advertises eager endpoints.

---

#### `useRouteRuntime() => RouteRuntimeValue | null`

Access the current route runtime state.

---

## Components — Data

| Export | Kind | Description |
|---|---|---|
| `AvatarGroup` | function | AvatarGroup — displays a row of overlapping avatars with "+N" overflow. Supports static `avatars` array or API-loaded data. Each avatar shows an image or initials fallback with a deterministic background color. |
| `AvatarGroupConfig` | typealias | Inferred config type from the AvatarGroup Zod schema. |
| `avatarGroupConfigSchema` | variable | Zod config schema for the AvatarGroup component. Displays a row of overlapping avatars with an optional "+N" overflow count. Commonly used for showing team members, assignees, or participants. |
| `BulkAction` | typealias | Inferred bulk action type. |
| `bulkActionSchema` | variable | Schema for a bulk action on selected rows. |
| `Chart` | function | Render a config-driven chart with manifest data sources, live refresh, and slot-aware styling. |
| `ChartConfig` | typealias | Inferred type for the Chart component configuration. |
| `chartSchema` | variable | Zod schema for the Chart component configuration.  Renders a data visualization (bar, line, area, pie, donut) from an endpoint or from-ref. Uses Recharts under the hood. Colors default to `--sn-chart-1` through `--sn-chart-5` tokens. |
| `ColumnConfig` | typealias | Inferred column configuration type. |
| `columnConfigSchema` | variable | Schema for individual column configuration. |
| `DataTable` | function | Config-driven DataTable component.  Renders an HTML table with sorting, pagination, filtering, selection, search, row actions, and bulk actions. All behavior is driven by the `DataTableConfig` schema.  Publishes state via `usePublish` when `id` is set: `{ selected, selectedRows, selectedIds, filters, sort, page, search, data }` |
| `DataTableConfig` | typealias | Inferred DataTable configuration type from the Zod schema. |
| `dataTableConfigSchema` | variable | Zod schema for the DataTable component configuration.  Defines a config-driven data table with sorting, pagination, filtering, selection, search, row actions, and bulk actions. |
| `DetailCard` | function | DetailCard — data-driven detail view that resolves fields from a record resource and renders them inside a configurable card surface with formatted values, copy-to-clipboard, and header actions. |
| `DetailCardConfig` | typealias | DetailCard configuration type inferred from the schema. |
| `detailCardConfigSchema` | variable | Zod schema for DetailCard component configuration.  The detail card displays a single record's fields in a key-value layout. Used in drawers, modals, and detail pages. |
| `EntityPicker` | function | Render a searchable entity picker from manifest-provided options or data. |
| `EntityPickerConfig` | typealias | Inferred config type from the EntityPicker Zod schema. |
| `entityPickerConfigSchema` | variable | Zod config schema for the EntityPicker component. A searchable dropdown for selecting entities (users, documents, items) from an API endpoint. Supports single and multi-select. |
| `FavoriteButton` | function | FavoriteButton component — a config-driven star toggle for marking favorites. Renders a star icon that toggles between active (filled/warning color) and inactive (muted foreground) states. Dispatches an optional action on toggle and publishes its active state. |
| `FavoriteButtonConfig` | typealias | Inferred config type from the FavoriteButton Zod schema. |
| `favoriteButtonConfigSchema` | variable | Zod config schema for the FavoriteButton component. Defines all manifest-settable fields for a star toggle button used to mark items as favorites. |
| `Feed` | function | Render an activity feed with grouping, empty states, live refresh, and optional infinite scrolling. |
| `FeedConfig` | typealias | Inferred type for the Feed component config (from Zod schema). |
| `FeedItem` | interface | A single resolved feed item for rendering. |
| `feedSchema` | variable | Zod schema for the Feed component configuration.  Renders a scrollable activity/event stream from an endpoint or from-ref. Supports avatar, title, description, timestamp, badge fields, pagination, and publishes the selected item to the page context when `id` is set. |
| `FilterBar` | function | FilterBar component — search input + filter dropdowns + active filter pills. Publishes `{ search, filters }` to the page context so other components (e.g., data tables) can subscribe and react to filter changes. |
| `FilterBarConfig` | typealias | Inferred config type for the FilterBar component. |
| `filterBarConfigSchema` | variable | Zod config schema for the FilterBar component. Renders a search input + filter dropdowns + active filter pills. Publishes `{ search, filters }` to the page context. |
| `HighlightedText` | function | HighlightedText component — renders text with search query highlighting. Splits the text by the highlight query and wraps matching portions in `<mark>` elements. Lightweight and purely presentational. |
| `HighlightedTextConfig` | typealias | Inferred config type from the HighlightedText Zod schema. |
| `highlightedTextConfigSchema` | variable | Zod config schema for the HighlightedText component. Renders text with search query highlighting. Matching portions are wrapped in `<mark>` elements with a configurable highlight color. |
| `NotificationBell` | function | NotificationBell component — a config-driven bell icon with unread count badge. Shows a bell icon with an optional red badge displaying the unread count. Badge is hidden when count is 0 or undefined. Counts exceeding `max` are displayed as "{max}+". |
| `NotificationBellConfig` | typealias | Inferred config type from the NotificationBell Zod schema. |
| `notificationBellConfigSchema` | variable | Zod config schema for the NotificationBell component.  Defines all manifest-settable fields for a bell icon with an unread count badge. |
| `PaginationState` | interface | Pagination state for the data table. |
| `ResolvedColumn` | interface | Resolved column definition used internally by the hook and component. |
| `RowAction` | typealias | Inferred row action type. |
| `rowActionSchema` | variable | Schema for a per-row action button. |
| `SaveIndicator` | function | SaveIndicator component — a config-driven inline status indicator showing idle, saving, saved, or error states. - idle: nothing rendered - saving: spinning loader icon + saving text - saved: check icon + saved text (success color) - error: alert-circle icon + error text (destructive color) |
| `SaveIndicatorConfig` | typealias | Inferred config type from the SaveIndicator Zod schema. |
| `saveIndicatorConfigSchema` | variable | Zod config schema for the SaveIndicator component. Defines all manifest-settable fields for a save status indicator that shows idle, saving, saved, or error states. |
| `ScrollArea` | function | ScrollArea component — a scrollable container with custom-styled thin scrollbars. Supports vertical, horizontal, or bidirectional scrolling. Scrollbar visibility can be always, hover-only, or auto. Uses a scoped `<style>` tag for webkit scrollbar pseudo-element styling. |
| `ScrollAreaConfig` | typealias | Inferred config type for the ScrollArea component. |
| `scrollAreaConfigSchema` | variable | Zod config schema for the ScrollArea component. A scrollable container with custom-styled thin scrollbars that respect the design token system. |
| `Separator` | function | Separator component — a simple visual divider line (horizontal or vertical). Renders a thin line using the border color token. When a label is provided, it renders centered text flanked by lines on each side (common for "or" dividers, date separators, etc.). |
| `SeparatorConfig` | typealias | Inferred config type for the Separator component. |
| `separatorConfigSchema` | variable | Zod config schema for the Separator component. A simple visual divider line, either horizontal or vertical. Optionally renders a centered label between the lines. |
| `SeriesConfig` | typealias | Inferred type for a single chart series config. |
| `seriesConfigSchema` | variable | Schema for a single data series in the chart. |
| `SortState` | interface | Sort state for the data table. |
| `StatCard` | function | StatCard component — a data-fetching card that displays a single metric with optional trend indicator.  Fetches data from the configured endpoint, formats the value according to the format config, and optionally shows a trend arrow with color coding based on sentiment. |
| `StatCardConfig` | typealias | Inferred config type from the StatCard Zod schema. |
| `statCardConfigSchema` | variable | Zod config schema for the StatCard component.  Defines all manifest-settable fields for a stat card that displays a single metric with optional trend indicator. |
| `trendConfigSchema` | variable | Schema for the trend indicator configuration. |
| `useDataTable` | function | Headless hook for managing data table state.  Provides sorting, pagination, filtering, selection, and search functionality without any rendering. Resolves `FromRef` values in the `data` and `params` fields via `useSubscribe`. |
| `UseDataTableResult` | interface | Return type of the `useDataTable` headless hook. Provides all state and handlers needed to render a data table. |
| `useDetailCard` | function | Hook that powers the DetailCard component. Resolves FromRefs, fetches data from endpoints, formats fields, and publishes the record data for other components to subscribe to. |
| `UseDetailCardResult` | interface | Return type of the useDetailCard hook. |
| `UseFeedResult` | interface | Return type of the useFeed headless hook. |
| `UseStatCardResult` | interface | Result returned by the StatCard headless hook or internal logic. Provides all the data needed to render a stat card. |

### Details

#### `AvatarGroup({ config }: { config: { type: "avatar-group"; max?: number | undefined; size?: "sm" | "md" | "lg" | undefined; data?: string | { resource: string; params?: Record<string, unknown> | undefined; } | { ...`

AvatarGroup — displays a row of overlapping avatars with "+N" overflow.

Supports static `avatars` array or API-loaded data. Each avatar shows
an image or initials fallback with a deterministic background color.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the avatar group configuration |

---

#### `avatarGroupConfigSchema` *(variable)*

Zod config schema for the AvatarGroup component.

Displays a row of overlapping avatars with an optional "+N" overflow
count. Commonly used for showing team members, assignees, or participants.

**Example:**

```json
{
  "type": "avatar-group",
  "avatars": [
    { "name": "Alice", "src": "/avatars/alice.jpg" },
    { "name": "Bob" },
    { "name": "Charlie", "src": "/avatars/charlie.jpg" },
    { "name": "Diana" },
    { "name": "Eve" }
  ],
  "max": 3,
  "size": "md"
}
```

---

#### `Chart({ config }: { config: { type: "chart"; grid: boolean; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" ...`

Render a config-driven chart with manifest data sources, live refresh, and slot-aware styling.

---

#### `DataTable({ config }: { config: { type: "data-table"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "default...`

Config-driven DataTable component.

Renders an HTML table with sorting, pagination, filtering, selection,
search, row actions, and bulk actions. All behavior is driven by
the `DataTableConfig` schema.

Publishes state via `usePublish` when `id` is set:
`{ selected, selectedRows, selectedIds, filters, sort, page, search, data }`

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the DataTable configuration |

**Example:**

```tsx
<DataTable config={{
  type: 'data-table',
  data: { from: 'my-data-source' },
  columns: 'auto',
  selectable: true,
  searchable: true,
}} />
```

---

#### `dataTableConfigSchema` *(variable)*

Zod schema for the DataTable component configuration.

Defines a config-driven data table with sorting, pagination, filtering,
selection, search, row actions, and bulk actions.

**Example:**

```json
{
  "type": "data-table",
  "id": "users-table",
  "data": "GET /api/users",
  "columns": [
    { "field": "name", "sortable": true },
    { "field": "email" },
    { "field": "status", "format": "badge", "badgeColors": { "active": "success", "inactive": "muted" } }
  ],
  "pagination": { "type": "offset", "pageSize": 20 },
  "selectable": true,
  "searchable": true
}
```

---

#### `DetailCard({ config }: { config: { type: "detail-card"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "defaul...`

DetailCard — data-driven detail view that resolves fields from a record resource and renders them inside a configurable card surface with formatted values, copy-to-clipboard, and header actions.

---

#### `detailCardConfigSchema` *(variable)*

Zod schema for DetailCard component configuration.

The detail card displays a single record's fields in a key-value layout.
Used in drawers, modals, and detail pages.

**Example:**

```json
{
  "type": "detail-card",
  "id": "user-detail",
  "data": { "from": "users-table.selected" },
  "title": "User Details",
  "fields": [
    { "field": "name", "label": "Full Name" },
    { "field": "email", "format": "email", "copyable": true },
    { "field": "role", "format": "badge" },
    { "field": "createdAt", "format": "date" }
  ],
  "actions": [
    { "label": "Edit", "action": { "type": "open-modal", "modal": "edit-user" } }
  ]
}
```

---

#### `EntityPicker({ config }: { config: { type: "entity-picker"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "defa...`

Render a searchable entity picker from manifest-provided options or data.

---

#### `entityPickerConfigSchema` *(variable)*

Zod config schema for the EntityPicker component.

A searchable dropdown for selecting entities (users, documents, items)
from an API endpoint. Supports single and multi-select.

**Example:**

```json
{
  "type": "entity-picker",
  "id": "user-picker",
  "label": "Assign to...",
  "data": "GET /api/users",
  "labelField": "name",
  "valueField": "id",
  "descriptionField": "email",
  "avatarField": "avatar_url",
  "multiple": true
}
```

---

#### `FavoriteButton({ config }: { config: { type: "favorite-button"; size?: "sm" | "md" | "lg" | undefined; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length"...`

FavoriteButton component — a config-driven star toggle for marking favorites.

Renders a star icon that toggles between active (filled/warning color) and
inactive (muted foreground) states. Dispatches an optional action on toggle
and publishes its active state.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the favorite button configuration |

**Example:**

```json
{
  "type": "favorite-button",
  "active": false,
  "size": "md"
}
```

---

#### `favoriteButtonConfigSchema` *(variable)*

Zod config schema for the FavoriteButton component.

Defines all manifest-settable fields for a star toggle button
used to mark items as favorites.

**Example:**

```json
{
  "type": "favorite-button",
  "active": false,
  "size": "md",
  "toggleAction": { "type": "api", "method": "POST", "endpoint": "/api/favorites" }
}
```

---

#### `Feed({ config }: { config: { type: "feed"; title: string; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" |...`

Render an activity feed with grouping, empty states, live refresh, and optional infinite scrolling.

---

#### `feedSchema` *(variable)*

Zod schema for the Feed component configuration.

Renders a scrollable activity/event stream from an endpoint or from-ref.
Supports avatar, title, description, timestamp, badge fields, pagination,
and publishes the selected item to the page context when `id` is set.

**Example:**

```json
{
  "type": "feed",
  "id": "activity-feed",
  "data": "GET /api/activity",
  "itemKey": "id",
  "title": "message",
  "description": "detail",
  "timestamp": "createdAt",
  "avatar": "avatarUrl",
  "badge": { "field": "type", "colorMap": { "error": "destructive", "info": "info" } },
  "pageSize": 10
}
```

---

#### `FilterBar({ config }: { config: { type: "filter-bar"; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowerc...`

FilterBar component — search input + filter dropdowns + active filter pills.

Publishes `{ search, filters }` to the page context so other components
(e.g., data tables) can subscribe and react to filter changes.

**Parameters:**

| Name | Description |
|------|-------------|
| `props.config` | - The filter bar config from the manifest |

---

#### `filterBarConfigSchema` *(variable)*

Zod config schema for the FilterBar component.

Renders a search input + filter dropdowns + active filter pills.
Publishes `{ search, filters }` to the page context.

**Example:**

```json
{
  "type": "filter-bar",
  "id": "user-filters",
  "searchPlaceholder": "Search users...",
  "filters": [
    {
      "key": "role",
      "label": "Role",
      "options": [
        { "label": "Admin", "value": "admin" },
        { "label": "User", "value": "user" }
      ]
    }
  ]
}
```

---

#### `HighlightedText({ config }: { config: { type: "highlighted-text"; text: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lower...`

HighlightedText component — renders text with search query highlighting.

Splits the text by the highlight query and wraps matching portions
in `<mark>` elements. Lightweight and purely presentational.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the highlighted text configuration |

**Example:**

```json
{
  "type": "highlighted-text",
  "text": "Search results for: TypeScript generics",
  "highlight": "TypeScript",
  "caseSensitive": false
}
```

---

#### `highlightedTextConfigSchema` *(variable)*

Zod config schema for the HighlightedText component.

Renders text with search query highlighting. Matching portions are
wrapped in `<mark>` elements with a configurable highlight color.

**Example:**

```json
{
  "type": "highlighted-text",
  "text": "The quick brown fox jumps over the lazy dog",
  "highlight": "fox"
}
```

---

#### `NotificationBell({ config, }: { config: { type: "notification-bell"; ariaLive: "off" | "polite" | "assertive"; count?: number | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "leng...`

NotificationBell component — a config-driven bell icon with unread count badge.

Shows a bell icon with an optional red badge displaying the unread count.
Badge is hidden when count is 0 or undefined. Counts exceeding `max` are
displayed as "{max}+".

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the notification bell configuration |

**Example:**

```json
{
  "type": "notification-bell",
  "count": 12,
  "clickAction": { "type": "navigate", "to": "/notifications" }
}
```

---

#### `notificationBellConfigSchema` *(variable)*

Zod config schema for the NotificationBell component.

Defines all manifest-settable fields for a bell icon with
an unread count badge.

**Example:**

```json
{
  "type": "notification-bell",
  "count": 5,
  "max": 99,
  "clickAction": { "type": "navigate", "to": "/notifications" }
}
```

---

#### `SaveIndicator({ config }: { config: { type: "save-indicator"; status: "error" | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | ... 8...`

SaveIndicator component — a config-driven inline status indicator
showing idle, saving, saved, or error states.

- idle: nothing rendered
- saving: spinning loader icon + saving text
- saved: check icon + saved text (success color)
- error: alert-circle icon + error text (destructive color)

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the save indicator configuration |

**Example:**

```json
{
  "type": "save-indicator",
  "status": "saved",
  "savedText": "All changes saved"
}
```

---

#### `saveIndicatorConfigSchema` *(variable)*

Zod config schema for the SaveIndicator component.

Defines all manifest-settable fields for a save status indicator
that shows idle, saving, saved, or error states.

**Example:**

```json
{
  "type": "save-indicator",
  "status": { "from": "my-form.saveStatus" },
  "savedText": "All changes saved",
  "showIcon": true
}
```

---

#### `ScrollArea({ config }: { config: { type: "scroll-area"; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lower...`

ScrollArea component — a scrollable container with custom-styled thin scrollbars.

Supports vertical, horizontal, or bidirectional scrolling.
Scrollbar visibility can be always, hover-only, or auto.
Uses a scoped `<style>` tag for webkit scrollbar pseudo-element styling.

**Parameters:**

| Name | Description |
|------|-------------|
| `props.config` | - The scroll area config from the manifest |

---

#### `scrollAreaConfigSchema` *(variable)*

Zod config schema for the ScrollArea component.

A scrollable container with custom-styled thin scrollbars
that respect the design token system.

**Example:**

```json
{
  "type": "scroll-area",
  "maxHeight": "300px",
  "orientation": "vertical",
  "showScrollbar": "hover",
  "content": [
    { "type": "heading", "text": "Long list..." }
  ]
}
```

---

#### `Separator({ config }: { config: { type: "separator"; label?: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase"...`

Separator component — a simple visual divider line (horizontal or vertical).

Renders a thin line using the border color token. When a label is provided,
it renders centered text flanked by lines on each side (common for
"or" dividers, date separators, etc.).

**Parameters:**

| Name | Description |
|------|-------------|
| `props.config` | - The separator config from the manifest |

**Example:**

```json
{ "type": "separator" }
```

**Example:**

```json
{ "type": "separator", "label": "Or continue with", "orientation": "horizontal" }
```

---

#### `separatorConfigSchema` *(variable)*

Zod config schema for the Separator component.

A simple visual divider line, either horizontal or vertical.
Optionally renders a centered label between the lines.

**Example:**

```json
{
  "type": "separator",
  "orientation": "horizontal",
  "label": "Or continue with"
}
```

---

#### `StatCard({ config }: { config: { type: "stat-card"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "default"...`

StatCard component — a data-fetching card that displays a single metric
with optional trend indicator.

Fetches data from the configured endpoint, formats the value according
to the format config, and optionally shows a trend arrow with color
coding based on sentiment.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the stat card configuration |

**Example:**

```json
{
  "type": "stat-card",
  "id": "revenue-card",
  "data": "GET /api/stats/revenue",
  "field": "total",
  "label": "Revenue",
  "format": "currency",
  "trend": { "field": "previousTotal", "sentiment": "up-is-good" }
}
```

---

#### `statCardConfigSchema` *(variable)*

Zod config schema for the StatCard component.

Defines all manifest-settable fields for a stat card that displays
a single metric with optional trend indicator.

**Example:**

```json
{
  "type": "stat-card",
  "data": "GET /api/stats/revenue",
  "field": "total",
  "label": "Revenue",
  "format": "currency",
  "trend": { "field": "previousTotal", "sentiment": "up-is-good" }
}
```

---

#### `useDataTable(config: { type: "data-table"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "default" | ... 13 mor...`

Headless hook for managing data table state.

Provides sorting, pagination, filtering, selection, and search
functionality without any rendering. Resolves `FromRef` values
in the `data` and `params` fields via `useSubscribe`.

**Parameters:**

| Name | Description |
|------|-------------|
| `config` | DataTable configuration (from Zod schema) |

**Returns:** All state and handlers needed to render a data table

**Example:**

```tsx
const table = useDataTable({
  type: 'data-table',
  data: 'GET /api/users',
  columns: 'auto',
  pagination: { type: 'offset', pageSize: 10 },
  selectable: true,
  searchable: true,
})

// table.rows — current page rows
// table.sort — current sort state
// table.setSortColumn('name') — toggle sort
// table.selectedRows — selected row objects
```

---

#### `useDetailCard(config: { type: "detail-card"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "default" | ... 13 mo...`

Hook that powers the DetailCard component.
Resolves FromRefs, fetches data from endpoints, formats fields,
and publishes the record data for other components to subscribe to.

**Parameters:**

| Name | Description |
|------|-------------|
| `config` | The DetailCard configuration |

**Returns:** Data, fields, title, loading/error state, and refetch function

**Example:**

```tsx
const { data, fields, title, isLoading, error, refetch } = useDetailCard({
  type: 'detail-card',
  data: { from: 'users-table.selected' },
  fields: 'auto',
})
```

---

## Components — Forms

| Export | Kind | Description |
|---|---|---|
| `AutoForm` | function | Config-driven form component with multi-column layout, conditional field visibility, and section grouping.  Supports client-side validation, submission to an API endpoint, manifest-aware resource mutation (invalidation + optimistic handling), workflow lifecycle hooks (`beforeSubmit`, `afterSubmit`, `error`), and action chaining on success/error. Publishes form state to the page context when an `id` is configured. |
| `AutoFormConfig` | typealias | Inferred type for the AutoForm component config. |
| `autoFormConfigSchema` | variable | Zod schema for the AutoForm component config.  Defines a config-driven form that auto-generates fields from config or OpenAPI schema. Supports validation, submission, action chaining, multi-column layout, conditional field visibility, and field grouping. |
| `ColorPicker` | function | Render a manifest-driven color picker input. |
| `ColorPickerConfig` | typealias | Config for the manifest-driven color picker component. |
| `colorPickerConfigSchema` | variable | Schema for color picker components with optional swatches, alpha, and change actions. |
| `DatePicker` | function | Render a manifest-driven date picker input. |
| `DatePickerConfig` | typealias | Config for the manifest-driven date picker component. |
| `datePickerConfigSchema` | variable | Schema for date picker components covering single, range, and multi-date selection. |
| `FieldConfig` | typealias | Inferred type for a single field configuration. |
| `fieldConfigSchema` | variable | Schema for an individual field configuration. |
| `FieldErrors` | typealias | Per-field validation error. |
| `InlineEdit` | function | InlineEdit component — click-to-edit text field. Toggles between a display mode and an edit mode. Enter or blur saves the value; Escape reverts to the original value when `cancelOnEscape` is enabled. |
| `InlineEditConfig` | typealias | Inferred config type for the InlineEdit component. |
| `inlineEditConfigSchema` | variable | Zod config schema for the InlineEdit component. A click-to-edit text field that toggles between display and edit modes. Publishes `{ value, editing }` to the page context. |
| `Input` | function | Config-driven Input component — a standalone text input field with label, placeholder, validation, optional icon, and helper/error text. Publishes `{ value: string }` to the page context when an `id` is set. Supports debounced `changeAction` execution on value change. |
| `InputConfig` | typealias | Inferred config type from the Input Zod schema. |
| `inputConfigSchema` | variable | Zod config schema for the Input component. Defines a standalone text input field with label, placeholder, validation, and optional icon. |
| `LocationInput` | function | LocationInput — geocode autocomplete input. Searches a backend endpoint as the user types, displays matching locations in a dropdown, and publishes `{ name, lat, lng, address }` on selection. Optionally shows a Google Maps link after selection. |
| `LocationInputConfig` | interface | Public config shape for the LocationInput component. |
| `locationInputConfigSchema` | variable | Zod config schema for the LocationInput component. Geocode autocomplete input that searches a backend endpoint, displays matching locations in a dropdown, and extracts coordinates on selection. Publishes `{ name, lat, lng, address }`. |
| `MultiSelect` | function | Config-driven MultiSelect component — a dropdown with checkboxes for selecting multiple values. Supports static options, API-loaded options, search filtering, max selection limits, and pill display for selected items. Publishes `{ value: string[] }` to the page context when an `id` is set. |
| `MultiSelectConfig` | typealias | Inferred config type from the MultiSelect Zod schema. |
| `multiSelectConfigSchema` | variable | Zod config schema for the MultiSelect component. Defines a dropdown with checkboxes for selecting multiple values, with optional search filtering and pill display. |
| `QuickAdd` | function | QuickAdd component — a config-driven inline creation bar for quick item entry. Renders a horizontal bar with an optional icon, text input, and submit button. Enter key submits by default. Dispatches `submitAction` with `{ value }` payload and publishes the current input value. |
| `QuickAddConfig` | typealias | Inferred config type from the QuickAdd Zod schema. |
| `quickAddConfigSchema` | variable | Zod config schema for the QuickAdd component. Defines all manifest-settable fields for an inline creation bar that allows quick item entry with a text input and submit button. |
| `Select` | function | Manifest-driven select input with support for static options and resource-backed option lists. |
| `Slider` | function | Render a manifest-driven slider input. |
| `SliderConfig` | typealias | Config for the manifest-driven slider component. |
| `sliderConfigSchema` | variable | Schema for single-value and ranged slider controls with optional value display/actions. |
| `TagSelector` | function | TagSelector component — a tag input for selecting and creating tags. Displays selected tags as colored pills with remove buttons. Includes a text input for searching available tags and optionally creating new ones. |
| `TagSelectorConfig` | typealias | Inferred config type from the TagSelector Zod schema. |
| `tagSelectorConfigSchema` | variable | Zod config schema for the TagSelector component. A tag input that allows selecting from predefined tags or creating new ones. Tags display as colored pills with remove buttons. |
| `Textarea` | function | Config-driven Textarea component — a multi-line text input with label, character count, validation, and configurable resize. Publishes `{ value: string }` to the page context when an `id` is set. Shows a character count indicator when `maxLength` is configured. |
| `TextareaConfig` | typealias | Inferred config type from the Textarea Zod schema. |
| `textareaConfigSchema` | variable | Zod config schema for the Textarea component. Defines a multi-line text input with label, character count, validation, and configurable resize behavior. |
| `Toggle` | function | Config-driven Toggle component — a pressed/unpressed toggle button. When pressed, displays with primary background and foreground colors. When unpressed, uses transparent background. Publishes `{ pressed: boolean }` to the page context when an `id` is set. |
| `ToggleConfig` | typealias | Inferred config type from the Toggle Zod schema. |
| `toggleConfigSchema` | variable | Zod config schema for the Toggle component. Defines a pressed/unpressed toggle button that publishes its state. Can display text, an icon, or both. |
| `TouchedFields` | typealias | Tracks which fields have been interacted with. |
| `useAutoForm` | function | Headless hook for form state management.  Tracks field values, validation errors, and touched state. Validates on blur (per-field) and on submit (all fields). |
| `UseAutoFormResult` | interface | Return type for the useAutoForm headless hook. |
| `useWizard` | function | Manage wizard step state, validation, submission, and transition flow. |
| `UseWizardResult` | interface | Return type of the useWizard headless hook. |
| `Wizard` | function | Render a multi-step form wizard with built-in validation, step state, and slot-aware styling. |
| `WizardConfig` | typealias | Inferred type for the Wizard component configuration. |
| `wizardSchema` | variable | Zod schema for the Wizard component configuration.  A multi-step form flow. Each step collects fields independently. On the final step, all accumulated data is submitted to `submitEndpoint` (if set) and published to the page context via `id`. |
| `WizardStepConfig` | typealias | Inferred type for a single wizard step configuration. |
| `wizardStepSchema` | variable | Schema for a single wizard step. |

### Details

#### `AutoForm({ config }: { config: { type: "form" | "auto-form"; fields: "auto" | { type: "number" | "date" | "email" | "datetime" | "time" | "color" | "text" | "password" | "select" | "textarea" | "checkbox" | ....`

Config-driven form component with multi-column layout, conditional
field visibility, and section grouping.

Supports client-side validation, submission to an API endpoint,
manifest-aware resource mutation (invalidation + optimistic handling),
workflow lifecycle hooks (`beforeSubmit`, `afterSubmit`, `error`),
and action chaining on success/error. Publishes form state to the
page context when an `id` is configured.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the form config |

---

#### `autoFormConfigSchema` *(variable)*

Zod schema for the AutoForm component config.

Defines a config-driven form that auto-generates fields from config
or OpenAPI schema. Supports validation, submission, action chaining,
multi-column layout, conditional field visibility, and field grouping.

**Example:**

```json
{
  "type": "form",
  "submit": "/api/users",
  "method": "POST",
  "columns": 2,
  "fields": [
    { "name": "firstName", "type": "text", "required": true, "span": 1 },
    { "name": "lastName", "type": "text", "required": true, "span": 1 },
    { "name": "email", "type": "email", "required": true },
    { "name": "role", "type": "select", "options": [
      { "label": "Admin", "value": "admin" },
      { "label": "User", "value": "user" }
    ]},
    { "name": "notes", "type": "textarea", "dependsOn": { "field": "role", "value": "admin" } }
  ],
  "submitLabel": "Create User",
  "onSuccess": { "type": "toast", "message": "User created!", "variant": "success" }
}
```

---

#### `ColorPicker({ config }: { config: { type: "color-picker"; format: "hex" | "rgb" | "hsl"; allowCustom: boolean; showAlpha: boolean; label?: string | undefined; background?: string | { size?: "auto" | "cover" | "c...`

Render a manifest-driven color picker input.

---

#### `DatePicker({ config }: { config: { type: "date-picker"; mode: "single" | "range" | "multiple"; valueFormat: "iso" | "unix" | "locale"; label?: string | undefined; min?: string | undefined; max?: string | undefi...`

Render a manifest-driven date picker input.

---

#### `InlineEdit({ config }: { config: { type: "inline-edit"; value?: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercas...`

InlineEdit component — click-to-edit text field.

Toggles between a display mode and an edit mode. Enter or blur saves the
value; Escape reverts to the original value when `cancelOnEscape` is enabled.

---

#### `inlineEditConfigSchema` *(variable)*

Zod config schema for the InlineEdit component.

A click-to-edit text field that toggles between display and edit modes.
Publishes `{ value, editing }` to the page context.

**Example:**

```json
{
  "type": "inline-edit",
  "id": "title-edit",
  "value": "My Title",
  "placeholder": "Enter title",
  "saveAction": { "type": "api", "method": "PUT", "endpoint": "/api/title", "body": { "from": "title-edit" } }
}
```

---

#### `Input({ config }: { config: { type: "input"; value?: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase" | ....`

Config-driven Input component — a standalone text input field with label,
placeholder, validation, optional icon, and helper/error text.

Publishes `{ value: string }` to the page context when an `id` is set.
Supports debounced `changeAction` execution on value change.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the input config |

**Example:**

```json
{
  "type": "input",
  "id": "search-field",
  "label": "Search",
  "inputType": "search",
  "placeholder": "Type to search...",
  "icon": "search",
  "changeAction": { "type": "set-value", "target": "results-table", "field": "filter" }
}
```

---

#### `inputConfigSchema` *(variable)*

Zod config schema for the Input component.

Defines a standalone text input field with label, placeholder,
validation, and optional icon.

**Example:**

```json
{
  "type": "input",
  "id": "email-field",
  "label": "Email",
  "inputType": "email",
  "placeholder": "you@example.com",
  "required": true,
  "helperText": "We'll never share your email"
}
```

---

#### `LocationInput({ config }: { config: LocationInputConfig; }) => Element | null`

LocationInput — geocode autocomplete input.

Searches a backend endpoint as the user types, displays matching
locations in a dropdown, and publishes `{ name, lat, lng, address }`
on selection. Optionally shows a Google Maps link after selection.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the location input configuration |

---

#### `locationInputConfigSchema` *(variable)*

Zod config schema for the LocationInput component.

Geocode autocomplete input that searches a backend endpoint,
displays matching locations in a dropdown, and extracts
coordinates on selection. Publishes `{ name, lat, lng, address }`.

**Example:**

```json
{
  "type": "location-input",
  "id": "venue-location",
  "label": "Venue",
  "placeholder": "Search for a location...",
  "searchEndpoint": "GET /api/geocode",
  "changeAction": {
    "type": "set-value",
    "target": "map",
    "value": { "from": "venue-location" }
  }
}
```

Expected API response format:
```json
[
  {
    "name": "Central Park",
    "address": "New York, NY, USA",
    "lat": 40.7829,
    "lng": -73.9654
  }
]
```

---

#### `MultiSelect({ config }: { config: { type: "multi-select"; value?: string[] | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lower...`

Config-driven MultiSelect component — a dropdown with checkboxes
for selecting multiple values.

Supports static options, API-loaded options, search filtering,
max selection limits, and pill display for selected items.
Publishes `{ value: string[] }` to the page context when an `id` is set.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the multi-select config |

**Example:**

```json
{
  "type": "multi-select",
  "id": "assigned-users",
  "label": "Assign to",
  "data": "GET /api/users",
  "labelField": "name",
  "valueField": "id",
  "searchable": true,
  "maxSelected": 3
}
```

---

#### `multiSelectConfigSchema` *(variable)*

Zod config schema for the MultiSelect component.

Defines a dropdown with checkboxes for selecting multiple values,
with optional search filtering and pill display.

**Example:**

```json
{
  "type": "multi-select",
  "id": "tags",
  "label": "Tags",
  "placeholder": "Select tags...",
  "options": [
    { "label": "Bug", "value": "bug", "icon": "bug" },
    { "label": "Feature", "value": "feature", "icon": "star" },
    { "label": "Docs", "value": "docs", "icon": "file-text" }
  ],
  "maxSelected": 5,
  "searchable": true
}
```

---

#### `QuickAdd({ config }: { config: { type: "quick-add"; icon?: string | undefined; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "value...`

QuickAdd component — a config-driven inline creation bar for quick item entry.

Renders a horizontal bar with an optional icon, text input, and submit button.
Enter key submits by default. Dispatches `submitAction` with `{ value }` payload
and publishes the current input value.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the quick add configuration |

**Example:**

```json
{
  "type": "quick-add",
  "placeholder": "Add a task...",
  "submitAction": { "type": "api", "method": "POST", "endpoint": "/api/tasks" },
  "showButton": true,
  "buttonText": "Add"
}
```

---

#### `quickAddConfigSchema` *(variable)*

Zod config schema for the QuickAdd component.

Defines all manifest-settable fields for an inline creation bar
that allows quick item entry with a text input and submit button.

**Example:**

```json
{
  "type": "quick-add",
  "placeholder": "Add a task...",
  "submitAction": { "type": "api", "method": "POST", "endpoint": "/api/tasks" },
  "clearOnSubmit": true
}
```

---

#### `Select({ config }: { config: { options: string | { resource: string; params?: { [x: string]: unknown; } | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "l...`

Manifest-driven select input with support for static options and resource-backed
option lists.

---

#### `Slider({ config }: { config: { type: "slider"; min: number; max: number; range: boolean; step: number; showValue: boolean; showLimits: boolean; label?: string | undefined; background?: string | { size?: "au...`

Render a manifest-driven slider input.

---

#### `TagSelector({ config }: { config: { type: "tag-selector"; value?: string[] | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lower...`

TagSelector component — a tag input for selecting and creating tags.

Displays selected tags as colored pills with remove buttons. Includes
a text input for searching available tags and optionally creating new ones.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the tag selector configuration |

**Example:**

```json
{
  "type": "tag-selector",
  "id": "tags",
  "tags": [
    { "label": "Bug", "value": "bug", "color": "#ef4444" },
    { "label": "Feature", "value": "feature", "color": "#22c55e" }
  ],
  "allowCreate": true
}
```

---

#### `tagSelectorConfigSchema` *(variable)*

Zod config schema for the TagSelector component.

A tag input that allows selecting from predefined tags or creating new ones.
Tags display as colored pills with remove buttons.

**Example:**

```json
{
  "type": "tag-selector",
  "id": "topic-tags",
  "label": "Topics",
  "tags": [
    { "label": "React", "value": "react", "color": "#61dafb" },
    { "label": "TypeScript", "value": "ts", "color": "#3178c6" }
  ],
  "allowCreate": true,
  "maxTags": 5
}
```

---

#### `Textarea({ config }: { config: { type: "textarea"; value?: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase" ...`

Config-driven Textarea component — a multi-line text input with label,
character count, validation, and configurable resize.

Publishes `{ value: string }` to the page context when an `id` is set.
Shows a character count indicator when `maxLength` is configured.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the textarea config |

**Example:**

```json
{
  "type": "textarea",
  "id": "notes",
  "label": "Notes",
  "rows": 5,
  "maxLength": 500,
  "placeholder": "Add your notes..."
}
```

---

#### `textareaConfigSchema` *(variable)*

Zod config schema for the Textarea component.

Defines a multi-line text input with label, character count,
validation, and configurable resize behavior.

**Example:**

```json
{
  "type": "textarea",
  "id": "bio-field",
  "label": "Bio",
  "placeholder": "Tell us about yourself...",
  "rows": 5,
  "maxLength": 500,
  "resize": "vertical"
}
```

---

#### `Toggle({ config }: { config: { type: "toggle"; label?: string | undefined; icon?: string | undefined; size?: "sm" | "md" | "lg" | undefined; variant?: "default" | "outline" | undefined; disabled?: boolean |...`

Config-driven Toggle component — a pressed/unpressed toggle button.

When pressed, displays with primary background and foreground colors.
When unpressed, uses transparent background. Publishes `{ pressed: boolean }`
to the page context when an `id` is set.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the toggle config |

**Example:**

```json
{
  "type": "toggle",
  "id": "italic-toggle",
  "icon": "italic",
  "variant": "outline",
  "size": "sm",
  "changeAction": { "type": "set-value", "target": "editor", "field": "italic" }
}
```

---

#### `toggleConfigSchema` *(variable)*

Zod config schema for the Toggle component.

Defines a pressed/unpressed toggle button that publishes its state.
Can display text, an icon, or both.

**Example:**

```json
{
  "type": "toggle",
  "id": "bold-toggle",
  "icon": "bold",
  "label": "Bold",
  "variant": "outline",
  "size": "sm"
}
```

---

#### `useAutoForm(fields: { type: "number" | "date" | "email" | "datetime" | "time" | "color" | "text" | "password" | "select" | "textarea" | "checkbox" | "file" | "radio-group" | "switch" | "slider" | "combobox" | "t...`

Headless hook for form state management.

Tracks field values, validation errors, and touched state.
Validates on blur (per-field) and on submit (all fields).

**Parameters:**

| Name | Description |
|------|-------------|
| `fields` | Array of field configurations |
| `onSubmit` | Async callback invoked with form values when validation passes |

**Returns:** Form state and handlers

**Example:**

```tsx
const form = useAutoForm(fields, async (values) => {
  await api.post('/api/users', values)
})

return (
  <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
    <input
      value={form.values.name as string}
      onChange={(e) => form.setValue('name', e.target.value)}
      onBlur={() => form.touchField('name')}
    />
    {form.touched.name && form.errors.name && <span>{form.errors.name}</span>}
    <button disabled={form.isSubmitting}>Submit</button>
  </form>
)
```

---

#### `useWizard(config: { type: "wizard"; submitLabel: string; steps: { title: string; fields: { type: "number" | "date" | "email" | "datetime" | "time" | "color" | "text" | "password" | "select" | "textarea" | ... ...`

Manage wizard step state, validation, submission, and transition flow.

---

#### `Wizard({ config }: { config: { type: "wizard"; submitLabel: string; steps: { title: string; fields: { type: "number" | "date" | "email" | "datetime" | "time" | "color" | "text" | "password" | "select" | "te...`

Render a multi-step form wizard with built-in validation, step state, and slot-aware styling.

---

## Components — Communication

| Export | Kind | Description |
|---|---|---|
| `buildEmojiMap` | function | Builds a shortcode lookup map from an array of custom emojis. |
| `ChatWindow` | function | ChatWindow — full chat interface composing a message thread, rich input, and typing indicator. Provides a Discord/Slack-style chat experience in a single config-driven component. |
| `ChatWindowConfig` | typealias | Inferred config type from the ChatWindow Zod schema. |
| `chatWindowConfigSchema` | variable | Zod config schema for the ChatWindow component. A full chat interface composing a message thread, rich input, and typing indicator into a single component. |
| `CommentSection` | function | CommentSection — displays a list of comments with author avatars, timestamps, and an embedded rich input for posting new comments. |
| `CommentSectionConfig` | typealias | Inferred config type from the CommentSection Zod schema. |
| `commentSectionConfigSchema` | variable | Zod config schema for the CommentSection component. Renders a comment list with nested replies and an embedded rich input for posting new comments. |
| `CUSTOM_EMOJI_CSS` | variable | CSS for custom emoji sizing. Custom emojis render as inline images sized to match surrounding text. |
| `CustomEmoji` | interface | Shape of a custom emoji entry. |
| `EmojiPicker` | function | EmojiPicker — searchable grid of emojis organized by category. Publishes `{ emoji, name }` when an emoji is selected. |
| `EmojiPickerConfig` | typealias | Inferred config type from the EmojiPicker Zod schema. |
| `emojiPickerConfigSchema` | variable | Zod config schema for the EmojiPicker component. Renders a searchable grid of emojis organized by category. |
| `GifEntry` | interface | Shape of a GIF entry. |
| `GifPicker` | function | GifPicker — searchable GIF grid with support for API-powered search or static GIF data. Displays a masonry-style grid of GIF previews. |
| `GifPickerConfig` | typealias | Inferred config type from the GifPicker Zod schema. |
| `gifPickerConfigSchema` | variable | Zod config schema for the GifPicker component. Searchable GIF picker that queries a GIF API (Giphy/Tenor) and displays results in a masonry-style grid. The component expects a backend proxy endpoint that handles the actual API key and returns GIF results. This avoids exposing API keys in the frontend. |
| `MessageThread` | function | MessageThread — scrollable message list with avatars, timestamps, message grouping, and date separators. Renders HTML content from TipTap or other sources with sanitization. |
| `MessageThreadConfig` | typealias | Inferred config type from the MessageThread Zod schema. |
| `messageThreadConfigSchema` | variable | Zod config schema for the MessageThread component. Renders a scrollable message list with avatars, timestamps, message grouping, date separators, and optional reactions/threading. |
| `parseShortcodes` | function | Parses shortcodes in text and replaces them with `<img>` tags. |
| `PresenceIndicator` | function | PresenceIndicator — displays online/offline/away/busy/dnd status with a colored dot and optional label. |
| `PresenceIndicatorConfig` | typealias | Inferred config type from the PresenceIndicator Zod schema. |
| `presenceIndicatorConfigSchema` | variable | Zod config schema for the PresenceIndicator component. Displays an online/offline/away/busy/dnd status dot with optional label. |
| `ReactionBar` | function | ReactionBar — displays emoji reactions with counts and an optional add button that opens an emoji picker popover. |
| `ReactionBarConfig` | typealias | Inferred config type from the ReactionBar Zod schema. |
| `reactionBarConfigSchema` | variable | Zod config schema for the ReactionBar component. Displays emoji reactions with counts and an add button. |
| `resolveEmojiRecords` | function | Resolves emoji records from the API into CustomEmoji entries. Handles the `uploadKey` → `url` resolution using a URL prefix or field mapping. |
| `TypingIndicator` | function | TypingIndicator — shows animated bouncing dots with user names to indicate who is currently typing. |
| `TypingIndicatorConfig` | typealias | Inferred config type from the TypingIndicator Zod schema. |
| `typingIndicatorConfigSchema` | variable | Zod config schema for the TypingIndicator component. Displays an animated "User is typing..." indicator with bouncing dots. |

### Details

#### `buildEmojiMap(emojis: CustomEmoji[]) => Map<string, CustomEmoji>`

Builds a shortcode lookup map from an array of custom emojis.

---

#### `ChatWindow({ config }: { config: { type: "chat-window"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "defaul...`

ChatWindow — full chat interface composing a message thread,
rich input, and typing indicator. Provides a Discord/Slack-style
chat experience in a single config-driven component.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the chat window configuration |

---

#### `chatWindowConfigSchema` *(variable)*

Zod config schema for the ChatWindow component.

A full chat interface composing a message thread, rich input,
and typing indicator into a single component.

**Example:**

```json
{
  "type": "chat-window",
  "title": "#general",
  "data": "GET /api/channels/general/messages",
  "sendAction": {
    "type": "api",
    "method": "POST",
    "endpoint": "/api/channels/general/messages"
  },
  "height": "600px"
}
```

---

#### `CommentSection({ config }: { config: { type: "comment-section"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | ......`

CommentSection — displays a list of comments with author avatars,
timestamps, and an embedded rich input for posting new comments.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the comment section configuration |

---

#### `commentSectionConfigSchema` *(variable)*

Zod config schema for the CommentSection component.

Renders a comment list with nested replies and an embedded rich input
for posting new comments.

**Example:**

```json
{
  "type": "comment-section",
  "data": "GET /api/posts/123/comments",
  "inputPlaceholder": "Write a comment...",
  "submitAction": {
    "type": "api",
    "method": "POST",
    "endpoint": "/api/posts/123/comments"
  }
}
```

---

#### `EmojiPicker({ config }: { config: { type: "emoji-picker"; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowe...`

EmojiPicker — searchable grid of emojis organized by category.
Publishes `{ emoji, name }` when an emoji is selected.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the emoji picker configuration |

---

#### `emojiPickerConfigSchema` *(variable)*

Zod config schema for the EmojiPicker component.

Renders a searchable grid of emojis organized by category.

**Example:**

```json
{
  "type": "emoji-picker",
  "id": "emoji",
  "perRow": 8,
  "maxHeight": "300px"
}
```

---

#### `GifPicker({ config }: { config: { type: "gif-picker"; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowerc...`

GifPicker — searchable GIF grid with support for API-powered search
or static GIF data. Displays a masonry-style grid of GIF previews.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the GIF picker configuration |

---

#### `gifPickerConfigSchema` *(variable)*

Zod config schema for the GifPicker component.

Searchable GIF picker that queries a GIF API (Giphy/Tenor) and
displays results in a masonry-style grid.

The component expects a backend proxy endpoint that handles the
actual API key and returns GIF results. This avoids exposing
API keys in the frontend.

**Example:**

```json
{
  "type": "gif-picker",
  "searchEndpoint": "GET /api/gifs/search",
  "trendingEndpoint": "GET /api/gifs/trending",
  "selectAction": {
    "type": "toast",
    "message": "GIF selected!"
  }
}
```

Expected API response format:
```json
{
  "results": [
    {
      "id": "abc123",
      "url": "https://media.giphy.com/media/abc123/giphy.gif",
      "preview": "https://media.giphy.com/media/abc123/200w.gif",
      "width": 480,
      "height": 270,
      "title": "Funny cat"
    }
  ]
}
```

---

#### `MessageThread({ config }: { config: { type: "message-thread"; data: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | ... ...`

MessageThread — scrollable message list with avatars, timestamps,
message grouping, and date separators. Renders HTML content from
TipTap or other sources with sanitization.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the message thread configuration |

---

#### `messageThreadConfigSchema` *(variable)*

Zod config schema for the MessageThread component.

Renders a scrollable message list with avatars, timestamps,
message grouping, date separators, and optional reactions/threading.

**Example:**

```json
{
  "type": "message-thread",
  "data": "GET /api/channels/general/messages",
  "showReactions": true,
  "groupByDate": true,
  "maxHeight": "500px"
}
```

---

#### `parseShortcodes(text: string, emojis: Map<string, CustomEmoji>) => string`

Parses shortcodes in text and replaces them with `<img>` tags.

**Parameters:**

| Name | Description |
|------|-------------|
| `text` | The text containing shortcodes like `:emoji_name:` |
| `emojis` | Map of shortcode → CustomEmoji |

**Returns:** HTML string with shortcodes replaced by img tags

**Example:**

```ts
const emojis = new Map([["wave", { url: "/emojis/wave.gif", ... }]]);
parseShortcodes("Hello :wave:", emojis);
// → 'Hello <img class="sn-custom-emoji" src="/emojis/wave.gif" alt=":wave:" title="wave" />'
```

---

#### `PresenceIndicator({ config, }: { config: { type: "presence-indicator"; status: "offline" | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" ...`

PresenceIndicator — displays online/offline/away/busy/dnd status
with a colored dot and optional label.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the presence indicator configuration |

---

#### `presenceIndicatorConfigSchema` *(variable)*

Zod config schema for the PresenceIndicator component.

Displays an online/offline/away/busy/dnd status dot with optional label.

**Example:**

```json
{
  "type": "presence-indicator",
  "status": "online",
  "label": "John Doe",
  "size": "md"
}
```

---

#### `ReactionBar({ config }: { config: { type: "reaction-bar"; data?: string | { resource: string; params?: Record<string, unknown> | undefined; } | { from: string; transform?: "string" | "number" | "boolean" | "defa...`

ReactionBar — displays emoji reactions with counts and an optional
add button that opens an emoji picker popover.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the reaction bar configuration |

---

#### `reactionBarConfigSchema` *(variable)*

Zod config schema for the ReactionBar component.

Displays emoji reactions with counts and an add button.

**Example:**

```json
{
  "type": "reaction-bar",
  "reactions": [
    { "emoji": "\ud83d\udc4d", "count": 5, "active": true },
    { "emoji": "\u2764\ufe0f", "count": 3 },
    { "emoji": "\ud83d\ude02", "count": 2 }
  ]
}
```

---

#### `resolveEmojiRecords(records: Record<string, unknown>[], urlField?: string, urlPrefix?: string | undefined) => CustomEmoji[]`

Resolves emoji records from the API into CustomEmoji entries.
Handles the `uploadKey` → `url` resolution using a URL prefix or field mapping.

**Parameters:**

| Name | Description |
|------|-------------|
| `records` | Raw API response records |
| `urlField` | Field name containing the image URL. Default: "url" |
| `urlPrefix` | Prefix to prepend to uploadKey for URL resolution |

---

#### `TypingIndicator({ config }: { config: { type: "typing-indicator"; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | ....`

TypingIndicator — shows animated bouncing dots with user names
to indicate who is currently typing.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the typing indicator configuration |

---

#### `typingIndicatorConfigSchema` *(variable)*

Zod config schema for the TypingIndicator component.

Displays an animated "User is typing..." indicator with bouncing dots.

**Example:**

```json
{
  "type": "typing-indicator",
  "users": [{ "name": "Alice" }, { "name": "Bob" }]
}
```

---

## Components — Content

| Export | Kind | Description |
|---|---|---|
| `Code` | function | Inline code primitive rendered inside flowing text or compact metadata. |
| `CodeConfig` | typealias | Inferred config type for the Code component. |
| `codeConfigSchema` | variable | Inline code primitive schema for manifest-rendered code snippets. |
| `CompareView` | function | CompareView component — a config-driven side-by-side diff viewer for comparing two text values. Uses a simple LCS-based line diff algorithm. Removed lines are highlighted in red, added lines in green, and unchanged lines render normally. Supports synced scrolling between panes. |
| `CompareViewConfig` | typealias | Inferred config type from the CompareView Zod schema. |
| `compareViewConfigSchema` | variable | Zod config schema for the CompareView component. Defines all manifest-settable fields for a side-by-side content comparison view with diff highlighting. |
| `detectPlatform` | function | Detects the platform from a URL and extracts embed info. |
| `Heading` | function | Heading component for manifest-driven page titles and section headings. Resolves FromRef and template-backed text, then renders an `h1`-`h6` element with Snapshot token-based typography defaults. |
| `LinkEmbed` | function | LinkEmbed — renders rich URL previews with platform-specific renderers. Supports YouTube, Instagram, TikTok, Twitter/X iframes, inline GIF images, and generic Open Graph cards for all other URLs. |
| `LinkEmbedConfig` | typealias | Inferred config type from the LinkEmbed Zod schema. |
| `linkEmbedConfigSchema` | variable | Zod config schema for the LinkEmbed component. Renders rich URL previews with platform-specific renderers for YouTube, Instagram, TikTok, Twitter/X, and generic Open Graph cards. Also supports inline GIF embeds. |
| `Markdown` | function | Markdown component — renders markdown content with full GFM support and syntax highlighting powered by rehype-highlight. Uses `--sn-*` design tokens for all typography, colors, and spacing. |
| `MarkdownConfig` | typealias | Inferred config type from the Markdown Zod schema. |
| `markdownConfigSchema` | variable | Zod config schema for the Markdown component. Renders markdown content with full GFM support and syntax highlighting. |
| `Platform` | typealias | Platform detection and embed URL extraction. Identifies known platforms from URLs and extracts the embed-compatible URL or ID needed to render platform-specific iframes. |
| `PLATFORM_COLORS` | variable | Platform accent colors. |
| `PLATFORM_NAMES` | variable | Platform display names. |
| `PlatformInfo` | interface | Resolved platform metadata used to render a platform-specific embedded preview. |
| `RichInput` | function | RichInput component — TipTap-based WYSIWYG editor for chat messages, comments, and posts. Users see formatted text as they type. Publishes `{ html, text, mentions }` to the page context when content changes. |
| `RichInputConfig` | typealias | Inferred config type from the RichInput Zod schema. |
| `richInputConfigSchema` | variable | Zod config schema for the RichInput component. A TipTap-based WYSIWYG editor for chat messages, comments, and posts. Users see formatted text as they type (bold, italic, mentions, etc.) rather than raw markdown. |
| `RichTextEditor` | function | RichTextEditor component — a CodeMirror 6-based markdown editor with toolbar, preview pane, and split view support.  Fetches initial content from config or via from-ref, publishes the current markdown content to the page context when the editor has an id. |
| `RichTextEditorConfig` | typealias | Inferred config type from the RichTextEditor Zod schema. |
| `richTextEditorConfigSchema` | variable | Zod config schema for the RichTextEditor component. Defines all manifest-settable fields for a CodeMirror 6-based markdown editor with toolbar, preview pane, and split view support. |

### Details

#### `Code({ config }: { config: { value: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase" | "trim" | "json" |...`

Inline code primitive rendered inside flowing text or compact metadata.

---

#### `CompareView({ config }: { config: { type: "compare-view"; left: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase...`

CompareView component — a config-driven side-by-side diff viewer
for comparing two text values.

Uses a simple LCS-based line diff algorithm. Removed lines are
highlighted in red, added lines in green, and unchanged lines
render normally. Supports synced scrolling between panes.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the compare view configuration |

**Example:**

```json
{
  "type": "compare-view",
  "left": "line 1\nline 2",
  "right": "line 1\nline 2 modified",
  "leftLabel": "Original",
  "rightLabel": "Modified"
}
```

---

#### `compareViewConfigSchema` *(variable)*

Zod config schema for the CompareView component.

Defines all manifest-settable fields for a side-by-side content
comparison view with diff highlighting.

**Example:**

```json
{
  "type": "compare-view",
  "left": "Original text content",
  "right": "Modified text content",
  "leftLabel": "Before",
  "rightLabel": "After"
}
```

---

#### `detectPlatform(url: string, options?: { darkMode?: boolean | undefined; } | undefined) => PlatformInfo | null`

Detects the platform from a URL and extracts embed info.

**Parameters:**

| Name | Description |
|------|-------------|
| `url` | The URL to analyze |

**Returns:** Platform info with embed ID and URL, or null for generic

---

#### `Heading({ config }: { config: { type: "heading"; text: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase" | ....`

Heading component for manifest-driven page titles and section headings.

Resolves FromRef and template-backed text, then renders an `h1`-`h6`
element with Snapshot token-based typography defaults.

---

#### `LinkEmbed({ config }: { config: { type: "link-embed"; url: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase" |...`

LinkEmbed — renders rich URL previews with platform-specific renderers.

Supports YouTube, Instagram, TikTok, Twitter/X iframes, inline GIF
images, and generic Open Graph cards for all other URLs.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the link embed configuration |

---

#### `linkEmbedConfigSchema` *(variable)*

Zod config schema for the LinkEmbed component.

Renders rich URL previews with platform-specific renderers for
YouTube, Instagram, TikTok, Twitter/X, and generic Open Graph cards.
Also supports inline GIF embeds.

**Example:**

```json
{
  "type": "link-embed",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Example:**

```json
{
  "type": "link-embed",
  "url": "https://twitter.com/user/status/123",
  "meta": {
    "title": "Tweet by

---

#### `Markdown({ config }: { config: { type: "markdown"; content: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase"...`

Markdown component — renders markdown content with full GFM support
and syntax highlighting powered by rehype-highlight.

Uses `--sn-*` design tokens for all typography, colors, and spacing.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the markdown configuration |

**Example:**

```json
{
  "type": "markdown",
  "content": "# Welcome\n\nThis is **markdown** with `code`.",
  "maxHeight": "500px"
}
```

---

#### `markdownConfigSchema` *(variable)*

Zod config schema for the Markdown component.

Renders markdown content with full GFM support and syntax highlighting.

**Example:**

```json
{
  "type": "markdown",
  "content": "# Hello\n\nSome **bold** text and a [link](https://example.com)."
}
```

---

#### `RichInput({ config }: { config: { type: "rich-input"; maxLength?: number | undefined; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | ...`

RichInput component — TipTap-based WYSIWYG editor for chat messages,
comments, and posts. Users see formatted text as they type.

Publishes `{ html, text, mentions }` to the page context when content changes.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the rich input configuration |

---

#### `richInputConfigSchema` *(variable)*

Zod config schema for the RichInput component.

A TipTap-based WYSIWYG editor for chat messages, comments, and posts.
Users see formatted text as they type (bold, italic, mentions, etc.)
rather than raw markdown.

**Example:**

```json
{
  "type": "rich-input",
  "id": "chat-input",
  "placeholder": "Type a message...",
  "sendOnEnter": true,
  "features": ["bold", "italic", "mention", "emoji", "code"],
  "sendAction": {
    "type": "api",
    "method": "POST",
    "endpoint": "/api/channels/general/messages",
    "body": { "from": "chat-input" }
  }
}
```

---

#### `RichTextEditor({ config }: { config: { type: "rich-text-editor"; mode?: "split" | "preview" | "edit" | undefined; visible?: boolean | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys"...`

RichTextEditor component — a CodeMirror 6-based markdown editor with
toolbar, preview pane, and split view support.

Fetches initial content from config or via from-ref, publishes the
current markdown content to the page context when the editor has an id.

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Component props containing the editor configuration |

**Example:**

```json
{
  "type": "rich-text-editor",
  "id": "editor",
  "content": "# Hello World",
  "mode": "split",
  "toolbar": ["bold", "italic", "h1", "h2", "separator", "code", "link"]
}
```

---

#### `richTextEditorConfigSchema` *(variable)*

Zod config schema for the RichTextEditor component.

Defines all manifest-settable fields for a CodeMirror 6-based markdown editor
with toolbar, preview pane, and split view support.

**Example:**

```json
{
  "type": "rich-text-editor",
  "id": "content-editor",
  "content": "# Hello\n\nStart writing...",
  "mode": "split",
  "toolbar": ["bold", "italic", "h1", "h2", "separator", "code", "link"]
}
```

---

## Components — Overlay

| Export | Kind | Description |
|---|---|---|
| `CommandPalette` | function | CommandPalette — search-driven command palette that renders static groups or fetches remote results, then dispatches manifest actions for the selected command. |
| `CommandPaletteConfig` | typealias | Inferred config type for the CommandPalette component. |
| `commandPaletteConfigSchema` | variable | Zod config schema for the CommandPalette component. A keyboard-driven overlay that groups commands, supports search with remote endpoints, tracks recent items, and dispatches actions on selection. |
| `ConfirmDialogComponent` | function | Confirmation dialog alias built on top of the modal overlay runtime. |
| `ConfirmDialogConfig` | typealias | Input config type for the ConfirmDialog component. |
| `confirmDialogConfigSchema` | variable | Overlay alias schema for manifest-driven confirmation dialogs. |
| `ContextMenu` | function | Render a right-click context menu backed by the shared context-menu portal runtime. |
| `ContextMenuConfig` | typealias | Inferred config type for the ContextMenu component. |
| `contextMenuConfigSchema` | variable | Zod schema for the ContextMenu component. Defines a right-click menu with styleable trigger, panel, item, label, and separator surfaces. Visibility can be driven by a boolean or a binding reference. |
| `DrawerComponent` | function | Drawer component — renders a slide-in panel from the left or right edge.  Controlled by the modal manager (open-modal/close-modal actions). Content is rendered via ComponentRenderer for recursive composition. Supports FromRef trigger for auto-open behavior. |
| `DrawerConfig` | typealias | Inferred type for drawer config. |
| `drawerConfigSchema` | variable | Zod schema for drawer component config. Drawers are slide-in panels from the left or right edge of the screen. Like modals, they are opened/closed via the modal manager. |
| `ModalComponent` | function | Modal component — renders an overlay dialog with child components.  Controlled by the modal manager (open-modal/close-modal actions). Content is rendered via ComponentRenderer for recursive composition. Supports FromRef trigger for auto-open behavior. |
| `ModalConfig` | typealias | Inferred type for modal config. |
| `modalConfigSchema` | variable | Zod schema for modal component config. Modals are overlay dialogs that display child components. They are opened/closed via the modal manager (open-modal/close-modal actions). |
| `Popover` | function | Floating panel component triggered by a button-like control. Uses the shared floating panel primitive, applies canonical slot styling to trigger and content surfaces, and publishes `{ isOpen }` when an `id` is configured. |
| `PopoverConfig` | typealias | Inferred config type for the Popover component. |
| `popoverConfigSchema` | variable | Zod schema for the Popover component. Defines a trigger-driven floating panel with optional title, description, footer content, width, placement, and canonical slot-based styling for the trigger and panel sub-surfaces. |

### Details

#### `CommandPalette({ config }: { config: { type: "command-palette"; shortcut: string; autoRegisterShortcuts: boolean; background?: string | { size?: "auto" | "cover" | "contain" | undefined; overlay?: string | undefine...`

CommandPalette — search-driven command palette that renders static groups or fetches remote results, then dispatches manifest actions for the selected command.

---

#### `ConfirmDialogComponent({ config, }: { config: { type: "confirm-dialog"; title?: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowe...`

Confirmation dialog alias built on top of the modal overlay runtime.

---

#### `ContextMenu({ config }: { config: { type: "context-menu"; background?: string | { size?: "auto" | "cover" | "contain" | undefined; overlay?: string | undefined; position?: string | undefined; image?: string | un...`

Render a right-click context menu backed by the shared context-menu portal runtime.

---

#### `DrawerComponent({ config }: { config: { type: "drawer"; size: "sm" | "md" | "lg" | "xl" | "full"; content: Record<string, unknown>[]; trapFocus: boolean; returnFocus: boolean; side: "left" | "right"; title?: string ...`

Drawer component — renders a slide-in panel from the left or right edge.

Controlled by the modal manager (open-modal/close-modal actions).
Content is rendered via ComponentRenderer for recursive composition.
Supports FromRef trigger for auto-open behavior.

**Parameters:**

| Name | Description |
|------|-------------|
| `props.config` | - The drawer config from the manifest |

---

#### `ModalComponent({ config }: { config: { type: "modal"; size: "sm" | "md" | "lg" | "xl" | "full"; content: Record<string, unknown>[]; trapFocus: boolean; returnFocus: boolean; title?: string | { from: string; transfo...`

Modal component — renders an overlay dialog with child components.

Controlled by the modal manager (open-modal/close-modal actions).
Content is rendered via ComponentRenderer for recursive composition.
Supports FromRef trigger for auto-open behavior.

**Parameters:**

| Name | Description |
|------|-------------|
| `props.config` | - The modal config from the manifest |

---

#### `Popover({ config }: { config: { type: "popover"; trigger: string | { from: string; transform?: "string" | "number" | "boolean" | "default" | "keys" | "length" | "join" | "values" | "uppercase" | "lowercase" ...`

Floating panel component triggered by a button-like control.

Uses the shared floating panel primitive, applies canonical slot styling to trigger and content
surfaces, and publishes `{ isOpen }` when an `id` is configured.

---

## Components — Navigation

| Export | Kind | Description |
|---|---|---|
| `PrefetchLink` | function | `<PrefetchLink>` — a prefetch primitive that renders a plain `<a>` anchor and automatically injects `<link rel="prefetch">` tags for the matching route's JS chunks and CSS files.  Prefetch is triggered by the `prefetch` config field: - `'hover'`    — prefetch when the user mouses over the link (default) - `'viewport'` — prefetch as soon as the link scrolls into view - `'none'`     — no automatic prefetching  This component renders a plain `<a>` tag and does **not** import TanStack Router's `<Link>`. It is a prefetch primitive — consumers wire their own router. This design avoids a peer dependency on TanStack Router in the component library. |
| `PrefetchLinkConfig` | typealias | The output type of `prefetchLinkSchema` — all fields fully resolved with defaults applied. This is the type received by the component implementation. |
| `prefetchLinkSchema` | variable | Zod schema for `<PrefetchLink>` config.  `<PrefetchLink>` is a prefetch primitive that renders a plain `<a>` tag and automatically injects `<link rel="prefetch">` tags for the route's JS chunks and CSS files when the user hovers over the link or when it enters the viewport.  It is not a router-aware component — consumers wire their own router. This avoids a peer dependency on TanStack Router. |
| `TabConfig` | typealias | Inferred type for a single tab config. |
| `tabConfigSchema` | variable | Schema for a single tab within the tabs component. |
| `TabsComponent` | function | Tabs component — renders a tab bar with content panels.  Each tab's content is rendered via ComponentRenderer for recursive composition. Publishes `{ activeTab, label }` when the component has an id. Lazy-renders tab content: only mounts a tab when first activated, then keeps it mounted. |
| `TabsConfig` | typealias | Inferred type for tabs config. |
| `tabsConfigSchema` | variable | Zod schema for tabs component config. Tabs provide in-page navigation between content panels. Each tab's content is rendered via ComponentRenderer. |

### Details

#### `PrefetchLink({ id, to, prefetch, children, className, style, slots, target, rel, }: { to: string; target?: string | undefined; className?: string | undefined; style?: Record<string, string | number> | undefined; ...`

`<PrefetchLink>` — a prefetch primitive that renders a plain `<a>` anchor and
automatically injects `<link rel="prefetch">` tags for the matching route's JS
chunks and CSS files.

Prefetch is triggered by the `prefetch` config field:
- `'hover'`    — prefetch when the user mouses over the link (default)
- `'viewport'` — prefetch as soon as the link scrolls into view
- `'none'`     — no automatic prefetching

This component renders a plain `<a>` tag and does **not** import TanStack
Router's `<Link>`. It is a prefetch primitive — consumers wire their own router.
This design avoids a peer dependency on TanStack Router in the component library.

**Parameters:**

| Name | Description |
|------|-------------|
| `config` | Config object validated by `prefetchLinkSchema`. |

---

#### `TabsComponent({ config }: { config: { type: "tabs"; variant: "default" | "underline" | "pills"; children: { label: string; content: Record<string, unknown>[]; icon?: string | undefined; disabled?: boolean | undefi...`

Tabs component — renders a tab bar with content panels.

Each tab's content is rendered via ComponentRenderer for recursive composition.
Publishes `{ activeTab, label }` when the component has an id.
Lazy-renders tab content: only mounts a tab when first activated, then keeps it mounted.

**Parameters:**

| Name | Description |
|------|-------------|
| `props.config` | - The tabs config from the manifest |

---

## Components — Layout

| Export | Kind | Description |
|---|---|---|
| `Card` | function | Card layout primitive for grouped content with an optional title block. |
| `Column` | function | Column layout primitive for vertical composition with the same mental model as `row`. |
| `Layout` | function | Layout shell component that wraps page content. Renders one of five layout variants based on the config: - **sidebar**: fixed sidebar (collapsible on mobile) + main content area - **top-nav**: horizontal nav bar + content below - **stacked**: vertical header/sidebar/main/footer sections - **minimal**: centered content, no nav (auth pages, onboarding) - **full-width**: edge-to-edge, no nav (landing pages) |
| `LayoutColumnConfig` | typealias | Inferred config type for the Column layout component. |
| `layoutColumnConfigSchema` | variable | Zod config schema for the Column layout component. Defines a vertical flex container with responsive gap, alignment, justify, overflow, and max-height options. |
| `LayoutConfig` | typealias | Inferred layout config type from the Zod schema. |
| `layoutConfigSchema` | variable | Zod schema for layout component configuration. Defines the layout shell that wraps page content. |
| `LayoutProps` | interface | Props for the Layout component. |
| `LayoutVariant` | typealias | Layout variant type extracted from the schema. |
| `Nav` | function | Grouped navigation component for manifest app shells. Renders either `navigation.items` or a composable nav template, resolves translated labels at render time, applies canonical slot/state styling, and optionally renders logo and user-menu surfaces. |
| `NavConfig` | typealias | Runtime config type for the Nav component. |
| `navConfigSchema` | variable | Zod schema for the grouped Nav component. Supports either `items`-driven navigation or template composition, optional logo and user menu configuration, collapsible sidebar behavior, and canonical slot-based surface styling. |
| `NavItemConfig` | typealias | Runtime config type for a grouped nav item, including optional child items and per-item slots. |
| `Outlet` | function | Layout outlet primitive used to render nested child routes from the compiled manifest route tree. |
| `ResolvedNavItem` | interface | A nav item enriched with computed state: active detection, visibility based on role, and resolved badge value. |
| `useNav` | function | Headless hook for nav component logic. Resolves nav items with active state, role-based visibility, badge resolution from FromRefs, and collapse toggle. |
| `UseNavResult` | interface | Return type of the useNav headless hook. |

### Details

#### `Card({ config }: { config: { type: "card"; children: any[]; title?: string | { env: string; default?: string | undefined; } | { t: string; vars?: Record<string, unknown> | undefined; } | { from: string; t...`

Card layout primitive for grouped content with an optional title block.

---

#### `Column({ config }: { config: { type: "column"; children: any[]; background?: string | { size?: "auto" | "cover" | "contain" | undefined; overlay?: string | undefined; position?: string | undefined; image?: ...`

Column layout primitive for vertical composition with the same mental model
as `row`.

---

#### `Layout({ config, nav, slots, children }: LayoutProps) => Element`

Layout shell component that wraps page content.
Renders one of five layout variants based on the config:
- **sidebar**: fixed sidebar (collapsible on mobile) + main content area
- **top-nav**: horizontal nav bar + content below
- **stacked**: vertical header/sidebar/main/footer sections
- **minimal**: centered content, no nav (auth pages, onboarding)
- **full-width**: edge-to-edge, no nav (landing pages)

**Parameters:**

| Name | Description |
|------|-------------|
| `props` | Layout configuration, optional nav element, and children |

---

#### `Nav({ config, pathname, onNavigate, variant, }: NavComponentProps) => Element`

Grouped navigation component for manifest app shells.

Renders either `navigation.items` or a composable nav template, resolves translated labels at
render time, applies canonical slot/state styling, and optionally renders logo and user-menu
surfaces.

---

#### `Outlet({ config }: { config: { type: "outlet"; background?: string | { size?: "auto" | "cover" | "contain" | undefined; overlay?: string | undefined; position?: string | undefined; image?: string | undefine...`

Layout outlet primitive used to render nested child routes from the compiled
manifest route tree.

---

#### `useNav(config: { type: "nav"; background?: string | { size?: "auto" | "cover" | "contain" | undefined; overlay?: string | undefined; position?: string | undefined; image?: string | undefined; gradient?: { ....`

Headless hook for nav component logic.
Resolves nav items with active state, role-based visibility,
badge resolution from FromRefs, and collapse toggle.

**Parameters:**

| Name | Description |
|------|-------------|
| `config` | Nav component configuration from the manifest |
| `pathname` | Current URL pathname for active route detection |

**Returns:** Resolved nav items, active item, collapse state, and user info

---

## Components — Media

| Export | Kind | Description |
|---|---|---|
| `SnapshotImage` | function | Render a manifest-driven image component with Snapshot styling tokens. |
| `SnapshotImageConfig` | typealias | Inferred config type from the SnapshotImage Zod schema. This is the single source of truth for what props the `<SnapshotImage>` component accepts. Never define this type manually. |
| `snapshotImageSchema` | variable | Schema for optimized image components rendered through Snapshot's image route. |

### Details

#### `SnapshotImage({ config }: { config: { type: "image"; width: number; src: string; placeholder: "blur" | "skeleton" | "empty"; format: "avif" | "webp" | "jpeg" | "png" | "original"; quality: number; priority: boolea...`

Render a manifest-driven image component with Snapshot styling tokens.

---

## Component Utilities

| Export | Kind | Description |
|---|---|---|
| `ComponentDataResult` | interface | Result returned by `useComponentData`. Provides the fetched data, loading/error states, and a refetch function. |
| `useComponentData` | function | Shared data-fetching hook for config-driven components.  Parses a data config string like `"GET /api/stats/revenue"` into method + endpoint, resolves any `FromRef` values in params via `useSubscribe`, and fetches data using the API client from `SnapshotApiContext`.  When the API client is not available (e.g., in tests or before ManifestApp provides it), the hook returns a loading state without throwing. |

### Details

#### `useComponentData(dataConfig: string | FromRef | { resource: string; params?: Record<string, unknown> | undefined; }, params?: Record<string, unknown> | undefined, options?: ComponentDataOptions | undefined) => Compon...`

Shared data-fetching hook for config-driven components.

Parses a data config string like `"GET /api/stats/revenue"` into method + endpoint,
resolves any `FromRef` values in params via `useSubscribe`, and fetches data
using the API client from `SnapshotApiContext`.

When the API client is not available (e.g., in tests or before ManifestApp provides it),
the hook returns a loading state without throwing.

**Parameters:**

| Name | Description |
|------|-------------|
| `dataConfig` | Endpoint string or FromRef. Example: `"GET /api/stats/revenue"` |
| `params` | Optional query parameters, may contain FromRef values |

**Returns:** Data, loading state, error, and refetch function

---

## Page Presets

| Export | Kind | Description |
|---|---|---|
| `ActivityFeedDef` | interface | Feed section definition for dashboard-style presets. |
| `AuthBrandingDef` | interface | Branding and background options for the auth page preset. |
| `authPage` | function | Build a manifest page config for a common auth screen. |
| `AuthPageOptions` | interface | Options for the `authPage` preset factory. |
| `authPresetConfigSchema` | variable | Validate preset config for auth screens such as login, register, and password recovery. |
| `ChartDef` | interface | Chart section definition for dashboard-style presets. |
| `ColumnDef` | interface | A single column definition for the CRUD page table. |
| `crudPage` | function | Builds a manifest `PageConfig` for a standard CRUD page.  Consumers drop the result into their manifest's `pages` record:  ```ts const manifest = {   pages: {     "/users": crudPage({       title: "Users",       listEndpoint: "GET /api/users",       createEndpoint: "POST /api/users",       deleteEndpoint: "DELETE /api/users/{id}",       columns: [         { key: "name", label: "Name" },         { key: "email", label: "Email" },         { key: "role", label: "Role", badge: true },       ],       createForm: {         fields: [           { key: "name", type: "text", label: "Name", required: true },           { key: "email", type: "email", label: "Email", required: true },         ],       },     }),   }, }; ``` |
| `CrudPageOptions` | interface | Options for the `crudPage` preset factory. Produces a full CRUD page with a data table, create/edit modals, and row actions. |
| `crudPresetConfigSchema` | variable | Validate preset config for a CRUD page assembled from list/form primitives. |
| `dashboardPage` | function | Builds a manifest `PageConfig` for a dashboard page.  Consumers drop the result into their manifest's `pages` record:  ```ts const manifest = {   pages: {     "/dashboard": dashboardPage({       title: "Overview",       stats: [         { label: "Total Users", endpoint: "GET /api/stats/users", valueKey: "count" },         { label: "Revenue", endpoint: "GET /api/stats/revenue", valueKey: "total", format: "currency" },         { label: "Orders", endpoint: "GET /api/stats/orders", valueKey: "total", format: "number" },         { label: "Conversion", endpoint: "GET /api/stats/conversion", valueKey: "rate", format: "percent" },       ],       recentActivity: "GET /api/activity",     }),   }, }; ``` |
| `DashboardPageOptions` | interface | Options for the `dashboardPage` preset factory. Produces a dashboard with stat cards and an optional activity feed. |
| `dashboardPresetConfigSchema` | variable | Validate preset config for a dashboard page with stats, charts, and activity sections. |
| `EmptyStateDef` | interface | Empty-state content shown by preset-generated pages. |
| `expandPreset` | function | Validate a named preset config and expand it into the equivalent page config. |
| `FilterDef` | interface | A filter definition for the CRUD page toolbar. |
| `FilterOption` | interface | A filter option entry. |
| `FormDef` | interface | A form definition used in CRUD create/update modals and settings tabs. |
| `FormFieldDef` | interface | A single form field definition. |
| `FormFieldOption` | interface | An option entry for select/radio form fields. |
| `PaginationDef` | interface | Pagination settings for preset-generated list surfaces. |
| `settingsPage` | function | Builds a manifest `PageConfig` for a settings page.  Consumers drop the result into their manifest's `pages` record:  ```ts const manifest = {   pages: {     "/settings": settingsPage({       title: "Settings",       sections: [         {           label: "Profile",           submitEndpoint: "PATCH /api/me/profile",           dataEndpoint: "GET /api/me/profile",           fields: [             { key: "name", type: "text", label: "Name", required: true },             { key: "bio", type: "textarea", label: "Bio" },           ],         },         {           label: "Password",           submitEndpoint: "POST /api/me/password",           fields: [             { key: "currentPassword", type: "password", label: "Current Password", required: true },             { key: "newPassword", type: "password", label: "New Password", required: true },           ],         },       ],     }),   }, }; ``` |
| `SettingsPageOptions` | interface | Options for the `settingsPage` preset factory. Produces a settings page with a tab per section, each containing an AutoForm. |
| `settingsPresetConfigSchema` | variable | Validate preset config for a settings page composed from one or more submitted sections. |
| `SettingsSectionDef` | interface | A single settings section (one tab in the settings page). |
| `StatDef` | interface | A single stat card definition for the dashboard page. |

### Details

#### `authPage(options: AuthPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; breadcrumb?: string | undefined; }`

Build a manifest page config for a common auth screen.

---

#### `crudPage(options: CrudPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; breadcrumb?: string | undefined; }`

Builds a manifest `PageConfig` for a standard CRUD page.

Consumers drop the result into their manifest's `pages` record:

```ts
const manifest = {
  pages: {
    "/users": crudPage({
      title: "Users",
      listEndpoint: "GET /api/users",
      createEndpoint: "POST /api/users",
      deleteEndpoint: "DELETE /api/users/{id}",
      columns: [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role", badge: true },
      ],
      createForm: {
        fields: [
          { key: "name", type: "text", label: "Name", required: true },
          { key: "email", type: "email", label: "Email", required: true },
        ],
      },
    }),
  },
};
```

**Parameters:**

| Name | Description |
|------|-------------|
| `options` | High-level CRUD page options |

**Returns:** A valid manifest `PageConfig`

---

#### `CrudPageOptions` *(interface)*

Options for the `crudPage` preset factory.

Produces a full CRUD page with a data table, create/edit modals, and row actions.

**Example:**

```ts
const usersPage = crudPage({
  title: "Users",
  listEndpoint: "GET /api/users",
  createEndpoint: "POST /api/users",
  deleteEndpoint: "DELETE /api/users/{id}",
  columns: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", badge: true },
  ],
});
```

---

#### `dashboardPage(options: DashboardPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; breadcrumb?: string | undefined; }`

Builds a manifest `PageConfig` for a dashboard page.

Consumers drop the result into their manifest's `pages` record:

```ts
const manifest = {
  pages: {
    "/dashboard": dashboardPage({
      title: "Overview",
      stats: [
        { label: "Total Users", endpoint: "GET /api/stats/users", valueKey: "count" },
        { label: "Revenue", endpoint: "GET /api/stats/revenue", valueKey: "total", format: "currency" },
        { label: "Orders", endpoint: "GET /api/stats/orders", valueKey: "total", format: "number" },
        { label: "Conversion", endpoint: "GET /api/stats/conversion", valueKey: "rate", format: "percent" },
      ],
      recentActivity: "GET /api/activity",
    }),
  },
};
```

**Parameters:**

| Name | Description |
|------|-------------|
| `options` | High-level dashboard page options |

**Returns:** A valid manifest `PageConfig`

---

#### `DashboardPageOptions` *(interface)*

Options for the `dashboardPage` preset factory.

Produces a dashboard with stat cards and an optional activity feed.

**Example:**

```ts
const myDashboard = dashboardPage({
  title: "Overview",
  stats: [
    { label: "Total Users", endpoint: "GET /api/stats/users", valueKey: "count" },
    { label: "Revenue", endpoint: "GET /api/stats/revenue", valueKey: "total", format: "currency" },
  ],
});
```

---

#### `expandPreset(preset: string, presetConfig: unknown) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; breadcrumb?: string | undefined; }`

Validate a named preset config and expand it into the equivalent page config.

---

#### `settingsPage(options: SettingsPageOptions) => { content: any[]; title?: string | undefined; roles?: string[] | undefined; breadcrumb?: string | undefined; }`

Builds a manifest `PageConfig` for a settings page.

Consumers drop the result into their manifest's `pages` record:

```ts
const manifest = {
  pages: {
    "/settings": settingsPage({
      title: "Settings",
      sections: [
        {
          label: "Profile",
          submitEndpoint: "PATCH /api/me/profile",
          dataEndpoint: "GET /api/me/profile",
          fields: [
            { key: "name", type: "text", label: "Name", required: true },
            { key: "bio", type: "textarea", label: "Bio" },
          ],
        },
        {
          label: "Password",
          submitEndpoint: "POST /api/me/password",
          fields: [
            { key: "currentPassword", type: "password", label: "Current Password", required: true },
            { key: "newPassword", type: "password", label: "New Password", required: true },
          ],
        },
      ],
    }),
  },
};
```

**Parameters:**

| Name | Description |
|------|-------------|
| `options` | High-level settings page options |

**Returns:** A valid manifest `PageConfig`

---

#### `SettingsPageOptions` *(interface)*

Options for the `settingsPage` preset factory.

Produces a settings page with a tab per section, each containing an AutoForm.

**Example:**

```ts
const mySettings = settingsPage({
  title: "Settings",
  sections: [
    {
      label: "Profile",
      submitEndpoint: "PATCH /api/me/profile",
      fields: [
        { key: "name", type: "text", label: "Name", required: true },
        { key: "email", type: "email", label: "Email", required: true },
      ],
    },
  ],
});
```

---

## Hooks & Utilities

| Export | Kind | Description |
|---|---|---|
| `Breakpoint` | typealias | All breakpoint names including `"default"` (below `sm`). |
| `getSortableStyle` | function | CSS transform helper for sortable items. Converts the dnd-kit transform into a CSS transform string. |
| `resolveResponsiveValue` | function | Resolve a responsive value for a given breakpoint. Cascades down: if the active breakpoint isn't defined, falls back to the next smaller breakpoint, then `default`. For flat (non-object) values, returns the value directly. |
| `UI_BREAKPOINTS` | variable | Breakpoint pixel thresholds (mobile-first, min-width). |
| `useAutoBreadcrumbs` | function | Resolve auto-generated breadcrumb items for the current route match. |
| `useBreakpoint` | function | Returns the currently active breakpoint based on window width. Uses `matchMedia` for efficient, event-driven updates (no resize polling). Returns `"default"` during SSR. |
| `useDndSensors` | function | Pre-configured sensor setup for pointer + keyboard DnD. Pointer requires 5px distance to activate (prevents click hijacking). Keyboard uses standard coordinates for arrow key navigation. |
| `useInfiniteScroll` | function | Observe a sentinel element and load the next page when it enters the viewport. |
| `UseInfiniteScrollOptions` | interface | Options for loading additional items when a sentinel approaches the viewport. |
| `usePoll` | function | Invoke a callback on an interval with optional document-visibility pausing. |
| `UsePollOptions` | interface | Options controlling interval-based polling from client components. |
| `useResponsiveValue` | function | Resolve a responsive value to the appropriate value for the current breakpoint. Accepts either a flat value (returned as-is) or a responsive map with breakpoint keys. Falls back to the next smaller defined breakpoint. |
| `useUrlSync` | function | Keep a slice of local state synchronized with URL query parameters. |
| `useVirtualList` | function | Compute the visible slice for a fixed-height virtualized list container. |

### Details

#### `getSortableStyle(transform: Transform | null, transition: string | undefined, isDragging: boolean) => CSSProperties`

CSS transform helper for sortable items.
Converts the dnd-kit transform into a CSS transform string.

---

#### `resolveResponsiveValue<T>(value: T | { default: T; sm?: T | undefined; md?: T | undefined; lg?: T | undefined; xl?: T | undefined; "2xl"?: T | undefined; }, breakpoint: Breakpoint) => T`

Resolve a responsive value for a given breakpoint.

Cascades down: if the active breakpoint isn't defined, falls back to the
next smaller breakpoint, then `default`. For flat (non-object) values,
returns the value directly.

**Parameters:**

| Name | Description |
|------|-------------|
| `value` | A flat value or a responsive breakpoint map |
| `breakpoint` | The active breakpoint to resolve for |

**Returns:** The resolved value for the given breakpoint

---

#### `useAutoBreadcrumbs(config?: BreadcrumbAutoConfig | undefined) => BreadcrumbItem[]`

Resolve auto-generated breadcrumb items for the current route match.

---

#### `useBreakpoint() => Breakpoint`

Returns the currently active breakpoint based on window width.

Uses `matchMedia` for efficient, event-driven updates (no resize polling).
Returns `"default"` during SSR.

---

#### `useDndSensors() => SensorDescriptor<SensorOptions>[]`

Pre-configured sensor setup for pointer + keyboard DnD.
Pointer requires 5px distance to activate (prevents click hijacking).
Keyboard uses standard coordinates for arrow key navigation.

---

#### `useInfiniteScroll({ hasNextPage, isLoading, loadNextPage, threshold, }: UseInfiniteScrollOptions) => RefObject<HTMLDivElement | null>`

Observe a sentinel element and load the next page when it enters the viewport.

---

#### `usePoll({ interval, pauseWhenHidden, onPoll, enabled, }: UsePollOptions) => void`

Invoke a callback on an interval with optional document-visibility pausing.

---

#### `useResponsiveValue<T>(value: T | { default: T; sm?: T | undefined; md?: T | undefined; lg?: T | undefined; xl?: T | undefined; "2xl"?: T | undefined; }) => T`

Resolve a responsive value to the appropriate value for the current breakpoint.

Accepts either a flat value (returned as-is) or a responsive map with
breakpoint keys. Falls back to the next smaller defined breakpoint.

**Parameters:**

| Name | Description |
|------|-------------|
| `value` | A flat value or responsive breakpoint map |

**Returns:** The resolved value for the current viewport width

---

#### `useUrlSync(options: UseUrlSyncOptions) => void`

Keep a slice of local state synchronized with URL query parameters.

---

#### `useVirtualList({ totalCount, itemHeight, overscan, }: UseVirtualListOptions) => UseVirtualListResult`

Compute the visible slice for a fixed-height virtualized list container.

---

## Icons

| Export | Kind | Description |
|---|---|---|
| `Icon` | function | Render a Snapshot icon from the built-in icon registry. |
| `ICON_PATHS` | variable | SVG inner content for Lucide icons. Each entry maps a kebab-case icon name to the SVG child elements (path, circle, line, rect, polyline, etc.) that belong inside a 24x24 `stroke="currentColor"` SVG container. Source: https://lucide.dev — MIT-licensed. |
| `IconProps` | interface | Props for the {@link Icon} component. |

### Details

#### `Icon({ name, size, color, className, label, }: IconProps) => Element`

Render a Snapshot icon from the built-in icon registry.

---

## Workflows

| Export | Kind | Description |
|---|---|---|
| `AssignWorkflowNode` | interface | Write values into the workflow execution context. |
| `CaptureWorkflowNode` | interface | Execute an action and capture its result into the workflow context. |
| `getRegisteredWorkflowAction` | function | Retrieve a registered runtime handler for a custom workflow action type. |
| `IfWorkflowNode` | interface | Branch workflow execution based on a condition. |
| `ParallelWorkflowNode` | interface | Run multiple workflow definitions in parallel. |
| `registerWorkflowAction` | function | Register a runtime handler for a custom workflow action type. |
| `RetryWorkflowNode` | interface | Retry a workflow definition with optional delay and backoff. |
| `runWorkflow` | function | Execute a workflow definition against the supplied runtime hooks and mutable context. |
| `TryWorkflowNode` | interface | Execute a workflow definition with optional catch and finally handlers. |
| `WaitWorkflowNode` | interface | Pause workflow execution for a duration in milliseconds. |
| `WorkflowActionHandler` | typealias | Handler signature for registered custom workflow actions. |
| `WorkflowCondition` | interface | Simple conditional expression used by workflow nodes. |
| `WorkflowConditionOperator` | typealias | Supported condition operators for manifest workflows. |
| `workflowConditionSchema` | variable | Schema for conditional expressions used by workflow control-flow nodes. |
| `WorkflowDefinition` | typealias | A single workflow node or a sequential list of nodes. |
| `workflowDefinitionSchema` | variable | Schema for a workflow definition expressed as one node or a sequential node list. |
| `WorkflowMap` | typealias | Named workflow map keyed by workflow id. |
| `WorkflowNode` | typealias | Any node that can appear inside a workflow definition. |
| `workflowNodeSchema` | variable | Recursive schema describing every built-in workflow node and action node shape. |

### Details

#### `getRegisteredWorkflowAction(type: string) => WorkflowActionHandler | undefined`

Retrieve a registered runtime handler for a custom workflow action type.

**Parameters:**

| Name | Description |
|------|-------------|
| `type` | Custom workflow action type name |

**Returns:** The registered handler when available

---

#### `registerWorkflowAction(type: string, handler: WorkflowActionHandler) => void`

Register a runtime handler for a custom workflow action type.

**Parameters:**

| Name | Description |
|------|-------------|
| `type` | Custom workflow action type name |
| `handler` | Runtime handler invoked by the workflow engine |

---

#### `runWorkflow(definition: WorkflowDefinition, options: { workflows?: WorkflowMap | undefined; context?: Record<string, unknown> | undefined; resolveValue: (value: unknown, context: Record<...>) => unknown; execute...`

Execute a workflow definition against the supplied runtime hooks and mutable context.

---

## Other

| Export | Kind | Description |
|---|---|---|
| `getRegisteredLayouts` | function | List the names of all currently registered manifest layouts. |
| `registerBuiltInComponents` | function | Register all built-in config-driven components with the manifest system. The function is idempotent so boot code can call it safely without worrying about duplicate registrations. |
| `registerLayout` | function | Register a named layout component for manifest layout resolution. |
| `resetBuiltInComponentRegistration` | function | Reset the built-in component registration guard so tests can rebuild the registry. |
| `resolveLayout` | function | Resolve a previously registered layout by name. |

### Details

#### `getRegisteredLayouts() => string[]`

List the names of all currently registered manifest layouts.

---

#### `registerBuiltInComponents(force?: boolean) => void`

Register all built-in config-driven components with the manifest system.

The function is idempotent so boot code can call it safely without worrying
about duplicate registrations.

---

#### `registerLayout(name: string, layout: RegisteredLayout) => void`

Register a named layout component for manifest layout resolution.

---

#### `resetBuiltInComponentRegistration() => void`

Reset the built-in component registration guard so tests can rebuild the registry.

---

#### `resolveLayout(name: string) => RegisteredLayout | undefined`

Resolve a previously registered layout by name.

---
