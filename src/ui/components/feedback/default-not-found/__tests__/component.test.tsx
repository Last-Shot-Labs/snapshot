import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DefaultNotFound } from "../component";

describe("DefaultNotFound", () => {
  it("renders a static not-found state", () => {
    const html = renderToStaticMarkup(
      <DefaultNotFound config={{ type: "not-found" }} />,
    );

    expect(html).toContain("Page not found");
    expect(html).toContain("404");
  });
});
