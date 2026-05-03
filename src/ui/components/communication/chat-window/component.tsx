'use client';

import { useResolveFrom, useSubscribe } from "../../../context/hooks";
import type { SlotOverrides } from "../../_base/types";
import { extractSurfaceConfig } from "../../_base/style-surfaces";
import { resolveOptionalPrimitiveValue, usePrimitiveValueOptions } from "../../primitives/resolve-value";
import { RichInput } from "../../content/rich-input/component";
import type { RichInputConfig } from "../../content/rich-input/types";
import { MessageThread } from "../message-thread/component";
import type { MessageThreadConfig } from "../message-thread/types";
import { TypingIndicator } from "../typing-indicator/component";
import type { TypingIndicatorConfig } from "../typing-indicator/types";
import { ChatWindowBase } from "./standalone";
import type { ChatWindowConfig } from "./types";

function normalizeTypingUsers(
  users: ChatWindowConfig["typingUsers"],
): TypingIndicatorConfig["users"] {
  if (!Array.isArray(users)) {
    return users as TypingIndicatorConfig["users"];
  }

  return users.flatMap((name) => {
    const value = typeof name === "string" ? name.trim() : "";
    return value ? [{ name: value }] : [];
  });
}

/**
 * Manifest adapter — resolves config refs, composes manifest sub-components, delegates to ChatWindowBase.
 */
export function ChatWindow({ config }: { config: ChatWindowConfig }) {
  const visible = useSubscribe(config.visible ?? true);
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({ title: config.title, subtitle: config.subtitle });
  const title = resolveOptionalPrimitiveValue(resolvedConfig.title, primitiveOptions);
  const subtitle = resolveOptionalPrimitiveValue(resolvedConfig.subtitle, primitiveOptions);
  const surfaceConfig = extractSurfaceConfig(config);

  if (visible === false) return null;

  const threadConfig: MessageThreadConfig = {
    type: "message-thread",
    data: config.data,
    contentField: config.contentField,
    authorNameField: config.authorNameField,
    authorAvatarField: config.authorAvatarField,
    timestampField: config.timestampField,
    showTimestamps: config.showTimestamps ?? true,
    groupByDate: config.groupByDate ?? true,
  };

  const inputConfig: RichInputConfig = {
    type: "rich-input",
    placeholder: config.inputPlaceholder ?? "Type a message...",
    sendOnEnter: true,
    sendAction: config.sendAction,
    mentionData: config.mentionData,
    minHeight: "2.5rem",
    maxHeight: "8rem",
    features: (config.inputFeatures as RichInputConfig["features"]) ?? ["bold", "italic", "strike", "code", "link", "bullet-list", "ordered-list"],
  };

  const typingConfig: TypingIndicatorConfig = {
    type: "typing-indicator",
    users: normalizeTypingUsers(config.typingUsers ?? []),
  };

  return (
    <ChatWindowBase
      id={config.id}
      title={title}
      subtitle={subtitle}
      showHeader={config.showHeader}
      showTypingIndicator={config.showTypingIndicator}
      height={config.height}
      threadSlot={<MessageThread config={{ ...threadConfig, maxHeight: undefined }} />}
      typingSlot={<TypingIndicator config={typingConfig} />}
      inputSlot={<RichInput config={inputConfig} />}
      className={surfaceConfig?.className as string | undefined}
      style={surfaceConfig?.style as React.CSSProperties | undefined}
      slots={config.slots as SlotOverrides}
    />
  );
}
