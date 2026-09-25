"use client";

import { profileData } from "@/data/profile";
import { FileDown, FileCheck, ArrowRight } from "lucide-react";

export default function ResumeCTA() {
  return (
    <section className="py-16 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0e131d] border border-slate-800 p-8 sm:p-12 shadow-2xl">
          {/* Subtle background glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                <FileCheck className="w-4 h-4" />
                <span>Comprehensive Technical Profile</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Want to know more?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Download my resume to explore my experience, projects, technical skills and certifications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <a
                href={profileData.resumeUrl}
                download="Arjunbabu_Saila_Resume.pdf"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98]"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
