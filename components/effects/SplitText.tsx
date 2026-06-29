"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay between letters in ms
  duration?: number; // Duration of animation in seconds
}

export default function SplitText({
  text,
  className = "",
  delay = 20,
  duration = 0.5,
}: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  // once: false makes the trigger repeat every time it enters the viewport
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // This resets the animation state so it plays again when you scroll back
    setHasAnimated(isInView);
  }, [isInView]);

  return (
    <span 
      ref={containerRef} 
      className={`inline-block perspective-[500px] ${className}`}
      style={{ perspective: "500px" }} // Enables 3D space for children
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "middle" }}
        >
          <span
            className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom"
            style={{
              // 3D Flip + Slide + Opacity
              transform: hasAnimated 
                ? "translateY(0) rotateX(0deg)" 
                : "translateY(100%) rotateX(-75deg)",
              opacity: hasAnimated ? 1 : 0,
              transitionDuration: `${duration}s`,
              transitionDelay: `${index * delay}ms`,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}