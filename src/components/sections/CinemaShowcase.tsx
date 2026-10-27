"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, X, MapPin, Film, Clock, Heart } from "lucide-react";
import { MaskedRevealText } from "@/components/ui/MaskedRevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LUXURY_EASE, fadeUpVariant } from "@/lib/motion";

interface FilmItem {
  id: string;
  title: string;
  subtitle: string;
  category: "palace" | "coast" | "vows" | "editorial";
  location: string;
  duration: string;
  year: string;
  image: string;
  description: string;
  specs: string;
}

export function CinemaShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedFilm, setSelectedFilm] = useState<FilmItem | null>(null);

  const films: FilmItem[] = [
    {
      id: "palace-udaipur",
      title: "The Royal Ode to Udaipur",
      subtitle: "Aarav & Meera • Heritage Wedding Film",
      category: "palace",
      location: "City Palace, Udaipur",
      duration: "18 mins Master Film",
      year: "2026",
      image: "/images/royal_palace.jpg",
      description:
        "Three days of royal pageantry under illuminated marble archways, candlelit courtyard banquets, and petal rain during the sacred pheras.",
      specs: "Shot on ARRI Alexa Mini LF • 2.39:1 Anamorphic • Master Atmos Mix",
    },
    {
      id: "lake-como",
      title: "Amore Sul Lago",
      subtitle: "Julian & Sophia • Italian Villa Celebration",
      category: "coast",
      location: "Villa Balbiano, Lake Como",
      duration: "14 mins Cinema Cut",
      year: "2026",
      image: "/images/lake_como.jpg",
      description:
        "A sun-drenched cruise along Lake Como in a classic mahogany Riva speedboat followed by a twilight banquet overlooking dramatic alpine peaks.",
      specs: "Shot on RED V-Raptor 8K • Cooke Anamorphic /i • 35mm Kodak 5219 Grade",
    },
    {
      id: "editorial-veil",
      title: "The Alabaster Veil",
      subtitle: "Elena & Christian • Fine-Art Editorial",
      category: "editorial",
      location: "Private Chateau, France",
      duration: "Exhibition Gallery",
      year: "2026",
      image: "/images/editorial_bw.jpg",
      description:
        "Monochrome masterworks capturing delicate French lace veils, architectural natural window illumination, and profound quiet poise.",
      specs: "Hasselblad H6D-100c • Monochromatic Silver Halide Emulation",
    },
    {
      id: "intimate-vows",
      title: "Whispered Under Starlight",
      subtitle: "Dev & Ananya • Twilight Garden Vows",
      category: "vows",
      location: "Chateau de Tourreau, Provence",
      duration: "12 mins Teaser Film",
      year: "2025",
      image: "/images/intimate_vows.jpg",
      description:
        "An enchanting twilight ceremony beneath cascading white wisteria arches, surrounded by hundreds of hand-poured beeswax pillar candles.",
      specs: "Sony FX9 Low-Light Dual ISO • Vintage Super Baltar Lenses",
    },
    {
      id: "tuscany-getaway",
      title: "The Val d'Orcia Departure",
      subtitle: "Lucas & Isabella • Tuscan Evening Escape",
      category: "coast",
      location: "Siena, Tuscany",
      duration: "10 mins Featurette",
      year: "2025",
      image: "/images/tuscany_journal.jpg",
      description:
        "A romantic dusk getaway in a vintage Alfa Romeo winding along iconic cypress hills as twilight mist envelopes the Italian valley.",
      specs: "16mm Kodak Vision3 500T Scan • Custom Nostalgic Color Space",
    },
  ];

  const categories = [
    { id: "all", label: "All Masterworks" },
    { id: "palace", label: "Heritage Palaces" },
    { id: "coast", label: "Lakes & Coasts" },
    { id: "vows", label: "Intimate Vows" },
    { id: "editorial", label: "Editorial Stills" },
  ];

  const filteredFilms =
    activeCategory === "all"
      ? films
      : films.filter((f) => f.category === activeCategory);

  return (
    <section id="cinema" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#070809] border-t border-[#d4a389]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-4 border border-[#d4a389]/20">
              <Film className="w-3.5 h-3.5 text-[#d4a389]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4a389] font-sans">
                Curated Cinema Stream
              </span>
            </div>
            <MaskedRevealText as="h2" className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#fbf8f5] font-light tracking-tight">
              Selected Masterworks
            </MaskedRevealText>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#d4a389] text-[#070809] font-medium shadow-[0_4px_15px_rgba(212,163,137,0.3)]"
                    : "glass-pill text-[#fbf8f5]/70 hover:text-[#fbf8f5] hover:border-[#d4a389]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredFilms.map((film, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <motion.div
                  key={film.id}
                  layout
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  custom={index}
                  className={`group relative rounded-2xl overflow-hidden glass-panel border border-white/[0.06] hover:border-[#d4a389]/50 transition-all duration-500 cursor-pointer ${
                    isLarge ? "md:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
                  }`}
                  onClick={() => setSelectedFilm(film)}
                >
                  {/* Next.js Image with explicit fill and sizes for CLS prevention */}
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Floating Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full glass-pill border border-[#d4a389]/50 flex items-center justify-center group-hover:scale-115 group-hover:border-[#d4a389] group-hover:bg-[#d4a389]/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
                      <Play className="w-6 h-6 text-[#d4a389] fill-[#d4a389] ml-1" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-6 inset-x-6 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full glass-pill text-[9.5px] uppercase tracking-[0.25em] text-[#d4a389] border border-[#d4a389]/30">
                      {film.location}
                    </span>
                    <span className="px-3 py-1 rounded-full glass-pill text-[9.5px] tracking-widest text-[#fbf8f5]/70">
                      {film.year}
                    </span>
                  </div>

                  {/* Bottom Text Information */}
                  <div className="absolute bottom-6 inset-x-6">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4a389] mb-1 font-sans">
                      {film.subtitle}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf8f5] font-light leading-snug group-hover:text-[#f5d5c5] transition-colors">
                      {film.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-3 text-xs text-[#fbf8f5]/60 font-sans font-light">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#d4a389]" />
                        {film.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Film Teaser Modal */}
        <AnimatePresence>
          {selectedFilm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={() => setSelectedFilm(null)}
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: LUXURY_EASE }}
                className="relative w-full max-w-4xl rounded-3xl glass-panel border border-[#d4a389]/30 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFilm(null)}
                  className="absolute top-5 right-5 z-20 p-2.5 rounded-full glass-pill text-[#fbf8f5] hover:text-[#d4a389] transition-colors"
                  aria-label="Close film preview"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Theater Preview Area */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <Image
                    src={selectedFilm.image}
                    alt={selectedFilm.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover object-center animate-[pulse_6s_ease-in-out_infinite]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-transparent to-black/40" />

                  {/* Cinema Screen Frame Embellishment */}
                  <div className="absolute inset-x-8 top-8 flex items-center justify-between text-xs tracking-widest text-white/50 uppercase font-mono">
                    <span>[ REC ] 8K RAW</span>
                    <span>23.976 FPS • 2.39:1</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full glass-pill border border-[#d4a389] flex items-center justify-center shadow-[0_0_40px_rgba(212,163,137,0.5)]">
                        <Play className="w-8 h-8 text-[#d4a389] fill-[#d4a389] ml-1" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.3em] text-[#d4a389] font-sans">
                        Cinema Master Screening
                      </span>
                    </div>
                  </div>
                </div>

                {/* Film Details */}
                <div className="p-8 sm:p-10 bg-[#0d0e12]">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-[#d4a389] border border-[#d4a389]/30">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedFilm.location}
                    </span>
                    <span className="px-3 py-1 rounded-full glass-pill text-xs text-white/70">
                      {selectedFilm.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf8f5] font-light mb-3">
                    {selectedFilm.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#fbf8f5]/75 font-sans font-light leading-relaxed mb-6">
                    {selectedFilm.description}
                  </p>

                  <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs text-[#d4a389]/80 font-mono">
                      {selectedFilm.specs}
                    </span>
                    <MagneticButton
                      onClick={() => setSelectedFilm(null)}
                      variant="primary"
                      className="py-2.5 px-6"
                    >
                      Inquire About This Vibe
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
