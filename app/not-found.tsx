"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Waves from "@/components/effects/Waves";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black flex flex-col selection:bg-[#08cb00] selection:text-black">
            {/* Transparent Navbar */}
            <div className="w-full bg-black/70 backdrop-blur-sm">
                <Navbar />
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-[80vh]">
                {/* Background Waves */}
                <Waves
                    lineColor="#08cb00"
                    backgroundColor="transparent"
                    waveSpeedX={0.03}
                    waveSpeedY={0.015}
                    waveAmpX={50}
                    waveAmpY={25}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                    className="z-0 opacity-40 absolute inset-0 pointer-events-none"
                />

                {/* Subtle Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,203,0,0.05)_0%,transparent_50%)] z-0 pointer-events-none"></div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    {/* Floating Error Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-6 flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="font-mono text-red-500 text-xs tracking-[0.2em] uppercase">
                            SYSTEM_CRITICAL_FAILURE
                        </span>
                    </motion.div>

                    {/* Massive 404 Typography */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[25vw] sm:text-[20vw] font-heading leading-none text-white tracking-tighter mix-blend-difference relative group"
                    >
                        {/* Static 404 */}
                        404

                        {/* Glitch Overlay Effect */}
                        <span className="absolute top-0 left-0 -ml-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-pulse text-red-500 mix-blend-screen pointer-events-none">
                            404
                        </span>
                        <span className="absolute top-0 left-0 ml-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-pulse text-[#08cb00] mix-blend-screen pointer-events-none" style={{ animationDelay: '0.1s' }}>
                            404
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="font-mono text-gray-400 text-sm sm:text-base md:text-lg tracking-widest uppercase mt-4 mb-12 max-w-xl"
                    >
                        The architecture you are looking for has been deprecated or relocated.
                    </motion.h2>

                    {/* Return Home Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <MagneticButton>
                            <Link 
                                href="/"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#08cb00] text-black font-mono text-sm tracking-[0.2em] uppercase overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    INITIATE_REBOOT
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </span>
                                
                                {/* Hover Gradient Fill */}
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

            {/* Transparent Footer */}
            <div className="w-full bg-black/70 backdrop-blur-sm">
                <Footer />
            </div>
        </main>
    );
}
