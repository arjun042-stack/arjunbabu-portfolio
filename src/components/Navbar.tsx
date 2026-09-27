"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { FileDown, Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AudioVisualizerPill from "./ui/AudioVisualizerPill";
import { useSound } from "@/context/SoundContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick, playHover, playTransition } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    playTransition();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090c12]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 group focus-visible:outline-blue-500 rounded-md"
            aria-label="Arjunbabu Saila Home"
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-blue-500/40 group-hover:border-blue-400 transition-colors bg-[#121824] shrink-0">
              <Image
                src={profileData.avatarUrl}
                alt={profileData.name}
                width={36}
                height={36}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-semibold text-slate-100 text-sm tracking-wide hidden sm:inline-block group-hover:text-blue-400 transition-colors">
              ARJUNBABU SAILA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors relative ${
                    isActive
                      ? "text-white bg-slate-800/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Audio Pill, Theme Toggle, Resume Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <AudioVisualizerPill />
            <ThemeToggle />

            <a
              href={profileData.resumeUrl}
              download="Arjunbabu_Saila_Resume.pdf"
              onClick={playClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-blue-600/15 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
              aria-label="Download Resume PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e131d]/98 border-b border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-blue-400 bg-blue-950/40 border-l-2 border-blue-500"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-[#121824] border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Sound Effects</span>
                <AudioVisualizerPill />
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-[#121824] border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Theme</span>
                <ThemeToggle />
              </div>

              <a
                href={profileData.resumeUrl}
                download="Arjunbabu_Saila_Resume.pdf"
                onClick={playClick}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Download Resume PDF
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
