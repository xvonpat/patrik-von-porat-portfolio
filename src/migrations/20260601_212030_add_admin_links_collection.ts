import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_admin_links_category" AS ENUM('hosting-deployment', 'analytics-seo', 'cms-database', 'domains-dns', 'creative-platforms', 'music-platforms', 'social-media', 'tools', 'other');
  CREATE TYPE "public"."enum_admin_links_status" AS ENUM('active', 'occasional', 'archived');
  CREATE TYPE "public"."enum_admin_links_priority" AS ENUM('high', 'medium', 'low');
  CREATE TABLE "admin_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"category" "enum_admin_links_category" NOT NULL,
  	"description" varchar,
  	"status" "enum_admin_links_status" DEFAULT 'active',
  	"priority" "enum_admin_links_priority" DEFAULT 'medium',
  	"sort_order" numeric DEFAULT 0,
  	"open_in_new_tab" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "admin_links_id" integer;
  CREATE INDEX "admin_links_updated_at_idx" ON "admin_links" USING btree ("updated_at");
  CREATE INDEX "admin_links_created_at_idx" ON "admin_links" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admin_links_fk" FOREIGN KEY ("admin_links_id") REFERENCES "public"."admin_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_admin_links_id_idx" ON "payload_locked_documents_rels" USING btree ("admin_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "admin_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "admin_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_admin_links_fk";
  
  DROP INDEX "payload_locked_documents_rels_admin_links_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "admin_links_id";
  DROP TYPE "public"."enum_admin_links_category";
  DROP TYPE "public"."enum_admin_links_status";
  DROP TYPE "public"."enum_admin_links_priority";`)
}
