import type { NavConfig } from "./schema";
import type { UseNavResult } from "./types";
/**
 * Headless hook for nav component logic.
 * Resolves nav items with active state, role-based visibility,
 * badge resolution from FromRefs, and collapse toggle.
 *
 * @param config - Nav component configuration from the manifest
 * @param pathname - Current URL pathname for active route detection
 * @returns Resolved nav items, active item, collapse state, and user info
 *
 * @example
 * ```tsx
 * const nav = useNav(navConfig, window.location.pathname);
 *
 * return (
 *   <aside>
 *     <button onClick={nav.toggleCollapse}>
 *       {nav.isCollapsed ? "Expand" : "Collapse"}
 *     </button>
 *     <ul>
 *       {nav.items.map((item) => (
 *         <li key={item.id} aria-current={item.isActive ? "page" : undefined}>
 *           <a href={item.href}>{item.label}</a>
 *         </li>
 *       ))}
 *     </ul>
 *   </aside>
 * );
 * ```
 */
export declare function useNav(config: NavConfig, pathname: string): UseNavResult;
