"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export const ClientHeroMotion = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create smooth spring values for the 3D rotation coordinates
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [12, -12]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-12, 12]), { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate cursor offset relative to the center of the viewport
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-[40vw] sm:h-[35vw] md:h-[25vw] max-h-[360px] min-h-[160px] mb-2 sm:mb-4 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, filter: "blur(20px)", opacity: 0, rotateX: 45, y: 50 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ perspective: 1000, rotateX, rotateY }}
        className="relative w-full h-full cursor-pointer group"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="size-full relative"
        >
          {/* Faint green backing glow behind the logo structure */}
          <div className="absolute inset-0 bg-[#08cb00]/5 rounded-full blur-[100px] scale-75 group-hover:bg-[#08cb00]/10 transition-all duration-700 pointer-events-none" />
          
          <Image
            src="/logo.webp"
            alt="Jrats Studio"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-center drop-shadow-[0_0_30px_rgba(8,203,0,0.15)] group-hover:drop-shadow-[0_0_50px_rgba(8,203,0,0.3)] transition-all duration-700"
            priority
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
