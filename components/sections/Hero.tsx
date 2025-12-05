"use client";

import { motion } from "framer-motion";
import { GridScan } from "@/components/effects/GridScan";
import Image from "next/image";

export const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent text-white">
            <div className="absolute inset-0 size-full z-0">
                <GridScan
                    className="size-full"
                    linesColor="#253900"
                    scanColor="#08cb00"
                    lineThickness={1}
                    gridScale={0.1}
                    scanOpacity={0.6}
                    enablePost={true}
                    bloomIntensity={0.6}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center h-full">
                <div className="space-y-4 w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                        className="relative w-full h-[50vw] sm:h-[45vw] md:h-[40vw] max-h-[500px] min-h-[200px] mb-4 sm:mb-6 md:mb-8"
                    >
                        <motion.div
                            animate={{ y: [-15, 15, -15], scale: [1, 1.02, 1] }} // Added subtle breathing scale
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="size-full relative"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Jrats Studio"
                                fill
                                className="object-contain object-center"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
