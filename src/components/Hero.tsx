"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import Terminal from "./Terminal";
import HeroAiCanvas from "./HeroAiCanvas";
import { useSound } from "@/context/SoundContext";
import { GithubIcon, LinkedinIcon } from "./icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  FileDown,
  Mail,
  MapPin,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronDown,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { playClick, playHover } = useSound();
  const heroContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(heroContentRef.current, {
        y: -50,
        opacity: 0.75,
        scale: 1.015,
        filter: "blur(4px)",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#home",
          start: "bottom 85%",
          end: "bottom 15%",
          scrub: 1.4,
        },
      });
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    const projectsElement = document.getElementById("projects");
    if (projectsElement) {
      const navOffset = 80;
      const elementPosition = projectsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-16 lg:py-28 overflow-hidden"
    >
      {/* Interactive AI Neural Node Canvas */}
      <HeroAiCanvas />

      {/* Subtle background tech grid lines (pure CSS, low opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Subtle single soft radial gradient blur behind terminal */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div ref={heroContentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 transform-gpu">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Identity */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status & Location Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="font-medium text-slate-300">
                  Available for Engineering Opportunities
                </span>
                <span className="text-slate-600">|</span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {profileData.location}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-[10px] font-mono text-blue-300">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span>AI_ENGINEERING // CORE</span>
              </div>
            </div>

            {/* Identity & Profile Photo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4" title="Active & Available">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#090c12]"></span>
                </span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase font-sans">
                  {profileData.name}
                </h1>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-lg sm:text-xl font-medium text-blue-400">
                  <span>{profileData.role}</span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-slate-400 text-base sm:text-lg">
                    {profileData.secondaryRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Short Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {profileData.heroDescription}
            </p>

            {/* Three Pillar Competencies Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-1">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0e131d] border border-slate-800/80">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    AI Engineering
                  </div>
                  <div className="text-[11px] text-slate-400">
                    GenAI & Applied ML
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0e131d] border border-slate-800/80">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Full-Stack Systems
                  </div>
                  <div className="text-[11px] text-slate-400">
                    React, TS, Node, APIs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0e131d] border border-slate-800/80">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Cybersecurity
                  </div>
                  <div className="text-[11px] text-slate-400">
                    SIEM, SOC & Testing
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={scrollToProjects}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-200 active:scale-[0.96] group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={profileData.resumeUrl}
                download="Arjunbabu_Saila_Resume.pdf"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 active:scale-[0.96] shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Secondary Links: GitHub, LinkedIn, Email */}
            <div className="pt-3 flex items-center gap-6 border-t border-slate-800/80">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Connect
              </span>

              <div className="flex items-center gap-4">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileData.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${profileData.email}`}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Terminal Component */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/10 to-slate-700/10 rounded-2xl blur-sm -z-10" />
              <Terminal />
              <p className="mt-2 text-center text-[11px] text-slate-500 font-mono">
                terminal snippet · verified technical profile
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-10 hidden sm:flex flex-col items-center justify-center pointer-events-none opacity-60">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-blue-400 animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
}
