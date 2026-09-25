"use client";

import { educationData } from "@/data/education";
import { GraduationCap, Calendar, MapPin, CheckCircle2, Clock } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <span>Academic Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Education
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full mt-3" />
        </div>

        {/* Two-Card Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium font-mono ${
                      item.status === "In Progress"
                        ? "bg-blue-950/60 text-blue-300 border border-blue-800/60"
                        : "bg-slate-800/80 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {item.status === "In Progress" ? (
                      <>
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span>Pursuing</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Completed</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.institution}
                </h3>
                <div className="text-base font-medium text-blue-400 mt-1">
                  {item.degree}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-3 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#090c12] p-3.5 rounded-xl border border-slate-800/80">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Field: {item.field}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
