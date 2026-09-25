"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import CyberShieldDemoWidget from "./CyberShieldDemoWidget";
import { GithubIcon } from "./icons";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Shield,
  Layers,
  CheckCircle2,
  FileCode,
  AlertCircle,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden group">
      <div className="p-6 sm:p-8">
        {/* Top Header: Project Number, Category, and Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-blue-500 tracking-wider">
              {project.number}
            </span>
            <span className="text-slate-600">/</span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-[#121824] text-blue-300 border border-slate-800">
              {project.category}
            </span>
          </div>

          {project.isFeatured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-950/70 text-blue-300 border border-blue-800/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Primary Featured Project
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          {project.summary}
        </p>

        {/* Visual Preview Section */}
        <div className="mt-6 mb-6">
          {project.highlightType === "siem" && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  Interactive Console Telemetry & AI SOC Triage
                </span>
                <span className="text-slate-400 font-mono">Simulated Sandbox</span>
              </div>
              <CyberShieldDemoWidget />
            </div>
          )}

          {project.highlightType === "doc-ai" && (
            <div className="p-4 rounded-xl bg-[#0a0d14] border border-slate-800/80 font-mono text-xs text-slate-300 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <FileCode className="w-3.5 h-3.5" />
                  Documentation Pipeline Engine
                </span>
                <span className="text-slate-400">Gemini API Pipeline</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 rounded bg-[#0f1420] border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Step 01</div>
                  <div className="text-slate-200 font-semibold">Repository Ingestion</div>
                </div>
                <div className="p-2 rounded bg-[#0f1420] border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Step 02</div>
                  <div className="text-slate-200 font-semibold">AST & Schema Analysis</div>
                </div>
                <div className="p-2 rounded bg-[#0f1420] border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Step 03</div>
                  <div className="text-slate-200 font-semibold">Automated Markdown / Spec</div>
                </div>
              </div>
            </div>
          )}

          {project.highlightType === "phishing-trap" && (
            <div className="p-4 rounded-xl bg-[#0a0d14] border border-slate-800/80 font-mono text-xs text-slate-300 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Cpu className="w-3.5 h-3.5" />
                  Dual-Layer Defense Model
                </span>
                <span className="text-slate-400">Random Forest + Honeypot Decoys</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded bg-[#0f1420] border border-slate-800 space-y-1">
                  <div className="text-blue-400 font-semibold">1. ML Classifier</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Lexical entropy, suspicious subdomains, and URL feature extraction.
                  </p>
                </div>
                <div className="p-2.5 rounded bg-[#0f1420] border border-slate-800 space-y-1">
                  <div className="text-blue-400 font-semibold">2. Honeypot Telemetry</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Isolated traps capturing payload payloads and threat actor footprints.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technology Pills */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Core Technologies
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#131a28] text-blue-300 border border-slate-800/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Functionality / Capabilities List */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Key Functionality & Architecture
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
            {project.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Breakdown Expandable (Optional) */}
        {project.detailedDescription && (
          <div className="mt-4 pt-3">
            {isExpanded && (
              <div className="p-4 rounded-xl bg-[#090c12] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <p>{project.detailedDescription}</p>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>{isExpanded ? "Hide detailed description" : "View system overview"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}

        {/* Action Buttons: GitHub, Demo, Placeholder indicator */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#121824] text-slate-200 border border-slate-700 hover:text-white hover:border-blue-500 transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label={`Open ${project.title} Live Demo`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            Configurable in <code className="text-slate-300">src/data/projects.ts</code>
          </div>
        </div>
      </div>
    </article>
  );
}
