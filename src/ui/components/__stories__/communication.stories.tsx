import React, { useState, useCallback } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { ChatWindowBase } from "../communication/chat-window/standalone";
import { CommentSectionBase } from "../communication/comment-section/standalone";
import { TypingIndicatorBase } from "../communication/typing-indicator/standalone";
import { PresenceIndicatorBase } from "../communication/presence-indicator/standalone";
import { ReactionBarBase } from "../communication/reaction-bar/standalone";
import { MessageThreadBase } from "../communication/message-thread/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createChatMessages(count = 3) {
  const pool = [
    {
      content: "Hey team, the new deployment pipeline is live. Please test your staging branches.",
      author: { name: "Ada Lovelace", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" },
      timestamp: "2026-05-01T14:34:00Z",
    },
    {
      content: "Nice! I'll push a test build now.",
      author: { name: "Grace Hopper" },
      timestamp: "2026-05-01T14:36:00Z",
    },
    {
      content: "Staging build passed all checks. Looks solid.",
      author: { name: "Katherine Johnson" },
      timestamp: "2026-05-01T14:42:00Z",
    },
    {
      content: "Should I also run the integration suite?",
      author: { name: "Margaret Hamilton" },
      timestamp: "2026-05-01T14:45:00Z",
    },
    {
      content: "Yes please -- let's get full coverage before merging to main.",
      author: { name: "Ada Lovelace", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" },
      timestamp: "2026-05-01T14:47:00Z",
    },
  ];
  return pool.slice(0, count).map((msg, i) => ({ id: String(i + 1), ...msg }));
}

function createComments() {
  return [
    {
      id: "c1",
      content: "This looks great -- love the new color system.",
      author: { name: "Ada Lovelace", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" },
      timestamp: "2026-05-01T12:00:00Z",
    },
    {
      id: "c2",
      content: "Agreed. The OKLCH approach gives us much smoother gradients than HSL.",
      author: { name: "Grace Hopper" },
      timestamp: "2026-05-01T13:00:00Z",
    },
  ];
}

function createReactions() {
  return [
    { emoji: "\u{1F44D}", count: 5, active: true },
    { emoji: "\u{2764}️", count: 3, active: false },
    { emoji: "\u{1F389}", count: 2, active: false },
    { emoji: "\u{1F680}", count: 1, active: true },
  ];
}

function createThreadMessages() {
  return [
    { id: "m1", content: "Can someone review PR #142?", author: { name: "Ada Lovelace" }, timestamp: "2026-05-01T10:15:00Z" },
    { id: "m2", content: "On it -- I'll take a look after standup.", author: { name: "Grace Hopper" }, timestamp: "2026-05-01T10:18:00Z" },
    { id: "m3", content: "LGTM, approved and merged.", author: { name: "Grace Hopper" }, timestamp: "2026-05-01T11:42:00Z" },
  ];
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  border: "1px solid var(--sn-color-border, #e5e7eb)",
  borderRadius: "var(--sn-radius-md, 0.375rem)",
  fontSize: "0.875rem",
  outline: "none",
};

const LABEL_STYLE: React.CSSProperties = {
  margin: "0 0 0.5rem",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "var(--sn-color-muted-foreground)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.02em",
};

// ── Chat Window Meta ───────────────────────────────────────────────────────

const chatMeta = {
  title: "Components/Communication/Chat",
  component: ChatWindowBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Real-time communication components including chat windows, message threads, comment sections, typing indicators, presence status, and emoji reactions.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Chat window header title.",
    },
    subtitle: {
      control: "text",
      description: "Subtitle shown below the title (e.g., member count).",
    },
  },
} satisfies Meta<typeof ChatWindowBase>;

export default chatMeta;

// ── Chat Window ────────────────────────────────────────────────────────────

export const ChatWindow: StoryObj<typeof ChatWindowBase> = {
  render: () => {
    const messages = createChatMessages(3);
    return (
      <div style={{ height: 480, maxWidth: 420 }}>
        <ChatWindowBase
          title="Team chat"
          subtitle="3 members online"
          threadSlot={<MessageThreadBase messages={messages} maxHeight="100%" />}
          typingSlot={<TypingIndicatorBase users={[{ name: "Ada" }]} />}
          inputSlot={<input placeholder="Type a message..." style={INPUT_STYLE} />}
        />
      </div>
    );
  },
};

