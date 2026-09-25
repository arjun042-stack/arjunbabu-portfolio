"use client";

import Image from "next/image";
import { profileData } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ArrowUp, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#07090e] border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-blue-500/40 shrink-0 bg-[#121824]">
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-bold text-slate-100 tracking-wider text-sm uppercase">
                {profileData.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1.5 max-w-md">
              {profileData.role} • {profileData.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0e131d] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0e131d] border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="p-2 rounded-lg bg-[#0e131d] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0e131d] border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/60 transition-colors ml-2"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Next.js, TypeScript & Tailwind CSS</span>
            <span>•</span>
            <span className="text-slate-400">Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
