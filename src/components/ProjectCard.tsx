"use client";

import { useEffect, useRef } from "react";
import { Project } from "@/data/projects";
import CyberShieldDemoWidget from "./CyberShieldDemoWidget";
import RfidAttendancePipeline3D from "./RfidAttendancePipeline3D";
import { GithubIcon } from "./icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Shield,
  FileCode,
  Cpu,
  Radio,
  ArrowRight,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { useSound } from "@/context/SoundContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const { playClick, playHover } = useSound();
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !cardRef.current) return;

    const el = cardRef.current;
    const ctx = gsap.context(() => {
      // Sequential entrance timeline scrubbed with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 45%",
          scrub: 1.2,
        },
      });

      tl.fromTo(
        el.querySelector(".project-number"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, ease: "power2.out" }
      )
        .fromTo(
          el.querySelector(".project-title"),
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          el.querySelector(".project-summary"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          el.querySelector(".project-visual"),
          { opacity: 0.6, scale: 0.96 },
          { opacity: 1, scale: 1, ease: "power2.out" },
          "-=0.2"
        );

      // Exit transition when scrolling past
      gsap.to(el, {
        opacity: 0.8,
        y: -30,
        scale: 1.012,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: el,
          start: "bottom 70%",
          end: "bottom 10%",
          scrub: 1.2,
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      data-cursor="view"
      className="project-card-interactive relative rounded-3xl bg-[#0e131d] border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/5 transform-gpu"
    >
      {/* Subtle hover gradient illumination */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-6 sm:p-8 md:p-10 relative z-10 flex flex-col justify-between">
        {/* Top Header: Editorial Number and Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="project-number text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:scale-105 transition-transform inline-block">
              {project.number}
            </span>
            <span className="text-slate-600 font-mono">/</span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#121824] text-blue-300 border border-slate-800">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              onOpenModal(project);
            }}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-blue-950/60 text-cyan-300 border border-blue-800/60 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </button>
        </div>

        {/* Project Title */}
        <h3
          onClick={() => {
            playClick();
            onOpenModal(project);
          }}
          className="project-title text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors cursor-pointer"
        >
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="project-summary mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {project.summary}
        </p>

        {/* Architectural Visual Preview */}
        <div className="project-visual mt-6 mb-6">
          {project.highlightType === "siem" && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Shield className="w-3.5 h-3.5" />
                  Interactive Console Telemetry & AI SOC Triage
                </span>
                <span className="text-slate-500 font-mono text-[10px]">Simulated Sandbox</span>
              </div>
              <CyberShieldDemoWidget />
            </div>
          )}

          {project.highlightType === "doc-ai" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080b12] border border-slate-800/80 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <FileCode className="w-3.5 h-3.5" />
                  Documentation Pipeline Engine
                </span>
                <span className="text-slate-500">Gemini API Pipeline</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2.5 rounded-xl bg-[#0f1420] border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  <div className="text-slate-500 text-[9px] uppercase tracking-wider">Step 01</div>
                  <div className="text-slate-200 font-semibold mt-0.5">Repo Ingestion</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0f1420] border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  <div className="text-slate-500 text-[9px] uppercase tracking-wider">Step 02</div>
                  <div className="text-slate-200 font-semibold mt-0.5">AST & Schema Analysis</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0f1420] border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  <div className="text-slate-500 text-[9px] uppercase tracking-wider">Step 03</div>
                  <div className="text-slate-200 font-semibold mt-0.5">Automated Markdown</div>
                </div>
              </div>
            </div>
          )}

          {project.highlightType === "phishing-trap" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080b12] border border-slate-800/80 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <Cpu className="w-3.5 h-3.5" />
                  Dual-Layer Defense Architecture
                </span>
                <span className="text-slate-500">Random Forest + Honeypot Decoys</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-[#0f1420] border border-slate-800 space-y-1">
                  <div className="text-indigo-400 font-semibold">1. ML Classifier</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Lexical entropy, structural heuristics, and domain URL feature extraction.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0f1420] border border-slate-800 space-y-1">
                  <div className="text-indigo-400 font-semibold">2. Honeypot Decoys</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Isolated traps capturing payload signatures and threat actor behavior.
                  </p>
                </div>
              </div>
            </div>
          )}

          {project.highlightType === "iot-rfid" && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Radio className="w-3.5 h-3.5" />
                  Interactive 3D Hardware Telemetry Pipeline
                </span>
                <span className="text-slate-500 font-mono text-[10px]">Real-Time IoT Simulation</span>
              </div>
              <RfidAttendancePipeline3D />
            </div>
          )}
        </div>

        {/* Technology Pills */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Core Technology Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                onMouseEnter={playHover}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#131a28] text-blue-300 border border-slate-800/80 hover:border-blue-500/50 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features Preview */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {project.keyFeatures.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playClick();
                onOpenModal(project);
              }}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all duration-200 active:scale-95 group/btn"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#121824] text-slate-200 border border-slate-700 hover:text-white hover:border-blue-500 transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-700 hover:border-blue-500 hover:text-white transition-colors"
                aria-label={`Open ${project.title} Live Demo`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            Verified Project Architecture
          </span>
        </div>
      </div>
    </article>
  );
}
