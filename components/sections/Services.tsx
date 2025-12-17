"use client";

import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BrainCircuit, Terminal, Video, Database, Check } from "lucide-react";

const PixelBlast = dynamic(() => import("@/components/effects/PixelBlast"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-transparent" />,
});

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

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
                className="relative flex flex-col h-auto min-h-[500px] sm:min-h-[550px] md:h-[600px] w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[1400px] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 origin-top bg-[#0a0a0a] border border-white/10 overflow-hidden"
            >
                <div className="h-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12 lg:gap-16 items-start md:items-center p-2 sm:p-4">
                    {/* Left Side: Icon & Title */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-[#08cb00]/10 border border-[#08cb00]/20 flex items-center justify-center"
                        >
                            <service.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#08cb00]" />
                        </motion.div>

                        <div>
                            <motion.h4
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="font-mono text-[#08cb00] text-sm tracking-[0.2em] uppercase mb-4"
                            >
                                {service.subtitle}
                            </motion.h4>
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter"
                            >
                                {service.title}
                            </motion.h2>
                        </div>
                    </div>

                    {/* Right Side: Description & Details */}
                    <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/5">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="font-mono text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed"
                        >
                            {service.description}
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                            {service.capabilities.map((cap: string, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-mono"
                                >
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#08cb00] flex-shrink-0" />
                                    {cap}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export const Services = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const [showEffects, setShowEffects] = useState(false);
    
    // Only load PixelBlast when the section comes into view
    // This removes the heavy initialization from the initial page load entirely
    const isInView = useInView(container, { margin: "0px 0px 200px 0px", once: true });

    useEffect(() => {
        if (isInView) {
            // Add a small delay even after view to prioritize smooth scrolling
            const timer = setTimeout(() => {
                setShowEffects(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section ref={container} className="relative bg-black pt-20 pb-20">
            {/* PixelBlast Background */}
            <div className="absolute inset-0 z-0">
                {showEffects && (
                    <PixelBlast
                        variant="circle"
                        pixelSize={6}
                        color="#08cb00"
                        patternScale={3}
                        patternDensity={1.2}
                        pixelSizeJitter={0.5}
                        enableRipples
                        rippleSpeed={0.4}
                        rippleThickness={0.12}
                        rippleIntensityScale={1.5}
                        liquid
                        liquidStrength={0.12}
                        liquidRadius={1.2}
                        liquidWobbleSpeed={5}
                        speed={0.6}
                        edgeFade={0.25}
                        transparent
                    />
                )}
            </div>

            <div className="relative z-10 mb-16 sm:mb-24 md:mb-32 px-4 sm:px-6 md:px-8 max-w-[95vw] sm:max-w-[90vw] md:max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
                <div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-[120px] text-white uppercase tracking-tighter leading-[0.85] sm:leading-[0.8]">
                        The Arsenal
                    </h2>
                    <div className="w-16 sm:w-24 md:w-32 h-1.5 sm:h-2 bg-[#08cb00] mt-4 sm:mt-5 md:mt-6" />
                </div>
                <p className="font-mono text-gray-400 text-lg max-w-sm text-right hidden md:block">
                    / SYSTEMS DESIGNED FOR<br />
                    <span className="text-[#08cb00]">TOTAL VELOCITY</span>
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
