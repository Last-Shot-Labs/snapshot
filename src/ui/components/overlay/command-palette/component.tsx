"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { usePublish, useSubscribe } from "../../../context/hooks";
import {
  useActionExecutor,
  SnapshotApiContext,
} from "../../../actions/executor";
import { Icon } from "../../../icons/index";
import { useComponentData } from "../../_base/use-component-data";
import {
  buildRequestUrl,
  resolveEndpointTarget,
} from "../../../manifest/resources";
import { useManifestRuntime } from "../../../manifest/runtime";
import { matchesCombo, parseChord } from "../../../shortcuts";
import type { ActionConfig } from "../../../actions/types";
import type { CommandPaletteConfig } from "./types";

const ANIMATION_DURATION = 150;
const RECENT_STORAGE_PREFIX = "snapshot-command-palette";

interface CommandItem {
  label: string;
  icon?: string;
  shortcut?: string;
  action?: ActionConfig;
  description?: string;
}

interface CommandGroup {
  label: string;
  items: CommandItem[];
}

function flattenItems(
  groups: CommandGroup[],
): Array<{ item: CommandItem; groupIndex: number; itemIndex: number }> {
  const flat: Array<{
    item: CommandItem;
    groupIndex: number;
    itemIndex: number;
  }> = [];
  groups.forEach((group, groupIndex) => {
    group.items.forEach((item, itemIndex) => {
      flat.push({ item, groupIndex, itemIndex });
    });
  });
  return flat;
}

function normalizeSearchGroups(data: unknown): CommandGroup[] {
  if (data == null || typeof data !== "object") {
    return [];
  }

  const record = data as Record<string, unknown>;
  if (Array.isArray(record.groups)) {
    return record.groups as CommandGroup[];
  }
  if (Array.isArray(record.items)) {
    return [
      {
        label: "Search",
        items: record.items as CommandItem[],
      },
    ];
  }
  return [];
}

/**
 * Render a searchable command palette with static groups, runtime search, and manifest shortcuts.
 */
