"use client";

import { useState, useMemo } from "react";
import { skillCategories } from "@/data/skills";
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
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-4 h-4 text-blue-400" />,
  Layout: <Layout className="w-4 h-4 text-blue-400" />,
  Brain: <Brain className="w-4 h-4 text-blue-400" />,
  Shield: <Shield className="w-4 h-4 text-blue-400" />,
  TerminalSquare: <TerminalSquare className="w-4 h-4 text-blue-400" />,
  Server: <Server className="w-4 h-4 text-blue-400" />,
  Cpu: <Cpu className="w-4 h-4 text-blue-400" />,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCategories = useMemo(() => {
    let result = skillCategories;

    if (activeCategory !== "all") {
      result = result.filter((cat) => cat.id === activeCategory);
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
        .filter((cat): cat is typeof skillCategories[0] => cat !== null);
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills & Technologies
            </h2>
            <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-3" />
            <p className="text-sm sm:text-base text-slate-300">
              Categorized toolsets, frameworks, and engineering competencies across software development, AI, and cybersecurity.
            </p>
          </div>

          {/* Quick Search Tool for Recruiters */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skill (e.g. Wazuh, Python)..."
              className="w-full bg-[#0e131d] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Filter skills"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === "all"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "bg-[#0e131d] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
            }`}
          >
            All Categories ({skillCategories.length})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "bg-[#0e131d] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center bg-[#0e131d] rounded-xl border border-slate-800 text-slate-400 text-sm">
            No matching skills found for &quot;{searchQuery}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20">
                        {iconMap[category.icon] || <Cpu className="w-4 h-4 text-blue-400" />}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-white">
                        {category.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                      {category.skills.length}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {category.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#121824] text-slate-200 border border-slate-800/80 hover:border-blue-500/40 hover:text-white transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Professional competency</span>
                  <Check className="w-3.5 h-3.5 text-blue-400/80" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
