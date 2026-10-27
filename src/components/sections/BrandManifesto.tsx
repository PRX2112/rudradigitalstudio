"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Eye, HeartHandshake } from "lucide-react";
import { MaskedRevealText } from "@/components/ui/MaskedRevealText";
import { fadeUpVariant } from "@/lib/motion";

export function BrandManifesto() {
  const pillars = [
    {
      icon: Eye,
      tag: "Philosophy 01",
      title: "Unscripted Emotion",
      description:
        "We reject artificial posing. Our cinema captures the unspoken cadence: trembling whispers, quiet tear drops, and spontaneous euphoria.",
    },
    {
      icon: Compass,
      tag: "Philosophy 02",
      title: "Editorial Precision",
      description:
        "Every frame is lit, composed, and graded with the meticulous care of a feature film, creating an aesthetic that transcends decades.",
    },
    {
      icon: HeartHandshake,
      tag: "Philosophy 03",
      title: "Radical Exclusivity",
      description:
        "To ensure uncompromising artistry and personal devotion, we accept only 12 commissions each wedding season globally.",
    },
  ];

  return (
    <section id="philosophy" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#070809] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a389]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-6 border border-[#d4a389]/20">
            <Sparkles className="w-3 h-3 text-[#d4a389]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4a389] font-sans">
              The Rudra Manifesto
            </span>
          </div>

          <MaskedRevealText as="h2" className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fbf8f5] font-light leading-tight tracking-tight mb-6">
            Preserving the sacred resonance of generational love.
          </MaskedRevealText>

          <MaskedRevealText as="p" delay={0.2} className="text-base sm:text-lg text-[#fbf8f5]/70 font-sans font-light leading-relaxed">
            True luxury is not loud. It resides in the reverence for raw emotion, captured through an editorial lens that honors both tradition and modern cinematic poetry.
          </MaskedRevealText>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={idx}
                className="group relative p-8 sm:p-10 rounded-2xl glass-panel border border-white/[0.05] hover:border-[#d4a389]/40 transition-all duration-500 hover:-translate-y-1 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4a389] font-sans">
                    {item.tag}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#d4a389]/20 flex items-center justify-center group-hover:border-[#d4a389] group-hover:bg-[#d4a389]/10 transition-colors">
                    <Icon className="w-4 h-4 text-[#d4a389]" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-[#fbf8f5] font-light mb-4 group-hover:text-[#f5d5c5] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#fbf8f5]/65 font-sans font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Corner accent line */}
                <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-gradient-to-l from-[#d4a389]/40 to-transparent group-hover:w-20 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Evocative Quote Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 p-8 sm:p-12 rounded-3xl border border-[#d4a389]/20 bg-gradient-to-b from-[#131419]/60 to-[#070809]/80 backdrop-blur-xl text-center relative overflow-hidden"
        >
          <div className="w-8 h-8 mx-auto mb-4 border border-[#d4a389]/40 rotate-45 flex items-center justify-center">
            <span className="text-[#d4a389] text-xs font-serif">R</span>
          </div>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#fbf8f5] font-light italic leading-relaxed max-w-3xl mx-auto mb-4">
            &ldquo;We don&apos;t just capture weddings; we weave an heirloom tapestry where your grandchildren will witness the exact cadence of your heart.&rdquo;
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a389]/80 font-sans">
            — Rudra Digital Studio, Kosamba
          </p>
        </motion.div>
      </div>
    </section>
  );
}
