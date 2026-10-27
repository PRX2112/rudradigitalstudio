"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { MaskedRevealText } from "@/components/ui/MaskedRevealText";
import { fadeUpVariant } from "@/lib/motion";

export function EditorialSpread() {
  return (
    <section id="stories" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#070809] border-t border-[#d4a389]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-4 border border-[#d4a389]/20">
            <BookOpen className="w-3.5 h-3.5 text-[#d4a389]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4a389] font-sans">
              Editorial Journal • Volume VII
            </span>
          </div>
          <MaskedRevealText as="h2" className="font-serif text-3xl sm:text-5xl text-[#fbf8f5] font-light tracking-tight">
            The Wedding Journal
          </MaskedRevealText>
          <p className="mt-4 text-sm sm:text-base text-[#fbf8f5]/65 font-sans font-light">
            Reflections, still frames, and intimate chronicles from real celebrations captured across the globe.
          </p>
        </div>

        {/* Editorial Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Vertical Large Editorial Portrait */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden glass-panel border border-[#d4a389]/30 shadow-2xl">
              <Image
                src="/images/editorial_bw.jpg"
                alt="Monochrome Bridal Editorial Portrait by Rudra Digital Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              {/* Editorial stamp */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#fbf8f5]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4a389] font-sans block mb-1">
                    Editorial Study
                  </span>
                  <h4 className="font-serif text-xl text-white font-light">
                    The Architecture of Stillness
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#d4a389]/40 flex items-center justify-center font-serif text-xs text-[#d4a389]">
                  RDS
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Magazine Spread Narrative & Horizontal Still */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-2xl glass-panel border border-white/[0.06]"
            >
              <div className="flex items-center gap-3 text-xs text-[#d4a389] tracking-widest uppercase font-mono mb-4">
                <span>Vogue Weddings Feature</span>
                <span>•</span>
                <span>Issue Autumn 2026</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf8f5] font-light leading-snug mb-4">
                &ldquo;A cinematic homage that turns ephemeral vows into classical art.&rdquo;
              </h3>

              <p className="text-sm sm:text-base text-[#fbf8f5]/75 font-sans font-light leading-relaxed mb-6">
                When capturing an international destination wedding, our directive is to mirror the elegance of cinema masterpieces. We allow the authentic gravity of family heritage, heritage palaces, and private estates to unfold with zero artificial staging.
              </p>

              {/* Smaller Horizontal Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#d4a389]/20 shadow-lg mb-6">
                <Image
                  src="/images/tuscany_journal.jpg"
                  alt="Tuscan Wedding Getaway by Rudra Digital Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs text-[#fbf8f5]/80 font-sans tracking-wider">
                  The Val d&apos;Orcia Twilight Getaway • Lucas & Isabella
                </div>
              </div>

              <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#d4a389] font-sans pt-2">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Read Full Feature Spread
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