export function CommandPalette({ config }: { config: CommandPaletteConfig }) {
  const visible = useSubscribe(config.visible ?? false);
  const publish = usePublish(config.id);
  const executeAction = useActionExecutor();
  const api = useContext(SnapshotApiContext);
  const runtime = useManifestRuntime();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [shortcutVisible, setShortcutVisible] = useState(false);
  const [searchGroups, setSearchGroups] = useState<CommandGroup[]>([]);
  const [recentItems, setRecentItems] = useState<CommandItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const storageKey = `${RECENT_STORAGE_PREFIX}:${config.id ?? "default"}`;
  const placeholder = config.placeholder ?? "Type a command...";
  const emptyMessage = config.emptyMessage ?? "No results found";
  const maxHeight = config.maxHeight ?? "300px";

  const dataResult = useComponentData(config.data ?? "");
  const shortcutCommands = useMemo(() => {
    if (!config.autoRegisterShortcuts) {
      return [];
    }

    const manifestShortcuts = runtime?.raw.shortcuts as
      | Record<
          string,
          { label?: string; action: ActionConfig; disabled?: boolean }
        >
      | undefined;
    if (!manifestShortcuts) {
      return [];
    }

    return Object.entries(manifestShortcuts)
      .filter(
        ([, shortcutConfig]) =>
          shortcutConfig.label && shortcutConfig.disabled !== true,
      )
      .map(([shortcut, shortcutConfig]) => ({
        label: shortcutConfig.label!,
        shortcut,
        action: shortcutConfig.action,
      }));
  }, [config.autoRegisterShortcuts, runtime?.raw.shortcuts]);

  useEffect(() => {
    if (!config.recentItems?.enabled || typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as CommandItem[];
      if (Array.isArray(parsed)) {
        setRecentItems(parsed);
      }
    } catch {
      setRecentItems([]);
    }
  }, [config.recentItems?.enabled, storageKey]);

  useEffect(() => {
    if (!config.recentItems?.enabled || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(recentItems.slice(0, config.recentItems.maxItems)),
    );
  }, [config.recentItems, recentItems, storageKey]);

  useEffect(() => {
    const combos = parseChord(config.shortcut);
    if (typeof window === "undefined" || combos.length === 0) {
      return;
    }

    let chordIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clearChord = () => {
      if (timer) {
        clearTimeout(timer);
      }
      chordIndex = 0;
      timer = undefined;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;
      if (isTyping && !event.ctrlKey && !event.metaKey && !event.altKey) {
        return;
      }

      const expected = combos[chordIndex];
      if (!expected || !matchesCombo(event, expected)) {
        clearChord();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (chordIndex === combos.length - 1) {
        clearChord();
        setShortcutVisible((current) => !current);
        return;
      }

      chordIndex += 1;
      timer = setTimeout(clearChord, 1000);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearChord();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [config.shortcut]);

  useEffect(() => {
    if (!config.searchEndpoint || typeof window === "undefined") {
      setSearchGroups([]);
      return;
    }

    if (query.trim().length < config.searchEndpoint.minLength) {
      setSearchGroups([]);
      return;
    }

    if (!api) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      const request = resolveEndpointTarget(
        config.searchEndpoint!.endpoint,
        runtime?.resources,
        { q: query.trim() },
      );
      const url = buildRequestUrl(request.endpoint, request.params);

      void (async () => {
        try {
          const response =
            request.method === "POST"
              ? await api.post(url, { q: query.trim() })
              : await api.get(url);
          if (!controller.signal.aborted) {
            setSearchGroups(normalizeSearchGroups(response));
          }
        } catch {
          if (!controller.signal.aborted) {
            setSearchGroups([]);
          }
        }
      })();
    }, config.searchEndpoint.debounce);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [api, config.searchEndpoint, query, runtime?.resources]);

  const allGroups: CommandGroup[] = useMemo(() => {
    const groups: CommandGroup[] = [];
    if (
      config.recentItems?.enabled &&
      recentItems.length > 0 &&
      query.trim().length === 0
    ) {
      groups.push({
        label: "Recent",
        items: recentItems.slice(0, config.recentItems.maxItems),
      });
    }
    if (shortcutCommands.length > 0) {
      groups.push({ label: "Shortcuts", items: shortcutCommands });
    }
    groups.push(...((config.groups ?? []) as CommandGroup[]));
    groups.push(...normalizeSearchGroups(dataResult.data));
    groups.push(...searchGroups);
    return groups;
  }, [
    config.groups,
    config.recentItems,
    dataResult.data,
    query,
    recentItems,
    searchGroups,
    shortcutCommands,
  ]);

  const filteredGroups: CommandGroup[] = useMemo(() => {
    if (!query.trim()) {
      return allGroups;
    }
    const lowerQuery = query.toLowerCase();
    return allGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(lowerQuery) ||
            (item.description?.toLowerCase().includes(lowerQuery) ?? false),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [allGroups, query]);

  const flatItems = useMemo(
    () => flattenItems(filteredGroups),
    [filteredGroups],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    const activeElement = listRef.current.querySelector(
      `[data-command-index="${activeIndex}"]`,
    );
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const persistRecentItem = useCallback(
    (item: CommandItem) => {
      if (!config.recentItems?.enabled) {
        return;
      }

      setRecentItems((currentItems) => {
        const next = [
          item,
          ...currentItems.filter((entry) => entry.label !== item.label),
        ];
        return next.slice(0, config.recentItems!.maxItems);
      });
    },
    [config.recentItems],
  );

  const handleSelect = useCallback(
    (item: CommandItem) => {
      persistRecentItem(item);
      if (publish) {
        publish({ selectedItem: item });
      }
      if (item.action) {
        void executeAction(item.action);
      }
      setShortcutVisible(false);
    },
    [executeAction, persistRecentItem, publish],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((currentIndex) =>
            currentIndex < flatItems.length - 1 ? currentIndex + 1 : 0,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((currentIndex) =>
            currentIndex > 0 ? currentIndex - 1 : flatItems.length - 1,
          );
          break;
        case "Enter":
          event.preventDefault();
          if (flatItems[activeIndex]) {
            handleSelect(flatItems[activeIndex]!.item);
          }
          break;
        case "Escape":
          event.preventDefault();
          setShortcutVisible(false);
          if (publish) {
            publish({ dismissed: true });
          }
          break;
        default:
          break;
      }
    },
    [activeIndex, flatItems, handleSelect, publish],
  );

  const isVisible = visible !== false || shortcutVisible;
  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      const enterTimer = setTimeout(() => {
        setAnimating(true);
        inputRef.current?.focus();
      }, 10);
      return () => clearTimeout(enterTimer);
    }
    if (mounted) {
      setAnimating(false);
      const exitTimer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(exitTimer);
    }
  }, [isVisible, mounted]);

  if (!mounted) {
    return null;
  }

  const animationStyle: CSSProperties = {
    opacity: animating ? 1 : 0,
    transform: animating ? "scale(1)" : "scale(0.95)",
    transition: `opacity var(--sn-duration-fast, ${ANIMATION_DURATION}ms) var(--sn-ease-default, ease), transform var(--sn-duration-fast, ${ANIMATION_DURATION}ms) var(--sn-ease-default, ease)`,
  };

  let flatIndex = 0;

  return (
    <div
      data-snapshot-component="command-palette"
      className={config.className}
      onKeyDown={handleKeyDown}
      style={{
        display: "flex",
        flexDirection: "column",
        ...animationStyle,
        backgroundColor:
          "var(--sn-color-popover, var(--sn-color-card, #ffffff))",
        color:
          "var(--sn-color-popover-foreground, var(--sn-color-foreground, #111827))",
        border:
          "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
        borderRadius: "var(--sn-radius-lg, 0.5rem)",
        boxShadow:
          "var(--sn-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1))",
        overflow: "hidden",
        ...(config.style as React.CSSProperties),
      }}
    >
      <style>{`
        [data-snapshot-component="command-palette"] [data-snapshot-command-input] input:focus { outline: none; }
        [data-snapshot-component="command-palette"] [data-snapshot-command-input] input:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
          border-radius: var(--sn-radius-sm, 0.25rem);
        }
        [data-snapshot-component="command-palette"] [data-snapshot-command-item]:hover {
          background-color: var(--sn-color-accent, #f3f4f6);
        }
      `}</style>

      <div
        data-snapshot-command-input=""
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sn-spacing-sm, 0.5rem)",
          padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
          borderBottom:
            "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
        }}
      >
        <Icon
          name="search"
          size={16}
          color="var(--sn-color-muted-foreground, #6b7280)"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color: "var(--sn-color-foreground, #111827)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
            fontFamily: "inherit",
            lineHeight: "var(--sn-leading-normal, 1.5)",
          }}
        />
        <kbd
          style={{
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
            fontFamily: "var(--sn-font-mono, monospace)",
            color: "var(--sn-color-muted-foreground, #6b7280)",
            backgroundColor: "var(--sn-color-muted, #f3f4f6)",
            padding:
              "var(--sn-spacing-2xs, 0.125rem) var(--sn-spacing-xs, 0.25rem)",
            borderRadius: "var(--sn-radius-xs, 0.125rem)",
            border:
              "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
          }}
        >
          {config.shortcut}
        </kbd>
      </div>

      <div
        ref={listRef}
        data-snapshot-command-list=""
        role="listbox"
        style={{
          maxHeight,
          overflowY: "auto",
          padding: "var(--sn-spacing-xs, 0.25rem)",
        }}
      >
        {filteredGroups.length === 0 ? (
          <div
            data-snapshot-command-empty=""
            style={{
              padding:
                "var(--sn-spacing-lg, 1.5rem) var(--sn-spacing-md, 1rem)",
              textAlign: "center",
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              color: "var(--sn-color-muted-foreground, #6b7280)",
            }}
          >
            {emptyMessage}
          </div>
        ) : (
          filteredGroups.map((group, groupIndex) => (
            <div
              key={`group-${group.label}-${groupIndex}`}
              data-snapshot-command-group=""
            >
              <div
                data-snapshot-command-group-heading=""
                style={{
                  padding:
                    "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
                  fontSize: "var(--sn-font-size-xs, 0.75rem)",
                  fontWeight: "var(--sn-font-weight-semibold, 600)" as string,
                  color: "var(--sn-color-muted-foreground, #6b7280)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--sn-tracking-wide, 0.05em)",
                }}
              >
                {group.label}
              </div>
              {group.items.map((item, itemIndex) => {
                const currentFlatIndex = flatIndex++;
                const isActive = currentFlatIndex === activeIndex;
                return (
                  <div
                    key={`item-${groupIndex}-${itemIndex}-${item.label}`}
                    data-command-index={currentFlatIndex}
                    data-snapshot-command-item=""
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(currentFlatIndex)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--sn-spacing-sm, 0.5rem)",
                      padding:
                        "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
                      borderRadius: "var(--sn-radius-sm, 0.25rem)",
                      cursor: "pointer",
                      backgroundColor: isActive
                        ? "var(--sn-color-accent, #f3f4f6)"
                        : "transparent",
                      color: isActive
                        ? "var(--sn-color-accent-foreground, #111827)"
                        : "var(--sn-color-foreground, #111827)",
                      transition:
                        "background-color var(--sn-duration-fast, 100ms) var(--sn-ease-default, ease)",
                    }}
                  >
                    {item.icon ? (
                      <Icon
                        name={item.icon}
                        size={16}
                        color="var(--sn-color-muted-foreground, #6b7280)"
                      />
                    ) : null}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "var(--sn-font-size-sm, 0.875rem)",
                          fontWeight:
                            "var(--sn-font-weight-normal, 400)" as string,
                          lineHeight: "var(--sn-leading-normal, 1.5)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </div>
                      {item.description ? (
                        <div
                          style={{
                            fontSize: "var(--sn-font-size-xs, 0.75rem)",
                            color: "var(--sn-color-muted-foreground, #6b7280)",
                            lineHeight: "var(--sn-leading-tight, 1.25)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.description}
                        </div>
                      ) : null}
                    </div>
                    {item.shortcut ? (
                      <kbd
                        data-snapshot-command-shortcut=""
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "var(--sn-spacing-2xs, 0.125rem)",
                          fontSize: "var(--sn-font-size-xs, 0.75rem)",
                          fontFamily: "var(--sn-font-mono, monospace)",
                          color: "var(--sn-color-muted-foreground, #6b7280)",
                          backgroundColor: "var(--sn-color-muted, #f3f4f6)",
                          padding:
                            "var(--sn-spacing-2xs, 0.125rem) var(--sn-spacing-xs, 0.25rem)",
                          borderRadius: "var(--sn-radius-xs, 0.125rem)",
                          border:
                            "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
                          lineHeight: "var(--sn-leading-none, 1)",
                          flexShrink: 0,
                        }}
                      >
                        {item.shortcut}
                      </kbd>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
