/**
 * `dashboardPage` preset factory.
 *
 * Composes a dashboard page from high-level options and returns a valid
 * manifest `PageConfig`. The generated page includes:
 *
 * - A page heading
 * - A responsive row of StatCards (one per stat in `options.stats`)
 * - An optional List component for recent activity (when `recentActivity` endpoint provided)
 */

import type { PageConfig } from "../manifest/types";
import type {
  ChartDef,
  DashboardPageOptions,
  StatDef,
} from "./types";

// ── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Converts a title to a slug suitable for component IDs.
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Maps a StatDef to a stat-card component config.
 */
function mapStatCard(stat: StatDef, index: number): Record<string, unknown> {
  const config: Record<string, unknown> = {
    type: "stat-card",
    id: `stat-${slugify(stat.label)}-${index}`,
    data: stat.endpoint,
    field: stat.valueKey,
    label: stat.label,
    span: 3,
  };

  if (stat.format) {
    config.format = stat.format;
  }

  if (stat.icon) {
    config.icon = stat.icon;
  }

  if (stat.trend) {
    config.trend = {
      field: stat.trend.key,
      sentiment: stat.trend.positive === "down" ? "up-is-bad" : "up-is-good",
      format: "percent",
    };
  }

  return config;
}

function mapChart(chart: ChartDef, index: number): Record<string, unknown> {
  return {
    type: "chart",
    id: `chart-${index}`,
    data: chart.endpoint,
    chartType: chart.variant,
    xKey: chart.series?.[0]?.field ?? "label",
    series:
      chart.series?.map((series, seriesIndex) => ({
        key: series.field,
        label: series.label ?? series.field,
        color: series.color ?? `var(--sn-chart-${seriesIndex + 1})`,
      })) ?? [{ key: "value", label: chart.title ?? "Value" }],
    span: chart.span ?? 6,
  };
}

// ── dashboardPage factory ────────────────────────────────────────────────────

/**
 * Builds a manifest `PageConfig` for a dashboard page.
 *
 * Consumers drop the result into their manifest's `pages` record:
 *
 * ```ts
 * const manifest = {
 *   pages: {
 *     "/dashboard": dashboardPage({
 *       title: "Overview",
 *       stats: [
 *         { label: "Total Users", endpoint: "GET /api/stats/users", valueKey: "count" },
 *         { label: "Revenue", endpoint: "GET /api/stats/revenue", valueKey: "total", format: "currency" },
 *         { label: "Orders", endpoint: "GET /api/stats/orders", valueKey: "total", format: "number" },
 *         { label: "Conversion", endpoint: "GET /api/stats/conversion", valueKey: "rate", format: "percent" },
 *       ],
 *       recentActivity: "GET /api/activity",
 *     }),
 *   },
 * };
 * ```
 *
 * @param options - High-level dashboard page options
 * @returns A valid manifest `PageConfig`
 */
export function dashboardPage(options: DashboardPageOptions): PageConfig {
  const slug = options.id ?? slugify(options.title);

  const content: Record<string, unknown>[] = [];

  // Page heading
  content.push({
    type: "heading",
    text: options.title,
    level: 1,
  });

  // Stat cards row — up to 4 per row; each card gets span 3 (12-col grid)
  if (options.stats.length > 0) {
    const statCardChildren = options.stats.map(mapStatCard);

    content.push({
      type: "row",
      gap: "md",
      children: statCardChildren,
    });
  }

  if (options.charts && options.charts.length > 0) {
    content.push({
      type: "row",
      gap: "md",
      children: options.charts.map(mapChart),
    });
  }

  // Optional recent activity list
  const activityFeed = options.activityFeed ?? (
    options.recentActivity
      ? {
          endpoint: options.recentActivity,
        }
      : undefined
  );
  if (activityFeed) {
    content.push({
      type: "heading",
      text: activityFeed.title ?? "Recent Activity",
      level: 2,
    });

    content.push({
      type: "list",
      id: `${slug}-activity`,
      data: activityFeed.endpoint,
      limit: activityFeed.limit,
      emptyMessage: "No recent activity",
    });
  }

  return {
    title: options.title,
    content: content as PageConfig["content"],
  };
}
