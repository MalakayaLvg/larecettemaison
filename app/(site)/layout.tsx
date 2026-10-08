import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Alegreya_Sans, Montserrat, Nunito } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteName } from "@/lib/site";
import "./globals.css";

// Heading font (Figma "La Recette/Heading", "Display", "Quote").
const display = Alegreya_Sans({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

// Poster titles and key figures. The V4 mockup uses "Bartok" (trial licence only): Montserrat
// Black replaces it, as in the home page H1.
const poster = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "900",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Makes relative image URLs (Open Graph, etc.) absolute.
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Podcast, studio et expériences culinaires à Lyon pour accélérer la transition alimentaire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${poster.variable} ${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Vercel Web Analytics: cookieless page views, enabled in the Vercel project. Inactive locally. */}
        <Analytics />
      </body>
    </html>
  );
}
