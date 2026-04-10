import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DefaultOffline } from "../component";

describe("DefaultOffline", () => {
  it("renders a static offline state", () => {
    const html = renderToStaticMarkup(
      <DefaultOffline config={{ type: "offline-banner" }} />,
    );

    expect(html).toContain("You&#x27;re offline");
    expect(html).toContain('role="status"');
  });
});
