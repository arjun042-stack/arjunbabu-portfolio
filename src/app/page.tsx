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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090c12] text-[#f8fafc] flex flex-col selection:bg-blue-600/30 selection:text-white">
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
    </div>
  );
}
