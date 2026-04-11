'use client';

import React, { useEffect, useId, useMemo, useState } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { useResolveFrom } from "../../../context/hooks";
import { useComponentData } from "../../_base/use-component-data";
import { applyClientFilters, applyClientSort } from "../../_base/client-data-ops";
import { ContextMenuPortal } from "../../_base/context-menu-portal";
import { useSharedDragDrop } from "../../_base/drag-drop-provider";
import { useReorderable } from "../../_base/use-reorderable";
import { Icon } from "../../../icons/index";
import {
  SortableContext,
  useDroppable,
  useSortable,
  verticalListSortingStrategy,
  getSortableStyle,
} from "../../../hooks/use-drag-drop";
import type { ListConfig, ListItemConfig } from "./types";
import type { ActionConfig, ActionExecuteFn } from "../../../actions/types";

/**
 * Badge pill component for list items.
 */
function ListBadge({ text, color }: { text: string; color?: string }) {
  const colorToken = color ?? "primary";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0 var(--sn-spacing-xs, 0.25rem)",
        borderRadius: "var(--sn-radius-full, 9999px)",
        fontSize: "var(--sn-font-size-xs, 0.75rem)",
        fontWeight: "var(--sn-font-weight-semibold, 600)" as unknown as number,
        backgroundColor: `var(--sn-color-${colorToken}, #2563eb)`,
        color: `var(--sn-color-${colorToken}-foreground, #ffffff)`,
        lineHeight: "var(--sn-leading-normal, 1.5)",
      }}
    >
      {text}
    </span>
  );
}

/**
 * Skeleton placeholder row for loading state.
 */
function ListSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
      }}
    >
      <div
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "var(--sn-radius-sm, 0.25rem)",
          backgroundColor: "var(--sn-color-muted, #e5e7eb)",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "0.75rem",
            width: "40%",
            backgroundColor: "var(--sn-color-muted, #e5e7eb)",
            borderRadius: "var(--sn-radius-sm, 0.25rem)",
            marginBottom: "var(--sn-spacing-xs, 0.25rem)",
          }}
        />
        <div
          style={{
            height: "0.625rem",
            width: "60%",
            backgroundColor: "var(--sn-color-muted, #e5e7eb)",
            borderRadius: "var(--sn-radius-sm, 0.25rem)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Single list item renderer.
 */
function ListItem({
  item,
  selectable,
  showDivider,
  isCard,
  draggable,
  execute,
  onContextMenu,
}: {
  item: ListItemConfig;
  selectable: boolean;
  showDivider: boolean;
  isCard: boolean;
  draggable: boolean;
  execute: (action: ActionConfig | ActionConfig[]) => Promise<void>;
  onContextMenu?: (event: React.MouseEvent) => void;
}) {
  const isClickable = selectable && (item.action != null || item.href != null);

  const handleClick = () => {
    if (item.action) {
      void execute(item.action);
    }
  };

  const content = (
    <div
      data-list-item=""
      data-testid="list-item"
      onClick={isClickable ? handleClick : undefined}
      onContextMenu={onContextMenu}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") handleClick();
            }
          : undefined
      }
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
        cursor: isClickable ? "pointer" : undefined,
        transition: `background-color var(--sn-duration-fast, 150ms) var(--sn-ease-out, ease-out)`,
        ...(isCard
          ? {
              border:
                "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
              borderRadius: "var(--sn-radius-md, 0.5rem)",
              boxShadow: "var(--sn-shadow-sm, 0 1px 2px rgba(0,0,0,0.05))",
              backgroundColor: "var(--sn-color-card, #ffffff)",
            }
          : {}),
      }}
      onMouseEnter={
        isClickable
          ? (e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--sn-color-accent, #f3f4f6)";
            }
          : undefined
      }
      onMouseLeave={
        isClickable
          ? (e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = isCard
                ? "var(--sn-color-card, #ffffff)"
                : "";
            }
          : undefined
      }
    >
      {draggable ? (
        <span
          aria-hidden="true"
          style={{
            color: "var(--sn-color-muted-foreground, #6b7280)",
            flexShrink: 0,
          }}
        >
          <Icon name="grip-vertical" size={16} />
        </span>
      ) : null}
      {/* Icon */}
      {item.icon && (
        <span
          aria-hidden="true"
          style={{
            color: "var(--sn-color-muted-foreground, #6b7280)",
            flexShrink: 0,
          }}
        >
          <Icon name={item.icon} size={20} />
        </span>
      )}

      {/* Title + Description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            fontWeight:
              "var(--sn-font-weight-medium, 500)" as unknown as number,
            color: "var(--sn-color-foreground, #111827)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </div>
        {item.description && (
          <div
            style={{
              fontSize: "var(--sn-font-size-xs, 0.75rem)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.description}
          </div>
        )}
      </div>

      {/* Badge */}
      {item.badge && <ListBadge text={item.badge} color={item.badgeColor} />}
    </div>
  );

  return (
    <>
      {item.href && !item.action ? (
        <a
          href={item.href}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {content}
        </a>
      ) : (
        content
      )}
      {showDivider && (
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--sn-color-border, #e5e7eb)",
          }}
        />
      )}
    </>
  );
}

