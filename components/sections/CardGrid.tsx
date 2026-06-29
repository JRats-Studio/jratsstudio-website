"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface CardGridProps {
  cards: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    image?: string;
    href?: string;
  }[];
  columns?: number;
  accentColor?: string;
  animationDelay?: number;
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  columns = 3,
  accentColor = "#08cb00",
  animationDelay = 0.1,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={elementRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 sm:gap-8`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: animationDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          whileHover={{ y: -10, boxShadow: `0 20px 40px ${accentColor}20` }}
          className="group relative h-full overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          {/* Background image */}
          {card.image && (
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div
            className={`relative h-full p-6 sm:p-8 flex flex-col justify-between ${
              card.image ? "justify-end" : ""
            }`}
            style={{
              background: card.image
                ? undefined
                : `linear-gradient(135deg, ${accentColor}10 0%, transparent 100%)`,
            }}
          >
            {!card.image && card.icon && (
              <div className="mb-4 inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-transparent">
                <div style={{ color: accentColor }}>{card.icon}</div>
              </div>
            )}

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 line-clamp-3">
                {card.description}
              </p>
            </div>

            {/* Accent bar */}
            <div
              className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
              style={{ backgroundColor: accentColor }}
            />

            {/* Hover overlay */}
            {card.href && (
              <motion.a
                href={card.href}
                className="absolute inset-0 flex items-center justify-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                }}
                whileHover={{ scale: 1.05 }}
              >
                Learn More
              </motion.a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
