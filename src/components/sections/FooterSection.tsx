"use client";

import { useState } from "react";
import { ArrowUp, Send, CheckCircle2, Clock, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";


export function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { t, lang } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative bg-[#050607] border-t border-[var(--brand-accent)]/15 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-[#fbf8f5] overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--brand-accent)]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand Info & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[var(--brand-accent)]/40 flex items-center justify-center">
                <span className="font-editorial text-sm text-[var(--brand-accent)] tracking-wider font-light">
                  RDS
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl tracking-[0.25em] text-[#fbf8f5] font-light block leading-none">
                  RUDRA
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--brand-accent)] font-body mt-1 block">
                  Digital Studio
                </span>
              </div>
            </div>

            <p className="text-sm text-[#fbf8f5]/75 font-body font-light leading-relaxed max-w-md">
              {t.hero.subheading}
            </p>

            {/* Studio Address & Map Pin */}
            <div className="pt-2 flex items-start gap-2.5 text-xs text-[#fbf8f5]/80 font-body">
              <MapPin className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--brand-accent)] transition-colors underline-offset-2 underline"
              >
                {t.contact.address}
              </a>
            </div>

            {/* Working Hours */}
            <div className="pt-2 flex items-center gap-2.5 text-xs text-[var(--brand-accent)] font-body">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{t.contact.hours}</span>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)] font-body">
              {lang === "gu" ? "મેનુ" : lang === "hi" ? "नेविगेशन" : "Navigation"}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#fbf8f5]/75 font-body tracking-wider uppercase">
              <li>
                <a href="#showcase" className="hover:text-[var(--brand-accent)] transition-colors">
                  {t.nav.portfolio}
                </a>
              </li>
              <li>
                <a href="#narrative" className="hover:text-[var(--brand-accent)] transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[var(--brand-accent)] transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#inquire" className="hover:text-[var(--brand-accent)] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Studio Contact & Instagram (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)] font-body">
              {lang === "gu" ? "સ્ટુડિયો સંપર્ક" : lang === "hi" ? "स्टूडियो संपर्क" : "Connect With Studio"}
            </h4>

            <div className="space-y-2 text-xs text-[#fbf8f5]/80 font-body">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[var(--brand-accent)] transition-colors"
                >
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[var(--brand-accent)] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Newsletter / Journal Subscription */}
            <div className="pt-2">
              {subscribed ? (
                <div className="p-3 rounded-xl border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 flex items-center gap-2 text-xs text-[var(--brand-accent)]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{lang === "gu" ? "તમારું ઈમેલ જોડાઈ ગયું છે." : lang === "hi" ? "आपका ईमेल जुड़ गया है।" : "You are registered for studio dispatches."}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder={lang === "gu" ? "તમારું ઈમેલ એડ્રેસ" : lang === "hi" ? "आपका ईमेल एड्रेस" : "Your email address"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-[#fbf8f5] placeholder-[#fbf8f5]/35 text-xs focus:outline-none focus:border-[var(--brand-accent)] transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-4 py-2.5 rounded-full bg-[var(--brand-accent)] text-[#070809] hover:bg-[#f5d5c5] transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links with exact Instagram handle */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--brand-accent)]/30 text-[#fbf8f5] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors text-xs font-body"
                aria-label="Instagram @rudradigitalstudio_kosamba"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"/></g>
                  </svg>
                <span>{siteConfig.socials.instagramHandle}</span>
              </a>

              <a
                href={siteConfig.socials.whatsappChat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[var(--brand-accent)]/30 flex items-center justify-center text-[#fbf8f5] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors"
                aria-label="WhatsApp"
              >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-8 h-8 rounded-full border border-[var(--brand-accent)]/30 flex items-center justify-center text-[#fbf8f5] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors"
                aria-label="Email Studio"
              >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fbf8f5]/50 font-body">
          <div>
            {t.footer.rights}
          </div>

          <div className="flex items-center gap-6">
            <span>Kosamba, Gujarat</span>
            <span>•</span>
            <MagneticWrapper strength={0.2}>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-[var(--brand-accent)] hover:text-[#f5d5c5] transition-colors uppercase tracking-widest text-[11px] cursor-pointer"
              >
                {lang === "gu" ? "ઉપર જાઓ" : lang === "hi" ? "ऊपर जाएं" : "Back To Top"} <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
}
