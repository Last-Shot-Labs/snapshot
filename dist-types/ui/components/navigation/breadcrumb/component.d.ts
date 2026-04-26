import type { BreadcrumbConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, auto-breadcrumbs, and route navigation,
 * delegates rendering to BreadcrumbBase.
 */
export declare function BreadcrumbComponent({ config }: {
    config: BreadcrumbConfig;
}): import("react/jsx-runtime").JSX.Element;
