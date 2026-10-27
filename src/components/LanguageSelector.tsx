"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-xs backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setLang("gu")}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "gu"
            ? "bg-[var(--brand-accent)] text-[#070809] font-semibold shadow-sm"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        aria-label="Switch to Gujarati"
      >
        ગુજરાતી
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "hi"
            ? "bg-[var(--brand-accent)] text-[#070809] font-semibold shadow-sm"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        aria-label="Switch to Hindi"
      >
        हिंदी
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "en"
            ? "bg-[var(--brand-accent)] text-[#070809] font-semibold shadow-sm"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSelector;