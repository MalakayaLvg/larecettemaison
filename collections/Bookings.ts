import type { CollectionConfig } from "payload";

export const bookingStatuses = [
  { value: "en-attente", label: "En attente de paiement" },
  { value: "payee", label: "Payée" },
  { value: "expiree", label: "Paiement abandonné" },
  { value: "annulee", label: "Annulée" },
] as const;

// Created by the booking form (server-side, local API) before sending the visitor to Stripe
// Checkout, then marked as paid by the Stripe webhook or the confirmation page.
// Default access: only logged-in admins can read or write.
export const Bookings: CollectionConfig = {
  slug: "bookings",
  labels: { singular: "Réservation", plural: "Réservations" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "experience", "session", "seats", "status", "createdAt"],
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "experience", label: "Expérience", type: "relationship", relationTo: "experiences", required: true },
        { name: "session", label: "Session", type: "relationship", relationTo: "sessions", required: true, index: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "name", label: "Nom", type: "text", required: true },
        { name: "email", label: "E-mail", type: "email", required: true },
        { name: "phone", label: "Téléphone", type: "text", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "seats", label: "Places", type: "number", required: true, min: 1 },
        {
          name: "amount",
          label: "Montant payé (€)",
          type: "number",
          admin: { description: "Après code promo éventuel." },
        },
      ],
    },
    {
      name: "status",
      label: "Statut",
      type: "select",
      required: true,
      defaultValue: "en-attente",
      index: true,
      options: bookingStatuses.map(({ value, label }) => ({ value, label })),
      admin: {
        position: "sidebar",
        description: "« Annulée » libère les places. Le remboursement se fait dans le tableau de bord Stripe.",
      },
    },
    {
      name: "stripeSessionId",
      label: "ID Stripe Checkout",
      type: "text",
      index: true,
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "stripePaymentIntentId",
      label: "ID paiement Stripe",
      type: "text",
      admin: { position: "sidebar", readOnly: true },
    },
  ],
};
