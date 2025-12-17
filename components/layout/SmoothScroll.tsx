"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number>(0);

    useEffect(() => {
        // Defer Lenis initialization to reduce TBT during initial load
        const initHandle = setTimeout(() => {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
            });

            lenisRef.current = lenis;

            function raf(time: number) {
                lenis.raf(time);
                rafIdRef.current = requestAnimationFrame(raf);
            }

            rafIdRef.current = requestAnimationFrame(raf);
        }, 100);

        return () => {
            clearTimeout(initHandle);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
        };
    }, []);

    return <>{children}</>;
};

