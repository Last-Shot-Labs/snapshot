import { parseChord, matchesCombo } from "./parse";
import type { ActionConfig } from "../actions/types";
import type { ParsedShortcut, ShortcutBinding } from "./types";

const CHORD_TIMEOUT = 1000;

/**
 * Register a global keyboard shortcut listener.
 * Returns an unsubscribe function.
 *
 * Ignores shortcuts when the user is typing in an input, textarea, or
 * contenteditable element (unless the shortcut has a modifier key).
 */
export function registerShortcuts(
  shortcuts: Record<string, ShortcutBinding>,
  executor: (action: ActionConfig | ActionConfig[]) => void,
): () => void {
  const parsed: ParsedShortcut[] = Object.entries(shortcuts)
    .filter(([, binding]) => binding.disabled !== true)
    .map(([combo, binding]) => ({
      id: combo,
      sequence: parseChord(combo),
      binding,
      hasModifier: combo
        .toLowerCase()
        .split(/\s+then\s+/i)
        .some(
          (segment) =>
            segment.includes("ctrl") ||
            segment.includes("alt") ||
            segment.includes("meta") ||
            segment.includes("cmd"),
        ),
    }))
    .filter((entry) => entry.sequence.length > 0);

  let activeChord:
    | {
        id: string;
        nextIndex: number;
        timer: ReturnType<typeof setTimeout>;
      }
    | undefined;

  function clearActiveChord() {
    if (activeChord?.timer) {
      clearTimeout(activeChord.timer);
    }
    activeChord = undefined;
  }

  function handler(event: KeyboardEvent) {
    // Skip when typing in inputs (unless shortcut has a modifier)
    const target = event.target as HTMLElement;
    const isTyping =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable;

    if (activeChord) {
      const activeEntry = parsed.find((entry) => entry.id === activeChord?.id);
      const expected = activeEntry?.sequence[activeChord.nextIndex];
      if (activeEntry && expected && matchesCombo(event, expected)) {
        event.preventDefault();
        event.stopPropagation();
        if (activeChord.nextIndex === activeEntry.sequence.length - 1) {
          clearActiveChord();
          executor(activeEntry.binding.action);
          return;
        }

        const timer = setTimeout(() => {
          clearActiveChord();
        }, CHORD_TIMEOUT);
        clearTimeout(activeChord.timer);
        activeChord = {
          id: activeEntry.id,
          nextIndex: activeChord.nextIndex + 1,
          timer,
        };
        return;
      }

      clearActiveChord();
    }

    for (const entry of parsed) {
      const combo = entry.sequence[0];
      if (!combo) {
        continue;
      }
      if (isTyping && !entry.hasModifier) {
        continue;
      }
      if (!matchesCombo(event, combo)) {
        continue;
      }

      event.preventDefault();
      event.stopPropagation();

      if (entry.sequence.length === 1) {
        executor(entry.binding.action);
        return;
      }

      activeChord = {
        id: entry.id,
        nextIndex: 1,
        timer: setTimeout(() => {
          clearActiveChord();
        }, CHORD_TIMEOUT),
      };
      return;
    }
  }

  window.addEventListener("keydown", handler);
  return () => {
    clearActiveChord();
    window.removeEventListener("keydown", handler);
  };
}
