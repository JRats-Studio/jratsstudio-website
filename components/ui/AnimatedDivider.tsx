"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
  color?: string;
  animated?: boolean;
  height?: string;
}

export const AnimatedDivider: React.FC<AnimatedDividerProps> = ({
  className = "",
  color = "#08cb00",
  animated = true,
  height = "h-1",
}) => {
  return (
    <motion.div
      className={`w-full ${height} ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={animated ? { opacity: 1, scaleX: 1 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    />
  );
};
