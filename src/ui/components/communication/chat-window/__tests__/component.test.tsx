// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { afterEach } from "vitest";
import { ChatWindow } from "../component";

const refValues: Record<string, unknown> = {
  "state.chat.title": "#general-{route.params.id}",
  "state.chat.subtitle": "Team chat on {route.path}",
  "state.chat.placeholder": "Reply to thread",
};
const richInputCapture = vi.hoisted(
  () => ({ config: null as Record<string, unknown> | null }),
);

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (value && typeof value === "object") {
    if ("from" in (value as Record<string, unknown>)) {
      return refValues[(value as unknown as { from: string }).from] as T;
    }

    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        resolveRefs(entry),
      ]),
    ) as T;
  }

  return value;
}

vi.mock("../../../../context/hooks", async () => {
  const actual = await vi.importActual("../../../../context/hooks");

  return {
    ...actual,
    useSubscribe: (value: unknown) =>
      value && typeof value === "object" && "from" in (value as Record<string, unknown>)
        ? refValues[(value as { from: string }).from]
        : value,
    usePublish: () => vi.fn(),
    useResolveFrom: resolveRefs,
  };
});

vi.mock("../../../../manifest/runtime", async () => {
  const actual = await vi.importActual("../../../../manifest/runtime");

  return {
    ...actual,
    useManifestRuntime: () => ({
      raw: { routes: [] },
      app: {},
      auth: {},
    }),
    useRouteRuntime: () => ({
      currentRoute: { id: "chat" },
      currentPath: "/threads/thread-9",
      params: { id: "thread-9" },
      query: {},
    }),
  };
});

vi.mock("../../message-thread/component", () => ({
  MessageThread: () => <div data-testid="mock-message-thread">Thread</div>,
}));

vi.mock("../../../content/rich-input/component", () => ({
  RichInput: ({ config }: { config: Record<string, unknown> }) => {
    richInputCapture.config = config;
    return <div data-testid="mock-rich-input">Input</div>;
  },
}));

vi.mock("../../typing-indicator/component", () => ({
  TypingIndicator: () => <div data-testid="mock-typing-indicator">Typing</div>,
}));

afterEach(() => {
  cleanup();
  richInputCapture.config = null;
});

describe("ChatWindow", () => {
  it("renders header and composed child surfaces", () => {
    render(
      <ChatWindow
        config={{
          type: "chat-window",
          id: "team-chat",
          className: "chat-root",
          data: "GET /api/messages",
          title: "#general",
          subtitle: "Team chat",
          sendAction: {
            type: "event",
            name: "send-message",
          } as never,
        }}
      />,
    );

    expect(screen.getByTestId("chat-window")).toBeTruthy();
    expect(
      document
        .querySelector('[data-snapshot-id="team-chat"]')
        ?.classList.contains("chat-root"),
    ).toBe(true);
    expect(screen.getByTestId("chat-header").textContent).toContain("#general");
    expect(screen.getByTestId("chat-header").textContent).toContain("Team chat");
    expect(screen.getByTestId("mock-message-thread").textContent).toBe("Thread");
    expect(screen.getByTestId("mock-rich-input").textContent).toBe("Input");
    expect(screen.getByTestId("mock-typing-indicator").textContent).toBe(
      "Typing",
    );
  });

  it("passes ref-backed header copy and input placeholder through the composed config", () => {
    render(
      <ChatWindow
        config={{
          type: "chat-window",
          data: "GET /api/messages",
          title: { from: "state.chat.title" } as never,
          subtitle: { from: "state.chat.subtitle" } as never,
          inputPlaceholder: { from: "state.chat.placeholder" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("chat-header").textContent).toContain("#general-thread-9");
    expect(screen.getByTestId("chat-header").textContent).toContain("Team chat on /threads/thread-9");
    expect(richInputCapture.config?.placeholder).toEqual({
      from: "state.chat.placeholder",
    });
  });
});
