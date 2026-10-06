import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { fr } from "@payloadcms/translations/languages/fr";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { ContactMessages } from "./collections/ContactMessages";
import { Episodes } from "./collections/Episodes";
import { Experiences } from "./collections/Experiences";
import { Media } from "./collections/Media";
import { QuoteRequests } from "./collections/QuoteRequests";
import { StudioOffers } from "./collections/StudioOffers";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " | Maison La Recette" },
  },
  collections: [
    Episodes,
    Experiences,
    StudioOffers,
    Testimonials,
    QuoteRequests,
    ContactMessages,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  sharp,
  // SMTP_* point to Mailpit in development (see compose.yaml). Without SMTP_HOST, Payload
  // only logs emails to the console.
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || "noreply@larecette.local",
        defaultFromName: "Maison La Recette",
        // Don't block startup when the SMTP server is down: a failed send is handled where it happens.
        skipVerify: true,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
        },
      })
    : undefined,
});
