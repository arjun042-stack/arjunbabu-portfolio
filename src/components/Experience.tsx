"use client";

import { useEffect, useRef } from "react";
import { experiencesData } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles } from "lucide-react";
import CinematicSection from "./ui/CinematicSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !lineRef.current) return;

    const el = lineRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#experience",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }, lineRef);

    return () => ctx.revert();
  }, []);

  return (
    <CinematicSection
      id="experience"
      className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80"
      backgroundGlow="rgba(99, 102, 241, 0.07)"
      intensity="medium"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Industrial Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Enterprise Experience
          </h2>
          <div className="h-1 w-14 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300">
            Real-world enterprise IT department operations and infrastructure telemetry exposure.
          </p>
        </div>

        {/* Dynamic Animated Timeline */}
        <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {/* Progressively drawn glowing line overlay */}
          <div
            ref={lineRef}
            className="absolute top-0 left-[-2px] bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_14px_rgba(59,130,246,0.7)]"
            aria-hidden="true"
          />

          {experiencesData.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Node with radar pulse */}
              <div className="absolute -left-[32px] sm:-left-[48px] top-2 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-60" />
                <div className="relative w-5 h-5 rounded-full bg-[#090c12] border-2 border-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/40">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl group hover:shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-950/70 text-cyan-300 border border-blue-800/60 inline-block">
                      {exp.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                      {exp.role}
                    </h3>
                    <div className="text-base font-semibold text-blue-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121824] border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed bg-[#090c12] p-4 rounded-2xl border border-slate-800/80">
                  {exp.summary}
                </p>

                <div className="mt-6 space-y-2.5">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Core Technical & Systems Exposure:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-[#090c12]/60 border border-slate-800/50">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
