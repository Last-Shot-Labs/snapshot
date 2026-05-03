import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import {
  extendComponentSchema,
  slotsSchema,
  type ComponentConfigSchema,
} from "../../_base/schema";
import { dataSourceSchema, fromRefSchema } from "../../_base/types";

const messageThreadConfigShape = {
  /** Component type discriminator. */
  type: z.literal("message-thread"),
  /** API endpoint for message data, or static data via FromRef. Optional for code-first composition. */
  data: dataSourceSchema.optional(),
  /** Field name for message HTML content. Default: "content". */
  contentField: z.string().optional(),
  /** Field name for author display name. Default: "author.name". */
  authorNameField: z.string().optional(),
  /** Field name for author avatar URL. Default: "author.avatar". */
  authorAvatarField: z.string().optional(),
  /** Field name for message timestamp. Default: "timestamp". */
  timestampField: z.string().optional(),
  /** Field name for embeds array on each message. Default: "embeds". */
  embedsField: z.string().optional(),
  /** Show link embeds (YouTube, Twitter, etc.) below messages. Default: true. */
  showEmbeds: z.boolean().optional(),
  /** Show timestamps on messages. Default: true. */
  showTimestamps: z.boolean().optional(),
  /** Group messages by date with separators. Default: true. */
  groupByDate: z.boolean().optional(),
  /** Action when a message is clicked. */
  messageAction: actionSchema.optional(),
  /** Max height for the scrollable container. */
  maxHeight: z.string().optional(),
  /** Message to show when there are no messages. */
  emptyMessage: z.union([z.string(), fromRefSchema]).optional(),
  slots: slotsSchema([
    "root",
    "scrollArea",
    "loadingItem",
    "loadingAvatar",
    "loadingTitle",
    "loadingBody",
    "errorState",
    "emptyState",
    "dateSeparator",
    "dateRule",
    "dateLabel",
    "messageItem",
    "avatarImage",
    "avatarFallback",
    "contentColumn",
    "header",
    "authorName",
    "timestamp",
    "body",
    "embeds",
  ]).optional(),
} satisfies z.ZodRawShape;

/**
 * Zod config schema for the MessageThread component.
 *
 * Renders a scrollable message list with avatars, timestamps,
 * message grouping, date separators, and optional reactions/threading.
 *
 * @example
 * ```json
 * {
 *   "type": "message-thread",
 *   "data": "GET /api/channels/general/messages",
 *   "groupByDate": true,
 *   "maxHeight": "500px"
 * }
 * ```
 */
export const messageThreadConfigSchema: ComponentConfigSchema<
  typeof messageThreadConfigShape
> = extendComponentSchema(messageThreadConfigShape).strict();
