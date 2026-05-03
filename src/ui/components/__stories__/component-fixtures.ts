export type ComponentConfigRecord = Record<string, unknown> & { type: string };

export interface ComponentFixture {
  name: string;
  description: string;
  config: ComponentConfigRecord;
  maxWidth?: string;
}

type FixtureMap = Record<string, readonly ComponentFixture[]>;

const ref = (from: string) => ({ from });

const toastAction = {
  type: "toast",
  message: "Story action executed",
  variant: "success",
};

const navigateAction = {
  type: "navigate",
  to: "/dashboard",
};

const textChild = (value = "Operational signal") => ({
  type: "text",
  value,
});

const headingChild = (text = "Snapshot") => ({
  type: "heading",
  text,
  level: 3,
});

const cardChildren = [
  headingChild("Review queue"),
  {
    type: "text",
    value:
      "A compact surface for checking spacing, typography, interaction states, and nested rendering.",
  },
];

const svgDataUrl = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`;

const workspaceImage = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f766e"/>
      <stop offset="0.55" stop-color="#2563eb"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <rect x="92" y="96" width="1016" height="483" rx="42" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
  <rect x="160" y="390" width="880" height="42" rx="21" fill="rgba(255,255,255,0.22)"/>
  <rect x="238" y="250" width="228" height="126" rx="18" fill="rgba(255,255,255,0.82)"/>
  <rect x="500" y="206" width="196" height="170" rx="18" fill="rgba(255,255,255,0.68)"/>
  <rect x="730" y="278" width="226" height="98" rx="18" fill="rgba(255,255,255,0.74)"/>
  <circle cx="288" cy="188" r="42" fill="rgba(255,255,255,0.42)"/>
  <circle cx="978" cy="178" r="76" fill="rgba(255,255,255,0.16)"/>
  <text x="160" y="526" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700">Snapshot workspace</text>
</svg>
`);

