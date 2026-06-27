"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    strength?: number; // How far it pulls
}

export const MagneticButton = ({ children, className = "", onClick, strength = 40 }: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Mouse position relative to the center of the button
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Spring physics for the magnetic snap back
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // Apply magnetic pull
        x.set(middleX * (strength / 100));
        y.set(middleY * (strength / 100));
    };

    const handleMouseLeave = () => {
        // Snap back to 0,0 when mouse leaves
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                x: springX,
                y: springY,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer inline-flex items-center justify-center ${className}`}
        >
            {/* The child inside also moves slightly more for a parallax effect */}
            <motion.div 
                style={{ 
                    x: useTransform(springX, (val) => val * 0.5), 
                    y: useTransform(springY, (val) => val * 0.5) 
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
