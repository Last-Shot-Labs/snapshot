import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshotDecorator } from "./story-providers";

import { CarouselBase } from "../media/carousel/standalone";
import { SnapshotImageBase } from "../media/image/standalone";
import { VideoBase } from "../media/video/standalone";

// ── Data Factories ─────────────────────────────────────────────────────────

function createSvgDataUrl(label: string, from: string, to: string) {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><text x="400" y="240" fill="#fff" font-family="Inter,sans-serif" font-size="32" font-weight="700" text-anchor="middle">${label}</text></svg>`)}`;
}

function createCarouselSlides(count = 3) {
  const slides = [
    { label: "Slide 1 -- Design", from: "#0f766e", to: "#2563eb" },
    { label: "Slide 2 -- Build", from: "#7c3aed", to: "#ec4899" },
    { label: "Slide 3 -- Ship", from: "#ea580c", to: "#facc15" },
    { label: "Slide 4 -- Scale", from: "#059669", to: "#06b6d4" },
    { label: "Slide 5 -- Monitor", from: "#4f46e5", to: "#7c3aed" },
  ];
  return slides.slice(0, count);
}

// ── Meta ───────────────────────────────────────────────────────────────────

const imageMeta = {
  title: "Components/Media/Image",
  component: SnapshotImageBase,
  decorators: [snapshotDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "Media components for images, carousels, and video playback. Supports aspect ratio control, lazy loading, fallback handling, and autoplay for carousels.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL.",
    },
    alt: {
      control: "text",
      description: "Alt text for accessibility.",
    },
    width: {
      control: "number",
      description: "Intrinsic width of the image.",
    },
    height: {
      control: "number",
      description: "Intrinsic height of the image.",
    },
    aspectRatio: {
      control: "text",
      description: "CSS aspect-ratio value (e.g., \"16 / 9\").",
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
      description: "Browser loading strategy.",
    },
  },
} satisfies Meta<typeof SnapshotImageBase>;

export default imageMeta;

// ── Image: Default ─────────────────────────────────────────────────────────

export const Default: StoryObj<typeof SnapshotImageBase> = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <SnapshotImageBase {...args} />
    </div>
  ),
  args: {
    src: createSvgDataUrl("Snapshot Image", "#2563eb", "#7c3aed"),
    alt: "Gradient sample",
    width: 800,
    height: 450,
    aspectRatio: "16 / 9",
  },
};

// ── Image: Fallback ────────────────────────────────────────────────────────

export const ImageFallback: StoryObj<typeof SnapshotImageBase> = {
  name: "Image / Fallback",
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <div style={{ maxWidth: 280 }}>
        <p style={{ margin: "0 0 0.5rem", fontWeight: 600, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
          Broken image source
        </p>
        <SnapshotImageBase
          src="https://invalid-url-that-will-fail.example/image.png"
          alt="This image failed to load"
          width={400}
          height={225}
          aspectRatio="16 / 9"
        />
      </div>
      <div style={{ maxWidth: 280 }}>
        <p style={{ margin: "0 0 0.5rem", fontWeight: 600, fontSize: "0.8rem", color: "var(--sn-color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
          Working image
        </p>
        <SnapshotImageBase
          src={createSvgDataUrl("Valid Image", "#059669", "#06b6d4")}
          alt="Valid gradient"
          width={400}
          height={225}
          aspectRatio="16 / 9"
        />
      </div>
    </div>
  ),
};

// ── Carousel: Default ──────────────────────────────────────────────────────

export const Carousel: StoryObj<typeof CarouselBase> = {
  render: () => {
    const slides = createCarouselSlides(3);
    return (
      <div style={{ maxWidth: 640 }}>
        <CarouselBase showDots showArrows>
          {slides.map((slide) => (
            <img
              key={slide.label}
              src={createSvgDataUrl(slide.label, slide.from, slide.to)}
              alt={slide.label}
              style={{ width: "100%", display: "block", borderRadius: 0 }}
            />
          ))}
        </CarouselBase>
      </div>
    );
  },
};

// ── Carousel: Autoplay ─────────────────────────────────────────────────────

export const CarouselAutoplay: StoryObj<typeof CarouselBase> = {
  name: "Carousel / Autoplay",
  render: () => {
    const slides = createCarouselSlides(5);
    return (
      <div style={{ maxWidth: 640 }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.875rem", color: "var(--sn-color-muted-foreground)" }}>
          This carousel auto-advances every 3 seconds. Hover to pause.
        </p>
        <CarouselBase showDots showArrows autoPlay interval={3000}>
          {slides.map((slide) => (
            <img
              key={slide.label}
              src={createSvgDataUrl(slide.label, slide.from, slide.to)}
              alt={slide.label}
              style={{ width: "100%", display: "block", borderRadius: 0 }}
            />
          ))}
        </CarouselBase>
      </div>
    );
  },
};

// ── Video ───────────────────────────────────────────────────────────────────

export const Video: StoryObj<typeof VideoBase> = {
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <VideoBase {...args} />
    </div>
  ),
  args: {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: createSvgDataUrl("Video Preview", "#111827", "#374151"),
    controls: true,
  },
};
