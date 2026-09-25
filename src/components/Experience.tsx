"use client";

import { experiencesData } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Practical Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Industrial Experience
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300">
            Real-world enterprise IT department training and enterprise systems exposure.
          </p>
        </div>

        {/* Clean Professional Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
          {experiencesData.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090c12] border-2 border-blue-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-950/70 text-blue-300 border border-blue-800/60">
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1.5">
                      {exp.role}
                    </h3>
                    <div className="text-base font-semibold text-blue-400">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed bg-[#090c12] p-4 rounded-xl border border-slate-800/80">
                  {exp.summary}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Core Industrial Exposure
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
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
    </section>
  );
}
