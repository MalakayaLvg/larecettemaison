import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buttonClassName,
  containerClassName,
  darkButtonClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { formatEuros, formatSessionDate, formatSessionTime, getBookableSessions } from "@/lib/bookings";
import { getExperience } from "@/lib/experiences";
import { isExperienceType } from "@/lib/site";
import { BookingForm } from "./BookingForm";

// Figma "Réservation — UI Desktop 1920" (node 310:471): choose a session, fill in contact details,
// then pay on Stripe Checkout (no account). Header (01) and footer (06) are in the site layout.

type Props = PageProps<"/experiences/[type]/[slug]/reserver">;

async function findBookableExperience(props: Props) {
  const { type, slug } = await props.params;
  const experience = isExperienceType(type) ? await getExperience(type, slug) : undefined;
  if (!experience?.bookingPrice) notFound();
  return { ...experience, bookingPrice: experience.bookingPrice };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const experience = await findBookableExperience(props);
  return { title: `Réserver — ${experience.title}`, robots: { index: false } };
}

const steps = [
  { title: "Choisissez une session", text: "Date, horaire et places restantes sont affichés pour chaque session." },
  { title: "Renseignez vos coordonnées", text: "Nom, email, téléphone et nombre de places, sans créer de compte." },
  { title: "Payez en ligne", text: "Carte bancaire, Apple Pay ou Google Pay, sur une page de paiement sécurisée." },
  { title: "Recevez la confirmation", text: "Un email avec le récapitulatif, le lieu et les conditions d'annulation." },
];

export default async function BookingPage(props: Props) {
  const experience = await findBookableExperience(props);
  const [sessions, { session: sessionParam }] = await Promise.all([
    getBookableSessions(experience.id),
    props.searchParams,
  ]);
  const selected = sessions.find((session) => String(session.id) === sessionParam && session.remaining > 0);
  const price = formatEuros(experience.bookingPrice);

  return (
    <>
      {/* 02 — Titre */}
      <section className="relative overflow-hidden bg-brand">
        <div className={`${containerClassName} relative flex flex-col items-start gap-8 pt-12 pb-[calc(5vw+5rem)] lg:pt-24 lg:pb-[calc(5vw+8rem)]`}>
          <Sticker>Réservation</Sticker>
          <h1 className="font-display text-[clamp(2.5rem,3.75vw,4.5rem)] leading-[0.95] font-extrabold">
            Réserver : {experience.title}
          </h1>
          <p className="max-w-[1100px] text-lg leading-[1.2] lg:text-[22px]">
            Choisissez votre session et le nombre de places, renseignez vos coordonnées, et c&apos;est tout
            cuit : le paiement se fait en ligne, sans créer de compte.
          </p>
        </div>
        <SlopeCut color="vert-clair" />
        <Image
          src="/deco/tomate-illustree.svg"
          alt=""
          width={229}
          height={290}
          className="pointer-events-none absolute -bottom-[125px] -left-8 hidden w-[150px] -rotate-10 sm:block lg:w-[229px]"
        />
      </section>

      {/* 03 — Sessions */}
      <section className={`${slopedSectionClassName} bg-brand-subtle`}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <SectionHeading eyebrow="Sessions" title="1. Choisissez votre session" />
          {sessions.length === 0 ? (
            <p className="max-w-[900px] text-lg leading-[1.55] lg:text-[22px] lg:leading-[1.2]">
              Aucune date n&apos;est ouverte pour le moment.{" "}
              <a href="#newsletter" className="underline">
                Inscrivez-vous à la newsletter
              </a>{" "}
              pour être prévenu·e des prochaines, ou{" "}
              <Link href={`/devis?experience=${experience.slug}`} className="underline">
                demandez un devis
              </Link>{" "}
              pour un groupe.
            </p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session) => {
                const isSelected = session.id === selected?.id;
                const full = session.remaining === 0;
                return (
                  <li
                    key={session.id}
                    className={`flex flex-col justify-between gap-6 border-2 border-ink p-8 shadow-cut lg:p-10 ${isSelected ? "bg-accent-subtle outline-4 outline-primary" : "bg-white"}`}
                  >
                    <div className="flex flex-col gap-4">
                      <p className="text-lg leading-[1.4] font-semibold text-ink-soft">
                        {formatSessionDate(session.startsAt)}
                      </p>
                      <p className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">
                        {full ? "Complet" : formatSessionTime(session.startsAt)}
                      </p>
                      <p className="text-lg leading-[1.55] text-ink-soft">
                        {full
                          ? "Laissez votre email pour être prévenu·e de la prochaine date."
                          : `${session.remaining} place${session.remaining > 1 ? "s" : ""} restante${session.remaining > 1 ? "s" : ""}`}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-8 pt-6">
                      {/* Figma "Prix" sticker */}
                      <p className="rotate-2 rounded-[4px] border-2 border-ink bg-accent px-4 py-2 text-lg leading-[1.4] font-semibold">
                        {price} par personne
                      </p>
                      {full ? (
                        <a href="#newsletter" className={darkButtonClassName}>
                          Me prévenir
                        </a>
                      ) : (
                        <Link
                          href={`?session=${session.id}#coordonnees`}
                          scroll={false}
                          aria-current={isSelected ? "true" : undefined}
                          className={isSelected ? darkButtonClassName : buttonClassName}
                        >
                          {isSelected ? "Session choisie" : "Choisir"}
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <SlopeCut color={sessions.length > 0 ? "blanc" : "vert-clair"} />
      </section>

      {/* 04 — Coordonnées */}
      {sessions.length > 0 && (
        <section id="coordonnees" className={`${slopedSectionClassName} scroll-mt-24`}>
          <div className={`${containerClassName} relative`}>
            <BookingForm
              // Remount on session change so the seat count and errors start fresh.
              key={selected?.id ?? "none"}
              heading={
                <div className="flex flex-col gap-8">
                  <SectionHeading eyebrow="Coordonnées" title="2. Vos coordonnées" />
                  <p className="text-lg leading-[1.2] lg:text-[22px]">
                    Aucun compte à créer. Vous recevez la confirmation par email.
                  </p>
                </div>
              }
              price={experience.bookingPrice}
              session={
                selected
                  ? {
                      id: selected.id,
                      label: `${formatSessionDate(selected.startsAt)} à ${formatSessionTime(selected.startsAt)}`,
                      remaining: selected.remaining,
                    }
                  : null
              }
              summary={[
                [experience.title, experience.duration].filter(Boolean).join(" · "),
                ...(experience.practical?.address ? [experience.practical.address] : []),
                ...(experience.practical?.cancellation ? [experience.practical.cancellation] : []),
              ]}
            />
          </div>
          <SlopeCut color="vert-clair" />
        </section>
      )}

      {/* 05 — Déroulé */}
      <section className="bg-brand-subtle pt-20 pb-20 lg:pt-32 lg:pb-32">
        <div className={`${containerClassName} flex flex-col gap-14`}>
          <SectionHeading eyebrow="Déroulé" title="Comment se passe la réservation ?" />
          <Steps items={steps} />
        </div>
      </section>
    </>
  );
}
