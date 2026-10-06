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
        { name: "duration", label: "Durée", type: "text", admin: { placeholder: "2 h" } },
      ],
    },
    {
      name: "excerpt",
      label: "Accroche",
      type: "textarea",
      admin: { description: "Courte présentation affichée sur les cartes." },
    },
    { name: "description", label: "Description", type: "richText" },
    { name: "images", label: "Photos", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "lumaUrl",
      label: "Lien de réservation Luma",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Adresse de l'événement sur Luma (https://lu.ma/…). Laisser vide si pas de réservation en ligne.",
      },
      validate: (value: string | null | undefined) =>
        !value || /^https:\/\/(lu\.ma|luma\.com)\//.test(value) || "Doit être un lien https://lu.ma/… ou https://luma.com/…",
    },
    {
      name: "lumaEventId",
      label: "Identifiant de l'événement Luma",
      type: "text",
      admin: {
        position: "sidebar",
        placeholder: "evt-…",
        description:
          "Ouvre la réservation dans une fenêtre sur le site au lieu d'envoyer vers Luma. À trouver sur Luma : Gérer l'événement → Plus → Intégrer.",
      },
      validate: (value: string | null | undefined) =>
        !value || /^evt-[A-Za-z0-9]+$/.test(value) || "Doit commencer par « evt- »",
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
