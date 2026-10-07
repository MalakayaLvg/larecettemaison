import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteName } from "@/lib/site";
import "./globals.css";

// Heading font (Figma "La Recette/Heading"): may change, only this declaration needs updating.
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
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
    <html lang="fr" className={`${display.variable} ${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
