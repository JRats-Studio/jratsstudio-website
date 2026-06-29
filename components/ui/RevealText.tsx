"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    margin: "-50px",
  });

  const words = text.split(" ");

  return (
    <div ref={elementRef} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: delay,
            },
          },
        }}
        className="flex flex-wrap gap-2"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
