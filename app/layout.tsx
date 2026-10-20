import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import { siteUrl } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Автошкола S1gma в Астане — категории B, BC1, C, D",
    template: "%s — автошкола S1gma",
  },
  description:
    "Модульное обучение в автошколе S1gma: 10 уроков по часу, старт в любой день, казахский и русский. Категории B — 90 000 ₸, BC1 — 110 000 ₸. 4.9 в 2ГИС, 6 филиалов в Астане.",
  keywords: [
    "автошкола Астана",
    "права категории B Астана",
    "автошкола S1gma",
    "обучение вождению Астана",
    "категория BC1",
    "автошкола онлайн",
  ],
  applicationName: "S1gma",
  authors: [{ name: "S1gma" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: "/",
    siteName: "S1gma — автошкола в Астане",
    title: "Автошкола S1gma в Астане — без зубрёжки и пропущенных тем",
    description:
      "10 модулей по часу, старт в любой день, 5 вождений по 1,5 часа. 4.9 в 2ГИС, 6 филиалов.",
    images: [{ url: "/images/hero-driver.webp", width: 1200, height: 1500, alt: "Ученик за рулём" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Автошкола S1gma в Астане",
    description: "Модульное обучение: 10 уроков по часу. Старт в любой день.",
    images: ["/images/hero-driver.webp"],
  },
  robots: { index: true, follow: true },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#111214",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/onest-cyrillic-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/onest-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержанию
        </a>
        <Header />
        {children}
        <Footer />
        <StickyCta />
        <Reveal />
      </body>
    </html>
  );
}
