"use server";

import { z } from "zod";
import { detailsHtml, escapeHtml, notifyEmail, sendEmailSafely } from "@/lib/emails";
import {
  type FormState,
  HONEYPOT_FIELD,
  pickFields,
  type QuoteField,
  type QuoteLocation,
  quoteFields,
  quoteLocations,
} from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";
import { getQuoteServices, OTHER_SERVICE } from "@/lib/quote-services";

const optionalText = (max: number) =>
  z.string().trim().max(max, `${max} caractères maximum`).optional().transform((value) => value || undefined);

const quoteSchema = z.object({
  company: z.string().trim().min(1, "Indiquez le nom de votre entreprise").max(200),
  contactName: z.string().trim().min(1, "Indiquez votre nom").max(200),
  jobTitle: optionalText(200),
  email: z.email("Adresse e-mail invalide"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s.()-]{5,}$/, "Numéro de téléphone invalide"),
  service: z.string().min(1, "Choisissez une prestation"),
  participants: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .pipe(z.number().int("Nombre entier attendu").min(1, "Au moins 1 participant").max(10000).optional()),
  desiredDate: optionalText(200),
  location: z
    .enum(quoteLocations.map((location) => location.value) as [QuoteLocation, ...QuoteLocation[]])
    .optional()
    .or(z.literal("").transform(() => undefined)),
  budget: optionalText(200),
  message: optionalText(5000),
});

export type QuoteFormState = FormState<QuoteField>;

export async function submitQuote(_: QuoteFormState, formData: FormData): Promise<QuoteFormState> {
  // Bots fill every field: pretend it worked and save nothing.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const values = pickFields(formData, quoteFields);
  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<QuoteField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as QuoteField;
      errors[field] ??= issue.message;
    }
    return { status: "error", errors, values };
  }

  // Resolve the selected service against the database rather than trusting the posted label.
  const data = parsed.data;
  const services = (await getQuoteServices()).flatMap((group) =>
    group.options.map((option) => ({ ...option, kind: group.group })),
  );
  const selected = services.find((option) => option.value === data.service);
  if (!selected && data.service !== OTHER_SERVICE) {
    return { status: "error", errors: { service: "Choisissez une prestation dans la liste" }, values };
  }

  const payload = await getPayloadClient();
  const serviceLabel = selected?.label ?? "Autre / à définir";
  const request = await payload.create({
    collection: "quote-requests",
    data: {
      company: data.company,
      contactName: data.contactName,
      jobTitle: data.jobTitle,
      email: data.email,
      phone: data.phone,
      service: serviceLabel,
      experience: data.service.startsWith("experience:") ? selected?.id : undefined,
      studioOffer: data.service.startsWith("studio:") ? selected?.id : undefined,
      participants: data.participants,
      desiredDate: data.desiredDate,
      location: data.location,
      budget: data.budget,
      message: data.message,
      status: "nouveau",
    },
  });

  const location = quoteLocations.find((option) => option.value === data.location)?.label;
  await Promise.all([
    sendEmailSafely(payload, {
      to: notifyEmail(),
      replyTo: data.email,
      subject: `Nouvelle demande de devis — ${data.company}`,
      html:
        `<p>Nouvelle demande de devis n° ${request.id}, à traiter dans l'admin.</p>` +
        detailsHtml([
          ["Entreprise", data.company],
          ["Contact", data.contactName],
          ["Fonction", data.jobTitle],
          ["E-mail", data.email],
          ["Téléphone", data.phone],
          ["Prestation", serviceLabel],
          ["Participants", data.participants],
          ["Date souhaitée", data.desiredDate],
          ["Lieu", location],
          ["Budget", data.budget],
          ["Message", data.message],
        ]),
    }),
    sendEmailSafely(payload, {
      to: data.email,
      subject: "Votre demande de devis — Maison La Recette",
      html:
        `<p>Bonjour ${escapeHtml(data.contactName)},</p>` +
        `<p>Merci pour votre demande de devis pour « ${escapeHtml(serviceLabel)} ». ` +
        `Nous revenons vers vous sous 48 h.</p>` +
        `<p>À très vite,<br>L'équipe Maison La Recette</p>`,
    }),
  ]);

  return { status: "success" };
}
