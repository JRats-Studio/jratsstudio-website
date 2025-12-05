"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LaserFlow from "@/components/effects/LaserFlow";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [verticalSizing, setVerticalSizing] = useState(2.0);

    useEffect(() => {
        // Calculate vertical sizing based on screen height
        // The beam should take 90% of the screen (10% space at bottom)
        const calculateSizing = () => {
            const height = window.innerHeight;
            // Base sizing of 2.0 works well at ~800px height
            // Scale proportionally for different heights
            const baseSizing = (height / 400) * 0.9; // 0.9 = 90% of screen
            setVerticalSizing(Math.max(1.5, Math.min(baseSizing, 4.0))); // Clamp between 1.5 and 4.0
        };

        calculateSizing();
        window.addEventListener("resize", calculateSizing);

        // Lock scroll and ensure at top during preloader
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            document.body.style.overflow = "";
            window.scrollTo(0, 0); // Ensure user is at hero section
            setIsLoading(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", calculateSizing);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <LaserFlow
                        color="#08cb00"
                        flowSpeed={0.5}
                        wispIntensity={1.5}
                        horizontalBeamOffset={0}
                        verticalBeamOffset={-0.05} // Slight offset to leave 10% at bottom
                        verticalSizing={verticalSizing}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
