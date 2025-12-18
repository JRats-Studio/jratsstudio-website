"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LaserFlow = dynamic(() => import("@/components/effects/LaserFlow"), { 
    ssr: false,
    loading: () => null 
});

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [verticalSizing, setVerticalSizing] = useState(2.0);
    const [showEffects, setShowEffects] = useState(false);

    useEffect(() => {
        // Defer heavy WebGL initialization to allow React hydration to complete first
        // This reduces main thread blocking during critical rendering period
        const rafId = requestAnimationFrame(() => {
            const initTimer = setTimeout(() => {
                setShowEffects(true);
            }, 50);
            // Store cleanup for the inner timeout
            return () => clearTimeout(initTimer);
        });


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

        const handleLoad = () => {
            // Dismiss preloader
            document.body.style.overflow = "";
            window.scrollTo(0, 0);
            setIsLoading(false);
        };

        // User requested fixed 2.5s duration
        const timer = setTimeout(() => {
            handleLoad();
        }, 3000);

        return () => {
            cancelAnimationFrame(rafId);
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
                    {showEffects && (
                        <LaserFlow
                            color="#08cb00"
                            flowSpeed={0.5}
                            wispIntensity={1.5}
                            horizontalBeamOffset={0}
                            verticalBeamOffset={-0.05} // Slight offset to leave 10% at bottom
                            verticalSizing={verticalSizing}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
