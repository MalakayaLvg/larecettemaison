import Image from "next/image";
import Link from "next/link";
import { containerClassName, SlopeCut, Sticker } from "@/components/home/Section";
import { contactEmail } from "@/lib/site";

// Contact / quote pages (Figma "02 — Devis B2B", V4 node 309:625): text and contact details on
// the left, the form in a white card on the right, on a green band. `slope` is the colour of the
// next section (navy for the footer when the page has nothing else).
export function FormHero({
  eyebrow,
  title,
  intro,
  otherLink,
  cardTitle,
  note,
  slope = "marine",
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  otherLink: { href: string; label: string };
  cardTitle: string;
  note?: string;
  slope?: React.ComponentProps<typeof SlopeCut>["color"];
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div
        className={`${containerClassName} relative grid items-start gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[640fr_1056fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
      >
        <div className="flex flex-col items-start gap-8 lg:pt-6">
          <Sticker>{eyebrow}</Sticker>
          <h1 className="font-display text-[clamp(2.5rem,3.75vw,4.5rem)] leading-[0.95] font-extrabold">{title}</h1>
          <p className="text-lg leading-[1.2] lg:text-[22px]">{intro}</p>
          <p className="text-lg leading-[1.4] font-semibold">
            <a href={`mailto:${contactEmail}`} className="hover:underline">
              {contactEmail}
            </a>
          </p>
          <p className="text-lg leading-[1.4] font-semibold">Lyon</p>
          <p>
            <Link href={otherLink.href} className="text-lg leading-[1.4] underline hover:no-underline">
              {otherLink.label}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-6 border-2 border-ink bg-white p-6 shadow-cut sm:p-8 lg:p-12">
          <h2 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{cardTitle}</h2>
          {children}
          {note && <p className="text-[15px] leading-[1.45] text-ink-soft">{note}</p>}
        </div>
      </div>

      <SlopeCut color={slope} />
      <Image
        src="/deco/chou.svg"
        alt=""
        width={300}
        height={288}
        className="pointer-events-none absolute -bottom-[25px] -left-[67px] hidden w-[200px] -rotate-10 sm:block lg:w-[300px]"
      />
    </section>
  );
}
