import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cardClassName, eyebrowClassName, outlineButtonClassName, Section } from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { formatEuros, formatSessionDate, formatSessionTime, getBookableSessions } from "@/lib/bookings";
import { getExperience } from "@/lib/experiences";
import { isExperienceType } from "@/lib/site";
import { BookingForm } from "./BookingForm";

// Layout from the Figma wireframe "Réservation — Desktop 1920" (node 36:401): choose a session,
// fill in contact details, then pay on Stripe Checkout (no account).

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
  { title: "Renseignez vos coordonnées", text: "Nom, e-mail, téléphone et nombre de places, sans créer de compte." },
  { title: "Payez en ligne", text: "Carte bancaire, Apple Pay ou Google Pay, sur une page de paiement sécurisée." },
  { title: "Recevez la confirmation", text: "Un e-mail avec le récapitulatif, le lieu et les conditions d'annulation." },
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
      <section className="bg-foreground/[0.04]">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-center sm:py-24">
          <p className={eyebrowClassName}>Réservation</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
            Réserver : {experience.title}
          </h1>
          <p className="text-lg opacity-80">
            Choisissez votre session et le nombre de places, puis renseignez vos coordonnées. Le paiement se fait en
            ligne, sans créer de compte.
          </p>
        </div>
      </section>

      <Section title="1. Choisissez votre session">
        {sessions.length === 0 ? (
          <p className="text-lg opacity-80">
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
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => {
              const isSelected = session.id === selected?.id;
              const full = session.remaining === 0;
              return (
                <li
                  key={session.id}
                  className={`${cardClassName} space-y-3 p-6 ${isSelected ? "border-2 border-primary" : ""}`}
                >
                  <p className="font-medium opacity-70">{formatSessionDate(session.startsAt)}</p>
                  <p className="text-xl font-bold">{full ? "Complet" : formatSessionTime(session.startsAt)}</p>
                  <p className="opacity-80">
                    {full
                      ? "Laissez votre e-mail pour être prévenu·e de la prochaine date."
                      : `${session.remaining} place${session.remaining > 1 ? "s" : ""} restante${session.remaining > 1 ? "s" : ""}`}
                  </p>
                  <p className="font-bold">{price} par personne</p>
                  {full ? (
                    <a href="#newsletter" className="inline-block font-medium underline">
                      Me prévenir
                    </a>
                  ) : (
                    <Link
                      href={`?session=${session.id}#coordonnees`}
                      scroll={false}
                      aria-current={isSelected ? "true" : undefined}
                      className={`${outlineButtonClassName} !h-11 !px-6 !text-base`}
                    >
                      {isSelected ? "Session choisie" : "Choisir"}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      {sessions.length > 0 && (
        <section id="coordonnees" className="scroll-mt-24 bg-foreground/[0.04]">
          <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:py-24">
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">2. Vos coordonnées</h2>
              <p className="opacity-80">Aucun compte à créer. Vous recevez la confirmation par e-mail.</p>
            </div>
            <BookingForm
              // Remount on session change so the seat count and errors start fresh.
              key={selected?.id ?? "none"}
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
        </section>
      )}

      <Section title="Comment se passe la réservation ?">
        <Steps items={steps} />
      </Section>
    </>
  );
}
