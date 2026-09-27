import { experiencesData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { ShieldCheck, Cpu, Code2, Building2, Calendar, MapPin } from "lucide-react";
import CinematicSection from "./ui/CinematicSection";

export default function About() {
  const traineeExp = experiencesData[0];

  return (
    <CinematicSection
      id="about"
      className="py-20 lg:py-24 border-t border-slate-800/80 bg-[#090c12]"
      backgroundGlow="rgba(59, 130, 246, 0.08)"
      intensity="medium"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cinematic Typography Statement */}
        <div className="mb-14 pb-10 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>CORE PHILOSOPHY & FOCUS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans leading-tight">
            I BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">INTELLIGENT</span> SYSTEMS.
          </h2>
          <div className="h-1 w-16 bg-blue-500 rounded-full mt-4 mb-4" />
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Uniting end-to-end full-stack software engineering with applied Gemini AI reasoning pipelines and security operations to build real, scalable technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              I am a software engineering and cybersecurity-focused developer with a strong
              foundation in AI-powered application development, full-stack integration, secure
              application development and security automation.
            </p>

            <p>
              My work combines software engineering with AI and cybersecurity to build practical
              solutions for real-world problems.
            </p>

            <p>
              I have hands-on experience developing web applications, security tools, AI-assisted
              systems and automation platforms.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0f1420] border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">Software Systems</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  End-to-end full-stack architectures, clean RESTful APIs, and robust modular code.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1420] border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">Applied AI</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Gemini API integrations, automated code documentation, and intelligent security triage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1420] border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">Cyber Defense</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  SIEM event analysis, threat hunting, vulnerability assessment, and honeypot traps.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Training Highlight Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0e131d] border border-slate-800/90 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-medium">
                      Enterprise Exposure
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      Industrial Training Experience
                    </h3>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-100">
                  {traineeExp.role}
                </h4>
                <div className="text-sm font-medium text-blue-400 mt-0.5">
                  {traineeExp.company}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-2.5 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {traineeExp.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {traineeExp.period}
                  </span>
                </div>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed bg-[#090c12] p-4 rounded-xl border border-slate-800/80">
                <p>{traineeExp.summary}</p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Key Exposure Areas:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {traineeExp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">▪</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Enterprise IT Department</span>
                <span className="text-slate-400 font-mono">6 Months Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
