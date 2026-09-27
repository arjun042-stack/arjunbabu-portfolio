"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import {
  playIntroAmbient,
  playQuoteReveal,
  playProfileReveal,
  playNameReveal,
  playHomeTransition,
  stopIntroSounds,
  getInitialSoundState,
  setSoundState,
} from "@/lib/soundManager";
import { Volume2, VolumeX, ArrowRight, Sparkles } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Current stage: 0 = Init, 1 = Quote 1, 2 = Quote 2, 3 = Transition/Init text, 4 = Profile, 5 = Name/Title, 6 = Statement, 7 = Transition to Home, 8 = Done
  const [stage, setStage] = useState<number>(0);
  const [soundActive, setSoundActive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const stageRef = useRef<number>(0);

  stageRef.current = stage;

  // Initialize sound preference & check session
  useEffect(() => {
    // Respect reduced motion: shorten or bypass sequence
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = sessionStorage.getItem("portfolio_intro_seen");

    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const soundPref = getInitialSoundState();
    setSoundActive(soundPref);

    if (prefersReducedMotion) {
      // Rapid accessible transition for reduced motion
      const t1 = setTimeout(() => setStage(1), 200);
      const t2 = setTimeout(() => setStage(4), 1000);
      const t3 = setTimeout(() => handleSkip(), 2200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    // Choreographed Timeline
    // 0.0s -> Start black screen
    // 0.6s -> Stage 1: Quote 1
    // 2.0s -> Stage 2: Quote 2
    // 3.8s -> Stage 3: Quote fades, AI system initializing text & converging network
    // 4.9s -> Stage 4: Profile photo circular bloom & reveal
    // 6.0s -> Stage 5: Name and professional title reveal
    // 7.1s -> Stage 6: Personal statement
    // 8.2s -> Stage 7: Transition to Home
    // 9.4s -> Complete & unmount
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setStage(1);
        playIntroAmbient(0.06);
      }, 600)
    );

    timers.push(
      setTimeout(() => {
        setStage(2);
        playQuoteReveal(0.04);
      }, 2000)
    );

    timers.push(
      setTimeout(() => {
        setStage(3);
      }, 3800)
    );

    timers.push(
      setTimeout(() => {
        setStage(4);
        playProfileReveal(0.06);
      }, 4900)
    );

    timers.push(
      setTimeout(() => {
        setStage(5);
        playNameReveal(0.07);
      }, 6000)
    );

    timers.push(
      setTimeout(() => {
        setStage(6);
      }, 7100)
    );

    timers.push(
      setTimeout(() => {
        setStage(7);
        setIsFadingOut(true);
        playHomeTransition(0.05);
      }, 8200)
    );

    timers.push(
      setTimeout(() => {
        finishIntro();
      }, 9400)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
      stopIntroSounds();
    };
  }, []);

  const finishIntro = () => {
    sessionStorage.setItem("portfolio_intro_seen", "true");
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    stopIntroSounds();
    setIsFadingOut(true);
    setTimeout(() => {
      finishIntro();
    }, 350);
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundState(next);
    if (next) {
      if (stageRef.current <= 2) {
        playIntroAmbient(0.06);
      } else if (stageRef.current >= 4) {
        playProfileReveal(0.05);
      }
    } else {
      stopIntroSounds();
    }
  };

  // Ambient interactive canvas: evolves from drifting stardust -> converging neural network -> radiating web
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particleCount = width < 768 ? 40 : 75;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentStage = stageRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle central ambient glow in stages 3-7
      if (currentStage >= 3) {
        const glowGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          10,
          centerX,
          centerY,
          Math.min(width, height) * 0.45
        );
        glowGrad.addColorStop(0, "rgba(59, 130, 246, 0.08)");
        glowGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (currentStage === 3) {
          // Converge subtly toward center
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.x += dx * 0.012;
          p.y += dy * 0.012;
        } else if (currentStage >= 4) {
          // Subtle gentle expansion and drift
          p.x += p.vx * 0.8;
          p.y += p.vy * 0.8;
        } else {
          // Stage 1-2: natural floating dust
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${p.baseAlpha})`;
        ctx.fill();

        // In stages 3-6, draw connecting network lines
        if (currentStage >= 3 && currentStage <= 6) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            const maxDist = width < 768 ? 85 : 120;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#04060a] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-1000 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
      aria-live="polite"
      role="dialog"
      aria-label="Cinematic Portfolio Introduction"
    >
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Top Bar: Minimal Sound Control */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggleSound}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-200 active:scale-95"
          aria-label={soundActive ? "Mute Intro Audio" : "Enable Intro Audio"}
        >
          {soundActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              <span>SOUND OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Bar: Minimal Skip Control */}
      <div className="absolute bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleSkip}
          className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 text-xs font-mono tracking-widest text-slate-400 hover:text-white backdrop-blur-md transition-all duration-200 active:scale-95"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Central Content Orchestrator */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[400px]">
        {/* STAGES 1 & 2: INSPIRATIONAL QUOTE */}
        {stage >= 1 && stage <= 3 && (
          <div
            className={`transition-all duration-1000 ease-out transform ${
              stage === 3
                ? "opacity-0 -translate-y-6 scale-95 blur-sm"
                : "opacity-100 translate-y-0 scale-100 blur-0"
            }`}
          >
            {/* Quote Line 1 */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-100 tracking-wide leading-tight font-sans transition-all duration-700">
              &ldquo;Every idea begins with a question.&rdquo;
            </h1>

            {/* Quote Line 2 */}
            <div
              className={`mt-4 sm:mt-5 transition-all duration-700 delay-150 ${
                stage >= 2
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-lg sm:text-2xl md:text-3xl text-cyan-200/90 font-light tracking-wide font-sans">
                And every solution begins with building.
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: TECHNICAL INITIALIZING MICRO-METADATA */}
        {stage === 3 && (
          <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-cyan-400/40 flex items-center justify-center animate-spin-slow">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            </div>
            <div className="space-y-1 font-mono text-[11px] tracking-widest text-slate-400 uppercase">
              <p className="text-cyan-400 font-semibold">INITIALIZING EXPERIENCE</p>
              <p className="text-slate-500">AI ENGINEERING // SYSTEM ONLINE</p>
            </div>
          </div>
        )}

        {/* STAGES 4, 5, 6, 7: PROFILE, NAME & IDENTITY REVEAL */}
        {stage >= 4 && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
            {/* Stage 4: Profile Photo Mask & Circular Light Reveal */}
            <div className="relative group mb-6">
              {/* Radial expanding background light bloom */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-cyan-400/30 to-indigo-600/30 rounded-full blur-2xl opacity-80 animate-pulse pointer-events-none" />

              {/* Precise Circular Container */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.4)] bg-[#0c101a] transform transition-all duration-700 scale-100">
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  width={144}
                  height={144}
                  priority
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
              </div>

              {/* Status indicator pip */}
              <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-[#05070b] flex items-center justify-center border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Stage 5: Name & Professional Title Reveal */}
            <div
              className={`transition-all duration-700 ${
                stage >= 5
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-widest uppercase font-sans">
                {profileData.name}
              </h2>

              <div className="mt-2.5 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                <span>SOFTWARE ENGINEER</span>
                <span className="text-slate-600">•</span>
                <span>AI ENGINEERING</span>
              </div>
            </div>

            {/* Stage 6: Personal Identity Statement */}
            <div
              className={`mt-4 max-w-lg transition-all duration-700 delay-100 ${
                stage >= 6
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              <p className="text-sm sm:text-base text-slate-300 font-normal tracking-wide font-sans">
                &ldquo;Building intelligent systems with code, AI and security.&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Subtle progress track at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 transition-all duration-700 ease-linear"
          style={{
            width: `${Math.min(100, (stage / 7) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
