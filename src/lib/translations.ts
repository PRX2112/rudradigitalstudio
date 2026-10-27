// lib/translations.ts

export type Language = "gu" | "hi" | "en";

export const translations = {
  // ---------------- GUJARATI (Default Local Preference) ----------------
  gu: {
    nav: {
      services: "સેવાઓ",
      portfolio: "ફોટો ગેલેરી",
      about: "અમારા વિશે",
      contact: "સંપર્ક કરો",
      bookWhatsapp: "વોટ્સએપ પર વાત કરો",
    },
    hero: {
      badge: "કોસંબા • સ્પેશિયલ વેડિંગ અને ઇવેન્ટ ફોટોગ્રાફી",
      heading1: "તમારા શુભ પ્રસંગની યાદો,",
      heading2: "હંમેશ માટે યાદગાર બનાવો.",
      subheading:
        "લગ્ન, સગાઈ, પ્રી-વેડિંગ અને ફેમિલી ફોટોશૂટ માટે કોસંબાનું વિશ્વાસપાત્ર ડિજિટલ સ્ટુડિયો. તમારા બજેટમાં સૌથી શ્રેષ્ઠ કામ.",
      ctaPrimary: "વોટ્સએપ પર ભાવ પૂછો",
      ctaSecondary: "અમારું કામ જુઓ",
    },
    services: {
      title: "અમારી ખાસ સેવાઓ",
      subtitle: "તમારા દરેક પ્રસંગ માટે યોગ્ય ફોટો અને વિડીયો શૂટ",
      inquireBtn: "વિગત અને ભાવ પૂછો",
      items: [
        {
          id: "wedding",
          title: "લગ્ન ફોટોગ્રાફી & સિનેમેટિક વિડીયો",
          desc: "લગ્નના દરેક રીતરિવાજ અને યાદગાર પળોનું હાઈ-ક્વોલિટી શૂટિંગ અને આલ્બમ.",
        },
        {
          id: "pre-wedding",
          title: "પ્રી-વેડિંગ ફોટોશૂટ",
          desc: "સુંદર લોકેશન પર વર-વધૂ માટે સ્પેશિયલ અને રોમેન્ટિક ફોટોશૂટ.",
        },
        {
          id: "maternity-newborn",
          title: "બેબી શૂટ & મેટરનિટી ફોટો",
          desc: "નવા જન્મેલા બાળકો અને માતા માટે ખૂબ જ સુંદર અને સલામત સ્ટુડિયો ફોટોશૂટ.",
        },
        {
          id: "events",
          title: "સગાઈ, જન્મદિવસ & ફેમિલી પ્રસંગો",
          desc: "કોઈપણ નાનો કે મોટો પારિવારિક ઉત્સવ કવર કરવા માટે સ્પેશિયલ ટીમ.",
        },
        {
          id: "portraits",
          title: "સ્ટુડિયો પોર્ટ્રેટ & પાસપોર્ટ ફોટો",
          desc: "પર્સનલ ફોટોશૂટ, બાયોડેટા અને પાસપોર્ટ સાઇઝના તાત્કાલિક ફોટા.",
        },
        {
          id: "post-production",
          title: "વિડીયો મિક્સિંગ & પ્રીમિયમ આલ્બમ",
          desc: "જૂના અને નવા વિડીયોનું મિક્સિંગ તથા આજીવન સચવાય તેવા ફોટો આલ્બમ ડિઝાઇન.",
        },
      ],
    },
    narrative: {
      heading: "અમારો અનુભવ અને વિશ્વાસ",
      quote: "“દરેક તહેવાર અને પ્રસંગ વીતી જાય છે, પણ ફોટો હંમેશા સાથે રહે છે.”",
      points: [
        { title: "આધુનિક કેમેરા", desc: "વિડીયો અને શ્રેષ્ઠ લેન્સથી સ્પષ્ટ શૂટિંગ." },
        { title: "સમયસર ડિલિવરી", desc: "ફોટા અને આલ્બમ નક્કી કરેલા સમયે તૈયાર." },
        { title: "વ્યાજબી દર", desc: "તમારા બજેટ મુજબ કસ્ટમ પેકેજ બનાવી આપવામાં આવશે." },
      ],
    },
    contact: {
      title: "શૂટિંગ બુકિંગ અથવા માહિતી માટે",
      subtitle: "તમારી તારીખ ખાલી છે કે નહીં તે જાણવા સીધો કોલ અથવા વોટ્સએપ કરો.",
      nameLabel: "તમારું પૂરું નામ",
      phoneLabel: "મોબાઈલ નંબર",
      eventLabel: "કયો પ્રસંગ છે?",
      dateLabel: "પ્રસંગની તારીખ",
      submitBtn: "વોટ્સએપ પર મેસેજ મોકલો",
      callUs: "સીધો ફોન કરો",
      visitUs: "સ્ટુડિયોનું સરનામું",
      address: "મોટા મંદિર સામે, મોટા મંદિર વિસ્તાર, કોસંબા, ગુજરાત 394120",
      hours: "સોમ - શનિ: સવારે 10:00 થી રાત્રે 8:00 | રવિવાર: સવારે 10:00 થી સાંજે 5:00",
    },
    footer: {
      rights: "રુદ્ર ડિજિટલ સ્ટુડિયો, કોસંબા. સર્વાધિકાર સુરક્ષિત.",
    },
  },

  // ---------------- HINDI (Everyday Conversational) ----------------
  hi: {
    nav: {
      services: "सेवाएं",
      portfolio: "फोटो गैलरी",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      bookWhatsapp: "व्हाट्सएप पर बात करें",
    },
    hero: {
      badge: "कोसम्बा • वेडिंग और इवेंट फोटोग्राफी",
      heading1: "शादी और हर ख़ास पल की यादें,",
      heading2: "ज़िंदगी भर के लिए संजोएं।",
      subheading:
        "शादी, सगाई, प्री-वेडिंग और पारिवारिक कार्यक्रमों के लिए कोसम्बा का भरोसेमंद डिजिटल स्टूडियो। आपके बजट में बेहतरीन काम।",
      ctaPrimary: "व्हाट्सएप पर रेट पूछें",
      ctaSecondary: "हमारा काम देखें",
    },
    services: {
      title: "हमारी खास सेवाएं",
      subtitle: "आपके हर उत्सव और कार्यक्रम के लिए शानदार फोटो और वीडियो",
      inquireBtn: "जानकारी और रेट पूछें",
      items: [
        {
          id: "wedding",
          title: "वेडिंग फोटोग्राफी और वीडियो",
          desc: "शादी की रस्में और खुशियों के हर पल की शानदार रिकॉर्डिंग और प्रीमियम एल्बम।",
        },
        {
          id: "pre-wedding",
          title: "प्री-वेडिंग फोटोशूट",
          desc: "खूबसूरत लोकेशन पर दूल्हा-दुल्हन के लिए यादगार और रोमांटिक फोटोशूट।",
        },
        {
          id: "maternity-newborn",
          title: "बेबी और मैटरनिटी शूट",
          desc: "नए मेहमान और परिवार के साथ प्यार भरे पलों का कोमल व सुंदर स्टूडियो शूट।",
        },
        {
          id: "events",
          title: "सगाई, जन्मदिन और फैमिली इवेंट्स",
          desc: "रिंग सेरेमनी, बर्थडे पार्टी और अन्य घरेलू आयोजनों की पूरी कवरेज।",
        },
        {
          id: "portraits",
          title: "स्टूडियो पोर्ट्रेट और प्रोफाइल फोटो",
          desc: "व्यक्तिगत फोटोशूट, बायोडाटा फोटो और पासपोर्ट साइज तस्वीरें।",
        },
        {
          id: "post-production",
          title: "वीडियो मिक्सिंग और एल्बम डिजाइन",
          desc: "शानदार कलर मिक्सिंग और सालों-साल चलने वाले मजबूत फोटो एल्बम।",
        },
      ],
    },
    narrative: {
      heading: "हमारा काम और भरोसा",
      quote: "“वक्त बीत जाता है, पर तस्वीरें हमेशा याद दिलाती हैं।”",
      points: [
        { title: "लेटेस्ट कैमरे", desc: "हाई-क्वालिटी वीडियो और शार्प तस्वीरें।" },
        { title: "समय पर डिलीवरी", desc: "एल्बम और वीडियो तय समय पर आपके हाथ में।" },
        { title: "सही और उचित दाम", desc: "आपके बजट और पसंद के अनुसार खास पैकेज।" },
      ],
    },
    contact: {
      title: "तारीख चेक करने या बुकिंग के लिए",
      subtitle: "अपने फंक्शन की तारीख के लिए आज ही हमें कॉल या व्हाट्सएप करें।",
      nameLabel: "आपका नाम",
      phoneLabel: "मोबाइल नंबर",
      eventLabel: "कार्यक्रम का प्रकार",
      dateLabel: "कार्यक्रम की तारीख",
      submitBtn: "व्हाट्सएप पर भेजें",
      callUs: "सीधा फोन करें",
      visitUs: "स्टूडियो का पता",
      address: "मोटा मंदिर के सामने, मोटा मंदिर विस्तार, कोसम्बा, गुजरात 394120",
      hours: "सोमवार - शनिवार: 10:00 AM से 8:00 PM | रविवार: 10:00 AM से 5:00 PM",
    },
    footer: {
      rights: "रुद्र डिजिटल स्टूडियो, कोसम्बा। सर्वाधिकार सुरक्षित।",
    },
  },

  // ---------------- SIMPLE ENGLISH (Accessible) ----------------
  en: {
    nav: {
      services: "Services",
      portfolio: "Work",
      about: "About",
      contact: "Contact",
      bookWhatsapp: "Chat on WhatsApp",
    },
    hero: {
      badge: "Kosamba, Gujarat • Wedding & Event Photography",
      heading1: "Every Special Celebration,",
      heading2: "Captured Beautifully Forever.",
      subheading:
        "High-quality wedding films, pre-weddings, and family photoshoots in Kosamba. Transparent pricing and friendly service.",
      ctaPrimary: "Ask for Rates on WhatsApp",
      ctaSecondary: "View Recent Work",
    },
    services: {
      title: "Our Photography Services",
      subtitle: "Tailored coverage for your family's biggest celebrations",
      inquireBtn: "Inquire for Rates",
      items: [
        {
          id: "wedding",
          title: "Wedding Photography & Video",
          desc: "Complete coverage of rituals, candid moments, and premium album books.",
        },
        {
          id: "pre-wedding",
          title: "Pre-Wedding Shoots",
          desc: "Creative outdoor couple shoots celebrating your story.",
        },
        {
          id: "maternity-newborn",
          title: "Maternity & Baby Shoots",
          desc: "Gentle, timeless studio photos celebrating new beginnings.",
        },
        {
          id: "events",
          title: "Engagements & Birthdays",
          desc: "Full coverage for ring ceremonies, anniversaries, and family parties.",
        },
        {
          id: "portraits",
          title: "Studio Portraits",
          desc: "High-definition profile, biodata, and passport photos.",
        },
        {
          id: "post-production",
          title: "Video Mixing & Albums",
          desc: "Modern cinematic editing and long-lasting flush-mount albums.",
        },
      ],
    },
    narrative: {
      heading: "Why Choose Rudra Studio",
      quote: "“Today, everything exists to end in a photograph.”",
      points: [
        { title: "Modern Equipment", desc: "Clear video recording and high-grade lenses." },
        { title: "On-Time Delivery", desc: "Your final photos and albums delivered without delays." },
        { title: "Friendly Pricing", desc: "Packages customized to match your budget and event size." },
      ],
    },
    contact: {
      title: "Check Date Availability & Rates",
      subtitle: "Directly reach out via phone or WhatsApp to check your date.",
      nameLabel: "Your Name",
      phoneLabel: "Phone Number",
      eventLabel: "Event Type",
      dateLabel: "Event Date",
      submitBtn: "Send Details on WhatsApp",
      callUs: "Call Directly",
      visitUs: "Visit Our Studio",
      address: "Opposite Mota Mandir, Mota Mandir Vistar, Kosamba, Gujarat 394120",
      hours: "Mon – Sat: 10:00 AM – 8:00 PM | Sun: 10:00 AM – 5:00 PM",
    },
    footer: {
      rights: "Rudra Digital Studio, Kosamba. All rights reserved.",
    },
  },
};