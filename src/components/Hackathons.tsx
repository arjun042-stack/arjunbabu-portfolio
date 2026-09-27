"use client";

import { useEffect, useRef } from "react";
import { hackathonsData } from "@/data/hackathons";
import { Trophy, MapPin, Building, Sparkles, ExternalLink, Terminal } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import CinematicSection from "./ui/CinematicSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hackathons() {
  const { playClick, playHover } = useSound();
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !trackRef.current) return;

    const cards = trackRef.current.querySelectorAll(".hackathon-card");
    const ctx = gsap.context(() => {
      // Subtle staggered horizontal drift on vertical scroll (card 0 from left, card 2 from right)
      cards.forEach((card, idx) => {
        const xOffset = idx === 0 ? -24 : idx === 2 ? 24 : 0;
        gsap.fromTo(
          card,
          { opacity: 0.2, x: xOffset, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1.2,
            },
          }
        );
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <CinematicSection
      id="hackathons"
      className="py-24 lg:py-28 bg-[#090c12] border-t border-slate-800/80"
      backgroundGlow="rgba(245, 158, 11, 0.05)"
      intensity="medium"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <span>SPRINTS & INNOVATION // LIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Hackathons & AI Challenges
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300">
            Intensive collaborative building sprints, agentic AI architecture prototyping, and competitive problem-solving competitions.
          </p>
        </div>

        {/* 3-Card Grid with Horizontal Drift */}
        <div ref={trackRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathonsData.map((hackathon) => (
            <div
              key={hackathon.id}
              onMouseEnter={playHover}
              className="hackathon-card group relative p-6 sm:p-7 rounded-2xl bg-[#0e131d]/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden transform-gpu"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/0 group-hover:via-cyan-400 to-transparent transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-950/80 text-cyan-300 border border-blue-800/60 shadow-inner">
                    {hackathon.year}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {hackathon.location}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                  {hackathon.title}
                </h3>
                <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>{hackathon.organizer}</span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#080b11] p-3.5 rounded-xl border border-slate-800/70">
                  {hackathon.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {hackathon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#131926] text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {hackathon.certificateUrl && (
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/50">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-mono text-[11px]">Certificate</span>
                    </span>

                    <a
                      href={hackathon.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-[#141b2b] border border-slate-700/80 hover:border-cyan-400 hover:text-white hover:bg-blue-950/40 hover:shadow-md hover:shadow-cyan-500/20 active:scale-95 transition-all duration-150"
                      aria-label={`View ${hackathon.title} certificate`}
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
