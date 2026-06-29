"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  accentColor?: string;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className = "",
  accentColor = "#08cb00",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <div className="flex flex-wrap gap-3">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = (index + 1) / words.length;

          const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
          const y = useTransform(scrollYProgress, [start, end], [50, 0]);

          return (
            <motion.span
              key={index}
              style={{ opacity, y }}
              className="inline-block"
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};
