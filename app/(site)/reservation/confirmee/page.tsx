import type { Metadata } from "next";
import Link from "next/link";
import { eyebrowClassName, ghostButtonClassName, outlineButtonClassName } from "@/components/home/Section";
import { confirmBooking } from "@/lib/bookings";
import { getStripe } from "@/lib/stripe";

// Stripe Checkout's success_url. Layout from the Figma state "Confirmation de réservation"
// (node 80:1887).

export const metadata: Metadata = {
  title: "Réservation confirmée",
  robots: { index: false },
};

async function bookingStatus(checkoutId: string) {
  if (!checkoutId.startsWith("cs_")) return "invalid";
  try {
    const checkout = await getStripe().checkout.sessions.retrieve(checkoutId);
    // Also confirms here in case the webhook hasn't arrived (or isn't set up locally).
    return (await confirmBooking(checkout)) ? "paid" : "processing";
  } catch {
    return "invalid";
  }
}

const messages = {
  paid: {
    title: "Merci, votre réservation est confirmée",
    text: "Vous allez recevoir un e-mail avec le récapitulatif, le lieu et les conditions d'annulation.",
  },
  processing: {
    title: "Merci, votre paiement est en cours de traitement",
    text: "Vous recevrez un e-mail de confirmation dès qu'il sera validé.",
  },
  invalid: {
    title: "Réservation introuvable",
    text: "Ce lien n'est pas valide. Si vous avez été débité·e, écrivez-nous depuis la page contact.",
  },
};

export default async function BookingConfirmedPage(props: PageProps<"/reservation/confirmee">) {
  const { session_id } = await props.searchParams;
  const status = await bookingStatus(typeof session_id === "string" ? session_id : "");
  const message = messages[status];

  return (
    <section className="mx-auto max-w-3xl space-y-6 px-4 py-24 text-center">
      <p className={eyebrowClassName}>Réservation</p>
      <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">{message.title}</h1>
      <p className="text-lg opacity-80">{message.text}</p>
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link href="/podcast" className={outlineButtonClassName}>
          Écouter le podcast
        </Link>
        <Link href={status === "invalid" ? "/contact" : "/experiences"} className={ghostButtonClassName}>
          {status === "invalid" ? "Nous contacter" : "Voir les autres expériences"}
        </Link>
      </div>
    </section>
  );
}
