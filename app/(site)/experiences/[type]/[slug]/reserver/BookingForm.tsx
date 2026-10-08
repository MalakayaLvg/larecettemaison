"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { controlClassName, HoneypotField, SubmitButton, TextField } from "@/components/forms/fields";
import { type BookingFormState, startBooking } from "./actions";

const initialState: BookingFormState = { status: "idle" };

const euros = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(amount);

// Figma "04 — Coordonnées" (Réservation V4, node 310:703): the section heading and the
// "Récapitulatif" card on the left, the "Vos informations" form on the right. The total is only an
// estimate: Stripe applies promo codes and computes the amount actually paid.
export function BookingForm({
  heading,
  session,
  price,
  summary,
}: {
  heading: React.ReactNode;
  session: { id: number; label: string; remaining: number } | null;
  price: number;
  summary: string[];
}) {
  const [state, formAction, pending] = useActionState(startBooking, initialState);
  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : { seats: "1" };
  const [seats, setSeats] = useState(Number(values.seats) || 1);

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[640fr_1056fr] lg:gap-16">
      <div className="flex flex-col gap-10">
        {heading}
        <div className="flex flex-col gap-4 border-2 border-ink bg-brand-subtle p-8 text-lg leading-[1.4] font-semibold shadow-cut lg:p-10">
          <h3 className="font-display text-2xl leading-[1.25] font-bold">Récapitulatif</h3>
          {summary.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>{session ? session.label : "Session : à choisir ci-dessus"}</p>
          <p>
            {seats} × {euros(price)} = {euros(seats * price)} TTC
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-2 border-ink bg-white p-6 shadow-cut sm:p-8 lg:p-12">
        <h3 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">Vos informations</h3>
        {!session ? (
          <p className="text-lg leading-[1.55] text-ink-soft">Choisissez d&apos;abord une session ci-dessus.</p>
        ) : (
          <form action={formAction} noValidate className="relative grid items-start gap-6 sm:grid-cols-2">
            {errors.session && (
              <p role="alert" className="text-lg font-semibold text-red-700 sm:col-span-2">
                {errors.session}
              </p>
            )}
            <input type="hidden" name="session" value={session.id} />

            <div>
              <label htmlFor="seats" className="mb-2 block text-lg leading-[1.4] font-semibold">
                Nombre de places *
              </label>
              <input
                id="seats"
                name="seats"
                type="number"
                min={1}
                max={session.remaining}
                required
                defaultValue={values.seats}
                onChange={(event) => setSeats(Math.max(1, Number(event.target.value) || 1))}
                aria-invalid={errors.seats ? true : undefined}
                aria-describedby="seats-hint"
                className={`${controlClassName} h-14`}
              />
              <p
                id="seats-hint"
                className={`mt-1 text-[15px] leading-[1.45] ${errors.seats ? "font-semibold text-red-700" : "text-ink-soft"}`}
              >
                {errors.seats ??
                  `${session.remaining} place${session.remaining > 1 ? "s" : ""} restante${session.remaining > 1 ? "s" : ""}`}
              </p>
            </div>
            <TextField name="name" label="Nom" required autoComplete="name" defaultValue={values.name} error={errors.name} />
            <TextField name="email" label="Email" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
            <TextField name="phone" label="Téléphone" type="tel" required autoComplete="tel" defaultValue={values.phone} error={errors.phone} />

            <div className="sm:col-span-2">
              <label className="flex items-center gap-4 text-lg leading-[1.4] font-semibold">
                {/* Figma "case": 28px white square with a navy border, filled when checked. */}
                <input
                  type="checkbox"
                  name="cgv"
                  required
                  defaultChecked={values.cgv === "on"}
                  aria-invalid={errors.cgv ? true : undefined}
                  aria-describedby={errors.cgv ? "cgv-error" : undefined}
                  className="size-7 shrink-0 cursor-pointer appearance-none rounded-md border-2 border-ink bg-white checked:bg-ink checked:shadow-[inset_0_0_0_4px_white] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none aria-invalid:border-red-600"
                />
                <span>
                  J&apos;accepte les{" "}
                  <Link href="/cgv" target="_blank" className="underline">
                    CGV
                  </Link>{" "}
                  et les conditions d&apos;annulation *
                </span>
              </label>
              {errors.cgv && (
                <p id="cgv-error" className="mt-1 text-[15px] font-semibold text-red-700">
                  {errors.cgv}
                </p>
              )}
            </div>

            <HoneypotField />
            <div className="flex flex-col items-start gap-3 sm:col-span-2">
              <SubmitButton pending={pending} pendingLabel="Redirection vers le paiement…">
                Payer en ligne
              </SubmitButton>
              <p className="text-[15px] leading-[1.45] text-ink-soft">
                Paiement sécurisé par Stripe. Code promo à saisir sur la page de paiement.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
