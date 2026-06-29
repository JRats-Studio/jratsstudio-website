"use client";

import { useEffect, useRef } from "react";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  speed?: number;
  className?: string;
}

export const Aurora = ({
  colorStops = ["#00d4ff", "#08cb00", "#253900", "#00ff88"],
  amplitude = 1,
  speed = 1,
  className = "",
}: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const drawAurora = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Number of curves
      const layers = 4;
      const points = 200;

      for (let layer = 0; layer < layers; layer++) {
        const offset = (layer / layers) * Math.PI * 2;
        const alpha = 0.15 + (layer / layers) * 0.1;

        // Shift x position based on layer
        const xShift = layer * 20;

        ctx.beginPath();

        for (let i = 0; i < points; i++) {
          const t = i / points;
          const x = t * width + xShift;

          // Combine multiple sine waves for organic movement
          const yBase = height / 2;
          const wave1 = Math.sin(t * 8 + time * 0.3 * speed + offset) * 80 * amplitude;
          const wave2 = Math.sin(t * 12 - time * 0.2 * speed + offset * 1.5) * 50 * amplitude;
          const wave3 = Math.cos(t * 6 + time * 0.15 * speed + offset * 0.8) * 60 * amplitude;
          const y = yBase + wave1 + wave2 + wave3;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Gradient fill with color stops
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        const stops = colorStops.length;
        colorStops.forEach((color, idx) => {
          const pos = idx / (stops - 1);
          grad.addColorStop(pos, color);
        });

        ctx.strokeStyle = grad;
        ctx.lineWidth = 120 + layer * 30;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = colorStops[layer % colorStops.length];
        ctx.shadowBlur = 80;
        ctx.stroke();

        // Second pass with thinner stroke for glow
        ctx.lineWidth = 20 + layer * 10;
        ctx.globalAlpha = alpha * 0.4;
        ctx.shadowBlur = 150;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(drawAurora);
    };

    resize();
    window.addEventListener("resize", resize);

    let startTime = performance.now();
    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      drawAurora(elapsed);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [colorStops, amplitude, speed]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
};