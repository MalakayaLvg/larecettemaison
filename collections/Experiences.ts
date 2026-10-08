import type { CollectionConfig } from "payload";
import { experienceTypes } from "@/lib/site";
import { slugField } from "./fields/slug";

export const Experiences: CollectionConfig = {
  slug: "experiences",
  labels: { singular: "Expérience", plural: "Expériences" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "duration", "onQuote"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "type",
          label: "Type",
          type: "select",
          required: true,
          index: true,
          options: Object.entries(experienceTypes).map(([value, { label }]) => ({ value, label })),
        },
        { name: "duration", label: "Durée", type: "text", admin: { placeholder: "2 h 30" } },
        { name: "location", label: "Lieu (court)", type: "text", admin: { placeholder: "Lyon 4e" } },
        { name: "price", label: "Prix", type: "text", admin: { placeholder: "70 € par personne" } },
      ],
    },
    {
      name: "availability",
      label: "Disponibilités",
      type: "text",
      admin: {
        placeholder: "Tous les jours, dans vos locaux ou chez nos partenaires à Lyon.",
        description: "Affiché dans le bloc de réservation, sous « Où et quand ? ».",
      },
    },
    {
      name: "excerpt",
      label: "Accroche",
      type: "textarea",
      admin: { description: "Courte présentation affichée sur les cartes." },
    },
    { name: "description", label: "Description", type: "richText" },
    {
      name: "images",
      label: "Photos",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: { description: "La première illustre le bloc de réservation, les suivantes forment la galerie." },
    },
    {
      name: "practical",
      label: "Infos pratiques",
      type: "group",
      admin: { description: "Seules les infos remplies sont affichées." },
      fields: [
        { name: "address", label: "Lieu", type: "textarea", admin: { placeholder: "1 rue du Pavillon, 69004 Lyon, chez notre partenaire." } },
        {
          type: "row",
          fields: [
            { name: "groupSize", label: "Taille du groupe", type: "text", admin: { placeholder: "De 6 à 12 personnes" } },
            { name: "diets", label: "Régimes alimentaires", type: "text", admin: { placeholder: "Végétarien, sans gluten sur demande" } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "accessibility", label: "Accessibilité", type: "text" },
            {
              name: "cancellation",
              label: "Annulation",
              type: "text",
              defaultValue: "Annulable et remboursable jusqu'à 4 jours avant l'expérience.",
            },
          ],
        },
      ],
    },
    {
      name: "program",
      label: "Programme",
      labels: { singular: "Étape", plural: "Étapes" },
      type: "array",
      fields: [{ name: "text", label: "Étape", type: "textarea", required: true }],
    },
    {
      name: "host",
      label: "Intervenant·e",
      type: "group",
      fields: [
        {
          name: "heading",
          label: "Titre de la section",
          type: "text",
          admin: { placeholder: "Un atelier animé par une cheffe passionnée" },
        },
        { name: "bio", label: "Présentation", type: "textarea" },
        { name: "photo", label: "Portrait", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "bookingPrice",
      label: "Prix réservation en ligne (€ / pers.)",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        description:
          "Active la réservation et le paiement en ligne (Stripe). Les dates se gèrent dans « Sessions ». Laisser vide si pas de réservation en ligne.",
      },
    },
    {
      name: "onQuote",
      label: "Disponible sur devis",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Affiche un lien vers la demande de devis (groupes, entreprises)." },
    },
    slugField(),
  ],
};
