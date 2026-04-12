'use client';

import React, { useMemo, useState, useCallback, useEffect, useId } from "react";
import { useAtomValue } from "jotai/react";
import { useDataTable } from "./hook";
import { useActionExecutor } from "../../../actions/executor";
import { AutoEmptyState } from "../../_base/auto-empty-state";
import type { AutoEmptyStateConfig } from "../../_base/auto-empty-state";
import { AutoSkeleton } from "../../_base/auto-skeleton";
import { ContextMenuPortal } from "../../_base/context-menu-portal";
import { useSharedDragDrop } from "../../_base/drag-drop-provider";
import { useLiveData } from "../../_base/use-live-data";
import { useReorderable } from "../../_base/use-reorderable";
import { ComponentRenderer } from "../../../manifest/renderer";
import {
  SortableContext,
  useDroppable,
  useSortable,
  verticalListSortingStrategy,
  getSortableStyle,
} from "../../../hooks/use-drag-drop";
import { useInfiniteScroll } from "../../../hooks/use-infinite-scroll";
import { useVirtualList } from "../../../hooks/use-virtual-list";
import type { ComponentConfig } from "../../../manifest/types";
import type { DataTableConfig, ResolvedColumn } from "./types";
import { wsManagerAtom } from "../../../../ws/atom";
import { Icon } from "../../../icons/icon";
import { useSubscribe } from "../../../context/hooks";
import { BUTTON_INTERACTIVE_CSS, getButtonStyle } from "../../_base/button-styles";

// ── Formatting helpers ──────────────────────────────────────────────────────

