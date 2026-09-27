"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  playClickSound,
  playHoverSound,
  playTransitionSound,
  playModalSound,
  playToggleSound,
} from "@/lib/sound";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playHover: () => void;
  playTransition: () => void;
  playModal: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("portfolio-sound-fx");
      if (stored === "true") {
        setSoundEnabled(true);
      }
    } catch {}
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio-sound-fx", String(next));
      } catch {}
      // Play a small feedback sound on toggle even if turning on
      playToggleSound(next);
      return next;
    });
  }, []);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    playClickSound();
  }, [soundEnabled]);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    playHoverSound();
  }, [soundEnabled]);

  const playTransition = useCallback(() => {
    if (!soundEnabled) return;
    playTransitionSound();
  }, [soundEnabled]);

  const playModal = useCallback(() => {
    if (!soundEnabled) return;
    playModalSound();
  }, [soundEnabled]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick,
        playHover,
        playTransition,
        playModal,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
