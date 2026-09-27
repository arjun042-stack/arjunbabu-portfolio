"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    let gsapTicker: ((time: number) => void) | null = null;
    try {
      const gsapModule = require("gsap");
      const ScrollTriggerModule = require("gsap/ScrollTrigger");
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);

        gsapTicker = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(gsapTicker);
        gsap.ticker.lagSmoothing(0);
      }
    } catch {
      // Fallback to standard requestAnimationFrame if GSAP ticker is unavailable
      function fallbackRaf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(fallbackRaf);
      }
      requestAnimationFrame(fallbackRaf);
    }

    // Global listener for smooth anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.hash && target.hash.startsWith("#") && target.origin === window.location.origin) {
        const elem = document.querySelector(target.hash);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, { offset: -70, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (gsapTicker) {
        try {
          const gsapModule = require("gsap");
          const gsap = gsapModule.default || gsapModule;
          gsap.ticker.remove(gsapTicker);
        } catch {}
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
