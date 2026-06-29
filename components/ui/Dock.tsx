"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Cpu, Shield, Database, Home, Mail, Info, Terminal } from "lucide-react";

interface DockItem {
  icon: any;
  label: string;
  targetId: string;
}

const items: DockItem[] = [
  { icon: Home, label: "Home", targetId: "services" }, // Scroll to top/services
  { icon: Cpu, label: "Services", targetId: "services" },
  { icon: Info, label: "About", targetId: "about" },
  { icon: Database, label: "Projects", targetId: "projects" },
  { icon: Terminal, label: "Sandbox", targetId: "sandbox" },
  { icon: Mail, label: "Connect", targetId: "connect" },
];

export function Dock() {
  const mouseX = useMotionValue(Infinity);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo('#' + id, { offset: 0 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto hidden md:block"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 bg-white/[0.02] backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
      >
        {items.map((item, idx) => (
          <DockIcon key={idx} mouseX={mouseX} item={item} onClick={() => handleScroll(item.targetId)} />
        ))}
      </div>
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  item,
  onClick,
}: {
  mouseX: MotionValue;
  item: DockItem;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width/scale based on proximity to mouse cursor (macOS Dock zoom effect)
  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={onClick}
      className="relative flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 text-gray-400 hover:text-[#08cb00] hover:bg-[#08cb00]/10 hover:border-[#08cb00]/30 transition-colors duration-300 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] group hover-target"
    >
      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full mb-3 px-2 py-1 bg-black border border-white/10 rounded-md text-[10px] font-mono tracking-widest text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {item.label}
      </span>
    </motion.div>
  );
}
