import type { CollectionConfig } from "payload";
import { slugField } from "./fields/slug";

export const StudioOffers: CollectionConfig = {
  slug: "studio-offers",
  labels: { singular: "Offre Studio", plural: "Offres Studio" },
  admin: { useAsTitle: "title" },
  access: { read: () => true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    slugField(),
  ],
};
