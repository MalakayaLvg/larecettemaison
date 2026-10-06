import type { CollectionConfig } from "payload";

// Filled by the /contact form (server-side, local API); readable by logged-in admins only.
export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  labels: { singular: "Message de contact", plural: "Messages de contact" },
  admin: { useAsTitle: "subject", defaultColumns: ["subject", "name", "email", "createdAt"] },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nom", type: "text", required: true },
        { name: "email", label: "E-mail", type: "email", required: true },
      ],
    },
    { name: "subject", label: "Sujet", type: "text", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
};
