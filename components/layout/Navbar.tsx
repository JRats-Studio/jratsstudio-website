"use client";
import { motion, useScroll, AnimatePresence, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const Navbar = () => {
    const { scrollY, scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
            
            const servicesEl = document.getElementById("services");
            const aboutEl = document.getElementById("about");
            const projectsEl = document.getElementById("projects");
            const connectEl = document.getElementById("connect");
            
            if (servicesEl && aboutEl && projectsEl && connectEl) {
                const scrollPos = window.scrollY + 200;
                if (scrollPos >= connectEl.offsetTop) setActiveSection("connect");
                else if (scrollPos >= projectsEl.offsetTop) setActiveSection("projects");
                else if (scrollPos >= aboutEl.offsetTop) setActiveSection("about");
                else if (scrollPos >= servicesEl.offsetTop) setActiveSection("services");
                else setActiveSection("");
            }
        });
    }, [scrollY]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            // Using the global Lenis instance to smoothly scroll without fighting the browser
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.scrollTo('#' + id, { offset: 0 });
            } else {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // If the element doesn't exist (e.g. we are on the 404 page), redirect to home page with hash
            if (typeof window !== "undefined") {
                window.location.href = `/#${id}`;
            }
        }
    };

    return (
        <>
            {/* Global Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#08cb00] origin-left z-[1000]"
                style={{ scaleX }}
            />

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                    isScrolled ? "bg-[#000300]/60 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_8px_30px_rgba(8,203,0,0.03)] mt-1" : "bg-transparent py-6 mt-1"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group hover-target z-[110]" onClick={(e) => handleScroll(e as any, 'services')}>
                        {/* Awwwards Pattern: Only show the Navbar logo after scrolling past the giant Hero logo */}
                        <AnimatePresence>
                            {isScrolled && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="relative w-[120px] h-[32px] group-hover:scale-105 transition-transform duration-300"
                                >
                                    <Image src="/logo.webp" alt="JRat's Studio Logo" fill className="object-contain object-left" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 font-mono text-xs tracking-[0.2em] uppercase items-center">
                        <a href="#services" onClick={(e) => handleScroll(e, 'services')} className={`transition-colors duration-300 hover-target ${activeSection === 'services' ? 'text-[#08cb00]' : 'text-gray-400 hover:text-[#08cb00]'}`}>Services</a>
                        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className={`transition-colors duration-300 hover-target ${activeSection === 'about' ? 'text-[#08cb00]' : 'text-gray-400 hover:text-[#08cb00]'}`}>About</a>
                        <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className={`transition-colors duration-300 hover-target ${activeSection === 'projects' ? 'text-[#08cb00]' : 'text-gray-400 hover:text-[#08cb00]'}`}>Projects</a>
                        <MagneticButton strength={30}>
                            <a href="#connect" onClick={(e) => handleScroll(e, 'connect')} className={`transition-colors duration-300 border px-4 py-2 rounded-full hover:bg-[#08cb00]/10 hover-target ${activeSection === 'connect' ? 'text-white border-[#08cb00] bg-[#08cb00]/10 shadow-[0_0_15px_rgba(8,203,0,0.2)]' : 'text-[#08cb00] border-[#08cb00]/30 hover:border-[#08cb00] hover:text-white hover:shadow-[0_0_15px_rgba(8,203,0,0.2)]'}`}>Connect</a>
                        </MagneticButton>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white hover:text-[#08cb00] transition-colors hover-target z-[110]"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-[90] bg-[#000300]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
                    >
                        <a href="#services" onClick={(e) => handleScroll(e, 'services')} className={`font-heading text-4xl uppercase tracking-wider transition-colors duration-300 hover-target ${activeSection === 'services' ? 'text-[#08cb00]' : 'text-white hover:text-[#08cb00]'}`}>Services</a>
                        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className={`font-heading text-4xl uppercase tracking-wider transition-colors duration-300 hover-target ${activeSection === 'about' ? 'text-[#08cb00]' : 'text-white hover:text-[#08cb00]'}`}>About</a>
                        <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className={`font-heading text-4xl uppercase tracking-wider transition-colors duration-300 hover-target ${activeSection === 'projects' ? 'text-[#08cb00]' : 'text-white hover:text-[#08cb00]'}`}>Projects</a>
                        <a href="#connect" onClick={(e) => handleScroll(e, 'connect')} className={`font-heading text-4xl uppercase tracking-wider transition-colors duration-300 hover-target ${activeSection === 'connect' ? 'text-white' : 'text-[#08cb00] hover:text-white'}`}>Connect</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
