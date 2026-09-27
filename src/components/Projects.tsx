"use client";

import { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ui/ProjectModal";
import CinematicSection from "./ui/CinematicSection";
import { Sparkles } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <CinematicSection
      id="projects"
      className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80"
      backgroundGlow="rgba(59, 130, 246, 0.08)"
      intensity="high"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Featured Systems & Deployments
          </h2>
          <div className="h-1 w-14 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Production-grade systems unifying full-stack web architectures, applied Gemini AI reasoning pipelines, IoT telemetry hardware, and cybersecurity defense engineering.
          </p>
        </div>

        {/* Projects Editorial List */}
        <div className="space-y-16">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Full-Screen Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </CinematicSection>
  );
}
