import type { CollectionConfig } from "payload";
import { quoteLocations } from "@/lib/forms";

// Filled by the /devis form (server-side, local API). Not editable from the public API:
// default access only lets logged-in admins read or write.
export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  labels: { singular: "Demande de devis", plural: "Demandes de devis" },
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "contactName", "service", "status", "createdAt"],
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "company", label: "Entreprise", type: "text", required: true },
        { name: "contactName", label: "Contact", type: "text", required: true },
        { name: "jobTitle", label: "Fonction", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", label: "E-mail", type: "email", required: true },
        { name: "phone", label: "Téléphone", type: "text", required: true },
      ],
    },
    { name: "service", label: "Prestation", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "experience", label: "Expérience", type: "relationship", relationTo: "experiences" },
        { name: "studioOffer", label: "Offre Studio", type: "relationship", relationTo: "studio-offers" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "participants", label: "Participants", type: "number" },
        { name: "desiredDate", label: "Date souhaitée", type: "text" },
        { name: "budget", label: "Budget", type: "text" },
      ],
    },
    {
      name: "location",
      label: "Lieu",
      type: "select",
      options: quoteLocations.map(({ value, label }) => ({ value, label })),
    },
    { name: "message", label: "Message", type: "textarea" },
    {
      name: "status",
      label: "Statut",
      type: "select",
      required: true,
      defaultValue: "nouveau",
      options: [
        { value: "nouveau", label: "Nouveau" },
        { value: "en-cours", label: "En cours" },
        { value: "traite", label: "Traité" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
