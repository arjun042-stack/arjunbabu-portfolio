"use client";

import { useEffect, useRef } from "react";
import { certificationsData } from "@/data/certifications";
import { Award, ExternalLink, CheckCircle2, FileText } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import CinematicSection from "./ui/CinematicSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Certifications() {
  const { playClick, playHover } = useSound();
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".cert-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0.15, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1.2,
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <CinematicSection
      id="certifications"
      className="py-24 lg:py-28 bg-[#090c12] border-t border-slate-800/80"
      backgroundGlow="rgba(16, 185, 129, 0.06)"
      intensity="medium"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>CREDENTIAL_VERIFICATION // v1.2</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Certifications & Industry Simulations
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300">
            Formal technical certifications and virtual enterprise job simulations in modern AI engineering, incident response, and cybersecurity defense.
          </p>
        </div>

        {/* Certifications Grid with Stagger Hooks */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              onMouseEnter={playHover}
              className="cert-card group relative p-6 rounded-2xl bg-[#0e131d]/90 border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden transform-gpu"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-cyan-400 to-transparent transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-[#131a29] text-cyan-300 border border-blue-500/20 shadow-inner">
                    {cert.organization}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-500" />
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-[11px]">Verified Credential</span>
                </span>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-[#141b2b] border border-slate-700/80 hover:border-cyan-400 hover:text-white hover:bg-blue-950/40 hover:shadow-md hover:shadow-cyan-500/20 active:scale-95 transition-all duration-150"
                  aria-label={`View ${cert.title} certification credential`}
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
