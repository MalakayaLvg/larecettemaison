import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { containerClassName } from "@/components/home/Section";
import { contactEmail, legalNav, mainNav, siteName, socialLinks } from "@/lib/site";

// Figma "11 — Footer" (V4, node 186:329).
export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-white">
      <div className={`${containerClassName} relative space-y-16 pt-20 pb-8 lg:pt-24`}>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-24">
          <div className="space-y-6">
            <Image src="/brand/logo-blanc.svg" alt={siteName} width={192} height={156} className="w-40 lg:w-48" />
            <p className="text-lg leading-[1.55]">
              <a href={`mailto:${contactEmail}`} className="hover:underline">
                {contactEmail}
              </a>
            </p>
            <ul className="flex flex-wrap gap-6 text-lg leading-[1.4] font-semibold text-accent">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Plan du site">
            <ul className="space-y-3 text-lg leading-[1.4] font-semibold">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Target of the "Me prévenir" links on full booking sessions. */}
          <div id="newsletter" className="scroll-mt-24 space-y-4 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl leading-[1.25] font-bold">Newsletter</h2>
            <p className="text-lg leading-[1.55]">
              Recevez les nouveaux épisodes du podcast, nos prochaines expériences à Lyon et nos articles.
            </p>
            <NewsletterForm tone="dark" hideLabel />
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-2 border-t border-white pt-6 text-lg leading-[1.4] font-semibold">
          {legalNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
