"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface ProjectCardData {
  id: string;
  title: string;
  image: string;
  category: string;
  score: number;
  author: string;
  featured?: boolean;
}

interface CreativeGridProps {
  projects: ProjectCardData[];
  accentColor?: string;
}

export const CreativeGrid: React.FC<CreativeGridProps> = ({
  projects,
  accentColor = "#08cb00",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  // Alternate large and small cards for visual interest
  const getGridClass = (index: number) => {
    if (index === 0 || index === projects.length - 1) return "col-span-2 row-span-2";
    if (index % 3 === 1) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1";
  };

  return (
    <div ref={elementRef} className="py-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max"
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
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer h-64 md:h-80 ${getGridClass(
              index
            )}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{
              y: -10,
              boxShadow: `0 20px 40px ${accentColor}40`,
            }}
          >
            {/* Background image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Overlay gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity"
              initial={{ opacity: 0.3 }}
              whileHover={{ opacity: 0.85 }}
            />

            {/* Content */}
            <motion.div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
              {/* Top badge */}
              <motion.div
                className="flex gap-2 self-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-black uppercase tracking-wide"
                  style={{ backgroundColor: accentColor }}
                >
                  {project.score.toFixed(1)}/10
                </span>

                {project.featured && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-black uppercase tracking-wide"
                    style={{ backgroundColor: "#FFD700" }}
                  >
                    Featured
                  </span>
                )}
              </motion.div>

              {/* Bottom content */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-mono uppercase text-gray-300 tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-lg md:text-2xl font-bold leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  by {project.author}
                </p>
              </motion.div>
            </motion.div>

            {/* Animated border on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: `2px solid ${accentColor}`,
                opacity: 0,
              }}
              whileHover={{
                opacity: 1,
                boxShadow: `inset 0 0 20px ${accentColor}40`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
