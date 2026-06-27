"use client";

import { useEffect, useRef } from "react";

export const TechnicalGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                containerRef.current.style.setProperty("--mouse-x", `${x}px`);
                containerRef.current.style.setProperty("--mouse-y", `${y}px`);
                containerRef.current.style.setProperty("--glow-opacity", "0.4");
            }
        };

        const handleMouseLeave = () => {
            if (containerRef.current) {
                containerRef.current.style.setProperty("--glow-opacity", "0");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
            style={{
                // Pre-define CSS variables to prevent Server/Client mismatch issues
                ["--mouse-x" as any]: "-1000px",
                ["--mouse-y" as any]: "-1000px",
                ["--glow-opacity" as any]: "0",
            }}
        >
            {/* 1. Sub-Grid Pattern (Dense 20px grid for detail) */}
            <div 
                className="absolute inset-0 opacity-[0.015] z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(8, 203, 0, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(8, 203, 0, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                }}
            />

            {/* 2. Main Blueprint Grid Pattern (Large 80px blueprint grids) */}
            <div 
                className="absolute inset-0 opacity-[0.035] z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(8, 203, 0, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(8, 203, 0, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* 3. Glowing Mouse spotlight - lights up grid lines as the cursor moves */}
            <div 
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[150px] transition-opacity duration-500 z-10"
                style={{
                    left: "calc(var(--mouse-x) - 300px)",
                    top: "calc(var(--mouse-y) - 300px)",
                    opacity: "var(--glow-opacity)",
                    background: "radial-gradient(circle at center, rgba(8,203,0,0.2) 0%, rgba(8,203,0,0.05) 50%, transparent 70%)"
                }}
            />

            {/* 4. Ambient Vignette Shadow - darkens screen edges to focus eyes on content */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] z-20" />

            {/* 5. Retro-Tech CRT Scanlines - adds professional terminal texture overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_97%,rgba(8,203,0,0.008)_97%)] bg-[length:100%_3px] z-30" />
        </div>
    );
};
