"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type NewsletterFormState } from "@/app/(site)/newsletter/actions";
import { HoneypotField } from "@/components/forms/fields";

const initialState: NewsletterFormState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  if (state.status === "success") {
    return (
      <p role="status" className="text-sm">
        Presque fini ! Confirmez votre inscription grâce au lien envoyé par e-mail.
      </p>
    );
  }

  const error = state.status === "error" ? state.errors.email : undefined;
  return (
    <form action={formAction} noValidate className="relative">
      <label htmlFor="newsletter-email" className="text-sm font-medium">
        Recevoir la newsletter
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          defaultValue={state.status === "error" ? state.values.email : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-email-error" : undefined}
          className="min-w-0 flex-1 rounded-md border border-black/15 bg-transparent px-3 py-1.5 text-sm focus:border-foreground focus:outline-none aria-invalid:border-red-600"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "…" : "S'inscrire"}
        </button>
      </div>
      {error && (
        <p id="newsletter-email-error" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      <HoneypotField />
    </form>
  );
}