function formatCellValue(
  value: unknown,
  column: ResolvedColumn,
  row?: Record<string, unknown>,
): React.ReactNode {
  if (value == null) return "\u2014";

  switch (column.format) {
    case "date": {
      try {
        return new Intl.DateTimeFormat().format(new Date(String(value)));
      } catch {
        return String(value);
      }
    }
    case "number": {
      if (typeof value === "number") {
        return new Intl.NumberFormat().format(value);
      }
      return String(value);
    }
    case "currency": {
      if (typeof value === "number") {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(value);
      }
      return String(value);
    }
    case "badge": {
      const colorName = column.badgeColors?.[String(value)] ?? "muted";
      const badgeColorMap: Record<string, { bg: string; fg: string }> = {
        blue: {
          bg: "var(--sn-color-info, oklch(0.546 0.245 262.881))",
          fg: "var(--sn-color-info-foreground, #fff)",
        },
        green: {
          bg: "var(--sn-color-success, oklch(0.586 0.209 145.071))",
          fg: "var(--sn-color-success-foreground, #fff)",
        },
        red: {
          bg: "var(--sn-color-destructive, oklch(0.577 0.245 27.325))",
          fg: "var(--sn-color-destructive-foreground, #fff)",
        },
        gray: {
          bg: "var(--sn-color-muted, oklch(0.97 0 0))",
          fg: "var(--sn-color-muted-foreground, #64748b)",
        },
        yellow: {
          bg: "var(--sn-color-warning, oklch(0.681 0.162 75.834))",
          fg: "var(--sn-color-warning-foreground, #fff)",
        },
        success: {
          bg: "var(--sn-color-success, oklch(0.586 0.209 145.071))",
          fg: "var(--sn-color-success-foreground, #fff)",
        },
        warning: {
          bg: "var(--sn-color-warning, oklch(0.681 0.162 75.834))",
          fg: "var(--sn-color-warning-foreground, #fff)",
        },
        info: {
          bg: "var(--sn-color-info, oklch(0.546 0.245 262.881))",
          fg: "var(--sn-color-info-foreground, #fff)",
        },
        destructive: {
          bg: "var(--sn-color-destructive, oklch(0.577 0.245 27.325))",
          fg: "var(--sn-color-destructive-foreground, #fff)",
        },
        muted: {
          bg: "var(--sn-color-muted, oklch(0.97 0 0))",
          fg: "var(--sn-color-muted-foreground, #64748b)",
        },
        primary: {
          bg: "var(--sn-color-primary, oklch(0.205 0 0))",
          fg: "var(--sn-color-primary-foreground, #fff)",
        },
        secondary: {
          bg: "var(--sn-color-secondary, oklch(0.97 0 0))",
          fg: "var(--sn-color-secondary-foreground, #0f172a)",
        },
        accent: {
          bg: "var(--sn-color-accent, oklch(0.97 0 0))",
          fg: "var(--sn-color-accent-foreground, #0f172a)",
        },
      };
      const colors = badgeColorMap[colorName] ?? badgeColorMap.muted!;
      return (
        <span
          data-badge
          data-color={colorName}
          style={{
            display: "inline-block",
            padding: "var(--sn-spacing-xs, 2px) var(--sn-spacing-sm, 8px)",
            borderRadius: "var(--sn-radius-full, 9999px)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            backgroundColor: colors.bg,
            color: colors.fg,
          }}
        >
          {String(value)}
        </span>
      );
    }
    case "boolean": {
      return value ? "\u2713" : "\u2717";
    }
    case "avatar": {
      const src = column.avatarField
        ? String(row?.[column.avatarField] ?? "")
        : "";
      const name = String(value);
      const initials = name
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--sn-spacing-xs, 0.25rem)",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={name}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "var(--sn-radius-full, 9999px)",
                objectFit: "cover",
              }}
            />
          ) : (
            <span
              style={{
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "var(--sn-radius-full, 9999px)",
                backgroundColor: "var(--sn-color-primary, #2563eb)",
                color: "var(--sn-color-primary-foreground, #fff)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--sn-font-size-xs, 0.625rem)",
                fontWeight:
                  "var(--sn-font-weight-semibold, 600)" as unknown as number,
              }}
            >
              {initials || "?"}
            </span>
          )}
          <span>{name}</span>
        </span>
      );
    }
    case "progress": {
      const pct = typeof value === "number" ? value : Number(value) || 0;
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sn-spacing-sm, 0.5rem)",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "var(--sn-spacing-2xs, 6px)",
              backgroundColor: "var(--sn-color-muted, #e5e7eb)",
              borderRadius: "var(--sn-radius-full, 9999px)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(0, pct))}%`,
                height: "100%",
                backgroundColor:
                  pct >= 100
                    ? "var(--sn-color-success, #22c55e)"
                    : "var(--sn-color-primary, #2563eb)",
                borderRadius: "var(--sn-radius-full, 9999px)",
                transition:
                  "width var(--sn-duration-normal, 250ms) var(--sn-ease-out, ease-out)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "var(--sn-font-size-xs, 0.75rem)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
              minWidth: "2.5em",
              textAlign: "right",
            }}
          >
            {Math.round(pct)}%
          </span>
        </div>
      );
    }
    case "link": {
      const url = String(value);
      const text = column.linkTextField
        ? String(row?.[column.linkTextField] ?? url)
        : url;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--sn-color-info, #3b82f6)",
            textDecoration: "underline",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {text}
        </a>
      );
    }
    case "code": {
      return (
        <code
          style={{
            fontFamily: "var(--sn-font-mono, monospace)",
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            backgroundColor: "var(--sn-color-secondary, #f3f4f6)",
            padding: "var(--sn-spacing-2xs, 1px) var(--sn-spacing-xs, 0.25rem)",
            borderRadius: "var(--sn-radius-sm, 0.25rem)",
          }}
        >
          {String(value)}
        </code>
      );
    }
    default: {
      const s = String(value);
      if (column.prefix || column.suffix) {
        return `${column.prefix ?? ""}${s}${column.suffix ?? ""}`;
      }
      return s;
    }
  }
}

// ── Sort indicator ──────────────────────────────────────────────────────────

function SortIndicator({
  column,
  sort,
}: {
  column: string;
  sort: { column: string; direction: "asc" | "desc" } | null;
}) {
  if (!sort || sort.column !== column) return <span aria-hidden> </span>;
  return (
    <span
      aria-label={
        sort.direction === "asc" ? "sorted ascending" : "sorted descending"
      }
    >
      {sort.direction === "asc" ? " \u25B2" : " \u25BC"}
    </span>
  );
}

