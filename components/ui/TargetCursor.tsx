"use client";

import { useEffect, useState } from "react";

export default function TargetCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Easing trail effect for the target sights
  useEffect(() => {
    let animationId: number;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15, // Easing speed
          y: prev.y + dy * 0.15,
        };
      });
      animationId = requestAnimationFrame(updateTrail);
    };
    updateTrail();

    return () => cancelAnimationFrame(animationId);
  }, [position]);

  return (
    <>
      {/* Outer Tracking Target Sights */}
      <div
        className="fixed w-8 h-8 border border-[#08cb00]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out hidden md:block"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      >
        <div className="absolute top-1/2 left-0 w-1.5 h-[1px] bg-[#08cb00] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-1.5 h-[1px] bg-[#08cb00] -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-[1px] h-1.5 bg-[#08cb00] -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-[1px] h-1.5 bg-[#08cb00] -translate-x-1/2" />
      </div>

      {/* Inner Dot Center */}
      <div
        className="fixed w-1.5 h-1.5 bg-[#08cb00] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}