const carouselSlideImage = (title: string, subtitle: string, from: string, to: string) =>
  svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="r" cx="74%" cy="22%" r="72%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <rect width="1200" height="675" fill="url(#r)"/>
  <path d="M0 496 C 210 424, 342 690, 592 572 S 990 412, 1200 522 L1200 675 L0 675 Z" fill="#ffffff" fill-opacity="0.13"/>
  <path d="M0 104 C 220 188, 372 26, 578 118 S 950 242, 1200 112 L1200 0 L0 0 Z" fill="#000000" fill-opacity="0.10"/>
  <text x="88" y="438" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="760">${title}</text>
  <text x="92" y="498" fill="#ffffff" fill-opacity="0.84" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500">${subtitle}</text>
</svg>
`);

const carouselSlide = (title: string, subtitle: string, from: string, to: string) => ({
  type: "image",
  src: carouselSlideImage(title, subtitle, from, to),
  alt: `${title}: ${subtitle}`,
  width: 1200,
  height: 675,
  priority: true,
  loading: "eager",
  aspectRatio: "16 / 9",
  style: {
    borderRadius: 0,
  },
});

export const STORY_STATE = {
  storyData: {
    scope: "route" as const,
    default: {
      stats: { value: 128400, change: 108445 },
      users: [
        {
          id: "u1",
          name: "Ada Lovelace",
          email: "ada@snapshot.test",
          role: "Admin",
          status: "active",
          progress: 86,
          joined: "2026-04-12",
          avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
        },
        {
          id: "u2",
          name: "Grace Hopper",
          email: "grace@snapshot.test",
          role: "Editor",
          status: "active",
          progress: 72,
          joined: "2026-04-18",
          avatarUrl:
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=96&q=80",
        },
        {
          id: "u3",
          name: "Katherine Johnson",
          email: "katherine@snapshot.test",
          role: "Viewer",
          status: "invited",
          progress: 41,
          joined: "2026-04-28",
          avatarUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80",
        },
      ],
      detail: {
        name: "Northstar Workspace",
        owner: "Product Operations",
        status: "healthy",
        plan: "Scale",
        seats: 42,
      },
      tasks: [
        {
          id: "task-1",
          title: "Audit billing flow",
          description: "Review empty, loading, error, and success states.",
          status: "todo",
          assignee: "Ada",
          priority: "high",
        },
        {
          id: "task-2",
          title: "Refine onboarding copy",
          description: "Tighten language for first-run forms.",
          status: "doing",
          assignee: "Grace",
          priority: "medium",
        },
        {
          id: "task-3",
          title: "Publish release notes",
          description: "Summarize component improvements.",
          status: "done",
          assignee: "Katherine",
          priority: "low",
        },
      ],
      audit: [
        {
          id: "a1",
          user: "Ada Lovelace",
          action: "Updated project access rules",
          timestamp: "2026-05-01T14:15:00Z",
          icon: "shield-check",
          changes: { role: "Admin", scope: "workspace" },
        },
        {
          id: "a2",
          user: "Grace Hopper",
          action: "Exported monthly report",
          timestamp: "2026-05-01T13:40:00Z",
          icon: "file-down",
          changes: { format: "CSV", rows: 1240 },
        },
      ],
      notifications: [
        {
          id: "n1",
          title: "Deploy completed",
          message: "Production received the latest component bundle.",
          timestamp: "2026-05-01T15:05:00Z",
          type: "success",
          unread: true,
        },
        {
          id: "n2",
          title: "Review requested",
          message: "The design audit queue has 3 items waiting.",
          timestamp: "2026-05-01T12:30:00Z",
          type: "info",
          unread: false,
        },
      ],
      feed: [
        {
          id: "f1",
          title: "Ada shipped table polish",
          detail: "Density, selected rows, and toolbar spacing were updated.",
          type: "release",
          createdAt: "2026-05-01T11:10:00Z",
        },
        {
          id: "f2",
          title: "Grace reviewed keyboard states",
          detail: "Focus treatment was checked across overlay components.",
          type: "review",
          createdAt: "2026-05-01T10:45:00Z",
        },
      ],
      messages: [
        {
          id: "m1",
          content: "The calendar now anchors to event data correctly.",
          author: { name: "Ada Lovelace" },
          timestamp: "2026-05-01T14:12:00Z",
        },
        {
          id: "m2",
          content: "Good. I will verify the nav nesting next.",
          author: { name: "Grace Hopper" },
          timestamp: "2026-05-01T14:16:00Z",
        },
      ],
      comments: [
        {
          id: "c1",
          content: "The empty state feels consistent with the rest of the kit.",
          author: { name: "Katherine Johnson" },
          timestamp: "2026-05-01T09:30:00Z",
        },
      ],
      chart: [
        { month: "Jan", revenue: 42000, signups: 320 },
        { month: "Feb", revenue: 51000, signups: 390 },
        { month: "Mar", revenue: 64000, signups: 470 },
        { month: "Apr", revenue: 72000, signups: 530 },
      ],
      entities: [
        { id: "ent-1", name: "Acme Labs", description: "Enterprise account" },
        { id: "ent-2", name: "Northstar", description: "Growth account" },
      ],
    },
  },
};

const formFields = [
  {
    name: "name",
    type: "text",
    label: "Workspace name",
    placeholder: "Northstar",
    required: true,
  },
  {
    name: "role",
    type: "select",
    label: "Default role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Internal context",
  },
];

export const COMPONENT_FIXTURES: FixtureMap = {
  accordion: [
    {
      name: "Default",
      description: "Stacked disclosure rows with varied content length.",
      config: {
        type: "accordion",
        items: [
          {
            title: "What changed?",
            content: [textChild("Visual states now share one rhythm.")],
          },
          {
            title: "What should I test?",
            content: [textChild("Keyboard, focus, density, and truncation.")],
          },
        ],
      },
    },
  ],
  alert: [
    {
      name: "Info",
      description: "Informational alert with title and action.",
      config: {
        type: "alert",
        title: "Sync complete",
        description: "All generated component docs are current.",
        variant: "info",
        action: toastAction,
      },
    },
  ],
  "audit-log": [
    {
      name: "Recent Activity",
      description: "Audit list backed by route-state fixture data.",
      maxWidth: "760px",
      config: {
        type: "audit-log",
        data: ref("storyData.audit"),
        userField: "user",
        actionField: "action",
        timestampField: "timestamp",
        detailsField: "changes",
        iconField: "icon",
      },
    },
  ],
  "auto-form": [
    {
      name: "Workspace Form",
      description: "Generated form with text, select, and textarea fields.",
      maxWidth: "640px",
      config: {
        type: "auto-form",
        submit: "POST /api/workspaces",
        fields: formFields,
        columns: 2,
        submitLabel: "Create workspace",
        onSuccess: toastAction,
      },
    },
  ],
  avatar: [
    {
      name: "Profile",
      description: "Avatar with image and fallback.",
      config: {
        type: "avatar",
        name: "Ada Lovelace",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
        size: "lg",
      },
    },
  ],
  "avatar-group": [
    {
      name: "Team",
      description: "Overlapping team avatars with overflow count.",
      config: {
        type: "avatar-group",
        max: 3,
        avatars: [
          { name: "Ada Lovelace" },
          { name: "Grace Hopper" },
          { name: "Katherine Johnson" },
          { name: "Dorothy Vaughan" },
        ],
      },
    },
  ],
  badge: [
    {
      name: "Status",
      description: "Compact semantic status indicator.",
      config: { type: "badge", text: "Healthy", color: "success", variant: "soft" },
    },
  ],
  banner: [
    {
      name: "Product Banner",
      description: "Image-backed content band with nested manifest children.",
      config: {
        type: "banner",
        height: "240px",
        align: "left",
        background: {
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
          overlay: "rgba(15, 23, 42, 0.62)",
        },
        children: [
          { type: "heading", text: "Operations cockpit", level: 2 },
          {
            type: "text",
            value: "Fast scanning for teams, tasks, and exceptions.",
          },
        ],
      },
    },
  ],
  box: [
    {
      name: "Semantic Box",
      description: "Unframed layout primitive with nested content.",
      config: {
        type: "box",
        as: "section",
        children: cardChildren,
        style: {
          padding: 20,
          background: "var(--sn-color-surface-alt, #f8fafc)",
          borderRadius: 8,
        },
      },
    },
  ],
  breadcrumb: [
    {
      name: "Manual Trail",
      description: "Manual breadcrumb path with current page.",
      config: {
        type: "breadcrumb",
        separator: "chevron",
        items: [
          { label: "Home", path: "/", icon: "home" },
          { label: "Components", path: "/components" },
          { label: "Generated catalog" },
        ],
      },
    },
  ],
  button: [
    {
      name: "Primary",
      description: "Primary command button with an action.",
      config: {
        type: "button",
        label: "Save changes",
        icon: "save",
        action: toastAction,
      },
    },
    {
      name: "Secondary",
      description: "Secondary action using the shared button base.",
      config: {
        type: "button",
        label: "Invite reviewer",
        icon: "user-plus",
        variant: "secondary",
        action: toastAction,
      },
    },
    {
      name: "Disabled",
      description: "Disabled command with consistent inactive treatment.",
      config: {
        type: "button",
        label: "Waiting for sync",
        icon: "loader",
        variant: "outline",
        disabled: true,
        action: toastAction,
      },
    },
  ],
  calendar: [
    {
      name: "Month",
      description: "Calendar anchored to visible event dates.",
      maxWidth: "900px",
      config: {
        type: "calendar",
        view: "month",
        events: [
          {
            title: "Design review",
            date: "2026-05-05",
            color: "primary",
          },
          {
            title: "Release window",
            date: "2026-05-13",
            color: "success",
          },
        ],
      },
    },
  ],
  card: [
    {
      name: "Content Card",
      description: "Card with header and nested content.",
      maxWidth: "520px",
      config: {
        type: "card",
        title: "Component health",
        subtitle: "Audit snapshot",
        children: [
          { type: "badge", text: "112 registered", color: "info", variant: "soft" },
          textChild("Every manifest component has a generated story entry."),
        ],
      },
    },
  ],
  carousel: [
    {
      name: "Slides",
      description: "Carousel with three content slides.",
      maxWidth: "720px",
      config: {
        type: "carousel",
        showDots: true,
        showArrows: true,
        children: [
          carouselSlide("Plan review", "Design QA, accessibility checks, and visual states.", "#0f766e", "#1d4ed8"),
          carouselSlide("Launch room", "Cross-functional status for release-critical work.", "#7c3aed", "#be123c"),
          carouselSlide("Ops dashboard", "Dense operational information with readable hierarchy.", "#334155", "#0891b2"),
        ],
      },
    },
  ],
  chart: [
    {
      name: "Revenue",
      description: "Bar chart using fixture data and two series.",
      maxWidth: "760px",
      config: {
        type: "chart",
        data: ref("storyData.chart"),
        chartType: "bar",
        xKey: "month",
        series: [
          { key: "revenue", label: "Revenue", color: "#2563eb" },
          { key: "signups", label: "Signups", color: "#16a34a" },
        ],
        height: 320,
      },
    },
  ],
  "chat-window": [
    {
      name: "Support Chat",
      description: "Composed chat surface with thread and rich input.",
      maxWidth: "720px",
      config: {
        type: "chat-window",
        title: "#component-audit",
        subtitle: "3 people active",
        data: ref("storyData.messages"),
        height: "520px",
        typingUsers: ["Ada"],
        sendAction: toastAction,
      },
    },
  ],
  code: [
    {
      name: "Inline Code",
      description: "Inline code primitive.",
      config: { type: "code", value: "snapshot.manifest.json" },
    },
  ],
  "code-block": [
    {
      name: "TypeScript",
      description: "Syntax-highlighted code block.",
      config: {
        type: "code-block",
        language: "ts",
        code: "export const status = \"ready\";\nexport const count = 112;",
      },
    },
  ],
  collapsible: [
    {
      name: "Open",
      description: "Disclosure panel with a custom trigger.",
      config: {
        type: "collapsible",
        defaultOpen: true,
        trigger: { type: "button", label: "Toggle details", action: toastAction },
        children: [textChild("Hidden details remain aligned with the system.")],
      },
    },
  ],
  "color-picker": [
    {
      name: "Brand Color",
      description: "Color input with a current value.",
      maxWidth: "360px",
      config: {
        type: "color-picker",
        label: "Accent color",
        defaultValue: "#2563eb",
      },
    },
  ],
  column: [
    {
      name: "Stacked Layout",
      description: "Vertical composition primitive.",
      config: {
        type: "column",
        gap: "sm",
        children: cardChildren,
      },
    },
  ],
  "command-palette": [
    {
      name: "Commands",
      description: "Keyboard command menu configured with grouped actions.",
      config: {
        type: "command-palette",
        groups: [
          {
            label: "Navigation",
            items: [
              { label: "Open dashboard", icon: "layout-dashboard", action: navigateAction },
              { label: "Search users", icon: "search", action: toastAction },
            ],
          },
        ],
      },
    },
  ],
  "comment-section": [
    {
      name: "Comments",
      description: "Comment thread with composer.",
      maxWidth: "720px",
      config: {
        type: "comment-section",
        data: ref("storyData.comments"),
        inputPlaceholder: "Add context for the next reviewer...",
        submitAction: toastAction,
      },
    },
  ],
  "compare-view": [
    {
      name: "Diff",
      description: "Side-by-side content comparison.",
      config: {
        type: "compare-view",
        left: "Manual showcase entry",
        right: "Generated Storybook fixture",
        leftLabel: "Before",
        rightLabel: "After",
      },
    },
  ],
  "component-group": [
    {
      name: "Group Token",
      description: "Group-level override primitive.",
      config: {
        type: "component-group",
        group: "audit-controls",
      },
    },
  ],
  "confirm-dialog": [
    {
      name: "Confirm",
      description: "Confirmation dialog config mounted for action coverage.",
      config: {
        type: "confirm-dialog",
        title: "Archive component?",
        description: "This story exercises the confirmation surface.",
        confirmLabel: "Archive",
        cancelLabel: "Cancel",
        confirmAction: toastAction,
      },
    },
  ],
  container: [
    {
      name: "Page Container",
      description: "Centered layout container.",
      config: {
        type: "container",
        maxWidth: "md",
        padding: "md",
        children: cardChildren,
      },
    },
  ],
  "context-menu": [
    {
      name: "Actions",
      description: "Right-click action menu around a trigger region.",
      config: {
        type: "context-menu",
        triggerText: "Open context",
        items: [
          { type: "label", text: "Actions" },
          { type: "item", label: "Rename", icon: "pencil", action: toastAction },
          { type: "separator" },
          { type: "item", label: "Archive", variant: "destructive", action: toastAction },
        ],
      },
    },
  ],
  "data-table": [
    {
      name: "Users",
      description: "Searchable, selectable table with formatted cells.",
      maxWidth: "980px",
      config: {
        type: "data-table",
        data: ref("storyData.users"),
        columns: [
          { field: "name", label: "Name", sortable: true },
          { field: "email", label: "Email" },
          {
            field: "role",
            label: "Role",
            format: "badge",
            badgeColors: { Admin: "blue", Editor: "green", Viewer: "gray" },
          },
          {
            field: "status",
            label: "Status",
            format: "badge",
            badgeColors: { active: "green", invited: "yellow" },
          },
          { field: "joined", label: "Joined", format: "date" },
        ],
        searchable: { placeholder: "Search users", fields: ["name", "email"] },
        selectable: true,
        pagination: { type: "offset", pageSize: 5 },
      },
    },
  ],
  "date-picker": [
    {
      name: "Due Date",
      description: "Date picker with a selected ISO date.",
      maxWidth: "360px",
      config: {
        type: "date-picker",
        label: "Due date",
        min: "2026-01-01",
        max: "2026-12-31",
      },
    },
  ],
  "detail-card": [
    {
      name: "Workspace",
      description: "Key-value detail surface from fixture state.",
      maxWidth: "520px",
      config: {
        type: "detail-card",
        data: ref("storyData.detail"),
        title: "Workspace detail",
        fields: [
          { label: "Name", field: "name" },
          { label: "Owner", field: "owner" },
          { label: "Plan", field: "plan" },
          { label: "Seats", field: "seats" },
        ],
      },
    },
  ],
  divider: [
    {
      name: "Labeled",
      description: "Divider with text label.",
      config: { type: "divider", label: "Next section" },
    },
  ],
  drawer: [
    {
      name: "Panel",
      description: "Drawer content config with footer action.",
      config: {
        type: "drawer",
        title: "Filters",
        content: [
          { type: "text", value: "Filter controls render inside this drawer." },
        ],
        footer: {
          actions: [{ label: "Apply", action: toastAction, dismiss: true }],
        },
      },
    },
  ],
  "dropdown-menu": [
    {
      name: "Menu",
      description: "Trigger menu with label, separator, and action items.",
      config: {
        type: "dropdown-menu",
        trigger: { label: "Actions", icon: "more-horizontal", variant: "outline" },
        items: [
          { type: "label", text: "Workspace" },
          { type: "item", label: "Duplicate", icon: "copy", action: toastAction },
          { type: "separator" },
          { type: "item", label: "Delete", destructive: true, action: toastAction },
        ],
      },
    },
  ],
  embed: [
    {
      name: "External",
      description: "Embedded external content frame.",
      maxWidth: "640px",
      config: {
        type: "embed",
        url: "https://example.com",
        title: "Example embed",
      },
    },
  ],
  "emoji-picker": [
    {
      name: "Emoji Grid",
      description: "Searchable emoji picker with constrained height.",
      maxWidth: "420px",
      config: {
        type: "emoji-picker",
        perRow: 8,
        maxHeight: "280px",
        categories: ["smileys", "objects", "symbols"],
      },
    },
  ],
  "empty-state": [
    {
      name: "No Results",
      description: "Illustrated empty state with primary action.",
      maxWidth: "520px",
      config: {
        type: "empty-state",
        title: "No results",
        description: "Try adjusting your filters or creating a new item.",
        icon: "search-x",
        action: toastAction,
        actionLabel: "Create item",
      },
    },
  ],
  "entity-picker": [
    {
      name: "Account Picker",
      description: "Searchable entity picker using fixture data.",
      maxWidth: "420px",
      config: {
        type: "entity-picker",
        label: "Assign account",
        data: ref("storyData.entities"),
        labelField: "name",
        valueField: "id",
        descriptionField: "description",
        multiple: true,
      },
    },
  ],
  "error-page": [
    {
      name: "Error",
      description: "Default error page fallback.",
      config: {
        type: "error-page",
        title: "Something needs attention",
        description: "The generated story caught an expected error state.",
      },
    },
  ],
  "favorite-button": [
    {
      name: "Favorited",
      description: "Toggleable favorite affordance.",
      config: {
        type: "favorite-button",
        active: true,
        toggleAction: toastAction,
      },
    },
  ],
  feed: [
    {
      name: "Activity",
      description: "Activity feed grouped from fixture data.",
      maxWidth: "720px",
      config: {
        type: "feed",
        data: ref("storyData.feed"),
        title: "title",
        description: "detail",
        timestamp: "createdAt",
        badge: {
          field: "type",
          colorMap: { release: "success", review: "info" },
        },
      },
    },
  ],
  "file-uploader": [
    {
      name: "Uploader",
      description: "Dropzone-style file upload control.",
      maxWidth: "520px",
      config: {
        type: "file-uploader",
        label: "Upload source files",
        accept: ".png,.jpg,.pdf",
        maxFiles: 3,
      },
    },
  ],
  "filter-bar": [
    {
      name: "Filters",
      description: "Inline filters for dense data surfaces.",
      config: {
        type: "filter-bar",
        filters: [
          {
            key: "status",
            label: "Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Invited", value: "invited" },
            ],
          },
          {
            key: "priority",
            label: "Priority",
            options: [
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
            ],
          },
        ],
      },
    },
  ],
  "floating-menu": [
    {
      name: "Floating",
      description: "Primitive floating action menu.",
      config: {
        type: "floating-menu",
        triggerLabel: "Open menu",
        items: [
          { type: "item", label: "Copy", action: toastAction },
          { type: "item", label: "Share", action: toastAction },
        ],
      },
    },
  ],
  form: [
    {
      name: "Alias",
      description: "The form alias renders the auto-form component.",
      maxWidth: "640px",
      config: {
        type: "form",
        submit: "POST /api/workspaces",
        fields: formFields,
        submitLabel: "Save profile",
      },
    },
  ],
  "gif-picker": [
    {
      name: "Static GIFs",
      description: "GIF picker using local fixture data.",
      maxWidth: "460px",
      config: {
        type: "gif-picker",
        columns: 2,
        maxHeight: "320px",
        gifs: [
          {
            id: "g1",
            url: "https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif",
            title: "Confetti",
          },
          {
            id: "g2",
            url: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
            title: "Waiting",
          },
        ],
      },
    },
  ],
  grid: [
    {
      name: "Two Columns",
      description: "Responsive grid primitive.",
      config: {
        type: "grid",
        columns: 2,
        gap: "md",
        children: [
          { type: "card", title: "Left", children: [textChild("Primary")] },
          { type: "card", title: "Right", children: [textChild("Secondary")] },
        ],
      },
    },
  ],
  heading: [
    {
      name: "Section Heading",
      description: "Heading with level control.",
      config: { type: "heading", text: "Component catalog", level: 2 },
    },
  ],
  "highlighted-text": [
    {
      name: "Search Match",
      description: "Text with highlighted query matches.",
      config: {
        type: "highlighted-text",
        text: "Generated stories reveal visual regressions quickly.",
        highlight: "stories",
      },
    },
  ],
  "hover-card": [
    {
      name: "Preview",
      description: "Hover-triggered detail surface.",
      config: {
        type: "hover-card",
        trigger: { type: "button", label: "Preview account", action: toastAction },
        content: [
          { type: "heading", text: "Northstar", level: 4 },
          { type: "text", value: "Scale account with 42 seats." },
        ],
      },
    },
  ],
  "icon-button": [
    {
      name: "Settings",
      description: "Icon-only command with accessible label.",
      config: {
        type: "icon-button",
        icon: "settings",
        ariaLabel: "Open settings",
        action: toastAction,
      },
    },
  ],
  image: [
    {
      name: "Responsive",
      description: "Image component with alt text.",
      maxWidth: "640px",
      config: {
        type: "image",
        src: workspaceImage,
        alt: "Illustrated workspace preview",
        width: 1200,
        height: 675,
        placeholder: "skeleton",
      },
    },
  ],
  "inline-edit": [
    {
      name: "Title",
      description: "Inline editable text field.",
      maxWidth: "420px",
      config: {
        type: "inline-edit",
        value: "Quarterly planning",
        placeholder: "Untitled",
        saveAction: toastAction,
      },
    },
  ],
  input: [
    {
      name: "Email",
      description: "Text input with helper copy.",
      maxWidth: "360px",
      config: {
        type: "input",
        label: "Email",
        placeholder: "ada@snapshot.test",
        value: "ada@snapshot.test",
        helperText: "Used for workspace notifications.",
      },
    },
  ],
  kanban: [
    {
      name: "Board",
      description: "Kanban board with realistic task fixtures.",
      maxWidth: "980px",
      config: {
        type: "kanban",
        data: ref("storyData.tasks"),
        columns: [
          { key: "todo", title: "To do", color: "info" },
          { key: "doing", title: "Doing", color: "warning" },
          { key: "done", title: "Done", color: "success" },
        ],
        columnField: "status",
        titleField: "title",
        descriptionField: "description",
        assigneeField: "assignee",
        priorityField: "priority",
      },
    },
  ],
  link: [
    {
      name: "Internal Link",
      description: "Navigation link primitive.",
      config: { type: "link", text: "Open dashboard", to: "/dashboard" },
    },
  ],
  "link-embed": [
    {
      name: "Article",
      description: "Rich URL preview.",
      maxWidth: "520px",
      config: {
        type: "link-embed",
        url: "https://storybook.js.org",
        meta: {
          title: "Storybook",
          description: "Component workshop for teams.",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
          siteName: "Storybook",
        },
      },
    },
  ],
  list: [
    {
      name: "Navigation List",
      description: "Bordered list with icons and badges.",
      maxWidth: "520px",
      config: {
        type: "list",
        variant: "bordered",
        divider: true,
        items: [
          {
            title: "Components",
            description: "112 generated stories",
            icon: "blocks",
            badge: "New",
            badgeColor: "success",
          },
          {
            title: "Coverage",
            description: "Fixture validation and docs coverage",
            icon: "shield-check",
          },
        ],
      },
    },
  ],
  "location-input": [
    {
      name: "Venue",
      description: "Location search input with endpoint config.",
      maxWidth: "420px",
      config: {
        type: "location-input",
        label: "Venue",
        placeholder: "Search for a city",
        value: "New York, NY",
        searchEndpoint: "GET /api/locations",
      },
    },
  ],
  markdown: [
    {
      name: "Markdown",
      description: "Markdown renderer with lists and inline code.",
      maxWidth: "680px",
      config: {
        type: "markdown",
        content:
          "### Release checklist\n\n- Generated stories\n- Fixture coverage\n- Visual review\n\nUse `storybook:dev` for component QA.",
      },
    },
  ],
  "message-thread": [
    {
      name: "Thread",
      description: "Message list with authors and timestamps.",
      maxWidth: "680px",
      config: {
        type: "message-thread",
        data: ref("storyData.messages"),
        maxHeight: "420px",
      },
    },
  ],
  modal: [
    {
      name: "Dialog",
      description: "Modal content config with footer actions.",
      config: {
        type: "modal",
        title: "Review changes",
        content: [
          { type: "text", value: "This modal validates overlay composition." },
        ],
        footer: {
          actions: [{ label: "Done", action: toastAction, dismiss: true }],
        },
      },
    },
  ],
  "multi-select": [
    {
      name: "Tags",
      description: "Multi-select with icon options.",
      maxWidth: "420px",
      config: {
        type: "multi-select",
        label: "Tags",
        placeholder: "Select tags",
        value: ["ui", "docs"],
        options: [
          { label: "UI", value: "ui", icon: "palette" },
          { label: "Docs", value: "docs", icon: "book-open" },
          { label: "Testing", value: "testing", icon: "flask-conical" },
        ],
      },
    },
  ],
  "nav-dropdown": [
    {
      name: "Nav Menu",
      description: "Navigation dropdown with component items.",
      config: {
        type: "nav-dropdown",
        label: "Workspace",
        icon: "chevron-down",
        items: [
          { type: "nav-link", label: "Overview", path: "/overview", icon: "home" },
          { type: "nav-link", label: "Settings", path: "/settings", icon: "settings" },
        ],
      },
    },
  ],
  "nav-link": [
    {
      name: "Active",
      description: "Single navigation link.",
      config: {
        type: "nav-link",
        label: "Dashboard",
        path: "/dashboard",
        icon: "layout-dashboard",
        active: true,
      },
    },
  ],
  "nav-logo": [
    {
      name: "Brand",
      description: "Navigation brand mark.",
      config: { type: "nav-logo", text: "Snapshot", path: "/" },
    },
  ],
  "nav-search": [
    {
      name: "Search",
      description: "Navigation search control.",
      maxWidth: "360px",
      config: {
        type: "nav-search",
        placeholder: "Search components",
        shortcut: "K",
        onSearch: toastAction,
      },
    },
  ],
  "nav-section": [
    {
      name: "Section",
      description: "Grouped navigation section.",
      config: {
        type: "nav-section",
        label: "Manage",
        items: [
          { type: "nav-link", label: "Users", path: "/users", icon: "users" },
          { type: "nav-link", label: "Billing", path: "/billing", icon: "credit-card" },
        ],
      },
    },
  ],
  "nav-user-menu": [
    {
      name: "User Menu",
      description: "Authenticated user menu surface.",
      config: {
        type: "nav-user-menu",
        showAvatar: true,
        showName: true,
        showEmail: true,
        items: [
          { label: "Profile", icon: "user", action: toastAction },
          { label: "Sign out", icon: "log-out", action: toastAction },
        ],
      },
    },
  ],
  "not-found": [
    {
      name: "Not Found",
      description: "Default not-found fallback.",
      config: {
        type: "not-found",
        title: "Page not found",
        description: "The requested component route does not exist.",
      },
    },
  ],
  "notification-bell": [
    {
      name: "Unread",
      description: "Notification bell with count.",
      config: {
        type: "notification-bell",
        count: 3,
        clickAction: toastAction,
      },
    },
  ],
  "notification-feed": [
    {
      name: "Notifications",
      description: "Notification feed from fixture data.",
      maxWidth: "680px",
      config: {
        type: "notification-feed",
        data: ref("storyData.notifications"),
        titleField: "title",
        messageField: "message",
        timestampField: "timestamp",
        typeField: "type",
        readField: "read",
      },
    },
  ],
  "oauth-buttons": [
    {
      name: "Providers",
      description: "OAuth provider button group.",
      maxWidth: "360px",
      config: {
        type: "oauth-buttons",
        heading: "Continue with",
      },
    },
  ],
  "offline-banner": [
    {
      name: "Offline",
      description: "Default offline fallback banner.",
      config: {
        type: "offline-banner",
        description: "You are offline. Changes will sync when the connection returns.",
      },
    },
  ],
  outlet: [
    {
      name: "Fallback",
      description: "Outlet fallback content.",
      config: {
        type: "outlet",
        fallback: [{ type: "text", value: "Nested route content appears here." }],
      },
    },
  ],
  "passkey-button": [
    {
      name: "Passkey",
      description: "Passkey authentication command.",
      maxWidth: "360px",
      config: {
        type: "passkey-button",
        label: "Continue with passkey",
        onSuccess: toastAction,
      },
    },
  ],
  popover: [
    {
      name: "Details",
      description: "Popover with title and nested content.",
      config: {
        type: "popover",
        trigger: "Open details",
        title: "Story fixture",
        description: "A compact floating panel.",
        content: [textChild("Popover body content renders here.")],
      },
    },
  ],
  "presence-indicator": [
    {
      name: "Online",
      description: "User presence status.",
      config: {
        type: "presence-indicator",
        status: "online",
        label: "Ada Lovelace",
        showLabel: true,
      },
    },
  ],
  "pricing-table": [
    {
      name: "Plans",
      description: "Tiered pricing comparison.",
      maxWidth: "980px",
      config: {
        type: "pricing-table",
        tiers: [
          {
            name: "Starter",
            price: "$29",
            description: "For small internal tools.",
            features: [
              { text: "10 users" },
              { text: "Core components" },
              { text: "Email support" },
            ],
            actionLabel: "Start",
            action: toastAction,
          },
          {
            name: "Scale",
            price: "$99",
            description: "For growing teams.",
            highlighted: true,
            features: [
              { text: "Unlimited users" },
              { text: "Advanced workflows" },
              { text: "Priority support" },
            ],
            actionLabel: "Upgrade",
            action: toastAction,
          },
        ],
      },
    },
  ],
  progress: [
    {
      name: "Progress",
      description: "Determinate progress indicator.",
      maxWidth: "420px",
      config: {
        type: "progress",
        value: 72,
        label: "Coverage",
        showValue: true,
      },
    },
  ],
  "quick-add": [
    {
      name: "Task Entry",
      description: "Fast inline creation form.",
      maxWidth: "420px",
      config: {
        type: "quick-add",
        placeholder: "Add a task",
        buttonText: "Add",
      },
    },
  ],
  "reaction-bar": [
    {
      name: "Reactions",
      description: "Emoji reaction group.",
      config: {
        type: "reaction-bar",
        reactions: [
          { emoji: "\u{1F44D}", count: 12, active: true },
          { emoji: "\u{1F525}", count: 7 },
          { emoji: "\u{1F389}", count: 4 },
        ],
        showAddButton: true,
      },
    },
  ],
  "rich-input": [
    {
      name: "Composer",
      description: "Rich message input.",
      maxWidth: "560px",
      config: {
        type: "rich-input",
        placeholder: "Write an update...",
        features: ["bold", "italic", "mention"],
        sendAction: toastAction,
      },
    },
  ],
  "rich-text-editor": [
    {
      name: "Editor",
      description: "Rich text editing surface.",
      maxWidth: "720px",
      config: {
        type: "rich-text-editor",
        content: "<p>Document the component state and the expected behavior.</p>",
        placeholder: "Start writing...",
      },
    },
  ],
  row: [
    {
      name: "Inline Layout",
      description: "Horizontal row composition.",
      config: {
        type: "row",
        gap: "sm",
        align: "center",
        children: [
          { type: "badge", text: "Ready", color: "success", variant: "soft" },
          textChild("Generated from the registered component inventory."),
        ],
      },
    },
  ],
  "save-indicator": [
    {
      name: "Saved",
      description: "Persistence status indicator.",
      config: { type: "save-indicator", status: "saved" },
    },
  ],
  "scroll-area": [
    {
      name: "Scrollable",
      description: "Constrained scroll container.",
      maxWidth: "460px",
      config: {
        type: "scroll-area",
        maxHeight: "220px",
        content: [
          { type: "list", items: Array.from({ length: 8 }, (_, index) => ({
            title: `Item ${index + 1}`,
            description: "Contained in the scroll area",
          })) },
        ],
      },
    },
  ],
  section: [
    {
      name: "Section",
      description: "Full-width layout section.",
      config: {
        type: "section",
        align: "start",
        children: cardChildren,
      },
    },
  ],
  select: [
    {
      name: "Role",
      description: "Native select with options.",
      maxWidth: "360px",
      config: {
        type: "select",
        label: "Role",
        value: "editor",
        options: [
          { label: "Admin", value: "admin" },
          { label: "Editor", value: "editor" },
          { label: "Viewer", value: "viewer" },
        ],
      },
    },
  ],
  separator: [
    {
      name: "Separator",
      description: "Visual separator primitive.",
      config: { type: "separator", orientation: "horizontal" },
    },
  ],
  skeleton: [
    {
      name: "Loading",
      description: "Skeleton placeholder.",
      maxWidth: "520px",
      config: { type: "skeleton", lines: 3 },
    },
  ],
  slider: [
    {
      name: "Threshold",
      description: "Numeric slider with visible value.",
      maxWidth: "420px",
      config: {
        type: "slider",
        label: "Confidence",
        defaultValue: 72,
        min: 0,
        max: 100,
        step: 1,
        showValue: true,
      },
    },
  ],
  spacer: [
    {
      name: "Spacer",
      description: "Vertical rhythm primitive.",
      config: { type: "spacer", size: "lg" },
    },
  ],
  spinner: [
    {
      name: "Spinner",
      description: "Default loading spinner.",
      config: {
        type: "spinner",
        label: "Loading components",
      },
    },
  ],
  "split-pane": [
    {
      name: "Horizontal",
      description: "Resizable two-pane layout.",
      maxWidth: "760px",
      config: {
        type: "split-pane",
        direction: "horizontal",
        defaultSplit: 42,
        children: [
          { type: "card", title: "Source", children: [textChild("Config")] },
          { type: "card", title: "Preview", children: [textChild("Render")] },
        ],
      },
    },
  ],
  stack: [
    {
      name: "Stack",
      description: "Primitive vertical stack.",
      config: {
        type: "stack",
        gap: "sm",
        children: cardChildren,
      },
    },
  ],
  "stat-card": [
    {
      name: "Revenue",
      description: "Metric card with trend and icon.",
      maxWidth: "360px",
      config: {
        type: "stat-card",
        data: ref("storyData.stats"),
        field: "value",
        label: "Revenue",
        format: "currency",
        currency: "USD",
        icon: "dollar-sign",
        trend: { field: "change", sentiment: "up-is-good", format: "percent" },
      },
    },
  ],
  stepper: [
    {
      name: "Progress",
      description: "Multi-step progress indicator.",
      maxWidth: "640px",
      config: {
        type: "stepper",
        activeStep: 1,
        steps: [
          { title: "Draft", description: "Create config" },
          { title: "Review", description: "Audit visuals" },
          { title: "Ship", description: "Publish stories" },
        ],
      },
    },
  ],
  switch: [
    {
      name: "Enabled",
      description: "Boolean switch control.",
      maxWidth: "360px",
      config: {
        type: "switch",
        label: "Enable automation",
        checked: true,
      },
    },
  ],
  tabs: [
    {
      name: "Pills",
      description: "Tabbed content with nested manifest children.",
      maxWidth: "720px",
      config: {
        type: "tabs",
        variant: "pills",
        children: [
          {
            label: "Overview",
            icon: "layout-dashboard",
            content: [textChild("Overview content renders here.")],
          },
          {
            label: "Details",
            icon: "list",
            content: [textChild("Details content renders here.")],
          },
        ],
      },
    },
  ],
  "tag-selector": [
    {
      name: "Topics",
      description: "Tag selector with selected values.",
      maxWidth: "420px",
      config: {
        type: "tag-selector",
        label: "Topics",
        value: ["react", "typescript"],
        tags: [
          { label: "React", value: "react", color: "#61dafb" },
          { label: "TypeScript", value: "typescript", color: "#3178c6" },
          { label: "Design", value: "design", color: "#db2777" },
        ],
      },
    },
  ],
  text: [
    {
      name: "Body",
      description: "Text primitive.",
      config: {
        type: "text",
        value: "Generated Storybook stories make component quality visible.",
      },
    },
  ],
  textarea: [
    {
      name: "Notes",
      description: "Textarea with helper text and initial value.",
      maxWidth: "420px",
      config: {
        type: "textarea",
        label: "Notes",
        value: "Check edge states, long labels, and focus rings.",
        rows: 4,
      },
    },
  ],
  timeline: [
    {
      name: "Release Timeline",
      description: "Vertical timeline with semantic markers.",
      maxWidth: "680px",
      config: {
        type: "timeline",
        items: [
          {
            title: "Audit started",
            description: "Component inventory generated.",
            date: "2026-05-01",
            icon: "search",
            color: "info",
          },
          {
            title: "Storybook added",
            description: "Programmatic catalog wired to fixtures.",
            date: "2026-05-02",
            icon: "book-open",
            color: "success",
          },
        ],
      },
    },
  ],
  toggle: [
    {
      name: "Toggle",
      description: "Pressed toggle button.",
      config: {
        type: "toggle",
        label: "Bold",
        pressed: true,
        icon: "bold",
      },
    },
  ],
  "toggle-group": [
    {
      name: "View Mode",
      description: "Segmented toggle group.",
      config: {
        type: "toggle-group",
        value: "grid",
        items: [
          { value: "list", label: "List", icon: "list" },
          { value: "grid", label: "Grid", icon: "layout-grid" },
          { value: "chart", label: "Chart", icon: "bar-chart-3" },
        ],
      },
    },
  ],
  tooltip: [
    {
      name: "Tooltip",
      description: "Tooltip around an inline trigger.",
      config: {
        type: "tooltip",
        text: "Generated coverage",
        content: [{ type: "button", label: "Hover me", action: toastAction }],
      },
    },
  ],
  "tree-view": [
    {
      name: "Tree",
      description: "Nested tree navigation.",
      maxWidth: "420px",
      config: {
        type: "tree-view",
        items: [
          {
            id: "components",
            label: "Components",
            children: [
              { id: "forms", label: "Forms" },
              { id: "data", label: "Data" },
            ],
          },
        ],
      },
    },
  ],
  "typing-indicator": [
    {
      name: "Typing",
      description: "Typing indicator with names.",
      config: {
        type: "typing-indicator",
        users: [{ name: "Ada" }, { name: "Grace" }],
      },
    },
  ],
  video: [
    {
      name: "Video",
      description: "Video player shell.",
      maxWidth: "640px",
      config: {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        controls: true,
        poster:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      },
    },
  ],
  vote: [
    {
      name: "Score",
      description: "Up/down vote control.",
      config: {
        type: "vote",
        value: 24,
        upAction: toastAction,
        downAction: toastAction,
      },
    },
  ],
  wizard: [
    {
      name: "Setup",
      description: "Multi-step form flow.",
      maxWidth: "720px",
      config: {
        type: "wizard",
        steps: [
          {
            title: "Workspace",
            description: "Name the workspace.",
            fields: [
              {
                name: "workspace",
                type: "text",
                label: "Workspace",
                required: true,
              },
            ],
          },
          {
            title: "Preferences",
            description: "Choose defaults.",
            fields: [
              {
                name: "theme",
                type: "select",
                label: "Theme",
                options: [
                  { label: "System", value: "system" },
                  { label: "Light", value: "light" },
                ],
              },
            ],
          },
        ],
        onComplete: toastAction,
      },
    },
  ],
};

export function getComponentFixtures(type: string): readonly ComponentFixture[] {
  return COMPONENT_FIXTURES[type] ?? [
    {
      name: "Default",
      description: "Generated fallback fixture.",
      config: { type },
    },
  ];
}

export function getPrimaryFixture(type: string): ComponentFixture {
  return getComponentFixtures(type)[0]!;
}