/**
 * Sortable wrapper for list items when drag-and-drop is enabled.
 */
function SortableListItem({
  id,
  containerId,
  children,
}: {
  id: string;
  containerId: string;
  children: React.ReactNode;
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

  const style = getSortableStyle(transform, transition, isDragging);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function DroppableListBody({
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
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver
          ? "color-mix(in oklch, var(--sn-color-primary, #2563eb) 4%, transparent)"
          : undefined,
        borderRadius: "var(--sn-radius-md, 0.5rem)",
        transition:
          "background-color var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * List component — renders a vertical list of items with optional
 * icons, descriptions, badges, and click actions.
 *
 * Supports both static items (via `items` config) and dynamic items
 * fetched from an API endpoint (via `data` config). Provides loading
 * skeletons and an empty state message.
 *
 * @param props.config - The list config from the manifest
 */
export function ListComponent({ config }: { config: ListConfig }) {
  const execute = useActionExecutor();
  const generatedId = useId();
  const variant = config.variant ?? "default";
  const showDivider = config.divider !== false && variant !== "card";
  const selectable = config.selectable ?? false;
  const sortable = config.draggable ?? config.sortable ?? false;
  const dropEnabled =
    sortable ||
    Boolean(config.dropTargets?.length) ||
    config.onDrop !== undefined;
  const emptyMessage = config.emptyMessage ?? "No items";
  const containerId = useMemo(
    () => config.id ?? `list-${generatedId.replace(/[:]/g, "")}`,
    [config.id, generatedId],
  );
  const [contextMenuState, setContextMenuState] = useState<{
    x: number;
    y: number;
    context?: Record<string, unknown>;
  } | null>(null);

  // Fetch data if endpoint is provided
  const { data, isLoading, error } = useComponentData(
    config.data ?? "",
    undefined,
    { poll: config.poll },
  );

  // Resolve items: static config or mapped from data
  const hasEndpoint = config.data != null;
  let resolvedItems: ListItemConfig[] = [];
  if (!hasEndpoint && config.items) {
    resolvedItems = config.items;
  } else if (hasEndpoint && data) {
    const dataArray = Array.isArray(data)
      ? data
      : ((data as Record<string, unknown>).items ??
        (data as Record<string, unknown>).data ??
        []);
    if (Array.isArray(dataArray)) {
      resolvedItems = dataArray.map(
        (row: Record<string, unknown>): ListItemConfig => ({
          id:
            typeof row.id === "string" || typeof row.id === "number"
              ? String(row.id)
              : typeof row._id === "string" || typeof row._id === "number"
                ? String(row._id)
                : undefined,
          title: String(row[config.titleField ?? "title"] ?? row.name ?? ""),
          description: config.descriptionField
            ? String(row[config.descriptionField] ?? "")
            : undefined,
          icon: config.iconField
            ? String(row[config.iconField] ?? "")
            : undefined,
        }),
      );
    }
  }

  const resolvedClientFilters = useResolveFrom(
    config.clientFilter ?? [],
  ) as Array<{
    field: string;
    operator:
      | "equals"
      | "contains"
      | "startsWith"
      | "endsWith"
      | "gt"
      | "lt"
      | "gte"
      | "lte"
      | "in"
      | "notEquals";
    value: unknown;
  }>;
  const resolvedClientSort = useResolveFrom(
    config.clientSort ?? [],
  ) as Array<{
    field: string;
    direction: "asc" | "desc";
  }>;

  const visibleItems = useMemo(() => {
    const normalizedItems = resolvedItems.map((item) => ({
      ...item,
      title: item.title,
      description: item.description,
      icon: item.icon,
      badge: item.badge,
      badgeColor: item.badgeColor,
      href: item.href,
      action: item.action,
      id: item.id,
    }));
    const filtered =
      resolvedClientFilters.length > 0
        ? applyClientFilters(normalizedItems, resolvedClientFilters)
        : normalizedItems;
    return resolvedClientSort.length > 0
      ? applyClientSort(filtered, resolvedClientSort)
      : filtered;
  }, [resolvedClientFilters, resolvedClientSort, resolvedItems]);
  const limitedItems = useMemo(
    () =>
      config.limit && config.limit > 0
        ? visibleItems.slice(0, config.limit)
        : visibleItems,
    [config.limit, visibleItems],
  );

  const containerStyle: React.CSSProperties =
    variant === "bordered"
      ? {
          border:
            "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
          borderRadius: "var(--sn-radius-md, 0.5rem)",
          overflow: "hidden",
        }
      : variant === "card"
        ? {
            display: "flex",
            flexDirection: "column",
            gap: "var(--sn-spacing-sm, 0.5rem)",
          }
        : {};

  return (
    <div
      data-snapshot-component="list"
      data-testid="list"
      className={config.className}
      style={{ ...containerStyle, ...(config.style as React.CSSProperties) }}
    >
      <style>{`
[data-snapshot-component="list"] [data-list-item][role="button"]:focus { outline: none; }
[data-snapshot-component="list"] [data-list-item][role="button"]:focus-visible { outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb)); outline-offset: var(--sn-ring-offset, 2px); border-radius: var(--sn-radius-md, 0.5rem); }
      `}</style>
      {/* Loading state */}
      {isLoading && (
        <div data-testid="list-loading">
          {[0, 1, 2].map((i) => (
            <ListSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div
          data-testid="list-error"
          style={{
            padding: "var(--sn-spacing-md, 1rem)",
            color: "var(--sn-color-destructive, #dc2626)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            textAlign: "center",
          }}
        >
          {config.errorMessage ?? "Failed to load items"}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && limitedItems.length === 0 && (
        <div
          data-testid="list-empty"
          style={{
            padding: "var(--sn-spacing-lg, 1.5rem)",
            color: "var(--sn-color-muted-foreground, #6b7280)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            textAlign: "center",
          }}
        >
          {emptyMessage}
        </div>
      )}

      {/* Items */}
      {!isLoading && !error && dropEnabled ? (
        <ManagedListItems
          containerId={containerId}
          items={limitedItems}
          selectable={selectable}
          showDivider={showDivider}
          isCard={variant === "card"}
          execute={execute}
          draggable={sortable}
          dragGroup={config.dragGroup}
          dropTargets={config.dropTargets}
          contextMenu={config.contextMenu}
          onOpenContextMenu={setContextMenuState}
          onDropAction={config.onDrop}
          reorderAction={config.onReorder ?? config.reorderAction}
        />
      ) : (
        !isLoading &&
        !error &&
        limitedItems.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            selectable={selectable}
            showDivider={showDivider && index < limitedItems.length - 1}
            isCard={variant === "card"}
            draggable={sortable}
            execute={execute}
            onContextMenu={
              config.contextMenu
                ? (event) => {
                    event.preventDefault();
                    setContextMenuState({
                      x: event.clientX,
                      y: event.clientY,
                      context: item as unknown as Record<string, unknown>,
                    });
                  }
                : undefined
            }
          />
        ))
      )}
      {config.contextMenu ? (
        <ContextMenuPortal
          items={config.contextMenu}
          state={contextMenuState}
          onClose={() => setContextMenuState(null)}
        />
      ) : null}
    </div>
  );
}

/** Managed list items wrapper with shared DnD registration. */
function ManagedListItems({
  containerId,
  items: initialItems,
  selectable,
  showDivider,
  isCard,
  execute,
  draggable,
  dragGroup,
  dropTargets,
  contextMenu,
  onOpenContextMenu,
  onDropAction,
  reorderAction,
}: {
  containerId: string;
  items: ListItemConfig[];
  selectable: boolean;
  showDivider: boolean;
  isCard: boolean;
  execute: ActionExecuteFn;
  draggable: boolean;
  dragGroup?: string;
  dropTargets?: string[];
  contextMenu?: ListConfig["contextMenu"];
  onOpenContextMenu: (state: { x: number; y: number; context?: Record<string, unknown> } | null) => void;
  onDropAction?: ActionConfig;
  reorderAction?: ActionConfig;
}) {
  const sharedDragDrop = useSharedDragDrop();
  const { orderedItems, itemIds, insertItem, moveItem, removeItem } =
    useReorderable({
    items: initialItems,
    getKey: (item) => item.id ?? item.href ?? item.title,
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

  useEffect(() => {
    if (!sharedDragDrop) {
      return;
    }

    return sharedDragDrop.registerContainer({
      id: containerId,
      dragGroup,
      dropTargets,
      moveItem,
      removeItem,
      insertItem,
      onDrop: onDropAction
        ? ({ item, source, target, index, items }) =>
            execute(onDropAction, {
              item,
              source,
              target,
              index,
              items,
            })
        : undefined,
    });
  }, [
    containerId,
    dragGroup,
    dropTargets,
    execute,
    insertItem,
    moveItem,
    onDropAction,
    removeItem,
    sharedDragDrop,
  ]);

  const renderedItems = orderedItems.map((item, index) => {
    const content = (
      <ListItem
        item={item}
        selectable={selectable}
        showDivider={showDivider && index < orderedItems.length - 1}
        isCard={isCard}
        draggable={draggable}
        execute={execute}
        onContextMenu={
          contextMenu
            ? (event) => {
                event.preventDefault();
                onOpenContextMenu({
                  x: event.clientX,
                  y: event.clientY,
                  context: item as unknown as Record<string, unknown>,
                });
              }
            : undefined
        }
      />
    );

    if (!draggable) {
      return <React.Fragment key={itemIds[index]}>{content}</React.Fragment>;
    }

    return (
      <SortableListItem
        key={itemIds[index]}
        id={itemIds[index]!}
        containerId={containerId}
      >
        {content}
      </SortableListItem>
    );
  });

  return (
    <DroppableListBody containerId={containerId}>
      {draggable ? (
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {renderedItems}
        </SortableContext>
      ) : (
        renderedItems
      )}
    </DroppableListBody>
  );
}
