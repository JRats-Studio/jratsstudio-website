"use client";

import React, { useEffect, useRef, useState } from "react";

interface SpotlightProps {
  spotlightColor?: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export const Spotlight = ({
  spotlightColor = "#08cb00",
  size = 400,
  className = "",
  children,
}: SpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleLeave = () => setPos(null);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos ? 1 : 0,
          background: pos
            ? `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}22, transparent 70%)`
            : undefined,
        }}
      />
      {children}
    </div>
  );
};

export default Spotlight;
