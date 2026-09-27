"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Hackathons from "@/components/Hackathons";
import ResumeCTA from "@/components/ResumeCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/context/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import CinematicIntro from "@/components/ui/CinematicIntro";
import AiAssistantModal from "@/components/ui/AiAssistantModal";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <SmoothScroll>
      <CinematicIntro onComplete={() => setIntroFinished(true)} />
      <ScrollProgress />
      <CustomCursor />
      <div className="min-h-screen bg-[#090c12] text-[#f8fafc] flex flex-col selection:bg-blue-600/30 selection:text-white relative">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Hackathons />
          <ResumeCTA />
          <Contact />
        </main>
        <Footer />
        <AiAssistantModal />
      </div>
    </SmoothScroll>
  );
}
