import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Pinyon_Script } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-editorial",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rudradigitalstudio.com"),
  title: {
    default: "Rudra Digital Studio | Wedding & Cinematic Photography Kosamba",
    template: "%s | Rudra Digital Studio",
  },
  description:
    "Professional photography and cinematic wedding film studio based in Kosamba, Gujarat. Specializing in weddings, pre-weddings, portraits, and celebrations.",
  keywords: [
    "Rudra Digital Studio",
    "Wedding Photographer Kosamba",
    "Kosamba Photography Studio",
    "Pre Wedding Shoot Gujarat",
    "Cinematic Wedding Films",
  ],
  authors: [{ name: siteConfig.name, url: "https://rudradigitalstudio.com" }],
  openGraph: {
    title: "Rudra Digital Studio | Wedding & Cinematic Photography Kosamba",
    description:
      "Professional photography and cinematic wedding film studio based in Kosamba, Gujarat. Specializing in weddings, pre-weddings, portraits, and celebrations.",
    url: "https://rudradigitalstudio.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero_wedding.jpg",
        width: 1920,
        height: 1080,
        alt: "Rudra Digital Studio Kosamba - Cinematic Wedding Photography",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Digital Studio | Wedding & Cinematic Photography Kosamba",
    description:
      "Professional photography and cinematic wedding film studio based in Kosamba, Gujarat. Specializing in weddings, pre-weddings, portraits, and celebrations.",
    images: ["/images/hero_wedding.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#070809",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    image: "https://rudradigitalstudio.com/images/hero_wedding.jpg",
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    url: "https://rudradigitalstudio.com",
    hasMap: siteConfig.contact.mapsUrl,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Opposite Mota Mandir, Mota Mandir Vistar",
      addressLocality: "Kosamba",
      addressRegion: "Gujarat",
      postalCode: "394120",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "21.4812",
      longitude: "72.9615",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.contact.mapsUrl,
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${pinyon.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--brand-bg)] text-[#fbf8f5] flex flex-col font-body selection:bg-[var(--brand-accent)]/30 selection:text-white">
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
