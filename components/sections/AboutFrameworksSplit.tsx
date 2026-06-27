"use client";

import LogoLoop from '@/components/display/LogoLoop';
import Waves from '@/components/effects/Waves';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiOpenai, SiPython, SiNodedotjs, SiGraphql, SiMongodb, SiPostgresql } from 'react-icons/si';
import { motion } from "framer-motion";

import { TextReveal } from '@/components/effects/TextReveal';

const baseLogoClass = "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 transition-all duration-300 hover:scale-110";

const techLogos = [
    { node: <SiReact className={`${baseLogoClass} hover:text-[#61DAFB] hover:drop-shadow-[0_0_15px_rgba(97,218,251,0.5)]`} />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className={`${baseLogoClass} hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className={`${baseLogoClass} hover:text-[#3178C6] hover:drop-shadow-[0_0_15px_rgba(49,120,198,0.5)]`} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className={`${baseLogoClass} hover:text-[#06B6D4] hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]`} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiOpenai className={`${baseLogoClass} hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />, title: "OpenAI", href: "https://openai.com" },
    { node: <SiPython className={`${baseLogoClass} hover:text-[#3776AB] hover:drop-shadow-[0_0_15px_rgba(55,118,171,0.5)]`} />, title: "Python", href: "https://www.python.org" },
    { node: <SiNodedotjs className={`${baseLogoClass} hover:text-[#339933] hover:drop-shadow-[0_0_15px_rgba(51,153,51,0.5)]`} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiGraphql className={`${baseLogoClass} hover:text-[#E10098] hover:drop-shadow-[0_0_15px_rgba(225,0,152,0.5)]`} />, title: "GraphQL", href: "https://graphql.org" },
    { node: <SiMongodb className={`${baseLogoClass} hover:text-[#47A248] hover:drop-shadow-[0_0_15px_rgba(71,162,72,0.5)]`} />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPostgresql className={`${baseLogoClass} hover:text-[#4169E1] hover:drop-shadow-[0_0_15px_rgba(65,105,225,0.5)]`} />, title: "PostgreSQL", href: "https://www.postgresql.org" },
];

export const AboutFrameworksSplit = () => {
    return (
        <section id="about" className="bg-transparent relative overflow-hidden">            {/* Waves Background */}
            <Waves
                lineColor="#08cb00"
                backgroundColor="transparent"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
                className="z-0 opacity-30"
            />

            <div className="relative z-10">
                {/* Tech Stack + Logo Loop */}
                <div className="bg-black/80 relative z-20 py-8 sm:py-10 md:py-12 border-t border-b border-white/5">
                    <p className="font-heading text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-center mb-6 sm:mb-8">
                        <TextReveal text="POWERED BY" />
                    </p>
                    <LogoLoop
                        logos={techLogos}
                        speed={50}
                        direction="left"
                        logoHeight={40}
                        gap={40}
                        scaleOnHover
                        pauseOnHover
                        fadeOut
                        fadeOutColor="#000000"
                    />
                </div>

                {/* About Us Card (centered) */}
                <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[1000px] mx-auto bg-black/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#08cb00]/50 hover:shadow-[0_0_30px_rgba(8,203,0,0.15)] transition-all duration-500 p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden"
                    >
                        {/* Background Gradients */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] bg-[#08cb00]/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px] pointer-events-none" />

                        <div className="relative z-10 max-w-3xl">
                            <motion.h4
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="font-mono text-[#08cb00] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6"
                            >
                                / WHO WE ARE
                            </motion.h4>

                            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white uppercase leading-none mb-4 sm:mb-6 md:mb-8">
                                <TextReveal text="Hackers of the" /><br />
                                <span className="text-[#08cb00]"><TextReveal text="Humdrum." delay={0.2} /></span>
                            </h2>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed"
                            >
                                <p>
                                    We build digital products that stir emotions and drive results. In an era where AI threatens to flatten creativity into sameness, we ensure the human spark stays at the center of everything we create.
                                </p>
                                <p>
                                    Our approach is simple: automate the repetitive, amplify the creative. We leverage cutting-edge AI and modern technology stacks not to replace human insight, but to free it. Every solution we deliver is crafted with precision, purpose, and an obsessive attention to what makes technology feel alive.
                                </p>
                                <p>
                                    No templates. No shortcuts. Just intentional, human-powered innovation fused with intelligent automation.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
