import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DefaultLoading } from "../component";

describe("DefaultLoading", () => {
  it("renders a static loading spinner", () => {
    const html = renderToStaticMarkup(
      <DefaultLoading config={{ type: "spinner", label: "Loading" }} />,
    );

    expect(html).toContain("Loading");
    expect(html).toContain('role="status"');
  });
});
