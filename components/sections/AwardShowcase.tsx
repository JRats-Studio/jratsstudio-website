"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface AwardBadgeProps {
  score: number;
  maxScore?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const AwardBadge: React.FC<AwardBadgeProps> = ({
  score,
  maxScore = 10,
  label = "AWARD",
  size = "md",
}) => {
  const percentage = (score / maxScore) * 100;

  const sizeClasses = {
    sm: "w-16 h-16 text-xs",
    md: "w-24 h-24 text-sm",
    lg: "w-32 h-32 text-base",
  };

  const colors = {
    gold: "#FFD700",
    silver: "#C0C0C0",
    bronze: "#CD7F32",
    green: "#08cb00",
  };

  let badgeColor = colors.green;
  if (percentage >= 90) badgeColor = colors.gold;
  else if (percentage >= 75) badgeColor = colors.silver;
  else if (percentage >= 60) badgeColor = colors.bronze;

  return (
    <motion.div
      className={`relative rounded-full flex items-center justify-center flex-col ${sizeClasses[size]}`}
      style={{
        background: `conic-gradient(${badgeColor} 0deg ${
          percentage * 3.6
        }deg, rgba(255,255,255,0.1) ${percentage * 3.6}deg 360deg)`,
        border: `2px solid ${badgeColor}`,
        boxShadow: `0 0 30px ${badgeColor}40, inset 0 0 20px ${badgeColor}20`,
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: `0 0 50px ${badgeColor}, inset 0 0 30px ${badgeColor}40`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className="font-bold"
        style={{ color: badgeColor }}
      >
        {score.toFixed(1)}
      </span>
      <span className="text-[10px] font-mono text-gray-300 mt-1">{label}</span>
    </motion.div>
  );
};

export const PodiumDisplay: React.FC<{
  podium: { title: string; author: string; score: number }[];
  accentColor?: string;
}> = ({ podium = [], accentColor = "#08cb00" }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const heights = ["h-48", "h-64", "h-56"];

  return (
    <div ref={elementRef} className="flex items-flex-end gap-8 justify-center py-12">
      {podium.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            className={`relative w-32 ${heights[index]} bg-gradient-to-b from-white/5 to-black border-2 rounded-t-2xl flex items-center justify-center overflow-hidden group`}
            style={{ borderColor: index === 0 ? "#FFD700" : accentColor }}
            whileHover={{
              y: -10,
              boxShadow: `0 20px 40px ${accentColor}40`,
            }}
          >
            {/* Rank badge */}
            <motion.div
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center z-20"
              style={{
                backgroundColor:
                  index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
                color: "#000",
                boxShadow: `0 0 20px ${
                  index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32"
                }`,
              }}
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              #{index + 1}
            </motion.div>

            {/* Podium content */}
            <div className="text-center p-4">
              <h3 className="font-bold mb-2 text-sm">{item.title}</h3>
              <AwardBadge score={item.score} size="sm" />
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
              }}
            />
          </motion.div>

          {/* Author name */}
          <div className="mt-4 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              {item.author}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
