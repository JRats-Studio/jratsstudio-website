"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  stat?: string;
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  accentColor?: string;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  events,
  accentColor = "#08cb00",
}) => {
  const [activeEvent, setActiveEvent] = React.useState(0);

  return (
    <div className="py-12">
      {/* Timeline */}
      <div className="relative mb-12">
        {/* Horizontal line */}
        <div
          className="h-1 rounded-full"
          style={{
            background: `linear-gradient(to right, ${accentColor}20, ${accentColor}, ${accentColor}20)`,
          }}
        />

        {/* Events */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          {events.map((event, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveEvent(index)}
              className="relative w-8 h-8 rounded-full transition-all flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: index === activeEvent ? accentColor : "rgba(255,255,255,0.1)",
                border: `2px solid ${accentColor}`,
              }}
              whileHover={{
                scale: 1.3,
                boxShadow: `0 0 20px ${accentColor}`,
              }}
              whileTap={{ scale: 0.9 }}
            >
              {index === activeEvent && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-black"
                  layoutId="active-dot"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="flex justify-between items-start gap-12 mt-20">
        {/* Left: Years list */}
        <div className="w-full md:w-1/3 space-y-4">
          {events.map((event, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveEvent(index)}
              className="w-full text-left p-4 rounded-lg transition-all"
              style={{
                backgroundColor: index === activeEvent ? `${accentColor}15` : "transparent",
                borderLeft: `4px solid ${index === activeEvent ? accentColor : "transparent"}`,
              }}
              whileHover={{
                backgroundColor: `${accentColor}10`,
                x: 10,
              }}
            >
              <p
                className="text-lg font-bold"
                style={{
                  color: index === activeEvent ? accentColor : "inherit",
                }}
              >
                {event.year}
              </p>
              <p className="text-sm text-gray-400">{event.title}</p>
            </motion.button>
          ))}
        </div>

        {/* Right: Active event details */}
        <div className="w-full md:w-2/3 md:pl-8">
          {events[activeEvent] && (
            <motion.div
              key={activeEvent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <motion.p
                  className="text-sm font-mono uppercase tracking-widest mb-2"
                  style={{ color: accentColor }}
                >
                  Year {events[activeEvent].year}
                </motion.p>
                <motion.h3 className="text-4xl font-bold mb-4">
                  {events[activeEvent].title}
                </motion.h3>
                <motion.p className="text-lg text-gray-300 leading-relaxed">
                  {events[activeEvent].description}
                </motion.p>
              </div>

              {events[activeEvent].stat && (
                <motion.div
                  className="p-6 rounded-lg border border-white/10 mt-8"
                  style={{ borderColor: `${accentColor}40` }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-gray-400 font-mono uppercase mb-2">
                    Key Metric
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: accentColor }}
                  >
                    {events[activeEvent].stat}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
