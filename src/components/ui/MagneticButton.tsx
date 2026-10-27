"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { MAGNETIC_SPRING } from "@/lib/motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  id?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Subtle magnetic attraction distance
    const distanceX = (clientX - centerX) * 0.28;
    const distanceY = (clientY - centerY) * 0.28;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#d4a389] via-[#e2b89d] to-[#c99479] text-[#070809] font-medium shadow-[0_10px_30px_rgba(212,163,137,0.25)] hover:shadow-[0_15px_40px_rgba(212,163,137,0.4)]";
      case "outline":
        return "border border-[#d4a389]/40 text-[#fbf8f5] hover:border-[#d4a389] hover:bg-[#d4a389]/10";
      case "ghost":
        return "text-[#fbf8f5]/80 hover:text-[#d4a389] hover:bg-white/[0.03]";
      default:
        return "";
    }
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={MAGNETIC_SPRING}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.22em] transition-all duration-300 overflow-hidden group cursor-pointer ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Light sheen sweeping across button on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
    </motion.button>
  );
}
