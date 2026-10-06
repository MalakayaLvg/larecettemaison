"use client";

import { useActionState } from "react";
import {
  HoneypotField,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { quoteLocations } from "@/lib/forms";
import type { QuoteServiceGroup } from "@/lib/quote-services";
import { type QuoteFormState, submitQuote } from "./actions";

const initialState: QuoteFormState = { status: "idle" };

export function QuoteForm({
  services,
  defaultService,
}: {
  services: QuoteServiceGroup[];
  defaultService?: string;
}) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-black/10 p-6">
        <h2 className="font-semibold">Merci, votre demande est bien envoyée !</h2>
        <p className="mt-2 opacity-80">
          Vous allez recevoir un e-mail de confirmation. Nous revenons vers vous sous 48 h.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : { service: defaultService };

  return (
    <form action={formAction} noValidate className="relative grid gap-5 sm:grid-cols-2">
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 sm:col-span-2">
          Merci de corriger les champs indiqués.
        </p>
      )}

      <TextField name="company" label="Entreprise" required autoComplete="organization" defaultValue={values.company} error={errors.company} />
      <TextField name="contactName" label="Nom et prénom" required autoComplete="name" defaultValue={values.contactName} error={errors.contactName} />
      <TextField name="jobTitle" label="Fonction" autoComplete="organization-title" defaultValue={values.jobTitle} error={errors.jobTitle} />
      <TextField name="email" label="E-mail" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
      <TextField name="phone" label="Téléphone" type="tel" required autoComplete="tel" defaultValue={values.phone} error={errors.phone} />

      <SelectField name="service" label="Prestation souhaitée" required defaultValue={values.service} error={errors.service}>
        <option value="" disabled>
          Choisir…
        </option>
        {services.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
        <option value="autre">Autre / je ne sais pas encore</option>
      </SelectField>

      <TextField name="participants" label="Nombre de participants" type="number" defaultValue={values.participants} error={errors.participants} />
      <TextField name="desiredDate" label="Date souhaitée" hint="Une date précise ou une période." defaultValue={values.desiredDate} error={errors.desiredDate} />

      <SelectField name="location" label="Lieu" defaultValue={values.location} error={errors.location}>
        <option value="">Non précisé</option>
        {quoteLocations.map((location) => (
          <option key={location.value} value={location.value}>
            {location.label}
          </option>
        ))}
      </SelectField>
      <TextField name="budget" label="Budget" defaultValue={values.budget} error={errors.budget} />

      <TextAreaField name="message" label="Votre projet" className="sm:col-span-2" defaultValue={values.message} error={errors.message} />

      <HoneypotField />
      <div className="sm:col-span-2">
        <SubmitButton pending={pending}>Envoyer la demande</SubmitButton>
      </div>
    </form>
  );
}