// ── Density styles ──────────────────────────────────────────────────────────

function getDensityPadding(
  density: "compact" | "default" | "comfortable",
): string {
  switch (density) {
    case "compact":
      return "var(--sn-spacing-xs, 4px) var(--sn-spacing-sm, 8px)";
    case "comfortable":
      return "var(--sn-spacing-md, 12px) var(--sn-spacing-lg, 16px)";
    default:
      return "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)";
  }
}

function toAutoEmptyStateConfig(
  empty: DataTableConfig["empty"],
): AutoEmptyStateConfig | null {
  if (!empty) {
    return null;
  }

  return {
    icon: empty.icon,
    title: empty.title,
    description: empty.description,
    ...(empty.action?.action
      ? {
          action: {
            label: empty.action.label,
            action: empty.action.action,
            icon: empty.action.icon,
            variant: empty.action.variant,
          },
        }
      : {}),
  };
}

// ── Toolbar button ──────────────────────────────────────────────────────────

function ToolbarButton({
  item,
  execute,
}: {
  item: NonNullable<DataTableConfig["toolbar"]>[number];
  execute: ReturnType<typeof useActionExecutor>;
}) {
  const disabled = useSubscribe(item.disabled ?? false) as boolean;
  const variant = item.variant ?? "outline";
  return (
    <button
      type="button"
      data-sn-button=""
      data-variant={variant}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        void execute(item.action as Parameters<typeof execute>[0]);
      }}
      style={{
        ...getButtonStyle(variant, "sm", disabled),
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--sn-spacing-xs, 0.25rem)",
        fontSize: "var(--sn-font-size-sm, 0.875rem)",
        opacity: 1,
        filter: disabled ? "saturate(0.55) brightness(0.97)" : undefined,
      }}
    >
      {item.icon && <Icon name={item.icon} size={14} />}
      {item.label}
    </button>
  );
}

// ── Loading skeleton ────────────────────────────────────────────────────────

