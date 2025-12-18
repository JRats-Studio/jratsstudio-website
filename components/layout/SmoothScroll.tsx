"use client";

import { ReactNode, useEffect, useRef } from "react";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
    const lenisRef = useRef<any | null>(null);
    const rafIdRef = useRef<number>(0);

    useEffect(() => {
        let mounted = true;
        // Defer Lenis initialization to reduce TBT during initial load
        const initHandle = setTimeout(() => {
            (async () => {
                if (!mounted) return;
                const { default: Lenis } = await import('lenis');
                if (!mounted) return;
                const lenis = new Lenis({
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: "vertical",
                    gestureOrientation: "vertical",
                    smoothWheel: true,
                });

                lenisRef.current = lenis;

                function raf(time: number) {
                    if (!mounted) return;
                    lenis.raf(time);
                    rafIdRef.current = requestAnimationFrame(raf);
                }

                rafIdRef.current = requestAnimationFrame(raf);
            })();
        }, 100);

        return () => {
            mounted = false;
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

