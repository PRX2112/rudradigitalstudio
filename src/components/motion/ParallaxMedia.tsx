"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from "framer-motion";

export interface ParallaxMediaProps {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. "16/9", "4/3", "3/4", "1/1"
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

export function ParallaxMedia({
  src,
  alt,
  aspectRatio = "16/9",
  className = "",
  containerClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",
  overlay = false,
  overlayClassName = "bg-black/20",
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Audit Item 3: Bypass transforms if user prefers reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Audit Item 2: Track viewport visibility so will-change: transform is active only when in view
  const isInView = useInView(containerRef, { margin: "15% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Scale (1.1 -> 1.0) and vertical translation (-6% -> 6%)
  const scale = useTransform(smoothProgress, [0, 1], [1.1, 1.0]);
  const y = useTransform(smoothProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={containerRef}
      style={{ aspectRatio }}
      className={`relative w-full overflow-hidden ${containerClassName}`.trim()}
    >
      <motion.div
        className="absolute -inset-[8%] w-[116%] h-[116%]"
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          y: shouldReduceMotion ? 0 : y,
          // Audit Item 2: GPU compositing layer allocated only while active in viewport
          willChange: isInView && !shouldReduceMotion ? "transform" : "auto",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover object-center ${className}`.trim()}
        />
        {overlay && <div className={`absolute inset-0 ${overlayClassName}`.trim()} />}
      </motion.div>
    </div>
  );
}
