"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver, useMousePosition } from "@/hooks";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";
import { ParticleSystem } from "@/components/effects/ParticleSystem";
import { Spotlight } from "@/components/effects/Spotlight";

interface EnhancedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
  backgroundElement?: React.ReactNode;
  accentColor?: string;
}

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({
  title,
  subtitle,
  description,
  cta,
  backgroundElement,
  accentColor = "#08cb00",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.3,
  });
  const mousePosition = useMousePosition();

  return (
    <section
      ref={elementRef}
      className="relative w-full min-h-screen overflow-hidden bg-black text-white flex items-center justify-center"
    >
      {/* Background particle system */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem
          particleCount={40}
          duration={6}
          color={accentColor}
          className="w-full h-full"
        />
        {backgroundElement && (
          <div className="absolute inset-0 z-0">
            {backgroundElement}
          </div>
        )}
      </div>

      {/* Spotlight effect */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Spotlight
          spotlightColor={accentColor}
          size={400}
          className="w-full h-full"
        >
          <div />
        </Spotlight>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-5 pointer-events-none" />

      {/* Content */}
      <motion.div
        ref={elementRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {subtitle && (
          <motion.div
            variants={staggerItem}
            className="mb-6 sm:mb-8"
          >
            <span
              className="text-sm sm:text-base tracking-widest uppercase font-mono"
              style={{ color: accentColor }}
            >
              {subtitle}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={staggerItem}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8"
        >
          <RevealText text={title} />
        </motion.h1>

        {description && (
          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {cta && (
          <motion.div variants={staggerItem} className="flex gap-4 justify-center">
            <motion.a
              href={cta.href}
              className="px-8 sm:px-10 py-3 sm:py-4 border-2 rounded-lg font-semibold transition-all"
              style={{
                borderColor: accentColor,
                color: accentColor,
              }}
              whileHover={{
                backgroundColor: accentColor,
                color: "#000000",
                boxShadow: `0 0 30px ${accentColor}`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {cta.text}
            </motion.a>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="text-sm text-gray-400">Scroll to explore</div>
          <svg
            className="w-6 h-6 mx-auto mt-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
