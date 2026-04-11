import { parseCombo, matchesCombo } from "./parse";
import type { ShortcutBinding } from "./types";

/**
 * Register a global keyboard shortcut listener.
 * Returns an unsubscribe function.
 *
 * Ignores shortcuts when the user is typing in an input, textarea, or
 * contenteditable element (unless the shortcut has a modifier key).
 */
export function registerShortcuts(
  shortcuts: Record<string, ShortcutBinding>,
  executor: (action: Record<string, unknown>) => void,
): () => void {
  const parsed = Object.entries(shortcuts).map(([combo, action]) => ({
    combo: parseCombo(combo),
    action,
    hasModifier: combo.includes("ctrl") || combo.includes("alt") || combo.includes("meta") || combo.includes("cmd"),
  }));

  function handler(event: KeyboardEvent) {
    // Skip when typing in inputs (unless shortcut has a modifier)
    const target = event.target as HTMLElement;
    const isTyping =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable;

    for (const { combo, action, hasModifier } of parsed) {
      if (isTyping && !hasModifier) continue;
      if (matchesCombo(event, combo)) {
        event.preventDefault();
        event.stopPropagation();
        executor(action as Record<string, unknown>);
        return;
      }
    }
  }

  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}
