"use client";

import { certificationsData } from "@/data/certifications";
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Award className="w-4 h-4" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Certifications & Simulations
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300">
            Industry credentials and practical job simulations in cybersecurity defense and artificial intelligence.
          </p>
        </div>

        {/* Compact Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#121824] text-blue-400 border border-slate-800">
                    {cert.organization}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Verified Completion</span>
                </span>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-200 bg-[#121824] border border-slate-700 hover:border-blue-500 hover:text-white transition-colors"
                  aria-label={`View ${cert.title} certification credential`}
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 font-mono">
          Credential links can be configured in <code className="text-slate-300">src/data/certifications.ts</code>
        </div>
      </div>
    </section>
  );
}
