'use client';

import React, { useRef, useCallback } from "react";
import { Icon } from "../../../icons/icon";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";
import { ButtonControl } from "../../forms/button";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import { useTabs } from "./hook";
import type { TabsConfig } from "./schema";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

/**
 * Variant-specific styles for the tab bar and individual tabs.
 */
const VARIANT_STYLES: Record<
  string,
  {
    bar: React.CSSProperties;
    tab: (active: boolean, disabled: boolean) => React.CSSProperties;
  }
> = {
  default: {
    bar: {
      display: "flex",
      gap: "var(--sn-spacing-xs, 0.25rem)",
      borderBottom:
        "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
      marginBottom: "var(--sn-spacing-md, 1rem)",
    },
    tab: (active, disabled) => ({
      padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
      border: "none",
      borderBottom: active
        ? "var(--sn-border-thick, 2px) solid var(--sn-color-primary, #2563eb)"
        : "var(--sn-border-thick, 2px) solid transparent",
      background: "none",
      color: disabled
        ? "var(--sn-color-muted-foreground, #9ca3af)"
        : active
          ? "var(--sn-color-primary, #2563eb)"
          : "var(--sn-color-foreground, #111)",
      cursor: disabled ? "not-allowed" : "pointer",
      fontWeight: active
        ? "var(--sn-font-weight-semibold, 600)"
        : "var(--sn-font-weight-normal, 400)",
      fontSize: "var(--sn-font-size-sm, 0.875rem)",
      opacity: disabled ? "var(--sn-opacity-disabled, 0.5)" : 1,
      marginBottom: "-1px",
      transition:
        "all var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
    }),
  },
  underline: {
    bar: {
      display: "flex",
      gap: "var(--sn-spacing-md, 1rem)",
      borderBottom:
        "var(--sn-border-thick, 2px) solid var(--sn-color-border, #e5e7eb)",
      marginBottom: "var(--sn-spacing-md, 1rem)",
    },
    tab: (active, disabled) => ({
      padding: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-xs, 0.25rem)",
      border: "none",
      borderBottom: active
        ? "var(--sn-border-thick, 2px) solid var(--sn-color-primary, #2563eb)"
        : "var(--sn-border-thick, 2px) solid transparent",
      background: "none",
      color: disabled
        ? "var(--sn-color-muted-foreground, #9ca3af)"
        : active
          ? "var(--sn-color-primary, #2563eb)"
          : "var(--sn-color-muted-foreground, #6b7280)",
      cursor: disabled ? "not-allowed" : "pointer",
      fontWeight: active
        ? "var(--sn-font-weight-semibold, 600)"
        : "var(--sn-font-weight-normal, 400)",
      fontSize: "var(--sn-font-size-sm, 0.875rem)",
      opacity: disabled ? "var(--sn-opacity-disabled, 0.5)" : 1,
      marginBottom: "-2px",
      transition:
        "all var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
    }),
  },
  pills: {
    bar: {
      display: "flex",
      gap: "var(--sn-spacing-xs, 0.25rem)",
      marginBottom: "var(--sn-spacing-md, 1rem)",
    },
    tab: (active, disabled) => ({
      padding: "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-md, 1rem)",
      border: "none",
      borderRadius: "var(--sn-radius-full, 9999px)",
      background: active ? "var(--sn-color-primary, #2563eb)" : "transparent",
      color: disabled
        ? "var(--sn-color-muted-foreground, #9ca3af)"
        : active
          ? "var(--sn-color-primary-foreground, #fff)"
          : "var(--sn-color-foreground, #111)",
      cursor: disabled ? "not-allowed" : "pointer",
      fontWeight: active
        ? "var(--sn-font-weight-semibold, 600)"
        : "var(--sn-font-weight-normal, 400)",
      fontSize: "var(--sn-font-size-sm, 0.875rem)",
      opacity: disabled ? "var(--sn-opacity-disabled, 0.5)" : 1,
      transition:
        "all var(--sn-duration-fast, 150ms) var(--sn-ease-default, ease)",
    }),
  },
};

/**
 * Tabs component — renders a tab bar with content panels.
 *
 * Each tab's content is rendered via ComponentRenderer for recursive composition.
 * Publishes `{ activeTab, label }` when the component has an id.
 * Lazy-renders tab content: only mounts a tab when first activated, then keeps it mounted.
 *
 * @param props.config - The tabs config from the manifest
 */
