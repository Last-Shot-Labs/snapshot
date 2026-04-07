import { z } from "zod";
import { fromRefSchema } from "../../../manifest/schema";

/**
 * Zod config schema for the CodeBlock component.
 *
 * Defines all manifest-settable fields for a code display block
 * with optional copy button and line numbers.
 *
 * @example
 * ```json
 * {
 *   "type": "code-block",
 *   "code": "const x = 42;",
 *   "language": "typescript",
 *   "showLineNumbers": true,
 *   "title": "example.ts"
 * }
 * ```
 */
export const codeBlockConfigSchema = z
  .object({
    /** Component type discriminator. */
    type: z.literal("code-block"),
    /** The code content to display. Supports FromRef. */
    code: z.union([z.string(), fromRefSchema]),
    /** Language label (displayed in title bar, not used for highlighting). */
    language: z.string().optional(),
    /** Show line numbers. Default: false. */
    showLineNumbers: z.boolean().optional(),
    /** Show copy-to-clipboard button. Default: true. */
    showCopy: z.boolean().optional(),
    /** Max height with scroll overflow. e.g. "400px". */
    maxHeight: z.string().optional(),
    /** Filename or title shown in the title bar. */
    title: z.string().optional(),
    /** Wrap long lines instead of horizontal scroll. Default: false. */
    wrap: z.boolean().optional(),
    // --- BaseComponentConfig fields ---
    /** Component id for publishing/subscribing. */
    id: z.string().optional(),
    /** Visibility toggle. */
    visible: z.union([z.boolean(), fromRefSchema]).optional(),
    /** Additional CSS class name. */
    className: z.string().optional(),
  })
  .strict();
