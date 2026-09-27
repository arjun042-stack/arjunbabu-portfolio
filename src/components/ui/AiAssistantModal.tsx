"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiencesData } from "@/data/experience";
import { certificationsData } from "@/data/certifications";
import { MessageSquare, X, Send, Bot, Sparkles, User } from "lucide-react";
import { useSound } from "@/context/SoundContext";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hello! I am Arjun's portfolio AI assistant. Ask me anything about his projects, AI engineering stack, cybersecurity background, or industrial training experience.`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { playClick, playModal } = useSound();

  const suggestedQuestions = [
    "What projects has Arjun built?",
    "Tell me about CyberShield.",
    "What AI technologies does he use?",
    "What is his industrial experience?",
  ];

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("cybershield") || q.includes("siem")) {
      const p = projectsData.find((proj) => proj.id === "cybershield-siem");
      return `CyberShield SIEM AI Assistant is an AI-powered security operations platform. It integrates Wazuh endpoint telemetry, Elasticsearch log aggregation, and Gemini AI reasoning for threat hunting, automated incident investigation, and SOC response playbooks. Built with React, TypeScript, Node.js, Express, and Elasticsearch.`;
    }

    if (q.includes("rfid") || q.includes("attendance") || q.includes("nodemcu") || q.includes("esp8266") || (q.includes("iot") && !q.includes("ai"))) {
      const p = projectsData.find((proj) => proj.id === "rfid-attendance-system");
      return `RFID-Based Smart Student Attendance System is an IoT-enabled student attendance system that automates attendance using RFID-based identification and NodeMCU (ESP8266). The system reads unique RFID card IDs, matches them with registered student records, and transmits attendance data to a cloud database for real-time monitoring. Technologies: RFID, NodeMCU, ESP8266, Wi-Fi, Cloud Database, IoT.`;
    }

    if (q.includes("project") || q.includes("built") || q.includes("portfolio")) {
      return `Arjun has built 4 key engineering systems:\n1. CyberShield SIEM AI Assistant — SOC security triage combining Wazuh & Gemini AI.\n2. AI Documentation Automation Platform — automated technical manuals and API references using Gemini API.\n3. Hybrid Phishing URL-Trap — ML-based threat detection using Random Forest and honeypot forensics.\n4. RFID-Based Smart Student Attendance System — IoT attendance automation using RFID identification, NodeMCU ESP8266, Wi-Fi, and cloud database integration.`;
    }

    if (q.includes("ai") || q.includes("gemini") || q.includes("machine learning") || q.includes("ml")) {
      return `In AI & Machine Learning, Arjun specializes in Gemini API prompt pipelines & function calling, LLM reasoning integration for security triage, automated documentation workflows, and predictive ML using Random Forest with Scikit-learn, Pandas, and Python.`;
    }

    if (q.includes("experience") || q.includes("training") || q.includes("intern") || q.includes("sccl") || q.includes("singareni")) {
      const exp = experiencesData[0];
      return `Arjun completed a 6-month Industrial Trainee internship at Singareni Collieries Company Limited (SCCL) IT Department in Kothagudem (Dec 2023 – May 2024), gaining enterprise exposure in system maintenance, network troubleshooting, and enterprise software operations.`;
    }

    if (q.includes("skills") || q.includes("stack") || q.includes("technologies")) {
      return `Arjun's technical stack spans:\n• AI / ML: Gemini API, LLM Integration, Scikit-learn, Random Forest\n• Software Engineering: TypeScript, JavaScript, Python, Node.js, Express, REST APIs\n• Frontend: React, Next.js, Tailwind CSS\n• Cybersecurity: Wazuh, Elasticsearch, SIEM, Honeypots, Burp Suite, Nmap\n• IoT & Embedded: RFID, NodeMCU, ESP8266, Wi-Fi, Cloud Database.`;
    }

    if (q.includes("certification") || q.includes("cert") || q.includes("cisco") || q.includes("deloitte")) {
      return `Arjun holds verified industry credentials including:\n• Cisco: Introduction to Modern AI\n• Cisco: Junior Cybersecurity Analyst\n• Cisco: Ethical Hacker\n• Deloitte: Cyber Job Simulation\n• Tata Forage: Cybersecurity Analyst Simulation.`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("phone")) {
      return `You can reach Arjun directly at ${profileData.email} or call ${profileData.phoneDisplay}. He is currently based in ${profileData.location} and open for software & AI engineering roles.`;
    }

    return `Arjunbabu Saila is a Software Engineer specializing in AI Engineering and Cybersecurity. He develops full-stack software, integrates Gemini AI reasoning pipelines, and builds security automation & IoT systems. Feel free to ask about his projects (CyberShield, AI Docs, Phishing Trap, RFID Attendance System) or view his resume!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    playClick();
    const userMsg: Message = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAnswer(query);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsTyping(false);
    }, 350);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => {
          playModal();
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-400/30 group"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
        <span>Ask AI Assistant</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
      </button>

      {/* Assistant Modal Window */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9995] flex items-end sm:items-center justify-end p-4 sm:p-6 pointer-events-none"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity"
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
          />

          <div className="relative w-full sm:w-[420px] max-h-[85vh] flex flex-col rounded-3xl bg-[#0c101a] border border-slate-700/90 shadow-2xl pointer-events-auto z-10 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="p-4 bg-[#080b12] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                    <span>Portfolio AI Assistant</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                      LOCAL
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400">Grounding on Arjunbabu's verified data</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 space-y-3.5 overflow-y-auto max-h-[380px] text-xs font-sans">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-600/20"
                        : "bg-[#131926] text-slate-200 border border-slate-800 rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1 px-3 bg-[#131926] w-fit rounded-xl border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Synthesizing answer...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompt Pills */}
            <div className="px-4 py-2 bg-[#080b12] border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 bg-[#121824] hover:bg-blue-950/60 hover:text-cyan-300 border border-slate-800 hover:border-blue-700/60 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#080b12] border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, certifications..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#111726] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-40"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