export function TabsComponent({ config }: { config: TabsConfig }) {
  const { activeTab, setActiveTab, tabs } = useTabs(config);
  const variant = config.variant ?? "default";
  const resolvedStyles = VARIANT_STYLES[variant];
  const barStyle = resolvedStyles?.bar ?? VARIANT_STYLES["default"]!.bar;
  const tabStyle = resolvedStyles?.tab ?? VARIANT_STYLES["default"]!.tab;
  const rootId = config.id ?? "tabs";
  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    componentSurface: config,
    itemSurface: config.slots?.root,
  });
  const listSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-list`,
    implementationBase: barStyle as Record<string, unknown>,
    componentSurface: config.slots?.list,
  });

  // Track which tabs have been mounted (for lazy rendering)
  const mountedRef = useRef<Set<number>>(new Set([config.defaultTab ?? 0]));
  mountedRef.current.add(activeTab);

  /** Keyboard navigation for the tablist (ArrowLeft / ArrowRight). */
  const handleTablistKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();

      const enabledIndices = tabs
        .map((t, i) => (!t.disabled ? i : -1))
        .filter((i) => i !== -1);
      if (enabledIndices.length === 0) return;

      const currentPos = enabledIndices.indexOf(activeTab);
      let nextPos: number;
      if (e.key === "ArrowRight") {
        nextPos =
          currentPos === -1 ? 0 : (currentPos + 1) % enabledIndices.length;
      } else {
        nextPos = currentPos <= 0 ? enabledIndices.length - 1 : currentPos - 1;
      }
      const nextIndex = enabledIndices[nextPos]!;
      setActiveTab(nextIndex);

      // Focus the newly active tab button
      const tablist = e.currentTarget;
      const buttons =
        tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons[nextIndex]?.focus();
    },
    [tabs, activeTab, setActiveTab],
  );

  return (
    <div
      data-snapshot-component="tabs"
      data-testid="tabs"
      data-snapshot-id={`${rootId}-root`}
      className={rootSurface.className}
      style={rootSurface.style}
    >
      <style>{`
        [data-snapshot-component="tabs"] [role="tab"]:not([aria-disabled="true"]):hover {
          background: color-mix(in oklch, var(--sn-color-muted) 50%, transparent);
        }
        [data-snapshot-component="tabs"] [role="tab"]:focus {
          outline: none;
        }
        [data-snapshot-component="tabs"] [role="tab"]:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
      `}</style>
      {/* Tab Bar */}
      <div
        role="tablist"
        data-tab-list=""
        data-snapshot-id={`${rootId}-list`}
        className={listSurface.className}
        style={listSurface.style}
        onKeyDown={handleTablistKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const tabSurface = resolveSurfacePresentation({
            surfaceId: `${rootId}-tab-${index}`,
            implementationBase: tabStyle(isActive, !!tab.disabled) as Record<string, unknown>,
            componentSurface: config.slots?.tab,
            itemSurface: tab.slots?.tab,
            activeStates: [
              ...(isActive ? ["selected", "current"] : []),
              ...(tab.disabled ? ["disabled"] : []),
            ] as Array<"selected" | "current" | "disabled">,
          });
          const labelSurface = resolveSurfacePresentation({
            surfaceId: `${rootId}-tab-label-${index}`,
            componentSurface: config.slots?.tabLabel,
            itemSurface: tab.slots?.tabLabel,
          });
          const iconSurface = resolveSurfacePresentation({
            surfaceId: `${rootId}-tab-icon-${index}`,
            implementationBase: {
              marginRight: "var(--sn-spacing-xs, 0.25rem)",
              display: "inline-flex",
              alignItems: "center",
            },
            componentSurface: config.slots?.tabIcon,
            itemSurface: tab.slots?.tabIcon,
          });

          return (
          <React.Fragment key={index}>
          <ButtonControl
            key={index}
            type="button"
            disabled={tab.disabled}
            role="tab"
            ariaSelected={isActive}
            ariaCurrent={isActive ? "page" : undefined}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveTab(index)}
            surfaceId={`${rootId}-tab-${index}`}
            surfaceConfig={tab.slots?.tab ?? config.slots?.tab}
            activeStates={[
              ...(isActive ? ["selected", "current"] : []),
              ...(tab.disabled ? ["disabled"] : []),
            ] as Array<"selected" | "current" | "disabled">}
          >
            {tab.icon && (
              <span
                data-tab-icon=""
                data-snapshot-id={`${rootId}-tab-icon-${index}`}
                className={iconSurface.className}
                style={iconSurface.style}
              >
                <Icon name={tab.icon} size={16} />
              </span>
            )}
            <span
              data-snapshot-id={`${rootId}-tab-label-${index}`}
              className={labelSurface.className}
              style={labelSurface.style}
            >
              {tab.label}
            </span>
          </ButtonControl>
          <SurfaceStyles css={tabSurface.scopedCss} />
          <SurfaceStyles css={labelSurface.scopedCss} />
          <SurfaceStyles css={iconSurface.scopedCss} />
          </React.Fragment>
        )})}
      </div>

      {/* Tab Panels — lazy mounted, stays mounted after first activation */}
      {tabs.map((tab, index) => {
        if (!mountedRef.current.has(index)) return null;

        const panelSurface = resolveSurfacePresentation({
          surfaceId: `${rootId}-panel-${index}`,
          implementationBase: {
            display: index === activeTab ? "flex" : "none",
            flexDirection: "column",
            gap: "var(--sn-spacing-md, 1rem)",
          } as Record<string, unknown>,
          componentSurface: config.slots?.panel,
          itemSurface: tab.slots?.panel,
          activeStates: index === activeTab ? ["active"] : [],
        });

        return (
          <div
            key={index}
            role="tabpanel"
            data-tab-content=""
            aria-hidden={index !== activeTab}
            data-snapshot-id={`${rootId}-panel-${index}`}
            className={panelSurface.className}
            style={panelSurface.style}
          >
            {tab.content.map((child, childIndex) => (
              <ComponentRenderer
                key={
                  (child as ComponentConfig).id ??
                  `tab-${index}-child-${childIndex}`
                }
                config={child as ComponentConfig}
              />
            ))}
            <SurfaceStyles css={panelSurface.scopedCss} />
          </div>
        );
      })}
      <SurfaceStyles css={rootSurface.scopedCss} />
      <SurfaceStyles css={listSurface.scopedCss} />
    </div>
  );
}
