"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: string;
}

interface FeatureGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  accentColor?: string;
  columns?: number;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  subtitle,
  features,
  accentColor = "#08cb00",
  columns = 3,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
  });

  return (
    <section ref={elementRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {subtitle && (
            <motion.p
              variants={staggerItem}
              className="text-sm sm:text-base tracking-widest uppercase font-mono mb-4"
              style={{ color: accentColor }}
            >
              {subtitle}
            </motion.p>
          )}
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 sm:gap-8 md:gap-10`}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group relative p-6 sm:p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10"
              whileHover={{
                y: -5,
                boxShadow: `0 0 30px ${accentColor}30`,
              }}
            >
              {/* Icon */}
              <div
                className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Accent line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
