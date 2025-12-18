"use client";

import React, { useState, useEffect, useRef } from "react";

interface SectionLoaderProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export const SectionLoader = ({ 
  children, 
  className = "", 
  minHeight = "50vh" 
}: SectionLoaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Load content 200px before it appears
        threshold: 0.01,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full ${className}`}
      style={{ minHeight: !isVisible ? minHeight : "auto" }}
    >
      {isVisible ? children : <div className="w-full h-full" />}
    </div>
  );
};
