import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "experiences_program" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "experiences" ADD COLUMN "location" varchar;
  ALTER TABLE "experiences" ADD COLUMN "price" varchar;
  ALTER TABLE "experiences" ADD COLUMN "availability" varchar;
  ALTER TABLE "experiences" ADD COLUMN "practical_address" varchar;
  ALTER TABLE "experiences" ADD COLUMN "practical_group_size" varchar;
  ALTER TABLE "experiences" ADD COLUMN "practical_diets" varchar;
  ALTER TABLE "experiences" ADD COLUMN "practical_accessibility" varchar;
  ALTER TABLE "experiences" ADD COLUMN "practical_cancellation" varchar DEFAULT 'Annulable et remboursable jusqu''à 4 jours avant l''expérience.';
  ALTER TABLE "experiences" ADD COLUMN "host_heading" varchar;
  ALTER TABLE "experiences" ADD COLUMN "host_bio" varchar;
  ALTER TABLE "experiences" ADD COLUMN "host_photo_id" integer;
  ALTER TABLE "experiences_program" ADD CONSTRAINT "experiences_program_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "experiences_program_order_idx" ON "experiences_program" USING btree ("_order");
  CREATE INDEX "experiences_program_parent_id_idx" ON "experiences_program" USING btree ("_parent_id");
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_host_photo_id_media_id_fk" FOREIGN KEY ("host_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "experiences_host_host_photo_idx" ON "experiences" USING btree ("host_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiences_program" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "experiences_program" CASCADE;
  ALTER TABLE "experiences" DROP CONSTRAINT "experiences_host_photo_id_media_id_fk";
  
  DROP INDEX "experiences_host_host_photo_idx";
  ALTER TABLE "experiences" DROP COLUMN "location";
  ALTER TABLE "experiences" DROP COLUMN "price";
  ALTER TABLE "experiences" DROP COLUMN "availability";
  ALTER TABLE "experiences" DROP COLUMN "practical_address";
  ALTER TABLE "experiences" DROP COLUMN "practical_group_size";
  ALTER TABLE "experiences" DROP COLUMN "practical_diets";
  ALTER TABLE "experiences" DROP COLUMN "practical_accessibility";
  ALTER TABLE "experiences" DROP COLUMN "practical_cancellation";
  ALTER TABLE "experiences" DROP COLUMN "host_heading";
  ALTER TABLE "experiences" DROP COLUMN "host_bio";
  ALTER TABLE "experiences" DROP COLUMN "host_photo_id";`)
}
