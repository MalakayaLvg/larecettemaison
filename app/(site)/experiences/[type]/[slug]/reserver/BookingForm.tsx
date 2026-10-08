"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { HoneypotField, TextField } from "@/components/forms/fields";
import { buttonClassName, cardClassName } from "@/components/home/Section";
import { type BookingFormState, startBooking } from "./actions";

const initialState: BookingFormState = { status: "idle" };

const euros = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(amount);

// "Récapitulatif" card and "Vos informations" form from the wireframe, side by side. The total
// is only an estimate: Stripe applies promo codes and computes the amount actually paid.
export function BookingForm({
  session,
  price,
  summary,
}: {
  session: { id: number; label: string; remaining: number } | null;
  price: number;
  summary: string[];
}) {
  const [state, formAction, pending] = useActionState(startBooking, initialState);
  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : { seats: "1" };
  const [seats, setSeats] = useState(Number(values.seats) || 1);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className={`${cardClassName} space-y-3 p-6`}>
        <h3 className="text-lg font-bold">Récapitulatif</h3>
        {summary.map((line) => (
          <p key={line} className="opacity-80">
            {line}
          </p>
        ))}
        <p className="opacity-80">{session ? session.label : "Session : à choisir ci-dessus"}</p>
        <p className="font-bold">
          {seats} × {euros(price)} = {euros(seats * price)} TTC
        </p>
      </div>

      <div className={`${cardClassName} p-6`}>
        <h3 className="mb-5 text-lg font-bold">Vos informations</h3>
        {!session ? (
          <p className="opacity-80">Choisissez d&apos;abord une session ci-dessus.</p>
        ) : (
          <form action={formAction} noValidate className="relative grid gap-5 sm:grid-cols-2">
            {errors.session && (
              <p role="alert" className="text-sm text-red-600 sm:col-span-2">
                {errors.session}
              </p>
            )}
            <input type="hidden" name="session" value={session.id} />

            <div>
              <label htmlFor="seats" className="mb-1 block text-sm font-medium">
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
                className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 focus:border-foreground focus:outline-none aria-invalid:border-red-600"
              />
              <p id="seats-hint" className={`mt-1 text-sm ${errors.seats ? "text-red-600" : "text-xs opacity-60"}`}>
                {errors.seats ?? `${session.remaining} place${session.remaining > 1 ? "s" : ""} restante${session.remaining > 1 ? "s" : ""}`}
              </p>
            </div>
            <TextField name="name" label="Nom" required autoComplete="name" defaultValue={values.name} error={errors.name} />
            <TextField name="email" label="E-mail" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
            <TextField name="phone" label="Téléphone" type="tel" required autoComplete="tel" defaultValue={values.phone} error={errors.phone} />

            <div className="sm:col-span-2">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="cgv"
                  required
                  defaultChecked={values.cgv === "on"}
                  aria-invalid={errors.cgv ? true : undefined}
                  aria-describedby={errors.cgv ? "cgv-error" : undefined}
                  className="mt-1 size-4"
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
                <p id="cgv-error" className="mt-1 text-sm text-red-600">
                  {errors.cgv}
                </p>
              )}
            </div>

            <HoneypotField />
            <div className="space-y-2 sm:col-span-2">
              <button type="submit" disabled={pending} className={`${buttonClassName} disabled:opacity-50`}>
                {pending ? "Redirection vers le paiement…" : "Payer en ligne"}
              </button>
              <p className="text-sm opacity-60">Paiement sécurisé par Stripe. Code promo à saisir sur la page de paiement.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
