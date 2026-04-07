/**
 * Registers all built-in config-driven components with the manifest system.
 * Import this module as a side-effect to make all components available for manifest rendering.
 */
import { registerComponent } from "../manifest/component-registry";
import { registerComponentSchema } from "../manifest/schema";
import { StatCard, statCardConfigSchema } from "./data/stat-card/index";
import { DataTable } from "./data/data-table/index";
import { dataTableConfigSchema } from "./data/data-table/schema";
import { AutoForm } from "./forms/auto-form/index";
import { autoFormConfigSchema } from "./forms/auto-form/schema";
import { ModalComponent, modalConfigSchema } from "./overlay/modal";
import { DrawerComponent, drawerConfigSchema } from "./overlay/drawer";
import { DetailCard } from "./data/detail-card/index";
import { detailCardConfigSchema } from "./data/detail-card/schema";
import { TabsComponent, tabsConfigSchema } from "./navigation/tabs";
import { Badge, badgeConfigSchema } from "./data/badge/index";
import { Avatar, avatarConfigSchema } from "./data/avatar/index";
import { Alert, alertConfigSchema } from "./data/alert/index";
import { Progress, progressConfigSchema } from "./data/progress/index";
import { Skeleton, skeletonConfigSchema } from "./data/skeleton/index";
import { Switch, switchConfigSchema } from "./forms/switch/index";
import {
  EmptyState,
  emptyStateConfigSchema,
} from "./data/empty-state/index";
import {
  AccordionComponent,
  accordionConfigSchema,
} from "./navigation/accordion/index";
import {
  BreadcrumbComponent,
  breadcrumbConfigSchema,
} from "./navigation/breadcrumb/index";
import { ListComponent, listConfigSchema } from "./data/list/index";
import { TooltipComponent, tooltipConfigSchema } from "./data/tooltip/index";
import { Timeline, timelineConfigSchema } from "./content/timeline/index";
import { CodeBlock, codeBlockConfigSchema } from "./content/code-block/index";
import { Stepper, stepperConfigSchema } from "./navigation/stepper/index";
import { TreeView, treeViewConfigSchema } from "./navigation/tree-view/index";
import { Kanban, kanbanConfigSchema } from "./workflow/kanban/index";
import { Calendar, calendarConfigSchema } from "./workflow/calendar/index";
import { AuditLog, auditLogConfigSchema } from "./workflow/audit-log/index";
import {
  NotificationFeed,
  notificationFeedConfigSchema,
} from "./workflow/notification-feed/index";
import {
  DropdownMenu,
  dropdownMenuConfigSchema,
} from "./overlay/dropdown-menu/index";
import {
  PricingTable,
  pricingTableConfigSchema,
} from "./commerce/pricing-table/index";
import {
  FileUploader,
  fileUploaderConfigSchema,
} from "./content/file-uploader/index";

registerComponent(
  "stat-card",
  StatCard as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("stat-card", statCardConfigSchema);

registerComponent(
  "data-table",
  DataTable as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("data-table", dataTableConfigSchema);

registerComponent(
  "form",
  AutoForm as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("form", autoFormConfigSchema);

registerComponent(
  "detail-card",
  DetailCard as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("detail-card", detailCardConfigSchema);

registerComponent(
  "modal",
  ModalComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("modal", modalConfigSchema);

registerComponent(
  "drawer",
  DrawerComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("drawer", drawerConfigSchema);

registerComponent(
  "tabs",
  TabsComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("tabs", tabsConfigSchema);

registerComponent(
  "badge",
  Badge as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("badge", badgeConfigSchema);

registerComponent(
  "avatar",
  Avatar as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("avatar", avatarConfigSchema);

registerComponent(
  "alert",
  Alert as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("alert", alertConfigSchema);

registerComponent(
  "progress",
  Progress as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("progress", progressConfigSchema);

registerComponent(
  "skeleton",
  Skeleton as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("skeleton", skeletonConfigSchema);

registerComponent(
  "switch",
  Switch as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("switch", switchConfigSchema);

registerComponent(
  "empty-state",
  EmptyState as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("empty-state", emptyStateConfigSchema);

registerComponent(
  "accordion",
  AccordionComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("accordion", accordionConfigSchema);

registerComponent(
  "breadcrumb",
  BreadcrumbComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("breadcrumb", breadcrumbConfigSchema);

registerComponent(
  "list",
  ListComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("list", listConfigSchema);

registerComponent(
  "tooltip",
  TooltipComponent as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("tooltip", tooltipConfigSchema);

registerComponent(
  "timeline",
  Timeline as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("timeline", timelineConfigSchema);

registerComponent(
  "code-block",
  CodeBlock as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("code-block", codeBlockConfigSchema);

registerComponent(
  "stepper",
  Stepper as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("stepper", stepperConfigSchema);

registerComponent(
  "tree-view",
  TreeView as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("tree-view", treeViewConfigSchema);

registerComponent(
  "kanban",
  Kanban as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("kanban", kanbanConfigSchema);

registerComponent(
  "calendar",
  Calendar as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("calendar", calendarConfigSchema);

registerComponent(
  "audit-log",
  AuditLog as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("audit-log", auditLogConfigSchema);

registerComponent(
  "notification-feed",
  NotificationFeed as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("notification-feed", notificationFeedConfigSchema);

registerComponent(
  "dropdown-menu",
  DropdownMenu as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("dropdown-menu", dropdownMenuConfigSchema);

registerComponent(
  "pricing-table",
  PricingTable as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("pricing-table", pricingTableConfigSchema);

registerComponent(
  "file-uploader",
  FileUploader as Parameters<typeof registerComponent>[1],
);
registerComponentSchema("file-uploader", fileUploaderConfigSchema);
