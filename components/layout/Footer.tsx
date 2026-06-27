"use client";

import { SiInstagram, SiLinkedin } from "react-icons/si";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Footer = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    
    // Parallax effect: Text slides up smoothly as footer comes into view
    const y = useTransform(scrollYProgress, [0, 1], [200, 0]);

    // Live Local Clock logic (Ahmedabad / IST)
    const [time, setTime] = useState<string>("");
    
    useEffect(() => {
        const updateTime = () => {
            const timeString = new Date().toLocaleTimeString("en-US", { 
                timeZone: "Asia/Kolkata", 
                hour12: false, 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
            });
            setTime(timeString);
        };
        updateTime(); // Initial set
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer id="connect" ref={containerRef} className="bg-black text-white relative border-t border-white/10 overflow-hidden flex flex-col justify-between pt-12 sm:pt-20">
            
            {/* Top Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
                
                {/* Left Side: Address & Live Clock */}
                <div className="flex flex-col gap-8">
                    <div>
                        <h4 className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-6 flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#08cb00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#08cb00]"></span>
                            </span>
                            AHMEDABAD, IN // {time ? `${time} IST` : "LOADING..."}
                        </h4>
                        <address className="text-xl sm:text-2xl md:text-3xl not-italic leading-relaxed font-light text-gray-200">
                            STC (Shivam Trade Center)<br />
                            NH147, Ambli,<br />
                            Gujarat 380058<br />
                        </address>
                    </div>
                </div>

                {/* Right Side: Contact Form & Socials */}
                <div className="flex flex-col gap-8 w-full max-w-[360px] md:ml-auto">
                    <div>
                        <h4 className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-6">/ INQUIRIES_FORM</h4>
                        
                        {/* Interactive Form */}
                        <form 
                            onInput={() => {
                                const statusText = document.getElementById("form-status");
                                if (statusText && statusText.innerText !== "READY_TO_CONNECT" && statusText.innerText !== "TRANSMITTING...") {
                                    statusText.innerText = "READY_TO_CONNECT";
                                    statusText.className = "font-mono text-xs text-gray-500 tracking-widest uppercase";
                                }
                            }}
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formEl = e.currentTarget;
                                const formData = new FormData(formEl);
                                const data = {
                                    name: formData.get("name"),
                                    email: (formData.get("email") as string)?.toLowerCase(),
                                    message: formData.get("message"),
                                };

                                // Set form state to sending
                                const submitBtn = formEl.querySelector("button[type='submit']");
                                const statusText = document.getElementById("form-status");
                                if (submitBtn && statusText) {
                                    submitBtn.setAttribute("disabled", "true");
                                    statusText.innerText = "TRANSMITTING...";
                                    statusText.className = "font-mono text-xs text-[#08cb00] tracking-widest uppercase animate-pulse";
                                }

                                try {
                                    // Submit message to our contact api route
                                    const res = await fetch("/api/contact", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(data),
                                    });

                                    if (res.ok) {
                                        if (statusText) {
                                            statusText.innerText = "MESSAGE RECEIVED // WE'LL CONTACT YOU SOON.";
                                            statusText.className = "font-mono text-xs text-[#08cb00] tracking-widest uppercase";
                                            
                                            // Auto-clear success message after 5 seconds
                                            setTimeout(() => {
                                                const currentStatus = document.getElementById("form-status");
                                                if (currentStatus && currentStatus.innerText.includes("MESSAGE RECEIVED")) {
                                                    currentStatus.innerText = "READY_TO_CONNECT";
                                                    currentStatus.className = "font-mono text-xs text-gray-500 tracking-widest uppercase";
                                                }
                                            }, 5000);
                                        }
                                        formEl.reset();
                                    } else {
                                        throw new Error();
                                    }
                                } catch (err) {
                                    if (statusText) {
                                        statusText.innerText = "TRANSMISSION FAILED // TRY HELLO@JRATS.STUDIO";
                                        statusText.className = "font-mono text-xs text-red-500 tracking-widest uppercase";
                                    }
                                } finally {
                                    if (submitBtn) {
                                        submitBtn.removeAttribute("disabled");
                                    }
                                }
                            }}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex flex-col gap-1.5 group/field">
                                <label className="font-mono text-[9px] text-gray-500 tracking-widest uppercase transition-colors group-focus-within/field:text-[#08cb00] duration-300">
                                    01 // YOUR NAME
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="ENTER YOUR NAME"
                                    className="w-full bg-transparent border-b border-white/10 pb-1.5 text-xs sm:text-sm font-mono text-white placeholder-white/15 focus:outline-none focus:border-[#08cb00] transition-colors tracking-wider"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 group/field">
                                <label className="font-mono text-[9px] text-gray-500 tracking-widest uppercase transition-colors group-focus-within/field:text-[#08cb00] duration-300">
                                    02 // YOUR EMAIL
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="ENTER YOUR EMAIL ADDRESS"
                                    className="w-full bg-transparent border-b border-white/10 pb-1.5 text-xs sm:text-sm font-mono text-white placeholder-white/15 focus:outline-none focus:border-[#08cb00] transition-colors tracking-wider lowercase"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 group/field">
                                <label className="font-mono text-[9px] text-gray-500 tracking-widest uppercase transition-colors group-focus-within/field:text-[#08cb00] duration-300">
                                    03 // YOUR PROJECT DETAILS
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={2}
                                    placeholder="DESCRIBE YOUR PROJECT OR INQUIRY"
                                    className="w-full bg-transparent border-b border-white/10 pb-1.5 text-xs sm:text-sm font-mono text-white placeholder-white/15 focus:outline-none focus:border-[#08cb00] transition-colors tracking-wider resize-none"
                                />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                                <div id="form-status" className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                                    READY_TO_CONNECT
                                </div>
                                <MagneticButton strength={20}>
                                    <button
                                        type="submit"
                                        className="group relative inline-flex items-center justify-center px-4 py-2.5 bg-[#08cb00] text-black font-mono text-xs tracking-[0.2em] uppercase overflow-hidden w-full sm:w-auto"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            TRANSMIT
                                            <span>→</span>
                                        </span>
                                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                                    </button>
                                </MagneticButton>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        <a 
                            href="mailto:hello@jrats.studio" 
                            className="font-mono text-xs text-gray-400 hover:text-[#08cb00] transition-colors tracking-widest uppercase"
                        >
                            hello@jrats.studio
                        </a>
                        <div className="flex gap-4">
                            <MagneticButton strength={30}>
                                <a href="https://www.instagram.com/jrats.studio/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#08cb00] transition-colors p-3 border border-white/10 rounded-full hover:border-[#08cb00]/50 hover:bg-[#08cb00]/5" aria-label="Instagram">
                                    <SiInstagram className="w-5 h-5" />
                                </a>
                            </MagneticButton>
                            <MagneticButton strength={30}>
                                <a href="https://www.linkedin.com/company/jrats-studio" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#08cb00] transition-colors p-3 border border-white/10 rounded-full hover:border-[#08cb00]/50 hover:bg-[#08cb00]/5" aria-label="LinkedIn">
                                    <SiLinkedin className="w-5 h-5" />
                                </a>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sleek Infinite Scrolling Marquee */}
            <div className="w-full overflow-hidden border-t border-b border-[#08cb00]/20 py-4 my-8 relative flex bg-black/80">
                
                {/* Subtle Neon Green Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#08cb00]/10 to-transparent z-0 pointer-events-none"></div>
                
                {/* Static Noise Texture */}
                <div 
                    className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                ></div>

                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex whitespace-nowrap z-10"
                >
                    {/* We duplicate the text twice to create a seamless loop */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 px-4">
                            <span 
                                className="font-heading text-4xl sm:text-5xl md:text-6xl text-transparent uppercase tracking-widest transition-all duration-300 hover:text-[#08cb00]/20"
                                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)" }}
                            >
                                JRAT'S STUDIO
                            </span>
                            <span className="text-[#08cb00]/50 text-2xl">✦</span>
                            <span 
                                className="font-heading text-4xl sm:text-5xl md:text-6xl text-transparent uppercase tracking-widest transition-all duration-300 hover:text-[#08cb00]/20"
                                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)" }}
                            >
                                HACKERS OF THE HUMDRUM
                            </span>
                            <span className="text-[#08cb00]/50 text-2xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Copyright Bar */}
            <div className="w-full border-t border-white/10 px-6 py-6 z-10 bg-black relative">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} JRATS STUDIO. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};
