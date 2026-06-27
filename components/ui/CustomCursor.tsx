"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  // Use MotionValues for 0-latency tracking (bypasses React state re-renders)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Apply a very tight spring for smoothness without the lag
  const springConfig = { damping: 25, stiffness: 800, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // We only hide the default cursor on larger screens where the custom cursor is visible
    if (window.innerWidth >= 640) {
        document.body.style.cursor = "none";
    }

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target") ||
        target.closest(".hover-target")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-[#08cb00] rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_15px_#08cb00] hidden sm:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 3 : 1,
        opacity: isHovering ? 0.4 : 1,
      }}
      transition={{ duration: 0.2 }}
    />
  );
};
