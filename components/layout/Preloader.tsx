"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const diagnosticLogs = [
    "LOADING CORE ARCHITECTURE...",
    "INITIALIZING RENDER MODULES...",
    "ESTABLISHING HOST CONNECTION...",
    "COMPILING STYLES & SHADERS...",
    "INJECTING GENERATIVE MATRIX...",
    "ESTABLISHING SECURE PROTOCOLS...",
    "SYSTEM DEPLOYED // JRATS STUDIO ONLINE."
];

export const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [logIndex, setLogIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll during preloader
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        // Fast progress increment at first, then slightly slower near 100%
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        // Dismiss loader after loading is complete
                        document.body.style.overflow = "";
                        setIsLoading(false);
                    }, 200);
                    return 100;
                }
                const increment = prev < 70 ? Math.floor(Math.random() * 6) + 3 : Math.floor(Math.random() * 4) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 15);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        // Change diagnostic logs based on progress intervals
        const targetIndex = Math.min(
            Math.floor((progress / 100) * diagnosticLogs.length),
            diagnosticLogs.length - 1
        );
        if (targetIndex !== logIndex) {
            setLogIndex(targetIndex);
        }
    }, [progress, logIndex]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 bg-black z-[9999] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
                >
                    {/* Top Section: System Header */}
                    <div className="flex justify-between items-start font-mono text-[10px] sm:text-xs text-gray-500 tracking-[0.2em] uppercase">
                        <div>
                            JS_SYS_V2.4 // BOOTLOADER
                        </div>
                        <div>
                            STATUS: INITIALIZING
                        </div>
                    </div>

                    {/* Middle Section: Progress Count & Visual */}
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="relative flex items-center justify-center">
                            {/* Radial Glow behind Loader */}
                            <div className="absolute w-[200px] h-[200px] bg-[#08cb00]/5 rounded-full blur-[80px]" />
                            
                            {/* Large Monospace Counter */}
                            <motion.h1 
                                className="font-mono text-7xl sm:text-9xl md:text-[12rem] font-bold text-white tracking-tighter relative z-10"
                            >
                                {progress.toString().padStart(3, "0")}
                                <span className="text-xl sm:text-2xl md:text-3xl text-[#08cb00] font-light ml-2">%</span>
                            </motion.h1>
                        </div>
                    </div>

                    {/* Bottom Section: Logs & Diagnostic Feed */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 font-mono text-xs z-10">
                        {/* Diagnostic Log Feed */}
                        <div className="flex flex-col gap-1 max-w-md">
                            <span className="text-[10px] text-gray-600 tracking-wider">DIAGNOSTIC_FEED:</span>
                            <span className="text-[#08cb00] tracking-wider uppercase animate-pulse">
                                &gt; {diagnosticLogs[logIndex]}
                            </span>
                        </div>
                        
                        {/* Progress Bar Container */}
                        <div className="flex flex-col gap-2 w-full sm:w-64">
                            <div className="flex justify-between text-[10px] text-gray-500">
                                <span>SYS_BUFFER</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                                <motion.div 
                                    className="absolute left-0 top-0 bottom-0 bg-[#08cb00]" 
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
