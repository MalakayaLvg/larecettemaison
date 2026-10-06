import type { TextField } from "payload";
import { slugify } from "@/lib/slugify";

// URL segment, filled from `sourceField` when left empty.
export function slugField(sourceField = "title"): TextField {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "Partie de l'adresse de la page. Laisser vide pour la générer depuis le titre.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === "string" && value.trim()) return slugify(value);
          const source = data?.[sourceField];
          return typeof source === "string" ? slugify(source) : value;
        },
      ],
    },
  };
}
