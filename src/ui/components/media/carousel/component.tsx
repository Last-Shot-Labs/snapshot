'use client';

import { useState, useRef, useCallback, useEffect, type CSSProperties } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";

export interface CarouselConfig {
  type: "carousel";
  id?: string;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  children?: ComponentConfig[];
  className?: string;
  style?: Record<string, string | number>;
}

export function Carousel({ config }: { config: CarouselConfig }) {
  const [current, setCurrent] = useState(0);
  const children = config.children ?? [];
  const count = children.length;
  const intervalMs = config.interval ?? 5000;
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % count) + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (!config.autoPlay || count <= 1) return;
    timerRef.current = setInterval(next, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [config.autoPlay, count, intervalMs, next]);

  // Pause on hover
  const pause = useCallback(() => clearInterval(timerRef.current), []);
  const resume = useCallback(() => {
    if (!config.autoPlay || count <= 1) return;
    timerRef.current = setInterval(next, intervalMs);
  }, [config.autoPlay, count, intervalMs, next]);

  if (count === 0) return null;

  const configStyle = config.style as CSSProperties | undefined;

  return (
    <div
      data-snapshot-component="carousel"
      className={config.className}
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--sn-radius-lg, 0.75rem)",
        ...configStyle,
      }}
    >
      {/* Slides */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          transition: "transform var(--sn-duration-normal, 300ms) var(--sn-ease-out, ease-out)",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {children.map((child, i) => (
          <div key={child.id ?? `slide-${i}`} style={{ minWidth: "100%", flexShrink: 0 }}>
            <ComponentRenderer config={child} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {config.showArrows !== false && count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            style={{
              position: "absolute",
              left: "var(--sn-spacing-sm, 0.5rem)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--sn-radius-full, 9999px)",
              width: "2rem",
              height: "2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            &#x2039;
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            style={{
              position: "absolute",
              right: "var(--sn-spacing-sm, 0.5rem)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--sn-radius-full, 9999px)",
              width: "2rem",
              height: "2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            &#x203A;
          </button>
        </>
      )}

      {/* Dots */}
      {config.showDots !== false && count > 1 && (
        <div style={{
          position: "absolute",
          bottom: "var(--sn-spacing-sm, 0.5rem)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "var(--sn-spacing-xs, 0.25rem)",
        }}>
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "var(--sn-radius-full, 9999px)",
                border: "none",
                cursor: "pointer",
                background: i === current ? "var(--sn-color-primary, #fff)" : "rgba(255,255,255,0.5)",
                transition: "background var(--sn-duration-fast, 150ms)",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
