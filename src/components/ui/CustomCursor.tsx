"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const touchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (touchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='view']") || target.closest(".project-card-interactive")) {
        setCursorState("view");
      } else if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.closest(".clickable")
      ) {
        setCursorState("pointer");
      } else {
        setCursorState("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth trailing ring lerp
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    let currX = -100;
    let currY = -100;

    const loop = () => {
      currX = lerp(currX, position.x, 0.22);
      currY = lerp(currY, position.y, 0.22);
      setTrailingPos({ x: currX, y: currY });
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central precision dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(6,182,212,0.9)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${cursorState === "pointer" ? 1.5 : 1})`,
        }}
      />

      {/* Outer fluid tracking ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          cursorState === "view"
            ? "w-16 h-16 bg-blue-600/90 text-white font-mono text-[10px] font-bold tracking-widest border border-cyan-400 shadow-lg shadow-blue-500/40"
            : cursorState === "pointer"
            ? "w-10 h-10 border border-cyan-400/80 bg-blue-500/10 scale-110"
            : "w-8 h-8 border border-slate-500/40 bg-slate-500/5"
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorState === "view" && <span className="animate-pulse">VIEW</span>}
      </div>
    </>
  );
}
