import { useMemo } from "react";
import { useSubscribe, usePublish } from "../../../context/hooks";
import { useComponentData } from "../../_base/use-component-data";
import type { AvatarGroupConfig } from "./types";

/** Size → pixel dimensions. */
const SIZE_MAP: Record<string, number> = {
  sm: 28,
  md: 36,
  lg: 44,
};

/** Size → font size for initials. */
const FONT_SIZE_MAP: Record<string, string> = {
  sm: "var(--sn-font-size-xs, 0.625rem)",
  md: "var(--sn-font-size-xs, 0.75rem)",
  lg: "var(--sn-font-size-sm, 0.875rem)",
};

/** Get initials from a name. */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Deterministic color from a name string. */
function nameToColor(name: string): string {
  const colors = [
    "var(--sn-color-primary, #2563eb)",
    "var(--sn-color-success, #16a34a)",
    "var(--sn-color-warning, #f59e0b)",
    "var(--sn-color-info, #3b82f6)",
    "var(--sn-color-destructive, #dc2626)",
    "var(--sn-color-accent, #8b5cf6)",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length]!;
}

/**
 * AvatarGroup — displays a row of overlapping avatars with "+N" overflow.
 *
 * Supports static `avatars` array or API-loaded data. Each avatar shows
 * an image or initials fallback with a deterministic background color.
 *
 * @param props - Component props containing the avatar group configuration
 */
export function AvatarGroup({ config }: { config: AvatarGroupConfig }) {
  const visible = useSubscribe(config.visible ?? true);
  const publish = usePublish(config.id);

  const hasData = config.data != null;
  const dataResult = hasData
    ? useComponentData(config.data!, undefined) // eslint-disable-line react-hooks/rules-of-hooks
    : { data: null, isLoading: false, error: null };

  const size = config.size ?? "md";
  const px = SIZE_MAP[size] ?? 36;
  const max = config.max ?? 5;
  const overlap = config.overlap ?? Math.round(px * 0.3);
  const nameField = config.nameField ?? "name";
  const srcField = config.srcField ?? "avatar";

  // Resolve avatars from static config or API data
  const avatars = useMemo(() => {
    if (config.avatars) {
      return config.avatars;
    }
    if (!dataResult.data) return [];
    const items = Array.isArray(dataResult.data)
      ? dataResult.data
      : (dataResult.data as Record<string, unknown>).data ??
        (dataResult.data as Record<string, unknown>).items ??
        [];
    if (!Array.isArray(items)) return [];
    return items.map((item: Record<string, unknown>) => ({
      name: String(item[nameField] ?? ""),
      src: item[srcField] ? String(item[srcField]) : undefined,
    }));
  }, [config.avatars, dataResult.data, nameField, srcField]);

  if (visible === false) return null;

  const displayed = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div
      data-snapshot-component="avatar-group"
      data-testid="avatar-group"
      className={config.className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        ...((config.style as React.CSSProperties) ?? {}),
      }}
    >
      {displayed.map((avatar, i) => (
        <div
          key={`${avatar.name}-${i}`}
          title={avatar.name}
          style={{
            width: px,
            height: px,
            borderRadius: "var(--sn-radius-full, 9999px)",
            border: "2px solid var(--sn-color-card, #ffffff)",
            overflow: "hidden",
            flexShrink: 0,
            marginLeft: i > 0 ? `-${overlap}px` : undefined,
            position: "relative",
            zIndex: displayed.length - i,
          }}
        >
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={avatar.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: nameToColor(avatar.name),
                color: "#ffffff",
                fontSize: FONT_SIZE_MAP[size],
                fontWeight:
                  "var(--sn-font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
              }}
            >
              {getInitials(avatar.name) || "?"}
            </div>
          )}
        </div>
      ))}

      {/* +N overflow */}
      {overflow > 0 && (
        <div
          data-testid="avatar-overflow"
          title={`${overflow} more`}
          style={{
            width: px,
            height: px,
            borderRadius: "var(--sn-radius-full, 9999px)",
            border: "2px solid var(--sn-color-card, #ffffff)",
            backgroundColor: "var(--sn-color-muted, #e5e7eb)",
            color: "var(--sn-color-muted-foreground, #6b7280)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: FONT_SIZE_MAP[size],
            fontWeight:
              "var(--sn-font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
            marginLeft: `-${overlap}px`,
            flexShrink: 0,
            position: "relative",
            zIndex: 0,
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
