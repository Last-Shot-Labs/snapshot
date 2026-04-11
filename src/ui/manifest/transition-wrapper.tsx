'use client';

import { useEffect, useState, type ReactNode } from "react";

interface TransitionConfig {
  enter: string;
  exit: string;
  duration: number;
  easing: string;
}

const BUILT_IN_KEYFRAMES = `
@keyframes sn-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes sn-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes sn-slide-left { from { transform: translateX(1.25rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes sn-slide-right { from { transform: translateX(-1.25rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes sn-slide-up { from { transform: translateY(1.25rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes sn-slide-down { from { transform: translateY(-1.25rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes sn-scale-in { from { transform: scale(0.98); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes sn-scale-out { from { transform: scale(1.02); opacity: 1; } to { transform: scale(1); opacity: 0; } }
`;

const KEYFRAME_MAP: Record<string, string> = {
  "fade-in": "sn-fade-in",
  "fade-out": "sn-fade-out",
  "slide-left": "sn-slide-left",
  "slide-right": "sn-slide-right",
  "slide-up": "sn-slide-up",
  "slide-down": "sn-slide-down",
  "scale-in": "sn-scale-in",
  "scale-out": "sn-scale-out",
};

function resolveAnimation(name: string): string {
  return KEYFRAME_MAP[name] ?? name;
}

export function TransitionWrapper({
  config,
  routeKey,
  children,
}: {
  config?: TransitionConfig;
  routeKey: string;
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<"idle" | "entering">("idle");

  useEffect(() => {
    if (!config) {
      return;
    }

    setPhase("entering");
    const timer = window.setTimeout(() => {
      setPhase("idle");
    }, config.duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [config, routeKey]);

  if (!config) {
    return <>{children}</>;
  }

  return (
    <>
      <style>{BUILT_IN_KEYFRAMES}</style>
      <div
        data-snapshot-transition={phase}
        style={{
          animation:
            phase === "entering"
              ? `${resolveAnimation(config.enter)} ${config.duration}ms ${config.easing} both`
              : undefined,
        }}
      >
        {children}
      </div>
    </>
  );
}
