"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface DecryptedSplitTextProps {
  text: string;
  className?: string;
  charDelay?: number; // Delay between characters in ms
  scrambleDuration?: number; // How long each character scrambles in ms
}

const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";

// Sub-component for each individual letter
function AnimatedChar({
  char,
  delay,
  scrambleDuration,
  triggerReveal,
}: {
  char: string;
  delay: number;
  scrambleDuration: number;
  triggerReveal: boolean;
}) {
  const [displayChar, setDisplayChar] = useState(char);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!triggerReveal) {
      // Reset state when scrolled out of view
      setDisplayChar(char);
      setIsRevealed(false);
      return;
    }

    if (char === " ") {
      setIsRevealed(true);
      return;
    }

    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      // Start scrambling
      let elapsed = 0;
      intervalId = setInterval(() => {
        setDisplayChar(symbols[Math.floor(Math.random() * symbols.length)]);
        elapsed += 40;
        
        if (elapsed >= scrambleDuration) {
          clearInterval(intervalId);
          setDisplayChar(char);
          setIsRevealed(true);
        }
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [triggerReveal, char, delay, scrambleDuration]);

  return (
    <span
      className="inline-block overflow-hidden"
      style={{ verticalAlign: "middle" }}
    >
      <span
        className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: isRevealed ? "translateY(0) scale(1)" : "translateY(30px) scale(0.8)",
          filter: isRevealed ? "blur(0px)" : "blur(8px)",
          opacity: isRevealed ? 1 : 0,
          color: isRevealed ? "inherit" : "#08cb00", // Turns from matrix green to base color
          whiteSpace: char === " " ? "pre" : "normal",
        }}
      >
        {displayChar}
      </span>
    </span>
  );
}

export default function DecryptedSplitText({
  text,
  className = "",
  charDelay = 25,
  scrambleDuration = 250,
}: DecryptedSplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  // once: false means the animation resets every time it goes off-screen!
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <AnimatedChar
          key={index}
          char={char}
          delay={index * charDelay}
          scrambleDuration={scrambleDuration}
          triggerReveal={isInView}
        />
      ))}
    </span>
  );
}