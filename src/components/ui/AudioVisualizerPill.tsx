"use client";

import { useSound } from "@/context/SoundContext";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioVisualizerPill({ className = "" }: { className?: string }) {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 group ${
        soundEnabled
          ? "bg-blue-950/40 border-blue-500/60 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
          : "bg-[#121824] border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600"
      } ${className}`}
      aria-label={soundEnabled ? "Disable UI interaction sound effects" : "Enable UI interaction sound effects"}
      title={soundEnabled ? "Audio FX Active (Click to Mute)" : "Audio FX Muted (Click to Enable)"}
    >
      {soundEnabled ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-0.5 bg-cyan-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-3" />
            <span className="w-0.5 bg-blue-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-2" />
            <span className="w-0.5 bg-indigo-400 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-3.5" />
          </div>
          <span className="text-[11px] font-semibold text-blue-300">FX ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400" />
          <span className="text-[11px] text-slate-500 group-hover:text-slate-300">FX OFF</span>
        </>
      )}
    </button>
  );
}
