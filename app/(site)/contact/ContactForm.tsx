"use client";

import { useActionState } from "react";
import { FormSuccess, HoneypotField, SubmitButton, TextAreaField, TextField } from "@/components/forms/fields";
import { type ContactFormState, submitContact } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <FormSuccess title="Merci, votre message est bien envoyé !">
        Vous allez recevoir un e-mail de confirmation. Nous vous répondons très vite.
      </FormSuccess>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form action={formAction} noValidate className="relative grid gap-6 sm:grid-cols-2">
      {state.status === "error" && (
        <p role="alert" className="text-lg font-semibold text-red-700 sm:col-span-2">
          Merci de corriger les champs indiqués.
        </p>
      )}

      <TextField name="name" label="Nom" required autoComplete="name" defaultValue={values.name} error={errors.name} />
      <TextField name="email" label="E-mail" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
      <TextField name="subject" label="Sujet" required className="sm:col-span-2" defaultValue={values.subject} error={errors.subject} />
      <TextAreaField name="message" label="Message" required className="sm:col-span-2" defaultValue={values.message} error={errors.message} />

      <HoneypotField />
      <div className="sm:col-span-2">
        <SubmitButton pending={pending}>Envoyer le message</SubmitButton>
      </div>
    </form>
  );
}
