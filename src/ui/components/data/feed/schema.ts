import { z } from "zod";

/**
 * A reference to another component's published value.
 */
const fromRefSchema = z.object({
  from: z.string(),
});

/**
 * Zod schema for the Feed component configuration.
 *
 * Renders a scrollable activity/event stream from an endpoint or from-ref.
 * Supports avatar, title, description, timestamp, badge fields, pagination,
 * and publishes the selected item to the page context when `id` is set.
 *
 * @example
 * ```json
 * {
 *   "type": "feed",
 *   "id": "activity-feed",
 *   "data": "GET /api/activity",
 *   "itemKey": "id",
 *   "title": "message",
 *   "description": "detail",
 *   "timestamp": "createdAt",
 *   "avatar": "avatarUrl",
 *   "badge": { "field": "type", "colorMap": { "error": "destructive", "info": "info" } },
 *   "pageSize": 10
 * }
 * ```
 */
export const feedSchema = z.object({
  /** Optional component id for publishing selected item to the page context. */
  id: z.string().optional(),
  /** Data source: endpoint string (e.g. "GET /api/events") or a FromRef. */
  data: z.union([z.string(), fromRefSchema]),
  /** Field in each item used as the React key. Defaults to "id". */
  itemKey: z.string().default("id"),
  /** Field path for the avatar image URL (optional). */
  avatar: z.string().optional(),
  /** Field path for the item title. */
  title: z.string(),
  /** Field path for the item description (optional). */
  description: z.string().optional(),
  /** Field path for the ISO timestamp (optional). */
  timestamp: z.string().optional(),
  /** Badge configuration — field + optional color map. */
  badge: z
    .object({
      /** Field path for the badge value. */
      field: z.string(),
      /** Maps field values to semantic color names (e.g. { "error": "destructive" }). */
      colorMap: z.record(z.string()).optional(),
    })
    .optional(),
  /** Message shown when there are no items. */
  emptyMessage: z.string().default("No activity yet"),
  /** Number of items per page. */
  pageSize: z.number().int().min(1).default(20),
});
