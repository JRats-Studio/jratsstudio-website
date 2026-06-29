"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  intensity = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if device supports motion
    setIsSupported(!window.matchMedia("(prefers-reduced-motion)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSupported || !ref.current) return;

    const element = ref.current;
    const elementRect = element.getBoundingClientRect();
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    const angleX =
      ((e.clientY - elementCenterY) / (elementRect.height / 2)) * (intensity * 5);
    const angleY =
      ((e.clientX - elementCenterX) / (elementRect.width / 2)) * (intensity * 5) *
      -1;

    rotateX.set(angleX);
    rotateY.set(angleY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const transform = useMotionTemplate`
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        mass: 1,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};
