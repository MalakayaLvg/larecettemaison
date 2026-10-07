import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "episodes_extracts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"number" numeric,
  	"duration_seconds" numeric,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"audio_url" varchar NOT NULL,
  	"guid" varchar NOT NULL
  );
  
  ALTER TABLE "episodes" ADD COLUMN "guest_bio" varchar;
  ALTER TABLE "episodes" ADD COLUMN "guest_photo_id" integer;
  ALTER TABLE "episodes_extracts" ADD CONSTRAINT "episodes_extracts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."episodes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "episodes_extracts_order_idx" ON "episodes_extracts" USING btree ("_order");
  CREATE INDEX "episodes_extracts_parent_id_idx" ON "episodes_extracts" USING btree ("_parent_id");
  ALTER TABLE "episodes" ADD CONSTRAINT "episodes_guest_photo_id_media_id_fk" FOREIGN KEY ("guest_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "episodes_guest_photo_idx" ON "episodes" USING btree ("guest_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "episodes_extracts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "episodes_extracts" CASCADE;
  ALTER TABLE "episodes" DROP CONSTRAINT "episodes_guest_photo_id_media_id_fk";
  
  DROP INDEX "episodes_guest_photo_idx";
  ALTER TABLE "episodes" DROP COLUMN "guest_bio";
  ALTER TABLE "episodes" DROP COLUMN "guest_photo_id";`)
}
