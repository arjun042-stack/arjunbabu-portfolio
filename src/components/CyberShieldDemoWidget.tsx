"use client";

import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Terminal, Cpu, ArrowUpRight } from "lucide-react";

interface SecurityEvent {
  id: string;
  time: string;
  source: string;
  type: string;
  rule: string;
  severity: "high" | "medium" | "low";
  aiAnalysis: string;
  status: "triaged" | "mitigated";
}

const mockEvents: SecurityEvent[] = [
  {
    id: "SEC-8092",
    time: "14:22:08 UTC",
    source: "wazuh-agent-prod-02",
    type: "Suspicious PowerShell Invocation",
    rule: "MITRE ATT&CK T1059.001 (Command & Scripting)",
    severity: "high",
    aiAnalysis: "Base64 encoded payload decoded; identified outbound reverse TCP attempt to untrusted IP. Automated playbook triggered.",
    status: "triaged"
  },
  {
    id: "SEC-8089",
    time: "14:19:42 UTC",
    source: "elastic-auth-stream",
    type: "Repeated SSH Authentication Failure",
    rule: "Brute Force Threshold Exceeded (5 attempts/min)",
    severity: "medium",
    aiAnalysis: "IP geolocated outside perimeter. Temporary IP firewall block enforced via automated security orchestration.",
    status: "mitigated"
  }
];

export default function CyberShieldDemoWidget() {
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent>(mockEvents[0]);
  const [activeTab, setActiveTab] = useState<"stream" | "ai">("ai");

  return (
    <div className="rounded-xl bg-[#0a0d14] border border-slate-800/90 shadow-xl overflow-hidden font-mono text-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0f1420] border-b border-slate-800 text-[11px]">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold text-slate-200">CyberShield SIEM Console</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-950/80 text-blue-300 border border-blue-800/60">
            Wazuh + Gemini AI
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 text-[10px]">Telemetry Live</span>
        </div>
      </div>

      {/* CyberShield Progressive Security Dataflow Stream */}
      <div className="px-3.5 py-2 bg-[#090d16] border-b border-slate-800/80 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-[9px] font-mono whitespace-nowrap min-w-max">
          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">WAZUH</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800">EVENTS</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-blue-950 text-indigo-300 border border-blue-800">ELASTICSEARCH</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 animate-pulse">AI ANALYSIS</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">THREAT INVESTIGATION</span>
        </div>
      </div>

      {/* Control Tabs */}
      <div className="flex border-b border-slate-800/80 bg-[#0d111a] px-3 pt-1 text-[11px]">
        <button
          onClick={() => setActiveTab("ai")}
          className={`px-3 py-1.5 border-b-2 font-medium transition-colors ${
            activeTab === "ai"
              ? "border-blue-500 text-blue-300 bg-blue-950/20"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          AI Incident Investigation
        </button>
        <button
          onClick={() => setActiveTab("stream")}
          className={`px-3 py-1.5 border-b-2 font-medium transition-colors ${
            activeTab === "stream"
              ? "border-blue-500 text-blue-300 bg-blue-950/20"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Event Telemetry ({mockEvents.length})
        </button>
      </div>

      {/* Widget Content Area */}
      <div className="p-3.5 space-y-3">
        {activeTab === "ai" ? (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800/60">
              <span className="text-slate-400">Target Event:</span>
              <span className="text-rose-400 font-semibold">{selectedEvent.id} [{selectedEvent.type}]</span>
            </div>

            {/* AI Assistant Output Card */}
            <div className="p-3 rounded-lg bg-[#0e1422] border border-blue-900/30 space-y-2 text-[11px] leading-relaxed">
              <div className="flex items-center gap-1.5 text-blue-400 font-medium">
                <Cpu className="w-3.5 h-3.5" />
                <span>Gemini SOC Assistant Synthesis:</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">
                {selectedEvent.aiAnalysis}
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>Rule: {selectedEvent.rule}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Triaged
                </span>
              </div>
            </div>

            {/* Event Selector Pill List */}
            <div className="flex gap-2 pt-1">
              {mockEvents.map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`px-2 py-1 rounded text-[10px] transition-colors border ${
                    selectedEvent.id === evt.id
                      ? "bg-blue-950/60 border-blue-600/60 text-blue-300"
                      : "bg-[#0f1420] border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {evt.id}: {evt.type.substring(0, 18)}...
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {mockEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                  selectedEvent.id === evt.id
                    ? "bg-[#0e1422] border-blue-500/50"
                    : "bg-[#0b0e17] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">{evt.id}</span>
                  <span>{evt.time}</span>
                </div>
                <div className="mt-1 text-slate-200 font-medium text-[11px]">
                  {evt.type}
                </div>
                <div className="mt-0.5 text-[10px] text-slate-400 truncate">
                  Src: {evt.source}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="px-3.5 py-1.5 bg-[#0d111a] border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
        <span>SOC Engine: Active</span>
        <span>Elasticsearch Cluster: Healthy</span>
      </div>
    </div>
  );
}
