import Image from "next/image";
import Link from "next/link";
import { containerClassName, darkButtonClassName, h2ClassName } from "@/components/home/Section";

// Figma "10 — CTA final" (node 129:366): text inside the green "bowl" shape of the logo.
// Decoration positions are percentages of the 1760×543 design box.
export function BowlCta() {
  return (
    <section className={`${containerClassName} pt-16 pb-20 lg:pt-24 lg:pb-32`}>
      <div className="relative flex flex-col items-center gap-8 px-8 pt-24 pb-16 text-center sm:px-16 lg:min-h-[543px] lg:px-32 lg:pt-[150px] lg:pb-10">
        <Image src="/deco/bol-cta.svg" alt="" fill className="pointer-events-none" />
        <Image
          src="/deco/tomate-orange.svg"
          alt=""
          width={240}
          height={240}
          className="absolute top-[1.8%] left-[4%] w-[13.6%] max-lg:hidden"
        />
        <Image
          src="/deco/etoile-marine.svg"
          alt=""
          width={95}
          height={90}
          className="absolute top-[44.2%] left-[14.3%] w-[5.4%] max-lg:hidden"
        />
        <Image
          src="/deco/legume-lime.svg"
          alt=""
          width={191}
          height={220}
          className="absolute -top-[13.7%] left-[87.6%] w-[10.8%] -rotate-16 max-lg:-top-12 max-lg:right-0 max-lg:left-auto max-lg:w-20"
        />

        <h2 className={`${h2ClassName} relative max-w-[1000px]`}>
          Un team building écoresponsable pour vos équipes à Lyon
        </h2>
        <p className="relative max-w-[720px] text-lg leading-[1.5] lg:text-[22px]">
          Pour tous vos évènements d&apos;entreprise : team buildings, séminaires, afterworks,
          déjeuners. Réponse à votre demande de devis en général sous 48 h.
        </p>
        <Link href="/devis" className={`${darkButtonClassName} relative`}>
          Demander un devis
        </Link>
      </div>
    </section>
  );
}
