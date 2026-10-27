"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Film, Camera, Heart, PartyPopper, UserCheck, Layers, ArrowRight, MessageCircle, MapPin, CheckCircle } from "lucide-react";
import { MaskedReveal } from "@/components/motion/MaskedReveal";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

export interface NarrativeSectionProps {
  onOpenInquiry?: () => void;
}

export function NarrativeSection({ onOpenInquiry }: NarrativeSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { t, lang } = useLanguage();

  const serviceIcons = [Film, Camera, Heart, PartyPopper, UserCheck, Layers];

  const localizedWhatsAppChat = () => {
    const text =
      lang === "gu"
        ? "નમસ્તે રુદ્ર ડિજિટલ સ્ટુડિયો, મારે તારીખ ખાલી છે કે નહીં તેની વિગત અને ભાવ પૂછવા છે."
        : lang === "hi"
        ? "नमस्ते रुद्र डिजिटल स्टूडियो, मुझे तारीख और रेट की जानकारी चाहिए।"
        : "Hi Rudra Digital Studio, I'd like to check date availability and rates.";
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="narrative" className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#070809] border-t border-[var(--brand-accent)]/15">
      <div className="max-w-7xl mx-auto">
        {/* Sticky-Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Pinned Sticky Information */}
          <div id="studio" className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-[var(--brand-accent)]/20">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--brand-accent)] font-body">
                {t.narrative.heading}
              </span>
            </div>

            <MaskedReveal
              as="h2"
              text={t.narrative.quote}
              className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#fbf8f5] font-light leading-snug tracking-tight"
            />

            {/* Why Choose Us Points */}
            <div className="space-y-3 pt-2">
              {t.narrative.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-medium text-[#fbf8f5] font-body">{pt.title}</h5>
                    <p className="text-xs text-[#fbf8f5]/65 font-body font-light mt-0.5">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio Location Card */}
            <div className="p-5 rounded-2xl glass-panel border border-white/[0.06] space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[var(--brand-accent)]/40 flex items-center justify-center font-editorial text-xs text-[var(--brand-accent)]">
                  RDS
                </div>
                <div>
                  <h4 className="font-editorial text-base sm:text-lg text-white font-light">
                    {siteConfig.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--brand-accent)] font-body">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="pt-1 flex items-start gap-2 text-xs text-[#fbf8f5]/70 font-body">
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
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <MagneticWrapper strength={0.3}>
                <a
                  href={localizedWhatsAppChat()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-accent)] text-[#070809] hover:bg-[#f5d5c5] text-xs uppercase tracking-[0.18em] font-body font-medium transition-all cursor-pointer shadow-lg whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{t.nav.bookWhatsapp}</span>
                </a>
              </MagneticWrapper>

              <MagneticWrapper strength={0.25}>
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--brand-accent)]/40 text-[var(--brand-accent)] hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/10 text-xs uppercase tracking-[0.18em] font-body transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{lang === "gu" ? "તારીખ ચેક કરો" : lang === "hi" ? "तारीख चेक करें" : "Check Date"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </MagneticWrapper>
            </div>
          </div>

          {/* Right Column: Scrolling Service Cards */}
          <div className="lg:col-span-7 space-y-6">
            {t.services.items.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              const serviceWhatsAppUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                lang === "gu"
                  ? `નમસ્તે રુદ્ર ડિજિટલ સ્ટુડિયો, મારે "${service.title}" માટે વિગત અને ભાવ પૂછવા છે.`
                  : lang === "hi"
                  ? `नमस्ते रुद्र डिजिटल स्टूडियो, मुझे "${service.title}" के लिए रेट और जानकारी चाहिए।`
                  : `Hi Rudra Digital Studio, I would like to inquire for a quote regarding "${service.title}".`
              )}`;

              const pricingSubtext =
                lang === "gu"
                  ? "તમારા બજેટમાં કસ્ટમ પેકેજ"
                  : lang === "hi"
                  ? "आपके बजट में सही पैकेज"
                  : "Pricing on Request • Tailored Package";

              return (
                <motion.article
                  key={service.id}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="p-7 sm:p-9 rounded-3xl glass-panel border border-white/[0.08] hover:border-[var(--brand-accent)]/40 transition-all duration-500 group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-2xl text-[var(--brand-accent)] font-light">
                      0{index + 1}
                    </span>
                    <div className="w-11 h-11 rounded-full border border-[var(--brand-accent)]/30 flex items-center justify-center group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[var(--brand-accent)]" />
                    </div>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#fbf8f5] font-light mb-2 group-hover:text-[var(--brand-accent)] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#fbf8f5]/75 font-body font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Pricing on Request Tag & Inquire for Quote CTA */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-[#fbf8f5]/65 font-body">
                      {pricingSubtext}
                    </span>
                    <MagneticWrapper strength={0.25}>
                      <a
                        href={serviceWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--brand-accent)]/15 hover:bg-[var(--brand-accent)] text-[var(--brand-accent)] hover:text-[#070809] border border-[var(--brand-accent)]/30 text-xs uppercase tracking-wider font-body font-medium transition-all cursor-pointer whitespace-nowrap"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.services.inquireBtn}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </MagneticWrapper>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
