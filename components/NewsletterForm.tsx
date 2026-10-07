"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type NewsletterFormState } from "@/app/(site)/newsletter/actions";
import { HoneypotField } from "@/components/forms/fields";
import { accentButtonClassName, buttonClassName } from "@/components/home/Section";

const initialState: NewsletterFormState = { status: "idle" };

// `id` must be unique on the page: the form appears in the footer and on some pages.
// `tone="dark"` is for the navy footer; `hideLabel` when a heading already introduces the form.
export function NewsletterForm({
  id = "newsletter-email",
  tone = "light",
  hideLabel = false,
}: {
  id?: string;
  tone?: "light" | "dark";
  hideLabel?: boolean;
}) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  if (state.status === "success") {
    return (
      <p role="status" className="text-lg">
        Presque fini ! Confirmez votre inscription grâce au lien envoyé par e-mail.
      </p>
    );
  }

  const error = state.status === "error" ? state.errors.email : undefined;
  const errorClassName = tone === "dark" ? "text-highlight-subtle" : "text-red-600";
  return (
    <form action={formAction} noValidate className="relative">
      <label htmlFor={id} className={hideLabel ? "sr-only" : "text-sm font-medium"}>
        Recevoir la newsletter
      </label>
      <div className={`flex flex-wrap gap-3 ${hideLabel ? "" : "mt-2"}`}>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          defaultValue={state.status === "error" ? state.values.email : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-14 min-w-48 flex-1 rounded-full border-2 border-ink bg-white px-6 text-lg text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent aria-invalid:border-red-600"
        />
        <button
          type="submit"
          disabled={pending}
          className={`${tone === "dark" ? accentButtonClassName : buttonClassName} disabled:opacity-50`}
        >
          {pending ? "…" : "S'inscrire"}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={`mt-2 ${errorClassName}`}>
          {error}
        </p>
      )}
      <HoneypotField />
    </form>
  );
}
