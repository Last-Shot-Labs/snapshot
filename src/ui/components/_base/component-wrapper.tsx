'use client';

import { Component, Suspense, useEffect, useId, useState } from "react";
import type { CSSProperties, ErrorInfo, ReactNode } from "react";
import { useManifestRuntime, useRouteRuntime } from "../../manifest/runtime";
import { useSubscribe } from "../../context";
import { useEvaluateExpression } from "../../expressions/use-expression";
import { useApiClient } from "../../state";
import type {
  ComponentAnimationConfig,
  ComponentBackgroundConfig,
  ComponentTransitionConfig,
  ComponentZIndex,
  HoverConfig,
  FocusConfig,
  ActiveConfig,
  ExitAnimationConfig,
} from "./types";
import { mergeClassNames, resolveSurfacePresentation } from "./style-surfaces";
import { resolveComponentBackgroundStyle } from "./background-style";
import { RESPONSIVE_PROP_KEYS, DURATION_MAP, DURATION_MS_MAP, EASING_MAP } from "./style-props";
import { AutoSkeleton } from "./auto-skeleton";

/**
 * Props for ComponentWrapper.
 */
interface ComponentWrapperProps {
  /** The component type string (e.g. 'detail-card'). Applied as data-snapshot-component. */
  type: string;
  /** Optional component id for scoped token overrides. */
  id?: string;
  /** Optional token overrides scoped to this component instance. */
  tokens?: Record<string, string>;
  /** Optional CSS class name. */
  className?: string;
  /** Optional inline style overrides from component config. */
  style?: Record<string, string | number>;
  /** Optional sticky positioning. */
  sticky?: boolean | { top?: string; zIndex?: ComponentZIndex };
  /** Optional z-index override. */
  zIndex?: ComponentZIndex;
  /** Optional animation config. */
  animation?: ComponentAnimationConfig;
  /** Optional glass treatment. */
  glass?: boolean;
  /** Optional background config. */
  background?: ComponentBackgroundConfig;
  /** Optional transition config. */
  transition?: ComponentTransitionConfig;
  /** Accessible label override. */
  ariaLabel?: string;
  /** Accessible description target id. */
  ariaDescribedBy?: string;
  /** Optional landmark or semantic role. */
  role?: string;
  /** Optional live region politeness setting. */
  ariaLive?: "off" | "polite" | "assertive";
  /** Hover state styles. */
  hover?: HoverConfig;
  /** Focus state styles. */
  focus?: FocusConfig;
  /** Active state styles. */
  active?: ActiveConfig;
  /** Exit animation config. */
  exitAnimation?: ExitAnimationConfig;
  /** Raw manifest config used for dev-only inspection and style prop resolution. */
  config?: Record<string, unknown>;
  /** Children to render. */
  children: ReactNode;
}

const Z_INDEX_MAP: Record<string, string> = {
  base: "var(--sn-z-index-base, 0)",
  dropdown: "var(--sn-z-index-dropdown, 10)",
  sticky: "var(--sn-z-index-sticky, 20)",
  overlay: "var(--sn-z-index-overlay, 30)",
  modal: "var(--sn-z-index-modal, 40)",
  popover: "var(--sn-z-index-popover, 50)",
  toast: "var(--sn-z-index-toast, 60)",
};

const TRANSITION_PROPERTY_MAP: Record<string, string> = {
  all: "all",
  colors: "color, background-color, border-color",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
};

function resolveZIndexValue(
  value: ComponentZIndex | undefined,
): CSSProperties["zIndex"] | undefined {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return Z_INDEX_MAP[value] ?? value;
  }
  return undefined;
}

function resolveTransitionStyle(
  transition: ComponentTransitionConfig | undefined,
): CSSProperties | undefined {
  if (!transition) {
    return undefined;
  }

  if (typeof transition === "string") {
    return {
      transition: `${TRANSITION_PROPERTY_MAP[transition] ?? transition} ${DURATION_MAP.fast} ${EASING_MAP.default}`,
    };
  }

  const property =
    TRANSITION_PROPERTY_MAP[transition.property] ?? transition.property;
  const duration =
    typeof transition.duration === "number"
      ? `${transition.duration}ms`
      : DURATION_MAP[transition.duration ?? "fast"];
  const easing =
    typeof transition.easing === "string"
      ? (EASING_MAP[transition.easing] ?? transition.easing)
      : EASING_MAP.default;

  return {
    transition: `${property} ${duration} ${easing}`,
  };
}

