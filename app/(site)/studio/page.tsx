import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/home/Placeholder";
import {
  buttonClassName,
  cardClassName,
  ghostButtonClassName,
  Section,
  StatCard,
} from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { podcastStats } from "@/lib/content";
import { getQuoteServices } from "@/lib/quote-services";
import { getStudioOffers } from "@/lib/studio";
import { QuoteForm } from "../devis/QuoteForm";

export const metadata: Metadata = {
  title: "Studio",
  description: "Sponsoring, production de podcasts et animation d'événements.",
};

// Layout and copy from the Figma wireframe "Studio — Desktop 1920" (node 1:562).

const steps = ["Conception éditoriale", "Enregistrement", "Montage", "Diffusion et communication"];

const twoDigits = (index: number) => String(index + 1).padStart(2, "0");

export default async function StudioPage(props: PageProps<"/studio">) {
  const { studio } = await props.searchParams;
  const [offers, services] = await Promise.all([getStudioOffers(), getQuoteServices()]);
  // Only the Studio offers in the embedded form ("Autre" is always added by the form).
  const studioServices = services.filter((group) => group.group === "Studio");
  const preselected = `studio:${studio}`;
  const defaultService = studioServices.some((group) =>
    group.options.some((option) => option.value === preselected),
  )
    ? preselected
    : undefined;

  return (
    <>
      {/* 02 — Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-medium opacity-70">Offre podcast</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
              Amplifiez votre impact grâce au podcast
            </h1>
            <p className="max-w-[720px] text-lg opacity-80">
              La recette met son expertise autour de la création éditoriale, la réalisation audio et
              vidéo au service des acteur·ices de l&apos;alimentation durable : entreprises &amp;
              organisations.
            </p>
          </div>
          <Link href="#devis" className={buttonClassName}>
            Demander un devis
          </Link>
        </div>
        <Placeholder
          label="Image — Enregistrement d'un podcast en studio ou en reportage"
          className="h-80 lg:h-[600px]"
        />
      </section>

      {/* 03 — Offres */}
      {offers.length > 0 && (
        <Section muted title="Trois offres pour faire entendre votre voix en podcast">
          <ul className="grid gap-6 md:grid-cols-3">
            {offers.map((offer, index) => (
              <li key={offer.slug} className={cardClassName}>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-sm font-medium opacity-70">{twoDigits(index)}</p>
                  <h3 className="text-2xl font-black">{offer.title}</h3>
                  {offer.description && (
                    <p className="flex-1 whitespace-pre-line opacity-80">{offer.description}</p>
                  )}
                  {/* Reloads the page with the offer preselected in the form below. */}
                  <Link
                    href={`/studio?studio=${offer.slug}#devis`}
                    scroll={false}
                    className={`${ghostButtonClassName} self-start`}
                  >
                    Demander un devis
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 04 — Audience du podcast */}
      <Section title="Une audience engagée pour votre marque">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {podcastStats.map((stat) => (
            <StatCard key={stat.value} {...stat} />
          ))}
        </div>
      </Section>

      {/* 05 — Process */}
      <Section muted title="De l'idée à la diffusion : la production de votre podcast">
        <Steps items={steps.map((title) => ({ title }))} />
      </Section>

      {/* 06 — Réalisations */}
      <Section title="Nos réalisations : podcasts et tables rondes">
        <div className="grid gap-6 md:grid-cols-2">
          <div className={cardClassName}>
            <Placeholder label="Image — Réalisation studio" className="h-60" />
            <h3 className="px-6 pt-3 pb-6 text-2xl font-black">
              Un podcast en anglais créé de A à Z pour une association de l&apos;alimentation et de la
              gastronomie
            </h3>
          </div>
          <Link href="/podcast/saison-2/table-ronde-alimentation-et-sante" className={`${cardClassName} group`}>
            <Placeholder label="Image — Table ronde enregistrée" className="h-60" />
            <div className="space-y-3 px-6 pt-3 pb-6">
              <h3 className="text-2xl font-black group-hover:underline">
                TABLE-RONDE - Alimentation et santé : un équilibre à trouver ?
              </h3>
              <p className="font-medium opacity-70">1 h 09 · 06/01/2025</p>
            </div>
          </Link>
        </div>
      </Section>

      {/* 07 — Expertise */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Placeholder label="Image — Portrait de Julie Van Ossel au micro" className="h-80 lg:h-[440px]" />
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
              Productrice et formatrice de podcast
            </h2>
            <p className="text-lg opacity-80">
              Je produis et réalise des podcasts sur l&apos;alimentation et la gastronomie pour des
              organismes et des collectivités, et j&apos;enseigne le podcast natif dans des écoles et
              des universités.
            </p>
          </div>
        </div>
      </Section>

      {/* 08 — Devis studio */}
      <section id="devis" className="scroll-mt-8">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
              Parlons de votre projet de podcast
            </h2>
            <p className="text-lg opacity-80">
              Je propose d&apos;abord un rendez-vous téléphonique pour préciser la demande, puis
              j&apos;envoie une proposition de devis. Je réponds en général sous 48 h.
            </p>
          </div>
          <div className="space-y-6 rounded-lg border border-black/15 p-6 sm:p-8">
            {/* key: remount when the preselected offer changes (defaultValue is only read on mount). */}
            <QuoteForm
              key={defaultService ?? "none"}
              services={studioServices}
              defaultService={defaultService}
              groupFields={false}
              submitLabel="Demander un devis"
            />
            <p className="text-sm opacity-70">
              * Champs obligatoires. Je vous rappelle pour préciser la demande, en général sous 48 h.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
