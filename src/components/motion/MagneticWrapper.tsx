"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, type Transition, useReducedMotion } from "framer-motion";

export interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number; // Cursor tracking multiplier (0.1 - 0.5)
  disabled?: boolean;
  onClick?: () => void;
}

export function MagneticWrapper({
  children,
  className = "",
  strength = 0.32,
  disabled = false,
  onClick,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Audit Item 3: Bypass transforms if user prefers reduced motion
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || shouldReduceMotion || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Physical spring configuration
  const springTransition: Transition = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.8,
  };

  // Audit Item 2: will-change: transform only while actively tracking
  const isActive = isHovered && (position.x !== 0 || position.y !== 0);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={shouldReduceMotion || disabled ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
      transition={springTransition}
      style={{ willChange: isActive ? "transform" : "auto" }}
      className={`inline-block ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
