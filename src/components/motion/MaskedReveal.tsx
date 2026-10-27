"use client";

import { useRef, useState, type ReactNode, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface MaskedRevealProps {
  children?: ReactNode;
  text?: string;
  mode?: "line" | "word";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  wrapperClassName?: string;
  as?: ElementType;
  once?: boolean;
}

export function MaskedReveal({
  children,
  text,
  mode = "word",
  delay = 0,
  duration = 0.95,
  stagger = 0.04,
  className = "",
  wrapperClassName = "",
  as: Component = "div",
  once = true,
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: "-8% 0px" });

  // Audit Item 3: Bypass transforms if user prefers reduced motion
  const shouldReduceMotion = useReducedMotion();
  const [animating, setAnimating] = useState(true);

  const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

  if (shouldReduceMotion) {
    return (
      <Component className={`${wrapperClassName} ${className}`.trim()}>
        {text || children}
      </Component>
    );
  }

  // If text is provided, split by words or lines
  if (text) {
    const segments = mode === "word" ? text.split(" ") : text.split("\n");

    return (
      <Component
        ref={containerRef}
        className={`${wrapperClassName} flex flex-wrap gap-x-[0.28em] gap-y-0.5`.trim()}
      >
        {segments.map((segment, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-[0.08em] -my-[0.08em]">
            <motion.span
              className={`inline-block ${className}`.trim()}
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              onAnimationComplete={() => setAnimating(false)}
              style={{
                // Audit Item 2: willChange active only during entrance transition
                willChange: animating && isInView ? "transform, opacity" : "auto",
              }}
              transition={{
                duration,
                delay: delay + idx * stagger,
                ease: LUXURY_EASE,
              }}
            >
              {segment}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // If children are provided, wrap the children in an overflow-hidden mask
  return (
    <Component
      ref={containerRef}
      className={`${wrapperClassName} overflow-hidden`.trim()}
    >
      <motion.div
        className={className}
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        onAnimationComplete={() => setAnimating(false)}
        style={{
          // Audit Item 2: willChange active only during entrance transition
          willChange: animating && isInView ? "transform, opacity" : "auto",
        }}
        transition={{
          duration,
          delay,
          ease: LUXURY_EASE,
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
