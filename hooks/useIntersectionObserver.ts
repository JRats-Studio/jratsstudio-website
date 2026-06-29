import { useEffect, useRef, useState } from "react";

interface IntersectionOptions {
  threshold?: number | number[];
  margin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (options: IntersectionOptions = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const { threshold = 0.1, margin = "0px", triggerOnce = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasTriggered(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin: margin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, margin, triggerOnce]);

  return { elementRef, isVisible, hasTriggered };
};
