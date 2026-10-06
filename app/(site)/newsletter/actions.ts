"use server";

import { z } from "zod";
import { fieldErrors, type FormState, HONEYPOT_FIELD, pickFields } from "@/lib/forms";
import { confirmSubscription, requestSubscription, type TokenStatus, unsubscribe } from "@/lib/newsletter";

const subscribeSchema = z.object({ email: z.email("Adresse e-mail invalide") });

export type NewsletterFormState = FormState<"email">;

export async function subscribeNewsletter(
  _: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const values = pickFields(formData, ["email"]);
  const parsed = subscribeSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", errors: fieldErrors<"email">(parsed.error.issues), values };
  }

  await requestSubscription(parsed.data.email);
  return { status: "success" };
}

export async function confirmNewsletter(_: TokenStatus | null, formData: FormData) {
  return confirmSubscription(String(formData.get("token") ?? ""));
}

export async function unsubscribeNewsletter(_: TokenStatus | null, formData: FormData) {
  return unsubscribe(String(formData.get("token") ?? ""));
}
