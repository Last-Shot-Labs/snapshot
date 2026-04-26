import type { LayoutProps } from "./types";
/**
 * Manifest adapter — resolves registered custom layouts, then delegates
 * to LayoutBase for built-in variants.
 */
export declare function Layout({ config, nav, slots, children }: LayoutProps): import("react/jsx-runtime").JSX.Element;
