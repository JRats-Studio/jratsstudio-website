"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = "",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={elementRef}
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex gap-6 pb-4"
        initial={{ x: 100, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
