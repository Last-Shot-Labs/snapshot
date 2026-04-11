'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai/react";
import { useActionExecutor } from "../../../actions/executor";
import { usePublish, useSubscribe } from "../../../context/hooks";
import { isFromRef } from "../../../context/utils";
import { Icon } from "../../../icons/index";
import { useInfiniteScroll } from "../../../hooks/use-infinite-scroll";
import { wsManagerAtom } from "../../../../ws/atom";
import { AutoEmptyState } from "../../_base/auto-empty-state";
import type { AutoEmptyStateConfig } from "../../_base/auto-empty-state";
import { AutoSkeleton } from "../../_base/auto-skeleton";
import { useComponentData } from "../../_base/use-component-data";
import { useLiveData } from "../../_base/use-live-data";
import { formatRelativeTime } from "./relative-time";
import type { FeedConfig, FeedItem } from "./types";

const BADGE_COLOR_MAP: Record<string, { bg: string; fg: string }> = {
  primary: {
    bg: "var(--sn-color-primary, #111827)",
    fg: "var(--sn-color-primary-foreground, #ffffff)",
  },
  secondary: {
    bg: "var(--sn-color-secondary, #f3f4f6)",
    fg: "var(--sn-color-secondary-foreground, #111827)",
  },
  success: {
    bg: "var(--sn-color-success, #16a34a)",
    fg: "var(--sn-color-success-foreground, #ffffff)",
  },
  warning: {
    bg: "var(--sn-color-warning, #d97706)",
    fg: "var(--sn-color-warning-foreground, #ffffff)",
  },
  destructive: {
    bg: "var(--sn-color-destructive, #dc2626)",
    fg: "var(--sn-color-destructive-foreground, #ffffff)",
  },
  info: {
    bg: "var(--sn-color-info, #2563eb)",
    fg: "var(--sn-color-info-foreground, #ffffff)",
  },
  muted: {
    bg: "var(--sn-color-muted, #f3f4f6)",
    fg: "var(--sn-color-muted-foreground, #6b7280)",
  },
};

function getField(item: Record<string, unknown>, path: string): unknown {
  return item[path];
}

function formatTimestamp(ts: string): string {
  try {
    return new Intl.DateTimeFormat().format(new Date(ts));
  } catch {
    return ts;
  }
}

function getFallbackInitials(title: string): string {
  const initials = title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.match(/[a-zA-Z0-9]/)?.[0] ?? "")
    .join("")
    .toUpperCase();
  return initials || "?";
}

function resolveItems(
  rawItems: Record<string, unknown>[],
  config: FeedConfig,
): FeedItem[] {
  return rawItems.map((item, index) => {
    const keyVal = getField(item, config.itemKey);
    const key =
      typeof keyVal === "string" || typeof keyVal === "number" ? keyVal : index;

    const avatar = config.avatar ? String(getField(item, config.avatar) ?? "") : undefined;
    const title = String(getField(item, config.title) ?? "");
    const description = config.description
      ? String(getField(item, config.description) ?? "")
      : undefined;
    const timestamp = config.timestamp
      ? String(getField(item, config.timestamp) ?? "")
      : undefined;

    let badgeValue: string | undefined;
    let badgeColor: string | undefined;
    if (config.badge) {
      const rawBadge = getField(item, config.badge.field);
      if (rawBadge != null) {
        badgeValue = String(rawBadge);
        badgeColor = config.badge.colorMap?.[badgeValue] ?? "muted";
      }
    }

    return {
      key,
      avatar,
      title,
      description,
      timestamp,
      badgeValue,
      badgeColor,
      raw: item,
    };
  });
}

