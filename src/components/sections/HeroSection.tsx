"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useInView } from "framer-motion";
import { ArrowDown, Sparkles, MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";
import { LUXURY_EASE } from "@/lib/motion";

interface HeroSectionProps {
  onOpenInquiry: () => void;
}

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  // Accessibility support via useReducedMotion()
  const shouldReduceMotion = useReducedMotion();

  // Viewport tracking for active-only will-change allocation
  const isInView = useInView(containerRef);

  // Framer Motion scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Physical spring smoothing for scroll parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yImage = useTransform(smoothProgress, [0, 1], ["0%", "18%"]);
  const scaleImage = useTransform(smoothProgress, [0, 1], [1, 1.08]);
  const yContent = useTransform(smoothProgress, [0, 1], ["0px", "90px"]);
  const opacityContent = useTransform(smoothProgress, [0, 0.65], [1, 0]);

  const handleScrollDown = () => {
    const showcaseSection = document.getElementById("showcase");
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappInquiryTexts = {
    gu: "નમસ્તે રુદ્ર સ્ટુડિયો, મારે ફોટોશૂટ અને વિડીયો શૂટ માટે ભાવ પૂછવા છે.",
    hi: "नमस्ते रुद्र स्टूडियो, मुझे फोटोशूट और वीडियो शूट के रेट जानने हैं।",
    en: "Hi Rudra Studio, I would like to inquire about shoot rates.",
  };

  const heroWhatsAppUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    whatsappInquiryTexts[lang] || whatsappInquiryTexts.gu
  )}`;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-end justify-center select-none pt-24 pb-16"
    >
      {/* Background Image with Framer Motion Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          y: shouldReduceMotion ? 0 : yImage,
          scale: shouldReduceMotion ? 1 : scaleImage,
          willChange: isInView && !shouldReduceMotion ? "transform" : "auto",
        }}
      >
        <Image
          src="/images/hero_wedding.jpg"
          alt="Rudra Digital Studio Kosamba Wedding Photography"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/50 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,8,9,0.3)_60%,rgba(7,8,9,0.85)_100%)]" />
      </motion.div>

      {/* Subtle Dust particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
          <div className="absolute w-1 h-1 bg-[#d4a389] rounded-full top-[25%] left-[20%] animate-pulse" />
          <div className="absolute w-1.5 h-1.5 bg-[#f5d5c5] rounded-full top-[45%] left-[70%] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute w-1 h-1 bg-[#d4a389] rounded-full top-[75%] left-[35%] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      )}

      {/* Hero Editorial Content */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-16 sm:pb-24"
        style={shouldReduceMotion ? {} : { y: yContent, opacity: opacityContent }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-5 border border-[var(--brand-accent)]/25"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
          <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#fbf8f5]/90 font-body">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headlines with dynamic language support */}
        <div className="space-y-2 mb-6">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: LUXURY_EASE }}
          >
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#fbf8f5] font-light leading-[1.15]">
              {t.hero.heading1}
            </h1>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: LUXURY_EASE }}
          >
            <span className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--brand-accent)] block leading-[1.2] font-normal">
              {t.hero.heading2}
            </span>
          </motion.div>
        </div>

        {/* Subtitle / Subheading */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: LUXURY_EASE }}
          className="text-sm sm:text-base md:text-lg text-[#fbf8f5]/85 max-w-2xl mx-auto font-body font-light tracking-wide leading-relaxed mb-8 drop-shadow-md"
        >
          {t.hero.subheading}
        </motion.p>

        {/* Interactive CTA buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.95, ease: LUXURY_EASE }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href={heroWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--brand-accent)] text-[#070809] hover:bg-[#f5d5c5] font-body text-xs sm:text-sm uppercase tracking-[0.18em] font-medium shadow-[0_4px_25px_rgba(212,163,137,0.35)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{t.hero.ctaPrimary}</span>
          </a>

          <MagneticButton
            onClick={handleScrollDown}
            variant="outline"
            id="hero-explore-cta"
            className="px-6 py-3.5 text-xs sm:text-sm tracking-[0.18em]"
          >
            {t.hero.ctaSecondary}
            <ArrowDown className="w-3.5 h-3.5 ml-1.5" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center">
        <ScrollProgressIndicator />
      </div>
    </section>
  );
}