// ── Chat Window: With Typing ───────────────────────────────────────────────

export const ChatWindowWithTyping: StoryObj<typeof ChatWindowBase> = {
  name: "Chat Window / Typing Indicator",
  render: () => {
    function TypingChatDemo() {
      const [messages, setMessages] = useState(createChatMessages(3));
      const [inputValue, setInputValue] = useState("");
      const [isTyping, setIsTyping] = useState(true);

      const sendMessage = useCallback(() => {
        if (!inputValue.trim()) return;
        setMessages((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            content: inputValue,
            author: { name: "You" },
            timestamp: new Date().toISOString(),
          },
        ]);
        setInputValue("");
        setIsTyping(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: String(prev.length + 1),
              content: "Thanks for the update! Let me check that.",
              author: { name: "Ada Lovelace" },
              timestamp: new Date().toISOString(),
            },
          ]);
          setIsTyping(false);
        }, 2000);
      }, [inputValue]);

      return (
        <div style={{ height: 520, maxWidth: 440 }}>
          <ChatWindowBase
            title="#engineering"
            subtitle={`${messages.length} messages`}
            threadSlot={<MessageThreadBase messages={messages} maxHeight="100%" />}
            typingSlot={isTyping ? <TypingIndicatorBase users={[{ name: "Ada" }, { name: "Grace" }]} /> : null}
            inputSlot={
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  placeholder="Type a message..."
                  style={{ ...INPUT_STYLE, flex: 1 }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "var(--sn-color-primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--sn-radius-md, 0.375rem)",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  Send
                </button>
              </div>
            }
          />
        </div>
      );
    }
    return <TypingChatDemo />;
  },
};

// ── Message Thread ──────────────────────────────────────────────────────────

export const MessageThread: StoryObj<typeof MessageThreadBase> = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <MessageThreadBase messages={createThreadMessages()} />
    </div>
  ),
};

// ── Comment Section ─────────────────────────────────────────────────────────

export const CommentSection: StoryObj<typeof CommentSectionBase> = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <CommentSectionBase
        comments={createComments()}
        inputSlot={<input placeholder="Add a comment..." style={INPUT_STYLE} />}
      />
    </div>
  ),
};

// ── Typing Indicator ────────────────────────────────────────────────────────

export const TypingIndicator: StoryObj<typeof TypingIndicatorBase> = {
  render: (args) => <TypingIndicatorBase {...args} />,
  args: {
    users: [{ name: "Ada" }, { name: "Grace" }],
  },
};

// ── Presence: All States ───────────────────────────────────────────────────

export const PresenceIndicator: StoryObj<typeof PresenceIndicatorBase> = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <PresenceIndicatorBase status="online" label="Online" />
      <PresenceIndicatorBase status="away" label="Away" />
      <PresenceIndicatorBase status="busy" label="Busy" />
      <PresenceIndicatorBase status="offline" label="Offline" />
    </div>
  ),
};

export const PresenceAllStates: StoryObj<typeof PresenceIndicatorBase> = {
  name: "Presence / All States",
  render: () => {
    const states = [
      { status: "online" as const, label: "Ada Lovelace", description: "Active now" },
      { status: "away" as const, label: "Grace Hopper", description: "Away for 15 min" },
      { status: "busy" as const, label: "Katherine Johnson", description: "In a meeting" },
      { status: "offline" as const, label: "Margaret Hamilton", description: "Last seen 2h ago" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {states.map((state) => (
          <div key={state.status} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <PresenceIndicatorBase status={state.status} label={state.label} />
            <span style={{ fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)" }}>
              {state.description}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

// ── Reaction Bar ────────────────────────────────────────────────────────────

export const ReactionBar: StoryObj<typeof ReactionBarBase> = {
  render: (args) => <ReactionBarBase {...args} />,
  args: {
    reactions: createReactions(),
  },
};
