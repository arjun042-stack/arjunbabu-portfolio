"use client";

import { useState, useMemo } from "react";
import { skillCategories } from "@/data/skills";
import { useSound } from "@/context/SoundContext";
import {
  Code2,
  Layout,
  Brain,
  Shield,
  TerminalSquare,
  Server,
  Cpu,
  Search,
  Check,
  Sparkles,
} from "lucide-react";

import CinematicSection from "./ui/CinematicSection";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-4 h-4 text-cyan-400" />,
  Layout: <Layout className="w-4 h-4 text-blue-400" />,
  Brain: <Brain className="w-4 h-4 text-indigo-400" />,
  Shield: <Shield className="w-4 h-4 text-emerald-400" />,
  TerminalSquare: <TerminalSquare className="w-4 h-4 text-amber-400" />,
  Server: <Server className="w-4 h-4 text-blue-400" />,
  Cpu: <Cpu className="w-4 h-4 text-cyan-400" />,
};

const domainTabs = [
  { id: "all", label: "ALL DOMAINS" },
  { id: "ai-ml", label: "AI / MACHINE LEARNING" },
  { id: "software-eng", label: "SOFTWARE ENGINEERING" },
  { id: "web-dev", label: "WEB DEVELOPMENT" },
  { id: "cybersecurity", label: "CYBERSECURITY" },
  { id: "tools-infra", label: "TOOLS & INFRASTRUCTURE" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { playClick, playHover } = useSound();

  const filteredCategories = useMemo(() => {
    let result = skillCategories;

    if (activeCategory === "ai-ml") {
      result = result.filter((cat) => cat.id === "ai-ml");
    } else if (activeCategory === "software-eng") {
      result = result.filter((cat) => cat.id === "programming" || cat.id === "practices");
    } else if (activeCategory === "web-dev") {
      result = result.filter((cat) => cat.id === "web-dev");
    } else if (activeCategory === "cybersecurity") {
      result = result.filter((cat) => cat.id === "cybersecurity" || cat.id === "security-tools");
    } else if (activeCategory === "tools-infra") {
      result = result.filter((cat) => cat.id === "systems-devops");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result
        .map((cat) => {
          const matchingSkills = cat.skills.filter((skill) =>
            skill.toLowerCase().includes(q)
          );
          if (matchingSkills.length > 0 || cat.name.toLowerCase().includes(q)) {
            return {
              ...cat,
              skills: matchingSkills.length > 0 ? matchingSkills : cat.skills,
            };
          }
          return null;
        })
        .filter((cat): cat is (typeof skillCategories)[0] => cat !== null);
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <CinematicSection
      id="skills"
      className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80"
      backgroundGlow="rgba(6, 182, 212, 0.07)"
      intensity="high"
      duration="slow"
      parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills & Engineering Stack
            </h2>
            <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-3" />
            <p className="text-sm sm:text-base text-slate-300">
              Interactive inventory of verified languages, AI modeling libraries, cybersecurity toolsets, and full-stack frameworks.
            </p>
          </div>

          {/* Quick Search Tool for Recruiters */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Wazuh, Gemini)..."
              className="w-full bg-[#0e131d] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Filter skills"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  playClick();
                  setSearchQuery("");
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Domain Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {domainTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(tab.id);
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-100"
                    : "bg-[#0e131d] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center bg-[#0e131d] rounded-2xl border border-slate-800 text-slate-400 text-sm">
            No matching skills found for &quot;{searchQuery}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-lg group hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#121824] border border-slate-800 group-hover:border-blue-500/50 transition-colors">
                        {iconMap[category.icon] || <Cpu className="w-4 h-4 text-blue-400" />}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-white">
                        {category.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-md">
                      {category.skills.length}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        onMouseEnter={playHover}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#121824] text-slate-200 border border-slate-800 hover:border-cyan-500/60 hover:text-cyan-300 hover:scale-105 active:scale-95 transition-all duration-150 cursor-default shadow-sm group/skill"
                      >
                        <Check className="w-3 h-3 text-cyan-400 group-hover/skill:text-cyan-300" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Production & Academic Ready</span>
                  <span className="text-blue-400">Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CinematicSection>
  );
}
