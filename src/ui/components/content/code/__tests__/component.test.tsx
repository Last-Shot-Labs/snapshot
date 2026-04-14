// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Code } from "../component";

vi.mock("../../../../context", () => ({
  useSubscribe: (value: unknown) => value,
}));

describe("Code", () => {
  it("renders fallback content and forwards class/style props", () => {
    render(
      <Code
        config={{
          type: "code",
          value: "",
          fallback: "npm run dev",
          className: "inline-command",
          style: { opacity: 0.8 },
        }}
      />,
    );

    const code = screen.getByText("npm run dev");
    expect(code.tagName).toBe("CODE");
    expect(code.classList.contains("inline-command")).toBe(true);
    expect((code as HTMLElement).style.opacity).toBe("0.8");
  });
});
