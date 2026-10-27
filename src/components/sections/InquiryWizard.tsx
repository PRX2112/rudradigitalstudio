"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Calendar,
  Film,
  Camera,
  CheckCircle2,
  X,
  ChevronRight,
  ChevronLeft,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";
import { LUXURY_EASE } from "@/lib/motion";
import { siteConfig } from "@/config/siteConfig";

export interface InquiryWizardProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

export function InquiryWizard({ isOpen = true, onClose, isInline = false }: InquiryWizardProps) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");

  const destinations = [
    lang === "gu" ? "કોસંબા અને સુરત વિસ્તાર" : lang === "hi" ? "कोसम्बा और सूरत क्षेत्र" : "Kosamba & Surat Region",
    lang === "gu" ? "ભરૂચ અને અંકલેશ્વર" : lang === "hi" ? "भरूच और अंकलेश्वर" : "Bharuch & Ankleshwar",
    lang === "gu" ? "વડોદરા અને અમદાવાદ" : lang === "hi" ? "वडोदरा और अहमदाबाद" : "Vadodara & Ahmedabad",
    lang === "gu" ? "ડેસ્ટિનેશન વેડિંગ (રાજસ્થાન / ગોવા / ઉદયપુર)" : lang === "hi" ? "डेस्टिनेशन वेडिंग (राजस्थान / गोवा / उदयपुर)" : "Destination Wedding (Rajasthan / Goa / Udaipur)",
    lang === "gu" ? "ગુજરાતના અન્ય સ્થળો" : lang === "hi" ? "गुजरात में अन्य जगह" : "Other Gujarat Location",
  ];

  const seasons = [
    lang === "gu" ? "આગામી લગ્ન સિઝન 2026 / 2027" : lang === "hi" ? "आगामी शादी सीजन 2026 / 2027" : "Upcoming Wedding Season 2026 / 2027",
    lang === "gu" ? "પ્રી-વેડિંગ શૂટ (આવતા 30–60 દિવસ)" : lang === "hi" ? "प्री-वेडिंग शूट (अगले 30–60 दिन)" : "Pre-Wedding Shoot (Next 30–60 Days)",
    lang === "gu" ? "સગાઈ / રિંગ સેરેમની" : lang === "hi" ? "सगाई / रिंग सेरेमनी" : "Engagement / Ring Ceremony",
    lang === "gu" ? "કોઈપણ ચોક્કસ તારીખ નક્કી છે" : lang === "hi" ? "तारीख फिक्स तय है" : "Specific Fixed Date",
  ];

  // Form State
  const [formData, setFormData] = useState({
    destination: destinations[0],
    dateSeason: seasons[0],
    packageType: t.services.items[0]?.title || "Wedding Photography",
    names: "",
    email: "",
    phone: "",
    notes: "",
  });

  const packages = t.services.items.map((s, idx) => ({
    id: s.id,
    title: s.title,
    desc: s.desc,
    icon: idx % 2 === 0 ? Film : Camera,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate clean language-specific WhatsApp text payload
    let textMessage = "";
    if (lang === "gu") {
      textMessage = [
        `નમસ્તે રુદ્ર સ્ટુડિયો, મારું નામ ${formData.names || "ગ્રાહક"} છે.`,
        `મારે ${formData.packageType} માટે ${formData.dateSeason} તારીખે બુકિંગ / ભાવની માહિતી જોઈએ છે.`,
        `• સ્થળ: ${formData.destination}`,
        formData.phone ? `• સંપર્ક નંબર: ${formData.phone}` : "",
        formData.email ? `• ઈમેલ: ${formData.email}` : "",
        formData.notes ? `• વિશેષ નોંધ: ${formData.notes}` : "",
        `\n(રુદ્ર ડિજિટલ સ્ટુડિયો વેબસાઇટ દ્વારા મોકલેલ)`,
      ]
        .filter(Boolean)
        .join("\n");
    } else if (lang === "hi") {
      textMessage = [
        `नमस्ते रुद्र स्टूडियो, मेरा नाम ${formData.names || "ग्राहक"} है।`,
        `मुझे ${formData.packageType} के लिए ${formData.dateSeason} तारीख पर बुकिंग / रेट की जानकारी चाहिए।`,
        `• लोकेशन: ${formData.destination}`,
        formData.phone ? `• संपर्क नंबर: ${formData.phone}` : "",
        formData.email ? `• ईमेल: ${formData.email}` : "",
        formData.notes ? `• विशेष नोट: ${formData.notes}` : "",
        `\n(रुद्र डिजिटल स्टूडियो वेबसाइट द्वारा भेजा गया)`,
      ]
        .filter(Boolean)
        .join("\n");
    } else {
      textMessage = [
        `Hello Rudra Studio, my name is ${formData.names || "Client"}.`,
        `I would like to inquire about booking / rates for ${formData.packageType} on ${formData.dateSeason}.`,
        `• Location: ${formData.destination}`,
        formData.phone ? `• Contact: ${formData.phone}` : "",
        formData.email ? `• Email: ${formData.email}` : "",
        formData.notes ? `• Notes: ${formData.notes}` : "",
        `\n(Sent via Rudra Digital Studio Website)`,
      ]
        .filter(Boolean)
        .join("\n");
    }

    const waLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(textMessage)}`;
    setGeneratedWhatsAppUrl(waLink);
    setSubmitted(true);

    // Launch celebratory gold confetti
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d4a389", "#f5d5c5", "#c5a059", "#ffffff"],
      });
    } catch {
      // Confetti fallback
    }

    // Automatically trigger WhatsApp redirect
    if (typeof window !== "undefined") {
      window.open(waLink, "_blank");
    }
  };

  const content = (
    <div className={`relative ${isInline ? "w-full max-w-4xl mx-auto" : "w-full max-w-2xl mx-auto"}`}>
      {/* Container Box */}
      <div className="relative rounded-3xl glass-panel border border-[var(--brand-accent)]/30 p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand-accent)]/[0.05] rounded-full blur-[100px] pointer-events-none" />

        {!isInline && onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-pill text-[#fbf8f5] hover:text-[var(--brand-accent)] transition-colors cursor-pointer"
            aria-label="Close inquiry window"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Studio Direct Contact Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-3 border border-[var(--brand-accent)]/20">
            <Sparkles className="w-3 h-3 text-[var(--brand-accent)]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--brand-accent)] font-body">
              {lang === "gu" ? "કોસંબા સ્ટુડિયો સંપર્ક" : lang === "hi" ? "कोसम्बा स्टूडियो संपर्क" : "Kosamba Studio Bookings"}
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-4xl text-[#fbf8f5] font-light">
            {t.contact.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#fbf8f5]/70 font-body font-light mt-1">
            {t.contact.subtitle}
          </p>

          {/* Quick Studio Contact Bar */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-4 text-xs font-body text-[#fbf8f5]/80">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 hover:text-[var(--brand-accent)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>{t.contact.callUs}: {siteConfig.contact.displayPhone}</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--brand-accent)] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>{t.nav.bookWhatsapp}</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[var(--brand-accent)] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>

          {/* Studio Address with Google Maps link */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-body text-[#fbf8f5]/75">
            <MapPin className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
            <a
              href={siteConfig.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--brand-accent)] transition-colors underline-offset-2 underline text-center"
            >
              {t.contact.address}
            </a>
          </div>

          {/* Step Dots */}
          {!submitted && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === i ? "w-8 bg-[var(--brand-accent)]" : step > i ? "w-3 bg-[var(--brand-accent)]/50" : "w-3 bg-white/10"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Wizard Steps */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full border border-[var(--brand-accent)] mx-auto mb-6 flex items-center justify-center bg-[var(--brand-accent)]/10 shadow-[0_0_30px_rgba(212,163,137,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-[var(--brand-accent)]" />
              </div>
              <h4 className="font-editorial text-2xl sm:text-3xl text-[#fbf8f5] font-light mb-2">
                {lang === "gu" ? "માહિતી તૈયાર થઈ ગઈ છે!" : lang === "hi" ? "जानकारी तैयार हो गई है!" : "Inquiry Prepared Successfully"}
              </h4>
              <p className="text-sm text-[#fbf8f5]/75 font-body font-light max-w-md mx-auto leading-relaxed mb-6">
                {lang === "gu"
                  ? `${formData.names || "આભાર"}. તમારી વિગત સીધી વોટ્સએપ પર મોકલવા માટે નીચેનું બટન દબાવો.`
                  : lang === "hi"
                  ? `${formData.names || "धन्यवाद"}. अपनी जानकारी सीधे व्हाट्सएप पर भेजने के लिए नीचे क्लिक करें।`
                  : `Thank you, ${formData.names || "Client"}. Click below to dispatch your booking details directly on WhatsApp.`}
              </p>

              {/* Direct WhatsApp CTA */}
              {generatedWhatsAppUrl && (
                <div className="mb-8">
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--brand-accent)] text-[#070809] font-body text-xs sm:text-sm uppercase tracking-wider font-medium shadow-lg hover:bg-[#f5d5c5] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.submitBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Summary Card with Studio Address */}
              <div className="p-4 rounded-xl glass-panel max-w-md mx-auto text-left text-xs text-[#fbf8f5]/75 space-y-1.5 mb-6">
                <div><strong className="text-[var(--brand-accent)]">{t.contact.eventLabel}:</strong> {formData.packageType}</div>
                <div><strong className="text-[var(--brand-accent)]">{t.contact.dateLabel}:</strong> {formData.dateSeason}</div>
                <div><strong className="text-[var(--brand-accent)]">સ્થળ / Location:</strong> {formData.destination}</div>
                <div className="pt-2 border-t border-white/[0.08]">
                  <strong className="text-[var(--brand-accent)]">Studio:</strong>{" "}
                  <a
                    href={siteConfig.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[var(--brand-accent)]"
                  >
                    {t.contact.address}
                  </a>
                </div>
              </div>

              {!isInline && onClose && (
                <MagneticButton onClick={onClose} variant="primary" className="px-8 py-3">
                  {lang === "gu" ? "પાછા જાઓ" : lang === "hi" ? "वापस जाएं" : "Return To Portfolio"}
                </MagneticButton>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Destination Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <label className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-body mb-3 text-center">
                    {lang === "gu" ? "તમારો પ્રસંગ કઈ જગ્યાએ છે?" : lang === "hi" ? "कार्यक्रम किस जगह है?" : "Where will your event or shoot take place?"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destinations.map((dest) => (
                      <button
                        type="button"
                        key={dest}
                        onClick={() => setFormData({ ...formData, destination: dest })}
                        className={`p-4 rounded-xl text-left text-xs sm:text-sm font-body tracking-wide transition-all border cursor-pointer ${
                          formData.destination === dest
                            ? "border-[var(--brand-accent)] bg-[var(--brand-accent)]/15 text-[#fbf8f5] shadow-[0_0_20px_rgba(212,163,137,0.2)]"
                            : "border-white/[0.08] glass-panel text-[#fbf8f5]/70 hover:border-white/25 hover:text-[#fbf8f5]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-[var(--brand-accent)]" />
                          <span>{dest}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end pt-6">
                    <MagneticButton
                      onClick={() => setStep(2)}
                      variant="primary"
                      className="py-3 px-7"
                    >
                      {lang === "gu" ? "આગળ: પ્રસંગની તારીખ" : lang === "hi" ? "आगे: तारीख" : "Next: Event Dates"} <ChevronRight className="w-4 h-4 ml-1" />
                    </MagneticButton>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date / Season Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <label className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-body mb-3 text-center">
                    {t.contact.dateLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {seasons.map((season) => (
                      <button
                        type="button"
                        key={season}
                        onClick={() => setFormData({ ...formData, dateSeason: season })}
                        className={`p-4 rounded-xl text-left text-xs sm:text-sm font-body tracking-wide transition-all border cursor-pointer ${
                          formData.dateSeason === season
                            ? "border-[var(--brand-accent)] bg-[var(--brand-accent)]/15 text-[#fbf8f5] shadow-[0_0_20px_rgba(212,163,137,0.2)]"
                            : "border-white/[0.08] glass-panel text-[#fbf8f5]/70 hover:border-white/25 hover:text-[#fbf8f5]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[var(--brand-accent)]" />
                          <span>{season}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs uppercase tracking-widest text-[#fbf8f5]/60 hover:text-[#fbf8f5] flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> {lang === "gu" ? "પાછળ" : lang === "hi" ? "पीछे" : "Back"}
                    </button>
                    <MagneticButton
                      onClick={() => setStep(3)}
                      variant="primary"
                      className="py-3 px-7"
                    >
                      {lang === "gu" ? "આગળ: સેવા પસંદ કરો" : lang === "hi" ? "आगे: सेवा चुनें" : "Next: Select Service"} <ChevronRight className="w-4 h-4 ml-1" />
                    </MagneticButton>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Service Selection */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <label className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-body mb-3 text-center">
                    {t.contact.eventLabel}
                  </label>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {packages.map((pkg) => {
                      const Icon = pkg.icon;
                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => setFormData({ ...formData, packageType: pkg.title })}
                          className={`w-full p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                            formData.packageType === pkg.title
                              ? "border-[var(--brand-accent)] bg-[var(--brand-accent)]/15 text-[#fbf8f5] shadow-[0_0_20px_rgba(212,163,137,0.2)]"
                              : "border-white/[0.08] glass-panel text-[#fbf8f5]/70 hover:border-white/25 hover:text-[#fbf8f5]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 shrink-0">
                              <Icon className="w-4 h-4 text-[var(--brand-accent)]" />
                            </div>
                            <div>
                              <h5 className="font-editorial text-lg text-white font-light">
                                {pkg.title}
                              </h5>
                              <p className="text-xs text-[#fbf8f5]/65 font-body font-light line-clamp-1">
                                {pkg.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-widest text-[#fbf8f5]/60 hover:text-[#fbf8f5] flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> {lang === "gu" ? "પાછળ" : lang === "hi" ? "पीछे" : "Back"}
                    </button>
                    <MagneticButton
                      onClick={() => setStep(4)}
                      variant="primary"
                      className="py-3 px-7"
                    >
                      {lang === "gu" ? "આગળ: તમારી વિગત" : lang === "hi" ? "आगे: संपर्क" : "Next: Your Details"} <ChevronRight className="w-4 h-4 ml-1" />
                    </MagneticButton>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact & Notes */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <label className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-body mb-3 text-center">
                    {lang === "gu" ? "તમારી વિગત દાખલ કરો (વોટ્સએપ મેસેજ તૈયાર થશે)" : lang === "hi" ? "अपनी जानकारी दर्ज करें (व्हाट्सएप संदेश बनेगा)" : "Enter Contact Details (Generates WhatsApp Message)"}
                  </label>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={`${t.contact.nameLabel} *`}
                        value={formData.names}
                        onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#fbf8f5] placeholder-[#fbf8f5]/35 text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-accent)] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="tel"
                        required
                        placeholder={`${t.contact.phoneLabel} *`}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#fbf8f5] placeholder-[#fbf8f5]/35 text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-accent)] transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#fbf8f5] placeholder-[#fbf8f5]/35 text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        placeholder={
                          lang === "gu"
                            ? "તારીખ, પ્રસંગનું સ્થળ અથવા કોઈ ખાસ વિગત લખો..."
                            : lang === "hi"
                            ? "तारीख, वेन्यू या कोई खास बात लिखें..."
                            : "Specific event dates, venue name in Kosamba/Gujarat, or special requests..."
                        }
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#fbf8f5] placeholder-[#fbf8f5]/35 text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-accent)] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs uppercase tracking-widest text-[#fbf8f5]/60 hover:text-[#fbf8f5] flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> {lang === "gu" ? "પાછળ" : lang === "hi" ? "पीछे" : "Back"}
                    </button>
                    <MagneticButton
                      variant="primary"
                      className="py-3.5 px-8"
                    >
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      {t.contact.submitBtn}
                    </MagneticButton>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (isInline) {
    return (
      <section id="inquire" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#070809] border-t border-[var(--brand-accent)]/15">
        {content}
      </section>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            className="relative z-10 w-full"
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
