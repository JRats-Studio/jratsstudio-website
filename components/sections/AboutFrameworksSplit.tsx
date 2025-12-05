"use client";

import LogoLoop from '@/components/display/LogoLoop';
import Waves from '@/components/effects/Waves';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiOpenai, SiPython, SiNodedotjs, SiGraphql, SiMongodb, SiPostgresql } from 'react-icons/si';
import { motion } from "framer-motion";

const techLogos = [
    { node: <SiReact className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiOpenai className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "OpenAI", href: "https://openai.com" },
    { node: <SiPython className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "Python", href: "https://www.python.org" },
    { node: <SiNodedotjs className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiGraphql className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "GraphQL", href: "https://graphql.org" },
    { node: <SiMongodb className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPostgresql className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
];

export const AboutFrameworksSplit = () => {
    return (
        <section className="bg-black relative overflow-hidden">
            {/* Waves Background */}
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
                {/* Powered By + Logo Loop (vertical stack, black strip) */}
                <div className="bg-black relative z-20 py-8 sm:py-10 md:py-12">
                    <p className="font-heading text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-center mb-6 sm:mb-8">
                        POWERED BY
                    </p>
                    <LogoLoop
                        logos={techLogos}
                        speed={50}
                        direction="left"
                        logoHeight={40}
                        gap={40}
                        scaleOnHover
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
                        className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[1000px] mx-auto bg-[#0a0a0a] rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden"
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

                            <motion.h2
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white uppercase leading-none mb-4 sm:mb-6 md:mb-8"
                            >
                                Hackers of the<br />
                                <span className="text-[#08cb00]">Humdrum.</span>
                            </motion.h2>

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
