'use client';

import { registerComponent, getRegisteredComponent } from "./component-registry";
import { registerComponentSchema, buttonConfigSchema } from "./schema";

type ModuleRecord = Record<string, unknown>;
type ModuleLoader = () => Promise<ModuleRecord>;

const loadedTypes = new Set<string>();
let loadedAllBuiltIns = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function registerFromModule(
  type: string,
  loadModule: ModuleLoader,
  componentExport: string,
  schemaExport: string,
): Promise<void> {
  const module = await loadModule();
  const component = module[componentExport];
  const schema = module[schemaExport];

  if (typeof component === "function") {
    registerComponent(type, component as Parameters<typeof registerComponent>[1]);
  }
  if (schema && isRecord(schema)) {
    registerComponentSchema(type, schema as unknown as Parameters<typeof registerComponentSchema>[1]);
  }
}

async function registerFromSplitModules(
  type: string,
  loadComponentModule: ModuleLoader,
  componentExport: string,
  loadSchemaModule: ModuleLoader,
  schemaExport: string,
): Promise<void> {
  const [componentModule, schemaModule] = await Promise.all([
    loadComponentModule(),
    loadSchemaModule(),
  ]);
  const component = componentModule[componentExport];
  const schema = schemaModule[schemaExport];

  if (typeof component === "function") {
    registerComponent(type, component as Parameters<typeof registerComponent>[1]);
  }
  if (schema && isRecord(schema)) {
    registerComponentSchema(type, schema as unknown as Parameters<typeof registerComponentSchema>[1]);
  }
}

async function loadAllBuiltIns(): Promise<void> {
  if (loadedAllBuiltIns) {
    return;
  }

  const registerModule = await import("../components/register");
  registerModule.registerBuiltInComponents();
  loadedAllBuiltIns = true;
}

