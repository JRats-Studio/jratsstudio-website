"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  score: number;
  author: string;
  description?: string;
  href?: string;
}

interface ProjectFilterProps {
  projects: ProjectItem[];
  accentColor?: string;
  columns?: number;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  projects,
  accentColor = "#08cb00",
  columns = 3,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { elementRef, isVisible } = useIntersectionObserver();

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div ref={elementRef} className="py-12">
      {/* Filter buttons */}
      <motion.div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest transition-all ${
              selectedCategory === category
                ? "text-black font-bold"
                : "text-gray-400 border border-white/20"
            }`}
            style={{
              backgroundColor:
                selectedCategory === category ? accentColor : "transparent",
              color: selectedCategory === category ? "#000" : "inherit",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}
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
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.a
              key={project.id}
              href={project.href || "#"}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer"
            >
              {/* Image */}
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Score badge */}
                <motion.div
                  className="self-start px-3 py-1 rounded-full text-sm font-bold text-black"
                  style={{ backgroundColor: accentColor }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {project.score.toFixed(1)}/10
                </motion.div>

                {/* Bottom info */}
                <div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-all"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <p className="text-xs font-mono uppercase text-gray-300 mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    {project.description && (
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-3 font-mono">
                      by {project.author}
                    </p>
                  </motion.div>

                  <motion.div
                    className="opacity-100 group-hover:opacity-0 transition-all"
                    initial={{ y: 0 }}
                    whileHover={{ y: -20 }}
                  >
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
