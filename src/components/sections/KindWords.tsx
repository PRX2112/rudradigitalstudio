"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, Heart, MapPin } from "lucide-react";
import { MaskedRevealText } from "@/components/ui/MaskedRevealText";
import { fadeUpVariant } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageContext";

export function KindWords() {
  const shouldReduceMotion = useReducedMotion();
  const { lang } = useLanguage();

  const testimonials = [
    {
      couple: lang === "gu" ? "પ્રિયા & સિદ્ધાર્થ" : lang === "hi" ? "प्रिया और सिद्धार्थ" : "Priya & Siddharth",
      location: lang === "gu" ? "સુરત રોયલ વેડિંગ" : lang === "hi" ? "सूरत रॉयल वेडिंग" : "Surat Royal Celebration",
      date: lang === "gu" ? "લગ્ન પ્રસંગ" : lang === "hi" ? "शादी समारोह" : "Spring Wedding",
      quote:
        lang === "gu"
          ? "રુદ્ર ડિજિટલ સ્ટુડિયોની ટીમે અમારા લગ્નનું શૂટિંગ એક ફિલ્મ જેવું કર્યું. બધા સંબંધીઓએ વિડીયો અને ફોટો આલ્બમના ખૂબ વખાણ કર્યા."
          : lang === "hi"
          ? "रुद्र डिजिटल स्टूडियो की टीम ने हमारी शादी की रिकॉर्डिंग बिल्कुल मूवी जैसी की। सबने हमारे वीडियो और एल्बम की बहुत तारीफ की।"
          : "Watching our master film felt like watching a sweeping romantic feature film. The Rudra Digital Studio team moved gently and captured the most intimate glances.",
      rating: 5,
    },
    {
      couple: lang === "gu" ? "પૂજા & હર્ષ" : lang === "hi" ? "पूजा और हर्ष" : "Pooja & Harsh",
      location: lang === "gu" ? "કોસંબા & ભરૂચ" : lang === "hi" ? "कोसम्बा और भरूच" : "Kosamba & Bharuch Celebration",
      date: lang === "gu" ? "પ્રી-વેડિંગ અને સગાઈ" : lang === "hi" ? "प्री-वेडिंग और सगाई" : "Pre-Wedding & Ceremony",
      quote:
        lang === "gu"
          ? "અમારું પ્રી-વેડિંગ શૂટ એટલું સુંદર બનાવ્યું કે અમારો પરિવાર જોઈને ખુશ થઈ ગયો. સમયસર આલ્બમ અને વિડીયો મળી ગયો."
          : lang === "hi"
          ? "हमारा प्री-वेडिंग शूट इतना शानदार रहा कि पूरा परिवार देखकर खुश हो गया। समय पर एल्बम और वीडियो दोनों मिल गए।"
          : "The sheer poetry of our wedding film left our families weeping during our private screening. Modern editing and timely delivery.",
      rating: 5,
    },
    {
      couple: lang === "gu" ? "અનન્યા & રોહન" : lang === "hi" ? "अनन्या और रोहन" : "Ananya & Rohan",
      location: lang === "gu" ? "ગુજરાત હેરિટેજ વેડિંગ" : lang === "hi" ? "गुजरात हेरिटेज वेडिंग" : "Heritage Palace Destination",
      date: lang === "gu" ? "ફેમિલી ઉત્સવ" : lang === "hi" ? "पारिवारिक उत्सव" : "Royal Celebration",
      quote:
        lang === "gu"
          ? "રુદ્ર સ્ટુડિયોનું કામ ખૂબ જ ઈમાનદાર અને શ્રેષ્ઠ છે. દરેક પળ ખૂબ જ સ્પષ્ટ કેમેરામાં સાચવી રાખી છે. અમારા આજીવન સંભારણા બની ગયા."
          : lang === "hi"
          ? "रुद्र स्टूडियो का काम बहुत ही बढ़िया और ईमानदार है। हर रस्म को बहुत ही खूबसूरती से कैमरे में कैद किया है।"
          : "Rudra Digital Studio delivered pure magic. They built an archival memory and handcrafted heirloom album that we will cherish for generations.",
      rating: 5,
    },
  ];

  const sectionHeading =
    lang === "gu"
      ? "ગ્રાહકોનો સંતોષ અને અનુભવ"
      : lang === "hi"
      ? "ग्राहकों का भरोसा और अनुभव"
      : "Words of Reverence";

  const sectionSubheading =
    lang === "gu"
      ? "કોસંબા અને ગુજરાતના જે પરિવારોએ અમારા પર વિશ્વાસ મૂક્યો તેમના અનુભવો."
      : lang === "hi"
      ? "कोसम्बा और आसपास के परिवारों का हमारे काम के प्रति सच्चा अनुभव।"
      : "Reflections from families who trusted us with their once-in-a-lifetime celebrations.";

  return (
    <section id="testimonials" className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#070809] border-t border-[#d4a389]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-4 border border-[#d4a389]/20">
            <Heart className="w-3.5 h-3.5 text-[#d4a389]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4a389] font-body">
              {lang === "gu" ? "ગ્રાહકોના રિવ્યુ" : lang === "hi" ? "ग्राहक समीक्षा" : "Client Testimonials"}
            </span>
          </div>
          <MaskedRevealText as="h2" className="font-editorial text-3xl sm:text-5xl text-[#fbf8f5] font-light tracking-tight">
            {sectionHeading}
          </MaskedRevealText>
          <p className="mt-3 text-sm sm:text-base text-[#fbf8f5]/70 font-body font-light">
            {sectionSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={shouldReduceMotion ? undefined : fadeUpVariant}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-50px" }}
              custom={idx}
              className="relative p-7 sm:p-9 rounded-2xl glass-panel border border-white/[0.06] hover:border-[#d4a389]/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#d4a389]/30 mb-5" />

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4a389] text-[#d4a389]" />
                  ))}
                </div>

                <p className="font-editorial text-base sm:text-lg text-[#fbf8f5]/90 font-light leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-white/[0.06]">
                <h4 className="font-editorial text-lg sm:text-xl text-[#fbf8f5] font-light mb-1">
                  {t.couple}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#d4a389]/85 font-body font-light">
                  <MapPin className="w-3 h-3 text-[#d4a389]" />
                  <span>{t.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
