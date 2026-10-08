"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { CHECKOUT_MINUTES, formatSessionDate, formatSessionTime, getBookableSessions } from "@/lib/bookings";
import { experienceHref } from "@/lib/experiences";
import { type FormState, fieldErrors, HONEYPOT_FIELD, pickFields } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";
import { getStripe, siteUrl } from "@/lib/stripe";

const bookingFields = ["session", "seats", "name", "email", "phone", "cgv"] as const;

export type BookingField = (typeof bookingFields)[number];
export type BookingFormState = FormState<BookingField>;

const bookingSchema = z.object({
  session: z.coerce.number().int().positive("Choisissez une session"),
  seats: z.coerce.number("Indiquez un nombre de places").int("Nombre entier attendu").min(1, "Au moins 1 place").max(50),
  name: z.string().trim().min(1, "Indiquez votre nom").max(200),
  email: z.email("Adresse e-mail invalide"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s.()-]{5,}$/, "Numéro de téléphone invalide"),
  cgv: z.literal("on", "Vous devez accepter les CGV et les conditions d'annulation"),
});

// Saves a pending booking, then sends the visitor to Stripe Checkout. The booking is marked as
// paid by the webhook or the confirmation page (lib/bookings.ts → confirmBooking).
export async function startBooking(_: BookingFormState, formData: FormData): Promise<BookingFormState> {
  if (formData.get(HONEYPOT_FIELD)) return { status: "idle" };

  const values = pickFields(formData, bookingFields);
  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", errors: fieldErrors<BookingField>(parsed.error.issues), values };
  }
  const data = parsed.data;

  // Price and seats come from the database, never from the form.
  const payload = await getPayloadClient();
  const session = await payload
    .findByID({ collection: "sessions", id: data.session, depth: 1 })
    .catch(() => null);
  const experience = typeof session?.experience === "object" ? session.experience : null;
  const bookable = experience?.bookingPrice ? await getBookableSessions(experience.id) : [];
  const remaining = bookable.find((option) => option.id === data.session)?.remaining ?? 0;
  if (!session || !experience?.bookingPrice || remaining === 0) {
    return { status: "error", errors: { session: "Cette session n'est plus disponible, choisissez-en une autre." }, values };
  }
  if (data.seats > remaining) {
    return {
      status: "error",
      errors: { seats: `Il ne reste que ${remaining} place${remaining > 1 ? "s" : ""} pour cette session.` },
      values,
    };
  }

  const booking = await payload.create({
    collection: "bookings",
    data: {
      experience: experience.id,
      session: session.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      seats: data.seats,
      status: "en-attente",
    },
  });

  const bookingPage = `${siteUrl()}${experienceHref(experience)}/reserver?session=${session.id}`;
  let checkoutUrl: string | null;
  try {
    const checkout = await getStripe().checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      customer_email: data.email,
      allow_promotion_codes: true,
      line_items: [
        {
          quantity: data.seats,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(experience.bookingPrice * 100),
            product_data: {
              name: experience.title,
              description: `${formatSessionDate(session.startsAt)} à ${formatSessionTime(session.startsAt)}`,
            },
          },
        },
      ],
      client_reference_id: String(booking.id),
      metadata: { bookingId: String(booking.id) },
      expires_at: Math.floor(Date.now() / 1000) + CHECKOUT_MINUTES * 60,
      success_url: `${siteUrl()}/reservation/confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: bookingPage,
    });
    checkoutUrl = checkout.url;
    await payload.update({ collection: "bookings", id: booking.id, data: { stripeSessionId: checkout.id } });
  } catch (error) {
    payload.logger.error({ err: error, msg: "Création de la session Stripe Checkout impossible" });
    checkoutUrl = null;
  }

  if (!checkoutUrl) {
    // Frees the seats right away.
    await payload.update({ collection: "bookings", id: booking.id, data: { status: "expiree" } });
    return {
      status: "error",
      errors: { session: "Le paiement en ligne est momentanément indisponible. Réessayez dans quelques minutes." },
      values,
    };
  }

  // Outside the try: redirect() works by throwing.
  redirect(checkoutUrl);
}
