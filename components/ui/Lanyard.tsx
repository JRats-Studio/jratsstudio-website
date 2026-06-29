"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Lanyard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  // Glossy sheen coordinates
  const sheenX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to range [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* 3D Perspective container */}
      <div 
        style={{ perspective: 1000 }}
        className="relative flex flex-col items-center justify-center w-full max-w-[280px]"
      >
        {/* Lanyard Fabric Strap (Hanging behind) */}
        <div className="absolute top-[-100px] w-4 h-[120px] bg-gradient-to-b from-[#08cb00]/50 to-[#08cb00] rounded-t-full z-0 shadow-[0_0_15px_rgba(8,203,0,0.3)]" />
        
        {/* Metal Carabiner Clip */}
        <div className="absolute top-[-10px] w-6 h-8 border-2 border-gray-400 bg-gray-600 rounded-full z-10 flex items-center justify-center shadow-md">
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>

        {/* 3D Interactive Badge Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[240px] h-[360px] bg-[#000300] border-2 border-white/10 group-hover:border-[#08cb00]/50 rounded-[20px] flex flex-col justify-between p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_60px_-15px_rgba(8,203,0,0.15)] transition-shadow duration-500 z-20 cursor-grab active:cursor-grabbing overflow-hidden"
        >
          {/* Glossy Sheen Overlay */}
          <motion.div
            style={{
              background: `radial-gradient(circle 120px at ${sheenX} ${sheenY}, rgba(255, 255, 255, 0.08), transparent)`,
            }}
            className="absolute inset-0 pointer-events-none z-30"
          />

          {/* Top Header */}
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-mono text-[#08cb00] font-bold tracking-widest uppercase">
              JRat's Studio
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#08cb00] rounded-full animate-pulse" />
              <span className="w-1.5 h-1.5 bg-[#08cb00]/50 rounded-full" />
            </div>
          </div>

          {/* Holographic Chip and Photo Slot */}
          <div className="flex justify-between items-end mt-4 z-10">
            {/* Tech Chip */}
            <div className="w-9 h-7 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 rounded-md border border-yellow-800 shadow-inner flex flex-wrap p-1 gap-[2px]">
              <div className="w-2.5 h-[5px] border border-yellow-900/30" />
              <div className="w-2.5 h-[5px] border border-yellow-900/30" />
              <div className="w-2.5 h-[5px] border border-yellow-900/30" />
              <div className="w-2.5 h-[5px] border border-yellow-900/30" />
              <div className="w-2.5 h-[5px] border border-yellow-900/30" />
              <div className="w-2.5 h-[5px] border border-yellow-900/30" />
            </div>

            {/* Profile Avatar Frame */}
            <div className="w-16 h-16 border border-white/10 rounded-xl bg-white/[0.02] flex items-center justify-center text-3xl shadow-inner group-hover:border-[#08cb00]/30 transition-colors">
              👽
            </div>
          </div>

          {/* Identity Info */}
          <div className="flex flex-col gap-1 my-auto pt-4 z-10 font-mono">
            <h3 className="text-white text-base font-bold uppercase tracking-wider leading-none">
              SYSTEM OPERATOR
            </h3>
            <span className="text-[9px] text-[#08cb00] uppercase tracking-[0.2em] font-semibold">
              // DEPT_AI_ARCHITECT
            </span>
          </div>

          {/* Bottom Barcode and Specifications */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/10 z-10 font-mono">
            <div className="flex justify-between text-[8px] text-gray-500">
              <span>SERIAL: #8203-0</span>
              <span>DEP: AI_CORP</span>
            </div>
            
            {/* Holographic Barcode */}
            <div className="h-6 bg-gradient-to-r from-transparent via-[#08cb00]/25 to-transparent flex items-center justify-center opacity-85 select-none text-[8px] text-[#08cb00] tracking-[4px]">
              ||||| | ||| || |||
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}