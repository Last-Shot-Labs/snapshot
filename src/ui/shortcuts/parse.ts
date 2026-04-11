import type { ParsedCombo } from "./types";

/**
 * Parse a shortcut string like "ctrl+k" or "shift+?" into a structured combo.
 */
export function parseCombo(combo: string): ParsedCombo {
  const parts = combo.toLowerCase().split("+").map(p => p.trim());
  return {
    ctrl: parts.includes("ctrl") || parts.includes("control"),
    alt: parts.includes("alt"),
    shift: parts.includes("shift"),
    meta: parts.includes("meta") || parts.includes("cmd") || parts.includes("command"),
    key: parts.filter(p => !["ctrl", "control", "alt", "shift", "meta", "cmd", "command"].includes(p)).pop() ?? "",
  };
}

/**
 * Check if a keyboard event matches a parsed combo.
 */
export function matchesCombo(event: KeyboardEvent, combo: ParsedCombo): boolean {
  if (combo.ctrl !== event.ctrlKey) return false;
  if (combo.alt !== event.altKey) return false;
  if (combo.shift !== event.shiftKey) return false;
  if (combo.meta !== event.metaKey) return false;
  return event.key.toLowerCase() === combo.key;
}
