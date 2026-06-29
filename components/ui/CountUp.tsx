"use client";

import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Create a motion value we can transform into an integer counter.
  // If motion types aren't used elsewhere, the component still renders via `isVisible`.
  const progress = useMotionValue(isVisible ? 0 : 1);
  useTransform(progress, (latest: number) => {

    if (!isVisible) return from;
    return Math.round(from + (to - from) * (1 - latest));
  });



  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {}, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  return (
    <motion.div ref={elementRef} className={className}>
      <motion.div
        animate={isVisible ? { opacity: 1 } : { opacity: 0.5 }}
        transition={{ duration: duration }}
      >
        {prefix}
        {isVisible ? (
          <motion.span
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration }}
          >
            {to}
          </motion.span>
        ) : (
          <span>{from}</span>
        )}
        {suffix}
      </motion.div>
    </motion.div>
  );
};