function resolveGroupLabel(
  timestamp: string,
  groupBy: NonNullable<FeedConfig["groupBy"]>,
): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  if (groupBy === "month") {
    return new Intl.DateTimeFormat(undefined, {
      month: "long",
      year: "numeric",
    }).format(date);
  }

  if (groupBy === "week") {
    const start = new Date(date);
    const day = start.getDay();
    const offset = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - offset);
    return `Week of ${new Intl.DateTimeFormat().format(start)}`;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function groupItems(
  items: FeedItem[],
  groupBy: FeedConfig["groupBy"],
): Array<{ label: string; items: FeedItem[] }> {
  if (!groupBy) {
    return [{ label: "", items }];
  }

  const groups = new Map<string, FeedItem[]>();
  for (const item of items) {
    const label = item.timestamp
      ? resolveGroupLabel(item.timestamp, groupBy)
      : "Unknown";
    const bucket = groups.get(label);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(label, [item]);
    }
  }

  return Array.from(groups, ([label, groupedItems]) => ({
    label,
    items: groupedItems,
  }));
}

function toAutoEmptyStateConfig(
  empty: FeedConfig["empty"],
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

function FeedBadge({ value, color }: { value: string; color: string }) {
  const colors = BADGE_COLOR_MAP[color] ?? BADGE_COLOR_MAP.muted!;
  return (
    <span
      data-feed-badge=""
      style={{
        display: "inline-block",
        padding: "var(--sn-spacing-2xs, 2px) var(--sn-spacing-xs, 4px)",
        borderRadius: "var(--sn-radius-md, 6px)",
        fontSize: "var(--sn-font-size-xs, 0.75rem)",
        backgroundColor: colors.bg,
        color: colors.fg,
        lineHeight: "var(--sn-leading-tight, 1.4)",
        fontWeight: "var(--sn-font-weight-medium, 500)",
      }}
    >
      {value}
    </span>
  );
}

function FeedItemRow({
  item,
  onClick,
  isSelected,
  itemActions,
  relativeTime,
}: {
  item: FeedItem;
  onClick: (raw: Record<string, unknown>) => void;
  isSelected: boolean;
  itemActions?: FeedConfig["itemActions"];
  relativeTime: boolean;
}) {
  const execute = useActionExecutor();

  return (
    <div
      data-feed-item=""
      data-selected={isSelected ? "" : undefined}
      onClick={() => onClick(item.raw)}
      style={{
        display: "flex",
        gap: "var(--sn-spacing-sm, 8px)",
        padding: "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)",
        borderBottom:
          "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
        cursor: "pointer",
        backgroundColor: isSelected ? "var(--sn-color-muted, #f3f4f6)" : undefined,
        transition:
          "background-color var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
      }}
    >
      {item.avatar ? (
        <img
          src={item.avatar}
          alt=""
          aria-hidden="true"
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "var(--sn-radius-full, 9999px)",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          data-feed-avatar-fallback=""
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "var(--sn-radius-full, 9999px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor:
              "color-mix(in oklch, var(--sn-color-primary, #2563eb) 14%, var(--sn-color-muted, #e5e7eb))",
            color: "var(--sn-color-primary, #2563eb)",
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            fontWeight: "var(--sn-font-weight-semibold, 600)",
            lineHeight: 1,
          }}
        >
          {getFallbackInitials(item.title)}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sn-spacing-sm, 8px)",
            flexWrap: "wrap",
          }}
        >
          <span
            data-feed-title=""
            style={{
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              fontWeight: "var(--sn-font-weight-medium, 500)",
              color: "var(--sn-color-card-foreground, #111827)",
            }}
          >
            {item.title}
          </span>
          {item.badgeValue && item.badgeColor ? (
            <FeedBadge value={item.badgeValue} color={item.badgeColor} />
          ) : null}
        </div>
        {item.description ? (
          <div
            data-feed-description=""
            style={{
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
              marginTop: "var(--sn-spacing-2xs, 2px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.description}
          </div>
        ) : null}
      </div>

      {item.timestamp ? (
        <span
          data-feed-timestamp=""
          style={{
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            color: "var(--sn-color-muted-foreground, #6b7280)",
            flexShrink: 0,
            alignSelf: "flex-start",
            paddingTop: "var(--sn-spacing-2xs, 2px)",
          }}
        >
          {relativeTime
            ? formatRelativeTime(item.timestamp)
            : formatTimestamp(item.timestamp)}
        </span>
      ) : null}

      {itemActions && itemActions.length > 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sn-spacing-xs, 4px)",
            flexShrink: 0,
          }}
        >
          {itemActions.map((itemAction, index) => (
            <button
              key={`${itemAction.label}-${index}`}
              type="button"
              aria-label={itemAction.label}
              onClick={(event) => {
                event.stopPropagation();
                void execute(itemAction.action, { item: item.raw });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--sn-spacing-2xs, 2px)",
                border:
                  "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
                backgroundColor:
                  itemAction.variant === "destructive"
                    ? "color-mix(in oklch, var(--sn-color-destructive, #dc2626) 8%, transparent)"
                    : "transparent",
                color:
                  itemAction.variant === "destructive"
                    ? "var(--sn-color-destructive, #dc2626)"
                    : "var(--sn-color-muted-foreground, #6b7280)",
                borderRadius: "var(--sn-radius-sm, 0.25rem)",
                padding: "var(--sn-spacing-2xs, 2px) var(--sn-spacing-xs, 4px)",
                cursor: "pointer",
              }}
            >
              {itemAction.icon ? <Icon name={itemAction.icon} size={14} /> : null}
              <span>{itemAction.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Feed({ config }: { config: FeedConfig }) {
  const publish = usePublish(config.id);
  const wsManager = useAtomValue(wsManagerAtom);
  const isRef = isFromRef(config.data);
  const resolvedRef = useSubscribe(config.data);
  const { data: fetchedData, isLoading, error, refetch } = useComponentData(config.data);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
  const [, setRelativeTick] = useState(0);

  const rawRows = useMemo<Record<string, unknown>[]>(() => {
    if (isRef) {
      return Array.isArray(resolvedRef) ? (resolvedRef as Record<string, unknown>[]) : [];
    }
    if (fetchedData == null) {
      return [];
    }
    if (Array.isArray(fetchedData)) {
      return fetchedData as Record<string, unknown>[];
    }
    const asRecord = fetchedData as Record<string, unknown>;
    if (Array.isArray(asRecord.data)) {
      return asRecord.data as Record<string, unknown>[];
    }
    if (Array.isArray(asRecord.items)) {
      return asRecord.items as Record<string, unknown>[];
    }
    return [];
  }, [fetchedData, isRef, resolvedRef]);

  const resolvedItems = useMemo(() => resolveItems(rawRows, config), [config, rawRows]);
  const pageSize = config.pageSize;
  const totalPages = Math.max(1, Math.ceil(resolvedItems.length / pageSize));
  const visibleItems = useMemo(
    () => resolvedItems.slice(0, page * pageSize),
    [page, pageSize, resolvedItems],
  );
  const groupedItems = useMemo(
    () => groupItems(visibleItems, config.groupBy),
    [config.groupBy, visibleItems],
  );
  const emptyStateConfig = useMemo(
    () => toAutoEmptyStateConfig(config.empty),
    [config.empty],
  );
  const hasMore = page * pageSize < resolvedItems.length;

  const loadMore = useCallback(() => {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }, [totalPages]);

  const selectItem = useCallback((item: Record<string, unknown>) => {
    setSelectedItem(item);
  }, []);

  useEffect(() => {
    if (publish) {
      publish(selectedItem);
    }
  }, [publish, selectedItem]);

  useEffect(() => {
    if (!config.relativeTime) {
      return;
    }

    const interval = setInterval(() => {
      setRelativeTick((tick) => tick + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [config.relativeTime]);

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
    onRefresh: refetch,
    debounce: liveConfig?.debounce,
    indicator: liveConfig?.indicator,
    wsManager,
    enabled: liveConfig !== null,
  });
  const loading = !isRef && isLoading;
  const fetchError = !isRef ? error : null;
  const infiniteScrollRef = useInfiniteScroll({
    hasNextPage: config.infinite ? hasMore : false,
    isLoading: loading,
    loadNextPage: loadMore,
  });

  return (
    <div
      data-snapshot-component="feed"
      className={config.className}
      style={{
        backgroundColor: "var(--sn-color-card, #ffffff)",
        color: "var(--sn-color-card-foreground, #111827)",
        borderRadius: "var(--sn-radius-md, 6px)",
        border:
          "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
        overflow: "hidden",
        ...(config.style as React.CSSProperties),
      }}
    >
      {hasNewData ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--sn-spacing-sm, 8px)",
            padding: "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)",
            borderBottom:
              "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
            backgroundColor: "var(--sn-color-secondary, #f3f4f6)",
          }}
        >
          <span>New activity available</span>
          <button
            type="button"
            onClick={refresh}
            style={{
              border:
                "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
              backgroundColor: "var(--sn-color-card, #ffffff)",
              borderRadius: "var(--sn-radius-sm, 0.25rem)",
              padding: "var(--sn-spacing-2xs, 2px) var(--sn-spacing-sm, 8px)",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      ) : null}

      {loading ? (
        config.loading && !config.loading.disabled ? (
          <AutoSkeleton componentType="feed" config={config.loading} />
        ) : (
          <div
            data-feed-loading=""
            style={{
              padding: "var(--sn-spacing-md, 12px)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        )
      ) : null}

      {fetchError ? (
        <div
          data-feed-error=""
          role="alert"
          style={{
            padding: "var(--sn-spacing-md, 12px)",
            color: "var(--sn-color-destructive, #dc2626)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            textAlign: "center",
          }}
        >
          Error: {fetchError.message}
        </div>
      ) : null}

      {!loading && !fetchError && visibleItems.length === 0 ? (
        emptyStateConfig ? (
          <AutoEmptyState config={emptyStateConfig} />
        ) : (
          <div
            data-feed-empty=""
            style={{
              padding: "var(--sn-spacing-md, 12px)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
              fontSize: "var(--sn-font-size-md, 1rem)",
              textAlign: "center",
            }}
          >
            {config.emptyMessage}
          </div>
        )
      ) : null}

      {!loading && !fetchError && visibleItems.length > 0 ? (
        <div data-feed-list="" role="list">
          {groupedItems.map((group) => (
            <React.Fragment key={group.label || "default"}>
              {group.label ? (
                <div
                  style={{
                    padding:
                      "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)",
                    backgroundColor: "var(--sn-color-muted, #f3f4f6)",
                    color: "var(--sn-color-muted-foreground, #6b7280)",
                    fontSize: "var(--sn-font-size-xs, 0.75rem)",
                    fontWeight: "var(--sn-font-weight-semibold, 600)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--sn-tracking-wide, 0.05em)",
                  }}
                >
                  {group.label}
                </div>
              ) : null}
              {group.items.map((item) => (
                <FeedItemRow
                  key={item.key}
                  item={item}
                  onClick={selectItem}
                  isSelected={selectedItem === item.raw}
                  itemActions={config.itemActions}
                  relativeTime={config.relativeTime}
                />
              ))}
            </React.Fragment>
          ))}
          {config.infinite && hasMore ? (
            <div ref={infiniteScrollRef} aria-hidden="true" style={{ height: "1px" }} />
          ) : null}
        </div>
      ) : null}

      {!loading && !fetchError && hasMore && !config.infinite ? (
        <div
          style={{
            padding: "var(--sn-spacing-sm, 8px) var(--sn-spacing-md, 12px)",
            borderTop:
              "var(--sn-border-default, 1px) solid var(--sn-color-border, #e5e7eb)",
            textAlign: "center",
          }}
        >
          <button
            type="button"
            data-feed-load-more=""
            onClick={loadMore}
            style={{
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              color: "var(--sn-color-primary, #111827)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "var(--sn-spacing-xs, 4px) var(--sn-spacing-sm, 8px)",
            }}
          >
            Load more
          </button>
        </div>
      ) : null}

      <style>{`
        [data-snapshot-component="feed"] [data-feed-item]:hover {
          background: var(--sn-color-accent, var(--sn-color-muted));
        }
        [data-snapshot-component="feed"] button:hover {
          background: var(--sn-color-accent, var(--sn-color-muted));
        }
        [data-snapshot-component="feed"] button:focus {
          outline: none;
        }
        [data-snapshot-component="feed"] button:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
      `}</style>
    </div>
  );
}
