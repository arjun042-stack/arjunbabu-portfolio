"use client";

import { useEffect } from "react";
import { Project } from "@/data/projects";
import { X, ExternalLink, ShieldCheck, Cpu, GitBranch, ArrowRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useSound } from "@/context/SoundContext";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { playClick } = useSound();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07090e]/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          playClick();
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d121c] border border-slate-700/80 shadow-2xl z-10 flex flex-col p-6 sm:p-8 md:p-10 text-slate-200 animate-in zoom-in-95 duration-200 custom-scrollbar">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/60">
                PROJECT {project.number}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {project.category}
              </span>
            </div>
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-700/70 hover:border-slate-500 transition-colors"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-8 pt-6">
          {/* Architectural Flow Diagram */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#070a10] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold uppercase tracking-wider">
                <GitBranch className="w-3.5 h-3.5" />
                Architectural Data Flow
              </span>
              <span>System Pipeline Visualization</span>
            </div>

            {project.id === "cybershield-siem" && (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                {[
                  { title: "WAZUH", sub: "Endpoint Telemetry" },
                  { title: "ELASTICSEARCH", sub: "Log Aggregation" },
                  { title: "AI ANALYSIS", sub: "Gemini Reasoning" },
                  { title: "INVESTIGATION", sub: "IOC Correlation" },
                  { title: "SECURITY RESPONSE", sub: "Automated Playbooks" },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#111726] border border-blue-900/40 text-center flex flex-col justify-center relative group hover:border-blue-500/60 transition-colors"
                  >
                    <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">
                      {step.sub}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {project.id === "ai-docs-platform" && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { title: "CODE REPO", sub: "File & AST Parsing" },
                  { title: "AI PROCESSING", sub: "Gemini API Pipeline" },
                  { title: "STRUCTURED DOCS", sub: "Markdown & Manuals" },
                  { title: "OUTPUT API REF", sub: "Developer Dashboard" },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#111726] border border-cyan-900/40 text-center flex flex-col justify-center hover:border-cyan-500/60 transition-colors"
                  >
                    <span className="text-[11px] font-mono font-bold text-cyan-300 tracking-wider">
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">
                      {step.sub}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {project.id === "hybrid-phishing-trap" && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { title: "INCOMING URL", sub: "Lexical & Domain Ingestion" },
                  { title: "FEATURE EXTRACTION", sub: "Heuristics & Entropy" },
                  { title: "RANDOM FOREST", sub: "ML Classification Model" },
                  { title: "HONEYPOT TRAP", sub: "Attacker Forensic Logging" },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#111726] border border-indigo-900/40 text-center flex flex-col justify-center hover:border-indigo-500/60 transition-colors"
                  >
                    <span className="text-[11px] font-mono font-bold text-indigo-300 tracking-wider">
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">
                      {step.sub}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {project.id === "rfid-attendance-system" && (
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
                {[
                  { title: "RFID CARD", sub: "UID Identification" },
                  { title: "RFID READER", sub: "RC522 13.56MHz Scan" },
                  { title: "NODEMCU", sub: "ESP8266 Controller" },
                  { title: "WI-FI", sub: "802.11 b/g/n Uplink" },
                  { title: "CLOUD DB", sub: "Record Verification" },
                  { title: "ATTENDANCE", sub: "Real-time Log Entry" },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#111726] border border-cyan-900/40 text-center flex flex-col justify-center relative group hover:border-cyan-500/60 transition-colors"
                  >
                    <span className="text-[11px] font-mono font-bold text-cyan-300 tracking-wider">
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">
                      {step.sub}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Overview & Detailed Narrative */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
              System Overview & Architecture
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.detailedDescription || project.summary}
            </p>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Verified Technical Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#080c14] border border-slate-800/80 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Badges */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#121824] text-slate-200 border border-slate-700/80 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white border border-slate-700 hover:border-blue-500 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Repository</span>
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
