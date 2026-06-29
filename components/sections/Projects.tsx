"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Database, Video } from "lucide-react";
import { TextReveal } from "@/components/effects/TextReveal";
import DecryptedSplitText from "@/components/effects/DecryptedSplitText";

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: string;
  tech: string[];
  icon: any;
}

const projects: Project[] = [
  {
    id: "01",
    tag: "AGENTIC_AI",
    title: "AI ASSISTANTS",
    description: "We do not just use AI; we customize it for your business. We build smart digital helpers that work 24/7 to make your operations faster and remove manual errors.",
    metrics: "AI ASSISTANTS // CHATBOTS",
    tech: ["LANGGRAPH", "PYTHON", "CREWAI"],
    icon: Cpu,
  },
  {
    id: "02",
    tag: "SOFTWARE_DEV",
    title: "WEBSITES & APPS",
    description: "We design and build fast, modern websites and online apps that look great on mobile and help your business grow.",
    metrics: "WEBSITES // WEB APPLICATIONS",
    tech: ["NEXTJS", "TYPESCRIPT", "TAILWIND"],
    icon: Database,
  },
  {
    id: "03",
    tag: "CREATIVE_AI",
    title: "DIGITAL MEDIA",
    description: "We create dynamic promo videos, 3D graphics, and digital artwork that grab attention and stop people from scrolling past your brand.",
    metrics: "3D ANIMATION // BRAND VIDEO",
    tech: ["RUNWAY", "AFTER_EFFECTS", "BLENDER"],
    icon: Video,
  },
  {
    id: "04",
    tag: "SECURE_INFRASTRUCTURE",
    title: "SECURE PORTALS",
    description: "We build secure admin dashboards and database portals that let you store client information, track files, and manage your business records safely.",
    metrics: "ADMIN PORTALS // DATABASE SYSTEMS",
    tech: ["POSTGRES", "ZERO-TRUST", "NEXTJS"],
    icon: Shield,
  },
];

