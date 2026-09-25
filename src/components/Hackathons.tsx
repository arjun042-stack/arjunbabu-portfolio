"use client";

import { hackathonsData } from "@/data/hackathons";
import { Trophy, Calendar, MapPin, Building, Sparkles, ExternalLink } from "lucide-react";

export default function Hackathons() {
  return (
    <section id="hackathons" className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Trophy className="w-4 h-4" />
            <span>Competitive Problem Solving</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Hackathons & Innovation Challenges
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300">
            Intensive collaborative events, agentic AI sprints, and solution prototyping challenges.
          </p>
        </div>

        {/* Clean 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathonsData.map((hackathon) => (
            <div
              key={hackathon.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-950/70 text-blue-300 border border-blue-800/60">
                    {hackathon.year}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {hackathon.location}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {hackathon.title}
                </h3>
                <div className="text-xs font-medium text-blue-400 mt-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{hackathon.organizer}</span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#090c12] p-3.5 rounded-xl border border-slate-800/80">
                  {hackathon.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {hackathon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#121824] text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {hackathon.certificateUrl && (
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/50">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>Certificate</span>
                    </span>

                    <a
                      href={hackathon.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-200 bg-[#121824] border border-slate-700 hover:border-blue-500 hover:text-white transition-colors"
                      aria-label={`View ${hackathon.title} certificate`}
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 font-mono">
          Certificate links can be configured in <code className="text-slate-300">src/data/hackathons.ts</code>
        </div>
      </div>
    </section>
  );
}
