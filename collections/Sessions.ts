import type { CollectionConfig } from "payload";

// Dates of an experience that can be booked online (page /experiences/…/reserver).
export const Sessions: CollectionConfig = {
  slug: "sessions",
  labels: { singular: "Session", plural: "Sessions" },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["experience", "startsAt", "capacity"],
    description: "Les places restantes = capacité − réservations payées (ou en cours de paiement).",
  },
  defaultSort: "startsAt",
  access: { read: () => true },
  fields: [
    { name: "experience", label: "Expérience", type: "relationship", relationTo: "experiences", required: true, index: true },
    {
      type: "row",
      fields: [
        {
          name: "startsAt",
          label: "Date et heure",
          type: "date",
          required: true,
          index: true,
          admin: { date: { pickerAppearance: "dayAndTime", timeFormat: "HH:mm", displayFormat: "dd/MM/yyyy HH:mm" } },
        },
        { name: "capacity", label: "Nombre de places", type: "number", required: true, min: 1, defaultValue: 12 },
      ],
    },
    // Title shown in the admin (relationship pickers, bookings list).
    {
      name: "label",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) =>
            siblingData.startsAt
              ? new Date(siblingData.startsAt).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                  timeZone: "Europe/Paris",
                })
              : undefined,
        ],
      },
    },
  ],
};