export function Projects() {
  return (
    <section className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      {/* Dynamic Background forest-green radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#08cb00]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h4 className="font-mono text-[#08cb00] text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
              / WHAT_WE_BUILD
            </h4>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl text-white uppercase tracking-tighter leading-none">
              <DecryptedSplitText text="The work speaks" charDelay={30} />
            </h2>
            <div className="w-16 sm:w-24 h-1.5 bg-[#08cb00] mt-6" />
          </div>
          <p className="font-mono text-gray-500 text-xs sm:text-sm max-w-xs leading-relaxed uppercase">
            // OUR COMPLETED CAPABILITIES MAPPING DIRECTLY TO WHAT JRATS STUDIO BUILDS FOR CLIENTS.
          </p>
        </div>

        {/* Asymmetric Project Cards Grid (Masonry Effect) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative lg:pb-24">
          {projects.map((project, i) => {
            return <ProjectCard key={project.id} project={project} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // Masonry layout vertical translate offsets on desktop
  const masonryOffsets = [
    "lg:translate-y-0",
    "lg:translate-y-12",
    "lg:translate-y-6",
    "lg:translate-y-16"
  ];

  const offsetClass = masonryOffsets[index % masonryOffsets.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white/[0.01] backdrop-blur-xl border border-white/10 hover:border-[#08cb00]/40 rounded-2xl p-5 flex flex-col justify-between h-[525px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(8,203,0,0.1)] group overflow-hidden ${offsetClass}`}
    >
      {/* Glossy Sheen Overlay */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
      />

      <div>
        {/* Custom Premium Vector UI Mockup Container (Photo replacement) */}
        <div className="relative w-full h-[135px] bg-[#000500] border border-white/10 rounded-xl mb-4 overflow-hidden shadow-inner group-hover:border-[#08cb00]/30 transition-all duration-500 flex items-center justify-center p-3 select-none">
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
          
          {project.id === "01" && <AgentUiMockup isHovered={isHovered} />}
          {project.id === "02" && <SaaSUiMockup isHovered={isHovered} />}
          {project.id === "03" && <VideoUiMockup isHovered={isHovered} />}
          {project.id === "04" && <DbUiMockup isHovered={isHovered} />}
        </div>

        {/* Top Header: ID & Tag */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-gray-600 text-[10px] font-bold tracking-widest">
            // STACK_{project.id}
          </span>
          <span className="font-mono text-[#08cb00]/80 text-[9px] tracking-widest uppercase font-semibold">
            {project.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg text-white uppercase tracking-tight mb-2 group-hover:text-[#08cb00] transition-colors duration-300">
          <TextReveal text={project.title} />
        </h3>

        {/* Description */}
        <p className="font-mono text-gray-400 text-[11px] leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      {/* Bottom Footer: Metric */}
      <div className="border-t border-white/10 pt-3 font-mono">
        <div className="text-[10px] text-white font-bold tracking-widest uppercase">
          {project.metrics}
        </div>
      </div>
    </motion.div>
  );
}

/* --- Premium Vector UI Mockups (Like Stripe & Linear) --- */

function AgentUiMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[8px] text-gray-500">
      {/* Header bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1.5">
        <span className="text-[#08cb00] font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#08cb00] animate-pulse" />
          AGENT_CORE
        </span>
        <span className="text-[7px]">SYS_ACTIVE</span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 flex flex-col gap-1.5">
        {/* User Query */}
        <div className="self-end bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1 max-w-[85%] text-right">
          Can you sort database logs?
        </div>
        {/* Agent Answer */}
        <motion.div
          animate={isHovered ? { opacity: [0.3, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="self-start bg-[#08cb00]/10 border border-[#08cb00]/20 text-[#08cb00] rounded-lg px-2 py-1 max-w-[85%]"
        >
          Task received. Running cleanup...
        </motion.div>
      </div>
    </div>
  );
}

function SaaSUiMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[8px] text-gray-500">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1">
        <span>ANALYTICS_BOARD</span>
        <span className="text-[#08cb00]">SPEED // 100%</span>
      </div>

      {/* Grid chart mockup */}
      <div className="flex-1 flex items-end gap-1 px-2 relative pt-2">
        {/* Faint grid background line */}
        <div className="absolute inset-0 border-b border-white/5" />
        
        {/* Animated chart line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 55">
          <motion.path
            d="M 10 45 Q 40 30 70 38 T 130 10 T 150 5"
            fill="none"
            stroke="#08cb00"
            strokeWidth="1.5"
            initial={{ pathLength: 0.2 }}
            animate={isHovered ? { pathLength: 1 } : { pathLength: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Small UI sidebar blocks */}
        <div className="absolute top-3 left-0 w-8 h-2 rounded bg-white/5 border border-white/10" />
        <div className="absolute top-6 left-0 w-6 h-2 rounded bg-[#08cb00]/10 border border-[#08cb00]/20" />
      </div>
    </div>
  );
}

function VideoUiMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[8px] text-gray-500 relative">
      {/* Video workspace header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1">
        <span>MEDIA_FORGE_V1</span>
        <span className="text-[#08cb00]">RENDER_ACTIVE</span>
      </div>

      {/* Video timeline visual blocks */}
      <div className="flex-1 flex flex-col gap-1 justify-center">
        {/* Layer 1 track */}
        <div className="h-2 w-full bg-white/5 border border-white/10 rounded flex items-center px-1 overflow-hidden relative">
          <motion.div
            animate={isHovered ? { x: [0, 40, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-10 h-full bg-[#08cb00]/40 rounded-sm"
          />
        </div>
        {/* Layer 2 track */}
        <div className="h-2 w-full bg-[#08cb00]/10 border border-[#08cb00]/20 rounded flex items-center px-1 overflow-hidden relative">
          <motion.div
            animate={isHovered ? { x: [100, 0, 100] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-14 h-full bg-[#08cb00]/60 rounded-sm"
          />
        </div>
      </div>

      {/* Center play icon overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border border-white/15 hover:border-[#08cb00] flex items-center justify-center text-[7px] text-white">
        ▶
      </div>
    </div>
  );
}

function DbUiMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[8px] text-gray-500">
      {/* Table header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1.5">
        <span>DATABASE_RECORDS</span>
        <span className="text-[#08cb00]">ENCRYPTED</span>
      </div>

      {/* Database rows mockup */}
      <div className="flex-1 flex flex-col gap-1">
        {/* Row 1 */}
        <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
          <span className="text-white">ID_0428</span>
          <span className="text-emerald-400/80 bg-emerald-950/40 border border-emerald-800/30 px-1 rounded-[2px] text-[7px]">SECURE</span>
        </div>
        {/* Row 2 */}
        <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
          <span className="text-white">KEY_9801</span>
          <span className="text-emerald-400/80 bg-emerald-950/40 border border-emerald-800/30 px-1 rounded-[2px] text-[7px]">SECURE</span>
        </div>
        {/* Row 3 */}
        <motion.div
          animate={isHovered ? { opacity: [0.5, 1] } : {}}
          className="flex justify-between items-center"
        >
          <span className="text-gray-600">NEW_ENTRY</span>
          <span className="text-gray-600">PENDING</span>
        </motion.div>
      </div>
    </div>
  );
}
