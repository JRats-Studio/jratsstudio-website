"use client";
import PixelTransition from "@/components/effects/PixelTransition";
import SplitText from "@/components/effects/SplitText";
import DecryptedSplitText from "@/components/effects/DecryptedSplitText";
import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BrainCircuit, Terminal, Video, Database, Check } from "lucide-react";

const Waves = dynamic(() => import("@/components/effects/Waves"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-transparent" />,
});

import { TextReveal } from "@/components/effects/TextReveal";

const services = [
    {
        title: "AI Solutions",
        subtitle: "Neural Architecture",
        description: "We don't just 'use' AI; we forge it. Our bespoke neural architectures are designed to dismantle inefficiency. From predictive modeling to autonomous agents, we build the digital workforce that never sleeps, ensuring your business operates at a velocity your competitors can't comprehend.",
        capabilities: ["Predictive Analytics", "Autonomous Agents", "Workflow Automation", "LLM Integration"],
        icon: BrainCircuit,
    },
    {
        title: "Software Dev",
        subtitle: "System Engineering",
        description: "Legacy code is a prison. We engineer the escape. Using cutting-edge stacks and scalable microservices, we build robust software ecosystems that are as resilient as they are powerful. This isn't just development; it's digital evolution designed for massive scale.",
        capabilities: ["Custom Web Apps", "API Development", "Cloud Architecture", "SaaS Platforms"],
        icon: Terminal,
    },
    {
        title: "AI Production",
        subtitle: "Generative Media",
        description: "The old internet is boring. We remix reality. Leveraging advanced generative AI for video and graphics, we create visual experiences that stops the scroll and demands attention. Visual anarchy that defines your brand's new aesthetic.",
        capabilities: ["Generative Video", "3D Motion Graphics", "Brand Identity", "Interactive Visuals"],
        icon: Video,
    },
    {
        title: "Data Room",
        subtitle: "Secure Infrastructure",
        description: "In the age of information, your data is your fortress. We construct impenetrable data rooms and bespoke CRM systems that give you total command over your intelligence. Truth, secured by iron-clad logic and design.",
        capabilities: ["Custom CRMs", "Secure Data Rooms", "Data Visualization", "Compliance Systems"],
        icon: Database,
    },
];

interface ServiceCardProps {
    service: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
        icon: React.ComponentType<{ className?: string }>;
    };
    index: number;
    range: [number, number];
    targetScale: number;
    progress: MotionValue<number>;
}

const ServiceCard = ({ service, index, range, targetScale, progress }: ServiceCardProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex flex-col h-auto min-h-[500px] sm:min-h-[550px] md:h-[600px] w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[1400px] rounded-2xl sm:rounded-3xl origin-top bg-white/[0.01] backdrop-blur-xl border border-white/10 hover:border-[#08cb00]/50 hover:shadow-[0_0_30px_rgba(8,203,0,0.15)] transition-all duration-500 overflow-hidden group"
            >
                {/* Glossy Sheen Sweep Overlay */}
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={isHovered ? { x: "200%" } : { x: "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />

                {/* Tech Corner Brackets */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/15 group-hover:border-[#08cb00]/70 group-hover:w-8 group-hover:h-8 transition-all duration-500 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none z-20" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/15 group-hover:border-[#08cb00]/70 group-hover:w-8 group-hover:h-8 transition-all duration-500 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/15 group-hover:border-[#08cb00]/70 group-hover:w-8 group-hover:h-8 transition-all duration-500 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none z-20" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/15 group-hover:border-[#08cb00]/70 group-hover:w-8 group-hover:h-8 transition-all duration-500 rounded-br-2xl sm:rounded-br-3xl pointer-events-none z-20" />

                {/* Horizontal Bento Grid Layout */}
                <div className="flex flex-col h-full divide-y divide-white/10 group-hover:divide-[#08cb00]/25 transition-colors duration-500">
                    
                    {/* Top Row: Title & Icon (Spans 100% width, vertically centered) */}
                    <div className="p-6 sm:p-8 md:p-10 pt-10 sm:pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <h4 className="font-mono text-[#08cb00] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
                                {service.subtitle}
                            </h4>
                            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-white uppercase leading-[0.95] tracking-tighter group-hover:drop-shadow-[0_0_15px_rgba(8,203,0,0.25)] transition-all duration-500">
                                <TextReveal text={service.title} />
                            </h2>
                        </div>
                        
                        {/* Technical Icon Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#08cb00]/10 border border-[#08cb00]/20 flex items-center justify-center self-start sm:self-center group-hover:bg-[#08cb00]/20 group-hover:scale-110 transition-all duration-500 hover:shadow-[0_0_15px_rgba(8,203,0,0.3)]"
                        >
                            <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#08cb00]" />
                        </motion.div>
                    </div>

                    {/* Bottom Row: Description & Capabilities split 50/50 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 group-hover:divide-[#08cb00]/25 flex-1 transition-colors duration-500">
                        
                        {/* Bottom-Left: Description */}
                        <div className="p-6 sm:p-8 md:p-10 flex items-center">
                            <p className="font-mono text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Bottom-Right: Technical Specs */}
                        <div className="p-6 sm:p-8 md:p-10 bg-white/[0.01] flex flex-col justify-center">
                            <h5 className="font-mono text-gray-500 text-[10px] tracking-widest uppercase mb-4 sm:mb-6">
                                // CAPABILITY_CHECKS
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.capabilities.map((cap: string, i: number) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 font-mono group/item"
                                    >
                                        <Check className="w-4 h-4 text-[#08cb00] flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                                        <span className="group-hover/item:text-white transition-colors">{cap}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const Services = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const [showEffects, setShowEffects] = useState(false);
    const isInView = useInView(container, { margin: "0px 0px 200px 0px", once: true });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setShowEffects(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section id="services" ref={container} className="relative bg-transparent pt-20 pb-20">
            {/* Wavy Vector Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                {showEffects && (
                    <Waves
                        lineColor="#08cb00"
                        backgroundColor="transparent"
                        waveSpeedX={0.015}
                        waveSpeedY={0.008}
                        waveAmpX={30}
                        waveAmpY={15}
                        friction={0.95}
                        tension={0.015}
                        maxCursorMove={80}
                        xGap={24}
                        yGap={24}
                    />
                )}
            </div>

            <div className="relative z-10 mb-16 sm:mb-24 md:mb-32 px-4 sm:px-6 md:px-8 max-w-[95vw] sm:max-w-[90vw] md:max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
                <div>
                <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-[100px] text-white uppercase tracking-tighter leading-[0.85] sm:leading-[0.8]">
                    <DecryptedSplitText text="The Arsenal" charDelay={35} scrambleDuration={300} />
                </h2>
                <div className="w-16 sm:w-24 md:w-32 h-1.5 sm:h-2 bg-[#08cb00] mt-4 sm:mt-5 md:mt-6" />
                </div>
                <p className="font-mono text-gray-400 text-xs sm:text-sm max-w-sm text-right hidden md:block">
                    // SYSTEMS DESIGNED FOR<br />
                    <span className="text-[#08cb00] tracking-widest font-bold">TOTAL VELOCITY</span>
                </p>
            </div>

            <div className="relative z-10">
                {services.map((service, index) => {
                    const targetScale = 1 - ((services.length - index) * 0.05);
                    return <ServiceCard key={index} index={index} service={service} range={[index * .25, 1]} targetScale={targetScale} progress={scrollYProgress} />
                })}
            </div>
        </section>
    );
};
