"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  revealDirection?: "start" | "end" | "center";
  enableHoverEffect?: boolean;
  animateOn?: "view" | "hover" | "mount";
  className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 15,
  revealDirection = "start",
  enableHoverEffect = true,
  animateOn = "hover",
  className = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            let shouldReveal = false;
            const progress = iteration / maxIterations;

            if (revealDirection === "start") {
              shouldReveal = index / text.length < progress;
            } else if (revealDirection === "end") {
              shouldReveal = 1 - index / text.length < progress;
            } else {
              const center = text.length / 2;
              const distFromCenter = Math.abs(index - center);
              shouldReveal = 1 - distFromCenter / center < progress;
            }

            if (shouldReveal) return char;
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "mount") {
      startAnimation();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (animateOn === "hover" && enableHoverEffect) {
      startAnimation();
    }
  };

  return (
    <span onMouseEnter={handleMouseEnter} className={className}>
      {displayText}
    </span>
  );
}