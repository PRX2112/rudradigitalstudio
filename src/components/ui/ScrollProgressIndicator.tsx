"use client";

import { motion } from "framer-motion";

export function ScrollProgressIndicator() {
  const letters = ["S", "C", "R", "O", "L", "L"];

  return (
    <div className="flex flex-col items-center gap-2.5 pointer-events-none select-none">
      {/* Letter staggered pulse */}
      <div className="flex items-center gap-1">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            className="text-[9px] font-sans tracking-[0.35em] text-[#d4a389]/60 font-light"
            animate={{ opacity: [0.25, 0.9, 0.25] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: index * 0.16,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Luxury mouse capsule */}
      <div className="relative w-4 h-7 rounded-full border border-[#d4a389]/30 flex justify-center p-1">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-[#d4a389]"
          animate={{ y: [0, 8, 0], opacity: [0.9, 0.2, 0.9] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Triple micro-chevrons */}
      <div className="flex flex-col items-center -space-y-1">
        <motion.div
          className="w-1.5 h-1.5 border-b border-r border-[#d4a389]/60 rotate-45"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-1.5 h-1.5 border-b border-r border-[#d4a389]/40 rotate-45"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-1.5 h-1.5 border-b border-r border-[#d4a389]/20 rotate-45"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}
