import "server-only";
import { sql } from "@payloadcms/db-postgres/drizzle";
import type Stripe from "stripe";
import type { Payload } from "payload";
import { detailsHtml, escapeHtml, notifyEmail, sendEmailSafely } from "@/lib/emails";
import { getPayloadClient } from "@/lib/payload";
import type { Booking, Session } from "@/payload-types";

// Stripe Checkout links last 31 minutes (Stripe's minimum is 30). Unpaid bookings hold their
// seats a little longer, so a visitor still on the payment page never loses their place.
export const CHECKOUT_MINUTES = 31;
const HOLD_MINUTES = 35;

const parisDate = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});
const parisTime = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });

export function formatSessionDate(startsAt: string) {
  const date = parisDate.format(new Date(startsAt));
  return date.charAt(0).toUpperCase() + date.slice(1);
}

export function formatSessionTime(startsAt: string) {
  return parisTime.format(new Date(startsAt)).replace(":", " h ");
}

export const formatEuros = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(amount);

// Seats taken per session: paid bookings plus the ones still in their payment window.
async function takenSeats(payload: Payload, sessionIds: number[]) {
  const taken = new Map<number, number>();
  if (sessionIds.length === 0) return taken;
  const holdStart = new Date(Date.now() - HOLD_MINUTES * 60_000).toISOString();
  const { docs } = await payload.find({
    collection: "bookings",
    where: {
      session: { in: sessionIds },
      or: [
        { status: { equals: "payee" } },
        { and: [{ status: { equals: "en-attente" } }, { createdAt: { greater_than: holdStart } }] },
      ],
    },
    pagination: false,
    depth: 0,
    select: { session: true, seats: true },
  });
  for (const booking of docs) {
    const id = booking.session as number;
    taken.set(id, (taken.get(id) ?? 0) + booking.seats);
  }
  return taken;
}

export type BookableSession = Pick<Session, "id" | "startsAt" | "capacity"> & { remaining: number };

// Upcoming sessions of an experience, with their remaining seats.
export async function getBookableSessions(experienceId: number): Promise<BookableSession[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "sessions",
    where: { experience: { equals: experienceId }, startsAt: { greater_than: new Date().toISOString() } },
    sort: "startsAt",
    pagination: false,
    depth: 0,
    select: { startsAt: true, capacity: true },
  });
  const taken = await takenSeats(payload, docs.map((session) => session.id));
  return docs.map((session) => ({
    id: session.id,
    startsAt: session.startsAt,
    capacity: session.capacity,
    remaining: Math.max(0, session.capacity - (taken.get(session.id) ?? 0)),
  }));
}

// Called by the Stripe webhook and by the confirmation page (whichever comes first, so a missing
// webhook in development doesn't leave bookings unpaid). The status switch is a single SQL
// update: when both arrive at the same time, only one of them sends the emails.
export async function confirmBooking(checkout: Stripe.Checkout.Session) {
  const bookingId = Number(checkout.metadata?.bookingId);
  if (checkout.payment_status !== "paid" || !bookingId) return null;

  const payload = await getPayloadClient();
  const { rows } = await payload.db.drizzle.execute(
    sql`update bookings set status = 'payee' where id = ${bookingId} and status = 'en-attente' returning id`,
  );

  const booking = await payload.update({
    collection: "bookings",
    id: bookingId,
    data: {
      amount: (checkout.amount_total ?? 0) / 100,
      stripePaymentIntentId:
        typeof checkout.payment_intent === "string" ? checkout.payment_intent : checkout.payment_intent?.id,
    },
    depth: 1,
  });

  if (rows.length > 0) await sendBookingEmails(payload, booking);
  return booking;
}

async function sendBookingEmails(payload: Payload, booking: Booking) {
  const experience = typeof booking.experience === "object" ? booking.experience : null;
  const session = typeof booking.session === "object" ? booking.session : null;
  const when = session ? `${formatSessionDate(session.startsAt)} à ${formatSessionTime(session.startsAt)}` : undefined;
  const details = detailsHtml([
    ["Expérience", experience?.title],
    ["Date", when],
    ["Lieu", experience?.practical?.address ?? experience?.location],
    ["Places", booking.seats],
    ["Montant payé", booking.amount != null ? formatEuros(booking.amount) : undefined],
    ["Annulation", experience?.practical?.cancellation],
  ]);

  await Promise.all([
    sendEmailSafely(payload, {
      to: booking.email,
      subject: `Votre réservation est confirmée — ${experience?.title ?? "Maison La Recette"}`,
      html:
        `<p>Bonjour ${escapeHtml(booking.name)},</p>` +
        `<p>Merci, votre réservation est confirmée ! Voici le récapitulatif :</p>` +
        details +
        `<p>À très vite,<br>L'équipe Maison La Recette</p>`,
    }),
    sendEmailSafely(payload, {
      to: notifyEmail(),
      replyTo: booking.email,
      subject: `Nouvelle réservation — ${experience?.title ?? ""} (${booking.seats} pl.)`,
      html:
        `<p>Nouvelle réservation payée n° ${booking.id}.</p>` +
        detailsHtml([
          ["Nom", booking.name],
          ["E-mail", booking.email],
          ["Téléphone", booking.phone],
        ]) +
        details,
    }),
  ]);
}
