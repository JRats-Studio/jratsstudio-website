"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  accentColor?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  accentColor = "#08cb00",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
  });

  return (
    <div ref={elementRef} className="relative py-12">
      <div className="max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, ${accentColor}40, transparent)`,
          }}
        />

        {/* Timeline items */}
        <div className="space-y-8 sm:space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.1,
                },
              }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex gap-6 sm:gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div
                  className="p-4 sm:p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  style={{
                    backgroundColor: `${accentColor}10`,
                  }}
                >
                  <span
                    className="text-sm font-mono font-bold"
                    style={{ color: accentColor }}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mt-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="flex items-center justify-center w-6 h-6 flex-shrink-0 relative z-10">
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 20px ${accentColor}`,
                  }}
                  whileInView={{
                    scale: [0, 1.2, 1],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                />
              </div>

              {/* Empty space for alignment */}
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
