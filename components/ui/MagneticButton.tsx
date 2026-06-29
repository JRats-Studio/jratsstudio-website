"use client";

import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";


interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = ref.current;
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    const distance = 100;
    const angle = Math.atan2(
      e.clientY - elementCenterY,
      e.clientX - elementCenterX
    );

    x.set(Math.cos(angle) * distance);
    y.set(Math.sin(angle) * distance);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{

        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 1,
      }}
      onClick={onClick}
      className={`relative px-6 py-3 rounded-lg font-semibold transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
