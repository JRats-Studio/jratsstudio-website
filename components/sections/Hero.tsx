"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const ClientHeroMotion = dynamic(() => import('@/components/sections/ClientHeroMotion').then(mod => mod.ClientHeroMotion), { ssr: false, loading: () => <div className="relative w-full h-[50vw] sm:h-[45vw] md:h-[40vw] max-h-[500px] min-h-[200px] mb-4 sm:mb-6 md:mb-8" /> });

import { motion } from "framer-motion";
import DecryptedText from "@/components/effects/DecryptedText";

export const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent text-white pt-24 pb-16 sm:pb-24">
            <div className="absolute inset-0 bg-gradient-to-t from-[#000300] via-transparent to-transparent z-10 pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center my-auto">
                <div className="space-y-6 w-full flex flex-col items-center">
                    <ClientHeroMotion />
                    
                    {/* High-Tech Sub-headline & Call-To-Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                        className="flex flex-col items-center gap-4 text-center max-w-2xl px-4"
                    >
                        <h1 className="font-heading text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#08cb00] tracking-widest uppercase">
                            HUMAN SPARK FUSED WITH INTELLIGENT AUTOMATION.
                        </h1>
                        <DecryptedText
                            text="// WE BUILD BESPOKE DIGITAL BLUEPRINTS AND SMART COGNITIVE ENGINES THAT ELEVATE YOUR BRAND."
                            animateOn="mount"
                            speed={40}
                            maxIterations={25}
                            className="font-mono text-[#08cb00]/80 text-[10px] sm:text-xs uppercase tracking-[0.25em] max-w-lg leading-relaxed block"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
