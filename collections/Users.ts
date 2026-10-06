import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur·ice", plural: "Utilisateur·ices" },
  admin: { useAsTitle: "email" },
  auth: true,
  fields: [],
};
