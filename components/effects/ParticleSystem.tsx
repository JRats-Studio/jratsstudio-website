"use client";

import { useEffect, useRef } from "react";

interface ParticleSystemProps {
  particleCount?: number;
  duration?: number;
  color?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

export const ParticleSystem = ({
  particleCount = 40,
  duration = 6,
  color = "#08cb00",
  className = "",
}: ParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let animationId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const spawn = (): Particle => {
      const maxLife = duration * (0.6 + Math.random() * 0.8);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2),
        size: Math.random() * 2.2 + 0.8,
        life: Math.random() * maxLife,
        maxLife,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: particleCount }, spawn);
    };

    const dt = 1 / 60;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += dt;

        if (p.life >= p.maxLife || p.y < -10) {
          Object.assign(p, spawn(), { y: height + 10, life: 0 });
        }

        // Fade in/out over the particle's life.
        const t = p.life / p.maxLife;
        const fade = Math.sin(t * Math.PI);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, fade) * 0.6;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReduced) {
      draw();
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, duration, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};

export default ParticleSystem;
