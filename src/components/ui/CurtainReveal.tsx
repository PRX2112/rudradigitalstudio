"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CURTAIN_EASE } from "@/lib/motion";

interface CurtainRevealProps {
  children: ReactNode;
  onRevealStart?: () => void;
  onRevealComplete?: () => void;
}

export function CurtainReveal({ children, onRevealStart, onRevealComplete }: CurtainRevealProps) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Audit Item 3: useReducedMotion() hook
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(100);
      setIsDone(true);
      onRevealStart?.();
      onRevealComplete?.();
      return;
    }

    // Steady luxury progress count
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        const step = Math.max(1.8, remaining * 0.14);
        return Math.min(100, prev + step);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, onRevealStart, onRevealComplete]);

  useEffect(() => {
    if (progress >= 100 && !isOpening && !isDone) {
      const timer = setTimeout(() => {
        setIsOpening(true);
        onRevealStart?.();

        const finishTimer = setTimeout(() => {
          setIsDone(true);
          onRevealComplete?.();
        }, 1700);

        return () => clearTimeout(finishTimer);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress, isOpening, isDone, onRevealStart, onRevealComplete]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Underlying Page Content */}
      <div className="w-full">{children}</div>

      {/* Split Curtain Panels */}
      <AnimatePresence>
        {!isDone && !shouldReduceMotion && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Top Curtain Panel */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-[#070809] border-b border-[#d4a389]/25 flex items-end justify-center pointer-events-auto"
              initial={{ y: 0 }}
              animate={isOpening ? { y: "-100%" } : { y: 0 }}
              // Audit Item 2: will-change allocated only while curtain is actively animating
              style={{ willChange: isOpening ? "transform" : "auto" }}
              transition={{ duration: 1.5, ease: CURTAIN_EASE }}
            >
              {/* Glowing Hairline */}
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a389] to-transparent shadow-[0_0_15px_rgba(212,163,137,0.8)]" />
            </motion.div>

            {/* Bottom Curtain Panel */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#070809] border-t border-[#d4a389]/25 flex items-start justify-center pointer-events-auto"
              initial={{ y: 0 }}
              animate={isOpening ? { y: "100%" } : { y: 0 }}
              // Audit Item 2: will-change allocated only while curtain is actively animating
              style={{ willChange: isOpening ? "transform" : "auto" }}
              transition={{ duration: 1.5, ease: CURTAIN_EASE, delay: 0.04 }}
            >
              {/* Glowing Hairline */}
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a389] to-transparent shadow-[0_0_15px_rgba(212,163,137,0.8)]" />
            </motion.div>

            {/* Center Loading Insignia */}
            {!isOpening && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="relative px-10 py-8 rounded-2xl glass-panel max-w-sm w-full mx-4 text-center border border-[#d4a389]/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                  {/* Subtle emblem */}
                  <div className="w-8 h-8 mx-auto mb-4 border border-[#d4a389]/40 rotate-45 flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#d4a389]/60 rotate-45" />
                  </div>

                  <h2 className="font-serif text-2xl tracking-[0.2em] font-light text-[#fbf8f5] mb-1">
                    RUDRA
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4a389]/80 mb-6 font-sans">
                    Digital Studio
                  </p>

                  {/* Progress Line */}
                  <div className="w-44 h-[2px] bg-[#d4a389]/15 mx-auto rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#d4a389]/60 via-[#f5d5c5] to-[#d4a389] rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(212,163,137,0.6)]"
                      style={{ width: `${Math.round(progress)}%` }}
                    />
                  </div>

                  <div className="text-[11px] font-sans tracking-[0.25em] text-[#d4a389]/60 tabular-nums">
                    {Math.round(progress)}%
                  </div>

                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#fbf8f5]/40 mt-3">
                    Calibrating Master Grain
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
