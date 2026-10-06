import type { CollectionConfig } from "payload";

// Newsletter subscribers with double opt-in (lib/newsletter.ts). Only logged-in admins can read
// them: the public API must never expose emails or tokens.
export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: { singular: "Abonné·e", plural: "Abonné·es" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "confirmedAt", "createdAt"],
    description: "Inscrit·es à la newsletter. Seules les adresses « Confirmé·e » peuvent recevoir des envois.",
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "email", label: "E-mail", type: "email", required: true, unique: true, index: true },
    {
      name: "status",
      label: "Statut",
      type: "select",
      required: true,
      defaultValue: "en-attente",
      options: [
        { value: "en-attente", label: "En attente de confirmation" },
        { value: "confirme", label: "Confirmé·e" },
        { value: "desinscrit", label: "Désinscrit·e" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "confirmedAt",
      label: "Confirmé·e le",
      type: "date",
      admin: { position: "sidebar", readOnly: true, date: { pickerAppearance: "dayAndTime" } },
    },
    // Secret sent in the confirmation and unsubscribe links: never shown in the admin.
    { name: "token", type: "text", index: true, admin: { hidden: true } },
    { name: "tokenExpiresAt", type: "date", admin: { hidden: true } },
  ],
};
