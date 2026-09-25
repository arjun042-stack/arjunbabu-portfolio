"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-lg border border-slate-700/60 bg-[#121824] flex items-center justify-center opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-lg border transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
        isLight
          ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-amber-600 shadow-sm"
          : "bg-[#121824] hover:bg-[#1a2233] border-slate-700 text-blue-400 hover:text-blue-300"
      } ${className}`}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <div className="relative w-4 h-4">
        {isLight ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-500 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 scale-100 text-blue-400 group-hover:rotate-0" />
        )}
      </div>
    </button>
  );
}
