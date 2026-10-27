"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Crown, MapPin, Film, Award } from "lucide-react";
import { fadeUpVariant } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageContext";

export function TrustBanner() {
  const shouldReduceMotion = useReducedMotion();
  const { lang } = useLanguage();

  const accolades = [
    {
      icon: Crown,
      title: lang === "gu" ? "કોસંબાનું વિશ્વાસપાત્ર સ્ટુડિયો" : lang === "hi" ? "कोसम्बा का भरोसेमंद स्टूडियो" : "Kosamba & Gujarat Studio",
      subtitle: lang === "gu" ? "પ્રીમિયમ વેડિંગ અને ઇવેન્ટ શૂટિંગ" : lang === "hi" ? "वेडिंग और इवेंट का शानदार काम" : "Premier wedding cinema & bespoke photography",
    },
    {
      icon: MapPin,
      title: lang === "gu" ? "સમગ્ર ગુજરાતમાં સેવા" : lang === "hi" ? "पूरे गुजरात में सर्विस" : "Gujarat & Destinations",
      subtitle: lang === "gu" ? "સુરત, ભરૂચ, અંકલેશ્વર અને વડોદરા" : lang === "hi" ? "सूरत, भरूच, अंकलेश्वर और वडोदरा" : "Kosamba, Surat, Bharuch, Vadodara & Beyond",
    },
    {
      icon: Film,
      title: lang === "gu" ? "સિનેમેટિક વિડીયો" : lang === "hi" ? "सिनेमाई वीडियो" : "Master Cinema",
      subtitle: lang === "gu" ? "આધુનિક કલર મિક્સિંગ અને સાઉન્ડ" : lang === "hi" ? "आधुनिक कलर मिक्सिंग और साउंड" : "Editorial color grading & sound fidelity",
    },
    {
      icon: Award,
      title: lang === "gu" ? "500+ સફળ પ્રસંગો" : lang === "hi" ? "500+ सफल कार्यक्रम" : "500+ Celebrations",
      subtitle: lang === "gu" ? "પેઢીઓની યાદોને સાચવવાનો વિશ્વાસ" : lang === "hi" ? "परिवारों की अनमोल यादों का भरोसा" : "Capturing generational memories & sacred rituals",
    },
  ];

  return (
    <section className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 border-y border-[#d4a389]/15 bg-[#070809]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {accolades.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={shouldReduceMotion ? undefined : fadeUpVariant}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-50px" }}
                custom={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.03] hover:border-[#d4a389]/30 transition-all duration-300 hover:bg-white/[0.02] group"
              >
                <div className="w-10 h-10 rounded-full border border-[#d4a389]/30 flex items-center justify-center shrink-0 group-hover:border-[#d4a389] group-hover:bg-[#d4a389]/10 transition-colors">
                  <Icon className="w-4 h-4 text-[#d4a389]" />
                </div>
                <div>
                  <h4 className="font-editorial text-sm tracking-wide text-[#fbf8f5] group-hover:text-[#f5d5c5] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-body text-[#fbf8f5]/60 font-light leading-snug mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
