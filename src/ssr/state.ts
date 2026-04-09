// src/ssr/state.ts
import { dehydrate } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";

/** HTML element ID for the dehydrated state script tag. */
const STATE_ELEMENT_ID = "__SNAPSHOT_QUERY_STATE__";

/**
 * Serialize the QueryClient cache to an XSS-safe inline `<script>` tag.
 *
 * Uses TanStack Query's `dehydrate()` to extract the cache state and
 * JSON-serializes it with XSS escaping. The result is a complete `<script>` tag
 * ready for injection into the HTML document `<head>`.
 *
 * **XSS safety:** `safeJsonStringify()` escapes `</` to `<\/` in all string
 * values, preventing a browser from misinterpreting embedded `</script>`
 * sequences as closing the script tag.
 *
 * **Client pickup:** The client's hydration entry reads this element:
 * ```ts
 * const el = document.getElementById('__SNAPSHOT_QUERY_STATE__')
 * const state = el ? JSON.parse(el.textContent!) : null
 * // then pass to HydrationBoundary
 * ```
 *
 * @param queryClient - The per-request QueryClient after `prefetchQuery` calls.
 * @param nonce - Optional CSP nonce for the inline script tag.
 * @returns A complete `<script type="application/json">` tag string.
 */
export function serializeQueryState(
  queryClient: QueryClient,
  nonce?: string,
): string {
  const state = dehydrate(queryClient);
  const json = safeJsonStringify(state);
  const nonceAttr = nonce ? ` nonce="${nonce}"` : "";
  return `<script id="${STATE_ELEMENT_ID}" type="application/json"${nonceAttr}>${json}</script>`;
}

/**
 * JSON-stringify a value with XSS-safe escaping.
 *
 * Escapes `</` as `<\/` and `<!--` as `<\!--` in the JSON output.
 * Both are valid JSON and both prevent the HTML parser from misinterpreting
 * the script content.
 *
 * @param value - Any JSON-serializable value.
 * @returns A JSON string safe for embedding in a `<script>` tag.
 */
export function safeJsonStringify(value: unknown): string {
  return JSON.stringify(value)
    .replace(/<\//g, "<\\/")
    .replace(/<!--/g, "<\\!--");
}
