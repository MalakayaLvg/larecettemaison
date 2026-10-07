import Link from "next/link";
import { contactEmail } from "@/lib/site";

// Contact / quote pages (Figma "Contact / Devis", section "Devis B2B"): text and contact
// details on the left, the form in a card on the right.
export function FormHero({
  title,
  intro,
  otherLink,
  cardTitle,
  note,
  children,
}: {
  title: string;
  intro: string;
  otherLink: { href: string; label: string };
  cardTitle: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-foreground/[0.04]">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">{title}</h1>
            <p className="text-lg opacity-80">{intro}</p>
          </div>
          <p className="text-lg font-medium">
            <a href={`mailto:${contactEmail}`} className="hover:underline">
              {contactEmail}
            </a>
          </p>
          <p className="text-lg font-medium opacity-80">Lyon</p>
          <p>
            <Link href={otherLink.href} className="underline opacity-80 hover:opacity-100">
              {otherLink.label}
            </Link>
          </p>
        </div>
        <div className="space-y-6 rounded-lg border border-black/15 bg-background p-6 sm:p-8">
          <h2 className="text-2xl font-black">{cardTitle}</h2>
          {children}
          {note && <p className="text-sm opacity-70">{note}</p>}
        </div>
      </div>
    </section>
  );
}