function SkeletonRows({
  columnCount,
  rowCount,
}: {
  columnCount: number;
  rowCount: number;
}) {
  return (
    <>
      {Array.from({ length: rowCount }, (_, i) => (
        <tr key={i} data-skeleton>
          {Array.from({ length: columnCount }, (_, j) => (
            <td key={j} style={{ padding: "var(--sn-spacing-sm, 8px)" }}>
              <div
                style={{
                  height: "1em",
                  borderRadius: "var(--sn-radius-sm, 4px)",
                  backgroundColor: "var(--sn-color-muted, #e5e7eb)",
                  opacity: "var(--sn-opacity-muted, 0.5)" as unknown as number,
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ── Infinite scroll sentinel ─────────────────────────────────────────────────

/**
 * Invisible sentinel element that triggers loading the next page when it
 * enters the viewport via IntersectionObserver.
 */
function SortableTableRow({
  id,
  containerId,
  children,
  style,
  dataSelected,
  onClick,
  onContextMenu,
}: {
  id: string;
  containerId: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  dataSelected?: string;
  onClick?: () => void;
  onContextMenu?: (event: React.MouseEvent) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      kind: "snapshot-shared-dnd-item",
      containerId,
    },
  });

  return (
    <tr
      ref={setNodeRef}
      data-selected={dataSelected}
      style={{
        ...style,
        ...getSortableStyle(transform, transition, isDragging),
      }}
      onClick={onClick}
      onContextMenu={onContextMenu}
      {...attributes}
      {...listeners}
    >
      {children}
    </tr>
  );
}

function DroppableTableBody({
  containerId,
  children,
}: {
  containerId: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `container:${containerId}`,
    data: {
      kind: "snapshot-shared-dnd-container",
      containerId,
    },
  });

  return (
    <tbody
      ref={setNodeRef}
      style={{
        backgroundColor: isOver
          ? "color-mix(in oklch, var(--sn-color-primary, #2563eb) 3%, transparent)"
          : undefined,
        transition:
          "background-color var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
      }}
    >
      {children}
    </tbody>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

/**
 * Config-driven DataTable component.
 *
 * Renders an HTML table with sorting, pagination, filtering, selection,
 * search, row actions, and bulk actions. All behavior is driven by
 * the `DataTableConfig` schema.
 *
 * Publishes state via `usePublish` when `id` is set:
 * `{ selected, selectedRows, selectedIds, filters, sort, page, search, data }`
 *
 * @param props - Component props containing the DataTable configuration
 *
 * @example
 * ```tsx
 * <DataTable config={{
 *   type: 'data-table',
 *   data: { from: 'my-data-source' },
 *   columns: 'auto',
 *   selectable: true,
 *   searchable: true,
 * }} />
 * ```
 */
export function DataTable({ config }: { config: DataTableConfig }) {
  const table = useDataTable(config);
  const execute = useActionExecutor();
  const wsManager = useAtomValue(wsManagerAtom);
  const sharedDragDrop = useSharedDragDrop();
  const generatedId = useId();
  const density = config.density ?? "default";
  const cellPadding = getDensityPadding(density);
  const draggable = config.draggable ?? false;
  const dropEnabled =
    draggable ||
    Boolean(config.dropTargets?.length) ||
    config.onDrop !== undefined;
  const reorderAction = config.onReorder ?? config.reorderAction;
  const containerId = useMemo(
    () => config.id ?? `data-table-${generatedId.replace(/[:]/g, "")}`,
    [config.id, generatedId],
  );
  const [contextMenuState, setContextMenuState] = useState<{
    x: number;
    y: number;
    context?: Record<string, unknown>;
  } | null>(null);
  const {
    orderedItems: orderedRows,
    itemIds: rowIds,
    moveItem,
    removeItem,
    insertItem,
  } = useReorderable({
      items: table.rows,
      getKey: (row) => {
        const record = row as Record<string, unknown>;
        const id = record["id"] ?? record["_id"];
        return typeof id === "string" || typeof id === "number" ? id : undefined;
      },
      onReorder: reorderAction
        ? ({ oldIndex, newIndex, item, items }) =>
            execute(reorderAction, {
              oldIndex,
              newIndex,
              item,
              items,
            })
        : undefined,
    });
  const renderedRows = dropEnabled ? orderedRows : table.rows;
  const infiniteScrollRef = useInfiniteScroll({
    hasNextPage: table.hasMore,
    isLoading: table.isLoading,
    loadNextPage: table.nextPage,
    threshold:
      typeof config.pagination === "object"
        ? config.pagination.infiniteThreshold
        : undefined,
  });
  // Determine if we need an actions column
  const hasActions = (config.actions?.length ?? 0) > 0;
  const virtualConfig = useMemo(
    () =>
      typeof config.virtualize === "object"
        ? config.virtualize
        : config.virtualize
          ? { itemHeight: 48, overscan: 5 }
          : null,
    [config.virtualize],
  );
  const virtualList = useVirtualList({
    totalCount: renderedRows.length,
    itemHeight: virtualConfig?.itemHeight ?? 48,
    overscan: virtualConfig?.overscan ?? 5,
  });
  const liveConfig = useMemo(
    () =>
      config.live === true
        ? { event: "*", indicator: false, debounce: undefined }
        : config.live
          ? {
              event: config.live.event,
              indicator: config.live.indicator,
              debounce: config.live.debounce,
            }
          : null,
    [config.live],
  );
  const { hasNewData, refresh } = useLiveData({
    event: liveConfig?.event ?? "*",
    onRefresh: table.refetch,
    debounce: liveConfig?.debounce,
    indicator: liveConfig?.indicator,
    wsManager,
    enabled: liveConfig !== null,
  });

  // Expandable row state
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(
    new Set(),
  );
  const toggleExpandRow = useCallback((id: string | number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Column count for skeleton and colSpan
  const totalColumns =
    table.columns.length +
    (draggable ? 1 : 0) +
    (config.selectable ? 1 : 0) +
    (hasActions ? 1 : 0) +
    (config.expandable ? 1 : 0);

  // Search fields placeholder
  const searchPlaceholder = useMemo(() => {
    if (
      typeof config.searchable === "object" &&
      config.searchable.placeholder
    ) {
      return config.searchable.placeholder;
    }
    return "Search...";
  }, [config.searchable]);
  const emptyStateConfig = useMemo(
    () => toAutoEmptyStateConfig(config.empty),
    [config.empty],
  );

  // Bulk actions toolbar
  const showBulkActions =
    config.bulkActions &&
    config.bulkActions.length > 0 &&
    table.selectedIds.length > 0;

  useEffect(() => {
    if (!sharedDragDrop || !dropEnabled) {
      return;
    }

    return sharedDragDrop.registerContainer({
      id: containerId,
      dragGroup: config.dragGroup,
      dropTargets: config.dropTargets,
      moveItem,
      removeItem,
      insertItem,
      onDrop: config.onDrop
        ? ({ item, source, target, index, items }) =>
            execute(config.onDrop!, {
              item,
              source,
              target,
              index,
              items,
            })
        : undefined,
    });
  }, [
    config.dragGroup,
    config.dropTargets,
    config.onDrop,
    containerId,
    dropEnabled,
    execute,
    insertItem,
    moveItem,
    removeItem,
    sharedDragDrop,
  ]);

  const renderRow = (
    row: Record<string, unknown>,
    rowIndex: number,
    sortable: boolean,
    sortableId?: string,
  ): React.ReactNode => {
    const id = row["id"];
    const rowId =
      typeof id === "string" || typeof id === "number" ? id : rowIndex;
    const isExpanded = expandedRows.has(rowId);

    const rowStyle: React.CSSProperties = {
      backgroundColor: table.selection.has(rowId)
        ? "var(--sn-color-accent, #dbeafe)"
        : undefined,
      cursor:
        config.expandable || config.rowClickAction || draggable
          ? "pointer"
          : undefined,
    };

    const rowChildren = (
      <>
        {config.expandable && (
          <td style={{ padding: cellPadding, width: "32px" }}>
            <span
              style={{
                display: "inline-flex",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition:
                  "transform var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
                color: "var(--sn-color-muted-foreground, #6b7280)",
              }}
            >
              &#x25B6;
            </span>
          </td>
        )}
        {draggable && (
          <td style={{ padding: cellPadding, width: "32px" }}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                color: "var(--sn-color-muted-foreground, #6b7280)",
              }}
            >
              &#x22EE;
            </span>
          </td>
        )}
        {config.selectable && (
          <td style={{ padding: cellPadding, width: "40px" }}>
            <input
              type="checkbox"
              checked={table.selection.has(rowId)}
              onChange={() => table.toggleRow(rowId)}
              aria-label={`Select row ${rowId}`}
            />
          </td>
        )}
        {table.columns.map((col) => (
          <td
            key={col.field}
            style={{
              padding: cellPadding,
              textAlign: col.align ?? "left",
            }}
          >
            {formatCellValue(row[col.field], col, row)}
          </td>
        ))}
        {hasActions && (
          <td style={{ padding: cellPadding, textAlign: "right" }}>
            <div
              style={{
                display: "flex",
                gap: "var(--sn-spacing-xs, 4px)",
                justifyContent: "flex-end",
              }}
            >
              {config.actions!.map((action, actionIndex) => {
                if (
                  action.visible === false ||
                  (typeof action.visible === "boolean" && !action.visible)
                ) {
                  return null;
                }

                return (
                  <button
                    type="button"
                    key={actionIndex}
                    data-row-action
                    onClick={() =>
                      void execute(action.action, {
                        row,
                        ...row,
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {action.label}
                  </button>
                );
              })}
            </div>
          </td>
        )}
      </>
    );

    const onRowClick = config.expandable
      ? () => toggleExpandRow(rowId)
      : config.rowClickAction
        ? () =>
            void execute(config.rowClickAction!, {
              row,
              ...row,
            })
        : undefined;

    const onRowContextMenu = config.contextMenu
      ? (event: React.MouseEvent) => {
          event.preventDefault();
          setContextMenuState({
            x: event.clientX,
            y: event.clientY,
            context: { row, ...row },
          });
        }
      : undefined;

    return (
      <React.Fragment key={rowId}>
        {sortable ? (
          <SortableTableRow
            id={sortableId ?? String(rowId)}
            containerId={containerId}
            dataSelected={table.selection.has(rowId) ? "" : undefined}
            style={rowStyle}
            onClick={onRowClick}
            onContextMenu={onRowContextMenu}
          >
            {rowChildren}
          </SortableTableRow>
        ) : (
          <tr
            data-selected={table.selection.has(rowId) ? "" : undefined}
            onClick={onRowClick}
            onContextMenu={onRowContextMenu}
            style={rowStyle}
          >
            {rowChildren}
          </tr>
        )}
        {config.expandable && isExpanded && config.expandedContent && (
          <tr data-expanded-row>
            <td
              colSpan={totalColumns}
              style={{
                padding: cellPadding,
                backgroundColor: "var(--sn-color-secondary, #f8fafc)",
                borderBottom: "1px solid var(--sn-color-border, #e5e7eb)",
              }}
            >
              {config.expandedContent.map((child, ci) => (
                <ComponentRenderer
                  key={ci}
                  config={child as ComponentConfig}
                />
              ))}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };
  const visibleRowEntries = virtualConfig
    ? virtualList.visibleIndices.map((rowIndex) => ({
        row: renderedRows[rowIndex] as Record<string, unknown>,
        rowIndex,
        sortableId: rowIds[rowIndex],
      }))
    : renderedRows.map((row, rowIndex) => ({
        row: row as Record<string, unknown>,
        rowIndex,
        sortableId: rowIds[rowIndex],
      }));
  const topSpacerHeight = virtualConfig ? virtualList.offsetTop : 0;
  const bottomSpacerHeight = virtualConfig
    ? Math.max(
        0,
        virtualList.totalHeight -
          topSpacerHeight -
          visibleRowEntries.length * (virtualConfig.itemHeight ?? 48),
      )
    : 0;

  return (
    <>
      <style>{`
[data-snapshot-component="data-table"] tr[style*="cursor"]:hover,
[data-snapshot-component="data-table"] tr[data-selected]:hover { background-color: var(--sn-color-secondary, #f3f4f6) !important; }
[data-snapshot-component="data-table"] th[style*="cursor: pointer"]:hover { color: var(--sn-color-primary, #2563eb); }
[data-snapshot-component="data-table"] th[style*="cursor: pointer"]:focus { outline: none; }
[data-snapshot-component="data-table"] th[style*="cursor: pointer"]:focus-visible { outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb)); outline-offset: var(--sn-ring-offset, 2px); }
[data-snapshot-component="data-table"] [data-table-pagination] button:hover:not(:disabled) { background-color: var(--sn-color-secondary, #f3f4f6); }
[data-snapshot-component="data-table"] [data-table-pagination] button:focus { outline: none; }
[data-snapshot-component="data-table"] [data-table-pagination] button:focus-visible { outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb)); outline-offset: var(--sn-ring-offset, 2px); }
[data-snapshot-component="data-table"] input[type="checkbox"]:focus { outline: none; }
[data-snapshot-component="data-table"] input[type="checkbox"]:focus-visible { outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb)); outline-offset: var(--sn-ring-offset, 2px); }
[data-snapshot-component="data-table"] [data-row-action]:hover { background-color: var(--sn-color-secondary, #f3f4f6); }
[data-snapshot-component="data-table"] [data-row-action]:focus { outline: none; }
[data-snapshot-component="data-table"] [data-row-action]:focus-visible { outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb)); outline-offset: var(--sn-ring-offset, 2px); }
[data-snapshot-component="data-table"] [data-bulk-action]:hover { background-color: var(--sn-color-secondary, #f3f4f6); }
[data-snapshot-component="data-table"] [data-bulk-action]:focus { outline: none; }
[data-snapshot-component="data-table"] [data-bulk-action]:focus-visible { outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb)); outline-offset: var(--sn-ring-offset, 2px); }
      `}</style>
      {hasNewData ? (
        <div
          data-table-live-indicator=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--sn-radius-md, 0.5rem)",
            backgroundColor: "var(--sn-color-secondary, #f3f4f6)",
          }}
        >
          <span>New data available</span>
          <button type="button" onClick={refresh}>
            Refresh
          </button>
        </div>
      ) : null}
      {/* Table header: search + toolbar */}
      {(config.searchable || config.toolbar?.length) ? (
        <div
          data-table-search
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: config.searchable ? "space-between" : "flex-end",
            gap: "var(--sn-spacing-sm, 0.5rem)",
            marginBottom: "var(--sn-spacing-md, 12px)",
          }}
        >
          {config.searchable && (
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={table.search}
              onChange={(e) => table.setSearch(e.target.value)}
              aria-label="Search table"
              style={{
                padding: "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)",
                borderRadius: "var(--sn-radius-md, 6px)",
                border:
                  "var(--sn-border-default, 1px) solid var(--sn-color-border, #d1d5db)",
                flex: "1 1 auto",
                maxWidth: "min(320px, 100%)",
              }}
            />
          )}
          {config.toolbar?.length ? (
            <div style={{ display: "flex", gap: "var(--sn-spacing-xs, 0.25rem)", flexShrink: 0 }}>
              <style>{BUTTON_INTERACTIVE_CSS}</style>
              {config.toolbar.map((item, i) => (
                <ToolbarButton key={i} item={item} execute={execute} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Bulk actions toolbar */}
      {showBulkActions && (
        <div
          data-table-bulk-actions
          role="toolbar"
          aria-label="Bulk actions"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sn-spacing-sm, 8px)",
            padding: "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)",
            marginBottom: "var(--sn-spacing-sm, 8px)",
            backgroundColor: "var(--sn-color-muted, #f3f4f6)",
            borderRadius: "var(--sn-radius-md, 6px)",
          }}
        >
          <span>{table.selectedIds.length} selected</span>
          {config.bulkActions!.map((bulkAction, i) => (
            <button
              type="button"
              key={i}
              data-bulk-action
              onClick={() =>
                void execute(bulkAction.action, {
                  selectedRows: table.selectedRows,
                  selectedIds: table.selectedIds,
                  count: table.selectedIds.length,
                })
              }
              style={{ cursor: "pointer" }}
            >
              {bulkAction.label.replace(
                "{count}",
                String(table.selectedIds.length),
              )}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div
        ref={virtualConfig ? virtualList.containerRef : undefined}
        style={{
          overflowX: "auto",
          overflowY: virtualConfig ? "auto" : undefined,
          maxHeight: virtualConfig ? `${(virtualConfig.itemHeight ?? 48) * 8}px` : undefined,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "auto",
          }}
        >
          <thead>
            <tr>
              {/* Expand column header */}
              {config.expandable && (
                <th style={{ padding: cellPadding, width: "32px" }} />
              )}
              {draggable && (
                <th style={{ padding: cellPadding, width: "32px" }} />
              )}
              {/* Select all checkbox */}
              {config.selectable && (
                <th style={{ padding: cellPadding, width: "40px" }}>
                  <input
                    type="checkbox"
                    onChange={() => table.toggleAll()}
                    checked={
                      renderedRows.length > 0 &&
                      renderedRows.every((row, i) => {
                        const id = (row as Record<string, unknown>)["id"];
                        const rowId =
                          typeof id === "string" || typeof id === "number"
                            ? id
                            : i;
                        return table.selection.has(rowId);
                      })
                    }
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {/* Column headers */}
              {table.columns.map((col) => (
                <th
                  key={col.field}
                  style={{
                    padding: cellPadding,
                    textAlign: col.align ?? "left",
                    cursor: col.sortable ? "pointer" : "default",
                    width: col.width,
                    userSelect: "none",
                  }}
                  onClick={
                    col.sortable
                      ? () => table.setSortColumn(col.field)
                      : undefined
                  }
                  aria-sort={
                    table.sort?.column === col.field
                      ? table.sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {col.label}
                  {col.sortable && (
                    <SortIndicator column={col.field} sort={table.sort} />
                  )}
                </th>
              ))}

              {/* Actions column header */}
              {hasActions && (
                <th style={{ padding: cellPadding, textAlign: "right" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <DroppableTableBody containerId={containerId}>
            {/* Loading state */}
            {table.isLoading &&
              (config.loading && !config.loading.disabled ? (
                <tr>
                  <td colSpan={totalColumns} style={{ padding: cellPadding }}>
                    <AutoSkeleton componentType="data-table" config={config.loading} />
                  </td>
                </tr>
              ) : (
                <SkeletonRows columnCount={totalColumns} rowCount={5} />
              ))}

            {/* Error state */}
            {table.error && (
              <tr>
                <td
                  colSpan={totalColumns}
                  style={{ padding: cellPadding, textAlign: "center" }}
                >
                  <div data-table-error role="alert">
                    Error: {table.error.message}
                  </div>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!table.isLoading && !table.error && renderedRows.length === 0 && (
              <tr>
                <td
                  colSpan={totalColumns}
                  style={{ padding: cellPadding, textAlign: "center" }}
                >
                  {emptyStateConfig ? (
                    <AutoEmptyState config={emptyStateConfig} />
                  ) : (
                    <div data-table-empty>
                      {config.emptyMessage ?? "No data available"}
                    </div>
                  )}
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!table.isLoading &&
              !table.error &&
              (draggable ? (
                <SortableContext
                  items={rowIds}
                  strategy={verticalListSortingStrategy}
                >
                  <>
                    {topSpacerHeight > 0 ? (
                      <tr aria-hidden="true">
                        <td colSpan={totalColumns} style={{ height: `${topSpacerHeight}px`, padding: 0 }} />
                      </tr>
                    ) : null}
                    {visibleRowEntries.map(({ row, rowIndex, sortableId }) =>
                      renderRow(row, rowIndex, true, sortableId),
                    )}
                    {bottomSpacerHeight > 0 ? (
                      <tr aria-hidden="true">
                        <td colSpan={totalColumns} style={{ height: `${bottomSpacerHeight}px`, padding: 0 }} />
                      </tr>
                    ) : null}
                  </>
                </SortableContext>
              ) : (
                <>
                  {topSpacerHeight > 0 ? (
                    <tr aria-hidden="true">
                      <td colSpan={totalColumns} style={{ height: `${topSpacerHeight}px`, padding: 0 }} />
                    </tr>
                  ) : null}
                  {visibleRowEntries.map(({ row, rowIndex }) =>
                    renderRow(row, rowIndex, false),
                  )}
                  {bottomSpacerHeight > 0 ? (
                    <tr aria-hidden="true">
                      <td colSpan={totalColumns} style={{ height: `${bottomSpacerHeight}px`, padding: 0 }} />
                    </tr>
                  ) : null}
                </>
              ))}
          </DroppableTableBody>
        </table>
      </div>

      {/* Infinite scroll sentinel */}
      {table.isInfiniteScroll && table.hasMore && (
        <div ref={infiniteScrollRef} style={{ height: 1 }} />
      )}

      {/* Pagination controls (hidden for infinite scroll) */}
      {table.pagination && table.pagination.totalPages > 1 && !table.isInfiniteScroll && (
        <div
          data-table-pagination
          role="navigation"
          aria-label="Table pagination"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--sn-spacing-sm, 8px) 0",
            marginTop: "var(--sn-spacing-sm, 8px)",
          }}
        >
          <span>
            Page {table.pagination.currentPage} of {table.pagination.totalPages}
          </span>
          <div style={{ display: "flex", gap: "var(--sn-spacing-xs, 4px)" }}>
            <button
              type="button"
              onClick={() => table.prevPage()}
              disabled={table.pagination!.currentPage <= 1}
              aria-label="Previous page"
              data-testid="table-pagination-prev"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={
                table.pagination!.currentPage >= table.pagination!.totalPages
              }
              aria-label="Next page"
              data-testid="table-pagination-next"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {config.contextMenu ? (
        <ContextMenuPortal
          items={config.contextMenu}
          state={contextMenuState}
          onClose={() => setContextMenuState(null)}
        />
      ) : null}
    </>
  );
}
