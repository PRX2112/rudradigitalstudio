"use client";

import { useState } from "react";
import { Film, Clock, ArrowUpRight, MessageCircle } from "lucide-react";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { MaskedReveal } from "@/components/motion/MaskedReveal";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

export interface ShowcaseSectionProps {
  onSelectProject?: (title: string) => void;
}

export function ShowcaseSection({ onSelectProject }: ShowcaseSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { t, lang } = useLanguage();

  const works = [
    {
      id: "wedding-films",
      serviceId: "wedding",
      defaultTitle: "Royal Wedding Cinematography",
      defaultSubtitle: "Bespoke Highlight & Feature Films",
      category: "wedding",
      location: "Kosamba & Gujarat",
      duration: "Master Cinema",
      aspectRatio: "16/10",
      isWide: true,
      image: "/images/royal_palace.jpg",
      tags: ["Full-Day Documentation", "Bridal Portraits", "Cinematic Cut"],
    },
    {
      id: "pre-wedding",
      serviceId: "pre-wedding",
      defaultTitle: "Pre-Wedding Conceptual Story",
      defaultSubtitle: "Artistic Couple Chemistry",
      category: "pre-wedding",
      location: "Scenic Outdoor Gujarat",
      duration: "Curated Concept Reel",
      aspectRatio: "4/5",
      isWide: false,
      image: "/images/lake_como.jpg",
      tags: ["Drone Aerials", "Stylized Concept", "35mm Color"],
    },
    {
      id: "editorial-portraits",
      serviceId: "portraits",
      defaultTitle: "Editorial & Studio Portraits",
      defaultSubtitle: "Fine-Art Lighting & Poise",
      category: "portraits",
      location: "Rudra Studio, Kosamba",
      duration: "Studio Session",
      aspectRatio: "4/5",
      isWide: false,
      image: "/images/editorial_bw.jpg",
      tags: ["High-Definition", "Personal Branding", "Fine Art"],
    },
    {
      id: "celebrations",
      serviceId: "events",
      defaultTitle: "Ring Ceremonies & Festivities",
      defaultSubtitle: "Candid Joy & Sacred Traditions",
      category: "events",
      location: "Gujarat Heritage Venues",
      duration: "Celebration Coverage",
      aspectRatio: "16/10",
      isWide: true,
      image: "/images/intimate_vows.jpg",
      tags: ["Engagements", "Family Functions", "Candid Stills"],
    },
    {
      id: "album-design",
      serviceId: "post-production",
      defaultTitle: "Flush-Mount Heirloom Albums",
      defaultSubtitle: "Handcrafted Memories",
      category: "post-production",
      location: "Custom Hand-Bound Volumes",
      duration: "Archival Print Grade",
      aspectRatio: "16/9",
      isWide: true,
      image: "/images/tuscany_journal.jpg",
      tags: ["Multi-Cam Video Mixing", "Color Grading", "Heirloom Album"],
    },
  ];

  const filters = [
    { id: "all", label: lang === "gu" ? "બધા ફોટા" : lang === "hi" ? "सभी फोटो" : "All Portfolio" },
    { id: "wedding", label: lang === "gu" ? "લગ્ન શૂટ" : lang === "hi" ? "वेडिंग" : "Wedding Cinema" },
    { id: "pre-wedding", label: lang === "gu" ? "પ્રી-વેડિંગ" : lang === "hi" ? "प्री-वेडिंग" : "Pre-Wedding" },
    { id: "portraits", label: lang === "gu" ? "પોર્ટ્રેટ" : lang === "hi" ? "पोर्ट्रेट" : "Portraits" },
    { id: "events", label: lang === "gu" ? "ફેમિલી ઇવેન્ટ" : lang === "hi" ? "इवेंट्स" : "Celebrations" },
  ];

  const filteredWorks =
    activeFilter === "all"
      ? works
      : works.filter((w) => w.category === activeFilter);

  const pricingBadgeText =
    lang === "gu"
      ? "ભાવ પૂછવા પર"
      : lang === "hi"
      ? "रेट पूछने पर उपलब्ध"
      : "Pricing on Request";

  return (
    <section id="showcase" className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#070809] border-t border-[var(--brand-accent)]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-4 border border-[var(--brand-accent)]/20">
              <Film className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--brand-accent)] font-body">
                {lang === "gu" ? "કોસંબા સ્ટુડિયો ગેલેરી" : lang === "hi" ? "कोसम्बा स्टूडियो गैलरी" : "Curated Works • Kosamba"}
              </span>
            </div>
            <MaskedReveal
              as="h2"
              text={t.services.title}
              className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#fbf8f5] font-light tracking-tight"
            />
            <p className="mt-3 text-sm text-[#fbf8f5]/70 font-body font-light max-w-xl">
              {t.services.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-body transition-all duration-300 ${
                  activeFilter === f.id
                    ? "bg-[var(--brand-accent)] text-[#070809] font-medium shadow-[0_4px_15px_rgba(212,163,137,0.3)]"
                    : "glass-pill text-[#fbf8f5]/70 hover:text-[#fbf8f5] hover:border-[var(--brand-accent)]/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Grid with ParallaxMedia Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => {
            const isWide = work.isWide;
            const matchingService = t.services.items.find((s) => s.id === work.serviceId);
            const cardTitle = matchingService ? matchingService.title : work.defaultTitle;
            const cardDesc = matchingService ? matchingService.desc : work.defaultSubtitle;

            const cardWhatsAppUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              lang === "gu"
                ? `નમસ્તે રુદ્ર ડિજિટલ સ્ટુડિયો, મારે "${cardTitle}" માટે વિગત અને ભાવ પૂછવા છે.`
                : lang === "hi"
                ? `नमस्ते रुद्र डिजिटल स्टूडियो, मुझे "${cardTitle}" के लिए रेट और जानकारी चाहिए।`
                : `Hi Rudra Digital Studio, I would like to inquire for a quote regarding "${cardTitle}".`
            )}`;

            return (
              <div
                key={work.id}
                className={`group relative rounded-2xl overflow-hidden glass-panel border border-white/[0.08] hover:border-[var(--brand-accent)]/50 transition-all duration-500 ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* ParallaxMedia Component */}
                <ParallaxMedia
                  src={work.image}
                  alt={cardTitle}
                  aspectRatio={work.aspectRatio}
                  sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  overlay={true}
                  overlayClassName="bg-gradient-to-t from-[#070809] via-[#070809]/50 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500"
                />

                {/* Top Location & Tags */}
                <div className="absolute top-6 inset-x-6 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-[0.2em] text-[var(--brand-accent)] border border-[var(--brand-accent)]/30">
                    {work.location}
                  </span>
                  <div className="flex gap-1.5 hidden sm:flex">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[9px] tracking-widest text-[#fbf8f5]/70 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Narrative & Localized Pricing CTA */}
                <div className="absolute bottom-6 inset-x-6 z-10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--brand-accent)] font-body">
                      {cardDesc}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-accent)]/15 border border-[var(--brand-accent)]/30 text-[10px] tracking-wider text-[var(--brand-accent)] font-body whitespace-nowrap">
                      {pricingBadgeText}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
                    <div>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#fbf8f5] font-light leading-snug group-hover:text-[var(--brand-accent)] transition-colors">
                        {cardTitle}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-[#fbf8f5]/65 font-body font-light">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                          {work.duration}
                        </span>
                      </div>
                    </div>

                    {/* Magnetic Button routing to WhatsApp / Contact */}
                    <div className="shrink-0 flex items-center gap-2">
                      <MagneticWrapper strength={0.3}>
                        <a
                          href={cardWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--brand-accent)]/20 hover:bg-[var(--brand-accent)] text-[var(--brand-accent)] hover:text-[#070809] border border-[var(--brand-accent)]/40 text-[11px] uppercase tracking-wider font-body font-medium transition-all cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{t.services.inquireBtn}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </MagneticWrapper>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
