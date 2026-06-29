"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface Designer {
  id: string;
  name: string;
  studio: string;
  image: string;
  awards: number;
  works: number;
  location: string;
}

interface DesignerDirectoryProps {
  designers: Designer[];
  accentColor?: string;
}

export const DesignerDirectory: React.FC<DesignerDirectoryProps> = ({
  designers,
  accentColor = "#08cb00",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div ref={elementRef} className="py-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {designers.map((designer) => (
          <motion.div
            key={designer.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all"
          >
            {/* Background image with overlay */}
            <div className="relative aspect-square overflow-hidden">
              <motion.img
                src={designer.image}
                alt={designer.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Stats overlay */}
              <motion.div
                className="absolute inset-0 flex items-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3 w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-300 font-mono uppercase">
                        Awards
                      </p>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: accentColor }}
                      >
                        {designer.awards}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300 font-mono uppercase">
                        Works
                      </p>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: accentColor }}
                      >
                        {designer.works}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{designer.name}</h3>
              <p className="text-sm text-gray-400 font-mono uppercase tracking-wide mb-3">
                {designer.studio}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <p className="text-xs text-gray-500 font-mono">
                  📍 {designer.location}
                </p>
                <motion.button
                  className="px-3 py-1 rounded-full text-xs font-bold text-black transition-all"
                  style={{ backgroundColor: accentColor }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Follow
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
