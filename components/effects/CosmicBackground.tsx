"use client";

import React from "react";
import { motion } from "framer-motion";

export function CosmicBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-50 bg-[#000300] overflow-hidden">
      {/* 1. Starry Space Backdrop (Soft, tiny glowing dots) */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: "96px 96px",
          backgroundPosition: "24px 24px",
        }}
      />

      {/* 2. Ambient Aurora Glow Blobs (Framer Motion driven) */}
      
      {/* Neon Green Glow Blob (Top-Right) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] bg-[#08cb00]/8 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Deep Forest Green Glow Blob (Center-Left) */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] bg-[#053b00]/12 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Emerald Glow Blob (Bottom-Right) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] min-w-[320px] min-h-[320px] bg-[#00f5a0]/6 rounded-full blur-[90px] pointer-events-none"
      />
    </div>
  );
}
