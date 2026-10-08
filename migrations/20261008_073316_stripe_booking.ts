import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_bookings_status" AS ENUM('en-attente', 'payee', 'expiree', 'annulee');
  CREATE TABLE "sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"experience_id" integer NOT NULL,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"capacity" numeric DEFAULT 12 NOT NULL,
  	"label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"experience_id" integer NOT NULL,
  	"session_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"seats" numeric NOT NULL,
  	"amount" numeric,
  	"status" "enum_bookings_status" DEFAULT 'en-attente' NOT NULL,
  	"stripe_session_id" varchar,
  	"stripe_payment_intent_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "experiences" ADD COLUMN "booking_price" numeric;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sessions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "bookings_id" integer;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sessions_experience_idx" ON "sessions" USING btree ("experience_id");
  CREATE INDEX "sessions_starts_at_idx" ON "sessions" USING btree ("starts_at");
  CREATE INDEX "sessions_updated_at_idx" ON "sessions" USING btree ("updated_at");
  CREATE INDEX "sessions_created_at_idx" ON "sessions" USING btree ("created_at");
  CREATE INDEX "bookings_experience_idx" ON "bookings" USING btree ("experience_id");
  CREATE INDEX "bookings_session_idx" ON "bookings" USING btree ("session_id");
  CREATE INDEX "bookings_status_idx" ON "bookings" USING btree ("status");
  CREATE INDEX "bookings_stripe_session_id_idx" ON "bookings" USING btree ("stripe_session_id");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("sessions_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  ALTER TABLE "experiences" DROP COLUMN "luma_url";
  ALTER TABLE "experiences" DROP COLUMN "luma_event_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bookings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sessions" CASCADE;
  DROP TABLE "bookings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sessions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_bookings_fk";
  
  DROP INDEX "payload_locked_documents_rels_sessions_id_idx";
  DROP INDEX "payload_locked_documents_rels_bookings_id_idx";
  ALTER TABLE "experiences" ADD COLUMN "luma_url" varchar;
  ALTER TABLE "experiences" ADD COLUMN "luma_event_id" varchar;
  ALTER TABLE "experiences" DROP COLUMN "booking_price";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sessions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "bookings_id";
  DROP TYPE "public"."enum_bookings_status";`)
}
