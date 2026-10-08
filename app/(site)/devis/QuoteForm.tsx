"use client";

import { useActionState } from "react";
import {
  FormSuccess,
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
  groupFields = true,
  submitLabel = "Envoyer la demande",
}: {
  services: QuoteServiceGroup[];
  defaultService?: string;
  // Participants and location only make sense for experiences (hidden on the Studio page).
  groupFields?: boolean;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);

  if (state.status === "success") {
    return (
      <FormSuccess title="Merci, votre demande est bien envoyée !">
        Vous allez recevoir un e-mail de confirmation. Nous revenons vers vous sous 48 h.
      </FormSuccess>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : { service: defaultService };

  return (
    <form action={formAction} noValidate className="relative grid gap-6 sm:grid-cols-2">
      {state.status === "error" && (
        <p role="alert" className="text-lg font-semibold text-red-700 sm:col-span-2">
          Merci de corriger les champs indiqués.
        </p>
      )}

      <TextField name="company" label="Entreprise" required autoComplete="organization" defaultValue={values.company} error={errors.company} />
      <TextField name="contactName" label="Nom" required autoComplete="name" defaultValue={values.contactName} error={errors.contactName} />
      <TextField name="jobTitle" label="Fonction" autoComplete="organization-title" defaultValue={values.jobTitle} error={errors.jobTitle} />
      <TextField name="email" label="Email" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
      <TextField name="phone" label="Téléphone" type="tel" required autoComplete="tel" defaultValue={values.phone} error={errors.phone} />

      <SelectField name="service" label="Type de prestation" required defaultValue={values.service} error={errors.service}>
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

      {groupFields && (
        <TextField name="participants" label="Nombre de participants" type="number" defaultValue={values.participants} error={errors.participants} />
      )}
      <TextField name="desiredDate" label="Date / période" defaultValue={values.desiredDate} error={errors.desiredDate} />

      {groupFields && (
        <SelectField name="location" label="Lieu" defaultValue={values.location} error={errors.location}>
          <option value="">Non précisé</option>
          {quoteLocations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </SelectField>
      )}
      <TextField name="budget" label="Budget" defaultValue={values.budget} error={errors.budget} />

      <TextAreaField name="message" label="Message" className="sm:col-span-2" defaultValue={values.message} error={errors.message} />

      <HoneypotField />
      <div className="sm:col-span-2">
        <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
