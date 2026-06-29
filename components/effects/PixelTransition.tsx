"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  className?: string;
}

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "#08cb00",
  className = "",
}: PixelTransitionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const totalPixels = gridSize * gridSize;
  const pixels = Array.from({ length: totalPixels }, (_, i) => i);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden w-full h-full ${className}`}
    >
      {/* First Content (Default View) */}
      <div 
        className="w-full h-full transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      >
        {firstContent}
      </div>

      {/* Second Content (Revealed on Hover) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="pointer-events-auto w-full h-full">
          {secondContent}
        </div>
      </div>

      {/* Pixel Grid Wipe Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 grid" 
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {pixels.map((index) => {
          const col = index % gridSize;
          const row = Math.floor(index / gridSize);
          
          // Pseudo-random animation delay based on grid position
          const delay = (Math.sin(col * 2.5 + row * 3.5) + 1) * 0.15; 

          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{
                scale: isHovered ? [0, 1, 1, 0] : 0
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: isHovered ? delay : 0,
                times: [0, 0.4, 0.6, 1], // scales up, stays, scales down
              }}
              style={{
                backgroundColor: pixelColor,
                originX: 0.5,
                originY: 0.5,
              }}
              className="w-full h-full"
            />
          );
        })}
      </div>
    </div>
  );
}