import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Témoignage", plural: "Témoignages" },
  admin: { useAsTitle: "author", defaultColumns: ["author", "role"] },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "author", label: "Auteur·ice", type: "text", required: true },
        { name: "role", label: "Fonction", type: "text" },
      ],
    },
    { name: "text", label: "Témoignage", type: "textarea", required: true },
  ],
};
