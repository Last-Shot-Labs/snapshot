// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Layout } from "../component";
import type { LayoutConfig } from "../schema";

afterEach(() => {
  cleanup();
});

describe("Layout component", () => {
  const sidebarConfig: LayoutConfig = { type: "layout", variant: "sidebar" };
  const topNavConfig: LayoutConfig = { type: "layout", variant: "top-nav" };
  const minimalConfig: LayoutConfig = { type: "layout", variant: "minimal" };
  const fullWidthConfig: LayoutConfig = {
    type: "layout",
    variant: "full-width",
  };

  describe("sidebar variant", () => {
    it("renders with data-layout-variant=sidebar", () => {
      const { container } = render(
        <Layout config={sidebarConfig}>
          <div>Page content</div>
        </Layout>,
      );
      const el = container.querySelector('[data-layout-variant="sidebar"]');
      expect(el).not.toBeNull();
    });

    it("renders sidebar aside when nav is provided", () => {
      const { container } = render(
        <Layout config={sidebarConfig} nav={<div>Nav</div>}>
          <div>Page content</div>
        </Layout>,
      );
      const aside = container.querySelector("[data-layout-sidebar]");
      expect(aside).not.toBeNull();
    });

    it("renders main content area", () => {
      const { getByText } = render(
        <Layout config={sidebarConfig}>
          <div>Page content</div>
        </Layout>,
      );
      expect(getByText("Page content")).not.toBeNull();
    });

    it("renders without sidebar when nav is not provided", () => {
      const { container } = render(
        <Layout config={sidebarConfig}>
          <div>Page content</div>
        </Layout>,
      );
      const aside = container.querySelector("[data-layout-sidebar]");
      expect(aside).toBeNull();
    });
  });

  describe("top-nav variant", () => {
    it("renders with data-layout-variant=top-nav", () => {
      const { container } = render(
        <Layout config={topNavConfig}>
          <div>Page content</div>
        </Layout>,
      );
      const el = container.querySelector('[data-layout-variant="top-nav"]');
      expect(el).not.toBeNull();
    });

    it("renders header when nav is provided", () => {
      const { container } = render(
        <Layout config={topNavConfig} nav={<div>Nav</div>}>
          <div>Page content</div>
        </Layout>,
      );
      const header = container.querySelector("[data-layout-header]");
      expect(header).not.toBeNull();
    });

    it("renders content below header", () => {
      const { getByText } = render(
        <Layout config={topNavConfig} nav={<div>Top Nav</div>}>
          <div>Page content</div>
        </Layout>,
      );
      expect(getByText("Page content")).not.toBeNull();
      expect(getByText("Top Nav")).not.toBeNull();
    });
  });

  describe("minimal variant", () => {
    it("renders with data-layout-variant=minimal", () => {
      const { container } = render(
        <Layout config={minimalConfig}>
          <div>Auth page</div>
        </Layout>,
      );
      const el = container.querySelector('[data-layout-variant="minimal"]');
      expect(el).not.toBeNull();
    });

    it("does not render nav even if provided", () => {
      const { container } = render(
        <Layout config={minimalConfig} nav={<div>Should not appear</div>}>
          <div>Auth page</div>
        </Layout>,
      );
      const aside = container.querySelector("[data-layout-sidebar]");
      const header = container.querySelector("[data-layout-header]");
      expect(aside).toBeNull();
      expect(header).toBeNull();
    });

    it("centers content", () => {
      const { container } = render(
        <Layout config={minimalConfig}>
          <div>Centered</div>
        </Layout>,
      );
      const wrapper = container.querySelector(
        '[data-layout-variant="minimal"]',
      );
      expect(wrapper?.getAttribute("style")).toContain("center");
    });
  });

  describe("full-width variant", () => {
    it("renders with data-layout-variant=full-width", () => {
      const { container } = render(
        <Layout config={fullWidthConfig}>
          <div>Landing page</div>
        </Layout>,
      );
      const el = container.querySelector('[data-layout-variant="full-width"]');
      expect(el).not.toBeNull();
    });

    it("does not render nav even if provided", () => {
      const { container } = render(
        <Layout config={fullWidthConfig} nav={<div>No nav</div>}>
          <div>Landing page</div>
        </Layout>,
      );
      const aside = container.querySelector("[data-layout-sidebar]");
      const header = container.querySelector("[data-layout-header]");
      expect(aside).toBeNull();
      expect(header).toBeNull();
    });

    it("renders content edge-to-edge", () => {
      const { getByText } = render(
        <Layout config={fullWidthConfig}>
          <div>Landing page</div>
        </Layout>,
      );
      expect(getByText("Landing page")).not.toBeNull();
    });
  });

  it("all variants render data-snapshot-component=layout", () => {
    const configs = [
      sidebarConfig,
      topNavConfig,
      minimalConfig,
      fullWidthConfig,
    ];
    for (const config of configs) {
      const { container, unmount } = render(
        <Layout config={config}>
          <div>Test</div>
        </Layout>,
      );
      const el = container.querySelector('[data-snapshot-component="layout"]');
      expect(el).not.toBeNull();
      unmount();
    }
  });

  it("all variants render data-layout-content main area", () => {
    const configs = [
      sidebarConfig,
      topNavConfig,
      minimalConfig,
      fullWidthConfig,
    ];
    for (const config of configs) {
      const { container, unmount } = render(
        <Layout config={config}>
          <div>Test</div>
        </Layout>,
      );
      const main = container.querySelector("[data-layout-content]");
      expect(main).not.toBeNull();
      unmount();
    }
  });
});
