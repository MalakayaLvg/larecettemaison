import type Stripe from "stripe";
import { confirmBooking } from "@/lib/bookings";
import { getPayloadClient } from "@/lib/payload";
import { getStripe } from "@/lib/stripe";

// Stripe → site notifications. In development: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
// prints the STRIPE_WEBHOOK_SECRET to use. Events to enable in production:
// checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.expired.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) return Response.json({ error: "Non autorisé" }, { status: 400 });

  let event: Stripe.Event;
  try {
    // The signature covers the raw body: read it as text, before any JSON parsing.
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return Response.json({ error: "Signature invalide" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await confirmBooking(event.data.object);
      break;
    case "checkout.session.expired": {
      const bookingId = Number(event.data.object.metadata?.bookingId);
      if (bookingId) {
        const payload = await getPayloadClient();
        await payload.update({
          collection: "bookings",
          where: { id: { equals: bookingId }, status: { equals: "en-attente" } },
          data: { status: "expiree" },
        });
      }
      break;
    }
  }

  return Response.json({ received: true });
}
