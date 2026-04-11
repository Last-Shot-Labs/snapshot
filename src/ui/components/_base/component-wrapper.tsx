'use client';

import { Component, Suspense } from "react";
import type { CSSProperties, ErrorInfo, ReactNode } from "react";
import { useManifestRuntime, useRouteRuntime } from "../../manifest/runtime";
import { useSubscribe } from "../../context";
import { SnapshotApiContext } from "../../actions/executor";
import { useContext } from "react";

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
  /** Children to render. */
  children: ReactNode;
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
 */
function ComponentSkeleton({ type }: { type: string }) {
  return (
    <div
      data-snapshot-component={type}
      data-snapshot-loading
      style={{
        padding: "var(--sn-spacing-md, 1rem)",
        borderRadius: "var(--sn-radius-md, 0.375rem)",
        backgroundColor: "var(--sn-color-muted, #f1f5f9)",
        minHeight: "4rem",
        animation: "pulse 2s ease-in-out infinite",
      }}
    />
  );
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
  id,
  tokens,
  className,
  style,
  children,
}: ComponentWrapperProps) {
  const manifest = useManifestRuntime();
  const routeRuntime = useRouteRuntime();
  const api = useContext(SnapshotApiContext);
  const user = useSubscribe({ from: "global.user" }) as { id?: string } | null;
  const tokenStyle =
    tokens && id
      ? Object.fromEntries(
          Object.entries(tokens).map(([tokenPath, value]) => [
            `--sn-${tokenPath.replace(/\./g, "-")}`,
            value,
          ]),
        )
      : undefined;

  return (
    <div
      data-snapshot-component={type}
      data-component-id={id}
      className={className}
      style={
        style || tokenStyle
          ? ({
              ...(tokenStyle ?? {}),
              ...(style as CSSProperties | undefined),
            } as CSSProperties)
          : undefined
      }
    >
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
