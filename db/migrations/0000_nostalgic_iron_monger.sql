CREATE TYPE "public"."experience_type" AS ENUM('ateliers', 'food-tours', 'immersions');--> statement-breakpoint
CREATE TYPE "public"."quote_location" AS ENUM('dans-nos-locaux', 'chez-un-partenaire', 'a-definir');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('nouveau', 'en-cours', 'traite');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"cover_url" text,
	"category" text,
	"published_at" timestamp with time zone NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contact_messages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "episodes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "episodes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"guid" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"season" integer NOT NULL,
	"number" integer,
	"published_at" timestamp with time zone NOT NULL,
	"duration_seconds" integer,
	"image_url" text,
	"audio_url" text NOT NULL,
	"rss_description" text,
	"summary" text,
	"guest_name" text,
	"guest_role" text,
	"spotify_url" text,
	"apple_url" text,
	"deezer_url" text,
	"youtube_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	CONSTRAINT "episodes_guid_unique" UNIQUE("guid"),
	CONSTRAINT "episodes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "experiences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"type" "experience_type" NOT NULL,
	"title" text NOT NULL,
	"duration" text,
	"excerpt" text,
	"description" text,
	"images" text[] DEFAULT '{}' NOT NULL,
	"luma_url" text,
	"on_quote" boolean DEFAULT true NOT NULL,
	CONSTRAINT "experiences_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "quote_requests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company" text NOT NULL,
	"contact_name" text NOT NULL,
	"job_title" text,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"service" text NOT NULL,
	"experience_id" integer,
	"studio_offer_id" integer,
	"participants" integer,
	"desired_date" text,
	"location" "quote_location",
	"budget" text,
	"message" text,
	"status" "request_status" DEFAULT 'nouveau' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "studio_offers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "studio_offers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT "studio_offers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"author" text NOT NULL,
	"role" text,
	"text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_studio_offer_id_studio_offers_id_fk" FOREIGN KEY ("studio_offer_id") REFERENCES "public"."studio_offers"("id") ON DELETE set null ON UPDATE no action;