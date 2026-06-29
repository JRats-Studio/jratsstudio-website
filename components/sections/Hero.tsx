// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// const ClientHeroMotion = dynamic(() => import('@/components/sections/ClientHeroMotion').then(mod => mod.ClientHeroMotion), { ssr: false, loading: () => <div className="relative w-full h-[50vw] sm:h-[45vw] md:h-[40vw] max-h-[500px] min-h-[200px] mb-4 sm:mb-6 md:mb-8" /> });

// const GridScan = dynamic(() => import("@/components/effects/GridScan").then(mod => mod.GridScan), {
//     ssr: false,
//     loading: () => <div className="size-full bg-transparent" />,
// });

// export const Hero = () => {
//     const [showGrid, setShowGrid] = useState(false);

//     useEffect(() => {
//         // Delay heavy WebGL init until after preloader (2.5s)
//         const timer = setTimeout(() => {
//             setShowGrid(true);
//         }, 3000);
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent text-white">
//             <div className="absolute inset-0 size-full z-0">
//                 {showGrid && (
//                     <GridScan
//                         className="size-full"
//                         linesColor="#253900"
//                         scanColor="#08cb00"
//                         lineThickness={1}
//                         gridScale={0.1}
//                         scanOpacity={0.6}
//                         enablePost={false} // Optimized for TBT: Shader glow is sufficient
//                         bloomIntensity={0.6}
//                     />
//                 )}
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

//             <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center h-full">
//                 <div className="space-y-4 w-full flex flex-col items-center">
//                     <ClientHeroMotion />

//                 </div>
//             </div>
//         </section>
//     );
// };
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";

const GridScan = dynamic(
  () => import("@/components/effects/GridScan").then((mod) => mod.GridScan),
  { ssr: false }
);

import { useCreativeEffects } from "@/components/layout/CreativeEffectsController";

export const Hero = () => {
  const { heroGridEnabled } = useCreativeEffects();
  const [showGrid, setShowGrid] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setShowGrid(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {showGrid && heroGridEnabled && (
          <GridScan
            className="size-full"
            linesColor="#1a3a00"        // Dark green for subtle lines
            scanColor="#08cb00"         // Bright green scan pulse
            lineThickness={1}         // Thinner for elegance
            gridScale={0.1}            // Finer grid
            scanOpacity={0.8}           // Subtle scan
            enablePost={false}
            bloomIntensity={0.8}        // Soft glow
            scanGlow={0.5}
            scanSoftness={2}
            scanDuration={4}            // Slower, more graceful
            scanDelay={3}
            lineStyle="solid"
            lineJitter={0.09}           // Minimal jitter for organic feel
            noiseIntensity={0.09}      // Very slight noise
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />

      <div className="relative z-20 w-full max-w-7xl px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center h-full text-center">
        <motion.div
        initial={{ scale: 1, filter: "blur(20px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ y: [-15, 15, -15], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full flex flex-col items-center"
        >
          <div className="relative w-full max-w-3xl h-48 sm:h-72 md:h-96 lg:h-[600px] mx-auto">
            <Image
              src="/logo.svg"
              alt="JRATS STUDIO"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="pt-8"
          >
            <span className="text-[#08cb00]/50 font-mono text-xs tracking-[0.2em]">SCROLL</span>
          </motion.div> */}
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};