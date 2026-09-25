"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";
import { Copy, Check, Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState<"all" | "whoami" | "focus" | "status">("all");

  const terminalText = `$ whoami
${profileData.terminalDetails.whoami}

$ focus
${profileData.terminalDetails.focus.join("\n")}

$ status
${profileData.terminalDetails.currentWork}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl bg-[#0c1017] border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs text-slate-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#101520] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80 hover:bg-rose-500/80 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80 hover:bg-amber-500/80 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80 hover:bg-emerald-500/80 transition-colors" />
          <div className="flex items-center gap-1.5 ml-2 text-[11px] text-slate-400">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300">arjunbabu@sys: ~</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter Command Chips */}
          <div className="hidden sm:flex items-center gap-1 text-[10px]">
            <button
              onClick={() => setActiveCommand("all")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                activeCommand === "all"
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              all
            </button>
            <button
              onClick={() => setActiveCommand("whoami")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                activeCommand === "whoami"
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              whoami
            </button>
            <button
              onClick={() => setActiveCommand("focus")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                activeCommand === "focus"
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              focus
            </button>
            <button
              onClick={() => setActiveCommand("status")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                activeCommand === "status"
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              status
            </button>
          </div>

          <button
            onClick={copyToClipboard}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy snippet"
            aria-label="Copy terminal content"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 space-y-3.5 overflow-x-auto leading-relaxed">
        {(activeCommand === "all" || activeCommand === "whoami") && (
          <div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-blue-400 font-semibold">$</span>
              <span className="text-slate-200">whoami</span>
            </div>
            <p className="mt-1 text-slate-300 font-medium pl-3 border-l border-blue-500/30">
              {profileData.terminalDetails.whoami}
            </p>
          </div>
        )}

        {(activeCommand === "all" || activeCommand === "focus") && (
          <div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-blue-400 font-semibold">$</span>
              <span className="text-slate-200">focus</span>
            </div>
            <div className="mt-1 pl-3 border-l border-blue-500/30 space-y-0.5">
              {profileData.terminalDetails.focus.map((item, idx) => (
                <div key={idx} className="text-slate-300 flex items-center gap-2">
                  <span className="text-blue-400 text-[10px]">▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeCommand === "all" || activeCommand === "status") && (
          <div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-blue-400 font-semibold">$</span>
              <span className="text-slate-200">status</span>
            </div>
            <p className="mt-1 text-slate-300 pl-3 border-l border-blue-500/30">
              {profileData.terminalDetails.currentWork}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-500 pt-1">
          <span className="text-blue-400/70 font-semibold">$</span>
          <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
