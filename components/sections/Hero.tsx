"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const ClientHeroMotion = dynamic(() => import('@/components/sections/ClientHeroMotion').then(mod => mod.ClientHeroMotion), { ssr: false, loading: () => <div className="relative w-full h-[50vw] sm:h-[45vw] md:h-[40vw] max-h-[500px] min-h-[200px] mb-4 sm:mb-6 md:mb-8" /> });

const GridScan = dynamic(() => import("@/components/effects/GridScan").then(mod => mod.GridScan), {
    ssr: false,
    loading: () => <div className="size-full bg-transparent" />,
});

export const Hero = () => {
    const [showGrid, setShowGrid] = useState(false);

    useEffect(() => {
        // Delay heavy WebGL init until after preloader (2.5s)
        const timer = setTimeout(() => {
            setShowGrid(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent text-white">
            <div className="absolute inset-0 size-full z-0">
                {showGrid && (
                    <GridScan
                        className="size-full"
                        linesColor="#253900"
                        scanColor="#08cb00"
                        lineThickness={1}
                        gridScale={0.1}
                        scanOpacity={0.6}
                        enablePost={false} // Optimized for TBT: Shader glow is sufficient
                        bloomIntensity={0.6}
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center h-full">
                <div className="space-y-4 w-full flex flex-col items-center">
                    <ClientHeroMotion />

                </div>
            </div>
        </section>
    );
};
