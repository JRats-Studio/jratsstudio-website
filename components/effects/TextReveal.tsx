"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ text, className = "", delay = 0 }: TextRevealProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-1">
                    <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: delay + index * 0.03,
                            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a snapping, premium ease
                        }}
                        className="inline-block"
                    >
                        {word === "" ? "\u00A0" : word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};
