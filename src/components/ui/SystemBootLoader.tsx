"use client";

import { useEffect, useState } from "react";

export default function SystemBootLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING AI SYSTEMS...");

  useEffect(() => {
    // Only run if not already booted in this session
    const hasBooted = sessionStorage.getItem("portfolio_booted");
    if (hasBooted) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("portfolio_booted", "true");
          }, 200);
          return 100;
        }

        const next = prev + 15;
        if (next > 30 && next < 60) {
          setStatusText("LOADING NEURAL NODES & MODELS...");
        } else if (next >= 60 && next < 85) {
          setStatusText("SECURING REPOSITORIES & METRICS...");
        } else if (next >= 85) {
          setStatusText("AI ENGINEERING PORTFOLIO READY");
        }
        return next > 100 ? 100 : next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setLoading(false);
    sessionStorage.setItem("portfolio_booted", "true");
  };

  if (!loading) return null;

  const filledCount = Math.floor(progress / 10);
  const bar = "█".repeat(filledCount) + "░".repeat(10 - filledCount);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-[#07090e] flex flex-col items-center justify-center font-mono text-xs px-6 select-none animate-out fade-out duration-300"
      style={{
        opacity: progress === 100 ? 0 : 1,
        transition: "opacity 300ms ease-out",
        pointerEvents: progress === 100 ? "none" : "auto",
      }}
    >
      <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0d1117] border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] text-slate-300 font-bold tracking-wider">
              SYS.INIT // v2.6.4
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
          >
            [ Skip ]
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-slate-400 text-[11px] flex justify-between">
            <span>{statusText}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-wider pt-1">
            [{bar}]
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>ARJUNBABU SAILA</span>
          <span className="text-blue-400">AI ENGINEERING</span>
        </div>
      </div>
    </div>
  );
}
