"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

export interface NavbarProps {
  onOpenInquiry?: () => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: "#narrative" },
    { label: t.nav.portfolio, href: "#showcase" },
    { label: t.nav.about, href: "#studio" },
    { label: t.nav.contact, href: "#inquire" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shouldReduceMotion = useReducedMotion();
  const [drawerAnimating, setDrawerAnimating] = useState(false);

  // Localized pre-filled WhatsApp message
  const defaultWhatsAppTexts = {
    gu: "નમસ્તે રુદ્ર ડિજિટલ સ્ટુડિયો, મારે તારીખ ખાલી છે કે નહીં તેની વિગત અને ભાવ પૂછવા છે.",
    hi: "नमस्ते रुद्र डिजिटल स्टूडियो, मुझे तारीख और रेट की जानकारी चाहिए।",
    en: "Hi Rudra Digital Studio, I'd like to check date availability and rates.",
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    defaultWhatsAppTexts[lang] || defaultWhatsAppTexts.gu
  )}`;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-8 py-3.5 sm:py-6 transition-all duration-500 pointer-events-none">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full transition-all duration-500 pointer-events-auto backdrop-blur-md ${
            scrolled
              ? "bg-[#070809]/85 border border-[var(--brand-accent)]/25 shadow-[0_10px_35px_rgba(0,0,0,0.65)] py-2 sm:py-2.5"
              : "bg-[#070809]/40 border border-white/[0.08]"
          }`}
        >
          {/* Brand Logo & Monogram */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 rounded-full border border-[var(--brand-accent)]/40 flex items-center justify-center group-hover:border-[var(--brand-accent)] transition-colors">
              <span className="font-editorial text-xs text-[var(--brand-accent)] tracking-wider font-light">
                RDS
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-base sm:text-lg tracking-[0.14em] sm:tracking-[0.18em] text-[#fbf8f5] font-light leading-none group-hover:text-[var(--brand-accent)] transition-colors">
                Rudra Digital Studio
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[var(--brand-accent)]/80 font-body mt-0.5">
                Kosamba • Gujarat
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] text-[#fbf8f5]/75 hover:text-[var(--brand-accent)] transition-colors font-body relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--brand-accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Language Selector & CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Desktop Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Desktop WhatsApp CTA */}
            <div className="hidden sm:block">
              <MagneticWrapper strength={0.25}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[var(--brand-accent)] via-[#e2b89d] to-[var(--brand-accent)] text-[#070809] font-body text-[11px] uppercase tracking-[0.18em] font-medium shadow-[0_4px_20px_rgba(212,163,137,0.3)] hover:shadow-[0_6px_25px_rgba(212,163,137,0.45)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.nav.bookWhatsapp}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </MagneticWrapper>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-[var(--brand-accent)]/30 text-[#fbf8f5] hover:text-[var(--brand-accent)] transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: "0%" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
              onAnimationStart={() => setDrawerAnimating(true)}
              onAnimationComplete={() => setDrawerAnimating(false)}
              style={{ willChange: drawerAnimating && !shouldReduceMotion ? "transform" : "auto" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#0b0c10] border-l border-[var(--brand-accent)]/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[var(--brand-accent)]/40 flex items-center justify-center">
                      <span className="font-editorial text-xs text-[var(--brand-accent)]">RDS</span>
                    </div>
                    <span className="font-editorial text-base tracking-[0.15em] text-[#fbf8f5]">
                      Rudra Studio
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full border border-white/10 text-[#fbf8f5]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Language Selector */}
                <div className="mb-6 flex justify-center">
                  <LanguageSelector />
                </div>

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="text-base tracking-[0.15em] text-[#fbf8f5]/85 hover:text-[var(--brand-accent)] py-2 border-b border-white/[0.04] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[var(--brand-accent)] text-[#070809] font-body text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.nav.bookWhatsapp}</span>
                </a>
                <p className="text-[10px] text-center text-[#fbf8f5]/50 tracking-wider">
                  Kosamba, Gujarat • Call: {siteConfig.contact.displayPhone}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
