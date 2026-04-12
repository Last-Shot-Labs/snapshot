"use client";

import { useEffect, useRef, useState } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import { useSubscribe, usePublish } from "../../../context/index";
import { useEvaluateExpression } from "../../../expressions/use-expression";
import type { CollapsibleConfig } from "./types";

const DURATION_MAP: Record<string, number> = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
};

export function Collapsible({ config }: { config: CollapsibleConfig }) {
  const openExpr =
    config.open != null &&
    typeof config.open === "object" &&
    "expr" in config.open
      ? (config.open as { expr: string }).expr
      : undefined;
  const exprOpen = useEvaluateExpression(openExpr);

  const controlledOpen = useSubscribe(
    config.open != null &&
      typeof config.open === "object" &&
      "from" in config.open
      ? config.open
      : undefined,
  );
  const isControlled =
    config.open !== undefined &&
    (typeof config.open === "boolean" ||
      controlledOpen !== undefined ||
      openExpr !== undefined);

  const [internalOpen, setInternalOpen] = useState(config.defaultOpen ?? false);
  const isOpen = isControlled
    ? openExpr !== undefined
      ? exprOpen
      : typeof config.open === "boolean"
        ? config.open
        : Boolean(controlledOpen)
    : internalOpen;

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>(isOpen ? "auto" : "0px");
  const duration = DURATION_MAP[config.duration ?? "fast"] ?? 150;
  const publish = usePublish(config.publishTo);

  useEffect(() => {
    if (config.publishTo) publish(isOpen);
  }, [isOpen, config.publishTo, publish]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      setHeight(`${el.scrollHeight}px`);
      const timer = setTimeout(() => setHeight("auto"), duration);
      return () => clearTimeout(timer);
    } else {
      setHeight(`${el.scrollHeight}px`);
      requestAnimationFrame(() => setHeight("0px"));
    }
  }, [isOpen, duration]);

  const toggle = () => {
    if (!isControlled) setInternalOpen((v) => !v);
  };

  return (
    <>
      {config.trigger && (
        <div
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          style={{ cursor: "pointer" }}
          data-collapsible-trigger=""
        >
          <ComponentRenderer config={config.trigger} />
        </div>
      )}
      <div
        ref={contentRef}
        data-collapsible-content=""
        data-open={isOpen ? "true" : undefined}
        style={{
          height,
          overflow: "hidden",
          transition: `height ${duration}ms var(--sn-ease-default, ease)`,
        }}
      >
        {config.children.map((child, i) => (
          <ComponentRenderer
            key={(child as { id?: string }).id ?? i}
            config={child}
          />
        ))}
      </div>
    </>
  );
}
