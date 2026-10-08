import Image from "next/image";
import Link from "next/link";
import { buttonClassName, containerClassName, darkButtonClassName, SlopeCut, Sticker } from "@/components/home/Section";
import heroImage from "@/public/images/home/hero.jpg";

// Figma "02 — Hero" (V4, node 186:121). Positions in the visual are percentages of the 660×760
// design box so it scales down on smaller screens.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand">
      {/* Decorative shapes */}
      <Image
        src="/deco/tomate.svg"
        alt=""
        width={380}
        height={380}
        className="pointer-events-none absolute -top-[170px] -right-[160px] hidden w-[380px] lg:block"
      />
      <Image
        src="/deco/legume.svg"
        alt=""
        width={208}
        height={240}
        className="pointer-events-none absolute bottom-[calc(5vw-40px)] -left-[75px] hidden w-[150px] -rotate-10 sm:block lg:w-[208px]"
      />

      <div
        className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
      >
        <div className="flex flex-col items-start gap-8">
          <Sticker>Maison La Recette · alimentation durable à Lyon</Sticker>
          <h1 className="isolate max-w-[1036px] font-poster text-[clamp(2.75rem,4.5vw,5.375rem)] leading-[0.95] font-black tracking-[-0.025em]">
            Et si on changeait le monde en{" "}
            <span className="relative inline-block">
              {/* Figma "Surlignage" */}
              <span aria-hidden className="absolute -inset-x-1.5 top-[58%] -bottom-[8%] -z-10 rounded-md bg-accent" />
              mangeant ?
            </span>
          </h1>
          <p className="max-w-[680px] text-lg leading-[1.2] sm:text-[22px]">
            Maison La Recette permet d&apos;explorer l&apos;alimentation durable de demain, en podcast et
            en vrai : ateliers de cuisine, food tours et immersions aux côtés de chef·fes,
            producteur·ices et artisan·es engagé·es.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/podcast" className={`${buttonClassName}`}>
              Écouter le podcast
            </Link>
            <Link href="/experiences" className={`${darkButtonClassName}`}>
              Découvrir les expériences
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[660/760] w-full max-w-[660px]">
          <Image
            src={heroImage}
            alt="Bols d'épices et d'herbes fraîches préparés pour un atelier de cuisine"
            priority
            sizes="(min-width: 1024px) 34vw, 90vw"
            className="absolute top-[10%] left-[5.7%] h-[59.9%] w-[80.9%] -rotate-[6.46deg] object-cover object-bottom"
          />
          <Image
            src="/deco/crochet.svg"
            alt=""
            width={150}
            height={94}
            className="absolute top-[0.26%] left-[68.94%] w-[22.73%]"
          />
          <Image
            src="/deco/bol.svg"
            alt=""
            width={720}
            height={222}
            className="absolute top-[61.84%] left-[-4.55%] w-[109.1%] max-w-none"
          />
          {/* Figma "Sticker rond" */}
          <p className="absolute top-[73.1%] left-[69.8%] flex aspect-square w-[25.76%] min-w-[110px] rotate-12 items-center justify-center rounded-full border-2 border-ink bg-accent text-center font-display text-lg leading-none font-extrabold shadow-cut sm:text-2xl">
            En podcast
            <br />
            et en vrai
          </p>
        </div>
      </div>

      <SlopeCut color="blanc" />
    </section>
  );
}