const COMPONENT_LOADERS: Record<string, () => Promise<void>> = {
  "stat-card": () =>
    registerFromModule(
      "stat-card",
      () => import("../components/data/stat-card/index"),
      "StatCard",
      "statCardConfigSchema",
    ),
  "data-table": () =>
    registerFromSplitModules(
      "data-table",
      () => import("../components/data/data-table/index"),
      "DataTable",
      () => import("../components/data/data-table/schema"),
      "dataTableConfigSchema",
    ),
  form: async () => {
    await registerFromSplitModules(
      "form",
      () => import("../components/forms/auto-form/index"),
      "AutoForm",
      () => import("../components/forms/auto-form/schema"),
      "autoFormConfigSchema",
    );
    registerComponent(
      "auto-form",
      getRegisteredComponent("form") as Parameters<typeof registerComponent>[1],
    );
    const schemaModule = await import("../components/forms/auto-form/schema");
    registerComponentSchema("auto-form", schemaModule.autoFormConfigSchema);
    loadedTypes.add("auto-form");
  },
  stack: () =>
    registerFromModule(
      "stack",
      () => import("../components/primitives/stack"),
      "Stack",
      "stackConfigSchema",
    ),
  heading: () =>
    registerFromModule(
      "heading",
      () => import("../components/content/heading/index"),
      "Heading",
      "headingConfigSchema",
    ),
  text: () =>
    registerFromModule(
      "text",
      () => import("../components/primitives/text"),
      "Text",
      "textConfigSchema",
    ),
  code: () =>
    registerFromModule(
      "code",
      () => import("../components/content/code/index"),
      "Code",
      "codeConfigSchema",
    ),
  link: () =>
    registerFromModule(
      "link",
      () => import("../components/primitives/link"),
      "Link",
      "linkConfigSchema",
    ),
  divider: () =>
    registerFromModule(
      "divider",
      () => import("../components/primitives/divider"),
      "Divider",
      "dividerConfigSchema",
    ),
  "floating-menu": () =>
    registerFromModule(
      "floating-menu",
      () => import("../components/primitives/floating-menu"),
      "FloatingMenu",
      "floatingMenuConfigSchema",
    ),
  "oauth-buttons": () =>
    registerFromModule(
      "oauth-buttons",
      () => import("../components/primitives/oauth-buttons"),
      "OAuthButtons",
      "oauthButtonsConfigSchema",
    ),
  "passkey-button": () =>
    registerFromModule(
      "passkey-button",
      () => import("../components/primitives/passkey-button"),
      "PasskeyButton",
      "passkeyButtonConfigSchema",
    ),
  button: async () => {
    const module = await import("../components/forms/button/index");
    registerComponent("button", module.Button as Parameters<typeof registerComponent>[1]);
    registerComponentSchema("button", buttonConfigSchema);
  },
  "detail-card": () =>
    registerFromSplitModules(
      "detail-card",
      () => import("../components/data/detail-card/index"),
      "DetailCard",
      () => import("../components/data/detail-card/schema"),
      "detailCardConfigSchema",
    ),
  modal: () =>
    registerFromModule(
      "modal",
      () => import("../components/overlay/modal"),
      "ModalComponent",
      "modalConfigSchema",
    ),
  drawer: () =>
    registerFromModule(
      "drawer",
      () => import("../components/overlay/drawer"),
      "DrawerComponent",
      "drawerConfigSchema",
    ),
  tabs: () =>
    registerFromModule(
      "tabs",
      () => import("../components/navigation/tabs"),
      "TabsComponent",
      "tabsConfigSchema",
    ),
  badge: () =>
    registerFromModule(
      "badge",
      () => import("../components/data/badge/index"),
      "Badge",
      "badgeConfigSchema",
    ),
  avatar: () =>
    registerFromModule(
      "avatar",
      () => import("../components/data/avatar/index"),
      "Avatar",
      "avatarConfigSchema",
    ),
  alert: () =>
    registerFromModule(
      "alert",
      () => import("../components/data/alert/index"),
      "Alert",
      "alertConfigSchema",
    ),
  progress: () =>
    registerFromModule(
      "progress",
      () => import("../components/data/progress/index"),
      "Progress",
      "progressConfigSchema",
    ),
  skeleton: () =>
    registerFromModule(
      "skeleton",
      () => import("../components/data/skeleton/index"),
      "Skeleton",
      "skeletonConfigSchema",
    ),
  switch: () =>
    registerFromModule(
      "switch",
      () => import("../components/forms/switch/index"),
      "Switch",
      "switchConfigSchema",
    ),
  "empty-state": () =>
    registerFromModule(
      "empty-state",
      () => import("../components/data/empty-state/index"),
      "EmptyState",
      "emptyStateConfigSchema",
    ),
  accordion: () =>
    registerFromModule(
      "accordion",
      () => import("../components/navigation/accordion/index"),
      "AccordionComponent",
      "accordionConfigSchema",
    ),
  breadcrumb: () =>
    registerFromModule(
      "breadcrumb",
      () => import("../components/navigation/breadcrumb/index"),
      "BreadcrumbComponent",
      "breadcrumbConfigSchema",
    ),
  list: () =>
    registerFromModule(
      "list",
      () => import("../components/data/list/index"),
      "ListComponent",
      "listConfigSchema",
    ),
  tooltip: () =>
    registerFromModule(
      "tooltip",
      () => import("../components/data/tooltip/index"),
      "TooltipComponent",
      "tooltipConfigSchema",
    ),
  timeline: () =>
    registerFromModule(
      "timeline",
      () => import("../components/content/timeline/index"),
      "Timeline",
      "timelineConfigSchema",
    ),
  "code-block": () =>
    registerFromModule(
      "code-block",
      () => import("../components/content/code-block/index"),
      "CodeBlock",
      "codeBlockConfigSchema",
    ),
  stepper: () =>
    registerFromModule(
      "stepper",
      () => import("../components/navigation/stepper/index"),
      "Stepper",
      "stepperConfigSchema",
    ),
  "tree-view": () =>
    registerFromModule(
      "tree-view",
      () => import("../components/navigation/tree-view/index"),
      "TreeView",
      "treeViewConfigSchema",
    ),
  kanban: () =>
    registerFromModule(
      "kanban",
      () => import("../components/workflow/kanban/index"),
      "Kanban",
      "kanbanConfigSchema",
    ),
  calendar: () =>
    registerFromModule(
      "calendar",
      () => import("../components/workflow/calendar/index"),
      "Calendar",
      "calendarConfigSchema",
    ),
  "audit-log": () =>
    registerFromModule(
      "audit-log",
      () => import("../components/workflow/audit-log/index"),
      "AuditLog",
      "auditLogConfigSchema",
    ),
  "notification-feed": () =>
    registerFromModule(
      "notification-feed",
      () => import("../components/workflow/notification-feed/index"),
      "NotificationFeed",
      "notificationFeedConfigSchema",
    ),
  "dropdown-menu": () =>
    registerFromModule(
      "dropdown-menu",
      () => import("../components/overlay/dropdown-menu/index"),
      "DropdownMenu",
      "dropdownMenuConfigSchema",
    ),
  "pricing-table": () =>
    registerFromModule(
      "pricing-table",
      () => import("../components/commerce/pricing-table/index"),
      "PricingTable",
      "pricingTableConfigSchema",
    ),
  "file-uploader": () =>
    registerFromModule(
      "file-uploader",
      () => import("../components/content/file-uploader/index"),
      "FileUploader",
      "fileUploaderConfigSchema",
    ),
  "rich-text-editor": () =>
    registerFromModule(
      "rich-text-editor",
      () => import("../components/content/rich-text-editor/index"),
      "RichTextEditor",
      "richTextEditorConfigSchema",
    ),
  "rich-input": () =>
    registerFromModule(
      "rich-input",
      () => import("../components/content/rich-input/index"),
      "RichInput",
      "richInputConfigSchema",
    ),
  "emoji-picker": () =>
    registerFromModule(
      "emoji-picker",
      () => import("../components/communication/emoji-picker/index"),
      "EmojiPicker",
      "emojiPickerConfigSchema",
    ),
  "reaction-bar": () =>
    registerFromModule(
      "reaction-bar",
      () => import("../components/communication/reaction-bar/index"),
      "ReactionBar",
      "reactionBarConfigSchema",
    ),
  "presence-indicator": () =>
    registerFromModule(
      "presence-indicator",
      () => import("../components/communication/presence-indicator/index"),
      "PresenceIndicator",
      "presenceIndicatorConfigSchema",
    ),
  "typing-indicator": () =>
    registerFromModule(
      "typing-indicator",
      () => import("../components/communication/typing-indicator/index"),
      "TypingIndicator",
      "typingIndicatorConfigSchema",
    ),
  "message-thread": () =>
    registerFromModule(
      "message-thread",
      () => import("../components/communication/message-thread/index"),
      "MessageThread",
      "messageThreadConfigSchema",
    ),
  "comment-section": () =>
    registerFromModule(
      "comment-section",
      () => import("../components/communication/comment-section/index"),
      "CommentSection",
      "commentSectionConfigSchema",
    ),
  "chat-window": () =>
    registerFromModule(
      "chat-window",
      () => import("../components/communication/chat-window/index"),
      "ChatWindow",
      "chatWindowConfigSchema",
    ),
  popover: () =>
    registerFromModule(
      "popover",
      () => import("../components/overlay/popover/index"),
      "Popover",
      "popoverConfigSchema",
    ),
  "hover-card": () =>
    registerFromModule(
      "hover-card",
      () => import("../components/overlay/hover-card/index"),
      "HoverCard",
      "hoverCardConfigSchema",
    ),
  separator: () =>
    registerFromModule(
      "separator",
      () => import("../components/data/separator/index"),
      "Separator",
      "separatorConfigSchema",
    ),
  "command-palette": () =>
    registerFromModule(
      "command-palette",
      () => import("../components/overlay/command-palette/index"),
      "CommandPalette",
      "commandPaletteConfigSchema",
    ),
  input: () =>
    registerFromModule(
      "input",
      () => import("../components/forms/input/index"),
      "Input",
      "inputConfigSchema",
    ),
  select: () =>
    registerFromModule(
      "select",
      () => import("../components/forms/select/index"),
      "Select",
      "selectConfigSchema",
    ),
  "date-picker": () =>
    registerFromModule(
      "date-picker",
      () => import("../components/forms/date-picker"),
      "DatePicker",
      "datePickerConfigSchema",
    ),
  slider: () =>
    registerFromModule(
      "slider",
      () => import("../components/forms/slider"),
      "Slider",
      "sliderConfigSchema",
    ),
  "color-picker": () =>
    registerFromModule(
      "color-picker",
      () => import("../components/forms/color-picker"),
      "ColorPicker",
      "colorPickerConfigSchema",
    ),
  "icon-button": () =>
    registerFromModule(
      "icon-button",
      () => import("../components/forms/icon-button/index"),
      "IconButton",
      "iconButtonConfigSchema",
    ),
  textarea: () =>
    registerFromModule(
      "textarea",
      () => import("../components/forms/textarea/index"),
      "Textarea",
      "textareaConfigSchema",
    ),
  toggle: () =>
    registerFromModule(
      "toggle",
      () => import("../components/forms/toggle/index"),
      "Toggle",
      "toggleConfigSchema",
    ),
  "toggle-group": () =>
    registerFromModule(
      "toggle-group",
      () => import("../components/forms/toggle-group/index"),
      "ToggleGroup",
      "toggleGroupConfigSchema",
    ),
  "multi-select": () =>
    registerFromModule(
      "multi-select",
      () => import("../components/forms/multi-select/index"),
      "MultiSelect",
      "multiSelectConfigSchema",
    ),
  "context-menu": () =>
    registerFromModule(
      "context-menu",
      () => import("../components/overlay/context-menu/index"),
      "ContextMenu",
      "contextMenuConfigSchema",
    ),
  "scroll-area": () =>
    registerFromModule(
      "scroll-area",
      () => import("../components/data/scroll-area/index"),
      "ScrollArea",
      "scrollAreaConfigSchema",
    ),
  "filter-bar": () =>
    registerFromModule(
      "filter-bar",
      () => import("../components/data/filter-bar/index"),
      "FilterBar",
      "filterBarConfigSchema",
    ),
  "inline-edit": () =>
    registerFromModule(
      "inline-edit",
      () => import("../components/forms/inline-edit/index"),
      "InlineEdit",
      "inlineEditConfigSchema",
    ),
  markdown: () =>
    registerFromModule(
      "markdown",
      () => import("../components/content/markdown/index"),
      "Markdown",
      "markdownConfigSchema",
    ),
  "tag-selector": () =>
    registerFromModule(
      "tag-selector",
      () => import("../components/forms/tag-selector/index"),
      "TagSelector",
      "tagSelectorConfigSchema",
    ),
  "entity-picker": () =>
    registerFromModule(
      "entity-picker",
      () => import("../components/data/entity-picker/index"),
      "EntityPicker",
      "entityPickerConfigSchema",
    ),
  "highlighted-text": () =>
    registerFromModule(
      "highlighted-text",
      () => import("../components/data/highlighted-text/index"),
      "HighlightedText",
      "highlightedTextConfigSchema",
    ),
  "favorite-button": () =>
    registerFromModule(
      "favorite-button",
      () => import("../components/data/favorite-button/index"),
      "FavoriteButton",
      "favoriteButtonConfigSchema",
    ),
  "notification-bell": () =>
    registerFromModule(
      "notification-bell",
      () => import("../components/data/notification-bell/index"),
      "NotificationBell",
      "notificationBellConfigSchema",
    ),
  "save-indicator": () =>
    registerFromModule(
      "save-indicator",
      () => import("../components/data/save-indicator/index"),
      "SaveIndicator",
      "saveIndicatorConfigSchema",
    ),
  "compare-view": () =>
    registerFromModule(
      "compare-view",
      () => import("../components/content/compare-view/index"),
      "CompareView",
      "compareViewConfigSchema",
    ),
  "quick-add": () =>
    registerFromModule(
      "quick-add",
      () => import("../components/forms/quick-add/index"),
      "QuickAdd",
      "quickAddConfigSchema",
    ),
  "location-input": () =>
    registerFromModule(
      "location-input",
      () => import("../components/forms/location-input/index"),
      "LocationInput",
      "locationInputConfigSchema",
    ),
  "avatar-group": () =>
    registerFromModule(
      "avatar-group",
      () => import("../components/data/avatar-group/index"),
      "AvatarGroup",
      "avatarGroupConfigSchema",
    ),
  "link-embed": () =>
    registerFromModule(
      "link-embed",
      () => import("../components/content/link-embed/index"),
      "LinkEmbed",
      "linkEmbedConfigSchema",
    ),
  "gif-picker": () =>
    registerFromModule(
      "gif-picker",
      () => import("../components/communication/gif-picker/index"),
      "GifPicker",
      "gifPickerConfigSchema",
    ),
  feed: () =>
    registerFromModule(
      "feed",
      () => import("../components/data/feed/index"),
      "Feed",
      "feedSchema",
    ),
  chart: () =>
    registerFromModule(
      "chart",
      () => import("../components/data/chart/index"),
      "Chart",
      "chartSchema",
    ),
  wizard: () =>
    registerFromModule(
      "wizard",
      () => import("../components/forms/wizard/index"),
      "Wizard",
      "wizardSchema",
    ),
  spinner: () =>
    registerFromModule(
      "spinner",
      () => import("../components/feedback/default-loading"),
      "DefaultLoading",
      "spinnerConfigSchema",
    ),
  "error-page": () =>
    registerFromModule(
      "error-page",
      () => import("../components/feedback/default-error"),
      "DefaultError",
      "errorPageConfigSchema",
    ),
  "not-found": () =>
    registerFromModule(
      "not-found",
      () => import("../components/feedback/default-not-found"),
      "DefaultNotFound",
      "notFoundConfigSchema",
    ),
  "offline-banner": () =>
    registerFromModule(
      "offline-banner",
      () => import("../components/feedback/default-offline"),
      "DefaultOffline",
      "offlineBannerConfigSchema",
    ),
  carousel: () =>
    registerFromModule(
      "carousel",
      () => import("../components/media/carousel/index"),
      "Carousel",
      "carouselConfigSchema",
    ),
  image: () =>
    registerFromModule(
      "image",
      () => import("../components/media/image"),
      "SnapshotImage",
      "snapshotImageSchema",
    ),
  video: () =>
    registerFromSplitModules(
      "video",
      () => import("../components/media/video/index"),
      "Video",
      () => import("../components/media/video/schema"),
      "videoConfigSchema",
    ),
  embed: () =>
    registerFromSplitModules(
      "embed",
      () => import("../components/media/embed/index"),
      "Embed",
      () => import("../components/media/embed/schema"),
      "embedConfigSchema",
    ),
  vote: () =>
    registerFromSplitModules(
      "vote",
      () => import("../components/data/vote/index"),
      "Vote",
      () => import("../components/data/vote/schema"),
      "voteConfigSchema",
    ),
  banner: () =>
    registerFromSplitModules(
      "banner",
      () => import("../components/content/banner/index"),
      "Banner",
      () => import("../components/content/banner/schema"),
      "bannerConfigSchema",
    ),
  row: () =>
    registerFromSplitModules(
      "row",
      () => import("../components/layout/row"),
      "Row",
      () => import("../components/layout/row/schema"),
      "rowConfigSchema",
    ),
  box: () =>
    registerFromModule(
      "box",
      () => import("../components/layout/box/index"),
      "Box",
      "boxConfigSchema",
    ),
  card: () =>
    registerFromModule(
      "card",
      () => import("../components/layout/card/index"),
      "Card",
      "cardConfigSchema",
    ),
  collapsible: () =>
    registerFromModule(
      "collapsible",
      () => import("../components/layout/collapsible/index"),
      "Collapsible",
      "collapsibleConfigSchema",
    ),
  column: () =>
    registerFromModule(
      "column",
      () => import("../components/layout/column/index"),
      "Column",
      "columnConfigSchema",
    ),
  container: () =>
    registerFromSplitModules(
      "container",
      () => import("../components/layout/container"),
      "Container",
      () => import("../components/layout/container/schema"),
      "containerConfigSchema",
    ),
  grid: () =>
    registerFromSplitModules(
      "grid",
      () => import("../components/layout/grid"),
      "Grid",
      () => import("../components/layout/grid/schema"),
      "gridConfigSchema",
    ),
  section: () =>
    registerFromSplitModules(
      "section",
      () => import("../components/layout/section"),
      "Section",
      () => import("../components/layout/section/schema"),
      "sectionConfigSchema",
    ),
  spacer: () =>
    registerFromSplitModules(
      "spacer",
      () => import("../components/layout/spacer"),
      "Spacer",
      () => import("../components/layout/spacer/schema"),
      "spacerConfigSchema",
    ),
  "nav-dropdown": () =>
    registerFromModule(
      "nav-dropdown",
      () => import("../components/layout/nav-dropdown/index"),
      "NavDropdown",
      "navDropdownConfigSchema",
    ),
  "nav-link": () =>
    registerFromModule(
      "nav-link",
      () => import("../components/layout/nav-link/index"),
      "NavLink",
      "navLinkConfigSchema",
    ),
  "nav-logo": () =>
    registerFromModule(
      "nav-logo",
      () => import("../components/layout/nav-logo/index"),
      "NavLogo",
      "navLogoConfigSchema",
    ),
  "nav-search": () =>
    registerFromModule(
      "nav-search",
      () => import("../components/layout/nav-search/index"),
      "NavSearch",
      "navSearchConfigSchema",
    ),
  "nav-section": () =>
    registerFromModule(
      "nav-section",
      () => import("../components/layout/nav-section/index"),
      "NavSection",
      "navSectionConfigSchema",
    ),
  "nav-user-menu": () =>
    registerFromModule(
      "nav-user-menu",
      () => import("../components/layout/nav-user-menu/index"),
      "NavUserMenu",
      "navUserMenuConfigSchema",
    ),
  outlet: () =>
    registerFromModule(
      "outlet",
      () => import("../components/layout/outlet/index"),
      "Outlet",
      "outletComponentSchema",
    ),
  "component-group": () =>
    registerFromModule(
      "component-group",
      () => import("../components/_base/component-group/index"),
      "ComponentGroup",
      "componentGroupConfigSchema",
    ),
  "split-pane": () =>
    registerFromSplitModules(
      "split-pane",
      () => import("../components/layout/split-pane/index"),
      "SplitPane",
      () => import("../components/layout/split-pane/schema"),
      "splitPaneConfigSchema",
    ),
  "confirm-dialog": () =>
    registerFromModule(
      "confirm-dialog",
      () => import("../components/overlay/confirm-dialog/index"),
      "ConfirmDialogComponent",
      "confirmDialogConfigSchema",
    ),
};

/**
 * Collect manifest component types from any nested config object.
 */
export function collectComponentTypes(
  value: unknown,
  types = new Set<string>(),
): Set<string> {
  if (Array.isArray(value)) {
    value.forEach((item) => collectComponentTypes(item, types));
    return types;
  }

  if (!isRecord(value)) {
    return types;
  }

  if (typeof value.type === "string") {
    types.add(value.type);
  }

  Object.values(value).forEach((nested) => collectComponentTypes(nested, types));
  return types;
}

/**
 * Ensure the requested component types are registered in the runtime registry.
 */
export async function ensureComponentsLoaded(types: string[]): Promise<void> {
  for (const type of types) {
    if (!type || loadedTypes.has(type) || getRegisteredComponent(type)) {
      loadedTypes.add(type);
      continue;
    }

    const loader = COMPONENT_LOADERS[type];
    if (loader) {
      await loader();
      loadedTypes.add(type);
      continue;
    }

    await loadAllBuiltIns();
    loadedTypes.add(type);
  }
}

export function resetLazyRegistry(): void {
  loadedTypes.clear();
  loadedAllBuiltIns = false;
}

COMPONENT_LOADERS["auto-form"] = COMPONENT_LOADERS.form!;
