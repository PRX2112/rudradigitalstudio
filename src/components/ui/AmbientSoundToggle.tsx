"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ambientSound } from "@/lib/sound";
import { MAGNETIC_SPRING } from "@/lib/motion";

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (!ambientSound) return;
    const active = ambientSound.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative flex items-center justify-end">
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mr-3 px-3 py-1.5 rounded-lg glass-panel text-[11px] tracking-wider uppercase text-[#fbf8f5]/80 pointer-events-none whitespace-nowrap border border-[#d4a389]/25 shadow-lg"
            >
              {isPlaying ? "Mute Atmosphere" : "Cinematic Soundscape"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Sound Button */}
        <motion.button
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={MAGNETIC_SPRING}
          aria-label={isPlaying ? "Mute ambient audio" : "Enable ambient audio"}
          className="relative p-3.5 rounded-full glass-pill text-[#fbf8f5] hover:text-[#f5d5c5] transition-colors border border-[#d4a389]/30 hover:border-[#d4a389]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)] group"
        >
          {/* Subtle pulsating aura when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-[#d4a389]/40 animate-ping pointer-events-none opacity-40" />
          )}

          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#d4a389]" />
                {/* Visualizer bars */}
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#d4a389] animate-[soundbar_0.8s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
                  <span className="w-0.5 bg-[#d4a389] animate-[soundbar_0.6s_ease-in-out_infinite_alternate_0.2s]" style={{ height: "100%" }} />
                  <span className="w-0.5 bg-[#d4a389] animate-[soundbar_0.9s_ease-in-out_infinite_alternate_0.4s]" style={{ height: "45%" }} />
                </div>
              </div>
            ) : (
              <VolumeX className="w-4 h-4 text-[#fbf8f5]/60 group-hover:text-[#d4a389] transition-colors" />
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
}
