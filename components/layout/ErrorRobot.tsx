"use client";

import { motion } from "framer-motion";

export const ErrorRobot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, rotate: [0, -2, 2, -2, 2, 0] }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 backdrop-blur-sm rounded-full"
    >
      {/* Robot head */}
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 bg-red-500 rounded-full" />
        <div className="absolute inset-1 bg-black rounded-full" />
        {/* Eyes */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
      </div>
      <span className="font-mono text-xs text-red-500 tracking-wider uppercase">
        SYSTEM_CRITICAL_FAILURE
      </span>
    </motion.div>
  );
};