function resolveAnimationStyle(
  animation: ComponentAnimationConfig | undefined,
): CSSProperties | undefined {
  if (!animation) {
    return undefined;
  }

  const duration =
    typeof animation.duration === "number"
      ? `${animation.duration}ms`
      : DURATION_MAP[animation.duration ?? "normal"];
  const easing =
    typeof animation.easing === "string"
      ? (EASING_MAP[animation.easing] ?? animation.easing)
      : EASING_MAP.default;
  const baseDelay = animation.delay ?? 0;
  const animationDelay =
    typeof animation.stagger === "number"
      ? `calc(${baseDelay}ms + (var(--sn-stagger-index, 0) * ${animation.stagger}ms))`
      : `${baseDelay}ms`;

  return {
    animation: `sn-${animation.enter} ${duration} ${easing} ${animationDelay} both`,
  };
}

/**
 * Error boundary state.
 */
interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Error boundary that catches rendering errors in config-driven components
 * and displays a user-friendly error message instead of crashing the page.
 */
class ComponentErrorBoundary extends Component<
  {
    type: string;
    children: ReactNode;
    manifest?: { observability?: { errors?: { sink?: string } } } | null;
    api?: { post: (endpoint: string, body?: unknown) => Promise<unknown> } | null;
    route?: string;
    userId?: string;
  },
  ErrorBoundaryState
