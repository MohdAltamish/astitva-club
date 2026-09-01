"use client";

/**
 * StarField — subtle constellation/star-field pattern for hero background.
 * Per design.md §7: faint star scatter at low opacity, gentle twinkle animation,
 * never competes with text contrast. Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      generateStars();
    };

    const generateStars = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const starCount = Math.floor((width * height) / 8000); // ~1 star per 8000px²
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 6000,
        duration: Math.random() * 3000 + 2000,
      }));
    };

    const draw = (timestamp: number) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        let opacity = 0.3;
        if (!prefersReducedMotion) {
          const cycle = (timestamp + star.delay) % star.duration;
          const progress = cycle / star.duration;
          opacity = 0.15 + 0.45 * Math.sin(progress * Math.PI * 2);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 217, 139, ${opacity})`; // gold-light
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
