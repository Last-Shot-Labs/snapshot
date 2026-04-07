import type { EditorView } from "@codemirror/view";

/**
 * A toolbar item definition for the rich text editor.
 */
export interface ToolbarItem {
  /** Unique name matching the schema enum. */
  name: string;
  /** Lucide icon name from the Icon component. */
  icon: string;
  /** Human-readable label for accessibility. */
  label: string;
  /** Optional keyboard shortcut display string. */
  shortcut?: string;
  /** Whether this is an action button or a visual separator. */
  type: "action" | "separator";
  /** Prefix/suffix to wrap around the selection. */
  wrap?: [string, string];
}

/** All available toolbar items indexed by name. */
export const TOOLBAR_ITEMS: Record<string, ToolbarItem> = {
  bold: {
    name: "bold",
    icon: "bold",
    label: "Bold",
    shortcut: "Ctrl+B",
    type: "action",
    wrap: ["**", "**"],
  },
  italic: {
    name: "italic",
    icon: "italic",
    label: "Italic",
    shortcut: "Ctrl+I",
    type: "action",
    wrap: ["_", "_"],
  },
  strikethrough: {
    name: "strikethrough",
    icon: "strikethrough",
    label: "Strikethrough",
    type: "action",
    wrap: ["~~", "~~"],
  },
  h1: {
    name: "h1",
    icon: "heading-1",
    label: "Heading 1",
    type: "action",
    wrap: ["# ", ""],
  },
  h2: {
    name: "h2",
    icon: "heading-2",
    label: "Heading 2",
    type: "action",
    wrap: ["## ", ""],
  },
  h3: {
    name: "h3",
    icon: "heading-3",
    label: "Heading 3",
    type: "action",
    wrap: ["### ", ""],
  },
  "bullet-list": {
    name: "bullet-list",
    icon: "list",
    label: "Bullet List",
    type: "action",
    wrap: ["- ", ""],
  },
  "ordered-list": {
    name: "ordered-list",
    icon: "list-ordered",
    label: "Ordered List",
    type: "action",
    wrap: ["1. ", ""],
  },
  code: {
    name: "code",
    icon: "code",
    label: "Inline Code",
    type: "action",
    wrap: ["`", "`"],
  },
  "code-block": {
    name: "code-block",
    icon: "terminal",
    label: "Code Block",
    type: "action",
    wrap: ["```\n", "\n```"],
  },
  link: {
    name: "link",
    icon: "link",
    label: "Link",
    type: "action",
    wrap: ["[", "](url)"],
  },
  quote: {
    name: "quote",
    icon: "quote",
    label: "Quote",
    type: "action",
    wrap: ["> ", ""],
  },
  separator: {
    name: "separator",
    icon: "",
    label: "",
    type: "separator",
  },
};

/** Default toolbar items in order. */
export const DEFAULT_TOOLBAR: string[] = [
  "bold",
  "italic",
  "strikethrough",
  "separator",
  "h1",
  "h2",
  "h3",
  "separator",
  "bullet-list",
  "ordered-list",
  "separator",
  "code",
  "code-block",
  "link",
  "quote",
];

/**
 * Applies a toolbar action to a CodeMirror EditorView by wrapping or
 * prepending the current selection with the specified prefix/suffix.
 *
 * For line-prefix actions (headings, lists, quotes) the prefix is inserted
 * at the beginning of the line. For wrap actions (bold, italic, code) the
 * prefix and suffix surround the selection.
 *
 * @param view - The CodeMirror EditorView instance
 * @param item - The toolbar item to apply
 */
export function applyToolbarAction(view: EditorView, item: ToolbarItem): void {
  if (!item.wrap || item.type === "separator") return;

  const [prefix, suffix] = item.wrap;
  const { state } = view;
  const { from, to } = state.selection.main;
  const selected = state.sliceDoc(from, to);

  // Line-prefix items (no suffix, prefix ends with space) — insert at line start
  const isLinePrefix = suffix === "" && prefix.endsWith(" ");

  if (isLinePrefix) {
    const line = state.doc.lineAt(from);
    view.dispatch({
      changes: { from: line.from, insert: prefix },
      selection: {
        anchor: line.from + prefix.length,
        head: line.from + prefix.length + (to - from),
      },
    });
  } else {
    // Wrap selection
    const replacement = `${prefix}${selected}${suffix}`;
    view.dispatch({
      changes: { from, to, insert: replacement },
      selection: {
        anchor: from + prefix.length,
        head: from + prefix.length + selected.length,
      },
    });
  }

  view.focus();
}
