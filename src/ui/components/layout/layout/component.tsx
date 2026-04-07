import type { ReactNode } from "react";
import type { LayoutConfig } from "./schema";

/** Props for the Layout component. */
interface LayoutComponentProps {
  /** Layout configuration from the manifest. */
  config: LayoutConfig;
  /** The nav element to render in the layout (sidebar or top). */
  nav?: ReactNode;
  /** The page content to render inside the layout. */
  children: ReactNode;
}

/**
 * Sidebar layout: fixed sidebar (collapsible on mobile) + main content area.
 * The sidebar is positioned on the left with the nav component inside it.
 * On mobile (below md breakpoint), the sidebar collapses.
 */
function SidebarLayout({
  nav,
  children,
}: {
  nav?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      data-snapshot-component="layout"
      data-layout-variant="sidebar"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--sn-color-background, var(--background))",
        color: "var(--sn-color-foreground, var(--foreground))",
      }}
    >
      {nav && (
        <aside
          data-layout-sidebar=""
          style={{
            width: "var(--sn-sidebar-width, 16rem)",
            flexShrink: 0,
            background:
              "var(--sn-sidebar-background, var(--sidebar, var(--card)))",
            color:
              "var(--sn-sidebar-foreground, var(--sidebar-foreground, var(--card-foreground)))",
            borderRight: "1px solid var(--sn-color-border, var(--border))",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {nav}
        </aside>
      )}
      <main
        data-layout-content=""
        style={{
          flex: 1,
          minWidth: 0,
          padding: "var(--sn-spacing-lg, 1.5rem)",
          overflow: "auto",
        }}
      >
        {children}
      </main>
      <style>{`
        @media (max-width: 768px) {
          [data-layout-variant="sidebar"] [data-layout-sidebar] {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 40;
            transform: translateX(-100%);
            transition: transform 0.2s ease;
          }
          [data-layout-variant="sidebar"] [data-layout-sidebar][data-sidebar-open="true"] {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Top-nav layout: horizontal nav bar at the top + content below.
 */
function TopNavLayout({
  nav,
  children,
}: {
  nav?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      data-snapshot-component="layout"
      data-layout-variant="top-nav"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "var(--sn-color-background, var(--background))",
        color: "var(--sn-color-foreground, var(--foreground))",
      }}
    >
      {nav && (
        <header
          data-layout-header=""
          style={{
            background:
              "var(--sn-sidebar-background, var(--sidebar, var(--card)))",
            color:
              "var(--sn-sidebar-foreground, var(--sidebar-foreground, var(--card-foreground)))",
            borderBottom: "1px solid var(--sn-color-border, var(--border))",
          }}
        >
          {nav}
        </header>
      )}
      <main
        data-layout-content=""
        style={{
          flex: 1,
          padding: "var(--sn-spacing-lg, 1.5rem)",
          overflow: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

/**
 * Minimal layout: centered content, no persistent nav.
 * Suitable for auth pages, onboarding flows, and similar focused views.
 */
function MinimalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-snapshot-component="layout"
      data-layout-variant="minimal"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--sn-color-background, var(--background))",
        color: "var(--sn-color-foreground, var(--foreground))",
        padding: "var(--sn-spacing-md, 1rem)",
      }}
    >
      <main
        data-layout-content=""
        style={{
          width: "100%",
          maxWidth: "32rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}

/**
 * Full-width layout: edge-to-edge, no padding, no nav.
 * Suitable for landing pages, custom layouts, and content that needs
 * the full viewport width.
 */
function FullWidthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-snapshot-component="layout"
      data-layout-variant="full-width"
      style={{
        minHeight: "100vh",
        background: "var(--sn-color-background, var(--background))",
        color: "var(--sn-color-foreground, var(--foreground))",
      }}
    >
      <main data-layout-content="">{children}</main>
    </div>
  );
}

/**
 * Layout shell component that wraps page content.
 * Renders one of four layout variants based on the config:
 * - **sidebar**: fixed sidebar (collapsible on mobile) + main content area
 * - **top-nav**: horizontal nav bar + content below
 * - **minimal**: centered content, no nav (auth pages, onboarding)
 * - **full-width**: edge-to-edge, no nav (landing pages)
 *
 * @param props - Layout configuration, optional nav element, and children
 */
export function Layout({ config, nav, children }: LayoutComponentProps) {
  switch (config.variant) {
    case "sidebar":
      return <SidebarLayout nav={nav}>{children}</SidebarLayout>;
    case "top-nav":
      return <TopNavLayout nav={nav}>{children}</TopNavLayout>;
    case "minimal":
      return <MinimalLayout>{children}</MinimalLayout>;
    case "full-width":
      return <FullWidthLayout>{children}</FullWidthLayout>;
  }
}
