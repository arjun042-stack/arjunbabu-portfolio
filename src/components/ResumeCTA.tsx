import { profileData } from "@/data/profile";
import { FileDown, FileCheck, ArrowRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import CinematicSection from "./ui/CinematicSection";

export default function ResumeCTA() {
  const { playClick, playHover } = useSound();

  return (
    <CinematicSection
      className="py-20 bg-[#090c12] border-t border-slate-800/80"
      backgroundGlow="rgba(99, 102, 241, 0.08)"
      intensity="medium"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d121c] to-[#070a10] border border-slate-800/90 p-8 sm:p-12 shadow-2xl">
          {/* Subtle background glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>TECHNICAL_DOSSIER // ARJUNBABU SAILA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Ready to review full technical credentials?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Download my verified resume for complete system engineering projects, industrial training history, cybersecurity simulations, and AI tool stack.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <a
                href={profileData.resumeUrl}
                download="Arjunbabu_Saila_Resume.pdf"
                onClick={playClick}
                onMouseEnter={playHover}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-blue-400/30"
              >
                <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#111726] text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
