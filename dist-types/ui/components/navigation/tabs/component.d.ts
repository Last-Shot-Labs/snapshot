import type { TabsConfig } from "./schema";
/**
 * Manifest adapter — resolves config refs via useTabs hook, renders manifest
 * children in tab panels, delegates layout to TabsBase.
 */
export declare function TabsComponent({ config }: {
    config: TabsConfig;
}): import("react/jsx-runtime").JSX.Element;
