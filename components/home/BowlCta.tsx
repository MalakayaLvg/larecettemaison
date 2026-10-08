import Image from "next/image";
import Link from "next/link";
import { containerClassName, darkButtonClassName, SectionHeading } from "@/components/home/Section";

// Figma "10 — CTA final" (V4, node 186:318): text inside the green "bowl" shape of the logo,
// on a light green band. Decoration positions are percentages of the 1760×600 design box.
// The podcast page uses it with its own title, set in Alegreya Sans instead of the poster font.
export function BowlCta({
  title = "Un team building écoresponsable pour vos équipes à Lyon",
  poster = true,
}: {
  title?: string;
  poster?: boolean;
}) {
  return (
    <section className="bg-brand-subtle">
      <div className={`${containerClassName} pt-16 pb-20 lg:pt-24 lg:pb-32`}>
        <div className="relative flex flex-col items-center gap-8 px-8 pt-24 pb-16 text-center sm:px-16 lg:min-h-[600px] lg:px-32 lg:pt-[130px] lg:pb-10">
          <Image src="/deco/bol-cta.svg" alt="" fill className="pointer-events-none" />
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

          <SectionHeading
            center
            poster={poster}
            large={poster}
            underline={false}
            eyebrow="Évènements d'entreprise"
            title={title}
            className="relative max-w-[1100px]"
          />
          <p className="relative max-w-[720px] text-lg leading-[1.2] lg:text-[22px]">
            Pour tous vos évènements d&apos;entreprise : team buildings, séminaires, afterworks,
            déjeuners. Réponse à votre demande de devis en général sous 48 h.
          </p>
          <Link href="/devis" className={`${darkButtonClassName} relative font-bold`}>
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
