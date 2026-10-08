import Image from "next/image";
import Link from "next/link";
import {
  accentButtonClassName,
  containerClassName,
  darkButtonClassName,
  SectionHeading,
} from "@/components/home/Section";

// Colours and decorations of each version of the final CTA:
// - vert: home page (V4, node 186:318), flat tomato, star and hexagon;
// - illustre: podcast pages (Fiche épisode V4, node 279:1688), drawn tomato and cabbage;
// - lime: Studio page (node 279:1521), lime bowl, orange tomato and sticker;
// - orange: Expériences page (node 279:1536), orange bowl, white text, lime button.
const themes = {
  vert: { section: "bg-brand-subtle", bowl: "/deco/bol-cta.svg", tomato: null, sticker: "accent", onDark: false },
  illustre: { section: "bg-brand-subtle", bowl: "/deco/bol-cta.svg", tomato: "/deco/tomate-illustree.svg", sticker: "accent", onDark: false },
  lime: { section: "bg-accent-subtle", bowl: "/deco/bol-cta-lime.svg", tomato: "/deco/tomate-illustree-orange.svg", sticker: "primary", onDark: false },
  orange: { section: "bg-highlight-wash", bowl: "/deco/bol-cta-orange.svg", tomato: "/deco/tomate-illustree.svg", sticker: "accent", onDark: true },
} as const;

// Figma "10 — CTA final": text inside the "bowl" shape of the logo, on a light band.
// Decoration positions are percentages of the design box (1760×600, or 1760×540 for the lime
// and orange versions). Titles use the poster font on the home page, Alegreya Sans elsewhere.
export function BowlCta({
  theme = "vert",
  eyebrow = "Évènements d'entreprise",
  title = "Un team building écoresponsable pour vos équipes à Lyon",
  text = "Pour tous vos évènements d'entreprise : team buildings, séminaires, afterworks, déjeuners. Réponse à votre demande de devis en général sous 48 h.",
  href = "/devis",
  poster = true,
}: {
  theme?: keyof typeof themes;
  eyebrow?: string;
  title?: string;
  text?: string;
  href?: string;
  poster?: boolean;
}) {
  const style = themes[theme];
  const short = theme === "lime" || theme === "orange";

  return (
    <section className={style.section}>
      <div className={`${containerClassName} pt-16 pb-20 lg:pt-24 lg:pb-32`}>
        <div
          className={`relative flex flex-col items-center gap-8 px-8 pt-24 pb-16 text-center sm:px-16 lg:px-32 lg:pt-[130px] lg:pb-10 ${short ? "lg:min-h-[540px]" : "lg:min-h-[600px]"} ${style.onDark ? "text-white" : ""}`}
        >
          <Image src={style.bowl} alt="" fill className="pointer-events-none" />
          {style.tomato ? (
            <>
              <Image
                src={style.tomato}
                alt=""
                width={198}
                height={250}
                className="absolute top-[0.8%] left-[5.2%] w-[11.2%] rotate-8 max-lg:hidden"
              />
              <Image
                src="/deco/chou.svg"
                alt=""
                width={290}
                height={279}
                className={`absolute left-[84.7%] w-[16.5%] -rotate-16 max-lg:-top-12 max-lg:right-0 max-lg:left-auto max-lg:w-24 ${short ? "-top-[19.2%]" : "-top-[17.3%]"}`}
              />
            </>
          ) : (
            <>
              <Image
                src="/deco/tomate.svg"
                alt=""
                width={240}
                height={240}
                className="absolute top-[1.7%] left-[4%] w-[13.6%] max-lg:hidden"
              />
              <Image
                src="/deco/etoile-marine.svg"
                alt=""
                width={95}
                height={90}
                className="absolute -top-[4.1%] left-[10.5%] w-[5.4%] max-lg:hidden"
              />
              <Image
                src="/deco/legume.svg"
                alt=""
                width={191}
                height={220}
                className="absolute -top-[12.4%] left-[86.7%] w-[10.8%] -rotate-16 max-lg:-top-12 max-lg:right-0 max-lg:left-auto max-lg:w-20"
              />
            </>
          )}

          <SectionHeading
            center
            poster={poster}
            large={poster}
            underline={false}
            sticker={style.sticker}
            eyebrow={eyebrow}
            title={title}
            className="relative max-w-[1100px]"
          />
          <p className="relative max-w-[720px] text-lg leading-[1.2] lg:text-[22px]">{text}</p>
          <Link
            href={href}
            className={`${style.onDark ? accentButtonClassName : darkButtonClassName} relative font-bold`}
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
