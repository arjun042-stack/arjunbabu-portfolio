"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "high";
  duration?: "normal" | "slow";
  fadeIn?: boolean;
  fadeOut?: boolean;
  parallax?: boolean;
  backgroundGlow?: string; // Optional ambient radial color e.g. "rgba(59, 130, 246, 0.08)"
}

export default function CinematicSection({
  id,
  children,
  className = "",
  intensity = "medium",
  duration = "slow",
  fadeIn = true,
  fadeOut = true,
  parallax = false,
  backgroundGlow,
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current) {
      return;
    }

    const sectionEl = sectionRef.current;
    const contentEl = contentRef.current;

    // Intensity parameters
    const intensityScales = {
      subtle: { startScale: 0.98, endScale: 1.01, yShift: 35, blurAmount: 4 },
      medium: { startScale: 0.96, endScale: 1.018, yShift: 55, blurAmount: 6 },
      high: { startScale: 0.94, endScale: 1.025, yShift: 75, blurAmount: 9 },
    };

    const config = intensityScales[intensity] || intensityScales.medium;
    const scrubSpeed = duration === "slow" ? 1.4 : 0.8;

    const ctx = gsap.context(() => {
      // 1. Enter Animation Timeline (top bottom -> top 25%)
      if (fadeIn) {
        gsap.fromTo(
          contentEl,
          {
            opacity: 0.1,
            y: config.yShift,
            scale: config.startScale,
            filter: `blur(${config.blurAmount}px)`,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 95%",
              end: "top 25%",
              scrub: scrubSpeed,
            },
          }
        );
      }

      // 2. Exit Animation Timeline (bottom 75% -> bottom -10%)
      // IMPORTANT: Does not fade to 0 so section never disappears while reading
      if (fadeOut) {
        gsap.to(contentEl, {
          opacity: 0.75,
          y: -config.yShift * 0.45,
          scale: config.endScale,
          filter: `blur(${config.blurAmount * 0.5}px)`,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionEl,
            start: "bottom 65%",
            end: "bottom top",
            scrub: scrubSpeed,
          },
        });
      }

      // 3. Optional Parallax layer
      if (parallax && glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { y: -40, opacity: 0.3 },
          {
            y: 50,
            opacity: 0.8,
            scrollTrigger: {
              trigger: sectionEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [intensity, duration, fadeIn, fadeOut, parallax]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Ambient Glow that shifts with scroll */}
      {backgroundGlow && (
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 -z-10"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${backgroundGlow} 0%, rgba(9, 12, 18, 0) 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Animated Content Wrapper */}
      <div
        ref={contentRef}
        className="w-full transform-gpu will-change-[transform,opacity,filter]"
      >
        {children}
      </div>
    </section>
  );
}
