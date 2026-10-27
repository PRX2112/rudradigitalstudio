"use client";

import { useState } from "react";
import { CurtainReveal } from "@/components/ui/CurtainReveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { NarrativeSection } from "@/components/sections/NarrativeSection";
import { KindWords } from "@/components/sections/KindWords";
import { InquiryWizard } from "@/components/sections/InquiryWizard";
import { FooterSection } from "@/components/sections/FooterSection";
// import { AmbientSoundToggle } from "@/components/ui/AmbientSoundToggle";

export function MainExperience() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  return (
    <CurtainReveal>
      {/* 2px Minimalist Fixed Scroll Progress */}
      <ScrollProgress position="top" />

      {/* Film Grain Texture Layer */}
      <div className="film-grain" />

      {/* Fixed Glassmorphism Navbar with Magnetic CTA & Mobile Drawer */}
      <Navbar onOpenInquiry={() => setIsInquiryModalOpen(true)} />

      {/* Main Structural Flow */}
      <main className="relative z-10 w-full overflow-hidden bg-[var(--brand-bg)]">
        {/* 1. Hero Section with Masked Typography and Scroll Cue */}
        <HeroSection onOpenInquiry={() => setIsInquiryModalOpen(true)} />

        {/* 2. Trust & Accolades Banner */}
        <TrustBanner />

        {/* 3. Showcase Section with ParallaxMedia Cards & Staggered Reveals */}
        <ShowcaseSection onSelectProject={() => setIsInquiryModalOpen(true)} />

        {/* 4. Sticky-Split Narrative Section: Pinned Left & Scrolling Story Cards */}
        <NarrativeSection onOpenInquiry={() => setIsInquiryModalOpen(true)} />

        {/* 5. Client Reverence & Testimonials */}
        <KindWords />

        {/* 6. Inline Conversational Inquiry Wizard */}
        <InquiryWizard isInline={true} />
      </main>

      {/* 7. Minimalist Footer with Newsletter & Social Links */}
      <FooterSection />

      {/* Floating Ambient Sound Toggle in Corner
      <AmbientSoundToggle /> */}

      {/* Conversational Inquiry Modal Triggered by CTAs */}
      <InquiryWizard
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        isInline={false}
      />
    </CurtainReveal>
  );
}
