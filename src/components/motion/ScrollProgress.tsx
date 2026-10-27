"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export interface ScrollProgressProps {
  className?: string;
  position?: "top" | "bottom";
  color?: string;
}

export function ScrollProgress({
  className = "",
  position = "top",
  color,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  // Audit Item 3: useReducedMotion() support
  const shouldReduceMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className={`fixed left-0 right-0 z-50 pointer-events-none h-[2px] ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`.trim()}
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[var(--brand-accent)] via-[#f5d5c5] to-[var(--brand-accent)] shadow-[0_0_10px_rgba(212,163,137,0.7)]"
        style={{
          scaleX: shouldReduceMotion ? scrollYProgress : scaleX,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
