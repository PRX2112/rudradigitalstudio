import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": "var(--brand-bg)",
        "brand-surface": "var(--brand-surface)",
        "brand-accent": "var(--brand-accent)",
        "brand-muted": "var(--brand-muted)",
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "Pinyon Script", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
