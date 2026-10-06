import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médias" },
  access: { read: () => true },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: true,
      admin: { description: "Décrit l'image pour les personnes malvoyantes et Google." },
    },
  ],
  // Stored on disk for now; switch to an S3 storage adapter when the site is deployed.
  upload: { staticDir: "media", mimeTypes: ["image/*"] },
};
