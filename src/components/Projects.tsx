"use client";

import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <FolderGit2 className="w-4 h-4" />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Practical software systems bridging modern full-stack web engineering, Gemini AI integration, and cybersecurity defense.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
