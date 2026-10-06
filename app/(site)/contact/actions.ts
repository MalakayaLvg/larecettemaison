"use server";

import { z } from "zod";
import { detailsHtml, escapeHtml, notifyEmail, sendEmailSafely } from "@/lib/emails";
import { type ContactField, contactFields, fieldErrors, type FormState, HONEYPOT_FIELD, pickFields } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Indiquez votre nom").max(200),
  email: z.email("Adresse e-mail invalide"),
  subject: z.string().trim().min(1, "Indiquez un sujet").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Votre message est un peu court (10 caractères minimum)")
    .max(5000, "5000 caractères maximum"),
});

export type ContactFormState = FormState<ContactField>;

export async function submitContact(_: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Bots fill every field: pretend it worked and save nothing.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const values = pickFields(formData, contactFields);
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", errors: fieldErrors<ContactField>(parsed.error.issues), values };
  }

  const data = parsed.data;
  const payload = await getPayloadClient();
  await payload.create({ collection: "contact-messages", data });

  await Promise.all([
    sendEmailSafely(payload, {
      to: notifyEmail(),
      replyTo: data.email,
      subject: `Nouveau message — ${data.subject}`,
      html:
        "<p>Nouveau message reçu depuis le formulaire de contact.</p>" +
        detailsHtml([
          ["Nom", data.name],
          ["E-mail", data.email],
          ["Sujet", data.subject],
          ["Message", data.message],
        ]),
    }),
    sendEmailSafely(payload, {
      to: data.email,
      subject: "Nous avons bien reçu votre message — Maison La Recette",
      html:
        `<p>Bonjour ${escapeHtml(data.name)},</p>` +
        `<p>Merci pour votre message « ${escapeHtml(data.subject)} ». Nous vous répondons très vite.</p>` +
        `<p>L'équipe Maison La Recette</p>`,
    }),
  ]);

  return { status: "success" };
}
