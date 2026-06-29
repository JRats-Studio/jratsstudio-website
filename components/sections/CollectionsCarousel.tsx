"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  itemCount: number;
  followers: number;
  accentColor?: string;
}

interface CollectionsCarouselProps {
  collections: Collection[];
  accentColor?: string;
}

export const CollectionsCarousel: React.FC<CollectionsCarouselProps> = ({
  collections,
  accentColor = "#08cb00",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paginate = (direction: number) => {
    setCurrentIndex(
      (prev) => (prev + direction + collections.length) % collections.length
    );
  };

  const currentCollection = collections[currentIndex];
  const nextCollection = collections[(currentIndex + 1) % collections.length];
  const prevCollection = collections[(currentIndex - 1 + collections.length) % collections.length];

  return (
    <div className="relative py-12 overflow-hidden">
      {/* Main carousel */}
      <div className="perspective">
        <motion.div
          className="flex gap-6 px-4"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
        >
          {/* Previous card preview */}
          <motion.div
            className="hidden lg:block flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden opacity-50 cursor-pointer"
            onClick={() => paginate(-1)}
            whileHover={{ opacity: 0.7, scale: 0.95 }}
          >
            <img
              src={prevCollection.image}
              alt={prevCollection.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Current card (main) */}
          <div className="flex-shrink-0 w-full lg:w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative h-96 rounded-2xl overflow-hidden group"
              >
                <img
                  src={currentCollection.image}
                  alt={currentCollection.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Content */}
                <motion.div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Top badge */}
                  <motion.div className="self-start">
                    <span
                      className="px-4 py-2 rounded-full text-sm font-bold text-black uppercase tracking-widest"
                      style={{ backgroundColor: accentColor }}
                    >
                      Collection
                    </span>
                  </motion.div>

                  {/* Bottom content */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold leading-tight">
                      {currentCollection.title}
                    </h2>
                    <p className="text-lg text-gray-300">
                      {currentCollection.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8 pt-4">
                      <div>
                        <p className="text-xs font-mono uppercase text-gray-400">
                          Items
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: accentColor }}
                        >
                          {currentCollection.itemCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase text-gray-400">
                          Followers
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: accentColor }}
                        >
                          {currentCollection.followers}K
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      className="px-6 py-2 rounded-full font-bold text-black uppercase tracking-widest"
                      style={{ backgroundColor: accentColor }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Collection
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next card preview */}
          <motion.div
            className="hidden lg:block flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden opacity-50 cursor-pointer"
            onClick={() => paginate(1)}
            whileHover={{ opacity: 0.7, scale: 0.95 }}
          >
            <img
              src={nextCollection.image}
              alt={nextCollection.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          onClick={() => paginate(-1)}
          className="p-3 rounded-full"
          style={{
            backgroundColor: `${accentColor}20`,
            border: `2px solid ${accentColor}`,
            color: accentColor,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ← Previous
        </motion.button>

        {/* Indicators */}
        <div className="flex gap-2 items-center">
          {collections.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-2 h-2 rounded-full cursor-pointer"
              style={{
                backgroundColor:
                  index === currentIndex ? accentColor : "rgba(255,255,255,0.2)",
              }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => paginate(1)}
          className="p-3 rounded-full"
          style={{
            backgroundColor: `${accentColor}20`,
            border: `2px solid ${accentColor}`,
            color: accentColor,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
};
