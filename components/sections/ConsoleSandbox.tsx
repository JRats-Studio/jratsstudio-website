"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Play, RotateCcw } from "lucide-react";

interface LogLine {
  id: number;
  text: string;
  type: "input" | "system" | "success" | "error";
}

export function ConsoleSandbox() {
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, text: "JRATS CORE OS v3.1.2 - TYPE A COMMAND OR CHOOSE A ROUTINE BELOW.", type: "system" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: LogLine["type"]) => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), text, type }]);
  };

  const handleCommand = async (command: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    addLog(`$ ${command}`, "input");

    if (command === "/clear") {
      setLogs([]);
      setIsProcessing(false);
      return;
    }

    if (command === "/skills") {
      addLog("READING JASH RATHOD WORKSHOP CREDENTIALS...", "system");
      await delay(800);
      addLog("-> Agentic AI Architectures [FOUND]", "success");
      addLog("-> Custom LLM Memory Layers [FOUND]", "success");
      addLog("-> Next.js Scalable SaaS Platforms [FOUND]", "success");
      addLog("-> High-performance Cloudflare Networks [FOUND]", "success");
    } else if (command === "/agent") {
      addLog("SPAWNING AUTONOMOUS CO-PILOT AGENT...", "system");
      await delay(600);
      addLog("AGENT STATE: INITIALIZED", "success");
      await delay(600);
      addLog("PLANNING: [Task: Audit Database, Goal: Clear redundancies]", "system");
      await delay(800);
      addLog("CALLING TOOL: Postgres DB connector...", "system");
      await delay(700);
      addLog("SUCCESS: Cleared 1,420 redundancy rows.", "success");
      addLog("AGENT PROCESS COMPLETED SUCCESSFULLY.", "success");
    } else if (command === "/status") {
      addLog("QUERYING HOST NODE DIAGNOSTICS...", "system");
      await delay(600);
      addLog("SYSTEM UPTIME // 99.98%", "success");
      addLog("SECURE KEY PROTOCOLS // ACTIVE", "success");
      addLog("DIAGNOSTIC STATUS // EXCELLENT", "success");
    } else {
      addLog(`ERR: Command '${command}' not recognized. Try buttons below.`, "error");
    }
    setIsProcessing(false);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Background ambient forest-green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#08cb00]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header Title */}
        <div className="mb-12 text-center">
          <h4 className="font-mono text-[#08cb00] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
            / INTERACTIVE_PLAYGROUND
          </h4>
          <h2 className="font-heading text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Try Our Sandbox
          </h2>
          <div className="w-12 h-1 bg-[#08cb00] mx-auto mt-4" />
        </div>

        {/* Dynamic Glass Terminal Frame */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/5 font-mono text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#08cb00]" />
              <span className="text-gray-400">system@jrats: ~</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
          </div>

          {/* Terminal Logs Output Area */}
          <div ref={logContainerRef} className="p-6 h-[280px] overflow-y-auto font-mono text-xs leading-relaxed flex flex-col gap-2 scrollbar-thin select-text">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`
                  ${log.type === "input" ? "text-[#08cb00] font-bold" : ""}
                  ${log.type === "system" ? "text-gray-500" : ""}
                  ${log.type === "success" ? "text-[#08cb00]" : ""}
                  ${log.type === "error" ? "text-red-400" : ""}
                  ${log.type === "system" && log.text.startsWith("->") ? "pl-4 text-gray-400" : ""}
                `}
              >
                {log.text}
              </div>
            ))}
            {isProcessing && (
              <div className="text-gray-500 animate-pulse">Running process...</div>
            )}
          </div>

          {/* Quick-Click Command Buttons */}
          <div className="p-4 bg-white/[0.01] border-t border-white/5 flex flex-wrap gap-3 items-center justify-center">
            <button
              onClick={() => handleCommand("/skills")}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] hover:bg-[#08cb00]/10 border border-white/10 hover:border-[#08cb00]/40 rounded-lg text-[10px] font-mono tracking-wider text-white hover:text-[#08cb00] transition-all cursor-pointer hover-target"
            >
              <Shield className="w-3 h-3" />
              /SKILLS
            </button>
            <button
              onClick={() => handleCommand("/agent")}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] hover:bg-[#08cb00]/10 border border-white/10 hover:border-[#08cb00]/40 rounded-lg text-[10px] font-mono tracking-wider text-white hover:text-[#08cb00] transition-all cursor-pointer hover-target"
            >
              <Play className="w-3 h-3" />
              /RUN_AGENT
            </button>
            <button
              onClick={() => handleCommand("/status")}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] hover:bg-[#08cb00]/10 border border-white/10 hover:border-[#08cb00]/40 rounded-lg text-[10px] font-mono tracking-wider text-white hover:text-[#08cb00] transition-all cursor-pointer hover-target"
            >
              <Terminal className="w-3 h-3" />
              /STATUS
            </button>
            <button
              onClick={() => handleCommand("/clear")}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] hover:bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono tracking-wider text-gray-400 hover:text-white transition-all cursor-pointer hover-target"
            >
              <RotateCcw className="w-3 h-3" />
              /CLEAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
