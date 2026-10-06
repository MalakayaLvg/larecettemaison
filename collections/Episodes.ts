import type { CollectionConfig } from "payload";
import { slugField } from "./fields/slug";

// Fields filled by the Ausha RSS sync (lib/podcast-sync.ts): read-only in the admin,
// since the next sync would overwrite any change.
const synced = { readOnly: true, description: "Importé du flux Ausha." };

export const Episodes: CollectionConfig = {
  slug: "episodes",
  labels: { singular: "Épisode", plural: "Épisodes" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "season", "number", "publishedAt", "featured"],
    description:
      "Les épisodes sont importés automatiquement depuis Ausha. Complétez ici le résumé, l'invité·e et les liens d'écoute.",
  },
  defaultSort: "-publishedAt",
  access: { read: () => true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true, admin: synced },
    {
      type: "row",
      fields: [
        { name: "season", label: "Saison", type: "number", required: true, index: true, admin: synced },
        { name: "number", label: "Numéro", type: "number", admin: synced },
        { name: "durationSeconds", label: "Durée (secondes)", type: "number", admin: synced },
      ],
    },
    {
      name: "publishedAt",
      label: "Date de publication",
      type: "date",
      required: true,
      index: true,
      admin: { ...synced, date: { displayFormat: "d MMMM yyyy" } },
    },
    {
      name: "summary",
      label: "Résumé",
      type: "textarea",
      admin: {
        description:
          "Remplace la description Ausha sur le site. Séparer les paragraphes par une ligne vide.",
      },
    },
    {
      type: "row",
      fields: [
        { name: "guestName", label: "Invité·e", type: "text" },
        { name: "guestRole", label: "Rôle de l'invité·e", type: "text" },
      ],
    },
    {
      type: "collapsible",
      label: "Liens d'écoute",
      fields: [
        { name: "spotifyUrl", label: "Spotify", type: "text" },
        { name: "appleUrl", label: "Apple Podcasts", type: "text" },
        { name: "deezerUrl", label: "Deezer", type: "text" },
        { name: "youtubeUrl", label: "YouTube", type: "text" },
      ],
    },
    {
      type: "collapsible",
      label: "Données Ausha",
      admin: { initCollapsed: true },
      fields: [
        { name: "audioUrl", label: "Fichier audio", type: "text", required: true, admin: synced },
        { name: "imageUrl", label: "Pochette", type: "text", admin: synced },
        { name: "rssDescription", label: "Description Ausha", type: "textarea", admin: synced },
        { name: "guid", type: "text", required: true, unique: true, admin: synced },
      ],
    },
    {
      name: "featured",
      label: "À la une",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    // Set once by the sync and never overwritten, so URLs stay stable.
    { ...slugField(), admin: { position: "sidebar", readOnly: true } },
  ],
};
