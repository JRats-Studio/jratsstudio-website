"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProgressBarProps {
  className?: string;
  color?: string;
  height?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className = "",
  color = "#08cb00",
  height = "h-1",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-[999] origin-left ${height} ${className}`}
      style={{ backgroundColor: color }}
    >
      <motion.div
        style={{
          scaleX,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: color,
          transformOrigin: "0%",
        }}
      />
    </div>
  );
};
