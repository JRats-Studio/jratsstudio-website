"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "@/hooks";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offset?: [number, number];
  speed?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = "",
  offset = [0, 500],
  speed = 0.5,
}) => {
  const { elementRef, transform } = useParallax({
    offset,
    speed,
    direction: "up",
  });

  return (
    <motion.div
      ref={elementRef}
      style={{ y: transform } as any}
      className={className}
    >
      {children}
    </motion.div>
  );
};