> {
  constructor(props: { type: string; children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(
      `[snapshot] Error in <${this.props.type}>:`,
      error,
      info.componentStack,
    );

    const sink = this.props.manifest?.observability?.errors?.sink;
    if (sink && this.props.api) {
      void this.props.api.post(sink, {
        message: error.message,
        stack: error.stack,
        componentStack: info.componentStack,
        route: this.props.route,
        user: this.props.userId,
        timestamp: new Date().toISOString(),
      });
    }
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div
          data-snapshot-component={this.props.type}
          data-snapshot-error
          role="alert"
          style={{
            padding: "var(--sn-spacing-md, 1rem)",
            border:
              "var(--sn-border-thin, 1px) solid var(--sn-color-destructive, #ef4444)",
            borderRadius: "var(--sn-radius-md, 0.375rem)",
            color: "var(--sn-color-destructive, #ef4444)",
            backgroundColor:
              "color-mix(in oklch, var(--sn-color-destructive, #ef4444) 10%, var(--sn-color-background, #fff))",
          }}
        >
          <strong>Error in {this.props.type}:</strong>{" "}
          {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Loading skeleton shown while a component is suspending.
 *
 * Delegates to AutoSkeleton, which picks a shape (table/list/card/chart/stat)
 * based on the component type so the placeholder matches what's loading.
 */
function ComponentSkeleton({ type }: { type: string }) {
  return <AutoSkeleton componentType={type} />;
}

/**
 * Shared wrapper for all config-driven components.
 * Provides: `data-snapshot-component` attribute for token scoping,
 * error boundary, Suspense boundary, and style/className pass-through.
 *
 * @param props - Wrapper props including type, className, style, and children
 */
export function ComponentWrapper({
  type,
  id: explicitId,
  tokens,
  className,
  style,
  sticky,
  zIndex,
  animation,
  glass,
  background,
  transition,
  ariaLabel,
  ariaDescribedBy,
  role,
  ariaLive,
  hover,
  focus,
  active,
  exitAnimation,
  config,
  children,
}: ComponentWrapperProps) {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const api = useApiClient();
  const user = useSubscribe({ from: "global.user" }) as { id?: string } | null;

  // Auto-generate a stable id when interactive or responsive CSS is needed.
  // useId() is SSR-safe and produces stable values across hydration; we
  // sanitize it to a valid CSS attribute value.
  const reactId = useId();
  const needsId = Boolean(hover || focus || active || hasResponsiveProps(config));
  const autoId = needsId ? `sn-auto-${reactId.replace(/:/g, "")}` : undefined;
  const id = explicitId ?? autoId;

  // ── Style prop resolution ─────────────────────────────────────────────
  const rootSurface = resolveSurfacePresentation({
    surfaceId: id,
    componentSurface:
      config ??
      ({
        className,
        style,
        hover,
        focus,
        active,
      } as Record<string, unknown>),
    itemSurface:
      config &&
      typeof config === "object" &&
      "slots" in config &&
      config.slots &&
      typeof config.slots === "object" &&
      "root" in (config.slots as Record<string, unknown>)
        ? ((config.slots as Record<string, unknown>).root as Record<string, unknown>)
        : undefined,
  });

  // ── Interactive CSS (hover/focus/active) ───────────────────────────────
  const scopedCSS = rootSurface.scopedCss ?? null;

  // ── Responsive CSS (media queries) ────────────────────────────────────

  // ── Exit animation lifecycle ──────────────────────────────────────────
  const visibleExpr =
    config?.visible &&
    typeof config.visible === "object" &&
    "expr" in config.visible
      ? (config.visible as { expr: string }).expr
      : undefined;
  const exprVisible = useEvaluateExpression(visibleExpr);
  const isVisible = useSubscribe(
    config?.visible !== undefined && !visibleExpr ? config.visible : true,
  );
  const resolvedVisible = visibleExpr ? exprVisible : isVisible !== false;
  const [shouldRender, setShouldRender] = useState(resolvedVisible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!resolvedVisible && shouldRender) {
      if (exitAnimation) {
        const reducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
          setShouldRender(false);
        } else {
          setIsAnimatingOut(true);
          const dur =
            DURATION_MS_MAP[exitAnimation.duration ?? "fast"] ?? 150;
          const timer = setTimeout(() => {
            setShouldRender(false);
            setIsAnimatingOut(false);
          }, dur);
          return () => clearTimeout(timer);
        }
      } else {
        setShouldRender(false);
      }
    } else if (resolvedVisible && !shouldRender) {
      setShouldRender(true);
    }
  }, [resolvedVisible, shouldRender, exitAnimation]);

  // ── Feature styles ────────────────────────────────────────────────────
  const tokenStyle =
    tokens && id
      ? Object.fromEntries(
          Object.entries(tokens).map(([tokenPath, value]) => [
            `--sn-${tokenPath.replace(/\./g, "-")}`,
            value,
          ]),
        )
      : undefined;
  const stickyStyle: CSSProperties | undefined =
    sticky === undefined
      ? undefined
      : {
          position: "sticky" as const,
          top: typeof sticky === "object" ? (sticky.top ?? "0") : "0",
          zIndex:
            resolveZIndexValue(
              typeof sticky === "object" ? sticky.zIndex : "sticky",
            ) ?? Z_INDEX_MAP.sticky,
        };
  const zIndexStyle =
    zIndex === undefined ? undefined : { zIndex: resolveZIndexValue(zIndex) };
  const animationStyle = isAnimatingOut
    ? resolveExitAnimationStyle(exitAnimation)
    : resolveAnimationStyle(animation);
  const backgroundStyle = resolveComponentBackgroundStyle(background);
  const transitionStyle = resolveTransitionStyle(transition);
  const glassStyle = glass
    ? {
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background:
          "color-mix(in oklch, var(--sn-color-card, #fff) 80%, transparent)",
        border:
          "1px solid color-mix(in oklch, var(--sn-color-border, #e5e7eb) 50%, transparent)",
      }
    : undefined;
  const isDevEnvironment =
    typeof process !== "undefined" && process.env.NODE_ENV !== "production";
  const devConfig =
    isDevEnvironment && config ? JSON.stringify(config) : undefined;

  // Priority: style props → feature styles → token overrides → raw style
  const mergedStyle: CSSProperties = {
    ...(rootSurface.style ?? {}),
    ...(backgroundStyle ?? {}),
    ...(glassStyle ?? {}),
    ...(stickyStyle ?? {}),
    ...(zIndexStyle ?? {}),
    ...(transitionStyle ?? {}),
    ...(animationStyle ?? {}),
    ...(tokenStyle ?? {}),
    ...(style as CSSProperties | undefined),
    ...(!shouldRender ? { display: "none" } : undefined),
  };

  const hasStyle = Object.keys(mergedStyle).length > 0;

  return (
    <div
      data-snapshot-component={type}
      data-snapshot-id={id}
      data-component-id={id}
      data-snapshot-config={devConfig}
      className={mergeClassNames(rootSurface.className, className)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      role={role}
      aria-live={ariaLive}
      style={hasStyle ? mergedStyle : undefined}
    >
      {scopedCSS && <style dangerouslySetInnerHTML={{ __html: scopedCSS }} />}
      <ComponentErrorBoundary
        type={type}
        manifest={manifest?.raw as { observability?: { errors?: { sink?: string } } }}
        api={api}
        route={routeRuntime?.currentPath}
        userId={user?.id}
      >
        <Suspense fallback={<ComponentSkeleton type={type} />}>
          {children}
        </Suspense>
      </ComponentErrorBoundary>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function resolveExitAnimationStyle(
  exit: ExitAnimationConfig | undefined,
): CSSProperties | undefined {
  if (!exit) return undefined;
  const preset = exit.preset ?? "fade";
  const duration =
    typeof exit.duration === "string"
      ? (DURATION_MAP[exit.duration] ?? DURATION_MAP.fast)
      : DURATION_MAP.fast;
  const easing =
    typeof exit.easing === "string"
      ? (EASING_MAP[exit.easing] ?? exit.easing)
      : "var(--sn-ease-default, ease)";
  return {
    animation: `sn-${preset} ${duration} ${easing} reverse forwards`,
  };
}

function hasResponsiveProps(
  config: Record<string, unknown> | undefined,
): boolean {
  if (!config) return false;
  for (const key of RESPONSIVE_PROP_KEYS) {
    const val = config[key];
    if (
      val != null &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      "default" in (val as Record<string, unknown>)
    ) {
      return true;
    }
  }
  return false;
}
