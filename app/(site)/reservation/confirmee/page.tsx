import type { Metadata } from "next";
import Link from "next/link";
import { accentButtonClassName, darkButtonClassName } from "@/components/home/Section";
import { StateHero } from "@/components/StateHero";
import { confirmBooking } from "@/lib/bookings";
import { getStripe } from "@/lib/stripe";

// Stripe Checkout's success_url. Figma "États — Confirmation de réservation" (V4, node 310:1403).

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
    title: "Merci, votre réservation est confirmée : à très vite à table",
    text: "Vous allez recevoir un email avec le récapitulatif, le lieu et les conditions d'annulation.",
  },
  processing: {
    title: "Merci, votre paiement est en cours de traitement",
    text: "Vous recevrez un email de confirmation dès qu'il sera validé.",
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
    <StateHero eyebrow="Réservation" title={message.title} text={message.text} success={status !== "invalid"}>
      <div className="flex flex-wrap gap-4">
        <Link href="/podcast" className={darkButtonClassName}>
          Écouter le podcast
        </Link>
        <Link href={status === "invalid" ? "/contact" : "/experiences"} className={accentButtonClassName}>
          {status === "invalid" ? "Nous contacter" : "Voir les autres expériences"}
        </Link>
      </div>
    </StateHero>
  );
}
