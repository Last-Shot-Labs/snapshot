// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LinkEmbed } from "../component";

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
}));

vi.mock("../../../../icons/index", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}));

describe("LinkEmbed", () => {
  it("renders a generic card when no platform embed applies", () => {
    render(
      <LinkEmbed
        config={{
          type: "link-embed",
          url: "https://example.com/post",
          allowIframe: false,
          meta: {
            title: "Example Post",
            description: "Preview description",
            siteName: "Example Site",
          },
        }}
      />,
    );

    expect(screen.getByTestId("link-embed").getAttribute("data-platform")).toBe("generic");
    expect(screen.getByText("Example Post")).toBeTruthy();
    expect(screen.getByRole("link").getAttribute("href")).toBe("https://example.com/post");
  });
});
