import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fr } from "@payloadcms/translations/languages/fr";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Articles } from "./collections/Articles";
import { ContactMessages } from "./collections/ContactMessages";
import { Episodes } from "./collections/Episodes";
import { Experiences } from "./collections/Experiences";
import { Media } from "./collections/Media";
import { QuoteRequests } from "./collections/QuoteRequests";
import { StudioOffers } from "./collections/StudioOffers";
import { Subscribers } from "./collections/Subscribers";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " | Maison La Recette" },
  },
  collections: [
    Episodes,
    Articles,
    Experiences,
    StudioOffers,
    Testimonials,
    QuoteRequests,
    ContactMessages,
    Subscribers,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    migrationDir: path.resolve(dirname, "migrations"),
    // In production, pending migrations run when Payload starts (no push of the schema there).
    // After changing a collection: `npm run payload migrate:create <name>` and commit the file.
    prodMigrations: migrations,
  }),
  plugins: [
    // Uploads go to Vercel Blob when deployed (Vercel sets BLOB_READ_WRITE_TOKEN), to ./media locally.
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      // Same schema with or without the plugin, so migrations match in every environment.
      alwaysInsertFields: true,
      // Browser uploads straight to Blob: Vercel functions reject request bodies over ~4.5 MB.
      clientUploads: true,
    }),
  ],
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
