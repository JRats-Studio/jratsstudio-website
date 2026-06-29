"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CinematicTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "reveal" | "typewriter" | "glitch";
}

export const CinematicText = ({
  text,
  className = "",
  delay = 0,
  type = "reveal",
}: CinematicTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (type === "typewriter" && isVisible) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, text, type]);

  if (type === "typewriter") {
    return (
      <div ref={containerRef} className={className}>
        <span className="relative">
          {displayText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute -right-2 top-0 h-full w-0.5 bg-[#08cb00]"
            />
          )}
        </span>
      </div>
    );
  }

  if (type === "glitch") {
    return (
      <div ref={containerRef} className={className}>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay }}
          className="relative inline-block"
        >
          {text}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 0.3, delay: delay + 0.2, repeat: 2 }}
            className="absolute inset-0 text-[#08cb00] mix-blend-screen"
            style={{ transform: "translate(2px, -2px)" }}
          >
            {text}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 0.3, delay: delay + 0.4, repeat: 2 }}
            className="absolute inset-0 text-[#00ff88] mix-blend-screen"
            style={{ transform: "translate(-2px, 2px)" }}
          >
            {text}
          </motion.span>
        </motion.span>
      </div>
    );
  }

  // Reveal type
  const words = text.split(" ");
  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default CinematicText;