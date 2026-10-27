"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

interface MaskedRevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function MaskedRevealText({
  children,
  className = "",
  delay = 0,
  duration = 1.05,
  as: Component = "div",
}: MaskedRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <div ref={ref} className="overflow-hidden inline-block w-full">
      <motion.div
        initial={{ y: "110%", opacity: 0, filter: "blur(4px)" }}
        animate={isInView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : { y: "110%", opacity: 0, filter: "blur(4px)" }}
        transition={{
          duration,
          delay,
          ease: LUXURY_EASE,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
