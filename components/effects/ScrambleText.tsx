"use client";

import { useEffect, useState } from "react";

interface ScrambleTextProps {
    text: string;
    trigger?: boolean;
    duration?: number;
}

const chars = "XØ//79_#$@%&![]{}<>*^";

export const ScrambleText = ({ text, trigger = false, duration = 400 }: ScrambleTextProps) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text);
            return;
        }

        let frame = 0;
        const totalFrames = Math.floor(duration / (1000 / 60)); // 60fps
        const intervalTime = duration / totalFrames;

        const interval = setInterval(() => {
            const progress = frame / totalFrames;
            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    // If progress has passed this character's reveal threshold, show real char
                    if (index / text.length < progress) {
                        return char;
                    }
                    // Otherwise show a random matrix character
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            setDisplayText(scrambled);
            frame++;

            if (frame >= totalFrames) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [text, trigger, duration]);

    return <span>{displayText}</span>;
};
