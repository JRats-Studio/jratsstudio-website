import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: [number, number];
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const elementRef = useRef(null);
  const { scrollY } = useScroll();

  const { offset = [0, 500], speed = 1, direction = "up" } = options;

  let transform: MotionValue<number>;

  if (direction === "up" || direction === "down") {
    const multiplier = direction === "down" ? 1 : -1;
    transform = useTransform(
      scrollY,
      [offset[0], offset[1]],
      [0, multiplier * speed * 100]
    );
  } else {
    const multiplier = direction === "right" ? 1 : -1;
    transform = useTransform(
      scrollY,
      [offset[0], offset[1]],
      [0, multiplier * speed * 100]
    );
  }

  return { elementRef, transform, direction };
};
