import Image from "next/image";
import Link from "next/link";
import { buttonClassName, containerClassName, darkButtonClassName, SlopeCut, Sticker } from "@/components/home/Section";

// Figma "02 — Hero" (V4, node 279:3011): 985px high at 1920px. The cut-out carrot with the photo
// inside it (public/illustrations/accueil-carotte.svg, Figma export of "Group 3") covers the
// right of the band from x=760 and is cropped by the top and right edges, as in the mockup.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand lg:flex lg:min-h-[51.3vw] lg:items-center">
      <div className={`${containerClassName} relative z-10 pt-12 lg:pt-24 lg:pb-[calc(5vw+2rem)]`}>
        <div className="flex max-w-[1048px] flex-col items-start gap-8">
          <Sticker>Maison La Recette · alimentation durable à Lyon</Sticker>
          <h1 className="font-poster text-[clamp(2.75rem,4.5vw,5.375rem)] leading-[0.95] font-black tracking-[-0.025em]">
            Et si on changeait le <br className="max-sm:hidden" />
            monde en mangeant ?
          </h1>
          <p className="max-w-[680px] text-lg leading-[1.2] sm:text-[22px]">
            Maison La Recette vous fait goûter l&apos;alimentation durable de demain, en podcast et en
            vrai : ateliers de cuisine, food tours et immersions aux côtés de chef·fes, producteur·ices
            et artisan·es engagé·es.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/podcast" className={buttonClassName}>
              Écouter le podcast
            </Link>
            <Link href="/experiences" className={darkButtonClassName}>
              Découvrir les expériences
            </Link>
          </div>
        </div>
      </div>

      {/* 1160×903 box at x=760, y=0 of the 1920×985 band; below the text on small screens. */}
      <Image
        src="/illustrations/accueil-carotte.svg"
        alt="Carotte découpée en morceaux, avec une photo de bols d'épices et d'herbes fraîches à l'intérieur"
        width={1160}
        height={903}
        priority
        className="pointer-events-none relative mt-4 ml-auto w-[110%] max-w-none lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:w-[60.42%]"
      />

      <SlopeCut color="blanc" />
    </section>
  );
}
