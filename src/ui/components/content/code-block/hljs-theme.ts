/**
 * Returns a CSS string with dedicated syntax highlighting colors for
 * code blocks and the rich text editor preview.
 *
 * These are NOT mapped to semantic UI tokens — code highlighting uses
 * its own purpose-built palette that stays consistent across flavors.
 * Light and dark variants are provided via `.dark` scope.
 */
export function getHljsThemeCss(): string {
  const scopes = [
    '[data-snapshot-component="code-block"]',
    '[data-snapshot-component="rich-text-editor"]',
  ];
  const s = scopes.join(",\n");

  return `
/* ── Light mode syntax colors ─────────────────────────────────── */
${s} {
  --sn-syn-keyword: #8250df;
  --sn-syn-string: #0a3069;
  --sn-syn-comment: #6e7781;
  --sn-syn-number: #0550ae;
  --sn-syn-function: #8250df;
  --sn-syn-builtin: #0550ae;
  --sn-syn-type: #953800;
  --sn-syn-variable: #953800;
  --sn-syn-literal: #0550ae;
  --sn-syn-attr: #116329;
  --sn-syn-tag: #116329;
  --sn-syn-meta: #6e7781;
  --sn-syn-regexp: #0a3069;
  --sn-syn-addition: #116329;
  --sn-syn-deletion: #82071e;
  --sn-syn-addition-bg: #dafbe1;
  --sn-syn-deletion-bg: #ffebe9;
}

/* ── Dark mode syntax colors ──────────────────────────────────── */
.dark ${scopes[0]},
.dark ${scopes[1]} {
  --sn-syn-keyword: #ff7b72;
  --sn-syn-string: #a5d6ff;
  --sn-syn-comment: #8b949e;
  --sn-syn-number: #79c0ff;
  --sn-syn-function: #d2a8ff;
  --sn-syn-builtin: #79c0ff;
  --sn-syn-type: #ffa657;
  --sn-syn-variable: #ffa657;
  --sn-syn-literal: #79c0ff;
  --sn-syn-attr: #7ee787;
  --sn-syn-tag: #7ee787;
  --sn-syn-meta: #8b949e;
  --sn-syn-regexp: #a5d6ff;
  --sn-syn-addition: #aff5b4;
  --sn-syn-deletion: #ffdcd7;
  --sn-syn-addition-bg: #033a16;
  --sn-syn-deletion-bg: #67060c;
}

/* ── Token class mappings ─────────────────────────────────────── */
${s} .hljs-keyword,
${s} .hljs-selector-tag { color: var(--sn-syn-keyword); }

${s} .hljs-string,
${s} .hljs-doctag { color: var(--sn-syn-string); }

${s} .hljs-comment { color: var(--sn-syn-comment); font-style: italic; }

${s} .hljs-number { color: var(--sn-syn-number); }

${s} .hljs-title,
${s} .hljs-title\\.function_,
${s} .hljs-function { color: var(--sn-syn-function); }

${s} .hljs-built_in { color: var(--sn-syn-builtin); }

${s} .hljs-type,
${s} .hljs-title\\.class_ { color: var(--sn-syn-type); }

${s} .hljs-variable,
${s} .hljs-template-variable { color: var(--sn-syn-variable); }

${s} .hljs-literal { color: var(--sn-syn-literal); }

${s} .hljs-attr,
${s} .hljs-attribute { color: var(--sn-syn-attr); }

${s} .hljs-selector-class,
${s} .hljs-tag { color: var(--sn-syn-tag); }

${s} .hljs-meta,
${s} .hljs-meta .hljs-keyword { color: var(--sn-syn-meta); }

${s} .hljs-regexp { color: var(--sn-syn-regexp); }

${s} .hljs-params { color: inherit; }

${s} .hljs-addition {
  color: var(--sn-syn-addition);
  background-color: var(--sn-syn-addition-bg);
}

${s} .hljs-deletion {
  color: var(--sn-syn-deletion);
  background-color: var(--sn-syn-deletion-bg);
}

${s} .hljs-emphasis { font-style: italic; }
${s} .hljs-strong { font-weight: 700; }
`.trim();
}
