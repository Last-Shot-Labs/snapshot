import { describe, it, expect } from "vitest";
import { snapshotImageSchema } from "../schema";

describe("snapshotImageSchema", () => {
  const baseConfig = {
    src: "/uploads/photo.jpg",
    width: 1200,
    alt: "A photo",
  };

  it("accepts a minimal valid config", () => {
    const result = snapshotImageSchema.safeParse(baseConfig);
    expect(result.success).toBe(true);
  });

  it("applies default quality = 75", () => {
    const result = snapshotImageSchema.safeParse(baseConfig);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.quality).toBe(75);
    }
  });

  it("applies default format = 'original'", () => {
    const result = snapshotImageSchema.safeParse(baseConfig);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.format).toBe("original");
    }
  });

  it("applies default priority = false", () => {
    const result = snapshotImageSchema.safeParse(baseConfig);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.priority).toBe(false);
    }
  });

  it("applies default placeholder = 'empty'", () => {
    const result = snapshotImageSchema.safeParse(baseConfig);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe("empty");
    }
  });

  it("accepts all valid formats", () => {
    for (const format of ["avif", "webp", "jpeg", "png", "original"] as const) {
      const result = snapshotImageSchema.safeParse({ ...baseConfig, format });
      expect(result.success).toBe(true);
    }
  });

  it("accepts optional height", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      height: 630,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.height).toBe(630);
    }
  });

  it("accepts optional sizes", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      sizes: "(max-width: 768px) 100vw, 50vw",
    });
    expect(result.success).toBe(true);
  });

  it("accepts optional className", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      className: "my-image",
    });
    expect(result.success).toBe(true);
  });

  it("accepts priority = true", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      priority: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.priority).toBe(true);
    }
  });

  it("accepts placeholder = 'blur'", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      placeholder: "blur",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe("blur");
    }
  });

  it("accepts full valid config", () => {
    const result = snapshotImageSchema.safeParse({
      src: "/uploads/cover.jpg",
      width: 1200,
      height: 630,
      quality: 80,
      format: "avif",
      sizes: "(max-width: 768px) 100vw, 50vw",
      priority: true,
      placeholder: "blur",
      alt: "Cover photo",
      className: "cover-image",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing src", () => {
    const result = snapshotImageSchema.safeParse({ width: 100, alt: "img" });
    expect(result.success).toBe(false);
  });

  it("rejects empty src", () => {
    const result = snapshotImageSchema.safeParse({
      src: "",
      width: 100,
      alt: "img",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing width", () => {
    const result = snapshotImageSchema.safeParse({
      src: "/img.jpg",
      alt: "img",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing alt", () => {
    const result = snapshotImageSchema.safeParse({
      src: "/img.jpg",
      width: 100,
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer width", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      width: 100.5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects width = 0", () => {
    const result = snapshotImageSchema.safeParse({ ...baseConfig, width: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects width > 4096", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      width: 5000,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid format", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      format: "tiff",
    });
    expect(result.success).toBe(false);
  });

  it("rejects quality < 1", () => {
    const result = snapshotImageSchema.safeParse({ ...baseConfig, quality: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects quality > 100", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      quality: 101,
    });
    expect(result.success).toBe(false);
  });

  it("rejects height = 0", () => {
    const result = snapshotImageSchema.safeParse({ ...baseConfig, height: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects height > 4096", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      height: 5000,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid placeholder", () => {
    const result = snapshotImageSchema.safeParse({
      ...baseConfig,
      placeholder: "pixelate",
    });
    expect(result.success).toBe(false);
  });
});
