"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  accentColor?: string;
  className?: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  accentColor = "#08cb00",
  className = "",
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
  });

  return (
    <div
      ref={elementRef}
      className={`relative rounded-xl border border-white/10 overflow-hidden ${className}`}
    >
      {/* Tab buttons */}
      <div className="flex border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base relative transition-colors ${
              activeTab === index ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: accentColor }}
                layoutId="tab-indicator"
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 sm:p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};
