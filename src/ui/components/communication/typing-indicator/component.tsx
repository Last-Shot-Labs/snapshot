'use client';

import { useSubscribe } from "../../../context/hooks";
import type { SlotOverrides } from "../../_base/types";
import { TypingIndicatorBase } from "./standalone";
import type { TypingUser } from "./standalone";
import type { TypingIndicatorConfig } from "./types";

function normalizeTypingUsers(value: unknown): TypingUser[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (typeof entry === "string") {
      const name = entry.trim();
      return name ? [{ name }] : [];
    }

    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return [];
    }

    const record = entry as Record<string, unknown>;
    const name = typeof record.name === "string" ? record.name.trim() : "";
    if (!name) {
      return [];
    }

    return [
      {
        name,
        avatar: typeof record.avatar === "string" ? record.avatar : undefined,
      },
    ];
  });
}

/**
 * Manifest adapter — resolves config refs and delegates to TypingIndicatorBase.
 */
export function TypingIndicator({ config }: { config: TypingIndicatorConfig }) {
  const visible = useSubscribe(config.visible ?? true);
  const rawUsers = useSubscribe(config.users ?? []);

  if (visible === false) return null;

  const users = normalizeTypingUsers(rawUsers);

  return (
    <TypingIndicatorBase
      id={config.id}
      users={users}
      maxDisplay={config.maxDisplay}
      className={config.className}
      style={config.style}
      slots={config.slots as SlotOverrides}
    />
  );
}
