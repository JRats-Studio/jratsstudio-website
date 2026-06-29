"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useIntersectionObserver } from "@/hooks";

interface AnimatedGridProps {
  items: React.ReactNode[];
  columns?: number;
  gap?: string;
  className?: string;
  itemClassName?: string;
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  items,
  columns = 3,
  gap = "gap-4",
  className = "",
  itemClassName = "",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={elementRef}
      className={`grid grid-cols-${columns} ${gap} ${className}`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={staggerItem} className={itemClassName}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};
