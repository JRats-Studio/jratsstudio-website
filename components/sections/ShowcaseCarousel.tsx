"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface ShowcaseItem {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  tags: string[];
}

interface ShowcaseCarouselProps {
  items: ShowcaseItem[];
  accentColor?: string;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({
  items,
  accentColor = "#08cb00",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { elementRef, isVisible } = useIntersectionObserver();

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div ref={elementRef} className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image carousel */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={currentItem.image}
              alt={currentItem.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Navigation dots */}
          <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="w-2 h-2 rounded-full cursor-pointer transition-all"
                style={{
                  backgroundColor:
                    index === currentIndex ? accentColor : "rgba(255,255,255,0.2)",
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </motion.div>

          {/* Navigation arrows */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full"
            style={{
              backgroundColor: `${accentColor}20`,
              border: `2px solid ${accentColor}`,
              color: accentColor,
            }}
            whileHover={{
              backgroundColor: `${accentColor}40`,
              scale: 1.1,
            }}
          >
            ←
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full"
            style={{
              backgroundColor: `${accentColor}20`,
              border: `2px solid ${accentColor}`,
              color: accentColor,
            }}
            whileHover={{
              backgroundColor: `${accentColor}40`,
              scale: 1.1,
            }}
          >
            →
          </motion.button>
        </div>

        {/* Right: Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Author */}
            <motion.p
              className="text-sm font-mono uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              By {currentItem.author}
            </motion.p>

            {/* Title */}
            <motion.h2 className="text-5xl font-bold leading-tight">
              {currentItem.title}
            </motion.h2>

            {/* Description */}
            <motion.p className="text-lg text-gray-300 leading-relaxed">
              {currentItem.description}
            </motion.p>

            {/* Tags */}
            <motion.div className="flex flex-wrap gap-2">
              {currentItem.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-mono uppercase tracking-wide"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Counter */}
            <motion.div className="flex items-center gap-4 pt-4">
              <p className="text-sm text-gray-400 font-mono">
                {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <motion.div
                className="flex-1 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="carousel-progress"
                  animate={{
                    width: `${((currentIndex + 1) / items.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
