"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchColor?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "",
  glitchColor = "#08cb00",
}) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ lineHeight: 1.2 }}>
      {/* Original text */}
      <span className="relative z-10 block text-white">{text}</span>

      {/* Glitch effect 1 */}
      <motion.span
        className="absolute top-0 left-0 text-white pointer-events-none"
        animate={{
          x: [-2, 2, -2],
          y: [0, 0, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: Math.random() * 2 + 1,
        }}
        style={{
          color: glitchColor,
          opacity: 0.8,
          textShadow: `2px 0 ${glitchColor}`,
        }}
      >
        {text}
      </motion.span>

      {/* Glitch effect 2 */}
      <motion.span
        className="absolute top-0 left-0 text-white pointer-events-none"
        animate={{
          x: [2, -2, 2],
          y: [0, 0, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: Math.random() * 2 + 1,
        }}
        style={{
          color: glitchColor,
          opacity: 0.6,
          textShadow: `-2px 0 ${glitchColor}`,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};
