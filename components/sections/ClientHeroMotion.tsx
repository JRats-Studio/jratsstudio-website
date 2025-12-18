"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const ClientHeroMotion = () => {
  return (
    <div className="relative w-full h-[50vw] sm:h-[45vw] md:h-[40vw] max-h-[500px] min-h-[200px] mb-4 sm:mb-6 md:mb-8">
      <motion.div
        initial={{ scale: 0.5, filter: "blur(20px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        className="relative w-full h-full"
      >
        <motion.div
          animate={{ y: [-15, 15, -15], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="size-full relative"
        >
          <Image
            src="/logo.webp"
            alt="Jrats Studio"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-center"
            priority
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
