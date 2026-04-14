import { describe, expect, it } from "vitest";
import { selectConfigSchema } from "../schema";

describe("selectConfigSchema", () => {
  it("accepts a resource-backed option source", () => {
    const result = selectConfigSchema.safeParse({
      type: "select",
      options: {
        resource: "countries",
        params: { region: "na" },
      },
      valueField: "id",
      labelField: "name",
    });

    expect(result.success).toBe(true);
  });
});
