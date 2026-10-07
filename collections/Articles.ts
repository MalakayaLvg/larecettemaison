import type { CollectionConfig } from "payload";
import { articleCategories } from "@/lib/site";
import { slugField } from "./fields/slug";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
  },
  defaultSort: "-publishedAt",
  // Drafts: the admin can save without publishing; only published articles are public.
  versions: { drafts: true },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    {
      name: "excerpt",
      label: "Accroche",
      type: "textarea",
      required: true,
      admin: { description: "Deux ou trois phrases, affichées sur la liste des articles et pour Google." },
    },
    { name: "cover", label: "Image de couverture", type: "upload", relationTo: "media" },
    { name: "content", label: "Contenu", type: "richText", required: true },
    {
      name: "category",
      label: "Catégorie",
      type: "select",
      required: true,
      index: true,
      options: Object.entries(articleCategories).map(([value, label]) => ({ value, label })),
      admin: { position: "sidebar" },
    },
    {
      name: "episode",
      label: "Épisode lié",
      type: "relationship",
      relationTo: "episodes",
      admin: {
        position: "sidebar",
        description: "Si l'article est tiré d'un épisode du podcast : affiche « Extrait du podcast » et un lien vers l'épisode.",
      },
    },
    {
      name: "publishedAt",
      label: "Date de publication",
      type: "date",
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { displayFormat: "d MMMM yyyy" } },
    },
    slugField(),
  ],
};
