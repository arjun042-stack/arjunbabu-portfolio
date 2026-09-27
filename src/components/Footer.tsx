"use client";

import Image from "next/image";
import { profileData } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ArrowUp, Mail, Sparkles } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export default function Footer() {
  const { playClick, playHover } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#06080d] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-blue-500/40 shrink-0 bg-[#121824] shadow-md">
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-bold text-white tracking-widest text-sm uppercase">
                {profileData.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-2 font-mono">
              Software Engineer | AI Engineering
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-xl bg-[#0e131d] border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/60 hover:shadow-md hover:shadow-cyan-500/20 active:scale-95 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-xl bg-[#0e131d] border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/60 hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-xl bg-[#0e131d] border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-md hover:shadow-cyan-500/20 active:scale-95 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0e131d] border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/60 hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all ml-2"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-xs">Back to Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Built with curiosity, code and AI.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
